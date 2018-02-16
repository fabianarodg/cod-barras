import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';

import Grid from '../../atoms/Grid';
import Text from '../../atoms/Text';
import Title from '../../atoms/Title';
import Alert from '../../molecules/Alert';
import ItemConta from './itemConta';

import styles from './index.styles';
import * as m from './../../styles/mixins';

const StyledUl = styled.ul`
  padding:0;
`;

class ListaConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTel: '',
      dacc: false,
      produtos: [],
    };


    console.log(this.props.produto);
    // this.listarContas(this.props.contas)
  }

  showAlert(showAlert) {
    if (showAlert) {
      return (
        <Alert
          status="info"
          title="Atenção: Produto com conta em débito automático"
          className="margin-alert"
          margin={[18, 0, 0, 0]}
        >
						A conta a vencer terá o pagamento realizado automaticamente em sua conta corrente
						na data do vencimento. Caso tenha algum dúvida entre em contato com seu banco.
        </Alert>
      );
    }
  }

  mapTerms(prod) {
    return (<div> {prod.terminais.map((item, index) =>
      (<Grid className="col-md-12">
        <Grid statusColor="light">
          <Grid className="container">
            <Grid className="col-12">
              <Text type="span"> Nº do Produto </Text>
              <Title fontSize={3}>{item.terminal}</Title>

            </Grid>
          </Grid>
        </Grid>
        <Grid className="container">
          <StyledUl>
            {
						item.faturas.map((m, x) =>
  (<ItemConta
    onChange={this.props.onChange}
    valor={m.valor}
    codigoDeBarras={m.codigoDeBarras}
    data={m.data}
    tem14Meses={m.tem14Meses}
    imgCodBarras={m.imgCodBarras}
    checked={m.checked ? m.checked : false}
  />))
					}
          </StyledUl>
        </Grid>
      </Grid>))}
            </div>);
  }


  render() {
    const p = this.props;
    return (

      this.mapTerms(p.produto)

    );
  }
}
export { ListaConta };
export default ListaConta;
