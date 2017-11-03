import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Field, reduxForm} from 'redux-form'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import validate from "./validate";

class SignIn extends Component {

  renderInput = ({input, meta: {touched, error}, ...props}) => {
    return (
      <div className="sign-in-form__group">
        <input className="sign-in-form__input" {...props} {...input} />
        {
          touched && error &&
          <div className="sign-in-form__error">
            {error}
          </div>
        }
      </div>
    )
  };

  submit = () => {

  };

  render() {
    const {renderInput, submit} = this;
    const {handleSubmit, submitting} = this.props;
    return (
      <div className="sign-in">
        <form
          onSubmit={handleSubmit(submit)}
          method="post"
          className="sign-in-form"
        >
          <Field
            name="login"
            type="text"
            placeholder="Please enter your login"
            component={renderInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Please enter your password"
            component={renderInput}
          />
          <input
            type="submit"
            value="Подтвердить"
            disabled={submitting}
            className="sign-in-form__submit"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({}
);


const mapDispatchToProps = (dispatch) => ({}
);

export default reduxForm({
  form: "sign-in",
  validate
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));
