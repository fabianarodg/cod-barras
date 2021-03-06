import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text } from './../../atoms/Text';
import * as styles from './form.styles';
import * as v from './validator';


const StyledInput = styled.input`
    ${styles.InputDefault}
    ${styles.InputHover}
    ${styles.InputFocus}
    ${styles.InputDisabled}
`;

const InputWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 20px 0;
    .posNotice {
      position: absolute;
      bottom: -10px;
      left: 0;
    }
`;

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.formatarValidar = this.formatarValidar.bind(this);
    this.validar = this.validar.bind(this);
    this.state = {
      status: null,
      notice: null,
    };
    this.reset = this.state;
  }
  resetState() {
    this.setState(this.reset);
  }

  warnValidation(ev) {
    if (!ev) { this.setState({ status: 'error', notice: 'Campo inválido' }); } else { this.setState({ status: null, notice: '' }); }
  }

  validar(e) {
    const validationType = this.props;
    e.preventDefault();
    const valInput = e.target.value;

    if (validationType === 'cpf') {
      const valF = v.validarCPF(valInput);
      this.warnValidation(valF);
    } else if (validationType === 'cnpj') {
      const valJ = v.validarCNPJ(valInput);
      this.warnValidation(valJ);
    } else if (validationType === 'email') {
      const valE = v.validarEMAIL(valInput);
      this.warnValidation(valE);
    } else if (validationType === 'tel') {
      this.warnValidation(valInput);
    }
  }

  formatarValidar(event) {
    const { validationType } = this.props;
    event.preventDefault();
    const idInput = event.target.id;
    const valInput = event.target.value;
    let size = 0;
    const inputLength = valInput.length;


    if (valInput === '') {
      this.resetState();
    } else if (validationType === 'cpf') {
      size = 14;
      v.formatarCPF(idInput, valInput);

      if (!v.isIncomplete(inputLength, size)) {
        const valF = v.validarCPF(valInput);
        this.warnValidation(valF);
      } else { this.resetState(); }
    } else if (validationType === 'cnpj') {
      size = 18;
      v.formatarCNPJ(idInput, valInput);

      if (!v.isIncomplete(inputLength, size)) {
        const valJ = v.validarCNPJ(valInput);
        this.warnValidation(valJ);
      }
    } else if (validationType === 'tel') {
      size = 11;
      v.formatarTEL(idInput, valInput);
      const newSize = size + 4;
      const complete = !v.isIncomplete(inputLength, newSize);
      if (complete || inputLength >= newSize) {
        this.warnValidation(valInput);
      }
    }
  }


  showNotice = (props, status, notice) => {
    if (notice) {
      return (<Text
        type="span"
        fontSize={props.noticeFont.fontSize}
        fontWeight={props.noticeFont.fontWeight}
        statusColor={status === 'error' ? '#F8562C' : ''}
      >{notice}
      </Text>);
    }
    return false;
  };

  render() {
    const p = this.props;
    const st = this.state.status ? this.state.status : p.status;
    const ntText = this.state.notice ? this.state.notice : p.notice;
    return (
      <InputWrapper className="loc">
        <Text
          type="span"
          fontFamily={p.labelFont.fontFamily}
          fontSize={p.labelFont.fontSize}
          fontWeight={p.labelFont.fontWeight}
          statusColor={p.status === 'error' ? '#F8562C' : ''}
        >{p.label}{}
        </Text>
        <StyledInput
          status={this.state.status ? this.state.status : p.status}
          onKeyUp={this.formatarValidar}
          onBlur={this.validar}
          {...p}
        />
        <div className="posNotice">
          {this.showNotice(p, st, ntText)}
        </div>
      </InputWrapper>
    );
  }
}

FormInput.propTypes = {
  type: PropTypes.oneOf(['text', 'password']),
  required: PropTypes.bool,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
  validationType: PropTypes.oneOf(['cpf', 'cnpj']),
  labelFont: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
    fontWeight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  }),
  inputFont: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
    fontWeight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  }),
  noticeFont: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.oneOf([-2, -1, 1, 2, 3, 4, 5, 6]),
    fontWeight: PropTypes.oneOf(['Light', 'Regular', 'Medium', 'Bold']),
  }),
  status: PropTypes.shape({
    label: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'white', 'black']),
    input: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'white', 'black']),
    notice: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link', 'white', 'black']),
  }),
};

FormInput.defaultProps = {
  type: 'text',
  validationType: 'cpf',
  required: false,
  status: {
    label: 'black',
    input: 'link',
    notice: 'dark',
  },
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
    fontWeight: 'Regular',
  },
  onKeyUp: function onKeyUp(param) {
    return param;
  },
  onBlur: function onBlur(param) {
    return param;
  },
};

export { FormInput };
export default FormInput;
