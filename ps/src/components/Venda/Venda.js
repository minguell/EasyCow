"use client";
import {useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./Venda.module.css";

export default function Venda() {

    const [error, setError] = useState(""); // Estado para mensagens de erro
    const router = useRouter(); // Hook para controle de navegação


    const DoLote = async (event) => {
        event.preventDefault();

        const anunciante = localStorage.getItem("authToken");
        const indice = event.target.elements.indice.value;
        const cidade = event.target.elements.cidade.value;
        const descricao = event.target.elements.descricao.value;
        const preço = event.target.elements.preço.value;
        const image = event.target.elements.image.files[0];



        // Cria o objeto FormData para enviar os dados ao servidor
        const formData = new FormData();
        formData.append("anunciante", anunciante);
        formData.append("indice", indice);
        formData.append("cidade", cidade);
        formData.append("descricao", descricao);
        formData.append("preço", preço);
        formData.append("image", image);

        try {
            const response = await fetch('/api/routeVenda', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Lote registrado com sucesso!");
                router.push('/'); // Redireciona para a página de login
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Erro ao registrar lote");
            }
        } catch (error) {
            console.error(error);
            setError("Erro ao conectar ao servidor");
        }
    };

    return (
        <div className={styles.createContainer}>
            <h1>Preencha os dados do anúncio</h1>
            <form className={styles.form} onSubmit={DoLote}>
                <div className={styles.groupInputs}>
                    <label htmlFor="indice">Índice de qualidade:</label>
                    <input type="number" placeholder="0.0" step="0.5" min="0" max="5.0" name="indice" id="indice" />
                </div>

                <div className={styles.groupInputs}>
                    <label htmlFor="cidade">Cidade:</label>
                    <input type="text" name="cidade" id="cidade" />
                </div>

                <div className={styles.groupInputs}>
                    <label htmlFor="descricao">descrição:</label>
                    <input type="textbox" name="descricao" id="descricao" />
                </div>

                <div className={styles.groupInputs}>
                    <label htmlFor="preço">Preço:</label>
                    <input type="number" placeholder="0.0" step="1000" min="0" name="preço" id="preço" />
                </div>

                <div className={styles.groupInputs} >
                    <label htmlFor="imageUpload">Imagem:</label>
                    <input type="file" id="imageUpload" name="image" accept="image/*" />
                </div>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    );
}