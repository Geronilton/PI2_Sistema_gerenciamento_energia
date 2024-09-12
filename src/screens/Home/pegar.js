import React, { useState, useEffect } from "react";
import { pegarUltimoDadoDoFirebase } from "../../../services/firebaseConfig";

const UltimoDadoDoFirebase = () => {
  const [ultimoDado, setUltimoDado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await pegarUltimoDadoDoFirebase("/sensores/corrente");  // Passa o caminho do dado
      setUltimoDado(resultado);  // Atualiza o estado com o dado recebido
    };

    fetchData();  // Chama a função para buscar os dados
  }, []);  // O array vazio faz com que o useEffect seja executado uma vez

  return (
    <div>
      <h1>Último Dado do Firebase:</h1>
      {ultimoDado !== null ? (
        <p>{ultimoDado}</p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UltimoDadoDoFirebase;