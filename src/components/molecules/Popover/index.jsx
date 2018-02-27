import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import * as a from './popover.styles';


const StyledPopover = styled.div`
  position: relative;
  overflow: visible;
  cursor: pointer;
  .spanElem {
    position: relative;
  }
  > button {
    background: none;
    border: none;
  }
`;
/* eslint-disable */
const PopContainer = styled.div`
position: absolute;
display: ${ifProp('inactive', 'none', 'flex')};
justify-content: center;
align-items: center;
z-index: 9999;
width: 288px;
min-height: 86px;
padding: 20px;
box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
border: solid 1px #f5f5f5;
background: #FFFFFF;
color: #222;
&:after, &:before {
${a.arrowDefaults}
}
`;
/* eslint-enable */

const PopContent = props => (
  <div>{props.children}</div>
);

class Popover extends Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      inactive: true,
      xPos: 0,
      yPos: 0,
      pWidth: 0,
      pHeight: 0,
    };
  }

  toggle() {
    if (this.state.inactive) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({
      inactive: !this.state.inactive,
    });
  }

  handleOutsideClick() {
    this.toggle();
  }

  render() {
    const p = this.props;

    return (
      <StyledPopover {...p} overlay={PopContent} >
        <button className="spanElem" onClick={this.toggle}>
          {p.children[0]}
          <PopContainer
            inactive={this.state.inactive}
            placement={p.placement}
            position={{
              xPos: this.state.xPos,
              yPos: this.state.yPos,
              xMar: this.state.xMar,
              yMar: this.state.yMar,
            }}
          > {p.children[1]}
          </PopContainer>
        </button>
      </StyledPopover>
    );
  }
}
PopContent.propTypes = {
  children: PropTypes.string,
};

PopContent.defaultProps = {
  children: '',
};

Popover.propTypes = {
  inactive: PropTypes.bool,
  children: PropTypes.string,
};

Popover.defaultProps = {
  inactive: true,
  children: '',
};

export { Popover, PopContent };
export default Popover;
