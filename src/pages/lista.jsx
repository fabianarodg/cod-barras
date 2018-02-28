import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Muted, Button, Alert } from 'coi';
import { maskCPF } from '../utils/masks';
import { ListaConta } from '../components/organisms/ListaConta';
import { HeaderListaConta } from '../components/organisms/HeaderListaConta';

class ListaDeConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [false, false],
      enablePrint: false,
    };

    this.faturas = this.props.faturas.fechada;
  }

  lookAll = () => {
    console.log(this.state.checked);
    const result = this.state.checked.every(item => item);
    console.log(result);
    return result;
  };

  handleChecked = (checkedList) => {
    this.setState({ checked: checkedList });
    console.log('fora', this.state.checked);
  }

  changeAll = () => {
    const newState = [...this.state.check];
    const result = !this.lookAll();
    newState.map((item, index) => {
      newState[index] = result;
      return newState[index];
    });
    this.setState({ check: newState, enablePrint: result });
    console.log('changeAll', newState, result);
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
            onChange={() => this.lookAll()}
            onPrint={() => window.print()}
            checked={this.lookAll()}
            enablePrint={this.state.enablePrint}
          />
          <ListaConta
            onChange={this.handleChecked}
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
