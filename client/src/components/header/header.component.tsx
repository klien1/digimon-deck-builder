import { Box, Text, Flex } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <Box as="nav">
        <Flex justify="space-between" align="center" px="8" py="4">
          <Text fontSize="2xl" py="3" px="4">
            Digimon Deck Builder
          </Text>
          <Link to="/login">Log in</Link>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
