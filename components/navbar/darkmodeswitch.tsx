import React from 'react';
import {useTheme as useNextTheme} from 'next-themes';
import {Switch, useTheme} from '@nextui-org/react';

export const DarkModeSwitch = () => {
   const {setTheme} = useNextTheme();
   const {isDark, type} = useTheme();
   return (
      <Switch
         checked={isDark}
         onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
         size="sm"
         css={{
            transform: 'translateY(-2px) translateX(0px)',
            width: '24px',
            height: '24px'
          }}
      />
   );
};
