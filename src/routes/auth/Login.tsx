import { Helmet } from "react-helmet-async";
import { UserAuthForm } from "@/components/forms/UserAuthForm.tsx";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <main className={"absolute w-full min-h-screen bg-gray-100"}>
        <div className={"mx-auto mt-10 max-w-md"}>
          <div className={"bg-white p-8 rounded-2xl shadow-xl"}>
            <h1 className={"text-xl font-bold text-center mb-4"}>Log In</h1>
            <UserAuthForm />
            <p className={"mt-2 text-gray-700"}>
              Don't have an account?{" "}
              <Link to={"/register"} className={"font-semibold"}>
                Register now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
