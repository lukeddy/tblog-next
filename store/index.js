import AuthStore from "./AuthStore";


function initRootStore() {
    return {
        authStore: new AuthStore(),
    }
}

export default initRootStore


// const stores = {
//     authStore: new AuthStore(),
//     indexStore: new IndexStore(),
//     postStore:new PostStore(),
//     commentStore:new CommentStore(),
//     categoryStore:new CategoryStore(),
//     uploadStore:new UploadStore(),
// }
//
//
// export default stores
