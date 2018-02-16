import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

import Button from './../../atoms/Button'
import Grid from './../../atoms/Grid'
import Img from './../../atoms/Img'
import Text from './../../atoms/Text'
import Title from './../../atoms/Title'
import logoCinza from './../../../assets/images/logo-oi-cinza.png'
import * as m from './../../styles/mixins'

const HeaderPrint = styled.div`
    display: flex;
    flex-direction: row;
    img {
        width: 84px;
        height: 70px;
    }
`

const LinePrint = styled(Grid)`
    border-top: 1px solid #222222;
    margin-top: 30px;
    padding: 15px;
    img {
        margin: 0 auto;
        width: 90%;
    }
`


const printdiv = (printpage) =>
{
    var headstr = "<html><head>Có</head><body>";
    var footstr = "</body>";
    var newstr = document.all.item(printpage).innerHTML;
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr+newstr+footstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
}

const PrintList = props =>{
    return (
            <Grid className='container printable'>
                <Grid className='row'>
                    <Grid className='col-12'>
                        <HeaderPrint>
                            <Img src={logoCinza} />
                            <Grid className='row'>
                                <Grid className='col-12'>
                                    <Title fontSize={4}>Código de barras</Title>
                                    <Text type='p' margin={0}>Informações de pagamento para: </Text>
                                    <Text type='span' fontSize={2} fontWeight="Medium">{m.hidePhone(props.numTel)}</Text>
                                </Grid>
                            </Grid>
                        </HeaderPrint>
                    </Grid>
                </Grid>
                <LinePrint className='row' centerItems>
                    <Grid className='col-5'>
                        <Text type='p' fontSize={2} margin={0}>Informações de pagamento para: </Text>
                        <Text type='span' fontSize={5} fontWeight="Medium">R$ {props.valorConta}</Text>
                    </Grid>
                    <Grid className='col-7'>
                        <Text type='p' fontSize={2} margin={0}>Data de vencimento: </Text>
                        <Text type='span' fontSize={4} fontWeight="Medium">{props.dataConta}</Text>
                    </Grid>
                </LinePrint>
                <LinePrint className='row' centerItems>
                    <Grid className='col-12'>
                        <Text type='p' fontSize={2} margin={0} fontWeight="Medium">Débito automático </Text>
                        <Text type='span' fontSize={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis tortor ac ligula venenatis blandit. Sed varius diam at nisl mattis consectetur. Integer hendrerit nulla tellus, ut posuere metus pellentesque et. Aenean gravida iaculis elit, non sollicitudin arcu dignissim ac. Fusce aliquam mauris id lectus facilisis condimentum. </Text>
                    </Grid>
                    <Grid className='col-12' margin={[30,15]}>
                        <Text type='p' fontSize={2} margin={0} fontWeight="Medium">Aproveite e ative sua Conta Online </Text>
                        <Text type='span' fontSize={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis tortor ac ligula venenatis blandit. Sed varius diam at nisl mattis consectetur. Integer hendrerit nulla tellus, ut posuere metus pellentesque et. Aenean gravida iaculis elit, non sollicitudin arcu dignissim ac. Fusce aliquam mauris id lectus facilisis condimentum. </Text>
                    </Grid>
                </LinePrint>
                <LinePrint className='row' centerItems>
                    <Img src={props.imgCodBarras} />
                </LinePrint>
            </Grid>)
}

export {PrintList}
export default PrintList