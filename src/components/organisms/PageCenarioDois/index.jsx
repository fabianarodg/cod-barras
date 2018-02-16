import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';
import Grid from '../../atoms/Grid';
import Button from './../../atoms/Button';
import List from './../../atoms/List';
import Text from './../../atoms/Text';
import Title from './../../atoms/Title';
import Icon from './../../atoms/Icon';
import Alert from '../../molecules/Alert';
import * as m from '../../styles/mixins';

const StyledTitle = styled(Title)`
  font-size: 30px;
`;
const StyledText = styled(Text)`
  margin-bottom: 0px;
  color: #909090;
  font-size: 18px;
  font-weight: 600;
`;
const StyledTextP = styled(Text)`
  margin-top: 66px;
`;
const StyledButton = styled(Button)`
  color: #909090;
  text-transform: none;
  font-weight: normal;
`;
const StyledLinkButton = styled(Button)`
  text-transform:none;
  font-weight: normal;
`;
const StyledAlert = styled(Alert)`
  padding-left: 0;
  margin-top: 50px;
  & .text-content {
    margin-top: -5px;
  }
`;
class PageCenarioDois extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid className="container">
        <Grid className="row">
          <Grid className="col-md-5">
            <StyledTitle>
              Não há contas pendentes!
            </StyledTitle>
            <StyledText type="p">CPF 123.456.890-34</StyledText>
            <StyledButton href="#" styleButton="linkface" margin={0}>
              Consultar outro CPF
            </StyledButton>
            <StyledAlert status="warning">
              Não encontramos contas pendentes de pagamento mas identificamos um problema técnico na sua região.
            </StyledAlert>
            <Text type="p" fontSize={-1}>
              Oi está realizando agora uma manutenção na sua região. Infelizmente, isso esta afetando o
              funcionamento do seu Oi Fixo. Os técnicos estão fazendo o máximo possível para restabelecer o serviço.
            </Text>
            <Text type="p" fontSize={-1}>
            Para buscarmos as contas da sua TV HD, você precisa fazer sua identificação completa na <StyledLinkButton href="#" styleButton="linkface" margin={0}>Minha Oi.</StyledLinkButton>
            </Text>
            <StyledTextP type="p" fontSize={-1}>
              Para problemas com Fibra, ligue 10631 do seu celular Oi ou fixo.
            </StyledTextP>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export { PageCenarioDois };
export default PageCenarioDois;
