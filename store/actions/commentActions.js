import axios from "axios";


export function getComments(postId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get("/comment/public/"+postId).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function addComment(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/comment/",data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}


export function deleteComment(commentId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete("/comment/"+commentId).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function thumbsupComment(commentId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put("/comment/thumbsup/"+commentId).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function replyComment(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/comment/reply",data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function banBadComment(commentId,data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put("/comment/ban/"+commentId,data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}
