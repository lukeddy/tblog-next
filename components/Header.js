import React from "react";
import Link from 'next/link'

const linkStyle = {
    marginRight: 15,
    fontSize:'16px',
    color:'#f00'
}

const Header = () => (
    <div>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
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
        </head>
        <div className="nav">
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href="/about">
                <a style={linkStyle}>About</a>
            </Link>
        </div>
    </div>
)

export default Header
