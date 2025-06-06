import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ProfessionalTemplateProps {
  preview?: boolean;
  forExport?: boolean;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ preview = false, forExport = false }) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, certifications, languages, projects } = resumeData;
  
  if (preview) {
    return (
      <div className="scale-[0.4] origin-top-left transform w-[250%] h-[250%] bg-white p-8">
        <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
          <p className="text-xl text-gray-700 mb-4">Senior Software Engineer</p>
          <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>New York, NY</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">Experienced software engineer with 8+ years of expertise in building scalable web applications. Proficient in JavaScript, React, and Node.js.</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">Professional Experience</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <h3 className="font-semibold">Tech Company Inc.</h3>
              <span className="text-gray-600">New York, NY</span>
            </div>
            <div className="flex justify-between text-gray-700 italic mb-2">
              <span>Senior Software Engineer</span>
              <span>2019 - Present</span>
            </div>
            <p className="text-gray-700">Led development of cloud-based solutions using modern JavaScript frameworks.</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">Skills</h2>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded mr-1 mb-1">JavaScript</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded mr-1 mb-1">React</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded mr-1 mb-1">Node.js</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded mr-1 mb-1">TypeScript</span>
          </div>
        </div>
      </div>
    );
  }
  
  const containerClass = forExport 
    ? "bg-white p-8 max-w-4xl mx-auto min-h-screen" 
    : "bg-white p-8 max-w-4xl mx-auto";
  
  return (
    <div className={containerClass}>
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className="text-xl text-gray-700 mb-4">{personalInfo.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedIn && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      
      {experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">Professional Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold">{job.company}</h3>
                <span className="text-gray-600">{job.location}</span>
              </div>
              <div className="flex justify-between text-gray-700 italic mb-2">
                <span>{job.position}</span>
                <span>{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
              </div>
              <p className="text-gray-700">{job.description}</p>
              {job.achievements.length > 0 && job.achievements[0] && (
                <ul className="list-disc list-inside mt-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700">{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      
      {education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold">{edu.institution}</h3>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-gray-800">{edu.degree} in {edu.fieldOfStudy}</p>
              {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {skills.length > 0 && skills[0].name && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">Skills</h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-800 rounded mr-1 mb-1">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {certifications.length > 0 && certifications[0] && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">Certifications</h2>
          <ul className="list-disc list-inside">
            {certifications.map((cert, index) => (
              <li key={index} className="text-gray-700">{cert}</li>
            ))}
          </ul>
        </div>
      )}
      
      {projects.length > 0 && projects[0].title && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-gray-700">{project.description}</p>
              {project.link && (
                <a href={project.link} className="text-blue-600 hover:underline mt-1 inline-block">
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;