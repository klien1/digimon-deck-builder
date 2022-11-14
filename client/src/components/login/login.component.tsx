import { Button, Center, Container, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  GetCurrentUserDocument,
  MutationLoginArgs,
  useLoginMutation,
} from "../../graphql/generated/graphql";

import InputField from "../input-field/input-field.component";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [loginMutation] = useLoginMutation();
  const onSubmit = async (data: MutationLoginArgs) => {
    const { username, password } = data;
    await loginMutation({
      variables: {
        username,
        password,
      },
      refetchQueries: [{ query: GetCurrentUserDocument }],
    });
  };

  return (
    <>
      <Container>
        <Center>
          <Flex justify="space-evenly" w="100%">
            <Text fontSize="3xl">Login</Text>
          </Flex>
        </Center>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                placeholder="username"
                label="Username"
                name="username"
              />
              <InputField
                type="password"
                placeholder="password"
                label="Password"
                name="password"
              />
              <Button type="submit" disabled={isSubmitting} mt={4}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
