import {Button, Input, Text} from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import {Breadcrumbs, Crumb, CrumbLink} from '../breadcrumb/breadcrumb.styled';
import {DotsIcon} from '../icons/accounts/dots-icon';
import {ExportIcon} from '../icons/accounts/export-icon';
import {InfoIcon} from '../icons/accounts/info-icon';
import {TrashIcon} from '../icons/accounts/trash-icon';
import {HouseIcon} from '../icons/breadcrumb/house-icon';
import {UsersIcon} from '../icons/breadcrumb/users-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {Flex} from '../styles/flex';
import {TableWrapper} from '../table/table';
import {AddUser} from './add-user';

export const Accounts = () => {
   return (

      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
         }}
         justify={'center'}
         direction={'column'}
      >
         <Breadcrumbs>
            <Crumb>
               <HouseIcon />
               <Link href={'/'}>
                  <CrumbLink href="#">Home</CrumbLink>
               </Link>
               <Text>/</Text>
            </Crumb>

            <Crumb>
               <UsersIcon />
               <CrumbLink href="/uploads">Uploads</CrumbLink>
               <Text></Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#"></CrumbLink>
            </Crumb>
         </Breadcrumbs>
         
         <Flex
            css={{
               mt: '$8',
               width: '100%',
               maxWidth: '1600px', // Increased from 1100px to 1600px
               '@sm': {
                  mt: '$-12',
               },
            }}
         >
            <div style={{
              width: '100%',
              maxWidth: '1500px', // Increased from 1050px to 1500px
              background: 'linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '18px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              padding: '32px 28px 24px 28px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '32px',
              gap: '24px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0072F5 0%, #00C6FB 100%)',
                borderRadius: '50%',
                width: '54px',
                height: '54px',
                boxShadow: '0 2px 8px rgba(0,114,245,0.08)',
              }}>
                <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/><rect x="4" y="19" width="16" height="2" rx="1" fill="#fff"/></svg>
              </div>
              <div style={{flex: 1}}>
                <Text h3 css={{mb: 0, color: '#222', fontWeight: 700}}>Welcome to Uploads Center</Text>
                <Text css={{color: '$accents8', fontSize: '1.08rem', mt: '4px', lineHeight: 1.6}}>
                  Securely upload your files for instant analysis and management. Accepted formats: <b>PNG, JPG, JPEG, PDF, DOCX</b>.<br />
                  All your uploads appear below for easy review and organization.
                </Text>
              </div>
            </div>
         </Flex>
         <Text h3 css={{mt: '12px'}}>All Uploads</Text>
         <Flex
            css={{gap: '$8'}}
            align={'center'}
            justify={'between'}
            wrap={'wrap'}
         >
            <Flex
               css={{
                  'gap': '$6',
                  'flexWrap': 'wrap',
                  '@sm': {flexWrap: 'nowrap'},
               }}
               align={'center'}
            >
            </Flex>
            <Flex direction={'row'} css={{gap: '$6'}} wrap={'wrap'}>
               <AddUser />

            </Flex>
         </Flex>


         <TableWrapper />
      </Flex>
   );
};
