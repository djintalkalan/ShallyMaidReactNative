import { Constants } from "../utils";
import { AsyncStorage } from "react-native";

async function callApi(urlString, header, body, methodType) {
    console.log("----------- Api request is----------- ");
    console.log("url string " + urlString);
    console.log("header " + JSON.stringify(header));
    console.log("body " + JSON.stringify(body));
    console.log("methodType " + methodType)

    return fetch(urlString, {
        method: methodType,
        headers: header,
        body: methodType == "POST" ? JSON.stringify(body) : null
    })
        .then(response => {
            console.log("-----------Response is----------- ")
            console.log(response)
            if (response.status == 200) {
                return response.json()
            } else {
                throw new Error(" status code " + response.status)
            }
        })
        .then((responseJson) => {
            return responseJson
        })
        .catch((error) => {
            throw error
        })
}

async function fetchApiData(urlString, body, methodType) {
    let header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Authorization": 'Bearer ' + Constants.userToken,
        // token: Constants.dailyToken,
        // agency_Id: 0
    }
    return callApi(urlString, header, body, methodType)

}





export async function loginApi(url, param) {
    return fetchApiData(url, param, Constants.API_METHOD.post)
}

export async function signUpApi(url, param) {
    return fetchApiData(url, param, Constants.API_METHOD.post)
}

export async function updatePasswordApi(url, param) {
    return fetchApiData(url, param, Constants.API_METHOD.post)
}

export async function placeOrderApi(url, param) {
    return fetchApiData(url, param, Constants.API_METHOD.post)
}

export async function getMyOrderApi(url, param) {
    return fetchApiData(url, param, Constants.API_METHOD.post)
}

export async function getOrderDetailsApi(url, param) {
    return fetchApiData(url, param, Constants.API_METHOD.post)
}

export async function serviceListApi(url) {
    return fetchApiData(url, '', Constants.API_METHOD.get)
}

export async function ImageGetApi(url) {
    return fetchApiData(url, '', Constants.API_METHOD.get)
}

