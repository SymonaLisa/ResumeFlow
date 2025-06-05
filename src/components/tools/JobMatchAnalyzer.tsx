import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { CheckCircle, AlertCircle, PlusCircle, ArrowRight } from 'lucide-react';

const JobMatchAnalyzer: React.FC = () => {
  const { resumeData, setJobDescriptionMatch, setSuggestions } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [keywordMatches, setKeywordMatches] = useState<{keyword: string; found: boolean}[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [suggestions, setLocalSuggestions] = useState<string[]>([]);
  
  const analyzeJobMatch = () => {
    if (!jobDescription.trim()) return;
    
    setAnalyzing(true);
    
    // Simulate analysis with setTimeout
    setTimeout(() => {
      // Extract keywords from job description (simulated)
      const keywords = extractKeywords(jobDescription);
      
      // Check if keywords exist in resume
      const matches = keywords.map(keyword => {
        const found = checkKeywordInResume(keyword, resumeData);
        return { keyword, found };
      });
      
      // Calculate match percentage
      const foundCount = matches.filter(match => match.found).length;
      const matchPercentage = Math.round((foundCount / keywords.length) * 100);
      
      // Get missing keywords
      const missing = matches
        .filter(match => !match.found)
        .map(match => match.keyword);
      
      // Generate suggestions (simulated)
      const generatedSuggestions = generateSuggestions(missing, resumeData);
      
      setKeywordMatches(matches);
      setMissingKeywords(missing);
      setMatchScore(matchPercentage);
      setLocalSuggestions(generatedSuggestions);
      
      // Update context
      setJobDescriptionMatch(matchPercentage);
      setSuggestions(generatedSuggestions);
      
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };
  
  // Simulated keyword extraction
  const extractKeywords = (text: string): string[] => {
    // This is a simplified simulation
    // In a real implementation, this would use NLP to extract relevant keywords
    const words = text.toLowerCase().split(/\s+/);
    
    // Common technical skills and job requirements
    const commonKeywords = [
      'javascript', 'react', 'node', 'python', 'java', 'c#', 'agile', 
      'project management', 'leadership', 'communication', 'teamwork',
      'frontend', 'backend', 'fullstack', 'cloud', 'aws', 'azure',
      'analytics', 'data', 'machine learning', 'ai', 'product',
      'marketing', 'sales', 'customer', 'service', 'support'
    ];
    
    return commonKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
  };
  
  // Check if keyword exists in resume
  const checkKeywordInResume = (keyword: string, data: any): boolean => {
    const resumeText = JSON.stringify(data).toLowerCase();
    return resumeText.includes(keyword.toLowerCase());
  };
  
  // Generate suggestions based on missing keywords
  const generateSuggestions = (missing: string[], data: any): string[] => {
    if (missing.length === 0) return ["Your resume already matches well with this job description!"];
    
    const suggestions = [];
    
    if (missing.includes('javascript') || missing.includes('react')) {
      suggestions.push("Add specific JavaScript or React projects to your experience section");
    }
    
    if (missing.includes('leadership') || missing.includes('management')) {
      suggestions.push("Highlight leadership responsibilities in your work experience");
    }
    
    if (missing.includes('communication') || missing.includes('teamwork')) {
      suggestions.push("Include examples of team collaboration in your experience descriptions");
    }
    
    if (missing.some(kw => ['aws', 'azure', 'cloud'].includes(kw))) {
      suggestions.push("Mention any cloud technologies you've worked with in your skills section");
    }
    
    // Add some generic suggestions if we don't have specific ones
    if (suggestions.length < 3) {
      suggestions.push("Update your summary to include keywords from the job description");
      suggestions.push("Add more quantifiable achievements to your experience section");
      suggestions.push("Consider adding certifications relevant to the missing skills");
    }
    
    return suggestions;
  };
  
  const getScoreColor = () => {
    if (matchScore >= 80) return 'text-green-600';
    if (matchScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Description Match Analyzer</h2>
        <p className="text-gray-600">
          Compare your resume against a specific job description to see how well you match and get improvement suggestions.
        </p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Paste Job Description
        </label>
        <textarea
          id="jobDescription"
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-8 text-center">
        <button
          onClick={analyzeJobMatch}
          disabled={!jobDescription.trim() || analyzing}
          className={`px-6 py-3 rounded-md transition-colors duration-300 ${
            !jobDescription.trim() || analyzing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-900 text-white hover:bg-blue-800'
          }`}
        >
          {analyzing ? (
            <>
              <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              Analyzing...
            </>
          ) : (
            'Analyze Match'
          )}
        </button>
      </div>
      
      {analysisComplete && (
        <div>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
            <div className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>{matchScore}%</div>
            <p className="text-gray-700">Job Match Score</p>
            
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    matchScore >= 80 ? 'bg-green-600' : matchScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${matchScore}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Matches</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                {keywordMatches.length > 0 ? (
                  <div className="space-y-2">
                    {keywordMatches.map((match, index) => (
                      <div key={index} className="flex items-center">
                        {match.found ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span className={match.found ? 'text-gray-800' : 'text-gray-500'}>
                          {match.keyword}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No keywords analyzed yet.</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                {suggestions.length > 0 ? (
                  <ul className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Analyze a job description to get personalized suggestions.</p>
                )}
              </div>
            </div>
          </div>
          
          {missingKeywords.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Missing Keywords</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((keyword, index) => (
                    <div key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {keyword}
                    </div>
                  ))}
                </div>
                
                <button 
                  className="flex items-center text-blue-900 hover:text-blue-700 mt-4 text-sm font-medium"
                  onClick={() => {/* Would add these to resume */}}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add these keywords to your resume
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Pro Tip</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Tailoring your resume for each job application can increase your chances of getting an interview by up to 50%. 
                    Focus on adding the missing keywords and skills that are most relevant to the position.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatchAnalyzer;