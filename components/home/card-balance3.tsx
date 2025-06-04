import {Card, Text} from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';
import {Community} from '../icons/community';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const CardBalance3 = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$green600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
               <Community />
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}}>
                     Resume Rewriter
                  </Text>
                  <Link href="/cvrewriter" passHref legacyBehavior>
                     <Text
                        as="a"
                        span
                        css={{
                          color: 'white',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'color 0.2s',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: '$blue300',
                          },
                        }}
                        size={'$xs'}
                     >
                        Use it!
                     </Text>
                  </Link>
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
               <Text
                  span
                  size={'$l'}
                  css={{color: 'white'}}
                  weight={'semibold'}
               >
Our Resume Rewriter feature helps you transform your existing resume into a polished, professional document tailored to highlight your strengths               </Text>
               <Text span css={{color: '$red600'}} size={'$xs'}>
               </Text>
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$red600'}}
                     weight={'semibold'}
                  >
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
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
                  <Text span size={'$xs'} css={{color: '$white'}}>
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
                  <Text span size={'$xs'} css={{color: '$white'}}>
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
