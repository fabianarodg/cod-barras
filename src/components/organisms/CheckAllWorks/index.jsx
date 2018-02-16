import React, {PureComponent as Component} from 'react';
import Checkbox from './item';

export default class Lista extends Component {
    constructor(props){
        super(props);
        this.state = {
            check: []
        }
        this.items = ['item', 'item', 'item', 'item', 'item'];
        this.handleChange = (index, value) => {
            let newcheck = [...this.state.check];
            newcheck[index] = value;
            this.setState({check: newcheck});
            console.log('handleChange',newcheck);
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
            newState.map((item, index) => newState[index] = result);
            this.setState({check: newState});
            console.log('changeAll',newState, result);
        }
        //ignore a parte de baixo
        this.populate = () => this.items.map((item, index) => {
            this.state.check[index] = false;
        })
        this.populate();
    }

    render() {
        return(
            <div>
                <Checkbox onChange={this.handleChangeAll} checked={this.lookAll()}>{this.lookAll().toString()}</Checkbox>
                <ul>
                {
                    this.items.map((item, index) => {
                        return <li><Checkbox onChange={() => this.handleChange(index, !this.state.check[index])} checked={this.state.check[index]}>{this.state.check[index].toString()}</Checkbox></li>
                    })
                }
                </ul>
            </div>
        );
    }
}