'use client';

import { useState, useEffect } from 'react';
import styles from './Lotes.module.css';
import { useRouter } from 'next/navigation';

export default function Lotes() {
  const router = useRouter(); // Hook para controle de navegação
  const [error, setError] = useState(''); // Estado para mensagens de erro

  const [selectedLote, setSelectedLote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBanners, setFilteredBanners] = useState([]);

  // Função para carregar os lotes
  const loadLotes = async (event) => {
    event.preventDefault();

    //const pesquisa = event.target.elements.pesquisa.value;

    const formData = new FormData();
    formData.append("pesquisa", searchTerm);


    try {
      const response = await fetch('/api/routeLotes', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("lotes carregados com sucesso!");
        setFilteredBanners(data); // Carrega os lotes
        console.log(filteredBanners);
        //router.push('/lotesPage'); // Redireciona para a página de lotes
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao carregar lotes");
      }
    }

    catch (error) {
      console.error(error);
      setError("Erro ao conectar ao servidor");
    }

  };



  return (
    <section id="lotes">
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.lotesEmVenda}>
          <div className={styles.container}>
            <div className={styles.searchContainer}>
              <h2>LOTES DISPONÍVEIS:</h2>
              <form className={styles.form} onSubmit={loadLotes}>
                <input
                  type="text"
                  placeholder="Pesquisar lotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <button className={styles.searchButton} type="submit">Pesquisar</button>
              </form>
            </div>
              <div className="row" style={{ justifyContent: 'center' }}>
                {filteredBanners.length > 0 ? (
                  filteredBanners.map((banner) => (
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
                  ))
                ) : (
                  <p>Nenhum lote encontrado</p>
                )}
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
