import { createRoot } from 'react-dom/client';
import { vi } from 'vitest';

// Créez un mock pour la méthode render
const renderMock = vi.fn();

// Mock du module react-dom/client
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: renderMock,
  })),
}));

describe('main.tsx bootstrap', () => {
  test('calls createRoot with the #root element and renders the app tree', async () => {
    // Préparez un conteneur dans le DOM
    document.body.innerHTML = '<div id="root"></div>';

    // Import dynamique pour déclencher l'exécution de main.tsx
    await import('./main.tsx');

    const rootElement = document.getElementById('root');

    // Vérifier que createRoot est appelé avec l'élément #root
    expect(createRoot).toHaveBeenCalledWith(rootElement);

    // Vérifier que la méthode render a été appelée
    expect(renderMock).toHaveBeenCalled();

    // Optionnel : On peut vérifier que l'arbre rendu possède des propriétés attendues
    const renderedTree = renderMock.mock.calls[0][0];
    expect(renderedTree).toBeDefined();
    // Par exemple, vérifier qu'il contient AuthProvider ou StrictMode peut se faire via snapshot ou autres assertions spécifiques
  });
});
