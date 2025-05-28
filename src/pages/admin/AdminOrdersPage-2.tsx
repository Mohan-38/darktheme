import React, { useState } from 'react';
import { Calendar, Search, ChevronDown, Filter, Download, Mail } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProjects } from '../../context/ProjectContext';
import { Order } from '../../types';

const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.projectTitle && order.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle checkbox selection
  const handleSelect = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(selectedId => selectedId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };
  
  // Handle select/deselect all
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };
  
  // Export selected orders as CSV
  const exportAsCSV = () => {
    if (selectedOrders.length === 0) return;
    
    const selectedData = orders.filter(order => selectedOrders.includes(order.id));
    
    // Create CSV header
    let csv = 'Customer Name,Email,Project,Price,Status,Date\n';
    
    // Add rows
    selectedData.forEach(order => {
      const date = new Date(order.date).toLocaleDateString();
      csv += `${order.customerName},${order.customerEmail},${order.projectTitle},${order.price},${order.status},${date}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orders.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  // Calculate total revenue
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.price, 0);
  
  // Unique status values
  const statusOptions = Array.from(new Set(orders.map(order => order.status)));

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
            <p className="text-slate-500">Manage and track customer orders for your projects.</p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-500 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold text-slate-900">{orders.length}</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-500 mb-1">Pending Orders</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {orders.filter(order => order.status === 'pending').length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-500 mb-1">Completed Orders</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {orders.filter(order => order.status === 'completed').length}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders by customer name or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <button
                  className="inline-flex items-center px-3 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter || 'All'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button 
                    onClick={() => setStatusFilter(null)}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    All
                  </button>
                  
                  {statusOptions.map(status => (
                    <button 
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={exportAsCSV}
                disabled={selectedOrders.length === 0}
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                  selectedOrders.length > 0
                    ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                    : 'border-slate-300 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          {filteredOrders.length === 0 ? (
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium text-slate-900 mb-1">No orders found</h3>
              <p className="text-slate-500">
                {orders.length === 0 
                  ? "You haven't received any orders yet." 
                  : "No orders match your search criteria."}
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
                          checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelect(order.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{order.customerName}</div>
                        <div className="text-sm text-blue-600">
                          <a href={`mailto:${order.customerEmail}`} className="hover:underline">
                            {order.customerEmail}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{order.projectTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">${order.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative group">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                            {order.status}
                            <ChevronDown className="ml-1 h-3 w-3" />
                          </span>
                          
                          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'pending')}
                              className="block w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-slate-100"
                            >
                              Pending
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-slate-100"
                            >
                              Processing
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="block w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-slate-100"
                            >
                              Completed
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-slate-100"
                            >
                              Cancelled
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`mailto:${order.customerEmail}`}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
