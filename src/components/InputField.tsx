
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type: initialType,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  autoComplete,
  showPasswordToggle = false,
}) => {
  const [inputType, setInputType] = useState(initialType);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        {error && <span className="text-xs text-destructive">{error}</span>}
      </div>
      
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`auth-input ${
            error ? "border-destructive focus:ring-destructive" : ""
          }`}
          required={required}
          autoComplete={autoComplete}
        />
        
        {showPasswordToggle && initialType === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabIndex={-1}
          >
            {inputType === "password" ? (
              <Eye className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
