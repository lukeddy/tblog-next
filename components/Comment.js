import React from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import PropTypes from 'prop-types';

class Comment extends React.Component{

    render(){
        const {comments}=this.props

        return(
            <div className="row comment-wrapper">
                <h3 className="header">{comments?comments.length:0} 条评论</h3>
                {comments&&comments.length>0 && comments.map((comment,index)=>{
                    return (<CommentItem key={index}
                                         comment={comment}
                                         reloadComments={this.props.reloadComments}/>)
                })}
                <CommentForm postId={this.props.postId}
                             reloadComments={this.props.reloadComments}/>
            </div>
        );
    }
}

PropTypes.propTypes={
    postId:PropTypes.string.isRequired,
    comments:PropTypes.array.isRequired,
    reloadComments:PropTypes.func.isRequired,
}

export default Comment