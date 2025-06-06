import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ModernTemplateProps {
  preview?: boolean;
  forExport?: boolean;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ preview = false, forExport = false }) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, certifications, languages, projects } = resumeData;
  
  if (preview) {
    return (
      <div className="scale-[0.4] origin-top-left transform w-[250%] h-[250%] bg-white">
        <div className="bg-blue-900 text-white p-6 rounded-t-md">
          <h1 className="text-3xl font-bold mb-1">John Doe</h1>
          <p className="text-xl mb-4">Senior Software Engineer</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>New York, NY</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-b-md">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Summary</h2>
            <p className="text-gray-700">Experienced software engineer with 8+ years of expertise in building scalable web applications. Proficient in JavaScript, React, and Node.js.</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Experience</h2>
            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">Senior Software Engineer</h3>
                <span className="text-gray-600">2019 - Present</span>
              </div>
              <p className="text-gray-800">Tech Company Inc., New York</p>
              <p className="text-gray-700 mt-2">Led development of cloud-based solutions using modern JavaScript frameworks.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">JavaScript</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">React</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">Node.js</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">TypeScript</span>
            </div>
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
      <div className="bg-blue-900 text-white p-6 rounded-t-md">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className="text-xl mb-4">{personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedIn && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-2" />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-b-md">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Summary</h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}
        
        {experience.length > 0 && experience[0].company && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Experience</h2>
            {experience.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{job.position}</h3>
                  <span className="text-gray-600">
                    {job.startDate} - {job.current ? 'Present' : job.endDate}
                  </span>
                </div>
                <p className="text-gray-800">{job.company}, {job.location}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
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
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-800">{edu.institution}</p>
                {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {skills.length > 0 && skills[0].name && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {certifications.length > 0 && certifications[0] && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Certifications</h2>
            <ul className="list-disc list-inside">
              {certifications.map((cert, index) => (
                <li key={index} className="text-gray-700">{cert}</li>
              ))}
            </ul>
          </div>
        )}
        
        {projects.length > 0 && projects[0].title && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-gray-300 pb-2">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-gray-700 mt-1">{project.description}</p>
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
    </div>
  );
};

export default ModernTemplate;