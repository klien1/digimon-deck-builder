import Header from "../components/header/header.component";
import { CardGallery } from "./card-gallery";

interface RootProps {}

const Root: React.FC<RootProps> = ({}) => {
  return (
    <>
      <Header />
      <CardGallery />
    </>
  );
};

export default Root;
