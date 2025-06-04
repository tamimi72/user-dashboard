import React from 'react';
import { Accounts } from '../components/accounts';

import Head from 'next/head';

const uploads = () => {
   return (
      <>
         <Head>
            <title>Uploads</title>
         </Head>
         <Accounts />
      </>
   );
};

export default uploads;
