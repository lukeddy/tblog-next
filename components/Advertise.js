import React from "react"
import Link from 'next/link'
import logo from '../static/images/logo.svg'

class Advertise extends React.Component{

    render(){
        return (
            <div>
                <div className="panel">
                    <div className="header">
                        <span className="col_fade">关于</span>
                    </div>
                    <div className="inner">
                        <p>TBlog：tblog开源博客</p>
                        <p>在这里你可以：</p>
                        <ul>
                            <li>提出由建设性的建议</li>
                            <li>随意修改代码，修改成您需要的风格</li>
                            <li>分享给您的朋友</li>
                        </ul>
                    </div>
                </div>
                <div className="panel">
                    <div className="header">
                        <span className="col_fade">广告</span>
                    </div>
                    <div className="inner ads">
                        <Link href="/">
                            <a className="banner">
                                <img src={logo} alt="ads"/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Advertise
