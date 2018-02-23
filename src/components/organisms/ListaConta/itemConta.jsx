import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled';
import { Grid } from '../../atoms/Grid';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { FormCheck } from '../../molecules/Form';

import { StyledItem } from './index.styles';

class ItemConta extends Component {
  constructor(props) {
    super(props);
    /* eslint-disable */
    console.log(this.props);
    /* eslint-enable */


    this.state = {
      active: false,
      dateMsg: '',
    };
  }

  showBarCode = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <li className={this.props.tem14Meses ? 'blocked' : ''}>
        <Flex>
          <Box width={5 / 12} px={2}>
            <span>
              <FormCheck
                value={this.props.codigoDeBarras}
                className="ck-conta"
                checked={this.props.checked}
                onChange={this.props.onChange}
                margin={0}
              />
              <span className="span-column">
                <Text type="span">R$ {this.props.valor}</Text>
                <Text type="span">Vencimento em {this.props.data}</Text>
              </span>
            </span>
          </Box>
          <Box width={5 / 12} px={2}>
            <Text type="p" margin={0}>{this.state.dateMsg.msg}</Text>
            <Text type="p" margin={0}>{this.state.dateMsg.qtd}</Text>
          </Box>
          <Box width={1 / 12} px={2}>
            <Button styleButton="linkface" onClick={() => this.showBarCode()}>
              {this.state.active ? 'Esconder' : 'Mostrar'} Código
            </Button>
          </Box>
        </Flex>
        <div style={{ display: this.state.active ? 'block' : 'none' }} className="align-center">
          <Grid className="content-codbarras">
            <Text type="p">{this.props.codigoDeBarras}</Text>
            <Button styleButton="linkface" className="link-lista">Copiar Código de Barras</Button>
          </Grid>
          <Text type="span">Esse é o código de barras para pagamento no seu banco
                    ou casas lotéricas, caso queira a conta detalhada acesse a Minha Oi.
          </Text>
        </div>
      </li>
    );
  }
}

ItemConta.propTypes = {
  tem14Meses: PropTypes.bool,
  codigoDeBarras: PropTypes.string,
  checked: PropTypes.bool,
  onChange: function onChange(param) {
    return param;
  },
  valor: PropTypes.number,
  data: PropTypes.string,
};

ItemConta.defaultProps = {
  tem14Meses: false,
  codigoDeBarras: '0',
  checked: false,
  onChange: function onChange(param) {
    return param;
  },
  valor: 0,
  data: '31/12/2017',
};

export { ItemConta };
export default ItemConta;
