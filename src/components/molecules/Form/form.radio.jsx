import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/* import { prop, ifProp, switchProp } from 'styled-tools'; */

/* import * as m from '../../styles/mixins'; */

import { Text } from '../../atoms/Text';

const StyledRadio = styled.div`
     padng: 1em;
     posion: relative;
     disay: flex;
     lab {
    padding: .5em;
    position: relative;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    & .helper {
    position: absolute;
    top: 10px;
    left: 0;
    cursor: pointer;
    display: block;
    font-size: $mf-font-size;
    user-select: none;
    color: #d82482
    &::before,
    &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width:20px;
    height: 20px;
    transition: transform 0.28s ease;
    border-radius: 50%;
    border: 2px solid #d82482;
      
      &::after {
      transform: scale(0);
      background-color: #d82482;
      border-color: #d82482;
      }
      
        span {
          margin: 3px 0 0 24px;
        }
        input:checked {
          & ~ .helper {
            &::after {
                transform: scale(0.5);
            }
            &::before {
              color: #000;
            }
          }
        }

        input:disabled {
          & ~ .helper {
            opacity: .5;cursor: not-allowed;
          }
          & ~ span {
            opacity: .5;cursor: not-allowed;
          }
        }
          & input:disabled:checked + span:before {
               background-image: radial-gradient(
                                   circle closest-side,
                                   rgba(0, 0, 0, 0.5) 0%,
                                   rgba(0, 0, 0, 0.5) 50%,
                                   transparent 50%,
                                   transparent 100%);
          }

          & input { display: none; }
     }
`;

class FormRadio extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = { value: this.props.value };
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({ value }, () => (typeof this.props.onUpdate === 'function' ? this.props.onUpdate(value) : null));
  }

  get value() {
    return this.state.value;
  }

  render() {
    return (
      <StyledRadio>
        {this.props.items.map(item => (
          <label key={item.value} htmlFor>
            <input
              type="radio"
              checked={this.state.value === item.value}
              disabled={item.disabled}
              value={item.value}
              name={this.props.name}
              onChange={this.onChange}
            />
            <i className="helper" />
            <Text type="span">{item.label}</Text>

          </label>
        ))}
      </StyledRadio>
    );
  }
}

FormRadio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  onUpdate: PropTypes.func,
};

FormRadio.defaultProps = {
  onUpdate: function onUpdate(propValue) {
    return propValue;
  },
  name: 'name1',
};


export { FormRadio };

export default FormRadio;
