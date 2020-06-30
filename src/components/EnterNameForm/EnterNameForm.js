import React, { Component, Fragment } from "react";
import { Flex, Input, Button, Box, Heading } from "@chakra-ui/core";

class EnterNameForm extends Component {
  state = {
    name: "",
    isLoading: false,
  };

  nameChangedHandler = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <Box
          width="50%"
          m="80px auto"
          p="40px"
          backgroundColor="white"
          borderRadius="5px"
          boxShadow="4px 5px #192633"
        >
          <Heading as="h1" mb="20px" color="pokerGray">
            Join Room
          </Heading>
          <Flex as="form" onSubmit={() => this.props.onSubmit(this.state.name)}>
            <Input
              mr="5px"
              type="text"
              placeholder="Your Name"
              value={this.state.name}
              onChange={this.nameChangedHandler}
            ></Input>
            <Button
              variantColor="pokerGreen"
              variant="solid"
              type="submit"
              isDisabled={this.state.name.length === 0}
              isLoading={this.state.isLoading}
            >
              Join Room
            </Button>
          </Flex>
        </Box>
      </Fragment>
    );
  }
}

export default EnterNameForm;
