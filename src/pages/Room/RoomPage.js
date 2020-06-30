import React, { Component } from "react";
import Room from "../../components/Room/Room";
import { Flex, Spinner } from "@chakra-ui/core";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../components/Firebase/withFirebase";
import EnterNameForm from "../../components/EnterNameForm/EnterNameForm";

class RoomPage extends Component {
  state = {
    loading: false,
    playerName: this.props.firebase.currentPlayerName(
      this.props.match.params.roomId
    ),
    currentPlayerId: this.props.firebase.currentPlayerId(
      this.props.match.params.roomId
    ),
  };

  componentDidMount() {
    if (this.state.playerName) this.enterRoomHandler(this.state.playerName);
  }

  enterRoomHandler = playerName => {
    this.setState({ loading: true });
    this.props.firebase
      .joinRoom(this.props.match.params.roomId, playerName)
      .then(currentPlayerId => {
        this.setState({ currentPlayerId: currentPlayerId, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <Flex width="50px" m="200px auto" textAlign="center">
          <Spinner size="xl" color="white" />
        </Flex>
      );
    }
    if (this.state.currentPlayerId) {
      return (
        <Room
          roomId={this.props.match.params.roomId}
          currentPlayerId={this.state.currentPlayerId}
        />
      );
    } else {
      return <EnterNameForm onSubmit={this.enterRoomHandler} />;
    }
  }
}

export default withRouter(withFirebase(RoomPage));
