import toast from 'react-hot-toast';
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import type { FormValues } from "../components/AuthForm";

const SignIn = () => {
  const navigate = useNavigate();

  const handleLogin = (values: FormValues) => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.error("No account found. Please sign up first.");
      return;
    }

    const userData = JSON.parse(storedUser);

    if (values.email === userData.email && values.password === userData.password) {
      toast.success("Sign in successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="ticktock"
      description="Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. Track and monitor employee attendance and productivity from anywhere, anytime."
    >
      <AuthForm onFinish={handleLogin} />
    </AuthLayout>
  );
};

export default SignIn;
