// src/components/ui/button.jsx

import React from "react";
import classNames from "classnames";

export function Button({ children, onClick, className = "", variant = "solid", type = "button" }) {
  const baseStyles = "px-4 py-2 rounded text-sm font-medium transition-all duration-200";

  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-100"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}

export default Button;