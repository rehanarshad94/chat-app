import React, {Component} from 'react';
import {View, Button, Text, TextInput, StyleSheet, ImageBackground} from 'react-native';



export default class Start extends Component{
    constructor(props){
        super(props);
        this.state={name: ''};
    }

   
    render(){
        return(
            <View style={styles.container}>

                <ImageBackground source={require('../assets/background-image.png')} resizeMode='cover' style={styles.image} >

                    {/* Title of the APP */}
                    <Text style={styles.appTitle}>Chat App</Text>
                    
                    {/* Box with input fields */}
                    <View style={styles.inputBox}>
                        <TextInput 
                        style={styles.inputText}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        placeholder='Enter Your Name'
                        />

                        {/* background color option selector */}
                        <View> 
                        <Text style={styles.backgroundColorOption}>Choose Background Color:</Text>
                    
                            {/* To make the colors in circle, DO NOT USE <TEXT> -- INSTEAD USE <VIEW> */}
                            <View style={styles.backgroundColorDirection}>
                                <View style={styles.color1}></View>
                                <View style={styles.color2}></View>
                                <View style={styles.color3}></View>
                                <View style={styles.color4}></View>
                            </View>
                        </View>

                        {/* button that navigates to chat screen once user inputs their name and clicks on button */}
                        <View style={styles.chatButton}>
                            <Button 
                            title= ''
                            onPress={() => {
                                this.props.navigation.navigate('Chat', {name: this.state.name})
                            }}
                            />
                            <Text style={styles.chatbarText}>Start Chatting</Text>
                        </View>

                    </View>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'skyblue',
        // justifyContent: 'space-around',
    },
    appTitle: {
        flex: 0.3,
        fontSize: 45,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
        marginTop: '10%',
    },
    inputBox: {
        height: '44%',
        width: '88%',
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    inputText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: '50%',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 10,
        textAlign: 'center',
        borderRadius: '25%',

    },
    backgroundColorOption: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: '100%',
        margin: 10,
        padding: 10,
        textAlign: 'center',
    },
    backgroundColorDirection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: '15%',
    },
    color1: {
        backgroundColor: '#090c08',
        height: 50,
        width: 50,
        borderRadius: '25%',
    },
    color2: {
        backgroundColor: '#474056',
        height: 50,
        width: 50,
        borderRadius: '25%',
    },
    color3: {
        backgroundColor: '#8A95A5',
        height: 50,
        width: 50,
        borderRadius: '25%',
    },
    color4: {
        backgroundColor: '#B9C6AE',
        height: 50,
        width: 50,
        borderRadius: '25%',
    },
    chatButton: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#757083',
        borderRadius: '50%',
        width: '88%',
        alignSelf: 'center',
        marginBottom: '10%',  
    },
    chatbarText: {
        fontSize: 16, 
        fontWeight: '600', 
        color: '#fff', 
        alignSelf:'center', 
        marginBottom: 25,
    },
    image: {
        flex: 1,
        justifyContent: 'space-around',

    }
})