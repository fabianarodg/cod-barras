import React from 'react';

const Item = props => <label><input type="checkbox" checked={props.checked} onChange={props.onChange} />{props.children}</label>;

export default Item;
