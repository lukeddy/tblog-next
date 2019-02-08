import React from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";

class PostList extends React.Component{
    render(){
        const {postList}=this.props
        return (
            <ul className="post-list">
                {postList.map((post,index)=>{
                    return(<PostItem key={index} post={post}></PostItem>)
                 })
                }
            </ul>
        );
    }
}

PropTypes.propTypes={
    postList:PropTypes.array.isRequired
}

export default PostList