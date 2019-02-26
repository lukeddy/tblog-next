import React from "react";
import {connect} from "react-redux";
import {logout} from '../store/actions/authActions';
import Router from 'next/router'


class Logout extends React.Component{
    componentWillMount(){
        this.props.logout();
        Router.push('/login')
    }
    render(){
        return(
            <div className="container main">
                {/*登出*/}
            </div>
        )
    }
}

export default connect(null,{logout})(Logout)
