import React from 'react';
import { FileText, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-brand-900 to-accent-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6" />
              <span className="font-bold text-xl">ResumeFlow AI</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Create professional, ATS-friendly resumes tailored to your industry and career goals with the power of AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/builder" className="text-gray-300 hover:text-white transition-colors duration-300">Resume Builder</Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-white transition-colors duration-300">Templates</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">ATS Checker</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">Keyword Optimization</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">Resume Tips</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">Career Blog</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">FAQ</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors duration-300">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} ResumeFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;