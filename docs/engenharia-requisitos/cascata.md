# Modelo Cascata — Sistema de Produtos (EQP-3)

**Projeto:** Sistema de Produtos — EQP-3  
**Disciplina:** Tecnologia Web — FAMETRO  
**Professor:** Marcelo Rocha

---

## O que é o Modelo Cascata?

O Modelo Cascata (Waterfall) é uma metodologia de desenvolvimento de software sequencial, onde cada fase deve ser concluída antes de iniciar a próxima. É adequado para projetos com escopo bem definido, como este trabalho acadêmico.

---

## Fases do Projeto

```
┌─────────────────────────────────────────────────────────────┐
│  1. LEVANTAMENTO DE REQUISITOS                              │
│     Definição do escopo, entidade Produto, endpoints REST   │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  2. ANÁLISE                                                 │
│     ERS, casos de uso, regras de negócio                    │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  3. PROJETO (DESIGN)                                        │
│     Arquitetura em camadas, MER/DER, diagrama de classes    │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  4. IMPLEMENTAÇÃO                                           │
│     Backend Spring Boot + Frontend React                    │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  5. TESTES                                                  │
│     Postman/Insomnia para API; testes manuais no frontend   │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  6. IMPLANTAÇÃO                                             │
│     Deploy backend no Railway, frontend no Vercel           │
└─────────────────────────────────────────────────────────────┘
```

---

## Detalhamento de Cada Fase

### Fase 1 — Levantamento de Requisitos
**Objetivo:** Entender o que o sistema deve fazer.

- Leitura do enunciado do trabalho (About.md)
- Identificação da entidade principal: `Produto`
- Definição dos 4 endpoints mínimos obrigatórios + endpoint PUT adicional
- Escolha da stack: Java 17, Spring Boot, React, Tailwind, SweetAlert2
- Definição dos ambientes: MySQL (dev) e PostgreSQL/Railway (prod)

**Entregáveis:** `About.md`, `spec.md`, `requirements.md`

---

### Fase 2 — Análise
**Objetivo:** Detalhar e documentar os requisitos.

- Elaboração do Documento de Requisitos de Software (ERS)
- Definição dos casos de uso (UC-01 a UC-05)
- Definição das regras de negócio (RN-01 a RN-05)
- Rastreabilidade entre requisitos e casos de uso

**Entregáveis:** `documento-requisitos.md`, `casos-de-uso.md`

---

### Fase 3 — Projeto (Design)
**Objetivo:** Definir como o sistema será construído.

- Modelagem do banco de dados (MER/DER)
- Diagrama de classes UML
- Definição da arquitetura em camadas (Controller → Service → Repository → Model)
- Definição da identidade visual (paleta de cores — a finalizar)
- Configuração dos perfis de banco de dados (dev/prod)

**Entregáveis:** `MER-DER.md`, `diagrama-classes.md`, `design.md`

---

### Fase 4 — Implementação
**Objetivo:** Codificar o sistema conforme o design.

**Backend (Spring Boot):**
- [ ] Criar projeto Maven com Spring Web, Spring Data JPA, Validation
- [ ] Implementar Model `Produto` com Bean Validation
- [ ] Implementar `ProdutoRepository` (JpaRepository)
- [ ] Implementar `ProdutoService` com lógica de negócio
- [ ] Implementar `ProdutoController` com os 5 endpoints
- [ ] Configurar CORS
- [ ] Configurar perfis `dev` (MySQL) e `prod` (PostgreSQL)

**Frontend (React + Vite):**
- [ ] Criar projeto com Vite + Tailwind CSS
- [ ] Instalar Axios e SweetAlert2
- [ ] Implementar serviço de API (`api.js`)
- [ ] Implementar componentes: `ProdutoCard`, `ProdutoModal`, `ProdutoTable`
- [ ] Implementar página `Home` com useState e useEffect
- [ ] Aplicar identidade visual (paleta de cores)

**Entregáveis:** Código-fonte do backend e frontend

---

### Fase 5 — Testes
**Objetivo:** Validar que o sistema funciona conforme os requisitos.

| Teste | Ferramenta | O que validar                              |
|-------|------------|--------------------------------------------|
| API   | Postman    | Todos os 5 endpoints (status HTTP, payload)|
| UI    | Manual     | Fluxos de cadastro, edição e exclusão      |
| CORS  | Navegador  | Frontend consegue consumir a API           |
| Banco | MySQL      | Dados persistidos corretamente em dev      |

**Entregáveis:** Collection Postman exportada (`.json`)

---

### Fase 6 — Implantação
**Objetivo:** Disponibilizar o sistema em produção.

- [ ] Criar conta e projeto no Railway
- [ ] Provisionar PostgreSQL no Railway
- [ ] Configurar variáveis de ambiente (`DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`)
- [ ] Fazer deploy do backend via GitHub no Railway
- [ ] Criar projeto no Vercel e conectar repositório do frontend
- [ ] Configurar variável `VITE_API_URL` no Vercel apontando para a URL do Railway
- [ ] Validar sistema em produção

**Entregáveis:** URLs públicas do backend e frontend

---

## Cronograma Estimado

| Fase            | Duração Estimada |
|-----------------|------------------|
| Requisitos      | 1 dia            |
| Análise         | 1 dia            |
| Design          | 1 dia            |
| Implementação   | 3–5 dias         |
| Testes          | 1 dia            |
| Implantação     | 1 dia            |
| **Total**       | **~8–10 dias**   |
