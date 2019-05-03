import React, {Component} from 'react';
import Router from 'next/router';
import Advertise from "../components/Advertise";
import Pagination from "../components/common/Pagination";
import Alert from '../components/common/Alert';
import PostList from "../components/PostList";
import Menu from "../components/Menu";
import {BarLoader} from 'react-spinners';
import axios from "axios";
import {connect} from 'react-redux';
import Nav from '../components/Nav'
import {fetchHomeData} from '../store/actions/postActions';
import {logout} from '../store/actions/authActions';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentTab:"all",
        }

        //一定要写这个binding，不然在调用分页接口时会报goToPage is not a function
        this.goToPage=this.goToPage.bind(this);
    }

    static async getInitialProps({store,req,query}) {
        const {pageSize=3,pageNO=1,tab="all"}=query
        // console.log('初始化')
        console.log('query',query)
        console.log('store',store)
        const currentFilter={pageNO:pageNO, tab: tab}
        try{
            const params={pageSize:pageSize,pageNO: pageNO,tab:tab}
            const response =await axios.post("/home",params)
            const {status,msg,data}=response.data
            //console.log('data aaa:',status,data)
            if(status){
                return {catList:data.catList,pager:data.pager,currentTab:data.indexVo.tab,alertData:null,currentFilter}
            }else{
                return {alertData:{status:false,msg:msg},currentFilter}
            }
        }catch(error){
            return {alertData:{status:false,msg:error.message},currentFilter}
        }
    }

    goToPage(pageNo){
        //console.log("go to page:"+pageNo);
        console.log('current tab:',this.state.currentTab)
        Router.push(`/?pageNO=${pageNo}&tab=${this.state.currentTab}`)
    }


    goToTab=(tab)=>{
        // console.log('goto tab:',tab)
        this.setState({currentTab: tab});
        Router.push(`/?pageNO=1&tab=${tab}`)
    }

    render() {
        const {pager,catList,currentFilter,alertData,isAuthenticated}=this.props

        return (
            <div className="container main">
                <Nav isAuthenticated={isAuthenticated}></Nav>
                {/*{isAuthenticated && <h1>成功登陆</h1>}*/}
                {alertData && <Alert alertData={alertData}/>}
                <div className="col-md-9">
                    {/*<BarLoader loading={loading} widthUnit={'px'} heightUnit={'px'} width={823} height={6} color={'#fa0000'}/>*/}
                    <div className="panel">
                        <div className="header">
                            {catList &&<Menu catList={catList} currentTab={currentFilter.tab} goToTab={this.goToTab}/>}
                        </div>
                        <div className="inner no-padding">
                            {pager&&pager.content.length===0 && <div className='row text-center'>没有数据</div>}
                            {pager&&pager.content.length>0 && <PostList postList={pager.content}></PostList>}
                            {pager&&pager.totalPages>0 &&<Pagination totalPages={pager.totalPages} currentPage={pager.number+1} jumpPage={this.goToPage.bind(this)}/> }
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

export default connect(mapStateToProps,{fetchHomeData,logout})(Index)
