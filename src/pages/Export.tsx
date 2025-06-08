import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { ArrowLeft, Download, File as FilePdf, FileText, File } from 'lucide-react';
import { exportResumeAsPDF } from '../utils/pdfExport';
import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';

const Export: React.FC = () => {
  const { selectedTemplate, resumeData } = useResume();
  const navigate = useNavigate();
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  
  const handleBack = () => {
    navigate('/preview');
  };
  
  const handleExportPDF = async () => {
    setExporting(true);
    setExportError(null);
    
    try {
      if (exportRef.current) {
        await exportResumeAsPDF(exportRef.current, resumeData, selectedTemplate);
      } else {
        throw new Error('Resume element not found');
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportError('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };
  
  const handleExport = (format: string) => {
    if (format === 'pdf') {
      handleExportPDF();
    } else {
      setExporting(true);
      setTimeout(() => {
        setExporting(false);
        alert(`${format.toUpperCase()} export coming soon!`);
      }, 1000);
    }
  };
  
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate forExport={true} />;
      case 'professional':
        return <ProfessionalTemplate forExport={true} />;
      case 'creative':
        return <CreativeTemplate forExport={true} />;
      default:
        return <ModernTemplate forExport={true} />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Export Your Resume</h1>
        <p className="text-gray-600 mb-10">
          Your resume is ready! Choose your preferred format to download.
        </p>
        
        {exportError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{exportError}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ExportCard 
            icon={<FilePdf className="h-12 w-12 text-red-500" />}
            title="PDF Format"
            description="Best for sending to employers and uploading to job sites."
            onClick={() => handleExport('pdf')}
            loading={exporting}
          />
          
          <ExportCard 
            icon={<FileText className="h-12 w-12 text-blue-500" />}
            title="DOCX Format"
            description="Editable format compatible with Microsoft Word."
            onClick={() => handleExport('docx')}
            loading={exporting}
            disabled={true}
            comingSoon={true}
          />
          
          <ExportCard 
            icon={<File className="h-12 w-12 text-purple-500" />}
            title="HTML Format"
            description="Perfect for your online portfolio or website."
            onClick={() => handleExport('html')}
            loading={exporting}
            disabled={true}
            comingSoon={true}
          />
        </div>
        
        {/* Visible resume preview for user to see */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Preview</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="transform scale-75 origin-top">
              {renderTemplate()}
            </div>
          </div>
        </div>
        
        {/* Hidden resume for PDF export - properly sized and positioned */}
        <div 
          ref={exportRef}
          className="fixed top-[-9999px] left-[-9999px] bg-white"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            padding: '0',
            margin: '0',
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }}
        >
          {renderTemplate()}
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-10">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                PDF export is fully functional! DOCX and HTML formats will be available in future updates.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Preview
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
          >
            Start New Resume
          </button>
        </div>
      </div>
    </div>
  );
};

interface ExportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  comingSoon?: boolean;
}

const ExportCard: React.FC<ExportCardProps> = ({ 
  icon, 
  title, 
  description, 
  onClick, 
  loading, 
  disabled = false,
  comingSoon = false
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all duration-300 ${
        disabled ? 'opacity-70' : 'hover:shadow-lg'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {comingSoon ? (
          <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
            Coming Soon
          </span>
        ) : (
          <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`flex items-center px-4 py-2 rounded-md w-full justify-center ${
              disabled 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-900 text-white hover:bg-blue-800'
            } transition-colors duration-300`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Download className="mr-2 h-5 w-5" />
            )}
            {loading ? 'Exporting...' : 'Download'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Export;