import React from "react";
import { Box, useTheme } from "@chakra-ui/core";

const TableCard = props => {
  const theme = useTheme();
  const backgroundColor = props.value ? "white" : "pokerGreen.400";
  var card = null;
  if (!props.hide) {
    card = (
      <Box
        textAlign="center"
        lineHeight={`${props.height}px`}
        fontSize={`${props.height / 2}px`}
        position="absolute"
        fontWeight="bold"
        color="pokerBlue.700"
        w={`${props.height * 0.75}px`}
        h={`${props.height}px`}
        backgroundColor={backgroundColor}
        top={props.top - props.height / 2}
        right={props.right - (props.height * 0.75) / 2}
        borderRadius="3px"
        boxShadow={`2px 2px ${theme.colors.pokerGreen[600]}`}
      >
        {props.value}
      </Box>
    );
  }
  return card;
};

export default TableCard;
