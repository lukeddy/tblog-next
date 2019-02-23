import React from 'react'
import Advertise from "./Advertise";
import Link from "next/link";
import InlineError from "./common/InlineError";
import Alert from './common/Alert';
import {inject, observer} from "mobx-react";
import {STATUS_BEGIN} from '../store/Status';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: {
                username: "",
                password: ""
            },
            errors: {},
        }

        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }
    onSubmit(e){
        e.preventDefault()
        //验证数据有效性
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.props.authStore.login(this.state.data).then(()=>{
                const {isAuthenticated} = this.props.authStore;
                if(isAuthenticated){
                    this.props.history.push("/home");
                }
            });
        }
    }

    validate(data){
        const errors = {};
        if (!data.username) errors.username = "用户名不能为空";
        if (!data.password) errors.password = "密码不能为空";
        return errors;
    }

    render(){
        const { data, errors } = this.state;
        const {status,alertData } = this.props.authStore;

        return (
            <div className="container main">
                <div className="col-md-9">
                    <ul className="breadcrumb">
                        <li><Link href="/">主页</Link><span className="divider"></span></li>
                        <li className="active">登录</li>
                    </ul>
                    <div className="row wrapper">
                        <div className="col-sm-6 col-sm-offset-3">
                            <Alert alertData={alertData}/>
                            <form onSubmit={this.onSubmit}>
                                <h3 className="form-signin-header text-center">登录TBlog</h3>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">用户名:</div>
                                        <input type="text" name="username" value={data.username} onChange={this.onChange} className="form-control"/>
                                    </div>
                                    {errors.username && <InlineError text={errors.username} />}
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">密&nbsp;&nbsp;&nbsp;&nbsp;码:</div>
                                        <input name="password" type="password" value={data.password} onChange={this.onChange} className="form-control"/>
                                    </div>
                                    {errors.password && <InlineError text={errors.password} />}
                                </div>
                                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                    <div className="btn-group" role="group">
                                        <button className="btn btn-success" type="submit" disabled={status===STATUS_BEGIN}>登录</button>
                                    </div>
                                    <div className="btn-group" role="group">
                                        <button className="btn btn-default" type="reset">重置</button>
                                    </div>
                                </div>
                                <p>没有账户？点击<Link href="/register">注册</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <Advertise/>
                </div>
            </div>
        );
    }
}

export default inject("authStore")(observer(Login));
