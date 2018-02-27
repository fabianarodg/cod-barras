import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { Button, Captcha } from 'coi';
import PropTypes from 'prop-types';

import * as v from './../components/molecules/Form/validator';
import { FormInput } from './../components/molecules/Form';
import { Text } from './../components/atoms/Text';
import { setCPF } from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      notice: '',
      isValid: false,
      captcha: '',
    };
    this.captchaCallback = (response) => {
      this.setState({ captcha: response });
    };
    this.desabilitaBotao = () => {
      if (this.state.cpf.length >= 14) {
        if (this.state.captcha) {
          if (!this.state.status) return false;
        }
      }
      return true;
    };
    this.handleClick = (event) => {
      if (event) event.preventDefault();
      this.props.setCPF(this.state.cpf);
      this.props.history.push('/lista');
      console.log(this.state);
    };
  }

  resetState(cpf) {
    const getCPF = cpf || '';
    this.setState({ status: '', notice: '', isValid: true, cpf: getCPF });
    return true;
  }

  warnValidation(ev, val) {
    if (!ev) {
      this.setState({ status: 'error', notice: 'CPF inválido' });
    } else {
      this.resetState(val);
    }
  }

  validate(e) {
    const eVal = e.target.value;
    let vr;
    if (!v.isIncomplete(eVal.length, 14)) {
      const val = v.validarCPF(eVal);
      this.warnValidation(val, eVal);
      vr = val;
    } else {
      this.resetState();
      vr = false;
    }
    this.setState({ isValid: vr });
  }

  format(e) {
    const idInput = e.target.id;
    const valInput = e.target.value;
    e.preventDefault();
    v.formatarCPF(idInput, valInput);
    this.validate(e);
  }

  render() {
    return (
      <Flex p="1rem">
        <Box gFlex={5}>
          <h1>CÓDIGO DE BARRAS</h1>
          <Text lineHeight={1.8}>De forma fácil e rápida, acesse o Código de Barras
            para realizar o pagamento de suas faturas.
          </Text>
          <Text lineHeight={1.8}>Não disponível para Oi TV HD e Fibra.
          Pra esse produtos ligue *880.</Text>
          <Flex margin="2rem 0">
            <Box width={6 / 12}>
              <FormInput
                id="cpf"
                validationType="cpf"
                label="CPF"
                status={this.state.status}
                notice={this.state.notice}
                placeholder="Digite seu CPF"
                onKeyUp={e => this.format(e)}
                onBlur={e => this.validate(e)}
              />
            </Box>
          </Flex>
          <Captcha onChange={this.captchaCallback} />
          <Flex>
            <Box width={6 / 12} my={20}>
              <Button
                disabled={!this.state.captcha.length && !this.state.isValid}
                onClick={this.handleClick}
              >Enviar
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

Home.propTypes = {
  setCPF: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};


const mapStateToProps = state => ({ lista: state.lista });
const mapDispatchToProps = dispatch => bindActionCreators({
  setCPF,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
