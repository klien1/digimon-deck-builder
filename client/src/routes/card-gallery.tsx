import { useQuery } from "@apollo/client";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import {
  GetDigimonCardsDocument,
  DigimonCard,
} from "../graphql/generated/graphql";

interface CardGalleryProps {}

export const CardGallery: React.FC<CardGalleryProps> = () => {
  return (
    <>
      <Center>
        <Text fontSize="4xl">Card Gallery</Text>
      </Center>
      <Box as="section" bg="black">
        <Card />
      </Box>
    </>
  );
};

function Card() {
  const { loading, error, data } = useQuery(GetDigimonCardsDocument);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Flex wrap="wrap" justify="center">
        {data.getDigimonCards.map((card: DigimonCard) => (
          <Box w="30%" p={2}>
            <img src={card.image_url} />
          </Box>
        ))}
      </Flex>
    </>
  );
}
