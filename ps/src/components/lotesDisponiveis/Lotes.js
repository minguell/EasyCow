"use client"

import { useState } from 'react';
import styles from './Lotes.module.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Image from 'next/image';
import Comprar from '../Comprar/Comprar';

import Gado1 from "@/assets/Lotes/gado1.jpg";
import Gado2 from "@/assets/Lotes/gado2.jpg";
import Gado3 from "@/assets/Lotes/gado3.jpg";
import Gado4 from "@/assets/Lotes/gado4.jpg";
import Gado5 from "@/assets/Lotes/gado5.jpg";
import Gado6 from "@/assets/Lotes/gado6.jpg";
import Gado7 from "@/assets/Lotes/gado7.jpeg";
import Gado8 from "@/assets/Lotes/gado8.jpg";
import Gado9 from "@/assets/Lotes/gado9.jpg";

const listaLotes = [
  {
    nome: "Lote 1",
    Cidade: "Florianópolis",
    desc: "10 cabeças de gado disponíveis para compra em Florianópolis, SC",
    anunciante: "Maria Antonieta",
    valor: "R$50.000",
    indice_qualidade: "2.5",
    imagem: Gado1
  },
  {
    nome: "Lote 2",
    Cidade: "Vacaria",
    desc: "50 cabeças de gado em ótimo estado para compra em Vacaria, RS",
    anunciante: "Ana Julia",
    valor: "R$300.000",
    indice_qualidade: "4.5",
    imagem: Gado2
  },
  {
    nome: "Lote 3",
    Cidade: "Viamão",
    desc: "8 cabeças de gado magro e dois bezerros disponíveis para compra em Viamão, RS",
    anunciante: "Meryl Streep",
    valor: "R$45.000",
    indice_qualidade: "4.5",
    imagem: Gado3
  },
  {
    nome: "Lote 4",
    Cidade: "Santa Cruz do Sul",
    desc: "Cabeça de gado única disponível para compra em Santa Cruz Do Sul, RS",
    anunciante: "Luciana",
    valor: "R$5.000",
    indice_qualidade: "5",
    imagem: Gado4
  },
  {
    nome: "Lote 5",
    Cidade: "Canasvieiras",
    desc: "15 cabeças de gado disponíveis para compra em Canasvieiras, SC",
    anunciante: "Angelo Oliveira",
    valor: "R$80.000",
    indice_qualidade: "4",
    imagem: Gado5
  },
  {
    nome: "Lote 6",
    Cidade: "Garopaba",
    desc: "10 cabeças de gado disponíveis para compra em Garopaba, SC",
    anunciante: "Miguel Dutra",
    valor: "R$55.000",
    indice_qualidade: "5",
    imagem: Gado6
  },
  {
    nome: "Lote 7",
    Cidade: "Gramado",
    desc: "3 cabeças de gado magro disponíveis para compra em Gramado, RS",
    anunciante: "Bruno Hofstetter",
    valor: "R$15.000",
    indice_qualidade: "3.5",
    imagem: Gado7
  },
  {
    nome: "Lote 8",
    Cidade: "Nova Petrópolis",
    desc: "1 boi reprodutor disponível para compra em Nova Petrópolis, RS",
    anunciante: "Nathan Mattes",
    valor: "R$20.000",
    indice_qualidade: "4.5",
    imagem: Gado8
  },
  {
    nome: "Lote 9",
    Cidade: "Bagé",
    desc: "2 bois reprodutores disponíveis para compra em Bagé, RS",
    anunciante: "Augusto Grohmann",
    valor: "R$50.000",
    indice_qualidade: "4",
    imagem: Gado9
  },
]

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
  const [selectedLote, setSelectedLote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isComprarOpen, setIsComprarOpen] = useState(false);

  const openPopup = (lote) => {
    setSelectedLote(lote);
  };

  const closePopup = () => {
    setSelectedLote(null);
    setIsComprarOpen(false);
  };

  const confirmPurchase = () => {
    alert(`Compra confirmada para o lote: ${selectedLote.nome}`);
    closePopup();
  };

  const filteredBanners = listaLotes.filter(banner =>
    banner.Cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banner.desc.toLowerCase().includes(searchTerm.toLowerCase())||
    banner.anunciante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="lotes">
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
          <div className="row" style={{ justifyContent: "center"}}>
            {filteredBanners.map((banner, index) => (
            <button
              key={index}
              className={`col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 mb-4 ${styles.loteButton}`}
              onClick={() => openPopup(banner)}
              style={{
                padding: "0px",
                border: "0px",
                marginRight: '2.5vw',
                marginLeft: '2.5vw',
                background: "transparent",
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={banner.imagem}
                  alt={`Imagem Lote ${banner.nome}`}
                  className={styles.bannerLote}
                  style={{
                    objectFit: "fill",
                    borderRadius: "15px",
                  }}
                />
                <div className={styles.loteTitle}>{banner.nome}</div>
              </div>
            </button>
          ))}
          </div>
        </div>
      </div>

      {selectedLote && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>&times;</button>
            <div className={styles.popupGrid}>
              <div className={styles.popupImageContainer}>
                <Image
                  src={selectedLote.imagem}
                  alt={`Imagem Lote ${selectedLote.nome}`}
                  className={styles.popupImage}
                  layout="responsive"
                  width={300}
                  height={450}
                />
              </div>
              <div className={styles.popupInfo}>
                <h2>{selectedLote.nome}</h2>
                <p><strong>Cidade:</strong> {selectedLote.Cidade}</p>
                <p><strong>Descrição:</strong> {selectedLote.desc}</p>
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
