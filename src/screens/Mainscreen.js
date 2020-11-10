import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, StatusBar, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Mainscreen extends React.Component {
    //identifying table headers and their widths
    constructor(props) {
        super(props);
        this.state = {
            dataHeaders: ['ID','Patient', 'Age', 'Datetime', 'Blood Pressure', 'Respiratory Rate', 'Blood Oxygen Level', 'Heartbeat rate'],
            headerWidth: [50,160, 50, 180, 110, 130, 140, 110],
            data: [],
            isLoading: true
        }
    }

    //functions to call when buttons are pressed, for future implementation
    logOut() {
        console.log('Log Out pressed!');
    }

    addPatientRecord() {
        console.log('Add Patient Record!');
    }
    addPatient() {
        var date = new Date()
        console.log('Add Patient!');
        fetch('http://localhost:3009/patients', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID: "104",
                Name: 'Mr. Pawluk',
                Age: "38",
                Datetime: date,
                BloodPressure: '135',
                RespiratoryRate: '543',
                BloodOxygen: '234',
                HeartBeat: '654'
            }),
        });

    }
    componentDidMount() {
        fetch('http://localhost:3009/patients')
          .then((response) => response.json())
          .then((json) => {
            this.setState({ data: json });
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });
      }
    refreshData() {
        console.log('Refresh Data!');
        const promise = fetch('http://localhost:3009/patients');
        promise.then(response => response.json()).then((responseJson) => {
            console.log(responseJson[0]);
            return responseJson
        }).catch(error => console.log(error))
    }
    searchPatient() {
        console.log('Search Patient!');
    }
    filterData() {
        console.log('Filter Data!');
    }
    viewPatientRecord() {
        console.log('View Patient Record!');
    }

    render() {
        const state = this.state;
        const { data, isLoading } = this.state;

                /* using dummy data for now */
        const patientsTable = [];
        for (let i = 0; i < data.length; i += 1) {
            const patientRow = [];
            patientRow.push(data[i].ID);
            patientRow.push(data[i].Name);
            patientRow.push(data[i].Age);
            patientRow.push(data[i].Datetime);
            patientRow.push(data[i].BloodPressure);
            patientRow.push(data[i].RespiratoryRate);
            patientRow.push(data[i].BloodOxygen);
            patientRow.push(data[i].HeartBeat);
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
                                <Row data={state.dataHeaders} widthArr={state.headerWidth} style={styles.tableheader} textStyle={styles.headertext} />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                {/* table data */}
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#B0A1C8' }}>
                                    {
                                        patientsTable.map((patientRow, index) => (
                                            //mapping the 2d array into the table
                                            <Row key={index} data={patientRow} widthArr={state.headerWidth} style={[styles.rowstyle]} textStyle={styles.tabletext} />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
                {/* Buttons view */}
                <View style={styles.buttonsview}>
                    <View style={styles.button}>
                        <Text onPress={this.addPatientRecord} style={styles.buttontext}>Add Patient Record</Text>
                    </View>

                    <View style={styles.buttonsviewsmall}>
                        <View style={styles.buttonsmall}>
                            <Text onPress={this.addPatient} style={styles.buttontext}>Add Patient</Text>
                        </View>
                        <View style={styles.buttonsmall}>
                            <Text onPress={this.refreshData} style={styles.buttontext}>Refresh Data</Text>
                        </View>
                    </View>

                    <View style={styles.buttonsviewsmall}>
                        <View style={styles.buttonsmall}>
                            <Text onPress={this.searchPatient} style={styles.buttontext}>Search Patient</Text>
                        </View>
                        <View style={styles.buttonsmall}>
                            <Text onPress={this.filterData} style={styles.buttontext}>Filter Data</Text>
                        </View>
                    </View>

                    <View style={styles.button}>
                        <Text onPress={this.logOut} style={styles.buttontext}>View Patient Record</Text>
                    </View>

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
        marginStart: 15,
        marginEnd: 15,
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
    },
    button: {
        marginHorizontal: 30,
        alignItems: "center",
        marginTop: '2%',
        backgroundColor: "#144CA7",
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: '2%',
    },
    buttonsmall: {
        width: '35%',
        alignItems: "center",
        backgroundColor: "#144CA7",
        paddingVertical: 15,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttontext: {
        color: "white",
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 18,
    },
    buttonsview: {
        margin: 'auto',
        alignSelf: 'center',
        width: "92.5%",
        flexDirection: 'column',
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 28,
    },
    buttonsviewsmall: {
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '2%',
        marginBottom: '2%',
        width: "110%",
        display: "flex",
        flexDirection: 'row',
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 28,
    },
});