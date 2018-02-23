import { Grid, Row, Col, Muted, Button, Alert, Title, Radio, Collapse } from 'coi';
import React, { PureComponent as Component } from 'react';
import formatCurrencyToBr from 'format-currency-to-br';
import Barcode from 'react-barcode';
import PropTypes from 'prop-types';

export default class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      open: 0,
    };
    this.handleClick = (index) => {
      if (this.state.open === index) this.setState({ open: 0 });
      else this.setState({ open: index });
    };
    this.handleChange = index => this.setState({ checked: index });
  }

  render() {
    if (this.props.terminal) {
      return (
        <article>
          <Row padding="1rem 0">
            <Col>
              <Muted><small>Número do produto</small></Muted>
              <Title>{this.props.terminal.terminal}</Title>
            </Col>
          </Row>
          <Row padding="1rem 0 2rem 0">
            <Col><Radio><small>Selecionar todas</small></Radio></Col>
            <Col grow={0}><Button link><strong><small>IMPRIMIR</small></strong></Button></Col>
            <Col grow={0} padding="0 0 0 2rem"><Button link><strong><small>ENVIAR</small></strong></Button></Col>
          </Row>
          { this.props.terminal.faturas.map((fatura, index) => (
            // FATURAS!!!!!!!
            <Grid key={Math.random()}>
              {/* <Row margin="1rem 0">
                <Alert danger muted>
                  <span>
                  Esse serviço está bloqueado por falta de pagamento. Para religar<br />
                  o serviço é necessário pagar pelo menos a conta mais antiga.
                  </span>
                </Alert>
              </Row> */}
              <Row padding="1rem 0">
                <Col grow={0} align="flex-start" padding=".2rem .8rem 0 0"><Radio /></Col>
                <Col>
                  <Row>
                    <Col justify="center"><Title>{formatCurrencyToBr(fatura.valor)}</Title></Col>
                  </Row>
                  <Row>
                    <Col justify="center"><Muted><small>Vencimento: {fatura.dataVencimento}</small></Muted></Col>
                    <Col justify="center" align="center"><Alert danger noicon><span>Vencida há <strong>{fatura.diasVencido} dias</strong></span></Alert></Col>
                    <Col justify="center" align="flex-end"><Button onClick={() => this.handleClick(index + 1)} link><strong><small>MOSTRAR CÓDIGO</small></strong></Button></Col>
                  </Row>
                </Col>
              </Row>
              <Collapse open={this.state.open === index + 1}>
                <Col align="center">
                  <Barcode value={fatura.codigoDeBarras} displayValue={false} lineColor="#222" height={60} margin={0} width={1} />
                  <small>{fatura.codigoDeBarras}</small>
                </Col>
                <Row>
                  <Col />
                  <Col padding="1rem 0 1rem 2rem" grow={0}><Button link><strong><small>COPIAR CÓDIGO DE BARRAS</small></strong></Button></Col>
                </Row>
              </Collapse>
            </Grid>
          )) }

        </article>
      );
    }
    return null;
  }
}

Terminal.propTypes = {
  terminal: PropTypes.objectOf(PropTypes.any).isRequired,
};
