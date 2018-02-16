import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled, { css,extend } from 'styled-components'
import { prop, ifProp, switchProp } from 'styled-tools'
import ReCAPTCHA from 'react-google-recaptcha'

import Grid from '../../atoms/Grid'
import List from '../../atoms/List'
import Text from '../../atoms/Text'
import Title from '../../atoms/Title'
import Icon from '../../atoms/Icon'

import Popover, {PopContent} from '../../molecules/Popover'
import Button from '../../atoms/Button'
import Modal from '../../molecules/Modal'
import ButtonLoader from '../../molecules/ButtonLoader'
import Form, {FormRadio, FormCheck, FormInput} from '../../molecules/Form'

const StyledInfo = styled(Grid) `
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 10px;
	margin: 30px 0 50px 0;
`
const StyledList = styled.div `
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
`
const StyledFormRadio = styled(FormRadio)`
	display: flex;
	align-items: center;
`
const StyledButtonLoader = styled(ButtonLoader)`
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`

class HeaderListaConta extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
		active: null,
		checked: false,
		disable: false,
		placeholderModal: 'Informe o e-mail',
		checkedDefault: 'email',
		email: '',
		errors: true
    }
	}

  handleClick(i){
    return (e) => {
			let active = this.state.active === i ? null : i
      this.setState({active: active})
    }
  }
  selectAllChecks() {
		this.setState({checked: !this.state.checked});
  }
  changePlaceholder(e) {
		let pla = this.state.placeholderModal
		if(e.target.value == 'email'){
			pla = 'Informe o e-mail'
		}else{
			pla = 'Informe o número do celular Oi com DDD'
      }
		this.setState({placeholderModal: pla, checkedDefault: e.target.value, email: ''})
  }

	handleEmail(e){
		this.setState({ email: e.target.value })
	}

	handleSubmit(e) {
		if (e) {
		e.preventDefault();
		return;

		}
		const { email } = this.state;
		alert(`Signed up with email: ${email}`);
		e.preventDefault();
	}

	checkErrors() {
		if(this.state.email)
			this.setState({errors: false})
		else
			this.setState({errors: true})
	}

	renderPopover(labelButton) {
		return (
			<Popover>
				<Button styleButton="linkface" >{labelButton}</Button>
				<PopContent>
					<Text>Selecione pelo menos uma das contas
					abaixo para realizar essa ação.
					</Text>
				</PopContent>
			</Popover>
		)
	}

	

  	render() {
	  	let p = this.props
			let isDisabled = this.state.errors;
		return (
      <Grid className='container'>
        <StyledInfo >
          <Text type="span">
            <FormCheck
							id="select-conta"
							name="selecionar-conta"
							label='Selecionar todas'
							checked={this.props.checked}
							onChange={this.props.onChange}
							margin={[0, 0]} />
          </Text>
          <List type="ul" direction='horizontal'>
			{ this.props.enablePrint ?
				<Button styleButton="linkface" onClick={p.onPrint}>Imprimir</Button> :
				this.renderPopover('Imprimir')
			}

			{ this.props.enablePrint ?
				 <Button styleButton="linkface"
				 onClick={() => this.Modal.handleClick()}>Enviar</Button> : 
				this.renderPopover('Enviar') 
			}
           
          </List>
        </StyledInfo>


		{/* Modal Envio código */}
        <Modal ref={(modal) => { this.Modal = modal; }}>
			<Grid className='container'>
				<Grid className='row'>
					<Grid col className="col-12">
						<Title type={1} statusColor='primary' >Enviar código de barras</Title>
						<Form onChange={() => this.checkErrors.bind(this)}>
						<StyledList onClick={this.changePlaceholder.bind(this)}>
						<FormRadio
							items={[
								{ value: "email", label: "E-mail" },
								{ value: "tel", label: "SMS para celular Oi" }
							]}
							name="opt-group" value="email" className="radio-group" />
						</StyledList>

						<FormInput
							id='email-modal-conta'
							name="name-raio-input"
							validationType={this.state.checkedDefault}
							value={this.state.email}
							onChange={this.handleEmail.bind(this)}
							placeholder={this.state.placeholderModal} />
						<ReCAPTCHA
							ref="recaptcha"
							sitekey="6LfJ5UAUAAAAABkdOADMno6tj9BKYOBLBGkzdGuT"
							onChange={() => this.setState({errors: false})}
						/>
						<StyledButtonLoader disabled={isDisabled} type="button">Enviar</StyledButtonLoader>
						</Form>
					</Grid>
				</Grid>
			</Grid>
        </Modal>
      </Grid>
    )
  }
}

export { HeaderListaConta }
export default HeaderListaConta
