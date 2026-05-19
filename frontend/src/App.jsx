import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import { getComplaints } from "./services/api";

function App() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getComplaints();
        setComplaints(response.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };
    fetchComplaints();
  }, []);

  const refreshComplaints = async () => {
    try {
      const response = await getComplaints();
      setComplaints(response.data);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <DashboardCards complaints={complaints} />
      <ComplaintForm onComplaintAdded={refreshComplaints} />
      <ComplaintList complaints={complaints} onComplaintUpdated={refreshComplaints} />
    </div>
  );
}

export default App;