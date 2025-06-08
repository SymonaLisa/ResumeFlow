import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Code, Terminal } from 'lucide-react';

interface TechTemplateProps {
  preview?: boolean;
  forExport?: boolean;
}

const TechTemplate: React.FC<TechTemplateProps> = ({ preview = false, forExport = false }) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, certifications, languages, projects } = resumeData;
  
  if (preview) {
    return (
      <div className="scale-[0.4] origin-top-left transform w-[250%] h-[250%] bg-gray-50">
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6">
          <div className="flex items-center mb-4">
            <Terminal className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-blue-200">Full Stack Developer</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-2" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center">
              <Github className="h-3 w-3 mr-2" />
              <span>github.com/johndoe</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-2" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-2" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Code className="h-5 w-5 mr-2 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-xs font-semibold text-blue-900">Frontend</div>
                <div className="text-xs text-blue-700">React, Vue.js</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-xs font-semibold text-green-900">Backend</div>
                <div className="text-xs text-green-700">Node.js, Python</div>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <div className="text-xs font-semibold text-purple-900">Database</div>
                <div className="text-xs text-purple-700">MongoDB, PostgreSQL</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Experience</h2>
            <div className="border-l-2 border-blue-600 pl-4">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900">Senior Developer</h3>
                <p className="text-sm text-gray-600">Tech Startup • 2020 - Present</p>
                <p className="text-xs text-gray-700 mt-1">Built scalable web applications using React and Node.js.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Projects</h2>
            <div className="space-y-2">
              <div className="bg-gray-50 p-3 rounded">
                <h3 className="font-semibold text-sm">E-commerce Platform</h3>
                <p className="text-xs text-gray-600">React, Node.js, MongoDB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const containerClass = forExport 
    ? "bg-gray-50 min-h-screen" 
    : "bg-gray-50";
  
  return (
    <div className={containerClass}>
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-8">
        <div className="flex items-center mb-6">
          <Terminal className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h1>
            <p className="text-xl text-blue-200">{personalInfo.jobTitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 mr-2" />
              <span>{personalInfo.github}</span>
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
      
      <div className="p-8 bg-white">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
        
        {skills.length > 0 && skills[0].name && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 mr-2 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Group skills by category for better organization */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Frontend</h3>
                <div className="space-y-1">
                  {skills.filter(skill => 
                    ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'tailwind'].some(tech => 
                      skill.name.toLowerCase().includes(tech)
                    )
                  ).map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">{skill.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full mr-1 ${
                            i < skill.level ? 'bg-blue-600' : 'bg-blue-200'
                          }`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Backend</h3>
                <div className="space-y-1">
                  {skills.filter(skill => 
                    ['node', 'python', 'java', 'php', 'ruby', 'go', 'rust', 'c#', 'express', 'django', 'flask'].some(tech => 
                      skill.name.toLowerCase().includes(tech)
                    )
                  ).map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-green-700">{skill.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full mr-1 ${
                            i < skill.level ? 'bg-green-600' : 'bg-green-200'
                          }`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Tools & Others</h3>
                <div className="space-y-1">
                  {skills.filter(skill => 
                    !['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'tailwind', 
                      'node', 'python', 'java', 'php', 'ruby', 'go', 'rust', 'c#', 'express', 'django', 'flask'].some(tech => 
                      skill.name.toLowerCase().includes(tech)
                    )
                  ).map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">{skill.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full mr-1 ${
                            i < skill.level ? 'bg-purple-600' : 'bg-purple-200'
                          }`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {experience.length > 0 && experience[0].company && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
            <div className="border-l-4 border-blue-600 pl-6">
              {experience.map((job, index) => (
                <div key={index} className="mb-6 relative">
                  <div className="absolute -left-8 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{job.position}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {job.startDate} - {job.current ? 'Present' : job.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                  <p className="text-gray-700 mb-3">{job.description}</p>
                  {job.achievements.length > 0 && job.achievements[0] && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {projects.length > 0 && projects[0].title && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && education[0].institution && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {certifications.length > 0 && certifications[0] && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <span className="text-gray-700 font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {languages.length > 0 && languages[0].language && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Languages</h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
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

export default TechTemplate;