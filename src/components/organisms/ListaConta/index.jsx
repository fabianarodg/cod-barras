import { Grid, Row, Col, Muted, Button, Alert, Title, Radio as Check } from 'coi';
import React, { PureComponent as Component } from 'react';
import formatCurrencyToBr from 'format-currency-to-br';
import Barcode from 'react-barcode';
import PropTypes from 'prop-types';

import { maskTel } from './../../../utils/masks';
import { formatDate } from './../../styles/mixins';

class ListaConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: 0,
      checked: [],
    };
  }

  handleCkd = (index) => {
    this.state.checked[index] = !this.state.checked[index];
    this.props.onChange(this.state.checked);
    console.log(this.state.checked);
  }

  populate = contas => contas.map(() => (this.state.checked.push(false)))

  showBarCode = (index) => {
    let numOpen;
    if (this.state.isOpened === index) { numOpen = 0; } else { numOpen = index; }
    this.setState({ isOpened: numOpen });
  }

  contas = (listaContas) => {
    const lista = listaContas;
    let temLista;
    this.populate(lista);

    if (lista.length > 0) {
      temLista = lista.map((fatura, index) => (
        <Grid key={Math.random()}>
          <Row padding="1rem 0">
            <Col grow={0} align="flex-start" padding=".2rem .8rem 0 0">
              <Check
                onChange={() => this.handleCkd(index)}
                name="conta"
                checked={this.state.checked[index]}
              />
              {this.state.checked[index]}
            </Col>
            <Col>
              <Row>
                <Col justify="center"><Title>{formatCurrencyToBr(fatura.valor)}</Title></Col>
              </Row>
              <Row>
                <Col justify="center"><Muted><small>Vencimento: {formatDate('DMY', fatura.dataVencimento)}</small></Muted></Col>
                <Col justify="center" align="center"><Alert danger noicon><span>Vencida há <strong>{fatura.diasVencido} dias</strong></span></Alert></Col>
                <Col justify="center" align="flex-end"><Button onClick={() => this.showBarCode(index + 1)} link><strong><small>{ this.state.isOpened === index + 1 ? 'ESCONDER' : 'MOSTRAR' } CÓDIGO</small></strong></Button></Col>
              </Row>
            </Col>
          </Row>
          <div style={{ display: this.state.isOpened === index + 1 ? 'block' : 'none' }}>
            <Col align="center">
              <Barcode
                value={fatura.codigoDeBarras}
                displayValue={false}
                lineColor="#222"
                height={60}
                margin={0}
                width={1}
              />
              <small>{fatura.codigoDeBarras}</small>
            </Col>
            <Row>
              <Col />
              <Col padding="1rem 0 1rem 2rem" grow={0} align="right">
                <Button link><strong><small>COPIAR CÓDIGO DE BARRAS</small></strong></Button>
              </Col>
            </Row>
          </div>
        </Grid>
      ));
    } else {
      temLista = (<Row margin="1rem 0">
        <Alert success>
          <span>
        Este terminal não tem faturas em aberto.
          </span>
        </Alert>
      </Row>);
    }
    return temLista;
  }

  terminal = (numTel) => {
    const tel = numTel;
    const term = tel.map((item) => {
      let lis;
      if (item.faturas.length > 0) {
        lis = (<article>
          <Grid background="#f5f5f5">
            <Row padding="1rem 0">
              <Col>
                <Muted><small>Número do produto</small></Muted>
                <Title>{maskTel(item.terminal)}</Title>
              </Col>
            </Row>
          </Grid>
          {this.contas(item.faturas)}
        </article>);
      }
      return lis;
    });

    return term;
  }

  render() {
    return (
      <article>
        {this.terminal(this.props.faturas)}
      </article>
    );
  }
}

ListaConta.propTypes = {
  faturas: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func,
};

ListaConta.defaultProps = {
  faturas: {},
  onChange: function getList(param) {
    return param;
  },
};

export { ListaConta };
export default ListaConta;
