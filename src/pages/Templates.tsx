import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { TemplateType } from '../types';
import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';

const Templates: React.FC = () => {
  const { setSelectedTemplate, selectedTemplate } = useResume();
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateType | null>(null);
  
  const templates: { id: TemplateType; name: string; description: string }[] = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean and contemporary design with a focus on skills and achievements.' 
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Traditional layout emphasizing work history and qualifications.' 
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Unique design with visual elements for creative industries.' 
    },
  ];
  
  const handleTemplateSelect = (templateId: TemplateType) => {
    setSelectedTemplate(templateId);
  };
  
  const handleContinue = () => {
    navigate('/preview');
  };
  
  const handleBack = () => {
    navigate('/builder');
  };
  
  const getTemplatePreview = (templateId: TemplateType) => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate preview />;
      case 'professional':
        return <ProfessionalTemplate preview />;
      case 'creative':
        return <CreativeTemplate preview />;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose a Template</h1>
        <p className="text-gray-600 mb-10">
          Select a template that best represents your professional style. You can always change it later.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`relative border-2 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                selectedTemplate === template.id 
                  ? 'border-blue-900 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="h-96 overflow-hidden bg-white">
                {getTemplatePreview(template.id)}
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  {selectedTemplate === template.id && (
                    <div className="bg-blue-900 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>
              
              {(hoveredTemplate === template.id || selectedTemplate === template.id) && (
                <div className="absolute inset-0 bg-blue-900 bg-opacity-20 flex items-center justify-center">
                  <button 
                    className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Builder
          </button>
          
          <button
            onClick={handleContinue}
            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
            disabled={!selectedTemplate}
          >
            Preview Resume <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Templates;