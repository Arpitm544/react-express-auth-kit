
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backLink?: {
    text: string;
    to: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  backLink
}) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="mb-6">
          <h1 className="auth-title">{title}</h1>
          {subtitle && (
            <p className="text-center text-gray-600">{subtitle}</p>
          )}
        </div>
        
        {children}
        
        {backLink && (
          <div className="mt-6 text-center">
            <Link to={backLink.to} className="auth-link">
              {backLink.text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
