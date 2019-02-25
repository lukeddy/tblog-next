import axios from "axios";


export function fetchHomeData(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/home", data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function fetchPostList(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/post/list", data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function createPost(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/post", data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function getPost(postId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get("/post/detail/"+postId).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}


export function updatePost(postId,data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put("/post/"+postId, data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function deletePost(postId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete("/post/"+postId).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}