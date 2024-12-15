'use client';

import { useState, useEffect } from 'react';
import styles from './Lotes.module.css';

export default function Lotes() {
  const [selectedLote, setSelectedLote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [error, setError] = useState(null);

  // Função para carregar os lotes
  const loadLotes = async () => {
    try {
      const response = await fetch('/api/lotes');
      const data = await response.json();
      console.log('Dados carregados:', data); // Verifique os dados
      if (!Array.isArray(data)) {
        throw Error('Invalid data format');
      }
      setFilteredBanners(data);
    } catch (err) {
      console.error('Erro ao carregar lotes:', err);
      setError('Erro ao carregar lotes.');
    }
  };
  

  // Função para filtrar lotes por busca
  const searchLotes = async () => {
    try {
      const response = await fetch(`/api/lotes?term=${searchTerm}`);
      const data = await response.json();
      console.log('Dados filtrados:', data); // Verifique os dados
      setFilteredBanners(data);
    } catch (err) {
      console.error('Erro ao buscar lotes:', err);
    }
  };

  useEffect(() => {
    loadLotes(); // Carrega os lotes ao montar o componente
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      searchLotes(); // Filtra lotes quando o termo de busca muda
    } else {
      loadLotes(); // Recarrega todos os lotes
    }
  }, [searchTerm]);

  return (
    <section id="lotes">
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.lotesEmVenda}>
          <div className={styles.container}>
            <div className={styles.searchContainer}>
              <h2>LOTES DISPONÍVEIS:</h2>
              <input
                type="text"
                placeholder="Pesquisar lotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className="row" style={{ justifyContent: 'center' }}>
              {filteredBanners.map((banner) => (
                <button
                  key={banner.id}
                  className={`col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 mb-4 ${styles.loteButton}`}
                  onClick={() => setSelectedLote(banner)}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={banner.imagemUrl}
                      alt={`Imagem Lote ${banner.descricao}`}
                      className={styles.bannerLote}
                    />
                    <div className={styles.loteTitle}>{banner.descricao}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedLote && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setSelectedLote(null)}>
              &times;
            </button>
            <div className={styles.popupGrid}>
              <div className={styles.popupImageContainer}>
                <img
                  src={selectedLote.imagemUrl}
                  alt={`Imagem Lote ${selectedLote.nome}`}
                  className={styles.popupImage}
                />
              </div>
              <div className={styles.popupInfo}>
                <h2>{selectedLote.nome}</h2>
                <p><strong>Cidade:</strong> {selectedLote.cidade}</p>
                <p><strong>Descrição:</strong> {selectedLote.descricao}</p>
                <p><strong>Anunciante:</strong> {selectedLote.anunciante}</p>
                <p><strong>Valor de compra:</strong> {selectedLote.valor}</p>
                <div className={styles.rating}>
                  <strong>Índice de qualidade:</strong> {selectedLote.indice_qualidade}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
