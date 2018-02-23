import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import * as m from '../../styles/mixins';

// Component Styles
const StyledText = styled.p`
    font-family: ${prop('fontFamily')};
    font-weight: ${props => props.fontWeight && `${m.fontWeight(props.fontWeight)}`};
    font-size: ${props => props.fontSize && `${m.calcSize(props.fontSize)}`};
    color: ${props => props.statusColor && `${props.statusColor}`};
    margin: ${props => props.margin && `${m.setSizes(props.margin)}`};
    padding: ${props => props.padding && `${m.setSizes(props.padding)}`};
    text-align:${ifProp('align', prop('align'))};
    line-height: ${ifProp('lineHeight', prop('lineHeight'))};
    ${ifProp('uppercase', 'text-transform: uppercase;')}
    ${ifProp('lowercase', 'text-transform: lowercase;')}
    ${props => props.gradient.colors.length > 0 && `
        background: -webkit-linear-gradient(${m.gradient(props.gradient.direction, props.gradient.colors)});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background: -moz-linear-gradient(${m.gradient(props.gradient.direction, props.gradient.colors)});
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
    `}
  `;

// Component Core
const Text = props => (
  <StyledText {...props}>{props.children}</StyledText>
);
// Component Props
Text.propTypes = {
  statusColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'bg', 'front']),
    PropTypes.string,
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  lineHeight: PropTypes.number,
  gradient: PropTypes.shape({
    direction: PropTypes.string,
    colors: PropTypes.array,
  }),
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  fontSize: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
  children: PropTypes.string,
};

Text.defaultProps = {
  align: 'left',
  fontFamily: 'Simplon',
  fontWeight: 'Regular',
  fontSize: 1,
  statusColor: '#222222',
  children: '',
  margin: 0,
  padding: 0,
  lineHeight: 1,
  gradient: {
    direction: '',
    colors: [],
  },
};

const Label = StyledText.withComponent('label');
const Span = StyledText.withComponent('span');
const Strong = StyledText.withComponent('strong');
const Abbr = StyledText.withComponent('abbr');
const Legend = StyledText.withComponent('legend');
const Small = StyledText.withComponent('small');
const Sub = StyledText.withComponent('sub');
const Sup = StyledText.withComponent('sup');

export { Label, Span, Strong, Abbr, Legend, Small, Sub, Sup, Text };
export default Text;
