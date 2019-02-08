import React from "react";
import Link from 'next/link'

const Nav = () => (
    <div className="nav">
        <Link href="/">
            <a className="btn btn-default">Home</a>
        </Link>
        <Link href="/about">
            <a className='btn btn-success'>About</a>
        </Link>
    </div>
)

export default Nav
