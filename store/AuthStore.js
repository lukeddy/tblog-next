import {decorate, action, observable, runInAction} from "mobx";
import axios from "axios";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import {STATUS_INIT,STATUS_BEGIN, STATUS_ERROR, STATUS_SUCCESS} from './Status';

export default class AuthStore {

   isAuthenticated= false;
   token=null;
   status = STATUS_INIT;
   alertData={};
   userInfo=null;

  login = (credentials)=>{
        this.status=STATUS_BEGIN;
        this.isAuthenticated=false;
        this.token=null;

      return new Promise(async (resolve, reject) => {
          try {
              const response = await axios.post("/login", credentials);
              if(response.data.status){
                  this.status=STATUS_SUCCESS;
                  //console.log(response.data.data);
                  const {token,userInfo}=response.data.data;
                  this.setToken(token)
                  this.userInfo=userInfo
                  resolve(response)
              }else{
                  this.status =STATUS_ERROR;
                  this.alertData={status:false,msg:response.data.msg};
              }
          } catch (error) {
              runInAction(() => {
                  this.status = STATUS_ERROR;
                  this.alertData={status:false,msg:'服务端出错，请稍后再试'};
              });
              reject(error);
          }

      });
  }

  setToken= token => {
    localStorage.tblogToken =token;
    setAuthorizationHeader(token);
    this.isAuthenticated=token!=null;
    this.token=token;
  };

  register = (data)=>{
      this.status=STATUS_BEGIN;
      return new Promise(async (resolve, reject) => {
          try {
              const response = await axios.post("/register", data);
              if(response.data.status){
                  this.status=STATUS_SUCCESS;
                  this.alertData={status:false,msg:response.data.msg};
                  resolve(response)
              }else{
                  this.status =STATUS_ERROR;
                  this.alertData={status:false,msg:response.data.msg};
              }
          } catch (error) {
              runInAction(() => {
                  this.status = STATUS_ERROR;
                  this.alertData={status:false,msg:'注册时出错'};
              });
              reject(error);
          }
      });
  }

    logout = ()=>{
        this.status=STATUS_BEGIN;
        return new Promise(async (resolve) => {
            localStorage.removeItem("tblogToken");
            setAuthorizationHeader();
            this.isAuthenticated=false;
            this.token=null;
            this.status=STATUS_SUCCESS;
            resolve();
        });
    }


    getUserInfo = ()=>{
        this.status=STATUS_BEGIN;
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get("/user/info");
                if(response.data.status){
                    this.status=STATUS_SUCCESS;
                    this.userInfo=response.data.data;
                    resolve(response)
                }else{
                    this.status =STATUS_ERROR;
                    this.alertData={status:false,msg:response.data.msg};
                }
            } catch (error) {
                runInAction(() => {
                    this.status = STATUS_ERROR;
                    this.alertData={status:false,msg:'获取登陆用户信息时出错'};
                });
                reject(error);
            }
        });
    }
}


decorate(AuthStore, {
    isAuthenticated:observable,
    token:observable,
    status : observable,
    alertData:observable,
    setToken: action
});
