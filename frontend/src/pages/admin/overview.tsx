import React, { useEffect } from "react";

const Overview: React.FC = () => {
  useEffect(() => {
    document.title = "Overview | Jelo ADMIN";
  }, []);
  return (
    <>
      <span>Overview</span>
    </>
  );
};

export default Overview;
