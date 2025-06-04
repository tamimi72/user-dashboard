import React, {useState} from 'react';
import {Box} from '../styles/box';
import {Sidebar} from './sidebar.styles';
import {Avatar, Tooltip} from '@nextui-org/react';
import {Flex} from '../styles/flex';
import {CompaniesDropdown} from './companies-dropdown';
import {HomeIcon} from '../icons/sidebar/home-icon';
import {PaymentsIcon} from '../icons/sidebar/payments-icon';
import {BalanceIcon} from '../icons/sidebar/balance-icon';
import {AccountsIcon} from '../icons/sidebar/accounts-icon';
import {CustomersIcon} from '../icons/sidebar/customers-icon';
import {ProductsIcon} from '../icons/sidebar/products-icon';
import {ReportsIcon} from '../icons/sidebar/reports-icon';
import {DevIcon} from '../icons/sidebar/dev-icon';
import {ViewIcon} from '../icons/sidebar/view-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {CollapseItems} from './collapse-items';
import {SidebarItem} from './sidebar-item';
import {SidebarMenu} from './sidebar-menu';
import {FilterIcon} from '../icons/sidebar/filter-icon';
import {useSidebarContext} from '../layout/layout-context';
import {ChangeLogIcon} from '../icons/sidebar/changelog-icon';
import {LogoutIcon} from '../icons/sidebar/logout-icon';
import {useRouter} from 'next/router';

export const SidebarWrapper = () => {
   const router = useRouter();
   const {collapsed, setCollapsed} = useSidebarContext();

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

         <Sidebar collapsed={collapsed}>
            <Sidebar.Header>
               <CompaniesDropdown />
            </Sidebar.Header>
            <Flex
               direction={'column'}
               justify={'between'}
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Home"
                     icon={<HomeIcon />}
                     isActive={router.pathname === '/'}
                     href="/"
                  />
                  <SidebarMenu title="Main Menu">
                     <SidebarItem
                        isActive={router.pathname === '/uploads'}
                        title="Uploads"
                        icon={<AccountsIcon />}
                        href="uploads"
                     />
                  <SidebarItem
                        isActive={router.pathname === '/cvrewriter'}
                        title="CV Rewriter"
                        icon={<ReportsIcon />}
                        href = "cvrewriter"
                     />
                                          <SidebarItem
                        isActive={router.pathname === '/interview'}
                        title="Interview"
                        icon={<CustomersIcon />}
                        href="interview"
                     />
                  </SidebarMenu>

                  <SidebarMenu title="Updates">
                     <SidebarItem
                        isActive={router.pathname === '/changelog'}
                        title="Changelog"
                        icon={<ChangeLogIcon />}
                     />
                                    <SidebarMenu title="Other"></SidebarMenu>
                     <SidebarItem
                        isActive={router.pathname === '/logout'}
                        title="Logout"
                        icon={<LogoutIcon />}
                        onClick={async () => {
                           try {
                              // Clear any authentication tokens or user data from localStorage
                              if (typeof window !== 'undefined') {
                                 localStorage.removeItem('token');
                                 localStorage.removeItem('user');
                                 // Use replace instead of href to prevent back button from going back to dashboard
                                 window.location.replace('http://localhost:3000/signin');
                              }
                           } catch (error) {
                              console.error('Logout failed:', error);
                           }
                        }}
                     />
                  </SidebarMenu>
               </Sidebar.Body>
            </Flex>
         </Sidebar>
      </Box>
   );
};
