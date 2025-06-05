import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash } from 'lucide-react';
import FormField from '../ui/FormField';

const AdditionalInfoForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume();
  const { certifications, languages, projects } = resumeData;

  // Certifications handlers
  const handleCertificationChange = (index: number, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = value;
    
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications
    });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [...certifications, '']
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications
    });
  };

  // Languages handlers
  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };
    
    setResumeData({
      ...resumeData,
      languages: updatedLanguages
    });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [...languages, { language: '', proficiency: '' }]
    });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      languages: updatedLanguages
    });
  };

  // Projects handlers
  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...projects, { title: '', description: '', link: '' }]
    });
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects
    });
  };

  return (
    <div className="space-y-10">
      {/* Certifications Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications</h3>
        <p className="text-gray-600 mb-4">
          Add any relevant certifications or licenses you've earned.
        </p>
        
        <div className="space-y-3 mb-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={cert}
                onChange={(e) => handleCertificationChange(index, e.target.value)}
                placeholder="e.g., AWS Certified Solutions Architect"
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
              />
              
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove certification"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={addCertification}
          className="flex items-center text-sm text-blue-700 hover:text-blue-900"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Certification
        </button>
      </div>
      
      {/* Languages Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Languages</h3>
        <p className="text-gray-600 mb-4">
          List languages you speak and your proficiency level.
        </p>
        
        <div className="space-y-3 mb-4">
          {languages.map((lang, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-grow">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                  placeholder="Language (e.g., English, Spanish)"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="w-1/3">
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Proficiency</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
              
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove language"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={addLanguage}
          className="flex items-center text-sm text-blue-700 hover:text-blue-900"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Language
        </button>
      </div>
      
      {/* Projects Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Projects</h3>
        <p className="text-gray-600 mb-4">
          Showcase relevant projects that demonstrate your skills and expertise.
        </p>
        
        <div className="space-y-6 mb-4">
          {projects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                aria-label="Remove project"
              >
                <Trash className="h-5 w-5" />
              </button>
              
              <FormField
                label="Project Title"
                id={`project-title-${index}`}
                name="title"
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                placeholder="e.g., E-commerce Website, Mobile App"
                className="mb-4"
              />
              
              <div className="mb-4">
                <label htmlFor={`project-desc-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id={`project-desc-${index}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  placeholder="Briefly describe the project, your role, and technologies used..."
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <FormField
                label="Project Link (Optional)"
                id={`project-link-${index}`}
                name="link"
                type="url"
                value={project.link}
                onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                placeholder="https://..."
                helpText="GitHub repository, live site, or portfolio link"
              />
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={addProject}
          className="flex items-center text-sm text-blue-700 hover:text-blue-900"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Project
        </button>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;