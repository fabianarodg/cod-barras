import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormInput } from './form.input';
import { FormSelect } from './form.select';
import { FormRadio } from './form.radio';
import { FormCheck } from './form.check';


const FormWrapper = styled.form`
    padding: 0;
`;


class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const p = this.props;
    return (
      <FormWrapper
        {...p}
        onSubmit={this.handleSubmit}
      >
        {p.children}
      </FormWrapper>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: PropTypes.func,
};

export { FormInput, FormSelect, FormRadio, FormCheck };
export default Form;
