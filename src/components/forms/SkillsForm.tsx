import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash } from 'lucide-react';
import { Skill } from '../../types';

const SkillsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume();
  const { skills } = resumeData;

  const handleSkillChange = (index: number, field: string, value: string | number) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    
    setResumeData({
      ...resumeData,
      skills: updatedSkills
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [
        ...skills,
        { name: '', level: 3 }
      ]
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      skills: updatedSkills
    });
  };

  return (
    <div>
      <p className="text-gray-700 mb-6">
        Add your technical and soft skills. Rate your proficiency level from 1 (basic) to 5 (expert).
      </p>
      
      <div className="space-y-4 mb-6">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                placeholder="Skill name (e.g., JavaScript, Project Management)"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor={`level-${index}`} className="text-sm text-gray-700 whitespace-nowrap">
                Level:
              </label>
              <select
                id={`level-${index}`}
                value={skill.level}
                onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1"
              >
                <option value={1}>1 - Basic</option>
                <option value={2}>2 - Intermediate</option>
                <option value={3}>3 - Proficient</option>
                <option value={4}>4 - Advanced</option>
                <option value={5}>5 - Expert</option>
              </select>
            </div>
            
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-red-500 hover:text-red-700"
              aria-label="Remove skill"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={addSkill}
        className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-blue-700 hover:text-blue-900 hover:border-blue-500 transition-colors duration-300"
      >
        <Plus className="h-5 w-5 mr-2" /> Add Another Skill
      </button>
      
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Skill Tips</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Include a mix of technical and soft skills</li>
                <li>Be honest about your proficiency levels</li>
                <li>Focus on skills most relevant to your target role</li>
                <li>Include industry-specific keywords that may be searched by ATS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;