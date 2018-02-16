import React, { Component, ClientRect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';

import * as m from '../../styles/mixins';
import * as a from './popover.styles';


const StyledPopover = styled.div`
	position: relative;
	overflow: visible;
	cursor: pointer;
	.spanElem {
		position: relative;
	}
`;

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
	
	${switchProp('placement', {
    bottom: css`top: calc(100% + 15px);left: 50%;
			margin-left: -144px;
			${a.arrowBottom}`,
    top: css`bottom: calc(100% + 10px);left: 0; 
			margin-left: calc(-1 * ${prop('position.xMar')});
			${a.arrowTop}`,
    left: css`top: -15px; right: calc(100% + 10px);
			${a.arrowLeft}
    `,
    right: css`top: -15px; left: calc(100% + 10px);
			${a.arrowRight}
    `,

  })}

  `;

const PopContent = props => (
  <div>{props.children}</div>
);

class Popover extends Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
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

  handleOutsideClick(e) {
    this.toggle();
  }

  componentDidMount() {
    const divParent = ReactDOM.findDOMNode(this.refs.popover).getBoundingClientRect();

    let xm,
      ym,
      xp,
      yp = 0;
    if (divParent.width < 288) {
      xm = divParent.width / 2;
      xp = 0;
    } else {
      xm = 288 / 2;
      xp = divParent.width / 2;
    }


    if (divParent.height < 86) {
      ym = divParent.height / 2;
      yp = 0;
    } else {
      ym = 86 / 2;
      yp = divParent.width / 2;
    }
    this.setState({
      xPos: `${xp}px`, yPos: `${yp}px`, xMar: `${xm}px`, yMar: `${ym}px`,
    });
  }

  render() {
    const p = this.props;

      	return (
        <StyledPopover overlay={PopContent} >
          <span ref="popover" className="spanElem" onClick={this.toggle.bind(this)}>
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

          </span>


        </StyledPopover>
      	);
  }
}

Popover.propTypes = {
  placement: PropTypes.oneOf(['bottom', 'top', 'left', 'right']).isRequired,
  inactive: PropTypes.bool,
};

Popover.defaultProps = {
  placement: 'bottom',
  inactive: true,
};

export { Popover, PopContent };
export default Popover;
