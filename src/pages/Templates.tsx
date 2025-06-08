import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { TemplateType } from '../types';
import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import TechTemplate from '../components/templates/TechTemplate';
import AcademicTemplate from '../components/templates/AcademicTemplate';

const Templates: React.FC = () => {
  const { setSelectedTemplate, selectedTemplate } = useResume();
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateType | null>(null);
  
  const templates: { id: TemplateType; name: string; description: string; category: string }[] = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean and contemporary design with a focus on skills and achievements.',
      category: 'General'
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Traditional layout emphasizing work history and qualifications.',
      category: 'General'
    },
    { 
      id: 'minimalist', 
      name: 'Minimalist', 
      description: 'Simple, elegant design with plenty of white space and clean typography.',
      category: 'General'
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Unique design with visual elements for creative industries.',
      category: 'Creative'
    },
    { 
      id: 'executive', 
      name: 'Executive', 
      description: 'Sophisticated layout designed for senior leadership positions.',
      category: 'Leadership'
    },
    { 
      id: 'tech', 
      name: 'Tech', 
      description: 'Developer-focused template with technical skills showcase.',
      category: 'Technology'
    },
    { 
      id: 'academic', 
      name: 'Academic', 
      description: 'Formal template for researchers, professors, and academic professionals.',
      category: 'Academic'
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
      case 'minimalist':
        return <MinimalistTemplate preview />;
      case 'executive':
        return <ExecutiveTemplate preview />;
      case 'tech':
        return <TechTemplate preview />;
      case 'academic':
        return <AcademicTemplate preview />;
      default:
        return null;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'General':
        return 'bg-blue-100 text-blue-800';
      case 'Creative':
        return 'bg-purple-100 text-purple-800';
      case 'Leadership':
        return 'bg-green-100 text-green-800';
      case 'Technology':
        return 'bg-orange-100 text-orange-800';
      case 'Academic':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose a Template</h1>
        <p className="text-gray-600 mb-10">
          Select a template that best represents your professional style and industry. Each template is designed for specific career paths and industries.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`relative border-2 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group ${
                selectedTemplate === template.id 
                  ? 'border-blue-900 shadow-lg transform scale-105' 
                  : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="h-80 overflow-hidden bg-white relative">
                {getTemplatePreview(template.id)}
                
                {/* Overlay on hover or selection */}
                {(hoveredTemplate === template.id || selectedTemplate === template.id) && (
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-20 flex items-center justify-center transition-opacity duration-300">
                    <button 
                      className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 transform scale-110"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </span>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="bg-blue-900 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Template Categories Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
              <div>
                <h4 className="font-medium text-gray-900">General</h4>
                <p className="text-sm text-gray-600">Versatile templates suitable for most industries and career levels.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5"></div>
              <div>
                <h4 className="font-medium text-gray-900">Creative</h4>
                <p className="text-sm text-gray-600">Eye-catching designs for creative professionals and artists.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
              <div>
                <h4 className="font-medium text-gray-900">Leadership</h4>
                <p className="text-sm text-gray-600">Executive-level templates for senior management positions.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full mt-1.5"></div>
              <div>
                <h4 className="font-medium text-gray-900">Technology</h4>
                <p className="text-sm text-gray-600">Developer and tech-focused templates with skills emphasis.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1.5"></div>
              <div>
                <h4 className="font-medium text-gray-900">Academic</h4>
                <p className="text-sm text-gray-600">Formal templates for researchers and academic professionals.</p>
              </div>
            </div>
          </div>
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
            className={`flex items-center px-6 py-3 rounded-md transition-colors duration-300 ${
              selectedTemplate 
                ? 'bg-blue-900 text-white hover:bg-blue-800' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
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