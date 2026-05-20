# Documento de Requisitos de Software (ERS)

**Projeto:** Sistema de Produtos — EQP-3  
**Versão:** 1.0  
**Instituição:** Centro Universitário FAMETRO  
**Disciplina:** Tecnologia Web  
**Professor:** Marcelo Rocha  
**Data:** 04/05/2026

---

## 1. Introdução

### 1.1 Propósito
Este documento descreve os requisitos funcionais e não funcionais do Sistema de Produtos, uma API REST desenvolvida com Spring Boot para controle de produtos de uma loja, com frontend em React.

### 1.2 Escopo
O sistema permite cadastrar, listar, buscar, atualizar e remover produtos. O backend expõe uma API REST consumida pelo frontend React. Não há autenticação nesta versão.

### 1.3 Definições e Siglas

| Sigla | Significado                        |
|-------|------------------------------------|
| API   | Application Programming Interface  |
| REST  | Representational State Transfer    |
| ERS   | Especificação de Requisitos de Software |
| RF    | Requisito Funcional                |
| RNF   | Requisito Não Funcional            |
| CRUD  | Create, Read, Update, Delete       |

---

## 2. Descrição Geral

### 2.1 Perspectiva do Produto
Sistema web composto por dois módulos independentes:
- **Backend:** API REST (Spring Boot) — responsável pela lógica de negócio e persistência
- **Frontend:** SPA (React + Vite) — interface do usuário que consome a API

### 2.2 Funções do Produto
- Gerenciamento completo (CRUD) de produtos
- Validação de dados no backend e no frontend
- Feedback visual ao usuário via SweetAlert2

### 2.3 Usuários
Operadores de loja que utilizam o sistema via navegador web.

### 2.4 Restrições
- Sem autenticação/autorização nesta versão
- Repositório em memória substituído por banco de dados (MySQL em dev, PostgreSQL em prod)
- Sem paginação nesta versão

---

## 3. Requisitos Funcionais

| ID    | Requisito                  | Prioridade | Endpoint                  | Método |
|-------|----------------------------|------------|---------------------------|--------|
| RF-01 | Cadastrar produto          | Alta       | `/api/produtos`           | POST   |
| RF-02 | Listar todos os produtos   | Alta       | `/api/produtos`           | GET    |
| RF-03 | Buscar produto por ID      | Alta       | `/api/produtos/{id}`      | GET    |
| RF-04 | Atualizar produto          | Média      | `/api/produtos/{id}`      | PUT    |
| RF-05 | Remover produto            | Alta       | `/api/produtos/{id}`      | DELETE |

### Detalhamento

**RF-01 — Cadastrar Produto**  
Entrada: `{ "nome": "string", "preco": number, "estoque": integer }`  
Saída: produto criado com `id` gerado + status `201 Created`

**RF-02 — Listar Produtos**  
Saída: array JSON com todos os produtos + status `200 OK`

**RF-03 — Buscar Produto por ID**  
Saída: produto encontrado (`200 OK`) ou mensagem de erro (`404 Not Found`)

**RF-04 — Atualizar Produto**  
Entrada: campos a atualizar (`nome`, `preco`, `estoque`)  
Saída: produto atualizado (`200 OK`) ou `404 Not Found`

**RF-05 — Remover Produto**  
Saída: `204 No Content` (sucesso) ou `404 Not Found`

---

## 4. Requisitos Não Funcionais

| ID     | Categoria       | Descrição                                                                 |
|--------|-----------------|---------------------------------------------------------------------------|
| RNF-01 | Arquitetura     | Fluxo obrigatório: Controller → Service → Repository → Model              |
| RNF-02 | Banco de Dados  | MySQL em desenvolvimento, PostgreSQL em produção (Railway)                |
| RNF-03 | Integração      | CORS configurado para permitir requisições do frontend (`localhost:5173`) |
| RNF-04 | Usabilidade     | Alertas e confirmações via SweetAlert2                                    |
| RNF-05 | Validação       | Bean Validation no backend; validação de formulário no frontend           |
| RNF-06 | Responsividade  | Interface responsiva com Tailwind CSS                                     |
| RNF-07 | Portabilidade   | Backend compatível com Windows e Linux (Debian/Ubuntu) em desenvolvimento |
| RNF-08 | Hospedagem      | Backend no Railway; frontend no Vercel                                    |

---

## 5. Regras de Negócio

| ID   | Regra                                                              |
|------|--------------------------------------------------------------------|
| RN-01| O campo `nome` não pode ser vazio ou nulo                          |
| RN-02| O campo `preco` deve ser maior que zero                            |
| RN-03| O campo `estoque` deve ser maior ou igual a zero                   |
| RN-04| Não é possível remover um produto inexistente                      |
| RN-05| A exclusão deve ser confirmada pelo usuário antes de ser executada |

---

## 6. Interfaces

### 6.1 Interface do Usuário
- Página única (SPA) com listagem de produtos em cards ou tabela
- Modal para cadastro e edição
- Botões de ação: Novo, Editar, Excluir
- Alertas SweetAlert2 para feedback de todas as operações

### 6.2 Interface de Software (API)
Base URL dev: `http://localhost:8080/api`  
Base URL prod: `https://<app>.up.railway.app/api`

Formato de dados: JSON  
Content-Type: `application/json`

---

## 7. Rastreabilidade Requisitos × Casos de Uso

| Requisito | Caso de Uso |
|-----------|-------------|
| RF-01     | UC-01       |
| RF-02     | UC-02       |
| RF-03     | UC-03       |
| RF-04     | UC-04       |
| RF-05     | UC-05       |
