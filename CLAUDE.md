# CLAUDE.md — Memória do Projeto: Sistema de Produtos

## Identidade do Projeto

| Campo | Valor |
|---|---|
| **Nome** | Sistema de Produtos |
| **Descrição** | API REST de controle de produtos com interface web |
| **Contexto** | Trabalho acadêmico — EQP-3 |
| **Instituição** | Centro Universitário FAMETRO |
| **Disciplina** | Tecnologia Web |
| **Professor** | Marcelo Rocha |
| **Data de criação** | 04/05/2026 |
| **Repositório** | Git local — branch principal: `main` |
| **Autor Git** | WalterGoncalves-filho |

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| Backend — Linguagem | Java | 21 |
| Backend — Framework | Spring Boot | 3.5.0 |
| Backend — Build | Maven (wrapper `mvnw`) | — |
| Backend — ORM | Spring Data JPA + Hibernate | — |
| Backend — Validação | Spring Validation (Bean Validation) | — |
| Banco de dados (dev) | MySQL | 8.0+ |
| Banco de dados (prod) | PostgreSQL | — |
| Frontend — Lib | React | 19.2.6 |
| Frontend — Build | Vite | 8.0.12 |
| Frontend — CSS | Tailwind CSS | 4.3.0 |
| Frontend — HTTP | Axios | 1.16.1 |
| Frontend — Alertas | SweetAlert2 | 11.26.24 |
| Frontend — Lint | ESLint | 10.3.0 |

---

## Estrutura de Diretórios

```
sistemas-de-produtos/
├── backend/                                  # Spring Boot (Java)
│   ├── src/main/java/com/sisprodutos/
│   │   ├── ProdutosApplication.java          # Main class (@SpringBootApplication)
│   │   ├── config/
│   │   │   └── CorsConfig.java               # CORS: permite localhost:5173 e FRONTEND_URL
│   │   ├── controller/
│   │   │   └── ProdutoController.java        # Endpoints REST /api/produtos
│   │   ├── model/
│   │   │   └── Produto.java                  # Entidade JPA (id, nome, preco, estoque)
│   │   ├── repository/
│   │   │   └── ProdutoRepository.java        # JpaRepository<Produto, Long>
│   │   └── service/
│   │       └── ProdutoService.java           # Lógica de negócio
│   ├── src/main/resources/
│   │   ├── application.properties            # Porta 8800, perfil ativo: dev
│   │   ├── application-dev.properties        # MySQL local com dotenv
│   │   └── application-prod.properties       # PostgreSQL via env vars
│   ├── src/test/java/com/sisprodutos/
│   │   └── ProdutosApplicationTests.java
│   └── pom.xml
│
├── frontend/                                 # React + Vite
│   ├── src/
│   │   ├── main.jsx                          # Entry point
│   │   ├── App.jsx                           # Componente raiz
│   │   ├── index.css                         # Estilos globais
│   │   ├── components/
│   │   │   ├── ProdutoTable.jsx              # Tabela com badge de estoque + ações
│   │   │   └── ProdutoModal.jsx              # Modal de criação/edição
│   │   ├── pages/
│   │   │   └── Home.jsx                      # Página principal — lista + CRUD
│   │   └── services/
│   │       └── api.js                        # Cliente Axios: baseURL = VITE_API_URL/api
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── eslint.config.js
│
├── docs/                                     # Documentação técnica
│   ├── banco-de-dados/MER-DER.md
│   ├── engenharia-requisitos/
│   │   ├── cascata.md
│   │   └── documento-requisitos.md
│   └── uml/
│       ├── casos-de-uso.md
│       └── diagrama-classes.md
│
├── .kiro/specs/sistema-produtos/             # Especificações KiroCMS
│   ├── design.md
│   ├── requirements.md
│   └── spec.md
│
├── .env                                      # Variáveis locais (não versionado)
├── .env.example                              # Template de variáveis
├── .gitignore
├── About.md                                  # Briefing do professor / enunciado
├── README.md                                 # Instruções de uso e execução
└── CLAUDE.md                                 # Este arquivo — memória do projeto
```

---

## Arquitetura do Backend

### Padrão de camadas (obrigatório pelo professor)
```
Controller → Service → Repository → Banco de Dados
```

### Entidade principal: `Produto`

| Campo | Tipo Java | Tipo SQL | Regra de validação |
|---|---|---|---|
| `id` | `Long` | BIGINT AUTO_INCREMENT | Gerado automaticamente |
| `nome` | `String` | VARCHAR(100) | `@NotBlank`, máx 100 chars |
| `preco` | `BigDecimal` | DECIMAL | `@NotNull`, `@Positive` |
| `estoque` | `Integer` | INT | `@NotNull`, `@PositiveOrZero` |

Tabela mapeada: `produto`  
DDL auto: `update` (cria/atualiza tabela no startup)

### Endpoints REST

| Método | Rota | HTTP Status | Descrição |
|---|---|---|---|
| GET | `/api/produtos` | 200 | Listar todos os produtos |
| GET | `/api/produtos/{id}` | 200 | Buscar produto por ID |
| POST | `/api/produtos` | 201 | Cadastrar novo produto |
| PUT | `/api/produtos/{id}` | 200 | Atualizar produto |
| DELETE | `/api/produtos/{id}` | 204 | Remover produto |

