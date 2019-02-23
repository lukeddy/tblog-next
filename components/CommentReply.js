import React from 'react';
import PropTypes from "prop-types";

class CommentReply extends React.Component{
    render(){
        const {parentComment}=this.props
        return(
            <div className="ref">
                {/*递归调用自身*/}
                {parentComment.parentComment &&<CommentReply parentComment={parentComment.parentComment}/> }
                {parentComment.author &&<h4>引用来自“{parentComment.author.username}”的评论</h4>}
                <div dangerouslySetInnerHTML={{__html: parentComment.commentHTML}}></div>
           </div>
        );
    }
}

PropTypes.propTypes={
    parentComment:PropTypes.object.isRequired,
}

export default CommentReply
