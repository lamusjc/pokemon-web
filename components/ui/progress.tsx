import React from 'react'

interface ProgressProps {
  value: number
  className?: string
}

const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
  return (
    <div className={`w-full bg-secondary rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default Progress
