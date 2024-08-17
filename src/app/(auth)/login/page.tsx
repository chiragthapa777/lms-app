import { LoginForm } from "@/components/auth/LoginForm";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <LoginForm />
    </main>
  );
}
