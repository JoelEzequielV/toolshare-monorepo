import React from 'react';

interface ToolCardProps {
  name: string;
  description: string;
  available?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ name, description, available = true }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '1rem',
      borderRadius: '8px',
      background: available ? '#e8f5e9' : '#ffebee'
    }}>
      <h3>{name}</h3>
      <p>{description}</p>
      <small>{available ? 'Disponible' : 'Prestada'}</small>
    </div>
  );
};
