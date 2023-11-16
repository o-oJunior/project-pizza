import type { AppProps } from 'next/app'
import Layout from './layout'
import './globals.scss'
import Head from 'next/head'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pizzaria</title>
      </Head>
      <div className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  )
}
