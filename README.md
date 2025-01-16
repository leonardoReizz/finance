# Finance App

Este é um aplicativo financeiro desenvolvido com **Next.js 14** e **Node.js 20.12.1**. O objetivo do projeto é permitir o controle de entradas e saídas financeiras, organizadas por contas e categorias. Além disso, o app oferece um dashboard com um overview das movimentações financeiras de um determinado mês.

## Requisitos

- **Node.js** versão 20.12.1
- **Next.js** versão 14
- **Docker** (para rodar em contêiner)
- **Clerk** para autenticação de usuários
- **NeonDatabase** (PostgreSQL) como banco de dados

## Funcionalidades

- Adicionar **entradas** e **saídas** financeiras
- Gerenciar **contas** e **categorias** para as movimentações
- Visualizar um **dashboard** com resumo das entradas e saídas de um mês
- Filtrar e organizar as transações por **data**, **categoria** e **conta**
- Autenticação de usuários via **Clerk**

## Configuração

### 1. Clonando o repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/finance-app.git
cd finance-app
```

### 2. Configuração do Clerk

O aplicativo usa o Clerk para autenticação de usuários. Você precisará configurar um ambiente Clerk. Para isso:

  - Crie uma conta no Clerk.
  - Após criar a conta, crie uma nova aplicação e pegue as chaves de API.
  - Adicione as variáveis de ambiente no arquivo .env
  
```bash
NEXT_PUBLIC_CLERK_FRONTEND_API=<seu_frontend_api>
CLERK_API_KEY=<seu_api_key>
CLERK_API_URL=<seu_api_url>
```

### 3. Configuração do Banco de Dados

Este projeto utiliza o NeonDatabase (um serviço baseado em PostgreSQL).

  - Crie uma conta no NeonDatabase.
  - Crie um novo banco de dados e obtenha a URL de conexão.
  - Adicione a URL de conexão no arquivo .env:
```bash
DATABASE_URL=<sua_url_de_conexao_postgresql>
```

4. Instalar dependências

Após configurar o Clerk e o banco de dados, instale as dependências do projeto:

npm install

### 5. Rodar o projeto

Para rodar o projeto localmente, use o comando abaixo:
```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento na porta 3000.

### 6. Usando Docker

Caso prefira rodar o projeto em um contêiner Docker, existe um Dockerfile incluído no projeto. Para rodar com Docker:

  ##### Construa a imagem Docker:
```bash
docker build -t finance-app .
```
  ##### Rode o contêiner:

```bash
docker run -p 3000:3000 finance-app
```

O aplicativo estará disponível na porta 3000.


##### Estrutura do Projeto

A estrutura do projeto é a seguinte:

```bash
.
├── Dockerfile                  # Arquivo para construção do contêiner Docker
├── next.config.mjs             # Configuração do Next.js
├── app/                        
│   ├── (auth)/                 # Autenticacao
│   ├── (dashboard)/            # Paginas da aplicacao ( contas, categorias e transacoes )
│   ├── api/                     # Endpoints da API 
│   ├── fonts/                  # Página para gerenciar saídas
│   └── layout.tsx              # Layout principal categorias                   
├── db/                         # Arquivos estáticos (imagens, ícones, etc)
├── drizzle/                    # Arquivos sql
├── features/                   # Arquivos estáticos (imagens, ícones, etc)
├── componentes/                # Componentes e biblioteca de componentes
├── hooks/                      # Metodos das paginas (api, hooks e componentes )
├── lib/                        # Bibliotecas externas
├── providers/                  # Providers
├── public/                     # Arquivos estáticos (imagens, ícones, etc)
├── scripts/                    # Scripts para migracao do banco
├── drizze.config.ts/           # Arquivo de configuracao do drizze
├── ts.config.json/             # Arquivo de configuracao do Typecript
├── components.json/           # Arquivo de configuracao do shadcn
└── .env.local                  # Arquivo de variáveis de ambiente
```

##### Dashboard

O dashboard fornece um resumo visual das entradas e saídas por um período específico de tempo, facilitando a análise financeira. Você pode visualizar:

  - Total de entradas e saídas.
  - Gráficos de overview por categorias e contas.
  - Filtros para ajustar o período do relatório.

Licença
Este projeto está licenciado sob a MIT License.
