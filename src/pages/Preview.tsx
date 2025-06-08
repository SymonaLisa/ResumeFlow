import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { ArrowLeft, ArrowRight, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import TechTemplate from '../components/templates/TechTemplate';
import AcademicTemplate from '../components/templates/AcademicTemplate';
import JobMatchAnalyzer from '../components/tools/JobMatchAnalyzer';
import AtsChecker from '../components/tools/AtsChecker';

const Preview: React.FC = () => {
  const { selectedTemplate, atsScore } = useResume();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'preview' | 'ats' | 'job-match'>('preview');
  
  const handleContinue = () => {
    navigate('/export');
  };
  
  const handleBack = () => {
    navigate('/templates');
  };
  
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate forExport={false} />;
      case 'professional':
        return <ProfessionalTemplate forExport={false} />;
      case 'creative':
        return <CreativeTemplate forExport={false} />;
      case 'minimalist':
        return <MinimalistTemplate forExport={false} />;
      case 'executive':
        return <ExecutiveTemplate forExport={false} />;
      case 'tech':
        return <TechTemplate forExport={false} />;
      case 'academic':
        return <AcademicTemplate forExport={false} />;
      default:
        return <ModernTemplate forExport={false} />;
    }
  };
  
  const renderAtsScore = () => {
    let color = 'text-red-500';
    let icon = <AlertCircle className="h-5 w-5" />;
    
    if (atsScore >= 80) {
      color = 'text-green-500';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (atsScore >= 60) {
      color = 'text-yellow-500';
    }
    
    return (
      <div className={`flex items-center ${color}`}>
        {icon}
        <span className="ml-2 font-semibold">{atsScore}% ATS Friendly</span>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Review Your Resume</h1>
      <p className="text-gray-600 mb-8">
        Preview your resume, check its ATS compatibility, and analyze how well it matches your target job.
      </p>
      
      <div className="mb-8 border-b border-gray-200">
        <div className="flex flex-wrap -mb-px">
          <TabButton 
            active={activeTab === 'preview'} 
            onClick={() => setActiveTab('preview')}
            icon={<FileText className="h-4 w-4" />}
            text="Preview"
          />
          <TabButton 
            active={activeTab === 'ats'} 
            onClick={() => setActiveTab('ats')}
            icon={<CheckCircle className="h-4 w-4" />}
            text="ATS Checker"
          />
          <TabButton 
            active={activeTab === 'job-match'} 
            onClick={() => setActiveTab('job-match')}
            icon={<AlertCircle className="h-4 w-4" />}
            text="Job Match Analysis"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {activeTab === 'preview' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
              {renderAtsScore()}
            </div>
            <div id="resume-preview" className="border border-gray-200 rounded-lg overflow-hidden">
              {renderTemplate()}
            </div>
          </div>
        )}
        
        {activeTab === 'ats' && <AtsChecker />}
        
        {activeTab === 'job-match' && <JobMatchAnalyzer />}
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
        </button>
        
        <button
          onClick={handleContinue}
          className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
        >
          Export Resume <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, text }) => {
  return (
    <button
      className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
        active 
          ? 'border-blue-900 text-blue-900' 
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
};

export default Preview;