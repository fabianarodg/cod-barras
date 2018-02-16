import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import * as m from '../../styles/mixins';

// Component fixed styles
const StyledGrid = styled.div`
    border-radius: ${props => (props.corners ? `${m.setSizes(props.corners)}` : '1px')};
    margin: ${props => (props.margin ? `${m.setSizes(props.margin)}` : '')};
    padding: ${props => (props.padding ? `${m.setSizes(props.padding)}` : '')};
    box-shadow: ${props => (props.shadow ? `${m.setSizes(props.shadow)} rgba(204, 204, 204, 0.3)` : '0')};
    height: ${ifProp('height', prop('height'))};
    opacity: ${ifProp('opacity', prop('opacity'))};
    background: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}`};
    align-items: ${ifProp('align', prop('align'))};
    ${ifProp('centerItems', css`display: flex; align-items: center;`)}
`;

// Component core
const Grid = props => (
  <StyledGrid {...props}>{props.children}</StyledGrid>
);

// Component Props
Grid.propTypes = {
  statusColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'link']),
  align: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']),
  corners: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  shadow: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  centerItems: PropTypes.bool,
  reverse: PropTypes.bool,
  full: PropTypes.bool,
  height: PropTypes.number,
  opacity: PropTypes.number,
  bg: PropTypes.string,
  children: PropTypes.string,
};

Grid.defaultProps = {
  align: 'flex-start',
  statusColor: 'transparent',
  corners: 0,
  margin: 15,
  padding: 15,
  shadow: 0,
  centerItems: false,
  reverse: false,
  full: false,
  height: 0,
  opacity: 1,
  bg: '#FFF',
  children: '',
};
export default Grid;
export { Grid };
