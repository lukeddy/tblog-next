import React from 'react';
import Nav from '../../components/Nav'
import Pagination from "../../components/common/Pagination";
import Advertise from "../../components/Advertise";
import Alert from '../../components/common/Alert';
import { Link, Router } from '../../routes'
import {connect} from 'react-redux';
import {fetchPostList,deletePost} from '../../store/actions/postActions';


class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pager:{},
            loading:false,
            currentPage:1,
            alertData:{},
        }
        this.loadData=this.loadData.bind(this);
        this.goToPage=this.goToPage.bind(this);
    }

    componentDidMount(){
        this.loadData(this.state.currentPage)
    }

    loadData(pageNo){
        this.setState({loading:true});
        this.props.fetchPostList({pageNO:pageNo}).then((response)=>{
            this.setState({loading:false});
            //this.setState({alertData:response.data});
            if(response.data.status){
                this.setState({pager:response.data.data});
            }
        }).catch(error=>{
            console.log(error);
            this.setState({loading:false});
            this.setState({alertData:{status:false,msg:"获取帖子数据失败"}});
        });
    }
    goToPage(pageNo){
        console.log("go to page:"+pageNo);
        this.setState({currentPage:pageNo},this.loadData(pageNo))
    }

    handleDelete=(postId)=>{
        this.props.deletePost(postId).then((response)=>{
            if(response.data.status){
                console.log('post delete:',response.data.data)
                this.setState({alertData:response.data});
                this.loadData(this.state.currentPage)
            }
        }).catch(error=>{
            console.log(error);
            this.setState({alertData:{status:false,msg:"删除帖子信息失败"}});
        });
    }

    render(){

        const {pager,alertData,loading}=this.state;
        const {isAuthenticated}=this.props;

        let postItems=null;
        if(pager&&pager.totalPages>0){
            postItems = pager.content.map((post) =>
                <tr key={post.id}>
                    <td>
                        {/*<Link href={'/detail/'+post.id}><a>{post.title}</a></Link>*/}
                        <Link route='detail' params={{ postId: post.id }}>
                            <a  className="title">{post.title}</a>
                        </Link>
                    </td>
                    <td>{post.category.catName}</td>
                    <td>{post.createAtFormatted}</td>
                    <td>{post.updateAtFormatted}</td>
                    <td>
                        {/*<Link href={'/postedit/'+post.id}><a>修改</a></Link>*/}
                        <Link route='admin/postedit' params={{ postId: post.id }}><a>修改</a></Link>
                        <span className='link' onClick={this.handleDelete.bind(this,post.id)}>删除</span>
                    </td>
                </tr>
            );
        }else{
            postItems =<tr><td className="text-center" colSpan="5">没有数据</td></tr>
        }

        return(
            <div className="container main">
                <Nav isAuthenticated={isAuthenticated}></Nav>
                <div className="col-md-3">
                    <Advertise/>
                </div>
                <div className="col-md-9">
                    <ul className="breadcrumb">
                        <li><Link href="/"><a>主页</a></Link><span className="divider"></span></li>
                        <li className="active">帖子管理</li>
                    </ul>
                    <div className="panel">
                        <div className="panel-body">
                            <Alert alertData={alertData}/>
                            <h4>帖子列表 <Link href="/admin/postadd"><a>[新增]</a></Link></h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>帖子标题</th>
                                        <th>栏目</th>
                                        <th>创建日期</th>
                                        <th>更新日期</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && <tr><td className="text-center" colSpan="5">数据加载中....</td></tr>}
                                    {postItems}
                                </tbody>
                            </table>
                            {pager.totalPages>0 &&<Pagination totalPages={pager.totalPages} currentPage={pager.number+1} jumpPage={this.goToPage}/> }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
    };
}

export default connect(mapStateToProps,{fetchPostList,deletePost})(Post)
