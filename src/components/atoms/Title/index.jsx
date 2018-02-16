// Just copy and paste this folder again and again to start your own components
import React, { PureComponent as Component } from 'react';
import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';
import PropTypes from 'prop-types';

import * as m from '../../styles/mixins';

const StyledTitle = styled.h1`
    font-family: ${prop('fontFamily')};
    font-weight: ${props => props.fontWeight && `${m.fontWeight(props.fontWeight)}`};
    font-size: ${props => props.fontSize && `${m.calcSize(props.fontSize)}`};
    color: #222222;
    text-align: ${prop('align')};
    margin: ${props => props.margin && `${m.setSizes(props.margin)}`};
    padding: ${props => props.padding && `${m.setSizes(props.padding)}`};
    line-height: ${ifProp('lineHeight', prop('lineHeight'))};
    ${ifProp('uppercase', 'text-transform: uppercase;')}
    ${ifProp('lowercase', 'text-transform: lowercase;')}
    ${ifProp('inline', 'display: inline-flex;')}
    
    ${props => props.gradient.colors.length > 0 && `
      background: -webkit-linear-gradient(${m.gradient(props.gradient.direction, props.gradient.colors)});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background: -moz-linear-gradient(${m.gradient(props.gradient.direction, props.gradient.colors)});
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    `}
`;

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const p = this.props;

    return (
      <StyledTitle {...p}>
        {p.children}
      </StyledTitle>
    );
  }
}


// Component Props
Title.propTypes = {
  statusColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'white', 'black']),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  lineHeight: PropTypes.number,
  inline: PropTypes.bool,
  gradient: PropTypes.shape({
    direction: PropTypes.string,
    colors: PropTypes.array,
  }),
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  fontSize: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
  fontColor: PropTypes.string,
  children: PropTypes.string,
};

Title.defaultProps = {
  statusColor: 'black',
  fontFamily: 'SimplonHeadline',
  fontWeight: 'Regular',
  fontSize: 2,
  fontColor: '#222222',
  align: 'left',
  padding: 0,
  lineHeight: 1,
  inline: false,
  gradient: {
    direction: '',
    colors: [],
  },
  margin: [5, 0],
  children: '',
};

export { Title };
export default Title;
