import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'

import '../global.css'
import { AppProps } from 'next/app'
import Navbar from 'app/design/header'
import { NavigationContainer } from '@react-navigation/native'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Petrus 🤖</title>
        <meta
          name="description"
          content="Petrus é um bot de musica, moderação, economia e diversão para o seu servidor Discord. 🤖"
        />
        <link rel="icon" href="logo.ico" />
      </Head>
      <Provider>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
