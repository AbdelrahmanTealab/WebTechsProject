import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, StatusBar, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Mainscreen extends React.Component {
    //identifying table headers and their widths
    constructor(props) {
        super(props);
        this.state = {
            dataHeaders: ['Patient', 'Age', 'Datetime', 'Blood Pressure', 'Respiratory Rate', 'Blood Oxygen Level', 'Heartbeat rate'],
            headerWidth: [160, 50, 100, 110, 130, 140, 110]
        }
    }

    //function to call when log out is pressed, for future implementation
    logOut() {
        console.log('Log Out pressed!');
    }

    render() {
        const state = this.state;
        /* using dummy data for now */
        const patientsTable = [];
        for (let i = 0; i < 30; i += 1) {
            const patientRow = [];
            patientRow.push(`patient${i}`);
            patientRow.push(`${(i + 10) * 2}`);
            patientRow.push(`${i + 1}/03/2020`);
            patientRow.push(`${i * 15}`);
            patientRow.push(`${i * 18}`);
            patientRow.push(`${i * 17}`);
            patientRow.push(`${i * 14}`);
            patientsTable.push(patientRow);
        }
        const { navigate } = this.props.navigation
        return (
            <View>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.logout} onPress={this.logOut}>Log Out</Text>

                {/* user details section */}

                <View style={styles.userinfo}>
                    <Image source={require('../images/avatar.png')} style={styles.avatar} />

                    <View style={styles.userdetails}>
                        <Text style={styles.userdetailstext}>Dr. John Doe</Text>
                        <Text style={styles.userdetailstext}>Occupational Therapist</Text>
                    </View>
                    <Image source={require('../images/logo.png')} style={styles.logo} />
                </View>

                {/* table section */}

                <View style={styles.tableView}>
                    <ScrollView horizontal={true}>
                        <View>
                            {/* table headers */}
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#B0A1C8' }}>
                                <Row data={state.dataHeaders} widthArr={state.headerWidth} style={styles.tableheader} textStyle={styles.headertext}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                {/* table data */}
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#B0A1C8' }}>
                                    {
                                        patientsTable.map((patientRow, index) => (
                                            //mapping the 2d array into the table
                                            <Row key={index} data={patientRow} widthArr={state.headerWidth} style={[styles.rowstyle]} textStyle={styles.tabletext}/>
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
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
    logout: {
        marginTop: "10%",
        marginStart: "5%",
        marginBottom: "1%",
        color: '#144CA7'
    },
    userinfo: {
        alignSelf: 'center',
        width: "90%",
        flexDirection: 'row',
        borderWidth: 1,
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 28,
        marginBottom: "2%",
    },
    avatar: {
        height: 100,
        width: 100,
    },
    userdetails: {
        flexDirection: 'column',
    },
    logo: {
        height: 100,
        width: 100,
        borderWidth: 1,
        marginLeft: 'auto'
    },
    tableView: {
        flex: 0,
        padding: 2,
        marginStart:15,
        marginEnd:15,
        height: "50%",
        borderWidth: 2,
        backgroundColor: "#84E0F0"
    },
    tableheader: {
        height: 50,
        backgroundColor: '#144CA7'
    },
    tabletext: {
        textAlign: 'center',
        fontWeight: '100',
        fontFamily: 'Apple SD Gothic Neo',
    },
    headertext: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#D5DFE9',
        fontFamily: 'AppleSDGothicNeo-Bold',
    },
    dataWrapper: {
        marginTop: -1
    },
    rowstyle: {
        height: 40,
        backgroundColor: '#E6EDF2'
    }

});