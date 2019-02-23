import React from 'react';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {deleteComment,thumbsupComment,banBadComment} from '../actions/commentActions';
import Alert from './common/Alert';
import CommentReply from './CommentReply';
import CommentReplyForm from "./CommentReplyForm";
import CommentBanDialog from './CommentBanDialog';
import Remarkable from 'remarkable'
import * as R from 'ramda'

const md = new Remarkable('full', {
    html: true,
    breaks: false,
})

class CommentItem extends React.Component{

    state={
        currentReplyForm:null,
        dialogShow:false,
        alertData:{},
    }

    thumbsUpClicked=(commentId)=>{
        console.log('thumbs up',commentId)
        //todo thumbs up comment
        // this.props.thumbsupComment(commentId).then((response)=>{
        //     if(response.data.status){
        //         this.props.reloadComments();
        //     }else{
        //         this.setState({alertData:response.data});
        //     }
        // }).catch(error=>{
        //     console.log(error);
        //     this.setState({alertData:{status:false,msg:"点赞评论失败:"+error.toString()}});
        // });
    }
    deleteClicked=(commentId)=>{
        console.log('delete',commentId)
        //todo delete comment
        // this.props.deleteComment(commentId).then((response)=>{
        //     if(response.data.status){
        //         this.props.reloadComments();
        //     }else{
        //         this.setState({alertData:response.data});
        //     }
        // }).catch(error=>{
        //     console.log(error);
        //     this.setState({alertData:{status:false,msg:"删除评论失败:"+error.toString()}});
        // });
    }
    replyClicked=(commentId)=>{
        console.log('reply',commentId)
        this.setState({currentReplyForm:commentId})
    }

    banClicked=(commentId)=>{
        //console.log('ban',commentId)
        this.showDialog(true)
    }

    showDialog=(showStatus)=>{
        this.setState({dialogShow:showStatus})
    }


    render(){
        const {alertData,currentReplyForm,dialogShow}=this.state
        const {comment,auth}=this.props
        const safeBody = R.replace(/---(\r\n|\r|\n)/g, '----', comment.commentMD || '')
        let html = ''
        try {
            html = md.render(safeBody)
            console.log('comment html:',html)
        } catch (e) {
            console.log('parse comment error:',e)
        }

        return(
            <div className="comment" id="5ba4accfbf578d447ea53384">
                <a className="avatar" href="/test" target="_blank">
                    <img src={comment.author.avatarURL} title={comment.author.username} alt={comment.author.username}/>
                </a>
                <div className="content">
                    <a className="author" href="/test" target="_blank">{comment.author.username}</a>
                    <div className="metadata">
                        <span className="date">{comment.friendlyTime}</span>
                    </div>
                    <div className="text">
                        {comment.parentComment &&<CommentReply parentComment={comment.parentComment}/>}
                        <div dangerouslySetInnerHTML={{__html:comment.commentHTML}}/>
                    </div>
                    <div className="operations">
                        <span className="op-icon like" onClick={this.thumbsUpClicked.bind(this,comment.id)}>
                            <i className="fa fa-thumbs-up"></i> <span>{comment.thumbsUPCount}</span>赞
                        </span>
                        {/*{auth.isAuthenticated &&*/}
                            {/*<span className="op-icon reply btn-reply-to" onClick={this.replyClicked.bind(this,comment.id)}>*/}
                                {/*<i className="fa fa-comments"></i> 回复*/}
                            {/*</span>*/}
                        {/*}*/}
                        {/*{auth.isAuthenticated &&*/}
                            {/*<span className="op-icon remove" onClick={this.deleteClicked.bind(this, comment.id)}>*/}
                                {/*<i className="fa fa-trash"></i> 删除*/}
                            {/*</span>*/}
                        {/*}*/}
                        <span className="op-icon ban" onClick={this.banClicked.bind(this,comment.id)}>
                            <i className="fa fa-ban"></i> 举报
                        </span>
                    </div>
                    {currentReplyForm &&
                        <div className="reply-box">
                            <CommentReplyForm
                                comment={comment}
                                reloadComments={this.props.reloadComments}/>
                        </div>
                    }
                </div>
                <Alert alertData={alertData}/>

                <CommentBanDialog comment={comment}
                                  show={dialogShow}
                                  showDialog={this.showDialog}/>
            </div>
        );
    }
}

PropTypes.propTypes={
    comment:PropTypes.object.isRequired,
    reloadComments:PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        auth:state.authReducer
    };
}

// export default connect(mapStateToProps,{deleteComment,thumbsupComment,banBadComment})(CommentItem)
export default CommentItem
