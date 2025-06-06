import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface CreativeTemplateProps {
  preview?: boolean;
  forExport?: boolean;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ preview = false, forExport = false }) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, certifications, languages, projects } = resumeData;
  
  if (preview) {
    return (
      <div className="scale-[0.4] origin-top-left transform w-[250%] h-[250%] bg-white">
        <div className="grid grid-cols-12">
          <div className="col-span-4 bg-purple-800 text-white min-h-screen p-6">
            <div className="mb-8 text-center">
              <div className="w-24 h-24 mx-auto bg-purple-200 rounded-full mb-4"></div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-purple-200">Senior Software Engineer</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-purple-600 pb-1">Contact</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-purple-600 pb-1">Skills</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full bg-purple-900 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="ml-2 text-sm">JavaScript</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-purple-900 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="ml-2 text-sm">React</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-8 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">About Me</h2>
              <p className="text-gray-700">Experienced software engineer with 8+ years of expertise in building scalable web applications.</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">Experience</h2>
              <div className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Senior Software Engineer</h3>
                  <span className="text-gray-600">2019 - Present</span>
                </div>
                <p className="text-purple-800">Tech Company Inc., New York</p>
                <p className="text-gray-700 mt-1">Led development of cloud-based solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const containerClass = forExport 
    ? "bg-white min-h-screen" 
    : "bg-white";
  
  return (
    <div className={containerClass}>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 bg-purple-800 text-white md:min-h-screen p-6">
          <div className="mb-8 text-center">
            <div className="w-24 h-24 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-4">
              {personalInfo.firstName && personalInfo.lastName && (
                <span className="text-purple-800 text-2xl font-bold">
                  {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h1>
            <p className="text-purple-200">{personalInfo.jobTitle}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b border-purple-600 pb-1">Contact</h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-3" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedIn && (
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-3" />
                  <span>{personalInfo.linkedIn}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center">
                  <Github className="h-4 w-4 mr-3" />
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>
          
          {skills.length > 0 && skills[0].name && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-purple-600 pb-1">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full bg-purple-900 rounded-full h-2.5">
                      <div 
                        className="bg-white h-2.5 rounded-full" 
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {languages.length > 0 && languages[0].language && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-purple-600 pb-1">Languages</h2>
              <div className="space-y-1">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="col-span-12 md:col-span-8 p-8">
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">About Me</h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
          
          {experience.length > 0 && experience[0].company && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">Experience</h2>
              {experience.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{job.position}</h3>
                    <span className="text-gray-600">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                  </div>
                  <p className="text-purple-800">{job.company}, {job.location}</p>
                  <p className="text-gray-700 mt-1">{job.description}</p>
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
              <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-purple-800">{edu.institution}</p>
                  {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
          
          {certifications.length > 0 && certifications[0] && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">Certifications</h2>
              <ul className="list-disc list-inside">
                {certifications.map((cert, index) => (
                  <li key={index} className="text-gray-700">{cert}</li>
                ))}
              </ul>
            </div>
          )}
          
          {projects.length > 0 && projects[0].title && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-purple-800">{project.title}</h3>
                    <p className="text-gray-700 mt-1">{project.description}</p>
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="text-purple-800 hover:underline mt-2 inline-block"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;