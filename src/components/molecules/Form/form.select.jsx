import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import { Grid } from './../../atoms/Grid';
import { Icon } from './../../atoms/Icon';
import { List } from './../../atoms/List';
import { Text } from './../../atoms/Text';

const SelectWrapper = styled.div`
    margin: 0 15px;
    position: relative;
    & legend {
        position: absolute;
        bottom: -15px;
    }

`;

const StyledSelect = styled.div`
    font-family: ${ifProp('inputFont.family', prop('inputFont.family'))};
    &.open {
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    }

    background: #FFF;
    margin: 5px 0;
    .front-label {
        padding: 8.5px 10px;
        border-radius: 2px;

        border: 1px solid #dbdbdb;
        &.with-list {
            & *{
                color: #d82482;
            }
            background: #f5f5f5;
            border-color: #f5f5f5;
        }
    }
`;

const SelectList = styled.div`
    max-height: 10em;
    overflow: auto;
    background: #FFF;
    position: absolute;
    top: calc(100% - 2px);
    left: 1px;
    width: calc(100% - 2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03);
    z-index: 10;
    &.closed {
        max-height: 0;
    }
    & li{
        margin: 0;
        padding: 13px;
        & * {
            margin: 0;
            cursor: pointer;
        }
        &:hover {
            background: #d82482;
            & *{
                color: #FFF;
            }

        }

    }
`;
const mapOpt = props => props.options.map(item =>
  (<Text
    id={item.val}
    font={{ size: -1, weight: 'Medium' }}
  >{item.name}
  </Text>));

const showNotice = (props) => {
  let not;
  if (props.notice) {
    not = (<Text
      type="legend"
      font={props.noticeFont}
      themeColor={props.statusColor ? props.statusColor : 'dark'}
    >{props.notice}
    </Text>);
  }
  return not;
};


class FormSelect extends Component {
  propTypes = {
    placeholder: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.state = {
      active: false,
      selectVal: '',
      placeholder: this.props.placeholder,
    };
  }

  selectItem(e) {
    this.setState({
      placeholder: e.target.innerText,
      selectVal: e.target.id,
    });
    this.toggleSelect();
  }

  toggleSelect() {
    if (!this.state.active) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.toggleSelect();
  }

  render() {
    const p = this.props;
    return (
      <SelectWrapper>
        <Text
          type="label"
          htmlFor={p.id}
          fontSize={p.labelFont.fontSize}
          fontWeight={p.labelFont.fontWeight}
          onClick={this.toggleSelect}
        >{p.label ? p.label : null}
        </Text>
        <input type="hidden" id={p.id} value={this.state.selectVal} ref={(node) => { this.node = node; }} />
        <StyledSelect className={this.state.active ? 'open' : null}>
          <Grid
            className={`${this.state.active ? 'with-list' : null} front-label justify-content-md-between`}
            onClick={this.toggleSelect}
            centerItems
          >
            <Text
              type="span"
              lineHeight={1}
              fontSize={p.inputFont.fontSize}
              fontWeight={p.inputFont.fontWeight}
            >{this.state.placeholder ? this.state.placeholder : 'Selecione'}
            </Text>
            <Icon type="arrowdown" themeColor="primary" className="arrow-select" />
          </Grid>
          <SelectList className={!this.state.active ? 'closed' : null}>
            <List direction="vertical" onClick={this.selectItem}>
              {mapOpt(p)}
            </List>
          </SelectList>
        </StyledSelect>
        {showNotice(p)}
      </SelectWrapper>
    );
  }
}

FormSelect.PropTypes = {
  statusColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'white', 'black']),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  notice: PropTypes.string,
  labelFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
    weight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  }),
  inputFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
    weight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  }),
  noticeFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
    weight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  }),
};

FormSelect.defaultProps = {
  statusColor: 'black',
  label: '',
  placeholder: 'Selecione',
  notice: '',
  labelFont: {
    fontFamily: 'Simplon',
    fontSize: -2,
    fontWeight: 'Medium',
  },
  inputFont: {
    fontFamily: 'Simplon',
    fontSize: -1,
    fontWeight: 'Medium',
  },
  noticeFont: {
    fontFamily: 'Simplon',
    fontSize: -2,
    fontWeight: 'Medium',
  },
};

export { FormSelect };
export default FormSelect;
