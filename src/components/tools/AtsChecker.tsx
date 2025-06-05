import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const AtsChecker: React.FC = () => {
  const { resumeData, setAtsScore } = useResume();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [issues, setIssues] = useState<{category: string; description: string; severity: 'high' | 'medium' | 'low'}[]>([]);
  const [score, setScore] = useState(0);
  
  const checkAtsCompatibility = () => {
    setAnalyzing(true);
    
    // Simulate analysis with setTimeout
    setTimeout(() => {
      // Perform checks on resume data
      const foundIssues = [];
      let calculatedScore = 100;
      
      // Check for contact info
      if (!resumeData.personalInfo.email || !resumeData.personalInfo.phone) {
        foundIssues.push({
          category: 'Contact Information',
          description: 'Missing email or phone number. These are essential for recruiters to contact you.',
          severity: 'high'
        });
        calculatedScore -= 15;
      }
      
      // Check for job title
      if (!resumeData.personalInfo.jobTitle) {
        foundIssues.push({
          category: 'Job Title',
          description: 'No job title specified. Include a clear professional title that matches your target role.',
          severity: 'medium'
        });
        calculatedScore -= 10;
      }
      
      // Check experience descriptions
      const hasEmptyExperience = resumeData.experience.some(
        exp => exp.company && (!exp.description || exp.description.length < 30)
      );
      if (hasEmptyExperience) {
        foundIssues.push({
          category: 'Experience Details',
          description: 'Some work experiences lack detailed descriptions. Add specific achievements and responsibilities.',
          severity: 'high'
        });
        calculatedScore -= 15;
      }
      
      // Check for skills
      if (resumeData.skills.length < 5 || resumeData.skills.some(skill => !skill.name)) {
        foundIssues.push({
          category: 'Skills Section',
          description: 'Include at least 5 relevant skills that match your target role and industry.',
          severity: 'medium'
        });
        calculatedScore -= 10;
      }
      
      // Check for education
      if (!resumeData.education[0].institution || !resumeData.education[0].degree) {
        foundIssues.push({
          category: 'Education',
          description: 'Education details are incomplete. Add your educational background even if experience is your focus.',
          severity: 'medium'
        });
        calculatedScore -= 10;
      }
      
      // Format issues (missing dates, etc.)
      const hasDateIssues = resumeData.experience.some(
        exp => exp.company && (!exp.startDate || (!exp.endDate && !exp.current))
      );
      if (hasDateIssues) {
        foundIssues.push({
          category: 'Date Formatting',
          description: 'Missing dates in work experience. Use consistent date formats throughout your resume.',
          severity: 'low'
        });
        calculatedScore -= 5;
      }
      
      // Ensure score is within 0-100 range
      const finalScore = Math.max(0, Math.min(100, calculatedScore));
      
      setIssues(foundIssues);
      setScore(finalScore);
      setAtsScore(finalScore);
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 1500);
  };
  
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getSeverityBadge = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High Priority</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium Priority</span>;
      case 'low':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Low Priority</span>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">ATS Compatibility Checker</h2>
        <p className="text-gray-600">
          Check if your resume is optimized for Applicant Tracking Systems (ATS) used by employers.
        </p>
      </div>
      
      {!analysisComplete ? (
        <div className="text-center py-10">
          {analyzing ? (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
              <p className="text-gray-700">Analyzing your resume for ATS compatibility...</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-6">
                Our AI will scan your resume for potential issues that might prevent it from passing through ATS filters.
              </p>
              <button
                onClick={checkAtsCompatibility}
                className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
              >
                Check ATS Compatibility
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
            <div className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>{score}%</div>
            <p className="text-gray-700">ATS Compatibility Score</p>
            
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {issues.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues to Address</h3>
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{issue.category}</h4>
                      {getSeverityBadge(issue.severity)}
                    </div>
                    <p className="text-gray-700">{issue.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Great job!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your resume appears to be well-optimized for ATS systems. No significant issues were found.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">ATS Tips</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use standard section headings (Experience, Education, Skills)</li>
                    <li>Include keywords from the job description</li>
                    <li>Avoid tables, columns, and graphics that ATS may not parse correctly</li>
                    <li>Use standard fonts and simple formatting</li>
                    <li>Save your resume in PDF format when applying</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={checkAtsCompatibility}
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
            >
              Re-Check ATS Compatibility
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtsChecker;