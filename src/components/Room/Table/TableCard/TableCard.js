import React from "react";
import { Box, useTheme } from "@chakra-ui/core";
import { CSSTransition } from "react-transition-group";

const TableCard = props => {
  const theme = useTheme();
  const boxShadow = `2px 2px ${theme.colors.pokerGreen[600]}`;

  return (
    <CSSTransition
      in={props.visible}
      timeout={600}
      classNames="table-card"
      unmountOnExit
    >
      <Box
        className="scene"
        w={`${props.height * 0.75}px`}
        h={`${props.height}px`}
        top={props.top - props.height / 2}
        right={props.right - (props.height * 0.75) / 2}
        position="absolute"
      >
        <Box
          className={`table-card ${props.reveal ? "is-flipped" : ""}`}
          w="100%"
          h="100%"
          position="relative"
        >
          <Box
            className="table-card__face table-card__face--front"
            w="100%"
            h="100%"
            backgroundColor="pokerGreen.400"
            borderRadius="3px"
            boxShadow={boxShadow}
          ></Box>
          <Box
            className="table-card__face table-card__face--back"
            w="100%"
            h="100%"
            backgroundColor="white"
            borderRadius="3px"
            boxShadow={boxShadow}
            textAlign="center"
            lineHeight={`${props.height}px`}
            fontSize={`${props.height / 2}px`}
            fontWeight="bold"
            color="pokerBlue.700"
          >
            {props.value}
          </Box>
        </Box>
      </Box>
    </CSSTransition>
  );
};

export default TableCard;
