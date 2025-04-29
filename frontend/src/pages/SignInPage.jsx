import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUtilizador } from "../services/api";
import SignIn from "../components/SignPage/signIn";
import "../styles/background.css"; // fundo global
//import bcrypt from "bcryptjs"; // Para encriptar a password antes de enviar

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      
      

      const resposta = await loginUtilizador({
        email,
        password
      });

      if (resposta.sucesso) {
        localStorage.setItem("token", resposta.token);
        localStorage.setItem("utilizador", JSON.stringify(resposta.utilizador));
        navigate("/home");
      } else {
        setMensagem(`❌ ${resposta.mensagem}`);
      }
    } catch (erro) {
      setMensagem(`❌ ${erro.mensagem || "Erro ao fazer login."}`);
    }
  };
  return (
    <SignIn
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      mensagem={mensagem}
    />
  );
}
