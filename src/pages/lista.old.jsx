import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Title } from './../components/atoms/Title';
import { Text } from './../components/atoms/Text';
import { ListaConta } from './../components/organisms/ListaConta';
import { incrementIfOdd } from '../actions';

class PageLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClickIncrementar = () => {
    const props = this.props;
    props.incrementIfOdd();
  }

  render() {
    const props = this.props;
    return (
      <div id="principal">
        <Title>Título Correto</Title>
        <Text>Texto correto</Text>
        <ListaConta
          produto={{
            terminais: [
              {
                id: 3,
                terminal: '35*****0197',
                faturas: [
                  {
                    data: '2017-11-01',
                    valor: 218.75,
                    dacc: false,
                    codigoDeBarras: '84690000002-3  18750113232-3  42168450844-1  09067500000-5',
                    tem14Meses: true,
                  },
                  {
                    data: '2018-01-02',
                    valor: 209.88,
                    dacc: false,
                    codigoDeBarras: '84680000002-4  09880113232-9  42168450860-7  27423400000-9',
                    tem14Meses: false,
                  },
                  {
                    data: '2018-02-06',
                    valor: 19.25,
                    dacc: false,
                    codigoDeBarras: '84620000000-4  19250113232-3  42168450876-3  91977400000-5',
                    tem14Meses: false,
                  },
                ],
              },
              {
                id: 4,
                terminal: '35****8666',
                faturas: [
                  {
                    data: '2017-12-02',
                    valor: 218.75,
                    dacc: false,
                    codigoDeBarras: '84690000002-3  18750113232-3  42168450844-1  09067500000-5',
                    tem14Meses: false,
                  },
                  {
                    data: '2018-01-02',
                    valor: 209.88,
                    dacc: false,
                    codigoDeBarras: '84680000002-4  09880113232-9  42168450860-7  27423400000-9',
                    tem14Meses: false,
                  },
                  {
                    data: '2018-02-02',
                    valor: 19.25,
                    dacc: false,
                    codigoDeBarras: '84620000000-4  19250113232-3  42168450876-3  91977400000-5',
                    tem14Meses: false,
                  },
                ],
              },
              {
                id: 5,
                terminal: '35****3927',
                faturas: [
                  {
                    data: '2017-12-02',
                    valor: 218.75,
                    dacc: false,
                    codigoDeBarras: '84690000002-3  18750113232-3  42168450844-1  09067500000-5',
                    tem14Meses: false,
                  },
                  {
                    data: '2018-01-02',
                    valor: 209.88,
                    dacc: false,
                    codigoDeBarras: '84680000002-4  09880113232-9  42168450860-7  27423400000-9',
                    tem14Meses: false,
                  },
                  {
                    data: '2018-02-02',
                    valor: 19.25,
                    dacc: false,
                    codigoDeBarras: '84620000000-4  19250113232-3  42168450876-3  91977400000-5',
                    tem14Meses: false,
                  },
                ],
              },
            ],
          }}
        />
        <label htmlFor="principal">{props.example.count}</label>
      </div>
    );
  }
}


const mapStateToProps = state => ({ example: state.example });
const mapDispatchToProps = dispatch => bindActionCreators({
  incrementIfOdd,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageLista);
