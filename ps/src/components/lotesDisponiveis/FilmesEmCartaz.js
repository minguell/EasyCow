"use client"

import { useState } from 'react';
import styles from './FilmesEmCartaz.module.css';
import { FaStar, FaStarHalfAlt, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

import Gado1 from "@/assets/Lotes/gado1.jpg";
import Gado2 from "@/assets/Lotes/gado2.jpg";
import Gado3 from "@/assets/Lotes/gado3.jpg";
import Gado4 from "@/assets/Lotes/gado4.jpg";
import Gado5 from "@/assets/Lotes/gado5.jpg";
import Gado6 from "@/assets/Lotes/gado6.jpg";
import Gado7 from "@/assets/Lotes/gado7.jpeg";
import Gado8 from "@/assets/Lotes/gado8.jpg";
import Gado9 from "@/assets/Lotes/gado9.jpg";


const listaBanners = [
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

export default function FilmesEmCartaz() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openPopup = (film) => {
    setSelectedFilm(film);
  };

  const closePopup = () => {
    setSelectedFilm(null);
  };

  const filteredBanners = listaBanners.filter(banner =>
    banner.Cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banner.desc.toLowerCase().includes(searchTerm.toLowerCase())||
    banner.anunciante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="catalogo">
      <div className={styles.filmesEmCartaz}>
        <div className={styles.container}>
          <h2>FILMES EM CARTAZ</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar filmes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className="row" style={{ justifyContent: "center" }}>
            {filteredBanners.map((banner, index) => (
            <button
              key={index}
              className={`col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 mb-4 ${styles.filmButton}`}
              onClick={() => openPopup(banner)}
              style={{
                width: "auto",
                height: "auto",
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
                  alt={`Imagem filme ${banner.nome}`}
                  className={styles.bannerFilme}
                  style={{
                    objectFit: "fill",
                    borderRadius: "15px",
                  }}
                />
                <div className={styles.filmTitle}>{banner.nome}</div>
              </div>
            </button>
          ))}
          </div>
        </div>
      </div>

      {selectedFilm && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>&times;</button>
            <div className={styles.popupGrid}>
              <div className={styles.popupImageContainer}>
                <Image
                  src={selectedFilm.imagem}
                  alt={`Imagem filme ${selectedFilm.nome}`}
                  className={styles.popupImage}
                  layout="responsive"
                  width={300}
                  height={450}
                />
              </div>
              <div className={styles.popupInfo}>
                <h2>{selectedFilm.nome}</h2>
                <p><strong>Cidade:</strong> {selectedFilm.Cidade}</p>
                <p><strong>Descrição:</strong> {selectedFilm.desc}</p>
                <p><strong>Anunciante:</strong> {selectedFilm.anunciante}</p>
                <p><strong>Valor de compra:</strong> {selectedFilm.valor}</p>
                <div className={styles.rating}>
                  <strong>Índice de qualidade:</strong> {selectedFilm.indice_qualidade}
                  <StarRating rating={parseFloat(selectedFilm.indice_qualidade)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}