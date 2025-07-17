import { useEffect, useState } from 'react';
import api from '../api';
import {  NavLink, useNavigate } from 'react-router-dom';

function LogsPage() {
  const [logs, setLogs] = useState([]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  useEffect(() => {
    api.get('logs/').then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Event Logs</h2>
        <NavLink to="/alerts">
          <button className="btn btn-primary">Alerts</button>
        </NavLink>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Timestamp</th>
              <th scope="col">Service</th>
              <th scope="col">Type</th>
              <th scope="col">Level</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.serviceName}</td>
                  <td>{log.eventType}</td>
                  <td>
                    <span className={`badge bg-${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper to add color to level
function getLevelColor(level) {
  switch (level) {
    case 'ERROR':
      return 'danger';
    case 'WARNING':
      return 'warning';
    case 'INFO':
      return 'info';
    case 'DEBUG':
      return 'secondary';
    default:
      return 'primary';
  }
}

export default LogsPage;
