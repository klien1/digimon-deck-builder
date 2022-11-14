import { Button, Center, Container, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../input-field/input-field.component";
import {
  GetCurrentUserDocument,
  RegisterUserInput,
  useRegisterUserMutation,
} from "../../graphql/generated/graphql";
import * as yup from "yup";

interface RegisterProps {}

const registrationSchema = yup.object().shape({
  username: yup.string().min(5).required(),
  password: yup
    .string()
    .min(5)
    .matches(/(?=.*\d)/, "Must contain a number")
    .matches(/(?=.*[A-Z])/, "Must contain an upper case letter")
    .matches(/(?=.*[a-z])/, "Must contain a lower case letter")
    .matches(
      /(?=.*[!@#\$%\^&\*])/,
      "Must contain on of the following symbols: ! @ # $ % ^ & *"
    )
    .required(),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .min(5, "Re-enter password must be at least 5 characters")
    .required("you must verify your password"),
  email: yup.string().email().required(),
});

const Register: React.FC<RegisterProps> = () => {
  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data: RegisterUserInput, _: any) => {
    await registerUser({
      variables: {
        data,
      },
      refetchQueries: [{ query: GetCurrentUserDocument }],
    });
  };

  return (
    <>
      <Center>
        <Text fontSize="3xl">Register</Text>
      </Center>
      <Container>
        <Formik
          initialValues={{
            username: "",
            password: "",
            verifyPassword: "",
            email: "",
          }}
          validationSchema={registrationSchema}
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
              <InputField
                type="password"
                placeholder="Re-enter password"
                label="Re-enter Password"
                name="verifyPassword"
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
