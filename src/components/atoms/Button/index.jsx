import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';
import buttonThemes from './button.themes';
import * as m from '../../styles/mixins';

// Component Styles
const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    border-radius: 2px;
    height: 50px;
    text-transform: uppercase;
    text-decoration: none;
    font-family: ${prop('fontFamily')};
    font-weight: ${props => props.fontWeight && `${m.fontWeight(props.fontWeight)}`};
    font-size: ${props => props.fontSize && `${m.calcSize(props.fontSize)}`};
    color: ${props => props.fontColor && `${m.checkTheme(props.fontColor, props)}`};
    margin: ${props => props.margin && `${m.setSizes(props.margin)}`};
    padding: ${props => props.padding && `${m.setSizes(props.padding)}`};
    line-height: ${ifProp('lineHeight', prop('lineHeight'))};
    opacity: ${ifProp('opacity', prop('opacity'))};
    z-index:9;
    width: 100%;
    outline: none;
    
    &:disabled{
        cursor: not-allowed;
    }
    ${buttonThemes}
`;

// Component Core
const Button = props => (
  <StyledButton {...props}>{props.children}</StyledButton>
);


// Component Props
Button.propTypes = {
  statusColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'bg', 'front']),
    PropTypes.string,
  ]),
  styleButton: PropTypes.oneOf(['button', 'outline', 'linkface']),
  margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  lineHeight: PropTypes.number,
  opacity: PropTypes.number,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  fontSize: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
  fontColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Button.defaultProps = {
  styleButton: 'button',
  margin: 5,
  padding: 18,
  lineHeight: 1,
  statusColor: '#d82482',
  fontFamily: 'Simplon',
  fontWeight: 'Medium',
  fontSize: -1,
  fontColor: '#fff',
  to: '',
  href: '',
  children: '',
  opacity: 1,
};

export { Button };
export default Button;
