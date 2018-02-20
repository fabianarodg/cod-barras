import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '../../atoms/Grid';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { FormCheck } from '../../molecules/Form';

import { StyledItem } from './index.styles';
import * as m from './../../styles/mixins';

class ItemConta extends Component {
  constructor(props) {
    super(props);
    this.showBarCode = this.showBarCode.bind(this);
    this.state = {
      active: false,
      dateMsg: this.showMsgByDate(this.props.data),
    };

    this.showBarCode = () => {
      this.setState({ active: !this.state.active });
    };

    this.showMsgByDate = (date) => {
      let status = { qtd: 0, msg: '' };

      if (m.dateDiff(date) === 'hoje') {
        status = { msg: 'Vencendo', qtd: 'hoje' };
      } else if (m.dateDiff(date) > 0) {
        status = { msg: 'A vencer', qtd: `em ${m.dateDiff(date)} dia` };
        if (m.dateDiff(date) > 1) { status.qtd += 's'; }
      } else {
        const qtdias = m.dateDiff(date) * -1;
        status = { msg: 'Vencida', qtd: `há ${qtdias} dias` };
      }
      return status;
    };
  }


  render() {
    return (
      <StyledItem className={this.props.tem14Meses ? 'blocked' : ''}>
        <Grid className="row" centerItems>
          <Grid className="col-md-5">
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
                <Text type="span">Vencimento em {m.formatDate('DMY', this.props.data)}</Text>
              </span>
            </span>
          </Grid>
          <Grid className="col-md-5">
            <Text type="p" margin={0}>{this.state.dateMsg.msg}</Text>
            <Text type="p" margin={0}>{this.state.dateMsg.qtd}</Text>
          </Grid>
          <Grid className="col-md-2">
            <Button styleButton="linkface" onClick={() => this.showBarCode()}>
              {this.state.active ? 'Esconder' : 'Mostrar'} Código
            </Button>
          </Grid>
        </Grid>

        <div style={{ display: this.state.active ? 'block' : 'none' }} className="align-center">
          <Grid className="content-codbarras">
            <Text type="p">{this.props.codigoDeBarras}</Text>
            <Button styleButton="linkface" className="link-lista">Copiar Código de Barras</Button>
          </Grid>
          <Text type="span">Esse é o código de barras para pagamento no seu banco
                    ou casas lotéricas, caso queira a conta detalhada acesse a Minha Oi.
          </Text>
        </div>
      </StyledItem>
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
