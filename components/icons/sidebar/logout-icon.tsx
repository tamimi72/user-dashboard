import React from 'react';
import {Svg} from '../../styles/svg';

export const LogoutIcon = () => {
   return (
      <Svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         css={{
            '& path': {
               stroke: '$accents6',
               strokeWidth: 1.5,
               strokeLinecap: 'round',
               strokeLinejoin: 'round',
            },
         }}
      >
         {/* Door */}
         <Svg.Path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
         {/* Arrow */}
         <Svg.Path d="M18 15l3-3m0 0l-3-3m3 3H9" />
      </Svg>
   );
};
