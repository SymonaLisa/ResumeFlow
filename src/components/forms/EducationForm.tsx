import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import FormField from '../ui/FormField';
import { Plus, Trash } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume();
  const { education } = resumeData;

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...education,
        {
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  return (
    <div className="space-y-8">
      {education.map((edu, index) => (
        <div 
          key={index} 
          className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative"
        >
          {education.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              aria-label="Remove education"
            >
              <Trash className="h-5 w-5" />
            </button>
          )}
          
          <h3 className="text-lg font-medium text-gray-900 mb-4">Education {index + 1}</h3>
          
          <FormField
            label="Institution"
            id={`institution-${index}`}
            name="institution"
            type="text"
            value={edu.institution}
            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
            placeholder="University or school name"
            required
            className="mb-4"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Degree"
              id={`degree-${index}`}
              name="degree"
              type="text"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              placeholder="e.g., Bachelor of Science"
              required
            />
            
            <FormField
              label="Field of Study"
              id={`fieldOfStudy-${index}`}
              name="fieldOfStudy"
              type="text"
              value={edu.fieldOfStudy}
              onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
              placeholder="e.g., Computer Science"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Start Date"
              id={`eduStartDate-${index}`}
              name="startDate"
              type="text"
              value={edu.startDate}
              onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
              placeholder="MM/YYYY"
              helpText="Format: MM/YYYY (e.g., 09/2016)"
            />
            
            <FormField
              label="End Date"
              id={`eduEndDate-${index}`}
              name="endDate"
              type="text"
              value={edu.endDate}
              onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
              placeholder="MM/YYYY or Expected MM/YYYY"
              helpText="Or 'Expected MM/YYYY' if not completed"
            />
          </div>
          
          <div>
            <label htmlFor={`eduDescription-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id={`eduDescription-${index}`}
              name="description"
              rows={3}
              value={edu.description}
              onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
              placeholder="Include relevant coursework, honors, activities, or GPA if notable..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addEducation}
        className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-blue-700 hover:text-blue-900 hover:border-blue-500 transition-colors duration-300"
      >
        <Plus className="h-5 w-5 mr-2" /> Add Another Education
      </button>
    </div>
  );
};

export default EducationForm;