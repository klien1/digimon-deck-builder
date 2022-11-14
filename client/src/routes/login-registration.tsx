import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import Login from "../components/login/login.component";
import Register from "../components/register/register.component";

interface LoginRegistrationProps {}

const LoginRegistration: React.FC<LoginRegistrationProps> = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? <Login /> : <Register />}
      <Center>
        <Breadcrumb>
          {isLogin ? (
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setIsLogin(false)}>
                Don't have an account? Create a account
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setIsLogin(true)}>
                Already have an account? Login to an existing account
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Center>
    </>
  );
};

export default LoginRegistration;
