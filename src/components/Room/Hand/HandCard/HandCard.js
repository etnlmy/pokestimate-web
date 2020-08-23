import React from "react";
import { PseudoBox, useTheme } from "@chakra-ui/core";

const HandCard = props => {
  const theme = useTheme();
  const height = 50;

  return (
    <PseudoBox
      onClick={() => props.onCardDrawn(props.selected ? "" : props.value)}
      cursor="pointer"
      _hover={{ transform: "scale(1.1)" }}
      transform={props.selected ? "scale(1.1)" : ""}
      margin="0 5px"
      textAlign="center"
      lineHeight={`${height}px`}
      fontSize={`${height / 2}px`}
      fontWeight="bold"
      color="pokerBlue.700"
      w={height * 0.75}
      h={height}
      backgroundColor="white"
      borderRadius="3px"
      boxShadow={`2px 2px ${theme.colors.pokerBlue[800]}`}
    >
      {props.value}
    </PseudoBox>
  );
};

export default HandCard;
