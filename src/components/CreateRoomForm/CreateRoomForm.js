import React, { Component, Fragment } from "react";
import { Button, Box, Input, Flex, Heading } from "@chakra-ui/core";
import { withFirebase } from "../../components/Firebase/withFirebase";
import { withRouter } from "react-router-dom";

class CreateRoomForm extends Component {
  state = {
    name: "",
    isLoading: false,
  };

  nameChangedHandler = event => {
    this.setState({
      name: event.target.value,
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.firebase.createRoom(this.state.name).then(roomId => {
      this.props.firebase.savePlayerNameLocally(roomId, this.state.name);
      this.props.history.push("/" + roomId);
    });
  };

  render() {
    return (
      <Fragment>
        <Box
          width="50%"
          m="auto"
          p="40px"
          backgroundColor="white"
          borderRadius="5px"
          boxShadow="4px 5px #192633"
        >
          <Heading as="h1" mb="20px" color="pokerGray">
            Create a Room
          </Heading>
          <Flex as="form" onSubmit={this.submitHandler}>
            <Input
              mr="5px"
              type="text"
              placeholder="Your Name"
              value={this.state.name}
              onChange={this.nameChangedHandler}
            ></Input>
            <Button
              type="submit"
              variantColor="pokerGreen"
              variant="solid"
              isDisabled={this.state.name.length === 0}
              isLoading={this.state.isLoading}
            >
              Go
            </Button>
          </Flex>
        </Box>
      </Fragment>
    );
  }
}

export default withRouter(withFirebase(CreateRoomForm));
