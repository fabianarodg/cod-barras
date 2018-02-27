import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as m from '../../styles/mixins';
import Text from '../Text';
import styles from './index.styles';

// Component Styles
const StyledBurger = styled.div`
    ${styles.BurgerStyles}
    margin: ${props => props.margin && `${m.setSizes(props.margin)}`};
    padding: ${props => props.padding && `${m.setSizes(props.padding)}`};
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    & .hamburger-inner {
        margin-right: 13px;
        &,  &:after, &:before {
            background-color: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}`};
        }
    }
`;

const BurgerButton = styled.div`
    display: inline-flex;
    cursor: pointer;
    position: relative;
    min-width: 24px;
    min-height: 24px;
`;

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleClick() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    this.props.onClick;
  }

  render() {
    const p = this.props;
    return (
      <BurgerButton
        className="burger"
        onClick={this.handleClick.bind(this)}
      >
        <StyledBurger
          {...p}
          className={`${(this.state.active || this.props.isActive) && 'is-active'} hamburger hamburger--${p.type}`}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
          { p.children ? <Text statusColor={p.statusColor} margin={[0, 0, 0, 10]}>{p.children}</Text> : '' }
        </StyledBurger>
      </BurgerButton>
    );
  }
}

Burger.PropTypes = {
  statusColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'bg', 'front']),
    PropTypes.string,
  ]),
  type: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  width: PropTypes.number,
  weight: PropTypes.number,
  space: PropTypes.number,
  burgerSize: PropTypes.number,

};

Burger.defaultProps = {
  type: 'spin',
  margin: 3,
  padding: 0,
  width: 18,
  weight: 2,
  space: -3,
  burgerSize: 24,
  statusColor: '#D82482',
};

export { Burger };
export default Burger;
