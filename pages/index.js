import React, {Component} from 'react';
import Advertise from "../components/Advertise";
import Pagination from "../components/common/Pagination";
import Alert from '../components/common/Alert';
import PostList from "../components/PostList";
import Menu from "../components/Menu";
import {BarLoader} from 'react-spinners';
import axios from "axios";
import {connect} from 'react-redux';
import Nav from '../components/Nav'
// import {login} from "../store/actions/authActions";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentFilter:{
                pageNO:1,
                tab:"all"
            },
            loading:false,
            alertData:null,
        }

        //一定要写这个binding，不然在调用分页接口时会报goToPage is not a function
        this.loadData=this.loadData.bind(this);
        this.goToPage=this.goToPage.bind(this);
    }

    static async getInitialProps() {
        // console.log('初始化')
        try{
            const params={pageNO: 1,tab:"all"}
            const response =await axios.post("/home",params)
            const {status,msg,data}=response.data
            //console.log('data aaa:',status,data)
            if(status){
                return {catList:data.catList,pager:data.pager,currentTab:data.indexVo.tab,alertData:null}
            }else{
                return {alertData:{status:false,msg:msg}}
            }
        }catch(error){
            return {alertData:{status:false,msg:error.message}}
        }
    }

   async loadData(pageNo,tab){
        //console.log("loading data: "+pageNo);
       try{
           this.setState({loading:true});
           const response =await axios.post("/home",{pageNO:pageNo,tab:tab})
           const {status,msg,data}=response.data
           if(status){
               this.setState({pager:response.data.data.pager});
               this.setState({catList:response.data.data.catList});
               this.setState({currentFilter:response.data.data.indexVo});
           }else{
               this.setState({alertData:response.data});
           }
           this.setState({loading:false});
       }catch(error){
           console.log(error);
           this.setState({loading:false});
           this.setState({alertData:{status:false,msg:"获取帖子数据失败"}});
       }
    }

    goToPage(pageNo){
        //console.log("go to page:"+pageNo);
        this.setState({
            currentFilter: { ...this.state.currentFilter, pageNo: pageNo }
        },this.loadData(pageNo,this.state.currentFilter.tab));
    }


    goToTab=(tab)=>{
        console.log('goto tab:',tab)
        this.setState({
            currentFilter: { ...this.state.currentFilter, tab: tab }
        });

        this.loadData(1,tab);
    }

    render() {
        const {currentFilter, alertData,loading}=this.state
        const {pager,catList,isAuthenticated}=this.props

        return (
            <div className="container main">
                <Nav isAuthenticated={isAuthenticated}></Nav>
                <div className="container">
                    {isAuthenticated && <h1>成功登陆</h1>}
                    {alertData && <Alert alertData={alertData}/>}
                    <div className="col-md-9">
                        <BarLoader loading={loading} widthUnit={'px'} heightUnit={'px'} width={823} height={6} color={'#fa0000'}/>
                        {!loading &&<div className="panel">
                            <div className="header">
                                {catList &&<Menu catList={catList} currentTab={currentFilter.tab} goToTab={this.goToTab}/>}
                            </div>
                            <div className="inner no-padding">
                                {pager&&pager.content.length===0 && <div className='row text-center'>没有数据</div>}
                                {pager&&pager.content.length>0 && <PostList postList={pager.content}></PostList>}
                                {pager&&pager.totalPages>0 &&<Pagination totalPages={pager.totalPages} currentPage={pager.number+1} jumpPage={this.goToPage}/> }
                            </div>
                        </div>
                        }
                    </div>
                    <div className="col-md-3">
                        <Advertise/>
                    </div>
                </div>
            </div>
        );
    }
}

// Index.propTypes = {
//     auth: PropTypes.object.isRequired,
// }

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    };
}

export default connect(mapStateToProps,null)(Index)
