import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import {
  MutationLoginArgs,
  useGetCurrentUserQuery,
  useLoginMutation,
} from "../graphql/generated/graphql";

import InputField from "../components/input-field/input-field.component";

interface LoginProps {}

const getCurrentUser = () => {
  console.log("hello current user: ");
};

const loginUser = () => {
  console.log("login user");
};

const Login: React.FC<LoginProps> = ({}) => {
  const { data, loading } = useGetCurrentUserQuery();
  const [loginMutation] = useLoginMutation();
  const onSubmit = async (data: MutationLoginArgs) => {
    const { username, password } = data;
    const a = await loginMutation({
      variables: {
        username,
        password,
      },
    });
    console.log("a: ", a);
    console.log(data);
  };

  if (loading) return <div>Loading...</div>;

  // const [loginMutation] = useLoginMutation({
  //   variables: {
  //     username: "chicken",
  //     password: "#123",
  //   },
  // });

  // console.log("loginObject", loginObject);

  // console.log(data?.getCurrentUser?.errors);
  // console.log(data?.getCurrentUser?.user);

  return (
    <>
      <Container>
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
      {data?.getCurrentUser?.user
        ? `Welcome ${data.getCurrentUser.user?.username}!`
        : null}
    </>
  );
};

export default Login;
