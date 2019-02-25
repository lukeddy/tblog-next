import axios from "axios";

export function uploadFile(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const headers={
                headers: { 'Content-Type': 'multipart/form-data' },
            }
            axios.post("/upload/file", data,headers).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}