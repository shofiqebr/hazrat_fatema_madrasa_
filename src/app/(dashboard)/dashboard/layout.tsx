"use client"
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaUser,
  FaUsers,
  FaBuilding,
  FaDollarSign,
  FaCalendarAlt,
  FaSignOutAlt,
  FaChartBar,
  FaCog
} from 'react-icons/fa';

type DashboardLayoutProps = {
  children: ReactNode;
};

type MenuItem = {
  key: string;
  icon: ReactNode;
  label: string;
  roles: ('admin' | 'manager' | 'employee')[];
  path: string;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const userRole: 'admin' | 'manager' | 'employee' = 'admin'; // Replace with your auth logic

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <FaChartBar className="h-5 w-5" />,
      label: 'Dashboard',
      roles: ['admin', 'manager', 'employee'],
      path: '/dashboard'
    },
    {
      key: 'employees',
      icon: <FaUsers className="h-5 w-5" />,
      label: 'Employees',
      roles: ['admin', 'manager'],
      path: '/dashboard/employees'
    },
    {
      key: 'departments',
      icon: <FaBuilding className="h-5 w-5" />,
      label: 'Departments',
      roles: ['admin'],
      path: '/dashboard/departments'
    },
    {
      key: 'payroll',
      icon: <FaDollarSign className="h-5 w-5" />,
      label: 'Payroll',
      roles: ['admin', 'manager'],
      path: '/dashboard/payroll'
    },
    {
      key: 'leave',
      icon: <FaCalendarAlt className="h-5 w-5" />,
      label: 'Leave Management',
      roles: ['admin', 'manager', 'employee'],
      path: '/dashboard/leave'
    },
    {
      key: 'settings',
      icon: <FaCog className="h-5 w-5" />,
      label: 'Settings',
      roles: ['admin', 'manager', 'employee'],
      path: '/dashboard/settings'
    }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-4 bg-indigo-600">
            <span className="text-white font-bold">HR Portal</span>
            <button onClick={() => setSidebarOpen(false)} className="text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4">
              {filteredMenuItems.map(item => (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.path
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
              <button className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 w-full">
                <FaSignOutAlt className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-[#1F2936]">
          <div className="flex items-center h-16 px-4 bg-[#0D9488]">
            <span className="text-white font-bold">HR Portal</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {filteredMenuItems.map(item => (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.path
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
              <button className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75 w-full">
                <FaSignOutAlt className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-[#0D9488] shadow-sm text-white">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="md:hidden text-gray-500 hover:text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaUser className="h-8 w-8 text-white" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </div>
              <span className="font-medium">Welcome, {userRole}</span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}