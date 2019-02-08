import App, {Container} from 'next/app'
import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Head from "next/head"
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from '../store/reducers/rootReducer'
import axios from 'axios'
import getConfig from 'next/config'

const {serverBaseUrl, serverApiUrl} = getConfig().publicRuntimeConfig

//console.log('config:',serverBaseUrl,serverApiUrl)

const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

axios.defaults.baseURL=serverApiUrl;

class MyApp extends App {
  render () {
    const {Component, pageProps} = this.props

    return (
      <Container>
          <Provider store={store}>
              <div>
                <Head>
                    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
                    <link href="/static/main.css" rel="stylesheet" />
                    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
                    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                    <title>tblog-next</title>
                </Head>
                <Nav/>
                <div className="container main">
                  {/*<h1 className="text-center">tblog-next.js</h1>*/}
                  <Component {...pageProps} />
                </div>
                <Footer/>
              </div>
          </Provider>
      </Container>
    )
  }
}

export default MyApp
