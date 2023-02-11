import { firestore } from 'firebase';
import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


// import { initializeApp } from "firebase/app";

// const firebase = require('firebase');
// require('firebase/firestore');


import firebase from 'firebase';
import firestore from 'firebase';


export default class Chat extends Component{
    constructor(){
        super();
        this.state={
            messages: [],
            uid: 0,
            loggedInText: 'Please Wait',
        }



        //  Initialize Firebase
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

          // const firebaseConfig = {
          //   apiKey: "AIzaSyCgtkTTLQY3VXXrZU2wj0CABdC_Jac5dYA",
          //   authDomain: "chatapp-ac337.firebaseapp.com",
          //   projectId: "chatapp-ac337",
          //   storageBucket: "chatapp-ac337.appspot.com",
          //   messagingSenderId: "784870559237",
          //   appId: "1:784870559237:web:89b7a0ae54698946f6d66c"
          // };

          // Initialize Firebase
          // const app = initializeApp(firebaseConfig);


          // this.referenceChatUser = '';


         // reference to messages in database
        // this.referenceChatMessage = firebase
        // .firestore()
        // .collection('messages');

    }

    

    componentDidMount() {
        

        // this is a reference to the message collection in database
        this.referenceChatMessages = firebase
        .firestore()
        .collection('messages');


           // listen to authentication events
          this.authUnsubscribe = firebase.auth().onAuthStateChanged(async(user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
             //update user state with currently active user data
            this.setState({
              uid: user.uid,
              loggedInText: 'Hello there',
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });

          // create a reference to the active user's documents (messages)
          // this.referenceChatUser = firebase
          // .firestore()
          // .collection('messages').where("uid", "==", this.state.uid);
          // listen for collection changes for current user 
          // this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
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

          componentWillUnmount() {
            // stop listening to authentication
            // this.authUnsubscribe();
            this.authUnsubscribe();
            // stop listening for changes
            // this.unsubscribe();

          }


          addMessage(){
            this.referenceChatMessages.add({
              _id: '2',
              createdAt: new Date(),
              text: 'hii',
              uid: 'two',
              user: {
                _id: 'two',
                avatar: 'https://placeimg.com/140/140/any',
              },
            })
          }
      


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
          this.setState({
            messages,
          })
        });
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
                backgroundColor: '#000',
              }
            }}
          />
        )
      }

      
    


    render(){
      

        let name = this.props.route.params.name;
        this.props.navigation.setOptions({title: name});

        let color = this.props.route.params.color;
        


        return(
          
          <View style={{flex: 1, backgroundColor: color}}>

          <Text>{this.state.loggedInText}</Text>    

          <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            avatar: 'https://placeimg.com/140/140/any',
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