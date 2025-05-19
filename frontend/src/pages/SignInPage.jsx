import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUtilizador } from "../services/api";
import SignIn from "../components/SignPage/signIn";
import "../styles/background.css";
import { useAlert } from "../context/AlertContext"; // <== IMPORTAR

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // <== USAR ALERTA

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await loginUtilizador({ email, password });

      if (resposta.sucesso) {
        localStorage.setItem("token", resposta.token);
        localStorage.setItem("refreshToken", resposta.refreshToken);
        localStorage.setItem("utilizador", JSON.stringify(resposta.utilizador));
        showAlert("✅ Login successful!", "sucesso"); // ✅
        navigate("/home");
      } else {
        showAlert(`❌ ${resposta.mensagem}`, "erro"); // ❌
      }
    } catch (erro) {
      showAlert(`❌ ${erro.mensagem || "Erro ao fazer login."}`, "erro");
    }
  };

  return (
    <SignIn
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
    />
  );
}
