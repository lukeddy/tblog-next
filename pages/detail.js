import React from 'react'
import Link from 'next/link'
import  {withRouter} from 'next/router'
import axios from "axios";
import {BarLoader} from 'react-spinners';
import Alert from '../components/common/Alert';
import Advertise from "../components/Advertise";
import like from '../static/images/ico/like.svg'
import comment from '../static/images/ico/comment.svg'
import collect from '../static/images/ico/collect.svg'
import share from '../static/images/ico/share.svg'
import getConfig from 'next/config'

class Detail extends React.Component{
    state={
        postId:null,
        post:null,
        comments:[],
        loading:false,
        alertData:{},
    }

    static async getInitialProps(router) {
        console.log('router:',router)
        const {id}=router.query
        try{
            const response =await axios.get("/post/detail/"+id)
            const {status,msg,data}=response.data
            console.log('post:',data)
            if(status){
                return {post:data,alertData:null}
            }else{
                return {alertData:{status:false,msg:msg}}
            }
        }catch(error){
            return {alertData:{status:false,msg:error.message}}
        }
    }

    render(){
       const {loading}=this.state
       const {post,alertData}=this.props
        const {serverBaseUrl} = getConfig().publicRuntimeConfig

        return(
            <div className="container">
                {/*{loading &&<div className="text-center">数据加载中...</div>}*/}
                <div className="col-md-9" id="content">
                    <ul className="breadcrumb">
                        <li><Link href="/">主页</Link><span
                            className="divider"></span></li>
                        <li>Java<span className="divider"></span></li>
                    </ul>
                    {alertData &&<Alert alertData={alertData}/>}
                    <BarLoader loading={loading} widthUnit={'px'} heightUnit={'px'} width={823} height={6} color={'#fa0000'}/>
                    {!loading&&post &&
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
                        {/*<Suspense fallback={<div className="text-center">加载评论中......</div>}>*/}
                            {/*<Comment postId={this.state.postId}*/}
                                     {/*comments={comments}*/}
                                     {/*reloadComments={this.reloadComments}/>*/}
                        {/*</Suspense>*/}
                    </div>
                    }
                </div>
                <div className="col-md-3">
                    <Advertise/>
                </div>
            </div>
        );
    }
}

export default withRouter(Detail)
