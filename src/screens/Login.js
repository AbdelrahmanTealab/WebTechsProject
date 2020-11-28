import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, StatusBar } from 'react-native';

export default class Registration extends React.Component {
    render() {
        const { navigate } = this.props.navigation
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                    <StatusBar barStyle="dark-content"/>
                        <Image source={require('../images/logo.png')}
                            style={styles.logo} />
                        <Text style={styles.title}>Login information</Text>
                        <Text style={styles.subtitle}>Welcome to Tealab's Healthcare systems</Text>
                        <Text style={styles.subtitle}>Please enter the email and password</Text>

                        <View>
                            <TextInput style={styles.formfield} placeholder="Email" />
                        </View>
                        <View >
                            <TextInput style={styles.formfield} placeholder="Password" secureTextEntry={true} password={true} autoCorrect={false}/>
                        </View>


                        <View style={styles.button}>
                            <Text onPress={() => navigate('Mainscreen')} style={styles.buttontext}>Log in</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: "20%",
        height: "50%",
        width: "80%",
        marginBottom: "1%"

    },
    title: {
        alignItems: 'center',
        alignSelf: 'center',
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 28,
        marginBottom: "2%"
    },
    subtitle: {
        alignItems: 'center',
        alignSelf: 'center',
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 18,
    },
    button: {
        marginHorizontal: 55,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#144CA7",
        paddingVertical: 15,
        borderRadius: 23,
        marginBottom: 20,
    },
    buttontext: {
        color: "white",
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 18,
    },
    formfield: {
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 60,
        borderWidth: 2,
        paddingHorizontal: 10,
        marginTop: 20,
        borderColor: "#144CA7",
        borderRadius: 15,
        paddingVertical: 8,
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 18,
    }
});