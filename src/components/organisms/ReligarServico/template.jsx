import React, { Component } from 'react';

import { Grid } from './../../../components/atoms/Grid';

class TemplateReligar extends Component {
  showContent = (content) => {
    return content.map((item, index) =>
      <div key={index}>{item}</div>);
  };

  render() {
    const p = this.props;
    return (
      <Grid className="container">
        <Grid className="row">
          <Grid className="col-md-8">{p.children}</Grid>
          <Grid className="col-md-4">
            {this.showContent(p.content)}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export { TemplateReligar };
export default TemplateReligar;
