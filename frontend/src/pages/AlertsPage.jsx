import { useEffect, useState } from 'react';
import api from '../api';
import { NavLink,useNavigate } from 'react-router-dom';


function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };
  useEffect(() => {
    api.get('alerts/').then((res) => setAlerts(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Triggered Alerts</h2>
        <NavLink to="/logs">
          <button className="btn btn-primary">Logs</button>
        </NavLink>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Service</th>
              {/* <th scope="col">Count</th> */}
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length > 0 ? (
              alerts.map((a) => (
                <tr key={a.id}>
                  <td>{new Date(a.timestamp).toLocaleString()}</td>
                  <td>{a.serviceName}</td>
                  {/* <td>{a.count}</td> */}
                  <td>
                    <span className={`badge bg-${getStatusColor(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No alerts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper function to color status badges
function getStatusColor(status) {
  switch (status) {
    case 'active':
      return 'danger';
    case 'resolved':
      return 'success';
    default:
      return 'secondary';
  }
}

export default AlertsPage;
