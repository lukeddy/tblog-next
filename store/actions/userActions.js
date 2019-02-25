import axios from "axios";

export function getUserInfo(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get("/user/info", data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}