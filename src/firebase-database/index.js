import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform, StyleSheet, View, DeviceEventEmitter } from 'react-native';
import firebase from 'react-native-firebase'
import { liveLocationAction } from '../redux/actions'
import { Constants } from '../utils';



let rootRef = firebase.database().ref();
// const dataRef = rootRef.child('locations/');
let orderRef
class FirebaseDatabase extends Component {

    constructor() {
        super()
        this.state = ({
            driverId: null,
            orderNumber: null
        })
    }

    componentDidMount(){
        this.callIntervalFirebase()
        
    }

    callIntervalFirebase = () => {
        this.updateFirebaseDataFirst()
        this.intervalFirebase = setInterval(() => this.updateFirebaseData(), 10000);
    };

    componentWillUnmount() {
        clearInterval(this.intervalFirebase);
    }

    updateFirebaseDataFirst = () => {
        if (this.props.driverId && this.props.orderNumber) {
            orderRef = rootRef.child('locations' + '/' + this.props.driverId + '/' + this.props.orderNumber + '/' + '123')
            orderRef.once('value', (childSnapshot) => {
                let data = JSON.parse(JSON.stringify(childSnapshot))
                data = {
                    ...data,
                    orderNumber: this.props.orderNumber
                }
                this.props.liveLocationAction(data)
                DeviceEventEmitter.emit(Constants.EVENTS.liveLocation, childSnapshot)
            })
        }

    }

    updateFirebaseData = () => {
        if (this.props.driverId && this.props.orderNumber) {
            orderRef = rootRef.child('locations' + '/' + this.props.driverId + '/' + this.props.orderNumber + '/' + '123')
            orderRef.once('value', (childSnapshot) => {
                let data = JSON.parse(JSON.stringify(childSnapshot))
                data = {
                    ...data,
                    orderNumber: this.props.orderNumber
                }
                this.props.liveLocationAction(data)
                DeviceEventEmitter.emit(Constants.EVENTS.liveLocation, childSnapshot)
            })
        }

    }

    render() {
        return (
            <View>
            </View>
        );
    };
}


function mapStateToProps(state) {
    return {
        liveLocationData: state.liveLocationData,
    }
}

export default connect(mapStateToProps, { liveLocationAction })(FirebaseDatabase)
