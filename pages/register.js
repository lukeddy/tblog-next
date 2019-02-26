import React from "react";
import Advertise from "../components/Advertise";
import Link from "next/link";
import Validator from 'validator';
import InlineError from '../components/common/InlineError';
import Nav from '../components/Nav';
import Alert from '../components/common/Alert';
import {connect} from 'react-redux';
import {register} from '../store/actions/authActions';

class Register extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:{
                username:'',
                password:'',
                email:'',
            },
            loading:false,
            errors:{},
            alertData:{},
        };

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
            this.setState({loading:true});
            this.props.register(this.state.data).then((response)=>{
                this.setState({loading:false});
                this.setState({alertData:response.data});
            }).catch(error=>{
                console.log(error);
                const data={
                    status:false,
                    msg:error.toString()
                }
                this.setState({alertData:data});
                this.setState({loading:false});
            });
        }
    }

    validate(data){
        const errors = {};
        if(!Validator.isEmail(data.email)) errors.email="邮件地址无效"
        if(!data.username) errors.username = "用户名不能为空";
        if(data.username&&(!Validator.isAlphanumeric(data.username)||!Validator.isLowercase(data.username)||!Validator.isLength(data.username,{min:5,max:12}))) errors.username="用户名只能是5到12个小写字母和数字组合"
        if(!data.password) errors.password = "密码不能为空";
        if(data.password&&(!Validator.isLength(data.password,{min:3,max:16}))) errors.password="密码至少3位最多16位";
        return errors;
    }

    render(){

        const {data,errors,loading,alertData}=this.state
        const {isAuthenticated}=this.props

        return (
            <div className="container main">
                <Nav isAuthenticated={isAuthenticated}></Nav>
                <div className="col-md-9">
                    <ul className="breadcrumb">
                        <li><Link href="/"><a>主页</a></Link><span className="divider"></span></li>
                        <li className="active">注册</li>
                    </ul>
                    <div className="row wrapper">
                        <div className="col-sm-6 col-sm-offset-3">
                            <Alert alertData={alertData}/>
                            <form onSubmit={this.onSubmit}>
                                <h3 className="form-signin-header text-center">用户注册</h3>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">用户名:</div>
                                        <input value={data.username} onChange={this.onChange} name="username" className="form-control" placeholder="请输入用户名"/>
                                    </div>
                                    {errors.username && <InlineError text={errors.username} />}
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">密&nbsp;&nbsp;&nbsp;&nbsp;码:</div>
                                        <input value={data.password} onChange={this.onChange} type="password" name="password" className="form-control" placeholder="请输入密码"/>
                                    </div>
                                    {errors.password && <InlineError text={errors.password} />}
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">邮&nbsp;&nbsp;&nbsp;&nbsp;件:</div>
                                        <input value={data.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="电子邮件"/>
                                    </div>
                                    {errors.email && <InlineError text={errors.email} />}
                                </div>
                                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                    <div className="btn-group" role="group">
                                        <button className="btn btn-success" type="submit" disabled={loading}>注册</button>
                                    </div>
                                    <div className="btn-group" role="group">
                                        <button className="btn btn-default" type="reset">重置</button>
                                    </div>
                                </div>
                                 <p>已经有账户？点击<Link href="/login"><a>登陆</a></Link></p>
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

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    };
}

export default connect(mapStateToProps,{register})(Register)
