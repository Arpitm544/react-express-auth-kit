
import React, { useState, FormEvent } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../lib/validators";
import { Loader } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateEmail(email);
    
    setErrors({ email: emailError });
    
    // If no errors, submit the form
    if (!emailError) {
      try {
        await forgotPassword(email);
        setSubmitted(true);
      } catch (error) {
        // Error is handled in the forgotPassword function
      }
    }
  };

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle={
        submitted 
          ? "Check your email for reset instructions" 
          : "Enter your email and we'll send you a reset link"
      }
      backLink={{
        text: "Back to login",
        to: "/login",
      }}
    >
      {!submitted ? (
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
          
          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      ) : (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                If an account with this email exists, we've sent instructions to reset your password.
              </p>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
