import "../css/style.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Drawing whispers</title>
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
