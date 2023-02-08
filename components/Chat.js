import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


export default class Chat extends Component{
    constructor(){
        super();
        this.state={
            messages: [],
        }
    }

    

    componentDidMount() {
        this.setState({
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
          messages: [
            {
              _id: 1,
              text: 'Hey Rehan hows it going ?',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
             },
             {
              _id: 2,
              text: 'This is a system message',
              createdAt: new Date(),
              system: true,
             },
          ]
        })
      }


      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
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