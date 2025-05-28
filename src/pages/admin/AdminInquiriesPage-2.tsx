import React, { useState } from 'react';
import { Mail, Download, Trash2, Search, ExternalLink, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProjects } from '../../context/ProjectContext';
import { Inquiry } from '../../types';

const AdminInquiriesPage = () => {
  const { inquiries, deleteInquiry } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentInquiry, setCurrentInquiry] = useState<Inquiry | null>(null);
  const [selectedInquiries, setSelectedInquiries] = useState<string[]>([]);
  
  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.project_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Open delete confirmation modal
  const openDeleteModal = (inquiry: Inquiry) => {
    setCurrentInquiry(inquiry);
    setIsDeleteModalOpen(true);
  };
  
  // Handle inquiry deletion
  const handleDeleteConfirm = () => {
    if (!currentInquiry) return;
    
    deleteInquiry(currentInquiry.id);
    setIsDeleteModalOpen(false);
    
    // Remove from selected if it was selected
    if (selectedInquiries.includes(currentInquiry.id)) {
      setSelectedInquiries(selectedInquiries.filter(id => id !== currentInquiry.id));
    }
  };
  
  // Handle checkbox selection
  const handleSelect = (id: string) => {
    if (selectedInquiries.includes(id)) {
      setSelectedInquiries(selectedInquiries.filter(selectedId => selectedId !== id));
    } else {
      setSelectedInquiries([...selectedInquiries, id]);
    }
  };
  
  // Handle select/deselect all
  const handleSelectAll = () => {
    if (selectedInquiries.length === filteredInquiries.length) {
      setSelectedInquiries([]);
    } else {
      setSelectedInquiries(filteredInquiries.map(inquiry => inquiry.id));
    }
  };
  
  // Export selected inquiries as CSV
  const exportAsCSV = () => {
    if (selectedInquiries.length === 0) return;
    
    const selectedData = inquiries.filter(inquiry => selectedInquiries.includes(inquiry.id));
    
    // Create CSV header
    let csv = 'Name,Email,Project Type,Budget,Date,Message\n';
    
    // Add rows
    selectedData.forEach(inquiry => {
      const date = new Date(inquiry.date).toLocaleDateString();
      // Escape quotes in message and wrap in quotes
      const escapedMessage = `"${inquiry.message?.replace(/"/g, '""') || ''}"`;
      
      csv += `${inquiry.name || ''},${inquiry.email || ''},${inquiry.project_type || ''},${inquiry.budget || ''},${date},${escapedMessage}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inquiries.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Send email to selected inquiries
  const sendEmail = () => {
    if (selectedInquiries.length === 0) return;
    
    const selectedData = inquiries.filter(inquiry => selectedInquiries.includes(inquiry.id));
    const emailAddresses = selectedData.map(inquiry => inquiry.email).join(',');
    
    window.open(`mailto:${emailAddresses}`);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Client Inquiries</h1>
            <p className="text-slate-500">Manage and respond to project inquiries from potential clients.</p>
          </div>
        </div>
        
        {/* Search and Actions */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search inquiries by name, email, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={exportAsCSV}
                disabled={selectedInquiries.length === 0}
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                  selectedInquiries.length > 0
                    ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                    : 'border-slate-300 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              
              <button
                onClick={sendEmail}
                disabled={selectedInquiries.length === 0}
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                  selectedInquiries.length > 0
                    ? 'border-green-600 text-green-600 hover:bg-green-50'
                    : 'border-slate-300 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </button>
            </div>
          </div>
        </div>
        
        {/* Inquiries Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          {filteredInquiries.length === 0 ? (
            <div className="p-6 text-center">
              <div className="p-3 bg-slate-100 inline-flex rounded-full mb-4">
                <Mail className="h-6 w-6 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No inquiries found</h3>
              <p className="text-slate-500">
                {inquiries.length === 0 
                  ? "You haven't received any project inquiries yet." 
                  : "No inquiries match your search criteria."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedInquiries.length === filteredInquiries.length && filteredInquiries.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Project Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedInquiries.includes(inquiry.id)}
                          onChange={() => handleSelect(inquiry.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{inquiry.name}</div>
                        <div className="text-sm text-blue-600">
                          <a href={`mailto:${inquiry.email}`} className="hover:underline">
                            {inquiry.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex space-x-2 mb-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              inquiry.project_type?.toLowerCase() === 'iot' 
                                ? 'bg-green-100 text-green-800' 
                                : inquiry.project_type?.toLowerCase() === 'blockchain'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                            }`}>
                              {inquiry.project_type}
                            </span>
                            
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                              {inquiry.budget}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-600 line-clamp-2">{inquiry.message}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(inquiry.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => openDeleteModal(inquiry)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <a
                            href={`mailto:${inquiry.email}?subject=Re: Project Inquiry&body=Hello ${inquiry.name},%0D%0A%0D%0AThank you for your inquiry about a ${inquiry.project_type} project.%0D%0A%0D%0A`}
                            className="text-green-600 hover:text-green-800 p-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 bg-red-100 rounded-full mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Delete Inquiry</h2>
              <p className="text-slate-600">
                Are you sure you want to delete the inquiry from {currentInquiry.name}? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminInquiriesPage;