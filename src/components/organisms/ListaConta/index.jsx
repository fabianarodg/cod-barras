import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid } from '../../atoms/Grid';
import { Text } from '../../atoms/Text';
import { Title } from '../../atoms/Title';
import { Alert } from '../../molecules/Alert';
import { ItemConta } from './itemConta';


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


    this.showAlert = (showAlert) => {
      let sAlert;
      if (showAlert) {
        sAlert = (
          <Alert
            status="info"
            title="Atenção: Produto com conta em débito automático"
            className="margin-alert"
            margin={[18, 0, 0, 0]}
          >A conta a vencer terá o pagamento realizado automaticamente em sua conta corrente
na data do vencimento. Caso tenha algum dúvida entre em contato com seu banco.
          </Alert>
        );
      }
      return sAlert;
    };

    this.mapTerms = prod => (<div> {prod.terminais.map(item =>
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
              item.faturas.map(m =>
                (<ItemConta
                  onChange={this.props.onChange}
                  valor={m.valor}
                  codigoDeBarras={m.codigoDeBarras}
                  data={m.data}
                  tem14Meses={m.tem14Meses}
                  imgCodBarras={m.codigoDeBarras}
                  checked={m.checked ? m.checked : false}
                />),
                // (<div onChange={this.props.onChange}> {m.codigoDeBarras} </div>),
              )
            }
          </StyledUl>
        </Grid>
      </Grid>))}
    </div>);
  }

  render() {
    return (
      this.mapTerms(this.props.produto)
    );
  }
}

ListaConta.propTypes = {
  onChange: PropTypes.func,
  produto: PropTypes.node,
};

ListaConta.defaultProps = {
  onChange: function onChange(prod) {
    return prod;
  },
  produto: {},
};

export { ListaConta };
export default ListaConta;
