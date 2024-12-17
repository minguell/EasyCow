'use client';

import { useState, useEffect } from 'react';
import styles from './Lotes.module.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Comprar from '../Comprar/Comprar';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
  const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75;
  const hasFullStar = decimalPart >= 0.75;

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < fullStars || (i === fullStars && hasFullStar) ? (
            <FaStar className={styles.starFilled} />
          ) : i === fullStars && hasHalfStar ? (
            <FaStarHalfAlt className={styles.starHalf} />
          ) : (
            <FaStar className={styles.starEmpty} />
          )}
        </span>
      ))}
    </div>
  );
};

 

export default function Lotes() {
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const [selectedLote, setSelectedLote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [isComprarOpen, setIsComprarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken"); // Usando o nome do usuário como token aqui.

  useEffect(() => {
    if (!token) return;

    fetch(`http://localhost:5000/api/usuario?nome=${encodeURIComponent(token)}`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  const closePopup = () => {
    setSelectedLote(null);
    setIsComprarOpen(false);
  };

  const confirmPurchase = async (event) => {
    console.log(selectedLote.valor);
    if(parseFloat(userData.saldo) >= parseFloat(selectedLote.valor)){
      const { id } = selectedLote; // Obtém o ID do lote selecionado
      const formData = new FormData();
      formData.append("usuario",userData.nome);
      formData.append("lote",selectedLote.id);
      const d = new Date();
      formData.append("data_compra",d);
      try {
        const response = await fetch('/api/compras', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            alert("Compra registrada com sucesso!");
        } else {
            const errorData = await response.json();
            setError(errorData.error || "Erro ao registrar compra");
        }
    } catch (error) {
        console.error(error);
        setError("Erro ao conectar ao servidor");
    }
      // Atualiza o status do lote para 1 (aprovado)
    fetch("http://localhost:5000/api/atualizar-disponibilidade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id, // Passa o ID do lote selecionado
        disponivel: 2, // Marca o lote como aprovado
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
        alert("Compra bem Sucedida!");
        setSelectedLote(null); // Desmarcar o lote após aprovação
      })
      .catch((error) => {
        console.error("Erro ao atualizar status do lote:", error);
        alert("Erro ao atualizar status do lote.");
      });

      alert(`Compra confirmada`);
      closePopup();
    }else{
      alert('Saldo insuficiente');
      closePopup();
    }
  };

  // Função para carregar os lotes
  const loadLotes = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("pesquisa", searchTerm);

    try {
      const response = await fetch('/api/routeLotes', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();

        // Filtrando os lotes para exibir apenas aqueles com banner.disponivel === 1
        const availableBanners = data.filter(banner => banner.disponivel === 1);

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
                        src={banner.imagem}
                        alt={`Imagem Lote ${banner.descricao}`}
                        className={styles.bannerLote}
                      />
                      <div className={styles.loteTitle}>{banner.descricao}</div>
                    </div>
                  </button>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedLote && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
            <div className={styles.popupGrid}>
              <div className={styles.popupImageContainer}>
                <img
                  src={selectedLote.imagem}
                  alt={`Imagem Lote ${selectedLote}`}
                  className={styles.popupImage}
                />
              </div>
              <div className={styles.popupInfo}>
                <p><strong>Cidade:</strong> {selectedLote.cidade}</p>
                <p><strong>Descrição:</strong> {selectedLote.descricao}</p>
                <p><strong>Anunciante:</strong> {selectedLote.anunciante}</p>
                <p><strong>Valor de compra:</strong> {selectedLote.valor}</p>
                <div className={styles.rating}>
                  <strong>Índice de qualidade:</strong> {selectedLote.indice_qualidade}
                  <StarRating rating={parseFloat(selectedLote.indice_qualidade)} />
                </div>
                <button
                  className={styles.comprarButton}
                  onClick={() => setIsComprarOpen(true)}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Comprar
        isOpen={isComprarOpen}
        onClose={() => setIsComprarOpen(false)}
        onConfirm={confirmPurchase}
      />
    </section>
  );
}
