import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import FormField from '../ui/FormField';
import { Plus, Trash } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume();
  const { experience } = resumeData;

  const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  const handleAchievementChange = (expIndex: number, achIndex: number, value: string) => {
    const updatedExperience = [...experience];
    const achievements = [...updatedExperience[expIndex].achievements];
    achievements[achIndex] = value;
    
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      achievements
    };
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...experience,
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: ['']
        }
      ]
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  const addAchievement = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience[index].achievements.push('');
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updatedExperience = [...experience];
    const achievements = [...updatedExperience[expIndex].achievements];
    achievements.splice(achIndex, 1);
    
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      achievements
    };
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  return (
    <div className="space-y-8">
      {experience.map((exp, index) => (
        <div 
          key={index} 
          className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative"
        >
          {experience.length > 1 && (
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              aria-label="Remove experience"
            >
              <Trash className="h-5 w-5" />
            </button>
          )}
          
          <h3 className="text-lg font-medium text-gray-900 mb-4">Experience {index + 1}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Company"
              id={`company-${index}`}
              name="company"
              type="text"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              placeholder="Company name"
              required
            />
            
            <FormField
              label="Position"
              id={`position-${index}`}
              name="position"
              type="text"
              value={exp.position}
              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              placeholder="Your job title"
              required
            />
          </div>
          
          <FormField
            label="Location"
            id={`location-${index}`}
            name="location"
            type="text"
            value={exp.location}
            onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
            placeholder="City, State, Country"
            className="mb-4"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Start Date"
              id={`startDate-${index}`}
              name="startDate"
              type="text"
              value={exp.startDate}
              onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
              placeholder="MM/YYYY"
              helpText="Format: MM/YYYY (e.g., 01/2020)"
            />
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <FormField
                  label="End Date"
                  id={`endDate-${index}`}
                  name="endDate"
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  placeholder="MM/YYYY or Present"
                  disabled={exp.current}
                />
              </div>
              
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={exp.current}
                  onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor={`current-${index}`} className="ml-2 text-sm text-gray-700">
                  I currently work here
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id={`description-${index}`}
              name="description"
              rows={3}
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              placeholder="Describe your responsibilities and role..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Briefly describe your role, responsibilities, and key contributions.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Achievements
            </label>
            
            {exp.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                  placeholder="Describe a key achievement or responsibility"
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
                />
                
                {exp.achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAchievement(index, achIndex)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove achievement"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addAchievement(index)}
              className="flex items-center text-sm text-blue-700 hover:text-blue-900 mt-2"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Achievement
            </button>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addExperience}
        className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-blue-700 hover:text-blue-900 hover:border-blue-500 transition-colors duration-300"
      >
        <Plus className="h-5 w-5 mr-2" /> Add Another Experience
      </button>
    </div>
  );
};

export default ExperienceForm;