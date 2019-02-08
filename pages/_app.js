import App, {Container} from 'next/app'
import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

class MyApp extends App {
  render () {
    const {Component, pageProps} = this.props

    return (
      <Container>
          <div>
            <Header/>
            <Nav/>
            <div className="container main">
            <h1 className="text-center">tblog-next.js</h1>
            <Component {...pageProps} />
            </div>
            <Footer/>
          </div>
      </Container>
    )
  }
}

export default MyApp
