import React from "react";
import { Box } from "@chakra-ui/core";
import CreateRoomForm from "../../components/CreateRoomForm/CreateRoomForm";

const home = () => (
  <Box textAlign="center" pt="80px">
    <CreateRoomForm />
  </Box>
);

export default home;
