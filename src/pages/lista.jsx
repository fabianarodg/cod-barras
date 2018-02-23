import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Muted, Button, Alert } from 'coi';

import Terminal from '../components/terminal';

// import { incrementIfOdd } from '../actions';

class ListaDeConta extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.faturas = this.props.faturas.fechada;
  }

  onClickIncrementar = () => {
    // this.props.incrementIfOdd();
  }

  render() {
    return (
      <Row padding="1rem">
        <Col grow={5}>
          <header>
            <h2>CONTAS A PAGAR</h2>
            <Muted>CPF {this.props.faturas.cpf}</Muted><br />
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
          {
            this.faturas.map(terminal => (
              terminal.faturas.length ? <Terminal key={Math.random()} terminal={terminal} /> : null
            ))
          }
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
