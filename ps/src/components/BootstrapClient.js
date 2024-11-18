'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log("Bootstrap JS carregado com sucesso.");
      })
      .catch(err => {
        console.error("Erro ao carregar Bootstrap JS:", err);
      });
  }, []);

  return null;
}