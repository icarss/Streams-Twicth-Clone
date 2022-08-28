import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../history";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderStream() {
    if (!this.props.stream) return "Loading";

    return `Are you sure you want to delete this stream: ${this.props.stream.title}`;
  }

  renderActions() {
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button primary"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        // parent component 向 child component 可以传递 value 与 functions
        // 下面传递的是 functions
        content={this.renderStream()}
        actions={this.renderActions()}
        // 下面传递的是 callback function, 来接受 child component 传给 parent child 的值
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
