import { Text } from '@nextui-org/react';
import React from 'react';
import { AcmeIcon } from '../icons/acme-icon';
// Removed BottomIcon import since we don't use it anymore
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';

export const CompaniesDropdown = () => {
  const company = {
    name: 'EmployAI',
    location: 'Useful and effective',
    logo: <AcmeIcon />,
  };

  return (
    <Box css={{ cursor: 'default' }}>
      <Flex align={'center'} css={{ gap: '$7' }}>
        {company.logo}
        <Box>
          <Text
            h3
            size={'$xl'}
            weight={'medium'}
            css={{
              m: 0,
              color: '$accents9',
              lineHeight: '$lg',
              mb: '-$5',
            }}
          >
            {company.name}
          </Text>
          <Text span weight={'medium'} size={'$xs'} css={{ color: '$accents8' }}>
            {company.location}
          </Text>
        </Box>
        {/* BottomIcon removed to hide the arrow */}
      </Flex>
    </Box>
  );
};
