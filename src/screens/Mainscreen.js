import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, StatusBar, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Alert, Modal, TouchableHighlight } from "react-native";
export default class Mainscreen extends React.Component {
    state = {
        modalVisible: false
    };
    constructor(props) {
        super(props);
        this.state = {
            dataHeaders: ['ID', 'Patient', 'Age', 'Datetime', 'Blood Pressure', 'Respiratory Rate', 'Blood Oxygen Level', 'Heartbeat rate'],
            headerWidth: [50, 160, 50, 180, 110, 130, 140, 110],
            data: [],
            isLoading: true,
            idForm:'',
            nameForm:'',
            ageForm:'',
            bloodpForm:'',
            respiratoryForm:'',
            bloodoForm:'',
            heartForm:'',
            TextInputValue: '',
        }
    }

    //functions to call when buttons are pressed, for future implementation
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    logOut() {
        console.log('Log Out pressed!');
    }


    addPatientRecord() {

        const {idForm,nameForm,ageForm,bloodpForm,respiratoryForm,bloodoForm,heartForm}  = this.state ;

        var date = new Date()
        console.log('Add Patient!');
        fetch('https://sem1-project-nodejs.herokuapp.com/patients', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID: idForm,
                Name: nameForm,
                Age: ageForm,
                Datetime: date,
                BloodPressure: bloodpForm,
                RespiratoryRate: respiratoryForm,
                BloodOxygen: bloodoForm,
                HeartBeat: heartForm
            }),
        });

    }
    componentDidMount() {
        fetch('https://sem1-project-nodejs.herokuapp.com/patients')
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
        fetch('https://sem1-project-nodejs.herokuapp.com/patients')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }
    deletePatient = () =>{
        const { TextInputValue }  = this.state ;
        const url = 'https://sem1-project-nodejs.herokuapp.com/patients/'+TextInputValue 
        fetch(url, {
            method: 'delete'
          }).then(response =>
            response.json().then(json => {
              return json;
            })
          ) .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });

        Alert.alert("Deleted Patient number "+TextInputValue);
        console.log('Delete Patient!');
    }
    viewPatientRecord = () =>{
        
        const { TextInputValue, data }  = this.state ;
        const url = 'https://sem1-project-nodejs.herokuapp.com/patients/'+TextInputValue 
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
        console.log('View Patient Record!');
    }

    render() {
        const state = this.state;
        const searchID = ""
        const { data, isLoading } = this.state;
        const { modalVisible } = this.state;
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
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
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
                    <View>
                        <TextInput style={styles.formfield} placeholder="SEARCH PATIENT BY ID" onChangeText={TextInputValue => this.setState({TextInputValue})}/>
                    </View>
                    <View style={styles.buttonsviewsmall}>

                        <View style={styles.buttonsmall}>
                            <Text onPress={()=>{this.refreshData()}} style={styles.buttontext}>Refresh Data</Text>
                        </View>
                    </View>

                    <View style={styles.buttonsviewsmall}>
                        <View style={styles.buttonsmall}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={!modalVisible}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Add Patient Information</Text>
                                        <View>
                                            <TextInput style={styles.formfield} placeholder="ID" onChangeText={idForm => this.setState({idForm})}/>
                                        </View>
                                        <View >
                                            <TextInput style={styles.formfield} placeholder="Patient Name" onChangeText={nameForm => this.setState({nameForm})}/>
                                        </View>
                                        <View>
                                            <TextInput style={styles.formfield} placeholder="Age" onChangeText={ageForm => this.setState({ageForm})}/>
                                        </View>
                                        <View >
                                            <TextInput style={styles.formfield} placeholder="Blood Pressure" onChangeText={bloodpForm => this.setState({bloodpForm})}/>
                                        </View>
                                        <View >
                                            <TextInput style={styles.formfield} placeholder="Respiratory Rate" onChangeText={respiratoryForm => this.setState({respiratoryForm})}/>
                                        </View>
                                        <View >
                                            <TextInput style={styles.formfield} placeholder="Blood Oxygen Level" onChangeText={bloodoForm => this.setState({bloodoForm})}/>
                                        </View>
                                        <View >
                                            <TextInput style={styles.formfield} placeholder="Heartbeat Rate" onChangeText={heartForm => this.setState({heartForm})}/>
                                        </View>
                                        <TouchableHighlight
                                            style={styles.modalButton}
                                            onPress={() => {
                                                this.setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.textStyle}>CANCEL</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            style={styles.modalButton}
                                            onPress={() => {
                                                this.addPatientRecord(!modalVisible);
                                                this.setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.textStyle}>ADD PATIENT RECORD</Text>

                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                            <Text onPress={() => {
                                this.setModalVisible(true);
                            }} style={styles.textStyle}>Add Patient</Text>
                        </View>
                        <View style={styles.buttonsmall}>
                            <Text onPress={this.deletePatient} style={styles.buttontext}>Delete Patient</Text>
                        </View>
                    </View>

                    <View style={styles.button}>
                        <Text onPress={this.viewPatientRecord} style={styles.buttontext}>View Patient Record</Text>
                    </View>

                </View>
            </View>
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
        justifyContent: 'flex-end',
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
        justifyContent: 'flex-end',
        margin: 'auto',
        marginTop: '2%',
        marginBottom: '2%',
        width: "110%",
        display: "flex",
        flexDirection: 'row',
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 28,
    },
    formfield: {
        marginHorizontal: 10,
        justifyContent: 'flex-end',
        borderWidth: 2,
        paddingHorizontal: 50,
        marginTop: 10,
        borderColor: "#144CA7",
        borderRadius: 15,
        paddingVertical: 8,
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 12,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 5,
        backgroundColor: "white",
        justifyContent: 'flex-end',
        borderRadius: 25,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.99,
        shadowRadius: 3.84,
    },
    modalButton: {
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 28,
        backgroundColor: "#72DAF4",
        borderRadius: 20,
        paddingVertical: 10,
        marginTop: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 18,
        justifyContent: 'flex-end',
    },
    modalText: {
        marginBottom: 15,
        justifyContent: 'flex-end',
        textAlign: "center"
    }
});