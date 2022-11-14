import { Button, Flex } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/header/header.component";

interface RootProps {}

const Root: React.FC<RootProps> = () => {
  return (
    <>
      <Header />
      <Flex justify="space-evenly">
        {/* <div>Build Deck</div>

        <div>Search for deck</div> */}
        {/* <Button>
          <Link to={`login/`}>Login</Link>
        </Button> */}
        {/* <Button>
          <Link to={`gallery/`}>Gallery</Link>
        </Button> */}
        {/* <Button>
          <Link to={`register/`}>Register</Link>
        </Button> */}
      </Flex>
      <Outlet />
    </>
  );
};

export default Root;
