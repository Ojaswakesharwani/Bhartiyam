import React from 'react';
import { OfficePortalModal } from '../components/OfficePortalModal';
import { useNavigate } from 'react-router-dom';

export const OfficePortalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <OfficePortalModal
        isOpen={true}
        onClose={() => navigate('/')}
      />
    </div>
  );
};
