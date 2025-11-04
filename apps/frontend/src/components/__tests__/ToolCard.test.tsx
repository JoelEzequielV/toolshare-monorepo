import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToolCard } from '../ToolCard';

describe('ToolCard Component', () => {
  it('muestra correctamente los datos de la herramienta', () => {
    render(<ToolCard name="Martillo" description="Herramienta básica" available />);
    expect(screen.getByText('Martillo')).toBeInTheDocument();
    expect(screen.getByText('Herramienta básica')).toBeInTheDocument();
    expect(screen.getByText('Disponible')).toBeInTheDocument();
  });

  it('muestra el estado "Prestada" cuando no está disponible', () => {
    render(<ToolCard name="Taladro" description="Eléctrico" available={false} />);
    expect(screen.getByText('Prestada')).toBeInTheDocument();
  });
});
