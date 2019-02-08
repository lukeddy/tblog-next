import React from "react";
import {withRouter} from 'next/router'

const Content = withRouter((props) => (
    <div>
        <h1>{props.router.query.title}</h1>
        <p>This is the blog post content.</p>
    </div>
))

const Page = (props) => (
    <div>
        <Content />
    </div>
)

export default Page
