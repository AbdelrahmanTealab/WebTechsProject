import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

export default class Welcome extends React.Component {
    render() {
        const { navigate } = this.props.navigation
        return (
            <View>
                <StatusBar barStyle="dark-content"/>
                <Image source={require('../images/logo.png')}
                    style={styles.logo} />
                <Text style={styles.title}>Saving Lives</Text>
                <Text style={styles.subtitle}>Welcome to Tealab's Healthcare systems</Text>
                <Text style={styles.subtitle}>Feel at ease and relax</Text>
                <Text style={styles.subtitle}>Your patients' health in your hands</Text>



                <View style={styles.button}>
                    <Text onPress={() => navigate('Registration')} style={styles.buttontext}>Register</Text>
                </View>
                <Text style={styles.subtitle}>OR</Text>
                <View style={styles.button}>
                    <Text onPress={() => navigate('Login')} style={styles.buttontext}>Login</Text>
                </View>

            </View>

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
    }
});