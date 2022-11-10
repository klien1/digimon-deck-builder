import "./App.css";
import { useQuery } from "@apollo/client";
import {
  GetDigimonCardsDocument,
  DigimonCard,
} from "./graphql/generated/graphql";

function App() {
  return (
    <>
      <Card />
    </>
  );
}

function Card() {
  const { loading, error, data } = useQuery(GetDigimonCardsDocument);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div className="flex flex-wrap">
        {data.getDigimonCards.map((card: DigimonCard) => (
          <div className="">
            <p>{card.name}</p>
            <img src={card.image_url} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
