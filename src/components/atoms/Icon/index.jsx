import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import * as m from './../../styles/mixins';
import { addModule } from '../../../utils';

const req = require.context('./iconfiles', true, /^(?!.*styles).*\/(?!.*stories).*\.js$/);
const icons = {};

// list all icon
addModule(req, icons);

// Component Styles
const styles = css`
    display: inline-block;
    color: #222222;
    margin: 0.1em;
    box-sizing: border-box;

    & > svg {
        height: 100%;
    }
`;

const StyledIcon = styled.i`
    ${styles}
    font-size: ${props => props.size && `${m.calcSize(props.size)}`};
    width: ${props => (props.width ? ` ${m.rem(props.width)}` : `${m.calcSize(props.size)}`)};
    height: ${props => (props.height ? ` ${m.rem(props.height)}` : `${m.calcSize(props.size)}`)};
    ${ifProp('autoSize', css`width: auto;`)}
    & svg  :not([fill="none"]), :not([fill="#ffffff"]) {
        fill:  ${prop('fillColor')};   
        stroke:  ${ifProp('strokeColor', prop('strokeColor'))};     
        .nofill{
            fill: #FFFFFF;
        }
    }
  `;

const getIcon = props => (icons[props.type] ? icons[props.type](props) : (<svg />));

// Component Core
const Icon = props => (
  <StyledIcon {...props}>
    {getIcon(props)}
  </StyledIcon>
);

// Component Props
Icon.PropTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]),
  width: PropTypes.number,
  height: PropTypes.number,
  autoSize: PropTypes.bool,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
};

Icon.defaultProps = {
  type: 'oi',
  size: 2,
  fillColor: '#222222',
  strokeColor: '',
  autoSize: false,
  height: 18,
  width: 18,
};

export default Icon;
export { Icon };
