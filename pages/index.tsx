import type {NextPage} from 'next';
import {Content} from '../components/home/content';

import Head from 'next/head';

const Home: NextPage = () => {
   return (
      <>
         <Head>
            <title>Dashboard</title>
         </Head>
         <Content />
      </>
   );
};

export default Home;
