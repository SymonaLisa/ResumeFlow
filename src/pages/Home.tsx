import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Zap, Award, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Create ATS-Friendly Resumes That Get You Hired
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Our AI-powered resume builder creates tailored, professional resumes optimized for Applicant Tracking Systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/builder" 
                  className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-md hover:bg-blue-50 transition-colors duration-300 text-center"
                >
                  Create Your Resume
                </Link>
                <Link 
                  to="/templates" 
                  className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors duration-300 text-center"
                >
                  View Templates
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Resume Builder" 
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Our Resume Builder?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform helps you create professional, ATS-optimized resumes tailored to your industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<CheckCircle className="h-10 w-10 text-blue-900" />}
              title="ATS-Optimized"
              description="Our intelligent algorithms ensure your resume passes through Applicant Tracking Systems with ease."
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-blue-900" />}
              title="Smart Suggestions"
              description="Get industry-specific keyword recommendations to make your resume stand out to recruiters."
            />
            <FeatureCard 
              icon={<Award className="h-10 w-10 text-blue-900" />}
              title="Professional Templates"
              description="Choose from multiple professionally designed templates tailored for different industries."
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-blue-900" />}
              title="Multiple Export Options"
              description="Download your resume in PDF, DOCX, or HTML formats to suit all application requirements."
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-blue-900" />}
              title="Job Description Matching"
              description="Our AI analyzes job descriptions to help you tailor your resume for specific positions."
            />
            <FeatureCard 
              icon={<CheckCircle className="h-10 w-10 text-blue-900" />}
              title="Privacy First"
              description="Your data stays on your device. We prioritize your privacy and security."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Create Your Professional Resume?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Join thousands of job seekers who have successfully landed interviews with our resume builder.
          </p>
          <Link 
            to="/builder" 
            className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition-colors duration-300"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;