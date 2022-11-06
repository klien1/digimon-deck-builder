import "./App.css";
import { useQuery, gql } from "@apollo/client";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>;
      <Card />
    </>
  );
}

const GET_DIGIMON_CARDS = gql`
  query GetDigimonCards {
    getDigimonCards {
      name
      image_url
    }
  }
`;

function Card() {
  const { loading, error, data } = useQuery(GET_DIGIMON_CARDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div className="flex flex-wrap">
        {data.getDigimonCards.map((card: any) => (
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
