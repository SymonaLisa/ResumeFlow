import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  labels = [] 
}) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div 
            key={step} 
            className={`relative flex flex-col items-center ${step <= currentStep ? 'text-blue-900' : 'text-gray-400'}`}
            style={{ width: `${100 / totalSteps}%` }}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-semibold text-sm ${
                step < currentStep 
                  ? 'bg-blue-900 text-white' 
                  : step === currentStep 
                    ? 'bg-white border-2 border-blue-900 text-blue-900' 
                    : 'bg-white border-2 border-gray-300 text-gray-400'
              }`}
            >
              {step}
            </div>
            
            {labels[step - 1] && (
              <span className={`text-xs font-medium ${step <= currentStep ? 'text-blue-900' : 'text-gray-400'}`}>
                {labels[step - 1]}
              </span>
            )}
          </div>
        ))}
      </div>
      
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-900 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;