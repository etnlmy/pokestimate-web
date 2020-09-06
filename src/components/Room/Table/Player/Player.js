import React from "react";
import { Avatar, AvatarBadge, useTheme } from "@chakra-ui/core";

const Player = props => {
  const theme = useTheme();
  const borderColor = theme.colors.pokerBlue[600];

  var badge = null;
  if (props.status) {
    const color = props.status === "ready" ? "pokerGreen.500" : "orange.500";
    badge = <AvatarBadge borderColor={borderColor} bg={color} size="1em" />;
  }

  return (
    <Avatar
      className="player"
      size="lg"
      position="absolute"
      top={props.top - 32}
      right={props.right - 32}
      name={props.name}
      border={`4px solid ${borderColor}`}
      borderRadius="200px"
      boxShadow={`3px 3px ${theme.colors.pokerBlue[800]}`}
    >
      {badge}
    </Avatar>
  );
};

export default Player;
