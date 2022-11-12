import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useGetDigimonCardsQuery } from "../graphql/generated/graphql";

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
  const { loading, error, data } = useGetDigimonCardsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Error</p>;

  return (
    <>
      <Flex wrap="wrap" justify="center">
        {data.getDigimonCards.map((card, index: number) => (
          <Box w="30%" p={2} key={index}>
            <img src={card.image_url} />
          </Box>
        ))}
      </Flex>
    </>
  );
}
