import { BrowserRouter as Router } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

function App() {
  const title = "Ticket Support System";
  return (
    <Router>
      <div className="App">
        <div className="content">
          <h1>{title}</h1>
          <AdminDashboard />
        </div>
      </div>
    </Router>
  );
}

export default App;
