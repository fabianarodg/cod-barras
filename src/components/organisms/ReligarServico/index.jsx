import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Grid from '../../atoms/Grid';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import Text from '../../atoms/Text';
import Title from '../../atoms/Title';
import Button from '../../atoms/Button';
import Tab from './../Tab';
import Table from '../../molecules/Table';
import Modal from '../../molecules/Modal';
import Form, { FormRadio, FormCheck, FormInput, FormSelect } from '../../molecules/Form';

import HeaderListaConta from './../HeaderListaConta';
import ListaReligar from './../ListaReligar';
import CodBarra from './../../../assets/images/barras.png';
import TemplateReligar from './template';
import CheckIcon from 'mdi-react/CheckIcon';

class ReligarServico extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectAll: false,
      isChecked: false,
    };
  }

  // NÃO FUNCIONA
  handleSelectAll() {
    this.setState({ selectAll: !this.state.selectAll });
  }

  isChecked() {
    console.log('funfou');
  }


  render() {
    const p = this.props;
    // console.log('outChecked', this.state.isChecked)
    return (
      <TemplateReligar
        content={[
          <Title>Para realizar o pagamento:</Title>,
          <List type="ul">
            <Text><CheckIcon /> Digite o código em caixas eletrônicos ou Internet Banking</Text>
            <Text><CheckIcon /> Pra pagar em caixas de banco, utilize a versão impressa</Text>
          </List>,
            ]}
      >

        <ListaReligar
          numTel="(21) 99967-0014"
          onChange={() => alert('ok')}
          allChecked={this.state.selectAll}
          firstNumber={[
                    {
barCode: 199, valor: 129.87, codbarras: "You don't want to own this!", date: '12/12/2017', block: true, src: CodBarra,
},
                    {
 barCode: 324, valor: 115.98, codbarras: 'You might want to own this!', date: '01/10/2017', block: false,
},
                    {
barCode: 731, valor: 360.62, codbarras: 'You might want to own this!', date: '02/04/2017', block: false,
},
                    ]}
        />
      </TemplateReligar>
    );
  }
}

export { ReligarServico };
export default ReligarServico;
