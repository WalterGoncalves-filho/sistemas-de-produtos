# Requirements — Sistema de Produtos (EQP-3)

## Requisitos Funcionais

### RF-01 — Cadastrar Produto
- Endpoint: `POST /api/produtos`
- Campos obrigatórios: `nome`, `preco`, `estoque`
- `id` gerado automaticamente
- Retorna o produto criado com status `201 Created`

### RF-02 — Listar Produtos
- Endpoint: `GET /api/produtos`
- Retorna lista de todos os produtos cadastrados
- Status `200 OK`

### RF-03 — Buscar Produto por ID
- Endpoint: `GET /api/produtos/{id}`
- Retorna o produto encontrado ou `404 Not Found`

### RF-04 — Atualizar Produto
- Endpoint: `PUT /api/produtos/{id}`
- Atualiza `nome`, `preco` e/ou `estoque`
- Retorna o produto atualizado ou `404 Not Found`

### RF-05 — Remover Produto
- Endpoint: `DELETE /api/produtos/{id}`
- Remove o produto ou retorna `404 Not Found`
- Status `204 No Content` em caso de sucesso

---

## Requisitos Não Funcionais

### RNF-01 — Arquitetura em Camadas
- Fluxo obrigatório: Controller → Service → Repository → Model
- Nenhuma camada deve pular outra

### RNF-02 — Banco de Dados
- **Desenvolvimento local (Windows e Linux/Debian-Ubuntu):** MySQL
  - Configurado via `application-dev.properties`
  - Porta padrão: `3306`
- **Produção (Railway):** PostgreSQL
  - Configurado via variáveis de ambiente do Railway
  - Perfil: `application-prod.properties`
- Migrations gerenciadas pelo Hibernate (`ddl-auto=update` em dev, `validate` em prod)

### RNF-03 — CORS
- Backend deve permitir requisições do frontend em `http://localhost:5173` (dev)
- Em produção, liberar a URL do frontend hospedado

### RNF-04 — Frontend
- React + Vite, porta `5173` em desenvolvimento
- Comunicação com backend via Axios
- Todos os alertas de sucesso, erro e confirmação via **SweetAlert2**
- Interface responsiva com Tailwind CSS
- Uso de `useState` e `useEffect` para gerenciamento de estado e chamadas à API

### RNF-05 — Validações
- Backend: campos `nome` não vazio, `preco` > 0, `estoque` >= 0 (Bean Validation)
- Frontend: validação nos formulários antes de enviar requisição

### RNF-06 — Identidade Visual
- A paleta de cores será definida na fase de acabamento do projeto (ver `design.md`)
- A identidade deve transmitir confiança e modernidade, adequada a um sistema de loja

### RNF-07 — Hospedagem
- Backend: Railway (PostgreSQL incluso)
- Frontend: a definir (sugestões: Vercel ou Netlify — gratuitos)
