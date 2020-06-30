import React from "react";
import { Box, Button, useTheme } from "@chakra-ui/core";
import Player from "./Player/Player";
import Card from "../Table/TableCard/TableCard";

const Table = props => {
  const theme = useTheme();
  const currentPlayer = props.players.find(
    player => player.id === props.currentPlayerId
  );
  const players = props.players
    .map(player => {
      return { id: player.id, name: player.name, card: player.card };
    })
    .filter(player => player.id !== currentPlayer.id);
  players.unshift(currentPlayer);

  const tableGeometry = {
    centerX: -props.border + props.width / 2,
    centerY: -props.border + props.height / 2,
    width: props.width,
    height: props.height,
  };

  players.forEach((player, idx) => {
    const radiusForAvatar = tableGeometry.height / 2 + 3.5 * props.border;
    const radiusForCard = tableGeometry.height / 2 - 3.5 * props.border;
    player["avatarCoordinates"] = getCoordinatesAroundTable(
      tableGeometry,
      idx,
      players.length,
      radiusForAvatar
    );
    player["cardCoordinates"] = getCoordinatesAroundTable(
      tableGeometry,
      idx,
      players.length,
      radiusForCard
    );
  });

  const playersComponents = players.map(player => (
    <div key={player.id}>
      <Player
        name={player.name}
        status={player.card ? "ready" : "voting"}
        top={player.avatarCoordinates.y}
        right={player.avatarCoordinates.x}
      />
      <Card
        hide={!player.card}
        value={props.phase === "reveal" ? player.card : null}
        height={40}
        top={player.cardCoordinates.y}
        right={player.cardCoordinates.x}
      />
    </div>
  ));

  const nextRoundButton = (
    <Button
      position="absolute"
      onClick={props.onNextRound}
      size="lg"
      top="50%"
      left="50%"
      fontWeight="bold"
      transform="translate(-50%, -50%);"
      color="pokerBlue.700"
      boxShadow={`3px 3px ${theme.colors.pokerGreen[600]}`}
      _hover={{ boxShadow: `1px 1px ${theme.colors.pokerGreen[600]}` }}
    >
      Next round!
    </Button>
  );

  return (
    <Box
      m="auto"
      w={props.width}
      h={props.height}
      backgroundColor="pokerGreen.500"
      border={`${props.border}px solid ${theme.colors.pokerGreen[400]}`}
      borderRadius="200px"
      boxShadow={`4px 5px ${theme.colors.pokerBlue[800]}, inset 3px 5px 0px 1px ${theme.colors.pokerGreen[600]}`}
      position="relative"
    >
      {props.phase === "reveal" ? nextRoundButton : null}
      {playersComponents}
    </Box>
  );
};

const getCoordinatesAroundTable = (table, seatIndex, numberOfSeats, radius) => {
  var offsetX = (table.width - table.height) / 2.0;
  var x =
    radius * Math.cos((2 * Math.PI * seatIndex) / numberOfSeats - Math.PI / 2);
  if (Math.round(x) === 0) offsetX = 0;
  if (Math.round(x) > 0) offsetX = -offsetX;
  return {
    x: table.centerX - x + offsetX,
    y:
      table.centerY -
      radius *
        Math.sin((2 * Math.PI * seatIndex) / numberOfSeats - Math.PI / 2),
  };
};

export default Table;
