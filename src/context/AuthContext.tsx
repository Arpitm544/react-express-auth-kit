
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        
        if (token) {
          // In a real app, validate token with the backend
          // For now, we'll simulate a successful auth with local data
          const userData = localStorage.getItem("user_data");
          
          if (userData) {
            setUser(JSON.parse(userData));
          } else {
            localStorage.removeItem("auth_token");
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demonstration, we'll accept any email with valid format and password longer than 8 chars
      // In a real app, this would be a fetch to your backend
      if (password.length < 8) {
        throw new Error("Invalid credentials");
      }
      
      const userData: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0], // Use part of email as name for demo
        email,
      };
      
      // Store auth data
      localStorage.setItem("auth_token", "demo-jwt-token");
      localStorage.setItem("user_data", JSON.stringify(userData));
      
      setUser(userData);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, this would check if the user already exists
      // For demo purposes, we'll create a new user
      const userData: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
      };
      
      // Store auth data
      localStorage.setItem("auth_token", "demo-jwt-token");
      localStorage.setItem("user_data", JSON.stringify(userData));
      
      setUser(userData);
      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would send a reset link to the user's email
      toast.success("If an account with this email exists, password reset instructions have been sent");
    } catch (error) {
      toast.error("Failed to process request: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the token and update the password
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
