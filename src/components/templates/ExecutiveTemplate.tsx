import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ExecutiveTemplateProps {
  preview?: boolean;
  forExport?: boolean;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ preview = false, forExport = false }) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, certifications, languages, projects } = resumeData;
  
  if (preview) {
    return (
      <div className="scale-[0.4] origin-top-left transform w-[250%] h-[250%] bg-white">
        <div className="bg-gray-900 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">John Doe</h1>
          <p className="text-xl text-gray-300 mb-4">Chief Executive Officer</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
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
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-2" />
              <span>LinkedIn Profile</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">Executive Summary</h2>
            <p className="text-gray-700">Visionary leader with 15+ years of experience driving organizational growth and transformation.</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">Leadership Experience</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">Chief Executive Officer</h3>
                <span className="font-semibold text-gray-600">2018 - Present</span>
              </div>
              <p className="text-gray-800 font-medium">Fortune 500 Company, New York</p>
              <p className="text-gray-700 mt-1">Led strategic initiatives resulting in 40% revenue growth.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">Core Competencies</h2>
            <div className="grid grid-cols-2 gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded">Strategic Planning</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded">Team Leadership</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded">P&L Management</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded">Digital Transformation</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const containerClass = forExport 
    ? "bg-white max-w-4xl mx-auto min-h-screen" 
    : "bg-white max-w-4xl mx-auto";
  
  return (
    <div className={containerClass}>
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className="text-xl text-gray-300 mb-6">{personalInfo.jobTitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
          {personalInfo.linkedIn && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-2" />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
        
        {experience.length > 0 && experience[0].company && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Leadership Experience</h2>
            {experience.map((job, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{job.position}</h3>
                  <span className="font-semibold text-gray-600">
                    {job.startDate} - {job.current ? 'Present' : job.endDate}
                  </span>
                </div>
                <p className="text-gray-800 font-medium mb-2">{job.company}, {job.location}</p>
                <p className="text-gray-700 mb-3">{job.description}</p>
                {job.achievements.length > 0 && job.achievements[0] && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {education.length > 0 && education[0].institution && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <span className="font-semibold text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-800 font-medium">{edu.institution}</p>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {skills.length > 0 && skills[0].name && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Core Competencies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-2 bg-gray-100 text-gray-800 rounded font-medium text-center">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {certifications.length > 0 && certifications[0] && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Certifications & Awards</h2>
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="text-gray-700 font-medium">{cert}</li>
              ))}
            </ul>
          </div>
        )}
        
        {projects.length > 0 && projects[0].title && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Strategic Initiatives</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="text-gray-600 hover:text-gray-800 font-medium">
                    View Details
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        {languages.length > 0 && languages[0].language && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Languages</h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang, index) => (
                <span key={index} className="text-gray-700 font-medium">
                  {lang.language} - {lang.proficiency}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;