import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, extend } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';


import * as m from './../../styles/mixins';

export const StyledItem = styled.li`
    list-style:none;
    border-bottom: 1px solid #4a4a4a;

    &.blocked {
        border-left: 4px solid #D82482;
        border-radius: 2px;
    }

    & .row {
        padding: 30px 10px;
    }

    & .div-flex {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap:wrap;
    }
    & .span-column {
        display: flex;
        flex-flow:column;
        margin-left:40px;
    }

    & .align-center {
        text-align: center;
    }

    & .content-codbarras {
        display: flex;
        flex-flow:column;
        align-items: center;
        & img {
            width: 100%;
            margin: 0;
        }
    }
    & a.link-lista {
        font-weight: bold;
        align-self:flex-end;
    }
`;
