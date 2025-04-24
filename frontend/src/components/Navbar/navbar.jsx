import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>WORKNEST</span>

      <div className={styles.links}>
        <a href="#features">Funcionalidades</a>
        <a href="#testemunhos">Testemunhos</a>
        <a href="#contacto">Contacto</a>
      </div>

      <div className={styles.actions}>
        <Button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm">New Project</Button>
      </div>
    </nav>
  );
}
