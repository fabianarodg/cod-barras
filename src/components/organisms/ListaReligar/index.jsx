import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';

import Grid from '../../atoms/Grid';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import Text from '../../atoms/Text';
import Title from '../../atoms/Title';
import Button from '../../atoms/Button';
import Alert from '../../molecules/Alert';
import Accordion from '../../molecules/Accordion';
import Img from '../../atoms/Img';
import ItemConta from './../ListaConta/itemConta';
import Form, { FormRadio, FormCheck, FormInput, FormSelect } from '../../molecules/Form';

import * as m from './../../styles/mixins';

const StyledUl = styled.ul`
  padding:0;
`;

const StyledTitle = styled(Title)`
  font-size: 30px;
`;
const StyledText = styled(Text)`
  margin-bottom: 0px;
  color: #909090;
  font-size: 18px;
  font-weight: 600;
`;
const StyledTextP = styled(Text)`
  margin-top: 66px;
`;
const StyledButton = styled(Button)`
  color: #909090;
  text-transform: none;
  font-weight: normal;
`;
const StyledAlert = styled(Alert)`
  padding-left: 0;
  margin-top: 45px;
  width: 65%;
  & .text-content {
    margin-top: -5px;
  }
`;
const StyledAccordion = styled(Accordion)`
  position: relative;
  margin-top: 20px;
  border: none;
  & > div {
    background: transparent;
    & > input:checked ~ .collapse-content {
      max-height:50em;
    }
  }
  & .collapse-header {
    flex-flow: column;
    align-items: flex-start;
    height: auto;
    border: none;
    padding: 16px 15px;
    background: #F5F5F5;
  }

  & i {
    position: absolute;
    top: 40px;
    right: 50px;
  }
  & .margin-alert{
    background: transparent;
    width: 65%;
    margin-top: 0;
    padding: 0;
  }
  & .mdi-icon {
    fill: #909090;
  }
  & .text-content p {
    color:#222222;
    font-size: 14px;
  }
  & .span-accordion {
    font-size: 12px;
    color: #909090;
  }

`;
class ListaReligar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadoCPF: '',
      produtos: [],
      existeConta: '',
    };

    this.dados = this.props.dadosCliente;

    this.populaDados = (contas) => {
      let cpf = '';
      const listaContas = [];
      Object.keys(contas).map((key, index) => {
        if (key == 'cpf') { cpf = contas[key]; } else {
          const prod = contas[key];
          Object.keys(prod).map((k, i) => {
            listaContas.push(prod[k]);
          });
        }
      });
      this.state.existeConta = listaContas.length > 0 ? 'HÁ CONTAS PENDENTES' : 'NÃO HÁ CONTAS PENDENTES!';
      this.state.dadoCPF = cpf;
      this.state.produtos = listaContas;
    };
  }


  render() {
    const p = this.props;
    return (

      <StyledAccordion themeColor="primary">
        <div title={[
          <Text type="span" className="span-accordion">Número do produto</Text>,
          <Title type={3}>{p.produto.numTel}</Title>,
          <Alert
            status="info"
            className="margin-alert"
          >
								Esse serviço está bloqueado por falta de pagamento. Para religar o serviço
								é necessário pagar pelo menos a conta mais antiga.
          </Alert>,
							]}
        >
          <StyledUl>
            {
							p.produto.contas.map((item, index) =>
  (<ItemConta
    onChange={p.onChange}
    idCheck={item.idCheck}
    valorConta={item.valorConta}
    codBarras={item.codBarras}
    dataConta={item.dataConta}
    blockConta={item.blockConta}
    imgCodBarras={item.imgCodBarras}
    checked={item.checked}
  />))
          				}
          </StyledUl>
        </div>
      </StyledAccordion>


    );
  }
}
export { ListaReligar };
export default ListaReligar;
