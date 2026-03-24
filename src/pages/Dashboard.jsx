import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <Link to="/admin/posts">Manage Posts</Link>
      <br />
      <Link to="/admin/users">Manage Users</Link>
    </div>
  );
};

export default Dashboard;