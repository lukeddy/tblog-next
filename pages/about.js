import React from "react";
import Head from 'next/head';
import Layout from '../components/MyLayout'

export default () => (
    <Layout>
        <Head>
            <meta name="title" content="I am about page" />
            <meta name="description" content='about description'  />
        </Head>
        <p>This is the about page</p>
        <p>
            <button className="btn btn-warning">button</button>
        </p>
    </Layout>
)
