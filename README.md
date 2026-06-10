# todolist-java

Aplicação de gerenciamento de tarefas desenvolvida com:

* Spring Boot
* MySQL
* HTML/CSS/JavaScript
* Docker
* Docker Compose

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* Docker
* Docker Compose

Verifique a instalação:

```bash
docker --version
docker compose version
```

## Clonando o projeto

```bash
git clone https://github.com/outofbluee/todolist-java.git
cd todolist-java
```

## Executando a aplicação

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O Docker irá criar automaticamente:

* Banco de dados MySQL
* Backend Spring Boot
* Frontend

## Acessando a aplicação

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8080
```

## Parando a aplicação

```bash
docker compose down
```

## Removendo também os dados do banco

```bash
docker compose down -v
```

## Estrutura do projeto

```text
.
├── docker-compose.yml
├── todolist-backend/
├── todolist-frontend/
└── README.md
```
