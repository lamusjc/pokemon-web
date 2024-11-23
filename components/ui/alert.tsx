import React from 'react'

interface AlertProps {
  children: React.ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'info', 
  className = '' 
}) => {
  const variantStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700'
  }

  return (
    <div className={`border-l-4 p-4 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  )
}

export const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-bold mb-2">{children}</h3>
)

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p>{children}</p>
)
