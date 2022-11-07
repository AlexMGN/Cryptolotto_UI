import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Cryptolotto</title>
          <meta property="og:title" content="Cryptolotto" />
          <meta property="og:type" content="gambling.game.solana" />
          <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/local-assets.appspot.com/o/Cryptolotto_logo_mini.png?alt=media&token=77853071-42de-4190-899f-e9b67ace7072" />
          <meta property="og:description" content="" />
          <meta name="description" content="" />
          <link rel="Cryptolotto shortcut icon" href="/Cryptolotto_logo_mini.png"/>
          <link rel="apple-touch-icon" href="/Cryptolotto_logo_mini.png"/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
