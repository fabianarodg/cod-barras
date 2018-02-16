import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';

import Grid from '../../atoms/Grid';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import Text from '../../atoms/Text';
import Title from '../../atoms/Title';
import Button from '../../atoms/Button';
import Alert from '../../molecules/Alert';
import Img from '../../atoms/Img';
import Form, { FormRadio, FormCheck, FormInput, FormSelect } from '../../molecules/Form';

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
    console.log(m.formatDate('DMY', this.props.data), 'props itemConta');
    console.log(this.props.data, 'props itemConta');
  }

  showBarCode() {
    this.setState({ active: !this.state.active });
  }

  showMsgByDate(date) {
    let status = { qtd: 0, msg: '' };

    if (m.dateDiff(date) == 'hoje') {
      status = { msg: 'Vencendo', qtd: 'hoje' };
    } else if (m.dateDiff(date) > 0) {
      status = { msg: 'A vencer', qtd: `em ${m.dateDiff(date)} dia` };
      if (m.dateDiff(date) > 1) { status.qtd += 's'; }
    } else {
      const qtdias = m.dateDiff(date) * -1;
      status = { msg: 'Vencida', qtd: `há ${qtdias} dias` };
    }
    return status;
  }


  render() {
    const p = this.props;
    return (
      <StyledItem className={p.blockConta ? 'blocked' : ''}>
        <Grid className="row" centerItems>
          <Grid className="col-md-5">
            <span>
              <FormCheck
                value={p.codigoDeBarras}
                className="ck-conta"
                checked={p.checked}
                onChange={p.onChange}
                margin={0}
              />
              <span className="span-column">
                <Text type="span">R$ {p.valor}</Text>
                <Text type="span">Vencimento em {m.formatDate('DMY', p.data)}</Text>
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
            <Text type="p">{p.codigoDeBarras}</Text>
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

export { ItemConta };
export default ItemConta;
