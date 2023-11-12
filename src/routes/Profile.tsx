import { ChangePasswordForm } from "@/components/forms/ChangePasswordForm.tsx";

export default function Profile() {
  return (
    <div className={"max-w-md mx-auto bg-white shadow-xl rounded-xl p-6"}>
      <h1 className={"font-bold text-xl text-center mb-4"}>Change Password</h1>
      <ChangePasswordForm />
    </div>
  );
}
