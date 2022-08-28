import React from "react";
import { Field, formValues, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = (formValues) => {
    const className = `field ${
      formValues.meta.error && formValues.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formValues.label}</label>
        <input {...formValues.input} autoComplete="off" />
        {this.renderError(formValues.meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// 验证 form 输入是否正确
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) errors.title = "You must enter a title ";

  if (!formValues.description)
    errors.description = "You must enter a description";

  return errors;
};

// 将redux-form 与 StreamForm 相连接
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
