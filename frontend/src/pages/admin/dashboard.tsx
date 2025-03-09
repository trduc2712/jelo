import React, { useEffect } from 'react';

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = 'Dashboard | Jelo Admin';
  }, []);
  return (
    <>
      <span>Dashboard</span>
    </>
  );
};

export default Dashboard;
