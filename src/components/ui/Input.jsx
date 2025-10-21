import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  containerClassName = '',
  type = 'text',
  ...props 
}, ref) => {
  const baseInputClasses = 'w-full px-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
  const iconPaddingLeft = Icon && iconPosition === 'left' ? 'pl-11' : '';
  const iconPaddingRight = Icon && iconPosition === 'right' ? 'pr-11' : '';
  
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`${baseInputClasses} ${errorClasses} ${iconPaddingLeft} ${iconPaddingRight} ${className}`}
          {...props}
        />
        
        {Icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
