import React, { Component } from "react";
import { Flex, Box, Spinner } from "@chakra-ui/core";
import Table from "./Table/Table";
import Hand from "./Hand/Hand";
import { withFirebase } from "../Firebase/withFirebase";

class Room extends Component {
  state = {
    loading: true,
    players: [],
    phase: "voting",
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.subscribeToRoom(this.props.roomId, data => {
      this.setState({ loading: false, ...data }, this.setPhase);
    });
  }

  componentWillUnmount() {
    this.props.firebase.unsubscribeFromRoom(this.props.roomId);
  }

  setPhase = () => {
    const atLeastOnePlayerHasNotVoted = this.state.players.find(
      player => player.card === ""
    );
    const phase = atLeastOnePlayerHasNotVoted ? "voting" : "reveal";
    this.setState({ phase: phase });
  };

  nextRoundHandler = () => {
    this.props.firebase.startVotingPhase(this.props.roomId);
  };

  cardDrawnHandler = cardValue => {
    this.props.firebase.updateCard(this.props.roomId, cardValue);
  };

  render() {
    if (this.state.loading) {
      return (
        <Flex width="50px" m="200px auto" textAlign="center">
          <Spinner size="xl" color="white" />
        </Flex>
      );
    } else {
      const currentPlayer = this.state.players.find(
        player => player.id === this.props.currentPlayerId
      );
      const hand = (
        <Hand
          show="false"
          onCardDrawn={this.cardDrawnHandler}
          selectedValue={currentPlayer.card}
        />
      );
      return (
        <Flex flexDirection="column">
          <Box width="100%" p="100px">
            <Table
              onNextRound={this.nextRoundHandler}
              phase={this.state.phase}
              currentPlayerId={this.props.currentPlayerId}
              players={this.state.players}
              width={700}
              height={400}
              border={15}
              m="auto"
            />
          </Box>
          {this.state.phase === "voting" ? hand : null}
        </Flex>
      );
    }
  }
}

export default withFirebase(Room);
