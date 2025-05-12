
import React, { useState, FormEvent } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../lib/validators";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    const newErrors = {
      email: emailError,
      password: passwordError,
    };
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (!emailError && !passwordError) {
      try {
        await login(email, password);
      } catch (error) {
        // Error is handled in the login function
      }
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your account"
      backLink={{
        text: "Don't have an account? Sign up",
        to: "/register",
      }}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
        />
        
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
          autoComplete="current-password"
          showPasswordToggle
        />
        
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm auth-link">
            Forgot password?
          </Link>
        </div>
        
        <button
          type="submit"
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              <span>Logging in...</span>
            </div>
          ) : (
            "Log In"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
