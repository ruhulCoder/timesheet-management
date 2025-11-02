import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

export interface FormValues {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  isSignup?: boolean;
  onFinish: (values: FormValues) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup, onFinish }) => {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      className="w-full space-y-4"
    >
      {isSignup && (
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
      )}

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="••••••••" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block className="bg-blue-600">
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
      </Form.Item>

      <div className="text-center text-sm">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 font-medium">
              Sign In
            </Link>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </Form>
  );
};

export default AuthForm;
