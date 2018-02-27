import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from 'mdi-react/CloseIcon';


const Outerstyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: none;
  &.is-open {
    display: block;
  }
`;

const CloseButton = styled(CloseIcon)`
  fill: #D82482;
  position: absolute;
  top: 10px; right: 10px;
  cursor:pointer;
  z-index:99999;
`;

const StyledModal = styled.div`
  position: relative;
  width:500px;
  min-height: 200px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  margin: 40px auto;
  border-radius: 3px;
  z-index: 2;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  .burger {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isModalOpen: false,
    };
  }
  // close modal
  handleClick() {
    const currentState = this.state.isModalOpen;
    this.setState({ isModalOpen: !currentState });
  }
  // render modal
  render() {
    const p = this.props;
    return (
      <Outerstyle
        className={this.state.isModalOpen ? 'is-open' : null}
      >
        <Overlay onClick={this.handleClick} />
        <StyledModal>
          <CloseButton onClick={this.handleClick} />
          {p.children}
        </StyledModal>
      </Outerstyle>);
  }
}
Modal.PropTypes = {
  trigger: PropTypes.oneOf(['auto', 'click', 'hover']),
  timeout: PropTypes.number,
  onClickOverlay: PropTypes.func,
  onClickClose: PropTypes.func,
};

Modal.defaultProps = {
  trigger: 'auto',

};

export { Modal };

export default Modal;
