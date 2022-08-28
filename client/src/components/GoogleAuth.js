import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  onSignOutClick = () => {
    this.props.signOut();
  };

  onSignInClick = () => {
    this.props.signIn();
  };

  renderAuthButton() {
    if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui blue google button">
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
