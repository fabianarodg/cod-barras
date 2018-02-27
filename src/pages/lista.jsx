import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Muted, Button, Alert } from 'coi';
import { maskCPF } from '../utils/masks';
import { ListaConta } from '../components/organisms/ListaConta';
import { HeaderListaConta } from '../components/organisms/HeaderListaConta';

// import { incrementIfOdd } from '../actions';

class ListaDeConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enablePrint: false,
      check: [false, true],
    };
    this.faturas = this.props.faturas.fechada;
  }

  lookAll = () => false;
  lookAll = () => {
    const result = this.state.check.every(item => item);
    return result;
  };
  handleChangeAll = () => {
    this.changeAll(!this.lookAll());
  };

  render() {
    return (
      <Row padding="1rem">
        <Col grow={5}>
          <header>
            <h2>CONTAS A PAGAR</h2>
            <Muted>CPF {maskCPF(this.props.faturas.cpf)}</Muted><br />
            <Button link><Muted><small>Consultar outro CPF</small></Muted></Button>
            <Row margin="2rem 0">
              <Alert danger>
                <span>
                  {/* eslint-disable */}
                  Você possui <strong>2 contas vencidas</strong> e <strong>2 contas a vencer</strong>.
                  {/* eslint-enable */}
                </span>
              </Alert>
            </Row>
          </header>

          <HeaderListaConta
            onChange={this.handleChangeAll}
            onPrint={() => window.print()}
            checked={this.lookAll()}
            enablePrint={this.state.enablePrint}
          />
          <ListaConta
            ref={(ref) => { this.ListaConta = ref; }}
            key={Math.random()}
            faturas={this.faturas}
          />

          <footer>
            <Row margin="2rem 0">
              <Col margin="0 3rem"><Button invert><strong>INFORMAR PAGAMENTO PARA RELIGAR O SERVIÇO</strong></Button></Col>
            </Row>
          </footer>
        </Col>
        <Col grow={4} />
      </Row>
    );
  }
}

ListaDeConta.propTypes = {
  faturas: PropTypes.objectOf(PropTypes.any).isRequired,
};


const mapStateToProps = state => ({ faturas: state.faturas });
const mapDispatchToProps = dispatch => bindActionCreators({
  // incrementIfOdd,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListaDeConta);
