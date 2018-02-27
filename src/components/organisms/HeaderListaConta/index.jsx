import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Captcha, Radio as Check } from 'coi';

import { Grid } from '../../atoms/Grid';
import { List } from '../../atoms/List';
import { Text } from '../../atoms/Text';
import { Title } from '../../atoms/Title';

import { Popover, PopContent } from '../../molecules/Popover';
import { Button } from '../../atoms/Button';
import { Modal } from '../../molecules/Modal';
import { ButtonLoader } from '../../molecules/ButtonLoader';
import Form, { FormRadio, FormInput } from '../../molecules/Form';

const StyledInfo = styled(Grid) `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  margin: 0;
`;

const newLocal = `
  margin-top:20px;
  list-style: none;
  & div {
    padding: 0;
  & label {
    padding: 0;
  }
  & label:nth-child(2) {
    margin-left: 30px;
  }
  & span {
    margin: 12px 0 0 25px;
  }
}
`;
const StyledList = styled.div`${newLocal}`;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

class HeaderListaConta extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.changePlaceholder = this.changePlaceholder.bind(this);
    this.state = {
      active: null,
      checked: false,
      disable: false,
      placeholderModal: 'Informe o e-mail',
      checkedDefault: 'email',
      email: '',
      errors: true,
    };
    this.captchaCallback = (response) => {
      console.log({ captcha: response });
    };
  }

  handleClick(i) {
    return () => {
      const active = this.state.active === i ? null : i;
      this.setState({ active });
    };
  }
  selectAllChecks() {
    this.setState({ checked: !this.state.checked });
  }
  changePlaceholder(e) {
    let pla = this.state.placeholderModal;
    if (e.target.value === 'email') {
      pla = 'Informe o e-mail';
    } else {
      pla = 'Informe o número do celular Oi com DDD';
    }
    this.setState({ placeholderModal: pla, checkedDefault: e.target.value, email: '' });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
  }

  checkErrors() {
    if (this.state.email) {
      this.setState({ errors: false });
    } else {
      this.setState({ errors: true });
    }
  }

  renderPopover = labelButton => (
    <Popover>
      <Button styleButton="linkface" >{labelButton}</Button>
      <PopContent>
        <Text>Selecione pelo menos uma das contas abaixo para realizar essa ação.
        </Text>
      </PopContent>
    </Popover>
  )

  render() {
    const p = this.props;
    const isDisabled = this.state.errors;
    return (
      <Wrapper>
        <StyledInfo >
          <Text type="span">
            <Check
              id="select-conta"
              checked={this.props.checked}
              onChange={this.props.onChange}
              margin={[0, 0]}
            />
            Selecionar todas
          </Text>
          <List type="ul" direction="horizontal">
            { this.props.enablePrint ?
              <Button styleButton="linkface" onClick={p.onPrint}>Imprimir</Button> :
              this.renderPopover('Imprimir')
            }

            { !this.props.enablePrint ?
              <Button
                styleButton="linkface"
                onClick={() => this.Modal.handleClick()}
              >Enviar</Button> :
              this.renderPopover('Enviar')
            }

          </List>
        </StyledInfo>


        {/* Modal Envio código */}
        <Modal ref={(modal) => { this.Modal = modal; }}>
          <Grid>
            <Grid className="row">
              <Grid col className="col-12">
                <Title type={1} statusColor="primary" >Enviar código de barras</Title>
                <Form onChange={() => this.checkErrors.bind(this)}>
                  <StyledList onClick={this.changePlaceholder}>
                    <FormRadio
                      items={[
                        { value: 'email', label: 'E-mail' },
                        { value: 'tel', label: 'SMS para celular Oi' },
                      ]}
                      name="opt-group"
                      value="email"
                      className="radio-group"
                    />
                  </StyledList>

                  <FormInput
                    id="email-modal-conta"
                    name="name-raio-input"
                    validationType={this.state.checkedDefault}
                    value={this.state.email}
                    onChange={this.handleEmail}
                    placeholder={this.state.placeholderModal}
                  />
                  <Captcha onChange={this.captchaCallback} />
                  <ButtonLoader disabled={isDisabled} type="button">Enviar</ButtonLoader>
                </Form>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </Wrapper>
    );
  }
}

HeaderListaConta.propTypes = {
  checked: PropTypes.bool,
  enablePrint: PropTypes.bool,
  onChange: PropTypes.func,
};

HeaderListaConta.defaultProps = {
  checked: false,
  enablePrint: false,
  onChange: function onChange(param) {
    return param;
  },
};

export { HeaderListaConta };
export default HeaderListaConta;
