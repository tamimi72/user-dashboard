import {Input, Link, Navbar, Text} from '@nextui-org/react';
import React from 'react';
import {FeedbackIcon} from '../icons/navbar/feedback-icon';
import {GithubIcon} from '../icons/navbar/github-icon';

import {SearchIcon} from '../icons/searchicon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import {BurguerButton} from './burguer-button';
import {DarkModeSwitch} from './darkmodeswitch';

interface Props {
   children: React.ReactNode;
}

export const NavbarWrapper = ({children}: Props) => {
   const collapseItems = [
      'Profile',
      'Dashboard',
      'Activity',
      'Analytics',
      'System',
      'Deployments',
      'My Settings',
      'Team Settings',
      'Help & Feedback',
      'Log Out',
   ];
   return (
      <Box
         css={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            overflowY: 'auto',
            overflowX: 'hidden',
         }}
      >
         <Navbar
            isBordered
            css={{
               'borderBottom': '1px solid $border',
               'justifyContent': 'space-between',
               'width': '100%',
               '@md': {
                  justifyContent: 'space-between',
               },

               '& .nextui-navbar-container': {
                  'border': 'none',
                  'maxWidth': '100%',

                  'gap': '$6',
                  '@md': {
                     justifyContent: 'space-between',
                  },
               },
            }}
         >
            <Navbar.Content showIn="md">
               <BurguerButton />
            </Navbar.Content>
            <Navbar.Content
               hideIn={'md'}
               css={{
                  width: '100%',
               }}
            >
               <Input
                  clearable
                  contentLeft={
                     <SearchIcon
                        fill="var(--nextui-colors-accents6)"
                        size={16}
                     />
                  }
                  contentLeftStyling={false}
                  css={{
                     'w': '100%',
                     'transition': 'all 0.2s ease',
                     '@xsMax': {
                        w: '100%',
                        // mw: '300px',
                     },
                     '& .nextui-input-content--left': {
                        h: '100%',
                        ml: '$4',
                        dflex: 'center',
                     },
                  }}
                  placeholder="Search..."
               />
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Content>
                   <DarkModeSwitch />
                </Navbar.Content>

                <Navbar.Content hideIn={'md'}>
                   <Flex 
                      align={'center'} 
                      css={{gap: '$4', cursor: 'pointer', '&:hover': { opacity: 0.8 }}}
                      onClick={() => {
                         const topic = prompt('Please enter the topic of your feedback:');
                         if (topic === null) return; // User clicked cancel
                         
                         const feedback = prompt('Please enter your feedback:');
                         if (feedback === null) return; // User clicked cancel
                         
                         alert(`Thank you for your feedback!\n\nTopic: ${topic}\nFeedback: ${feedback}`);
                      }}
                   >
                      <FeedbackIcon />
                      <Text span>Feedback?</Text>
                   </Flex>
                </Navbar.Content>
             </Navbar.Content>
            <Navbar.Collapse>
               {collapseItems.map((item, index) => (
                  <Navbar.CollapseItem
                     key={item}
                     activeColor="secondary"
                     css={{
                        color:
                           index === collapseItems.length - 1 ? '$error' : '',
                     }}
                     isActive={index === 2}
                  >
                     <Link
                        color="inherit"
                        css={{
                           minWidth: '100%',
                        }}
                        href="#"
                     >
                        {item}
                     </Link>
                  </Navbar.CollapseItem>
               ))}
            </Navbar.Collapse>
         </Navbar>
         {children}
      </Box>
   );
};
