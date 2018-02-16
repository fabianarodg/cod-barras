import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckIcon from 'mdi-react/CheckIcon';
import CancelIcon from 'mdi-react/CancelIcon';
import InformationIcon from 'mdi-react/InformationIcon';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';

import * as m from '../../styles/mixins';
import { Title } from './../../atoms/Title';
import { Text } from './../../atoms/Text';

const StyledAlert = styled.div`
    background: transparent;
    padding: ${props => props.margin && `${m.setSizes(props.margin)}`};
    padding: ${props => props.padding && `${m.setSizes(props.padding)}`};

    .mdi-icon {
        fill: ${props => props.statusColor};
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;

    .text-content {
        margin-left: 12px;
    }
`;


class Alert extends Component {
  constructor(props) {
    super(props);

    this.iconAlert = '';
  }

  checkStatus(status) {
    switch (status) {
      case 'success':
        this.iconAlert = <CheckIcon width="20" height="20" />;
        break;
      case 'warning':
        this.iconAlert = <AlertCircleIcon width="20" height="20" />;
        break;
      case 'error':
        this.iconAlert = <CancelIcon width="20" height="20" />;
        break;
      case 'info':
        this.iconAlert = <InformationIcon width="20" height="20" />;
        break;
      default:
        this.iconAlert = false;
    }
    return this.iconAlert;
  }

  checkTitle(props) {
    let title;
    if (this.props.title) {
      title = (<Title
        margin={0}
        type={props.typeTitle}
        fontSize={2}
        statusColor={props.statusColor}
      >{props.title}</Title>);
    }
    return title;
  }

  checkText(props) {
    return <Text margin={[5, 0]} 
      statusColor={props.statusColor}
    >{props.text || props.children}</Text>;
  }

  showInfo(props) {
    let content = '';
    if (props.status) {
      content = (<Wrapper>
        <div>{this.checkStatus(props.status)}</div>
        <div className="text-content">
          {this.checkTitle(props)}
          {this.checkText(props)}
        </div>
      </Wrapper>);
    } else {
      content = (<div className="col-12">
        {this.checkTitle(props)}
        {this.checkText(props)}
      </div>);
    }

    return content;
  }

  render() {
    const p = this.props;
    return (
      <StyledAlert {...p}>
        {this.showInfo(p)}
      </StyledAlert>
    );
  }
}


Alert.propTypes = {
  statusColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'bg', 'front']),
    PropTypes.string,
  ]),
  title: PropTypes.string,
  text: PropTypes.string,
  margin: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
  ]),
  typeTitle: PropTypes.number,
  padding: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
  ]),
};

Alert.defaultProps = {
  tipoBotao: 'button',
  statusColor: '#f8562c',
  sc: 'error',
  typeTitle: 2,
  margin: 10,
  padding: 10,
};

export { Alert };
export default Alert;
