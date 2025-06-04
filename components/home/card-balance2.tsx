import {Card, Text} from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';
import {Community} from '../icons/community';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const CardBalance2 = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$accents0',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
               <Community color={'$accents9'} />
               <Flex direction={'column'}>
                  <Text span css={{color: ''}}>
                     Multiple Languages
                  </Text>
                  <Link href="/uploads" passHref legacyBehavior>
  <Text
    as="a"
    span
    size={'$xs'}
    css={{
      textDecoration: 'none',
      cursor: 'pointer',
      color: '$accents9',
      transition: 'color 0.2s',
      '&:hover': {
        textDecoration: 'underline',
        color: '$blue600',
      },
    }}
  >
    Use it!
  </Text>
</Link>
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
               <Text span size={'$l'} weight={'semibold'}>
               EmployAI supports seamless uploading of resumes in both Arabic and English, recognizing the diverse linguistic backgrounds of applicants.               </Text>
               <Text span css={{color: '$red600'}} size={'$xs'}>
               </Text>
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$green600'}}
                     weight={'semibold'}
                  >
                  </Text>
                  <Text span size={'$xs'}>
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$red600'}}
                     weight={'semibold'}
                  >
                  </Text>
                  <Text span size={'$xs'}>
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$green600'}}
                     weight={'semibold'}
                  >
                  </Text>
                  <Text span size={'$xs'}>
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
