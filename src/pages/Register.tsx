
import React, { useState, FormEvent } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { 
  validateEmail, 
  validatePassword, 
  validateName, 
  validatePasswordConfirmation 
} from "../lib/validators";
import { Loader } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordConfirmation(password, confirmPassword);
    
    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      try {
        await register(name, email, password);
      } catch (error) {
        // Error is handled in the register function
      }
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Enter your information to get started"
      backLink={{
        text: "Already have an account? Log in",
        to: "/login",
      }}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
          autoComplete="name"
        />
        
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
          autoComplete="new-password"
          showPasswordToggle
        />
        
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
          showPasswordToggle
        />
        
        <button
          type="submit"
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
