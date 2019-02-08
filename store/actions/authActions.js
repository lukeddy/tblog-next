import {USER_LOGGED_IN, USER_LOGGED_OUT } from "./types";

import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import axios from "axios";


export function login(credentials) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/login", credentials).then(response => {
                if(response.data.status){
                    //console.log(response.data.data);
                    const {token}=response.data.data
                    localStorage.tblogToken =token;
                    setAuthorizationHeader(token);
                    dispatch({type: USER_LOGGED_IN,payload:response.data.data});
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function register(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/register", data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("tblogToken");
    setAuthorizationHeader();
    dispatch({
        type: USER_LOGGED_OUT
    });
};
