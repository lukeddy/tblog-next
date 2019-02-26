import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Advertise from "../components/Advertise";
import InlineError from "../components/common/InlineError";
import Alert from '../components/common/Alert';
import {connect} from 'react-redux';
import {login} from '../store/actions/authActions';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: {
                username: "",
                password: ""
            },
            loading:false,
            errors: {},
            alertData:{},
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
            this.setState({loading:true});
            this.props.login(this.state.data).then((response)=>{
                this.setState({loading:false});
                this.setState({alertData:response.data});
                if(response.data.status){
                    //window.location.replace("/");
                    Router.push('/')
                }
            }).catch(error=>{
                console.log(error);
                const data={
                    status:false,
                    msg:error.toString()
                }
                this.setState({alertData:data});
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
        const { data, errors,loading,alertData } = this.state
        const {isAuthenticated}=this.props

        return (
                <div className="container main">
                    <Nav isAuthenticated={isAuthenticated}></Nav>
                    <div className="container">
                        <div className="col-md-9">
                            <ul className="breadcrumb">
                                <li><Link href="/"><a>主页</a></Link><span className="divider"></span></li>
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
                                                <button className="btn btn-success" type="submit" disabled={loading}>登录</button>
                                            </div>
                                            <div className="btn-group" role="group">
                                                <button className="btn btn-default" type="reset">重置</button>
                                            </div>
                                        </div>
                                        <p>没有账户？点击<Link href="/register">
                                            <a>注册</a>
                                        </Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Advertise/>
                        </div>
                    </div>
                </div>

        );
    }
}

PropTypes.propTypes={
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    };
}

export default connect(mapStateToProps,{login})(LoginPage)
