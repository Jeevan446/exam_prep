import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Footer from "../../components/Footer";

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 60 },
  {name:'april',value:1800}
];

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
    
      <NavBar />

    
      <div className="flex flex-1">
        <SideBar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-semibold mb-6">Analytics Dashboard</h1>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-[200px] bg-white rounded-lg shadow p-5">
              <p className="font-medium mb-2">Users Growth</p>
              <ResponsiveContainer width="100%" height="100%" className="outline-none">
                <LineChart data={data} className='border-none focus:outline-none'>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[200px] bg-white rounded-lg shadow p-4">
              <p className="font-medium">Revenue</p>
            </div>

            <div className="h-[200px] bg-white rounded-lg shadow p-4">
              <p className="font-medium">Orders</p>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AnalyticsPage
