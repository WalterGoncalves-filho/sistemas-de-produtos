# Design — Sistema de Produtos (EQP-3)

## Arquitetura Geral

```
┌─────────────────────┐        HTTP/JSON        ┌──────────────────────┐
│   Frontend (React)  │ ──────────────────────► │  Backend (Spring Boot)│
│   Vite + Tailwind   │ ◄────────────────────── │  REST API             │
│   SweetAlert2       │        CORS             │  porta 8080           │
│   porta 5173        │                         └──────────┬───────────┘
└─────────────────────┘                                    │
                                                           │ JPA
                                              ┌────────────▼────────────┐
                                              │  Dev: MySQL (3306)       │
                                              │  Prod: PostgreSQL Railway│
                                              └─────────────────────────┘
```

---

## Arquitetura Backend (Camadas)

```
Controller  →  recebe requisição HTTP, chama Service, retorna ResponseEntity
Service     →  lógica de negócio, validações, chama Repository
Repository  →  interface JpaRepository, acesso ao banco
Model       →  entidade Produto (@Entity)
```

### Estrutura de Pastas

```
backend/src/main/java/com/eqp3/produtos/
├── controller/
│   └── ProdutoController.java
├── service/
│   └── ProdutoService.java
├── repository/
│   └── ProdutoRepository.java
├── model/
│   └── Produto.java
└── ProdutosApplication.java

backend/src/main/resources/
├── application.properties          # perfil ativo
├── application-dev.properties      # MySQL local
└── application-prod.properties     # PostgreSQL Railway (variáveis de ambiente)
```

### Entidade Produto

| Campo    | Tipo           | Restrições                  |
|----------|----------------|-----------------------------|
| id       | Long           | PK, auto-increment          |
| nome     | String         | NotBlank, max 100 chars     |
| preco    | BigDecimal     | NotNull, min 0.01           |
| estoque  | Integer        | NotNull, min 0              |

---

## Configuração de Banco de Dados

### application.properties
```properties
spring.profiles.active=dev
```

### application-dev.properties (MySQL — dev local)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_produtos
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### application-prod.properties (PostgreSQL — Railway)
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
```

> As variáveis `DATABASE_URL`, `DATABASE_USERNAME` e `DATABASE_PASSWORD` são configuradas
> automaticamente pelo Railway ao provisionar o PostgreSQL.

---

## Arquitetura Frontend (React)

### Estrutura de Pastas

```
frontend/src/
├── components/
│   ├── ProdutoCard.jsx       # card individual de produto
│   ├── ProdutoModal.jsx      # modal de cadastro/edição
│   └── ProdutoTable.jsx      # tabela de listagem
├── pages/
│   └── Home.jsx              # página principal
├── services/
│   └── api.js                # instância axios + funções de chamada
├── App.jsx
└── main.jsx
```

### Fluxo de Estado (React)

```
Home.jsx
  ├── useState: produtos[]         → lista de produtos
  ├── useState: loading            → controle de carregamento
  ├── useState: modalOpen          → exibe/oculta modal
  ├── useState: produtoSelecionado → produto em edição (null = novo)
  └── useEffect: []                → busca produtos ao montar (GET /api/produtos)
```

### SweetAlert2 — Uso por Ação

| Ação              | Tipo de alerta SweetAlert2         |
|-------------------|------------------------------------|
| Produto cadastrado| `Swal.fire` success                |
| Produto atualizado| `Swal.fire` success                |
| Confirmar exclusão| `Swal.fire` warning + confirm      |
| Produto removido  | `Swal.fire` success                |
| Erro de API       | `Swal.fire` error                  |
| Validação falhou  | `Swal.fire` warning                |

---

## Identidade Visual

> ⚠️ **A definir na fase de acabamento do projeto.**

### Diretrizes para escolha da paleta

O sistema representa uma loja de produtos — a cor principal deve transmitir:
- **Confiança e profissionalismo** (azuis, índigos)
- **Modernidade e energia** (violetas, emerald)
- **Clareza** (fundo claro ou dark mode opcional)

### Candidatas (decidir ao finalizar)

| Opção | Cor Principal | Sensação              | Classe Tailwind base  |
|-------|---------------|-----------------------|-----------------------|
| A     | Indigo 600    | Profissional, moderno | `bg-indigo-600`       |
| B     | Emerald 600   | Fresco, confiável     | `bg-emerald-600`      |
| C     | Violet 600    | Criativo, premium     | `bg-violet-600`       |
| D     | Sky 600       | Leve, tecnológico     | `bg-sky-600`          |

A paleta escolhida será aplicada em: navbar, botões primários, badges de estoque e cabeçalho dos cards.

---

## Hospedagem

| Camada   | Serviço  | Observação                                      |
|----------|----------|-------------------------------------------------|
| Backend  | Railway  | Deploy via GitHub. PostgreSQL provisionado pelo Railway |
| Frontend | Vercel   | Deploy via GitHub. Gratuito, CDN global         |

### Variável de ambiente no Frontend (produção)
```env
VITE_API_URL=https://seu-backend.up.railway.app
```

### Em desenvolvimento
```env
VITE_API_URL=http://localhost:8080
```
