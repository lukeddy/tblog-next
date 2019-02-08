import React from "react";
import Link from 'next/link'

const Nav = () => (
    <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <Link href="/">
                <a className="navbar-brand hidden-sm">
                    <span className="tblog-leaf-logo">&nbsp;</span>
                </a>
            </Link>
            <form className="navbar-form pull-right" action="/search">
                <div className="form-group hidden-xs">
                    <div className="input-group">
                        <div className="input-group-addon"><i className="glyphicon glyphicon-search"></i></div>
                        <input type="text" name="keywords" className="form-control" placeholder=""/>
                    </div>
                </div>
            </form>
        </div>
        <div className="navbar-collapse collapse pull-right">
            <ul className="nav navbar-nav">
                <li><Link href="/"><a>首页</a></Link></li>
                <li><Link href="/about"><a>关于</a></Link></li>
                <li><Link href="/register"><a>注册</a></Link></li>
                <li><Link href="/login"><a>登陆</a></Link></li>
            </ul>
        </div>
    </div>
)

export default Nav
