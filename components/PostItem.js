import React from "react";
// import Link from "next/link";
// import Router from "next/router"
import { Link, Router } from '../routes'
import PropTypes from "prop-types";
import getConfig from 'next/config'

class PostItem extends React.Component{

    render(){

        const {post}=this.props
        const {serverBaseUrl} = getConfig().publicRuntimeConfig

        return (
            <li className="post-item">
                <div className="entry">
                    <div className="content-box">
                        <div className="info-box">
                            <div className="meta-row">
                                <ul className="meta-list">
                                    {post.top &&<li className="item recommended">置顶</li>}
                                    <li className="item username">
                                        <a href="/tblog/pub/user/5b7d59bbbf578d05d7046ef6">{post.author.username}</a>.
                                        {post.friendlyTime}
                                    </li>
                                    <li className="item category">
                                        <a href="/tblog/?tab=java">
                                            <span className="topiclist-tab">{post.category.catName}</span>
                                        </a>
                                    </li>
                                    <li className="item tag">
                                        {post.tags.map((tag,index)=>{
                                            return(<a key={index} className="tag" href="/tblog/tag/spring">{tag}</a>)
                                        })}
                                    </li>
                                    <li className="item">{post.visitCount}次阅读</li>
                                </ul>
                            </div>
                            <div className="title-row">
                                <Link route='detail' params={{ postId: post.id }} prefetch>
                                    <a  className="title">{post.title}</a>
                                </Link>

                                {/*<Link  as={`/detail/${post.id}`}  href={`/detail/?id=${post.id}`}>*/}
                                    {/*<a  className="title">{post.title}</a>*/}
                                {/*</Link>*/}
                            </div>
                            <div className="desc-row">{post.desc}</div>
                            <div className="action-row">
                                <div className="action-list">
                                    <a className="action like" href="/">
                                        <span className="icon"></span>
                                        <span className="title">
                                            {post.likedUsers?post.likedUsers.length:0}
                                        </span>
                                    </a>
                                    <a className="action comment"
                                       href="/tblog/topic/5b87dceabf578d115d2357ac#comment">
                                        <span className="icon"></span>
                                        <span className="title">{post.replyCount}评论</span>
                                    </a>
                                    <a className="action collect hover" href="/">
                                        <span className="icon"></span>
                                        <span className="title">{post.collectCount}收藏</span>
                                    </a>
                                    <a className="action share hover" href="/">
                                        <span className="icon"></span>
                                        <span className="title">分享</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="thumb-box" style={{backgroundSize: 'cover',backgroundImage:'url('+serverBaseUrl+post.thumbURL+')'}}></div>
                    </div>
                </div>
            </li>
        );
    }
}

PropTypes.propTypes={
    post:PropTypes.object.isRequired
}

export default PostItem
