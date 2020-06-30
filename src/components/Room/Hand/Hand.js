import React from "react";
import { Flex, useTheme } from "@chakra-ui/core";
import Card from "./HandCard/HandCard";

const Hand = props => {
  const theme = useTheme();
  const cards = ["?", "1", "2", "3", "5", "8", "13"].map(value => (
    <Card
      key={value}
      selected={props.selectedValue === value}
      height="80px"
      value={value}
      onCardDrawn={props.onCardDrawn}
    />
  ));

  return (
    <Flex justifyContent="center">
      <Flex
        border={`4px solid ${theme.colors.pokerBlue[800]}`}
        backgroundColor={theme.colors.pokerBlue[600]}
        padding="15px 10px"
        borderRadius="5px"
      >
        {cards}
      </Flex>
    </Flex>
  );
};

export default Hand;
