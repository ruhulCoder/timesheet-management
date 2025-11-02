import toast from 'react-hot-toast';
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import type { FormValues } from "../components/AuthForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignup = (values: FormValues) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Account created successfully! Please sign in.");
    navigate("/signin");
  };

  return (
    <AuthLayout
      title="ticktock"
      description="Join ticktock today and experience a smarter, easier way to manage your team's time and productivity."
    >
      <AuthForm isSignup onFinish={handleSignup} />
    </AuthLayout>
  );
};

export default SignUp;
