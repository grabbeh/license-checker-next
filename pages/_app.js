import React from 'react'
import App from 'next/app'
import { useRouter } from 'next/router'

export default class MyApp extends App {
  render () {
    const Router = useRouter()
    const handleRouteChange = url => {
      console.log('App is changing to: ', url)
    }

    Router.events.on('routeChangeStart', handleRouteChange)

    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
