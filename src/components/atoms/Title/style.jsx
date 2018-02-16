import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';
import * as m from '../../styles/mixins';

const StyledTitle = styled.h1`
    font-family: ${prop('fontFamily')};
    font-weight: ${props => props.fontWeight && `${m.fontWeight(props.fontWeight)}`};
    font-size: ${props => props.fontSize && `${m.calcSize(props.fontSize)}`};
    /* color: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}  `}; */
    color: #222222;
    text-align: ${prop('align')};
    margin: ${props => props.margin && `${m.setSizes(props.margin)}`};
    padding: ${props => props.padding && `${m.setSizes(props.padding)}`};
    line-height: ${ifProp('lineHeight', prop('lineHeight'))};
    ${ifProp('uppercase', 'text-transform: uppercase;')}
    ${ifProp('lowercase', 'text-transform: lowercase;')}
    ${ifProp('inline', 'display: inline-flex;')}
    
    ${props => props.gradient && `
      background: -webkit-linear-gradient(${m.gradient(props.gradient.direction, props.gradient.colors)});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background: -moz-linear-gradient(${m.gradient(props.gradient.direction, props.gradient.colors)});
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    `}
`;

export default StyledTitle;
