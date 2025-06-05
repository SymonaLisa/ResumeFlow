export type TemplateType = 'modern' | 'professional' | 'creative';

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedIn: string;
  github: string;
  summary: string;
  jobTitle: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: string[];
  languages: { language: string; proficiency: string }[];
  projects: { title: string; description: string; link: string }[];
  industry: string;
  targetRole: string;
}

export interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}