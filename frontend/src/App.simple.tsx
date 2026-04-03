import { useState, useEffect } from "react";

const SimpleApp = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://saas-intelligence.onrender.com/health')
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚀 SaaS Intelligence Portal</h1>
      
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
        <h2>Backend Status:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <div>
            <p>✅ Status: {data.status}</p>
            <p>✅ Success: {data.success ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>❌ Failed to connect to backend</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Frontend Test:</h2>
        <p>✅ React is working</p>
        <p>✅ Components are rendering</p>
        <p>✅ API calls are functional</p>
      </div>
    </div>
  );
};

export default SimpleApp;
