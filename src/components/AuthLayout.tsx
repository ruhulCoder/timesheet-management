import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-lg font-semibold mb-6">Welcome back</h2>
          {children}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-1 bg-blue-600 text-white items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
