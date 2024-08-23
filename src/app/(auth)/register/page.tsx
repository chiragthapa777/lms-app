import { RegisterForm } from "@/components/auth/RegisterForm";

type Props = {};
export default function page({}: Props) {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <RegisterForm />
    </main>
  );
}
