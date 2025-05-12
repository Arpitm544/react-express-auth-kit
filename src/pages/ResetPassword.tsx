
import React, { useState, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { validatePassword, validatePasswordConfirmation } from "../lib/validators";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    token?: string;
  }>({});
  
  const { resetPassword, isLoading } = useAuth();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate token on mount
    if (!token) {
      setErrors({ token: "Invalid or missing reset token" });
      toast.error("Invalid password reset link");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      return;
    }
    
    // Validate form
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordConfirmation(password, confirmPassword);
    
    const newErrors = {
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (!passwordError && !confirmPasswordError) {
      try {
        await resetPassword(token, password);
      } catch (error) {
        // Error is handled in the resetPassword function
      }
    }
  };

  if (!token) {
    return null; // Redirect handled in useEffect
  }

  return (
    <AuthLayout 
      title="Create new password" 
      subtitle="Enter a strong password for your account"
      backLink={{
        text: "Back to login",
        to: "/login",
      }}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          id="password"
          label="New Password"
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
          label="Confirm New Password"
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
              <span>Updating password...</span>
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
