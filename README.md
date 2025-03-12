# WorkNest
WorkNest é uma plataforma de colaboração para estudantes e pequenas equipas, focada na gestão de projetos, organização de tarefas e comunicação eficiente. O sistema permite a criação de projetos, partilha de arquivos, organização de conversas por categorias/tópicos e um calendário de prazos

📌 Bibliotecas Principais (Essenciais para o Backend)
Estas são as bibliotecas fundamentais para o funcionamento da API.

1️⃣ express
É um framework web para Node.js que simplifica a criação do servidor e das rotas da API.
Permite definir rotas, responder a pedidos HTTP e usar middlewares para processar os dados.
2️⃣ mongoose
É um ORM (Object-Relational Mapping) para MongoDB.
Permite definir modelos e esquemas para estruturar os dados na base de dados.
Facilita a interação com MongoDB sem precisar de escrever queries diretas.
3️⃣ dotenv
Permite armazenar variáveis de ambiente num ficheiro .env.
Assim, podemos manter credenciais secretas (como a chave JWT e a ligação à BD) fora do código.
4️⃣ jsonwebtoken (JWT)
Gera e valida tokens de autenticação.
Permite que os utilizadores façam login e sejam identificados sem armazenar sessões no servidor.
Muito utilizado para sistemas de login seguro e escalável.
5️⃣ bcrypt
Serve para encriptar passwords antes de as armazenar na base de dados.
Protege as credenciais dos utilizadores contra ataques caso a base de dados seja comprometida.
6️⃣ cors
Permite que o frontend e o backend comuniquem mesmo estando em domínios diferentes.
Evita erros de CORS Policy quando fazemos pedidos de APIs em aplicações web.


📌 Bibliotecas Opcionais (Melhoram a Segurança e Funcionalidade)
Estas dependências não são obrigatórias, mas melhoram a segurança, performance e usabilidade da API.

7️⃣ express-validator
Ajuda a validar inputs do utilizador antes de os processar.
Evita dados incorretos ou perigosos (ex.: emails inválidos, SQL injection).
8️⃣ multer
Permite fazer upload de ficheiros como imagens e documentos.
Muito útil para armazenar anexos nos projetos da plataforma.
9️⃣ morgan
Regista todas as requisições HTTP no terminal.
Ajuda a monitorizar o tráfego e encontrar erros mais rapidamente.
🔟 helmet
Adiciona camadas de segurança à API para proteger contra ataques web comuns.
Evita Cross-Site Scripting (XSS), Clickjacking e outras vulnerabilidades.
1️⃣1️⃣ compression
Comprime as respostas da API para melhorar a performance.
Reduz o tamanho dos dados enviados para o cliente.
1️⃣2️⃣ socket.io
Permite comunicação em tempo real através de WebSockets.
Pode ser usado para chats, notificações em tempo real e atualizações dinâmicas.
1️⃣3️⃣ nodemailer
Permite enviar emails pelo backend.
Pode ser usado para recuperação de senha, notificações de projetos e confirmações de conta.


📌 Bibliotecas de Desenvolvimento (Apenas para Ambiente de Dev)
Estas bibliotecas não são usadas na produção, apenas para facilitar o desenvolvimento.

1️⃣4️⃣ nodemon
Reinicia automaticamente o servidor sempre que alteras o código.
Muito útil para evitar parar e reiniciar manualmente o backend após cada mudança.
1️⃣5️⃣ dotenv-cli
Facilita a gestão de variáveis de ambiente quando usamos diferentes ficheiros .env para diferentes ambientes (dev, produção).
1️⃣6️⃣ jest
Framework para testes automatizados no backend.
Permite verificar se os endpoints e funcionalidades do backend estão a funcionar corretamente.
1️⃣7️⃣ supertest
Usado junto com Jest para testar APIs.
Permite simular requisições HTTP e verificar se a API responde corretamente.
