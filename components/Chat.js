import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';




const firebase = require('firebase');
require('firebase/firestore');



export default class Chat extends Component{
    constructor(){
        super();
        this.state={
            messages: [],
            uid: 0,
            loggedInText: 'Please Wait',
            isConnected: true,
            image: null,
            location: null,
        }



       


          const firebaseConfig = {
            apiKey: "AIzaSyCgtkTTLQY3VXXrZU2wj0CABdC_Jac5dYA",
            authDomain: "chatapp-ac337.firebaseapp.com",
            projectId: "chatapp-ac337",
            storageBucket: "chatapp-ac337.appspot.com",
            messagingSenderId: "784870559237",
            appId: "1:784870559237:web:89b7a0ae54698946f6d66c"
          }

           //  Initialize Firebase
         if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
         }

        

    }



async getMessages() {
  let messages = "";
  try {
    messages = (await AsyncStorage.getItem("messages")) || [];
    this.setState({
      messages: JSON.parse(messages),
    });
  } catch (error) {
    console.log(error.message);
  }
}
componentDidMount() {
  // Set the name property to be included in the navigation bar
  let name = this.props.route.params.name;
  this.props.navigation.setOptions({ title: name });
  this.getMessages();
  NetInfo.fetch().then((connection) => {
    if (connection.isConnected) {
      this.setState({ isConnected: true });
      console.log('online');

      this.referenceChatMessages = firebase
        .firestore()
        .collection('messages');

      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
          user: {
            _id: user.uid,
            name: name,
          },
          loggedInText: '',
        });
        this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
      });
    } else {
      this.setState({ isConnected: false });
      console.log('offline');

      this.getMessages();
    }
  });
}

onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),
    () => {
      this.addMessage();
      this.saveMessages();
    }
  );
}

addMessage = () => {
  const message = this.state.messages[0];
  this.referenceChatMessages.add({
    uid: this.state.uid,
    _id: message._id,
    text: message.text || '',
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null,
  });
};
async saveMessages() {
  try {
    await AsyncStorage.setItem(
      "messages",
      JSON.stringify(this.state.messages)
    );
  } catch (error) {
    console.log(error.message);
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem("messages");
    this.setState({
      messages: [],
    });
  } catch (error) {
    console.log(error.message);
  }
}


onCollectionUpdate = (querySnapshot) => {
  if (!this.state.isConnected) return;
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    let data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: {
        _id: data.user._id,
        name: data.user.name,
        avatar: data.user.avatar || '',
      },
      image: data.image || null,
      location: data.location || null,
    });
  });
  this.setState({
    messages,
  });
};


componentWillUnmount() {
  if (this.isConnected) {
    this.unsubscribe();
    this.authUnsubscribe();
  }
}
renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000',
        },
        left: {
          backgroundColor: '#fff',
        },
      }}
    />
  );
}

//render the default InputToolbar only when the user is online
renderInputToolbar(props) {
  if (this.state.isConnected === false) {
  } else {
    return <InputToolbar {...props} />;
  }
}

renderCustomActions = (props) => {
  return <CustomActions {...props} />;
};

renderCustomView(props) {
  const { currentMessage } = props;
  if (currentMessage.location) {
    return (
      <MapView
        style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
  return null;
}

render() {
  // Set the color property as background color for the chat screen
  let color = this.props.route.params.color;
  return (
    <ActionSheetProvider>
    <View style={[styles.container, { backgroundColor: color }]}>
    <Text>{this.state.loggedInText}</Text>
      <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        renderActions={this.renderCustomActions.bind(this)}
        renderCustomView={this.renderCustomView.bind(this)}
        user={{
          _id: this.state.uid,
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
    </ActionSheetProvider>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
});