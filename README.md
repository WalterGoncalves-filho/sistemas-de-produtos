# Sistema de Produtos

API REST de controle de produtos com interface web.  
Projeto acadêmico — EQP-3 | Centro Universitário FAMETRO | Disciplina: Tecnologia Web.

---

## Tecnologias

| Camada    | Tecnologia                        |
|-----------|-----------------------------------|
| Back-end  | Java 17, Spring Boot 3, Maven     |
| Banco     | MySQL (dev) · PostgreSQL (prod)   |
| Front-end | React 19, Vite, Tailwind CSS      |

> Todas as ferramentas têm suporte para **Windows** e **Linux (Debian/Ubuntu)**.

---

## Pré-requisitos

- [Java 17+](https://adoptium.net)
- [Node.js 18+](https://nodejs.org)
- [MySQL](https://dev.mysql.com/downloads/) (ambiente dev)
- [Git](https://git-scm.com)

---

## Configuração

1. Copie o arquivo de exemplo e preencha as variáveis:
   ```bash
   cp .env.example .env
   ```

2. Edite o `.env` com suas credenciais de banco de dados.

---

## Executando

### Back-end

```bash
# Linux
cd backend && ./mvnw spring-boot:run

# Windows
cd backend && mvnw.cmd spring-boot:run
```

Disponível em: `http://localhost:8800`

### Front-end

```bash
cd frontend
npm install
npm run dev
```

Disponível em: `http://localhost:5173`

---

## Endpoints

| Método | Rota                  | Descrição           |
|--------|-----------------------|---------------------|
| GET    | `/api/produtos`       | Listar produtos     |
| GET    | `/api/produtos/{id}`  | Buscar por ID       |
| POST   | `/api/produtos`       | Cadastrar produto   |
| PUT    | `/api/produtos/{id}`  | Atualizar produto   |
| DELETE | `/api/produtos/{id}`  | Remover produto     |

### Exemplo de payload (POST/PUT)

```json
{
  "nome": "Notebook",
  "preco": 3500.00,
  "estoque": 10
}
```

---

## Estrutura do Projeto

```
sistemas-de-produtos/
├── backend/          # Spring Boot (Java)
├── frontend/         # React + Vite
├── docs/             # Documentação técnica
├── .env              # Variáveis de ambiente (não versionado)
└── .env.example      # Modelo de variáveis de ambiente
```
