import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.fetchStream(id);
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    console.log(this.videoRef);

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    if (!this.props.stream)
      return (
        <div>
          Loading
          <video ref={this.videoRef} style={{ width: "100%" }} controls />
        </div>
      );

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{this.props.stream.title}</h1>
        <h5>{this.props.stream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
