import { css } from 'styled-components';
import { switchProp } from 'styled-tools';

import * as m from '../../styles/mixins';


const buttonThemes = css`
  ${switchProp('styleButton', {
    button: css`
      background: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}`};
      &:hover {
        background-color: ${props => props.bg && `${m.lightenColor(0.226, props.bg)}`};/*#eb1e87;*/
        transition: all 0.2s ease-out;
      }
      &:active{
        background: ${props => props.bg && `${m.darkenColor(0.027, props.bg)}`};/*#c32075;*/
      }
      &:disabled{
        background: rgba(216, 36, 130, 0.5);
      }
    `,
    outline: css`
      border-color: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}`};
      color: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}`};
      padding: 16px;
      border: solid 2px;

      &:hover {
        border-color: #eb1e87;
        padding: 14px;
        border: solid 4px;
        color: #eb1e87;
      }

      &:active{
        border-color: #c32075;
        color: #c32075;  
        padding: 16px;
        border: solid 2px;           
      }

      &:disabled{
        border-color: rgba(216, 36, 130, 0.5);
        border: solid 2px;
      }
    `,
    linkface: css`
      color: ${props => props.statusColor && `${m.checkTheme(props.statusColor, props)}`};
      padding: 0;
      width: auto;
      &:hover {
        color: #eb1e87;
      }

      &:active{
        color: #c32075;         
      }

      &:disabled{
        color: rgba(216, 36, 130, 0.5);
      }
    `,
  })}
  `;

export default buttonThemes;
