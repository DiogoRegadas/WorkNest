import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registarUtilizador } from "../services/api"; // Função para registar utilizador
import SignUp from "../components/SignPage/signUp";
import "../styles/background.css";
import bcrypt from "bcryptjs";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    localidade: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
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
      // Gera o hash da password antes de enviar
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const resposta = await registarUtilizador({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        localidade: formData.localidade,
        password: hashedPassword, // envia já encriptada
      });

      if (resposta.sucesso) {
        setMensagem("✅ Conta criada com sucesso!");
        navigate("/signin");
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
