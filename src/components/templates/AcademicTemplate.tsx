import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, BookOpen, Award } from 'lucide-react';

interface AcademicTemplateProps {
  preview?: boolean;
  forExport?: boolean;
}

const AcademicTemplate: React.FC<AcademicTemplateProps> = ({ preview = false, forExport = false }) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, certifications, languages, projects } = resumeData;
  
  if (preview) {
    return (
      <div className="scale-[0.4] origin-top-left transform w-[250%] h-[250%] bg-white p-8">
        <div className="text-center mb-6 pb-4 border-b border-gray-300">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Dr. John Doe</h1>
          <p className="text-lg text-gray-700 mb-3">Professor of Computer Science</p>
          <div className="flex justify-center space-x-4 text-sm text-gray-600">
            <span>john.doe@university.edu</span>
            <span>•</span>
            <span>(123) 456-7890</span>
            <span>•</span>
            <span>University Campus</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Education</h2>
          <div className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-semibold">Ph.D. in Computer Science</h3>
              <span className="text-gray-600">2015</span>
            </div>
            <p className="text-gray-700">Stanford University</p>
            <p className="text-sm text-gray-600 italic">Dissertation: "Machine Learning Applications in Natural Language Processing"</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Academic Experience</h2>
          <div className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-semibold">Associate Professor</h3>
              <span className="text-gray-600">2018 - Present</span>
            </div>
            <p className="text-gray-700">University of California, Berkeley</p>
            <p className="text-sm text-gray-600">Teaching advanced courses in machine learning and artificial intelligence.</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Research Interests</h2>
          <p className="text-gray-700 text-sm">Machine Learning, Natural Language Processing, Artificial Intelligence, Deep Learning</p>
        </div>
      </div>
    );
  }
  
  const containerClass = forExport 
    ? "bg-white p-8 max-w-4xl mx-auto min-h-screen" 
    : "bg-white p-8 max-w-4xl mx-auto";
  
  return (
    <div className={containerClass}>
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className="text-xl text-gray-700 mb-4">{personalInfo.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
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
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Research Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}
      
      {education.length > 0 && education[0].institution && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-gray-700 font-medium">{edu.institution}</p>
              {edu.description && <p className="text-gray-600 italic mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {experience.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Academic Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{job.position}</h3>
                <span className="text-gray-600">
                  {job.startDate} - {job.current ? 'Present' : job.endDate}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-2">{job.company}, {job.location}</p>
              <p className="text-gray-700 mb-3">{job.description}</p>
              {job.achievements.length > 0 && job.achievements[0] && (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      
      {projects.length > 0 && projects[0].title && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Research Projects & Publications</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-gray-900">{project.title}</h3>
              <p className="text-gray-700 mt-1">{project.description}</p>
              {project.link && (
                <a href={project.link} className="text-blue-600 hover:text-blue-800 mt-1 inline-block">
                  View Publication
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {skills.length > 0 && skills[0].name && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Research Interests & Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {certifications.length > 0 && certifications[0] && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Awards & Honors</h2>
          <ul className="space-y-2">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-start">
                <Award className="h-4 w-4 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {languages.length > 0 && languages[0].language && (
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{lang.language}</span>
                <span className="text-gray-600">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicTemplate;