'use client';

import { useState, useEffect } from 'react';
import styles from './Aprovar.module.css';

export default function Aprovar() {
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const [selectedLote, setSelectedLote] = useState(null);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const usuario = localStorage.getItem("authToken");

  const realizaAprovação = () => {
    if (!selectedLote) {
      alert("Selecione um lote para aprovar.");
      return;
    }
  
    const { id } = selectedLote; // Obtém o ID do lote selecionado
    
    // Log para garantir que o ID está correto
    console.log("ID do lote selecionado:", id);
  
    // Verifica se o ID foi recuperado corretamente
    if (!id) {
      alert("ID do lote não encontrado.");
      return;
    }
  
    // Atualiza o status do lote para 1 (aprovado)
    fetch("http://localhost:5000/api/atualizar-disponibilidade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id, // Passa o ID do lote selecionado
        disponivel: 1, // Marca o lote como aprovado
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao atualizar status do lote. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Atualiza o estado local para remover o lote aprovado da lista de lotes disponíveis
        setFilteredBanners((prevBanners) =>
          prevBanners.filter((banner) => banner.id !== id)
        );
        alert("Lote aprovado com sucesso!");
        setSelectedLote(null); // Desmarcar o lote após aprovação
      })
      .catch((error) => {
        console.error("Erro ao atualizar status do lote:", error);
        alert("Erro ao atualizar status do lote.");
      });
  };
  
  


  // Função para carregar os lotes
  const loadLotes = async () => {
    const formData = new FormData();
    // Passa um valor de pesquisa vazio, pois a barra de pesquisa foi removida
    formData.append("pesquisa", "");

    try {
      const response = await fetch('/api/routeLotes', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();

        // Filtrando os lotes para exibir apenas aqueles aguardando aprovação com banner.disponivel === 0
        const availableBanners = data.filter(banner => banner.disponivel === 0);

        setFilteredBanners(availableBanners); // Carrega os lotes disponíveis
        console.log(availableBanners); // Verifique os lotes filtrados no console
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao carregar lotes");
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao conectar ao servidor");
    }
  };

  // Usando useEffect para carregar os lotes automaticamente ao carregar a página
  useEffect(() => {
    loadLotes(); // Carrega os lotes assim que o componente for montado
  }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez ao carregar a página

  return (
    <section id="lotes">
      {/* Exibe a mensagem de erro, caso haja */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Exibe os lotes */}
      <div className={styles.lotesEmVenda}>
        <div className={styles.container}>
          <h2>LOTES AGUARDADO APROVAÇÃO:</h2>

          {/* Renderiza os lotes ou mensagem de "Nenhum lote encontrado" */}
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
                      src={banner.imagem}
                      alt={`Imagem Lote ${banner.descricao}`}
                      className={styles.bannerLote}
                    />
                    <div className={styles.loteTitle}>{banner.descricao}</div>
                  </div>
                </button>
              ))
            ) : (
              <p>Nenhum lote encontrado</p> // Exibe mensagem se não houver lotes
            )}
          </div>
        </div>
      </div>

      {/* Exibe o popup com mais informações do lote selecionado */}
      {selectedLote && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setSelectedLote(null)}>
              &times;
            </button>
            <div className={styles.popupGrid}>
              <div className={styles.popupImageContainer}>
                <img
                  src={selectedLote.imagem}
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
                <button className='aproveButton' onClick={realizaAprovação}>APROVAR</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
