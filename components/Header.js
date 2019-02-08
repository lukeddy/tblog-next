import React from "react";
import Link from 'next/link'
import Head from 'next/head'

const Header = () => (
    <div>
        <style jsx global>{`
                  body {
                    background: #000;
                    font: 11px menlo;
                    color: #fff;
                  }
                  .nav{
                    background:#0ff;
                    padding:10px;
                  }
                  .footer{
                    background:#888;
                    text-align:center;
                    padding:20px;
                  }
                `}
        </style>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
            <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <title>hello next.js</title>
        </Head>
        <div className="nav">
            <Link href="/">
                <a className="btn btn-default">Home</a>
            </Link>
            <Link href="/about">
                <a className='btn btn-success'>About</a>
            </Link>
        </div>

    </div>
)

export default Header
