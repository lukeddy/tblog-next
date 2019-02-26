import React  from "react"
import  {withRouter} from 'next/router'
import Link from 'next/link'
import Nav from '../components/Nav'
import Alert from '../components/common/Alert'
import Advertise from "../components/Advertise"
import Comment from "../components/Comment";
import like from '../static/images/ico/like.svg'
import comment from '../static/images/ico/comment.svg'
import collect from '../static/images/ico/collect.svg'
import share from '../static/images/ico/share.svg'
import axios from "axios"
import getConfig from 'next/config'
import {connect} from "react-redux";

class Detail extends React.Component{

    static async getInitialProps({store, isServer, pathname, query, req}) {
        // console.log('props',query)
        // return {post:null,comments:null,alertData:{status:false,msg:"测试"}}

        const {postId}=query
        try{
            const response =await axios.get("/post/detail/"+postId)
            const {status,msg,data}=response.data
            //console.log('post:',data)
            if(status){
                const commentResponse=await axios.get("/comment/public/"+data.id)
                //console.log("comment response:",commentResponse.data)
                let comments=null
                if(commentResponse.data.status){
                    comments=commentResponse.data.data
                }
                return {post:data,comments:comments,alertData:null}
            }else{
                return {post:null,comments:null,alertData:{status:false,msg:msg}}
            }
        }catch(error){
            return {post:null,comments:null,alertData:{status:false,msg:error.message}}
        }
    }

    constructor(props){
        super(props)
    }

    reloadComments(){
        console.log('reload comments')
    }

    render(){
        const {post,comments,alertData,isAuthenticated}=this.props
        const {serverBaseUrl} = getConfig().publicRuntimeConfig

        return (
            <React.Fragment>
                <div className="container main">
                    <Nav isAuthenticated={isAuthenticated}></Nav>
                    <div className="container">
                        {/*{loading &&<div className="text-center">数据加载中...</div>}*/}
                        <div className="col-md-9" id="content">
                            <ul className="breadcrumb">
                                <li><Link href="/"><a>主页</a></Link><span
                                    className="divider"></span></li>
                                <li>Java<span className="divider"></span></li>
                            </ul>
                            {alertData &&<Alert alertData={alertData}/>}
                            {/*<BarLoader loading={loading} widthUnit={'px'} heightUnit={'px'} width={823} height={6} color={'#fa0000'}/>*/}
                            {post &&
                            <div>
                                <div className="panel">
                                    <div className="header topic-header">
                                        <h1 className="topic-full-title">{post.title}</h1>
                                        <div className="changes">
                                            <span>3个月前</span><span>&nbsp;&nbsp;作者：<a
                                            href="/tblog/pub/user/5b7d59bbbf578d05d7046ef6">{post.author.username}</a></span><span>&nbsp;&nbsp;51次浏览</span>
                                        </div>
                                    </div>
                                    <div className="inner topic">
                                        {post.thumbURL &&
                                        <div className="row text-center topic-thumb">
                                            <img src={serverBaseUrl+post.thumbURL}
                                                 alt={post.title} style={{maxWidth:"100%",height:"auto"}}/>
                                        </div>
                                        }
                                        {post.desc &&<div className="row well">{post.desc}</div>}

                                        <div className="topic-content">
                                            <div dangerouslySetInnerHTML={{__html: post.contentHTML}}></div>
                                        </div>
                                        <div className="topic-tags">
                                            <span>标签：</span>
                                            {post.tags.map((tag, i) => {
                                                return(
                                                    <a key={i} href="/tblog/tag/spring" className="tag">{tag}</a>
                                                )
                                            })}
                                        </div>
                                        <div className="topic-action-wrapper">
                                            <div className="topic-actions">
                                                <a href="/tblog/like/add/5b87dceabf578d115d2357ac" className="action-link">
                                                    <img src={like} alt=""/>
                                                    <span>喜欢</span>
                                                </a>

                                                <a href="#reply" className="action-link">
                                                    <img src={comment} alt=""/>
                                                    <span>评论</span>
                                                </a>
                                                <a id="collectLink" href="/tblog/collect/add/5b87dceabf578d115d2357ac"
                                                   className="action-link" title="收藏">
                                                    <img src={collect} alt=""/>
                                                </a>

                                                <a href="/" className="action-link">
                                                    <img src={share} alt=""/>
                                                    <span>分享</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {post &&
                                <Comment postId={post.id}
                                         comments={comments}
                                         reloadComments={this.reloadComments}/>}
                            </div>
                            }
                        </div>
                        <div className="col-md-3">
                            <Advertise/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    };
}

export default withRouter(connect(mapStateToProps,null)(Detail))
