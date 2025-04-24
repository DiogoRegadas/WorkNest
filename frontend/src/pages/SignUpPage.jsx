import { useState } from "react";
import { registarUtilizador } from "../services/api"; // Função para registar utilizador
import SignUp from "../components/SignPage/signUp";
import "../styles/background.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    localidade: "",
    password: "",
    confirmPassword: ""
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (formData.password !== formData.confirmPassword) {
      setMensagem("❌ As passwords não coincidem.");
      return;
    }

    try {
      // Aqui chamar a API de registo
      const resposta = await registarUtilizador({
        nome: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        localidade: formData.localidade,
        password: formData.password
      });

      if (resposta.sucesso) {
        setMensagem("✅ Conta criada com sucesso!");
      } else {
        setMensagem(`❌ ${resposta.mensagem}`);
      }
    } catch (erro) {
      setMensagem(`❌ ${erro.message || "Erro ao criar conta."}`);
    }
  };

  return (
    <SignUp
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      mensagem={mensagem}
    />
  );
}
