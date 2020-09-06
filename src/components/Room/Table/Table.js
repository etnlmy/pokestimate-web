import React from "react";
import { Flex, useTheme } from "@chakra-ui/core";
import Player from "./Player/Player";
import Card from "../Table/TableCard/TableCard";
import NextRoundButton from "./NextRoundButton/NextRoundButton";

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
        visible={player.card !== null && player.card !== ""}
        reveal={props.phase === "reveal"}
        value={player.card}
        height={40}
        top={player.cardCoordinates.y}
        right={player.cardCoordinates.x}
      />
    </div>
  ));

  return (
    <Flex
      m="auto"
      w={props.width}
      h={props.height}
      backgroundColor="pokerGreen.500"
      border={`${props.border}px solid ${theme.colors.pokerGreen[400]}`}
      borderRadius="200px"
      boxShadow={`4px 5px ${theme.colors.pokerBlue[800]}, inset 3px 5px 0px 1px ${theme.colors.pokerGreen[600]}`}
      position="relative"
      align="center"
      justify="center"
    >
      <NextRoundButton
        visible={props.phase === "reveal"}
        onNextRound={props.onNextRound}
      ></NextRoundButton>
      {playersComponents}
    </Flex>
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
