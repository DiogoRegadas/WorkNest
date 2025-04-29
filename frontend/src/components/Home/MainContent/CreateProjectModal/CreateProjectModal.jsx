import { useState } from 'react';
import styles from './CreateProjectModal.module.css';
import { criarProjeto } from '../../../../services/api'; // ajusta o path se necessário


export default function CreateProjectModal({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // só fecha após a animação
    }, 400); // igual à duração da animação CSS
  };

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };

  const handleCreateProject = async () => {
    const userData = JSON.parse(localStorage.getItem("utilizador"));
  
    const dados = {
      nome: projectName,
      descricao: projectDescription,
      owner: userData.id, // vem do localStorage
      categorias: categories // array de strings
    };
  
    try {
      const resposta = await criarProjeto(dados);
      console.log("✅ Projeto criado com sucesso:", resposta.projeto);
  
      // Fechar modal depois de criar
      onClose();
  
      // Aqui mais tarde podemos:
      // - atualizar lista
      // - mostrar toast
    } catch (erro) {
      console.error("❌ Erro ao criar projeto:", erro);
      alert("Erro ao criar projeto. Ver consola.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${isClosing ? styles.fadeOut : styles.fadeIn}`}>
        <button className={styles.closeButton} onClick={handleClose}>X</button>

        <h2>Create New Project</h2>

        <input
          type="text"
          className={styles.input}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />

        <div className={styles.categorySection}>
          <input
            type="text"
            className={styles.input}
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className={styles.addCategoryButton} onClick={handleAddCategory}>
            Add
          </button>
        </div>

        <div className={styles.categoryList}>
          {categories.map((cat) => (
            <div key={cat} className={styles.categoryItem}>
              {cat}
              <button onClick={() => handleRemoveCategory(cat)}>❌</button>
            </div>
          ))}
        </div>

        <button className={styles.createButton} onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
}
