import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';

export default class Chat extends Component{
    render(){

        let name = this.props.route.params.name;
        this.props.navigation.setOptions({title: name});

        let color = this.props.route.params.color;
        


        return(
            <View style={[styles.container, {backgroundColor: color}]}>
                <Text>You are on the chat screen</Text>
                <Button 
                title='Go Back To Start'
                onPress={() => {
                    this.props.navigation.navigate('Start')
                }}
                />
            </View>
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