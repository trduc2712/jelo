import React, { useEffect } from "react";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "404 | JELO";
  }, []);

  return (
    <div className="font-[Arial] h-screen flex items-center justify-center">
      <span className="text-xl font-bold text-[#bb4d00]">
        404 | This page could not be found.
      </span>
    </div>
  );
};

export default NotFound;
