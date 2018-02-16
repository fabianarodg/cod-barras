import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';

import * as m from '../../styles/mixins';

// Component Styles
const typeList = (props) => {
  let tList;
  switch (props.type) {
    case 'ol':
      tList = (<ol {...props}>{
        props.children.map(item => (<li>{item}</li>))
      }</ol>);
      break;
    default:
    case 'ul':
      tList = (<ul {...props}>{
        props.children.map(item => (<li>{item}</li>))
      }</ul>);
      break;
  }
  return tList;
};

const styles = css`
   margin: 0;
   padding: 0;
`;

const StyledList = styled(typeList)`
    ${styles}
    ${switchProp('type', {
    ul: css`
            list-style-type: none;
    `,
    ol: css`
            list-style-type: decimal;
    `,
  })}
    & li {
        ${switchProp('direction', {
    vertical: css`
                margin: ${props => (props.margin ? `${m.setSizes(props.margin)}` : '12px 5px')};
                display:block;`,
    horizontal: css`
            margin: ${props => (props.margin ? `${m.setSizes(props.margin)}` : '5px 12px')};
            display: inline-block;`,
  })}
    }
  `;

// Component Core
const List = props => (
  <StyledList {...props} />
);


// Component Props
List.propTypes = {
  type: PropTypes.oneOf(['ul', 'ol']),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};

List.defaultProps = {
  type: 'ul',
  direction: 'vertical',
  margin: 0,
  padding: 0,
};

export { List };
export default List;
