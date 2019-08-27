import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native';
import {internetConnected,internetDisconnected} from '../redux/actions'
import {connect} from 'react-redux'
import NetInfo from "@react-native-community/netinfo";



class NetworkService extends Component {

    // static state = {
    //     connection_Status: "",
    //     isConnected:false
    // }

    constructor() {
        super()
        
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange

        );

        NetInfo.isConnected.fetch().done((isConnected) => {

            if (isConnected == true) {
                console.log('NETWORK_CONNECTED1',this.props)
                // this.setState({ connection_Status: "Online",isConnected:true })
                {this.props.internetConnected()}
            }
            else {
                console.log('NETWORK_DISCONNECTED1')
                // this.setState({ connection_Status: "Offline",isConnected:false })
                {this.props.internetDisconnected()}
            }

        });
    }

    componentWillUnmount() {

        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange

        );

    }

    _handleConnectivityChange = (isConnected) => {

        if (isConnected == true) {
            console.log('NETWORK_CONNECTED2')

            // this.setState({ connection_Status: "Online",isConnected:true })
            {this.props.internetConnected()}
        }
        else {
            console.log('NETWORK_DISCONNECTED2')

            // this.setState({ connection_Status: "Offline",isConnected:false })
            {this.props.internetDisconnected()}
        }
    };

    // static isConnected = () => {
    //     if(this.state.connection_Status == 'Online'){
    //         return true
    //     }else{
    //         return false
    //     }
    // }
    

    render() {
        console.log("NETWORK")
        return (
            <View>

            </View>
        );
    };
}

function mapStateToProps(state){
      return{
        isInternetConnected:state.internet,
      }
  }

export default connect(mapStateToProps,{internetConnected,internetDisconnected})(NetworkService)