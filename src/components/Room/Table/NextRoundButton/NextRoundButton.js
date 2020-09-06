import React from "react";
import { Button, useTheme } from "@chakra-ui/core";
import { CSSTransition } from "react-transition-group";

const NextRoundButton = props => {
  const theme = useTheme();

  return (
    <CSSTransition
      in={props.visible}
      timeout={1300}
      classNames="next-round"
      unmountOnExit
    >
      <Button
        onClick={props.onNextRound}
        size="lg"
        fontWeight="bold"
        color="pokerBlue.700"
        boxShadow={`3px 3px ${theme.colors.pokerGreen[600]}`}
        _hover={{ boxShadow: `1px 1px ${theme.colors.pokerGreen[600]}` }}
      >
        Next round!
      </Button>
    </CSSTransition>
  );
};

export default NextRoundButton;