**Payload de exemplo (POST/PUT):**
```json
{
  "nome": "Notebook",
  "preco": 3500.00,
  "estoque": 10
}
```

### CORS (CorsConfig.java)
- Origens permitidas: `http://localhost:5173` e `${FRONTEND_URL}` (env)
- Métodos: GET, POST, PUT, DELETE
- Headers: todos (`*`)
- Rotas cobertas: `/api/**`

---

## Configuração de Portas

| Serviço | Porta | URL |
|---|---|---|
| Backend (Spring Boot) | **8800** | `http://localhost:8800` |
| Frontend (Vite dev) | **5173** | `http://localhost:5173` |

> **Atenção:** A variável `VITE_API_URL` no `.env` deve apontar para `http://localhost:8800`, não 8080.

---

## Variáveis de Ambiente

### `.env` (local, não versionado)

```env
# Backend
SPRING_PROFILES_ACTIVE=dev
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sistema_produtos
DB_USERNAME=root
DB_PASSWORD=<senha_local>

# Frontend
VITE_API_URL=http://localhost:8800
```

### Como as variáveis são carregadas

- **Backend:** usa a lib `springboot3-dotenv` (v5.1.0) que lê o `.env` na raiz do projeto (`../` relativo ao diretório `backend/`). Referenciadas com `${VAR:default}` nas properties.
- **Frontend:** Vite injeta automaticamente variáveis prefixadas com `VITE_` em `import.meta.env`.

---

## Perfis Spring Boot

| Perfil | Banco | Ativação |
|---|---|---|
| `dev` (padrão) | MySQL local | `SPRING_PROFILES_ACTIVE=dev` |
| `prod` | PostgreSQL (DATABASE_URL) | `SPRING_PROFILES_ACTIVE=prod` |

### application-dev.properties (dev)
```properties
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/${DB_NAME:sistema_produtos}?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
```

> `allowPublicKeyRetrieval=true` foi adicionado para compatibilidade com MySQL 8.0+.

### application-prod.properties (prod)
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## Comandos de Desenvolvimento

### Backend
```bash
# Linux/macOS
cd backend && ./mvnw spring-boot:run

# Windows
cd backend && mvnw.cmd spring-boot:run
```

### Frontend
```bash
cd frontend
npm install       # primeira vez
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção
npm run preview   # preview do build de produção
npm run lint      # verificar ESLint
```

---

## Convenções de Código

### Backend (Java)
- Package base: `com.sisprodutos`
- Nomenclatura: camelCase para métodos/variáveis, PascalCase para classes
- Anotações JPA usadas: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`
- Validações: anotações Bean Validation (`@NotBlank`, `@NotNull`, `@Positive`, `@PositiveOrZero`)
- Controller retorna `ResponseEntity<T>` com status HTTP explícito
- `@RestController` + `@RequestMapping("/api/produtos")`

### Frontend (JavaScript/JSX)
- Componentes: PascalCase (`ProdutoTable.jsx`, `ProdutoModal.jsx`)
- Serviços: camelCase (`api.js`)
- Páginas em `/pages/`, componentes reutilizáveis em `/components/`
- Estado gerenciado com hooks React (`useState`, `useEffect`)
- Estilização: utilitários Tailwind CSS (sem CSS modules)
- Alertas/confirmações: SweetAlert2

---

## Dependências Maven (pom.xml — principais)

```xml
spring-boot-starter-web          <!-- REST + MVC -->
spring-boot-starter-data-jpa     <!-- ORM / JPA -->
spring-boot-starter-validation   <!-- Bean Validation -->
mysql-connector-j                <!-- Driver MySQL -->
postgresql                       <!-- Driver PostgreSQL -->
me.paulschwarz:springboot3-dotenv:5.1.0  <!-- Leitura de .env -->
spring-boot-starter-test         <!-- JUnit + Mockito -->
```

---

## Dependências NPM (package.json — principais)

```json
"react": "^19.2.6",
"react-dom": "^19.2.6",
"axios": "^1.16.1",
"sweetalert2": "^11.26.24",
"@tailwindcss/vite": "^4.3.0",
"vite": "^8.0.12",
"@vitejs/plugin-react": "^4.5.2",
"eslint": "^10.3.0"
```

---

## Pré-requisitos do Ambiente

- Java 21+ (recomendado via [Adoptium](https://adoptium.net))
- Node.js 18+ (via [nodejs.org](https://nodejs.org) ou `nvm`)
- MySQL 8.0+ (ambiente dev local)
- Git
- Maven não precisa ser instalado globalmente — usar o wrapper `./mvnw`

---

## Observações Importantes

- Não existe Docker/docker-compose no projeto no momento.
- O arquivo `image.png` na raiz está não versionado — verificar necessidade.
- A documentação técnica detalhada está em `docs/` (MER-DER, UML, requisitos).
- As especificações do KiroCMS estão em `.kiro/specs/sistema-produtos/`.
- O `About.md` contém o enunciado original do professor com os requisitos mínimos.
