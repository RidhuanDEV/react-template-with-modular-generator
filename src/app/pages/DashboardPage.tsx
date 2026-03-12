const DashboardPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to the development starter dashboard.</p>
      </div>
      <div className="page-content">
        <div className="dashboard-grid">
          <div className="card">
            <h3>Getting Started</h3>
            <p>
              This starter gives new teams a clean base to begin development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
