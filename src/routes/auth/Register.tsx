import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { UserRegistrationForm } from "@/components/forms/UserRegistrationForm.tsx";

export function Register() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <main className={"absolute w-full min-h-screen bg-gray-100"}>
        <div className={"mx-auto mt-10 max-w-md"}>
          <div className={"bg-white p-8 rounded-2xl shadow-xl"}>
            <h1 className={"text-xl font-bold text-center mb-4"}>Register</h1>
            <UserRegistrationForm />
            <p className={"mt-2 text-gray-700"}>
              Have an account?{" "}
              <Link to={"/login"} className={"font-semibold"}>
                Login now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
