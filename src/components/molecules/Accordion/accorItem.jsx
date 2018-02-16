import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';

import Grid from './../../atoms/Grid';
import Title from './../../atoms/Title';
import Icon from './../../atoms/Icon';
import * as m from '../../styles/mixins';

// Component styles
const styleHeader = css`
    height: 60px;
    display: flex;
    padding: 2.5px 15px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const StyledItem = styled.div`
    > input {
        position: absolute;
        opacity: 0;
        z-index: -1;
        &:checked {
            ~ .collapse-header {
                i{
                    transform: scale(-1, -1);
                }
            }
            ~ .collapse-content {
                max-height: 10em;
            }
        } 
    }
    ${switchProp('themeColor', {
    primary: css`background-color: ${prop('theme.colors.primary')};`,
    secondary: css`background-color: ${prop('theme.colors.secondary')};`,
    success: css`background-color: ${prop('theme.colors.success')};`,
    error: css`background-color: ${prop('theme.colors.error')};`,
    warning: css`background-color: ${prop('theme.colors.warning')};`,
    info: css`background-color: ${prop('theme.colors.info')};`,
    light: css`background-color: ${prop('theme.colors.light')};`,
    dark: css`background-color: ${prop('theme.colors.dark')};`,
    link: css`background-color: ${prop('theme.colors.link')};`,
  })}

    & > .collapse-header {
        ${styleHeader}
        ${props => props.theme && `
            border-top: 1px solid ${props.theme.colors.link};
            border-bottom: 1px solid ${props.theme.colors.link};
    `}
    }

    & > .collapse-content {
        transition: all 0.4s ease-in-out;
        max-height: 0;
        overflow: hidden;
        
    }
  `;
// Component Core
class AccorItem extends Component {
  constructor(props) {
    super(props);
  }

  typeTitle(title) {
    if (typeof (title) === 'string') {
      return (<Title
        themeColor={this.props.themeHeader ? this.props.themeColor : ''}
        type={3}
        uppercase
        fontFamily="Simplon"
        fontWeight="Bold"
      >{title}
              </Title>);
    }
    return title;
  }

  render() {
    const p = this.props;
    return (
      <StyledItem themeColor="light">
        <input id={`item-${p.id}`} type={p.toggle ? 'radio' : 'checkbox'} name={p.name} />
        <label htmlFor={`item-${p.id}`} className="collapse-header">
          {this.typeTitle(p.title)}
          <Icon type="arrowdown" themeColor={p.themeColor ? p.themeColor : 'primary'} />
        </label>
        <div className="collapse-content">{p.children}</div>
      </StyledItem>
    );
  }
}

// Component Props
AccorItem.PropTypes = {
  themeColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link']),
  name: PropTypes.string,
  themeHeader: PropTypes.bool,
  toggle: PropTypes.bool,
};

AccorItem.defaultProps = {
  themeHeader: false,
};

export { AccorItem };
export default AccorItem;
