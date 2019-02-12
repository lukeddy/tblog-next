import React from "react";
import Alert from './common/Alert';
// import SMEditor from "./editor/SMEditor";
import PropTypes from "prop-types";
// import {connect} from 'react-redux';
// import {replyComment} from '../actions/commentActions';

class CommentReplyForm extends React.Component{

    state={
        contentMD:"",
        contentHTML:"",
        alertData:{}
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            commentId:this.props.comment.id,
            replyMD:this.state.contentMD,
            replyHtml:this.state.contentHTML
        }
        console.log('reply aaa:',data)
        //todo reply comment
        // this.props.replyComment(data).then((response)=>{
        //     this.setState({alertData:response.data});
        //     if(response.data.status){
        //         this.props.reloadComments();
        //     }
        // }).catch(error=>{
        //     console.log(error);
        //     this.setState({alertData:{status:false,msg:"回复评论失败:"+error.toString()}});
        // });
    }

    updateMarkdown=(markdown,html)=>{
        this.setState({contentMD:markdown});
        this.setState({contentHTML:html});
    }

    render(){
         const {alertData}=this.state
         const {comment}=this.props
         const toolbar=[
            'bold',
            'italic',
            'heading',
            '|',
            'quote',
            'code',
            'horizontal-rule',
            'unordered-list',
            'ordered-list',
            '|',
            'link',
            '|',
            'side-by-side',
            'fullscreen',
            '|',
            {
                name: 'guide',
                action () {
                    const win = window.open(
                        'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                        '_blank',
                    );
                    if (win) {
                        // Browser has allowed it to be opened
                        win.focus();
                    }
                },
                className: 'fa fa-info-circle',
                title: 'Markdown 语法！',
            },
        ]

        return(
            <div className="comment-form">
                <Alert alertData={alertData} />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p className="text-right"><strong>回复@{comment.author.username}</strong></p>
                        <textarea name="test" id="" cols="30" rows="10"></textarea>
                        {/*<SMEditor toolbar={toolbar} updateMarkdown={this.updateMarkdown} defaultValue={this.state.contentMD}/>*/}
                    </div>
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-success">回复</button>
                    </div>
                </form>
            </div>
        );
    }
}

PropTypes.propTypes={
    comment:PropTypes.string.isRequired,
    reloadComments:PropTypes.func.isRequired,
}

// export default connect(null,{replyComment})(CommentReplyForm)
export default CommentReplyForm
