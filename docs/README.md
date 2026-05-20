# Documentação — Sistema de Produtos (EQP-3)

**Instituição:** Centro Universitário FAMETRO  
**Disciplina:** Tecnologia Web | **Professor:** Marcelo Rocha  
**Data:** 04/05/2026

---

## Índice

### 🗄️ Banco de Dados
| Documento | Descrição |
|-----------|-----------|
| [MER-DER.md](./banco-de-dados/MER-DER.md) | Modelo Entidade-Relacionamento, Diagrama ER, DDL MySQL/PostgreSQL e Dicionário de Dados |

### 📐 UML
| Documento | Descrição |
|-----------|-----------|
| [casos-de-uso.md](./uml/casos-de-uso.md) | Diagrama de Casos de Uso com descrição detalhada dos fluxos |
| [diagrama-classes.md](./uml/diagrama-classes.md) | Diagrama de Classes com mapeamento de endpoints |

### 📋 Engenharia de Requisitos
| Documento | Descrição |
|-----------|-----------|
| [documento-requisitos.md](./engenharia-requisitos/documento-requisitos.md) | ERS completo — requisitos funcionais, não funcionais e regras de negócio |
| [cascata.md](./engenharia-requisitos/cascata.md) | Modelo Cascata com todas as fases, entregáveis e cronograma |

### ⚙️ Spec do Projeto
| Documento | Descrição |
|-----------|-----------|
| [spec.md](../.kiro/specs/sistema-produtos/spec.md) | Visão geral e stack |
| [requirements.md](../.kiro/specs/sistema-produtos/requirements.md) | Requisitos técnicos detalhados |
| [design.md](../.kiro/specs/sistema-produtos/design.md) | Arquitetura, identidade visual e configurações de ambiente |

---

## Estrutura da pasta `docs/`

```
docs/
├── README.md                                  ← este arquivo
├── banco-de-dados/
│   └── MER-DER.md
├── uml/
│   ├── casos-de-uso.md
│   └── diagrama-classes.md
└── engenharia-requisitos/
    ├── documento-requisitos.md
    └── cascata.md
```

---

## Resumo da Stack

| Camada    | Tecnologia                        | Ambiente         |
|-----------|-----------------------------------|------------------|
| Backend   | Java 17 + Spring Boot + Maven     | —                |
| Banco Dev | MySQL                             | localhost:3306   |
| Banco Prod| PostgreSQL                        | Railway          |
| Frontend  | React + Vite + Tailwind CSS       | localhost:5173   |
| Alertas   | SweetAlert2                       | Frontend         |
| Deploy BE | Railway                           | Produção         |
| Deploy FE | Vercel                            | Produção         |
