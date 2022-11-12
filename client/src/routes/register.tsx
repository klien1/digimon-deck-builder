import { Button, Center, Container, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/input-field/input-field.component";
import {
  RegisterUserInput,
  useRegisterUserMutation,
} from "../graphql/generated/graphql";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data: RegisterUserInput) => {
    const user = await registerUser({
      variables: {
        data,
      },
    });

    console.log("user: ", user);
  };

  return (
    <>
      <Center>
        <Text fontSize="3xl">Register</Text>
      </Center>
      <Container>
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                placeholder="username"
                label="Username"
                name="username"
              />
              <InputField placeholder="email" label="Email" name="email" />
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

export default Register;
