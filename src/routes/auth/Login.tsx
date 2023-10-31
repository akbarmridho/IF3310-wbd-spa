import { Helmet } from "react-helmet-async";
import { UserAuthForm } from "@/components/forms/UserAuthForm.tsx";

export function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <UserAuthForm />
    </>
  );
}

export default Login;
