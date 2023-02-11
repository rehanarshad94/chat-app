import { firestore } from 'firebase';
import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';



const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends Component{
    constructor(){
        super();
        this.state={
            messages: [],
        }



         // Initialize Firebase
         if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
         }


          const firebaseConfig = {
            apiKey: "AIzaSyCgtkTTLQY3VXXrZU2wj0CABdC_Jac5dYA",
            authDomain: "chatapp-ac337.firebaseapp.com",
            projectId: "chatapp-ac337",
            storageBucket: "chatapp-ac337.appspot.com",
            messagingSenderId: "784870559237",
            appId: "1:784870559237:web:89b7a0ae54698946f6d66c"
          }


         // reference to messages in database
        // this.referenceChatMessage = firebase
        // .firestore()
        // .collection('messages');

    }

    

    componentDidMount() {
        

        // this is a reference to the message collection in database
        this.referenceChatMessage = firebase
        .firestore()
        .collection('messages');


           // listen to authentication events
          this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
              firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });

          // create a reference to the active user's documents (shopping lists)
          this.referenceChatUser = firebase
          .firestore()
          .collection('messages').where("uid", "==", this.state.uid);
          // listen for collection changes for current user 
          this.unsubscribeListUser = this.referenceShoppinglistUser.onSnapshot(this.onCollectionUpdate);
}

        

          // this.setState({

          // messages: [
          //   {
          //     _id: 1,
          //     text: 'Hello developer',
          //     createdAt: new Date(),
          //     user: {
          //       _id: 2,
          //       name: 'React Native',
          //       avatar: 'https://placeimg.com/140/140/any',
          //     },
          //   },
          // ],
          // messages: [
          //   {
          //     _id: 1,
          //     text: 'Hey Rehan hows it going ?',
          //     createdAt: new Date(),
          //     user: {
          //       _id: 2,
          //       name: 'React Native',
          //       avatar: 'https://placeimg.com/140/140/any',
          //     },
          //    },
          //    {
          //     _id: 2,
          //     text: 'This is a system message',
          //     createdAt: new Date(),
          //     system: true,
          //    },
          // ]
      


      onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
          // get the QueryDocumentSnapshot's data
          let data = doc.data();
          messages.push({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
          });
        });
      }

      


      addMessage(){
        this.referenceChatMessage.add({
          text: 'hii',
          createdAt: new Date(),
          user: 'User Two'
        })
      }


      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        })),
        () => {
          this.addMessage(messages);
        }

      }


      renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#000'
              }
            }}
          />
        )
      }


      componentWillUnmount() {
        // stop listening to authentication
        this.authUnsubscribe();
        // stop listening for changes
        this.unsubscribe();
      }
      
    


    render(){
      

        let name = this.props.route.params.name;
        this.props.navigation.setOptions({title: name});

        let color = this.props.route.params.color;
        


        return(
          
          <View style={{flex: 1, backgroundColor: color}}>

          <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
          _id: 1,
          }}
          />

         <View>
          <Button 
          title='Send Message'
          onPress={() => {
            this.addMessage();
          }}
          />
         </View>


          


          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}



          

          </View>
          
            // <View style={[styles.container, {backgroundColor: color}]}>
              
            //     <Text>You are on the chat screen</Text>
            //     <Button 
            //     title='Go Back To Start'
            //     onPress={() => {
            //         this.props.navigation.navigate('Start')
            //     }}
            //     />
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})