import React, { Component } from 'react';
import styled from 'styled-components';

import { Grid } from '../../atoms/Grid';
import { Text } from '../../atoms/Text';
import { Title } from '../../atoms/Title';
import { ButtonLoader } from '../../molecules/ButtonLoader';
import Form, { FormInput } from '../../molecules/Form';
import { Alert } from '../../molecules/Alert';

const StyledHidden = styled(Grid)`
  &#gridHidden {
    display: none;
  }
`;
const StyledButtonLoader = styled(ButtonLoader)`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
function validate(cpf) {
  // true means invalid, so our conditions got reversed
  return {
    cpf: cpf.length < 14,
  };
}

class AuthConta extends Component {
  constructor(props) {
    super(props);
    this.handleCPF = this.handleCPF.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      CPF: false,
      disableSubmit: true,
      checkcpf: true,
      cpf: '',
    };
  }
  handleCPF(e) {
    this.setState({ cpf: e.target.value });
  }
  handleSubmit(e) {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
  }

  canBeSubmitted() {
    const errors = validate(this.state.cpf);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const p = this.props;
    const errors = validate(this.state.cpf);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <Grid className="container" {...p}>
        <Grid className="row">
          <Grid className="col-md-5">
            <Title type={2} fontSize={5}>Código de Barras</Title>
            <Grid>
              <Text>Informe seu CPF e clique no botão para gerar o código de
                    barras de sua(s) conta(s).
              </Text>
              <Grid className="grid-cpf">
                <Form id={p.id} onSubmit={this.handleSubmit}>
                  <FormInput
                    id="meu-id-unico-input1"
                    name="name-raio-input"
                    label="CPF"
                    validationType="cpf"
                    value={this.state.email}
                    onChange={this.handleCPF}
                    placeholder="Digite aqui o CPF"
                  />
                  <StyledButtonLoader disabled={isDisabled} type="submit" >Gerar código de barras</StyledButtonLoader>
                </Form>
              </Grid>
            </Grid>
            <StyledHidden id="gridHidden">
              <Title type={3} fontSize={3}>Resultado da busca</Title>
              <Alert status="warning">
                    Não encontramos nenhum produto associado ao CPF 077.847.347-35
              </Alert>
            </StyledHidden>
          </Grid>
          <Grid className="col-md-6 offset-md-1">
            <Title type={2} fontSize={3}>Autoatendimento online</Title>
            <Text>
                  De forma fácil e rápida, acesse o Código de Barras
                  para realizar o pagamento de suas faturas. É possível
                  também enviar o Código de Barras por SMS pra um Celular
                  Oi ou pro seu e-mail.
            </Text>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export { AuthConta };
export default AuthConta;
