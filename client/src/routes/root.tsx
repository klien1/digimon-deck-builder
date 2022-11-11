import { Link, Outlet } from "react-router-dom";
import Header from "../components/header/header.component";
import { CardGallery } from "./card-gallery";

interface RootProps {}

const Root: React.FC<RootProps> = ({}) => {
  return (
    <>
      <Header />
      <Link to={`login/`}>Login</Link>
      <Link to={`gallery/`}>Gallery</Link>
      <Outlet />
      {/* <CardGallery /> */}
    </>
  );
};

export default Root;
