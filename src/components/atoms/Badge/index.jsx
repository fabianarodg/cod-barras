import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as s from './index.styles';

import { Text } from '../Text';

// Component structure
const StyledBadge = styled.div`
    ${s.styleBase}
    ${s.BadgeSty}
`;

// Component core
const Badge = props => (
  <StyledBadge
    {...props}
  >
    <Text type='span'
      fontFamily={props.fontFamily}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      statusColor={props.textColor}
		>{  props.children || props.counter  }</Text>
	</StyledBadge>  
);

// eslint src/components/atoms --fix

// Component Props
Badge.propTypes = {
    statusColor: PropTypes.oneOfType([
        PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'bg', 'front']),
        PropTypes.string
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
    fontFamily: PropTypes.string,
    fontWeight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
    fontSize: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
    textColor: PropTypes.string,
    counter: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Badge.defaultProps = {
    fontFamily: 'Simplon',
    fontWeight: 'Bold',
    fontSize: -2,
    textColor: '#FFFFFF',
    statusColor: '#900AE9',
    counter: 0,
    width: 18,
    height: 18
}

export default Badge;
