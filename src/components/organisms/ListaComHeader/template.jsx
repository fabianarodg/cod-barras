import React, { Component } from "react"
import ReactDOM from "react-dom"
import {ThemeProvider} from "styled-components"

import Grid from './../../../components/atoms/Grid'
import Text from './../../../components/atoms/Text'
import Title from './../../../components/atoms/Title'
import Form, {FormRadio, FormCheck, FormInput, FormSelect} from './../../../components/molecules/Form'

class TemplateLista extends Component {
    constructor(props) {
        super(props);
	}
	
	showContent(content) {
		return content.map((item, index) => 
			<div key={index}>{item}</div>
		)
	}

    render() {
		let p = this.props
        return(        
			<Grid className='container'>
				<Grid className='row'>
					<Grid className='col-md-8'>{p.children}</Grid>
					<Grid className='col-md-4'>
						{this.showContent(p.content)}
					</Grid>
				</Grid>
			</Grid>
        )
    }
}

export { TemplateLista }
export default TemplateLista
