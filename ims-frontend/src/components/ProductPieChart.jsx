import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import useCSVStore from '../store/useCSVStore';

const ProductPieChart = () => {
  const { products, loading, error, fetchProducts, getChartData } = useCSVStore();
  
  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const chartData = getChartData({ products });
  const totalItems = chartData.reduce((sum, item) => sum + item.value, 0);

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884D8', '#82CA9D', '#FF6B9D', '#A78BFA'
  ];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Hide label if less than 5%
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading products...</p>
          <p className="text-gray-500 mt-2">Fetching data from API</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md">
          <div className="text-center mb-6">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Data</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left">
              <p className="text-sm text-red-700 font-semibold mb-2">Common issues:</p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>Server Error</li>
              </ul>
            </div>
            <button 
              onClick={fetchProducts}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              🔄 Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No Data State
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
          <p className="text-gray-600 mb-4">There are no products available to display.</p>
          <button 
            onClick={fetchProducts}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  // Main Chart View
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-4xl font-bold text-gray-600 mb-2">
            📊 Product Distribution by Category
          </h1>
          <p className="text-gray-500">Real-time inventory analysis</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white transform hover:scale-105 transition-transform">
            <p className="text-blue-100 text-sm uppercase mb-1">Total Items</p>
            <p className="text-4xl font-bold">{totalItems}</p>
            <p className="text-blue-100 text-xs mt-1">in stock</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white transform hover:scale-105 transition-transform">
            <p className="text-green-100 text-sm uppercase mb-1">Categories</p>
            <p className="text-4xl font-bold">{chartData.length}</p>
            <p className="text-green-100 text-xs mt-1">unique types</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white transform hover:scale-105 transition-transform">
            <p className="text-purple-100 text-sm uppercase mb-1">Products</p>
            <p className="text-4xl font-bold">{products.length}</p>
            <p className="text-purple-100 text-xs mt-1">total items</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-8 shadow-inner">
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={160}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={3}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} items`, name]}
                contentStyle={{ 
                  borderRadius: '10px', 
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  padding: '12px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={60}
                formatter={(value, entry) => {
                  const percentage = ((entry.payload.value / totalItems) * 100).toFixed(1);
                  return `${value}: ${entry.payload.value} items (${percentage}%)`;
                }}
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-600 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-3 py-1 mr-3 text-lg">
              📦
            </span>
            Category Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chartData.map((item, index) => {
              const percentage = ((item.value / totalItems) * 100).toFixed(1);
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200"
                >
                  <div className="flex items-center flex-1">
                    <div 
                      className="w-8 h-8 rounded-full mr-4 flex-shrink-0 shadow-md"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">{item.name}</p>
                      <div className="flex items-center mt-1">
                        <div className="bg-gray-200 rounded-full h-2 w-32 mr-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                        <p className="text-gray-500 text-sm">{percentage}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                    <p className="text-gray-500 text-sm">items</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center">
          <button 
            onClick={fetchProducts}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPieChart;