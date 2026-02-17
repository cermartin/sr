import React from 'react';

const BUILD_NUMBER = 1;

const BuildBadge: React.FC = () => (
  <div className="fixed top-20 right-4 z-40 bg-black/60 text-white px-2 py-0.5 rounded text-[10px] font-mono">
    v{BUILD_NUMBER}
  </div>
);

export default BuildBadge;
