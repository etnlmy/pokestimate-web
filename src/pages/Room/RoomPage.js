import React, { Component } from "react";
import Room from "../../components/Room/Room";
import { Flex, Spinner, Text } from "@chakra-ui/core";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../components/Firebase/withFirebase";
import EnterNameForm from "../../components/EnterNameForm/EnterNameForm";

class RoomPage extends Component {
  state = {
    loading: false,
    roomDoesNotExist: false,
    playerName: this.props.firebase.currentPlayerName(
      this.props.match.params.roomId
    ),
    currentPlayerId: this.props.firebase.currentPlayerId(
      this.props.match.params.roomId
    ),
  };

  componentDidMount() {
    this.checkIfRoomExists();
    if (this.state.playerName) this.enterRoomHandler(this.state.playerName);
  }

  checkIfRoomExists = () => {
    this.setState({ loading: true });
    this.props.firebase
      .doesRoomExist(this.props.match.params.roomId)
      .then(exists =>
        this.setState({ roomDoesNotExist: !exists, loading: false })
      );
  };

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
        <Flex width="50px" m="200px auto">
          <Spinner size="xl" color="white" />
        </Flex>
      );
    }
    if (this.state.roomDoesNotExist) {
      return (
        <Flex width="80%" m="200px auto" justifyContent="center">
          <Text fontSize="2xl" color="white" fontWeight="bold">
            this room does not exist, sorry
          </Text>
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
