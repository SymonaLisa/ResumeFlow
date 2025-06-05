import { ResumeData } from '../types';

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedIn: '',
    github: '',
    summary: '',
    jobTitle: '',
  },
  experience: [
    {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    },
  ],
  education: [
    {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: [
    { name: '', level: 3 },
  ],
  certifications: [''],
  languages: [{ language: '', proficiency: '' }],
  projects: [{ title: '', description: '', link: '' }],
  industry: '',
  targetRole: '',
};