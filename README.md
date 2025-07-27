# Desafio Fullstack Notro - Busca na API do GitHub

Este projeto é a minha resolução para o Desafio Fullstack da Notro. Consiste em uma API construída com NestJS e um cliente frontend construído com Angular. A aplicação permite pesquisar repositórios e issues diretamente da API do GitHub, apresentando os resultados em uma interface inspirada na própria plataforma.

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o backend (API) e o frontend (Cliente).

### Backend (API)

- **NestJS**: Um framework Node.js progressivo para construir aplicações backend eficientes, escaláveis e robustas. Foi utilizado para estruturar toda a lógica da API.
- **Class Validator**: Uma biblioteca que funciona perfeitamente com o NestJS para validar os dados de entrada (DTOs) das requisições, garantindo que a API receba apenas os dados no formato correto.
- **Swagger (OpenAPI)**: Usado para gerar automaticamente uma documentação interativa e visual da API. Facilita o teste e a compreensão dos endpoints disponíveis.

### Frontend (Cliente)

- **Angular**: Um framework de desenvolvimento frontend baseado em TypeScript, mantido pelo Google, para construir aplicações web dinâmicas e de página única (SPA).
- **Angular Icons**: Uma biblioteca para integrar facilmente conjuntos de ícones populares (como Heroicons) em um projeto Angular, utilizada para melhorar a UI.
- **Tailwind CSS**: Um framework CSS "utility-first" que permite construir designs customizados diretamente no HTML, sem a necessidade de escrever CSS customizado. Foi utilizado para estilizar toda a interface.

---

# Como Rodar o Projeto

É possível rodar o projeto localmente usando Docker ou rodando manualmente cada serviço, independente, é necessário clonar o repositório.

## Usando Docker

Para rodar o projeto usando Docker, você precisa ter o Docker instalado na sua máquina. O projeto já vem com um `docker-compose.yml` configurado para facilitar a execução.

```
docker compose up --build
```

## Rodando manualmente cada serviço

Para executar a aplicação, você precisará ter o Node.js e o npm instalados. O projeto é um monorepo com duas pastas principais: `/api` e `/front`.

### 1. Instalar as Dependências

Você precisa instalar as dependências para ambas as partes do projeto separadamente.

- **Para a API (Backend):**
  ```bash
  cd api
  npm install
  ```

- **Para o Cliente (Frontend):**
  ```bash
  cd front
  npm install
  ```

### 2. Executar a API
Para iniciar a API, execute o seguinte comando na pasta `/api`:

```bash
npm run start:dev
```

### 3. Executar o Cliente
Para iniciar o cliente, execute o seguinte comando na pasta `/front`:
```bash
npm run start
```

### 4. Acessar a Aplicação
Após iniciar ambos os servidores, você pode acessar a aplicação no seu navegador em:
```
http://localhost:4200
```

### 5. Acessar a Documentação da API
A documentação da API gerada pelo Swagger pode ser acessada em:
```
http://localhost:3000/api
```

### 6. Rodar testes de integração da API
Para rodar os testes de integração da API, execute o seguinte comando na pasta `/api`:

```bash
npm run test
```

## Estrutura do Projeto

### Frontend (Angular)
```plaintext
/
├── api/                # Backend (NestJS)
│   ├── src/
│   │   ├── dto/        # Data Transfer Objects (validação e tipagem)
│   │   │   ├── search-pagination-filter.dto.ts
│   │   │   └── repository-pagination-response.dto.ts
│   │   ├── entity/     # Entidades de domínio (Repository, Issue, etc.)
│   │   │   ├── repository.entity.ts
│   │   │   └── issue.entity.ts
│   │   └── ...         # Outros módulos, controllers, services
│   └── ...
├── front/              # Frontend (Angular)
│   ├── src/
│   │   └── app/
│   │       ├── core/
│   │       │   ├── models/      # Interfaces de dados globais
│   │       │   │   ├── repository.model.ts
│   │       │   │   └── issue.model.ts
│   │       │   └── services/    # Serviços singleton (ex: APIService)
│   │       │       └── api.service.ts
│   │       ├── features/
│   │       │   └── search/      # Feature de busca (componentes e lógica)
│   │       │       ├── search-page/
│   │       │       ├── repository-list/
│   │       │       └── ...
│   └── ...
└── README.md
```

### API (NestJS)

A API é organizada para separar claramente as camadas de dados e a lógica de negócio.

- **src/dto (Data Transfer Object):** Classes que definem a estrutura dos dados que entram e saem da API. São usadas para validação de requisições (`search-pagination-filter.dto.ts`) e para tipar as respostas enviadas ao cliente (`repository-pagination-response.dto.ts`).

- **src/entity:** Classes que representam as entidades de domínio da aplicação. Neste projeto, elas definem a estrutura dos objetos principais com os quais a API trabalha, como `Repository` e `Issue`, espelhando os dados recebidos da API do GitHub.