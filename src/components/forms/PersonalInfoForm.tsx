import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import FormField from '../ui/FormField';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume();
  const { personalInfo } = resumeData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...personalInfo,
        [name]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          id="firstName"
          name="firstName"
          type="text"
          value={personalInfo.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          required
        />
        
        <FormField
          label="Last Name"
          id="lastName"
          name="lastName"
          type="text"
          value={personalInfo.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
          required
        />
      </div>
      
      <FormField
        label="Job Title"
        id="jobTitle"
        name="jobTitle"
        type="text"
        value={personalInfo.jobTitle}
        onChange={handleInputChange}
        placeholder="e.g., Senior Software Engineer"
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
          required
        />
        
        <FormField
          label="Phone"
          id="phone"
          name="phone"
          type="tel"
          value={personalInfo.phone}
          onChange={handleInputChange}
          placeholder="(123) 456-7890"
        />
      </div>
      
      <FormField
        label="Location"
        id="location"
        name="location"
        type="text"
        value={personalInfo.location}
        onChange={handleInputChange}
        placeholder="City, State, Country"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="LinkedIn"
          id="linkedIn"
          name="linkedIn"
          type="url"
          value={personalInfo.linkedIn}
          onChange={handleInputChange}
          placeholder="https://linkedin.com/in/yourprofile"
        />
        
        <FormField
          label="Website"
          id="website"
          name="website"
          type="url"
          value={personalInfo.website}
          onChange={handleInputChange}
          placeholder="https://yourwebsite.com"
        />
      </div>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={4}
          value={personalInfo.summary}
          onChange={handleInputChange}
          placeholder="Write a compelling summary of your professional background and key qualifications..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Keep your summary concise (3-5 sentences) and highlight your most relevant experience and skills.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Industry"
          id="industry"
          name="industry"
          type="text"
          value={resumeData.industry}
          onChange={(e) => setResumeData({...resumeData, industry: e.target.value})}
          placeholder="e.g., Technology, Healthcare, Finance"
        />
        
        <FormField
          label="Target Role"
          id="targetRole"
          name="targetRole"
          type="text"
          value={resumeData.targetRole}
          onChange={(e) => setResumeData({...resumeData, targetRole: e.target.value})}
          placeholder="e.g., Product Manager, Software Developer"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;