# Spec — Sistema de Produtos (EQP-3)

**Instituição:** Centro Universitário FAMETRO  
**Disciplina:** Tecnologia Web  
**Professor:** Marcelo Rocha  
**Equipe:** EQP-3  
**Data:** 04/05/2026

---

## Visão Geral

API REST de controle de produtos de uma loja, com frontend React consumindo o backend Spring Boot.  
O projeto segue arquitetura em camadas obrigatória (Controller → Service → Repository → Model).

---

## Stack

### Backend
- Java 17+
- Spring Boot + Spring Web + Spring Data JPA
- Maven
- **Dev (local):** MySQL (Windows e Linux/Debian-Ubuntu)
- **Prod:** PostgreSQL via Railway

### Frontend
- React + Vite
- Tailwind CSS
- Axios (chamadas HTTP)
- SweetAlert2 (alertas e confirmações)

---

## Estrutura do Projeto

```
sistemas-de-produtos/
├── backend/          # Spring Boot
└── frontend/         # React + Vite
```

---

## Documentos

- [requirements.md](./requirements.md) — Requisitos funcionais e não funcionais
- [design.md](./design.md) — Arquitetura, identidade visual e decisões técnicas
