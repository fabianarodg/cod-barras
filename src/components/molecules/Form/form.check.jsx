import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import * as m from '../../styles/mixins';
import { Text } from './../../atoms/Text';


const StyledCheck = styled.input`
    position: absolute;
    visibility: hidden;
    margin-right: 25px;
    
    &:checked + .checkmark {
        border-color: #d82482;
        background: #d82482;
        &::before{
            content: '';
            display: block;
            height: 12px;
            width: 7px;
            border: solid #FFF;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
    }
`;

const CheckWrapper = styled.label`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: ${props => props.margin && `${m.setSizes(props.margin)}`};
    padding-left: ${prop('spacing')}px;

    .checkmark{
        display: inline-block;
        position: absolute;
        float: left;
        border: 2px solid #d82482;
        border-radius: 2px;
        height: 18px;
        width: 18px;
        left: 0;
        top: 0px;
        z-index: 5;
        transition: background .25s linear;
        -webkit-transition: background .25s linear;
          &::before {
            display: block;
            position: absolute;
            content: '';
            top: -2px;
            left: 3px;
            transform: rotate(45deg);
          }
      }
`;

class FormCheck extends Component {
  constructor(props) {
    super(props);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = {
      isChecked: this.props.checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.isChecked) {
      this.setState({ isChecked: nextProps.checked });
    }
  }

  toggleChange() {
    const changeSt = !this.state.isChecked;
    this.setState({ isChecked: changeSt });
    this.props.onChange();
  }

  render() {
    const p = this.props;
    return (
      <CheckWrapper {...p}>
        <StyledCheck
          id={p.id}
          type="checkbox"
          checked={this.state.isChecked}
          value={this.props.value}
          onChange={this.toggleChange}
        />
        <Text>{p.children || p.label}</Text>
        <div className="checkmark" />
      </CheckWrapper>
    );
  }
}

FormCheck.propTypes = {
  statusColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'white', 'black']),
  margin: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  label: PropTypes.string,
  spacing: PropTypes.number,
  checked: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

FormCheck.defaultProps = {
  statusColor: 'primary',
  margin: [20, 15],
  spacing: 25,
  checked: false,
  value: '',
  label: '',
  onChange: function onChange(param) {
    return param;
  },
};

export { FormCheck };
export default FormCheck;
