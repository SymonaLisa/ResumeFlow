import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultResumeData } from '../data/defaultResumeData';
import { ResumeData, TemplateType } from '../types';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: TemplateType;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
  atsScore: number;
  setAtsScore: React.Dispatch<React.SetStateAction<number>>;
  suggestions: string[];
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
  jobDescriptionMatch: number;
  setJobDescriptionMatch: React.Dispatch<React.SetStateAction<number>>;
  saveResume: () => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : defaultResumeData;
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [atsScore, setAtsScore] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [jobDescriptionMatch, setJobDescriptionMatch] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const saveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  };

  const resetResume = () => {
    setResumeData(defaultResumeData);
    setSelectedTemplate('modern');
    setAtsScore(0);
    setSuggestions([]);
    setJobDescriptionMatch(0);
  };

  return (
    <ResumeContext.Provider 
      value={{ 
        resumeData, 
        setResumeData, 
        selectedTemplate, 
        setSelectedTemplate,
        atsScore,
        setAtsScore,
        suggestions,
        setSuggestions,
        jobDescriptionMatch,
        setJobDescriptionMatch,
        saveResume,
        resetResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};