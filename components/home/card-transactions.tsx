import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const CardTransactions = () => {
   return (
      <Card
         css={{
            mw: '375px',
            height: 'auto',
            bg: '$accents0',
            borderRadius: '$xl',
            px: '$6',
            py: '$8'
         }}
      >
         <Card.Body>
            <Text h3 css={{
               textAlign: 'center',
               mb: '$',
               fontWeight: '700',
               letterSpacing: '0.5px',
               fontSize: '$lg'
            }}>
               About EmployAI
            </Text>
            <Text
               css={{
                  fontSize: '$md',
                  lineHeight: '$lg',
                  color: '$accents8',
                  mb: '$5',
                  fontWeight: '500',
                  letterSpacing: '0.2px'
               }}
            >
               <Text span css={{fontWeight: '600'}}>EmployAI</Text> EmployAI is an AI-driven platform that analyzes your resume and offers tailored suggestions to boost your chances with employers.
            </Text>
            <Text
               css={{
                  fontSize: '$md',
                  lineHeight: '$lg',
                  color: '$accents8',
                  mb: '$5',
                  fontWeight: '500',
                  letterSpacing: '0.2px'
               }}
            >
              EmployAI ensures your resume is presented in the best possible way, regardless of your background. 
            </Text>
            <Text
               css={{
                  fontSize: '$md',
                  lineHeight: '$lg',
                  color: '$accents8',
                  fontWeight: '500',
                  letterSpacing: '0.2px'
               }}
            >
               Ready to transform your job search? Start using EmployAI today... and significantly boost your visibility to recruiters, giving you a real edge in today’s job market.
            </Text>
         </Card.Body>
      </Card>
   );
};
