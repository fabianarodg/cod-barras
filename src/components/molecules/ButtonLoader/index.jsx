import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './../../atoms/Button';
import { Icon } from './../../atoms/Icon';

import * as m from '../../styles/mixins';

const StyledButton = styled(Button)`
    &:disabled{
      background-color: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}`};
      opacity:1;
      cursor:default;
    }
`;
const LoadingIcon = styled(Icon)`
  -webkit-animation-name: spin;
  -webkit-animation-duration: 1000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 1000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 1000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  margin-top: -7px;

@-ms-keyframes spin {
  from { -ms-transform: rotate(0deg); }
  to { -ms-transform: rotate(360deg); }
}
@-moz-keyframes spin {
  from { -moz-transform: rotate(0deg); }
  to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  from { -webkit-transform: rotate(0deg); }
  to { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  from {
      transform:rotate(0deg);
  }
  to {
      transform:rotate(360deg);
  }
}

`;

class ButtonLoader extends React.Component {
  constructor(props) {
    super(props);
    this.loading = this.loading.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  loading() {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  showLabel(props) {
    let ch;
    if (this.state.isLoading) {
      ch = (<LoadingIcon
        type="loading"
        size={3}
      />);
    } else {
      ch = props.children;
    }
    return ch;
  }

  render() {
    const p = this.props;
    return (
      <StyledButton
        {...p}
        onClick={this.loading}
        margin={0}
        statusColor={p.statusColor}
        styleButton={p.styleButton}
      >
        {this.showLabel(p)}
      </StyledButton>
    );
  }
}

ButtonLoader.propTypes = {
  statusColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'bg', 'front']),
    PropTypes.string,
  ]),
  styleButton: PropTypes.string,
};

ButtonLoader.defaultProps = {
  styleButton: 'button',
  statusColor: '#D82482',
};

export { ButtonLoader };
export default ButtonLoader;
