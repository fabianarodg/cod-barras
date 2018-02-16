import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, extend } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';

import Grid from './../../../components/atoms/Grid';
import Icon from './../../../components/atoms/Icon';
import List from './../../../components/atoms/List';
import Text from './../../../components/atoms/Text';
import Title from './../../../components/atoms/Title';
import Button from './../../../components/atoms/Button';
import Table from './../../../components/molecules/Table';
import Modal from './../../../components/molecules/Modal';
import Alert from './../../../components/molecules/Alert';
import ButtonLoader from './../../../components/molecules/ButtonLoader';
import HeaderListaConta from './../../../components/organisms/HeaderListaConta';
import BarrasImg from './../../../assets/images/barras.png';
import Img from './../../../components/atoms/Img';
import Form, { FormRadio, FormCheck, FormInput, FormSelect } from './../../../components/molecules/Form';

const StyledInfo = styled(Grid)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 10px;
	margin: 30px 0 50px 0;
`;
const StyledList = styled(List)`
	margin-top:20px;
	list-style: none;
	& li {
		margin:0;
		}
	& li:nth-child(2) {
		margin:0 0 0 40px;
		}
`;
const StyledAlert = styled(Alert)`
	margin: 18px 0 0 0;
`;

const StyledUl = styled.ul`
	padding:0;
`;
const StyledLiContas = styled.li`
	border-bottom: 1px solid #4a4a4a;
	padding: 30px 10px;
	list-style: none;
	&.marked {
		border-left: 4px solid #D82482;
		border-radius: 2px;
	}

	& .div-flex {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap:wrap;
	}
	& .span-column {
		display: flex;
		flex-flow:column;
		margin-left:40px;
	}
	& .align-center {
    text-align:center;
  }
`;


class TableReligar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.display = this.display.bind(this);
    this.liClass = this.liClass.bind(this);
    this.Item = this.Item.bind(this);
    this.state = {
      active: null,
      placeholderModal: 'Enviar E-mail',
      checkedDefault: 'email',
    };
  }

  handleClick(i) {
    return (e) => {
      const active = this.state.active === i ? null : i;
      this.setState({ active });
    };
  }

  display(i) {
    return this.state.active === i ? 'block' : 'none';
  }
  liClass(i) {
    return this.state.active === i ? 'active' : 'inactive';
  }

  Item(props, i) {
    if (props.codigo === 1) {
      props.codigo = `${'Vencida' + ' há '}${props.deadLine} ` + 'dias';
    } else if (props.codigo === 2) {
      props.codigo = `${'A vencer' + ' em '}${props.deadLine} ` + 'dias';
    }
    return (
      <StyledLiContas key={i} className={props.block ? 'marked' : ''}>
        <Grid className="row" centerItems>
          <Grid className="col-md-5">
            <span>
              <FormCheck
                id={props.id}
                name="item-conta"
                label=""
                value=""
                margin={[0, 0]}
              />
              <span className="span-column">
                <Text type="span">R$ {props.valor}</Text>
                <Text type="span">Vencimento em {props.date}</Text>
              </span>
            </span>
          </Grid>

          <Grid className="col-md-5">
            <Text type="p" margin={0}>{props.status}</Text>
            <Text type="p" margin={0}>{props.codigo}</Text>
          </Grid>

          <Grid className="col-md-2">
            <Button styleButton="linkface" onClick={this.handleClick(i)}>
							Mostrar Código
            </Button>
          </Grid>
        </Grid>
        <div style={{ display: this.display(i) }} className="align-center">
          <Img src={BarrasImg} />

          <Text type="span">Esse é o código de barras para pagamento no seu banco
					ou casas lotéricas, caso queira a conta detalhada acesse a Minha Oi.
          </Text>
        </div>
      </StyledLiContas>
    );
  }

  changePlaceholder(e) {
    let pla = this.state.placeholderModal;
    if (e.target.value == 'email') { pla = 'Enviar E-mail'; } else { pla = 'SMS para número Oi'; }
    document.getElementById('refInput').value = '';
    this.setState({ placeholderModal: pla, checkedDefault: e.target.value });
  }


  render() {
    const p = this.props;
    const firstNumber = p.firstNumber;

    return (
      <Grid className="container-fluid">
        <Grid className="container">
          <Grid className="row" centerItems>
            <Grid className="col-md-12">
              <Text fontSize={2} margin={0}themeColor="dark">Código de Barras</Text>
              <Title fontSize={5}>Contas a Pagar</Title>
              <Text type="span" fontSize={2}>CPF 123.456.890-34</Text>
              <Text type="span" fontSize={-2} margin={[0, 0, 0, 30]}>Consultar outro cpf</Text>
            </Grid>

            <Grid className="col-md-12">


              <Text type="span"> N. do Produto </Text>
              <Title fontSize={3}> (21) **** 9933 </Title>
              <StyledAlert
                status="info"
                title="Atenção: Produto com conta em débito automático"
                className="margin-alert"
              >
								A conta a vencer terá o pagamento realizado automaticamente em sua conta corrente
								na data do vencimento. Caso tenha algum dúvida entre em contato com seu banco.
              </StyledAlert>
              <StyledUl>
                {firstNumber.map(this.Item)}
              </StyledUl>
            </Grid>
          </Grid>
        </Grid>

        <Modal ref={(modal) => { this.Modal = modal; }}>
          <Grid className="container">
            <Grid className="row">
              <Grid col className="col-12">
                <Title type={1} themeColor="primary" >Enviar código de barras</Title>
                <StyledList type="ul" direction="horizontal" onChange={this.changePlaceholder.bind(this)}>
                  <div>
                    <Text type="label" htmlFor="meu-id-unico3">E-mail</Text>
                    <input type="radio" id="meu-id-unico3" name="name-raio" value="email" defaultChecked />
                  </div>
                  <div>
                    <Text type="label" htmlFor="meu-id-unico4">SMS</Text>
                    <input type="radio" id="meu-id-unico4" name="name-raio" value="tel" />
                  </div>
                </StyledList>

                <FormInput
                  id="email-modal-conta"
                  id="refInput"
                  name="name-raio-input"
                  validationType={this.state.checkedDefault}
                  placeholder={this.state.placeholderModal}
                />

                <ButtonLoader type="button">Enviar</ButtonLoader>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}
export { TableReligar };
export default TableReligar;
