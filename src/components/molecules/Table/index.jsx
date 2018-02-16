import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, extend } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';
import * as m from '../../styles/mixins';

const StyledTable = styled.table`
    min-width: 100px;
    border-radius: 3px; 
    border: 1px solid #dbdbdb;
    margin: 5px;
    border-spacing: 0;
    & thead {
        margin: 0;
        & th {
            border-bottom: 1px solid #dbdbdb;
            &:not(:first-child) {
                border-left: 1px solid #dbdbdb;
            }
        }
    }

    & tbody {
        margin: 0;
        & tr:not(:last-child) {
            td {
                border-bottom: 1px solid #dbdbdb;
            }
        }
        & td {
            &:not(:first-child) {
                border-left: 1px solid #dbdbdb;
            }
        }
    }
`;

class Table extends Component {
  constructor(props) {
    super(props);

    this.generateHeaders = this.generateHeaders.bind(this);
    this.generateRows = this.generateRows.bind(this);
    this.state = {};
  }

  generateHeaders(headers) {
    if (headers) {
      const h = headers;
      return (<thead>{
                h.map(colData => <th key={colData.key}> {colData.label} </th>)}
              </thead>);
    }
  }

  generateRows(props) {
    let cols = props.headers, // [{key, label}]
      data = props.rows;
    if (props.rows) {
      return (<tbody>{
                data.map((item) => {
                // handle the column data within each row
                const cells = cols.map(colData =>
                    // colData.key might be "valorConta"
                     (
                       <td> {item[colData.key] ? item[colData.key] : <br />} </td>
                    ));
                return <tr key={item.id}> {cells} </tr>;
            })}
      </tbody>);
    }

    return <tbody>{props.noResults}</tbody>;
  }

  render() {
    const p = this.props;
    const headerComponents = this.generateHeaders(p.headers);
    const rowComponents = this.generateRows(p);

    return (
      <StyledTable>
        {headerComponents}
        {rowComponents}
      </StyledTable>
    );
  }
}

Table.PropTypes = {
  headers: PropTypes.array,
  rows: PropTypes.array.isRequired,
  noResults: PropTypes.string,

};

Table.defaultProps = {
  noResults: 'Sem dados a exibir',
};

export { Table };

export default Table;
