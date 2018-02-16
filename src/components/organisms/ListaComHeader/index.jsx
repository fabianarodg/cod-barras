import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

import Grid from '../../atoms/Grid'
import Text from '../../atoms/Text'
import Title from '../../atoms/Title'
import Alert from '../../molecules/Alert'
import HeaderListaConta from './../HeaderListaConta'
import ItemConta from './../ListaConta/itemConta'
import CodBarra from './../../../assets/images/barras.png'
import * as m from './../../styles/mixins'
import PrintList from './printList'

const StyledUl = styled.ul `
  padding:0;
`

class ListaComHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            check: [],
            enablePrint: false
        }

        this.items = this.props.contas.contas;
        this.handleChange = (index, value) => {
            let newcheck = [...this.state.check];
            newcheck[index] = value;
            let enPrint = this.enablePrint(newcheck);
            this.setState({check: newcheck, enablePrint: enPrint});
            
            console.log('handleChange',enPrint);
            
        }

        this.enablePrint = (items) => {
            let val = false
            for(let i = 0; i < items.length; i++) {
                if(items[i]) val = true
            }
            return val
        }

        this.lookAll = () => {
            let result = this.state.check.every((item) => item);
            return result;
        }

        this.handleChangeAll = () => {
            this.changeAll(!this.lookAll());
        }

        this.changeAll = () => {
            let newState = [...this.state.check];
            let result = !this.lookAll();
            let enPrint = this.enablePrint(result);
            newState.map((item, index) => newState[index] = result);
            this.setState({check: newState, enablePrint: result});
            console.log('changeAll',newState, result);
        }
        
        //inicializa array de checkbox com false
        this.populate = () => this.items.map((item, index) => {
            this.state.check[index] = false;
        })
        
        this.populate()
    }
   
    showAlert(showAlert) {
		if(showAlert)
			return (
				<Alert
                	status='info'
					title='Atenção: Produto com conta em débito automático'
					className="margin-alert"
                	margin={[18, 0,0,0]}>
						A conta a vencer terá o pagamento realizado automaticamente em sua conta corrente
						na data do vencimento. Caso tenha algum dúvida entre em contato com seu banco.
                </Alert>
			)
    }
    
    render() {
        let p = this.props
        return(
			<div>
                <HeaderListaConta 
                    onChange={this.handleChangeAll}
                    onPrint={() => window.print()} 
                    checked={this.lookAll()} enablePrint={this.state.enablePrint} />
                    <Grid statusColor={'light'}>
						<Grid className='container'>
							<Grid className='col-12'>
							<Text type="span"> Nº do Produto </Text>
							<Title fontSize={3}>{p.contas.numTel}</Title>
							{this.showAlert(p.contas.dacc)}
							</Grid>
						</Grid>
					</Grid>
                    <Grid className='container'>
                <StyledUl>
                    {
                        this.items.map((item, index) => {
                            if (this.state.check[index])
                            return <div >
                                <ItemConta
                                key={index}
                                onChange={() => this.handleChange(index, !this.state.check[index])}
                                idCheck={item.idCheck}
                                valorConta={item.valorConta}
                                codBarras={item.codBarras}
                                dataConta={item.dataConta}
                                blockConta={item.blockConta}
                                imgCodBarras={item.imgCodBarras}
                                checked={this.state.check[index]}
                            />
                            <PrintList
                                valorConta={item.valorConta}
                                dataConta={item.dataConta}
                                imgCodBarras={item.imgCodBarras}
                                numTel={"(21) 98666-3344"}
                            />
                            </div>
                            else return <ItemConta
                                key={index}
                                onChange={() => this.handleChange(index, !this.state.check[index])}
                                idCheck={item.idCheck}
                                valorConta={item.valorConta}
                                codBarras={item.codBarras}
                                dataConta={item.dataConta}
                                blockConta={item.blockConta}
                                imgCodBarras={item.imgCodBarras}
                                checked={this.state.check[index]}
                            />

                        })
                    }
                </StyledUl>
                </Grid>
            </div>
        )
    }
}

export { ListaComHeader }
export default ListaComHeader
