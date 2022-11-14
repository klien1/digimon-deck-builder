import {
  Box,
  Text,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "../../graphql/generated/graphql";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { data, loading, client } = useGetCurrentUserQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    // clears cache during log out
    await client.resetStore();
  };

  return (
    <>
      <Box as="nav" bg="#90CDF4" mb={4}>
        <Flex justify="space-between" align="center" px="8" py="4">
          <Text fontSize="2xl" py="3" px="4">
            Digimon Deck Builder
          </Text>
          {!loading && data?.getCurrentUser?.user ? (
            <Flex>
              <Text>Welcome {data?.getCurrentUser?.user.username}</Text>
              <Breadcrumb ml={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={handleLogout}>
                    Logout
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Header;
