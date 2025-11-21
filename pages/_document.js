import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import { Html } from "next/document";

class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Your Cryptocurrency Portfolio" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.5" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}

_Document.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: WrappedComponent => props => sheets.collect(<WrappedComponent {...props} />)
  })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}

export default _Document
