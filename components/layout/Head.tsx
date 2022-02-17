import Head from 'next/head';
import { FC } from 'react';

const AppHead: FC = (props) => {
  return (
    <Head>
      <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      <meta name="description" content={`${process.env.NEXT_PUBLIC_APP_NAME} Application`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default AppHead;
