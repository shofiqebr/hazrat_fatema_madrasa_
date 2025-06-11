export default function DashboardPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Employees</p>
          <h3 className="text-3xl font-bold">4</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Departments</p>
          <h3 className="text-3xl font-bold">3</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Monthly Pay</p>
          <h3 className="text-3xl font-bold">$1900</h3>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Leave Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Leave Applied</p>
          <h3 className="text-2xl font-bold">2</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Leave Approved</p>
          <h3 className="text-2xl font-bold">2</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Leave Pending</p>
          <h3 className="text-2xl font-bold">1</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Leave Rejected</p>
          <h3 className="text-2xl font-bold">1</h3>
        </div>
      </div>
    </div>
  );
}