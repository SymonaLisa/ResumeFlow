import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { ArrowRight, ArrowLeft, Save } from 'lucide-react';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import AdditionalInfoForm from '../components/forms/AdditionalInfoForm';
import ProgressBar from '../components/ui/ProgressBar';

const Builder: React.FC = () => {
  const [step, setStep] = useState(1);
  const { saveResume } = useResume();
  const navigate = useNavigate();
  
  const totalSteps = 5;
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      saveResume();
      navigate('/templates');
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSave = () => {
    saveResume();
    // Show save confirmation message
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <EducationForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <AdditionalInfoForm />;
      default:
        return <PersonalInfoForm />;
    }
  };
  
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Personal Information";
      case 2:
        return "Work Experience";
      case 3:
        return "Education";
      case 4:
        return "Skills";
      case 5:
        return "Additional Information";
      default:
        return "Personal Information";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Build Your Resume</h1>
          <p className="text-gray-600 mb-6">
            Complete each section to create a professional, tailored resume. Your progress is saved automatically.
          </p>
          
          <ProgressBar 
            currentStep={step} 
            totalSteps={totalSteps} 
            labels={["Personal Info", "Experience", "Education", "Skills", "Additional Info"]} 
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{getStepTitle()}</h2>
          
          {renderStep()}
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center px-4 py-2 rounded-md ${
              step === 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-300`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 mx-2"
          >
            <Save className="mr-2 h-4 w-4" /> Save Progress
          </button>
          
          <button
            onClick={nextStep}
            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
          >
            {step === totalSteps ? 'Choose Template' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Builder;