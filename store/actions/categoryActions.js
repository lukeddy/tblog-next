import axios from "axios";
import {CATEGORY_LIST_FETCHED} from "./types";

export function fetchCategoryList(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/category/list", data).then(response => {
                if(response.data.status){
                    dispatch({type:CATEGORY_LIST_FETCHED,pager:response.data.data});
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function fetchAllCategory() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get("/category/all").then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}


export function createCategory(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/category/add", data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export function getCategory(catId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get("/category/"+catId,null).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}


export function updateCategory(catId,data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put("/category/"+catId, data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    }
}