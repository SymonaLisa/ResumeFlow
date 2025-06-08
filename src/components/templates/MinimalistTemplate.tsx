import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface MinimalistTemplateProps {
  preview?: boolean;
  forExport?: boolean;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ preview = false, forExport = false }) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, certifications, languages, projects } = resumeData;
  
  if (preview) {
    return (
      <div className="scale-[0.4] origin-top-left transform w-[250%] h-[250%] bg-white p-8">
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-light text-gray-900 mb-2">John Doe</h1>
          <p className="text-lg text-gray-600 mb-4">Senior Software Engineer</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>john.doe@example.com</span>
            <span>•</span>
            <span>(123) 456-7890</span>
            <span>•</span>
            <span>New York, NY</span>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Experienced software engineer with 8+ years of expertise in building scalable web applications.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Experience</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-900">Senior Software Engineer</h3>
                <span className="text-sm text-gray-500">2019 - Present</span>
              </div>
              <p className="text-gray-600 mb-2">Tech Company Inc. • New York, NY</p>
              <p className="text-gray-700 text-sm">Led development of cloud-based solutions using modern JavaScript frameworks.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="text-sm text-gray-700">JavaScript</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-700">React</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-700">Node.js</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-700">TypeScript</span>
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
      <div className="text-center mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className="text-lg text-gray-600 mb-4">{personalInfo.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <>
              <span>•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span>•</span>
              <span>{personalInfo.location}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              <span>•</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-center">{personalInfo.summary}</p>
        </div>
      )}
      
      {experience.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">Experience</h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{job.position}</h3>
                  <span className="text-sm text-gray-500">
                    {job.startDate} - {job.current ? 'Present' : job.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                <p className="text-gray-700 text-sm mb-2">{job.description}</p>
                {job.achievements.length > 0 && job.achievements[0] && (
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {education.length > 0 && education[0].institution && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-gray-600">{edu.institution}</p>
              {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {skills.length > 0 && skills[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <React.Fragment key={index}>
                <span className="text-sm text-gray-700">{skill.name}</span>
                {index < skills.length - 1 && <span className="text-gray-300">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      {projects.length > 0 && projects[0].title && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <p className="text-gray-700 text-sm">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="text-gray-500 hover:text-gray-700 text-sm">
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {certifications.length > 0 && certifications[0] && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">Certifications</h2>
          <div className="space-y-1">
            {certifications.map((cert, index) => (
              <p key={index} className="text-gray-700 text-sm">{cert}</p>
            ))}
          </div>
        </div>
      )}
      
      {languages.length > 0 && languages[0].language && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">Languages</h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang, index) => (
              <React.Fragment key={index}>
                <span className="text-sm text-gray-700">{lang.language} ({lang.proficiency})</span>
                {index < languages.length - 1 && <span className="text-gray-300">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;