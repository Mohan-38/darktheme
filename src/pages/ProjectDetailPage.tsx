import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Tag, 
  Calendar, 
  Info, 
  CheckCircle, 
  XCircle,
  MessageCircle
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, addOrder } = useProjects();
  const project = projects.find(p => p.id === id);
  
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-28 pb-16 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mb-4">Project Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The project you are looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/projects" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'iot':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'blockchain':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'web':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would process payment
    // For demo purposes, just add to orders
    addOrder({
      projectId: project.id,
      projectTitle: project.title,
      customerName: buyerName,
      customerEmail: buyerEmail,
      price: project.price,
      status: 'pending'
    });
    
    setOrderSuccess(true);
    
    // Reset form
    setBuyerName('');
    setBuyerEmail('');
    
    // Close modal after delay
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(false);
    }, 3000);
  };

  // Format price in Indian Rupees
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(project.price);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to projects
          </button>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
          {/* Project Image */}
          <div className="relative h-64 md:h-80 bg-slate-200 dark:bg-slate-700">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex space-x-2">
              <span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}
              >
                <Tag className="mr-1.5 h-4 w-4" />
                {project.category}
              </span>
              
              {project.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-700 text-amber-800 dark:text-amber-200">
                  Featured
                </span>
              )}
            </div>
          </div>
          
          {/* Project Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-200 mb-4">{project.title}</h1>
                
                <div className="flex items-center text-slate-500 dark:text-slate-400 mb-6">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Last updated: {new Date(project.updatedAt || Date.now()).toLocaleDateString()}</span>
                </div>
                
                <div className="prose max-w-none text-slate-700 dark:text-slate-300 mb-8">
                  <p className="mb-4 text-lg">{project.description}</p>
                  
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">Features</h2>
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {project.technicalDetails && (
                    <>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">Technical Details</h2>
                      <p className="mb-6">{project.technicalDetails}</p>
                    </>
                  )}
                </div>
              </div>
              
              {/* Project Purchase Card */}
              <div className="md:w-1/3">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-200 mb-4">
                    {formattedPrice}
                  </div>
                  
                  <button 
                    onClick={() => setIsOrdering(true)}
                    className="w-full mb-4 inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Purchase Project
                  </button>
                  
                  <Link 
                    to="/contact" 
                    className="w-full inline-flex items-center justify-center px-5 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors duration-200"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Request Customization
                  </Link>
                  
                  <div className="mt-6">
                    <div className="flex items-start mb-4">
                      <Info className="h-5 w-5 text-slate-500 dark:text-slate-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <p className="font-medium mb-1">What you'll receive:</p>
                        <ul className="list-disc list-inside space-y-1 pl-1">
                          <li>Complete source code</li>
                          <li>Documentation</li>
                          <li>Installation guide</li>
                          <li>Support via email</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Modal */}
      {isOrdering && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6 md:p-8">
            {orderSuccess ? (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mb-2">Order Successful!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Thank you for your purchase. You'll receive an email with download instructions soon.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-200">Purchase Project</h2>
                  <button 
                    onClick={() => setIsOrdering(false)} 
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-700"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitOrder}>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-200">{project.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{project.category}</p>
                      </div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                        {formattedPrice}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200"
                        required
                      />
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        We'll send download instructions to this email
                      </p>
                    </div>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                      By purchasing, you agree to our terms and conditions.
                    </p>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Complete Purchase
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
