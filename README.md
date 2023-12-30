![Screenshot 2023-12-30 at 06-19-11 MovieApp React TS](https://github.com/Andrei-hub11/MovieApp/assets/83555334/06d35800-003d-4c2b-bbac-980f12a87ad6)

![Screenshot 2023-12-30 at 06-33-58 MovieApp React TS](https://github.com/Andrei-hub11/MovieApp/assets/83555334/aa633fb2-d933-4664-8e32-4852fa28e3fa)

![Screenshot 2023-12-30 at 06-34-22 MovieApp React TS](https://github.com/Andrei-hub11/MovieApp/assets/83555334/7f617035-9793-450a-bc96-7202bede52d2)

# Principais Recursos

- Rotas Protegidas : Tanto no backend quanto no frontend, garantindo a segurança e restrição de acesso a áreas específicas do aplicativo.
- Gestão de Salas : Capacidade de criar, atualizar e excluir salas de cinema, permitindo uma administração flexível da infraestrutura.
- Gift Cards : Oferece a opção de criar gift cards, possibilitando aos usuários presentear amigos ou familiares com acessos ou descontos especiais.
- Geração de Tickets : Permite a geração de ingressos para os filmes e sessões disponíveis.
- Marcação de Tickets como Utilizados : Funcionalidade para acompanhar e registrar os ingressos utilizados pelos usuários.
- Atualização de Informações de Perfil : Os usuários têm a possibilidade de atualizar suas informações pessoais, garantindo uma experiência personalizada.
- Pagamento com Gift Card : Hipoteticamente, oferece um método de pagamento usando os gift cards criados, proporcionando uma alternativa conveniente para transações.
- Registro e Login via JWT : Sistema seguro de registro e login de usuários utilizando JSON Web Tokens (JWT), garantindo autenticação eficaz e proteção dos dados.

# Pré-requisitos:

**Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.**

Testando o Aplicativo de Chat:

- Clonando o Repositório:
  Clone o repositório do aplicativo para o seu sistema.
- Navegando até a Pasta do Aplicativo:
  Abra um terminal e navegue até a pasta raiz do seu aplicativo onde o arquivo docker-compose.yml está localizado.
- Iniciando os Contêineres:
  Execute o seguinte comando para iniciar os contêineres definidos no arquivo docker-compose.yml: **docker-compose up -d**
- Antes de Executar o Comando `docker-compose up -d`:
  Antes de executar o comando para iniciar os contêineres, é necessário seguir as instruções para obter um certificado válido. Você pode gerar um certificado seguindo as orientações fornecidas [aqui](https://learn.microsoft.com/en-us/aspnet/core/security/docker-compose-https?view=aspnetcore-6.0#windows-using-linux-containers).
  Após gerar o certificado, substitua a senha utilizada em `ASPNETCORE_Kestrel__Certificates__Default__Password` no arquivo docker-compose.yml pelo certificado gerado.

- Registrando um Usuário:
  Abra seu navegador e acesse **http://localhost:5173/register**. Você será direcionado para a página de registro do aplicativo.
  Preencha o formulário de registro com as informações necessárias, como nome, e-mail e senha. Clique no botão de registro para criar uma conta.
  Após o registro bem-sucedido, você será direcionado para a página home.

- Login do Usuário:
  Se tiver feito um registro e feito logout no home, pode usar a login page (**http://localhost:5173/login**) com as credenciais que você acabou de criar (e-mail e senha).

# Endpoints:

### Criar Nova Função

- URL: /api/v1/create-role
- Método HTTP: POST
- Cabeçalho de Autenticação: Não é necessário autenticação.
- Corpo da Solicitação (JSON):

```
"roleName": "Nome da Nova Função"
```

- Resposta de Sucesso (200 OK):

```
{
  "Message": "Função criada com sucesso."
}
```

- Resposta de Erro (400 Bad Request):

```
{
  "Message": "Ocorreu um erro ao criar a função."
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a criação da função",
  "Error": "Mensagem de erro específica"
}
```

### Registrar Usuário

- URL: /api/v1/register
- Método HTTP: POST
- Cabeçalho de Autenticação: Não é necessário autenticação.
- Corpo da Solicitação (JSON):

```
{
"UserName": "Nome do Usuário",
"Email": "email@example.com",
"Password": "senha",
"Role": "Nome da Função"
}
```

- Resposta de Sucesso (200 OK):

```
{
"token": "Token de Autenticação"
}
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Os campos não foram corretamente preenchidos",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
"Message": "Ocorreu um erro durante o registro.",
"Error": "Mensagem de erro específica"
}
```

### Login de Usuário

- URL: /api/v1/login
- Método HTTP: POST
- Cabeçalho de Autenticação: Não é necessário autenticação.
- Corpo da Solicitação (JSON):

```
{
  "Email": "email@example.com",
  "Password": "senha"
}
```

- Resposta de Sucesso (200 OK):

```
{
"token": "Token de Autenticação"
}
```

- Resposta de Erro (401 Unauthorized):

```
{
"Message": "Credenciais inválidas."
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
"Message": "Ocorreu um erro durante o login.",
"Error": "Mensagem de erro específica"
}
```

### Obtém Todas as Salas Disponíveis

- Endpoint: /api/v1/rooms
- Método HTTP: GET
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ou 'User' ao ser decodificado.
- Resposta de Sucesso (200 OK):

```
{
  "Rooms": [
        {
            "Id": "4cca3e8d-dcc5-4db8-af68-54ba97d916c2",
            "MovieTitle": "Star Trek",
            "MovieSubtitle": "Além da Escuridão",
            "RoomNumber": "1",
            "MovieCategory": "Ficção",
            "MovieImagePath": "/MovieImages/startrek.jpg",
            "MovieBackdropPath": "/MovieImages/startrekbackdrop.jpg",
            "EventDateTime": "2023-12-25T12:00:00",
            "Seats": []
        },
  ]
}

```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a busca das salas.",
  "Error": "string (detalhes do erro)"
}

```

### Obtém as Salas Com Eventos Próximos

Endpoint: /api/v1/rooms-events-coming

- Método HTTP: GET
- Descrição: Obtém os próximos eventos das salas.
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ou 'User' ao ser decodificado.
- Resposta de Sucesso (200 OK):

```
{
  "Rooms": [
        {
            "Id": "4cca3e8d-dcc5-4db8-af68-54ba97d916c2",
            "MovieTitle": "Star Trek",
            "MovieSubtitle": "Além da Escuridão",
            "RoomNumber": "1",
            "MovieCategory": "Ficção",
            "MovieImagePath": "/MovieImages/startrek.jpg",
            "MovieBackdropPath": "/MovieImages/startrekbackdrop.jpg",
            "EventDateTime": "2023-12-25T12:00:00",
            "Seats": []
        },
  ]
}

```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a busca das salas.",
  "Error": "string (detalhes do erro)"
}

```

### Obtém as Salas por Título de Filme

Endpoint: /api/v1/get-rooms-by-title

- Método HTTP: GET
- Descrição: Obtém salas por título de filme.
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ou 'User' ao ser decodificado.
- Parâmetros de Consulta (Query Parameters):
  movieTitle (string): Título do filme
- Resposta de Sucesso (200 OK):

```
{
  "Rooms": [
        {
            "Id": "4cca3e8d-dcc5-4db8-af68-54ba97d916c2",
            "MovieTitle": "Star Trek",
            "MovieSubtitle": "Além da Escuridão",
            "RoomNumber": "1",
            "MovieCategory": "Ficção",
            "MovieImagePath": "/MovieImages/startrek.jpg",
            "MovieBackdropPath": "/MovieImages/startrekbackdrop.jpg",
            "EventDateTime": "2023-12-25T12:00:00",
            "Seats": []
        },
  ]
}

```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a busca das salas.",
  "Error": "string (detalhes do erro)"
}

```

### Obtém Usuário com Base no Email

Endpoint: /api/v1/user-by-email/{email}

- Método HTTP: GET
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ao ser decodificado.
- Parâmetro de Rota (Path Parameter):
  email (string): Endereço de e-mail do usuário
- Resposta de Sucesso (200 OK):

```
{
    "User": {
        "Id": "0ab52e55-aabf-43d9-b1a9-667b5bda0d3d",
        "UserName": "nathalia11111111",
        "Email": "nathalia@12223111gmail.com",
        "ProfileImagePath": "/images/1ddcbe84-f6ac-403c-8198-7d60ed835c6d.jpg",
        "Tickets": []
    }
}
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Algo deu errado",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a busca do usuário.",
  "Error": "string (detalhes do erro)"
}
```

### Checka se o Gift foi Usado

- Endpoint: /api/v1/check-giftcard/{giftCode}
- Método HTTP: GET
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ou 'User' ao ser decodificado.
- Parâmetro de Rota (Path Parameter):
  giftCode (string): Código do cartão de presente (GUID)
- Resposta de Sucesso (200 OK):

```
{
    "GiftCards":
    [
    {
        "Id":"02b7b18b-40fd-482e-86c2-0be7276fb270"
        "GiftCodigo": "ca1213cc-e1c0-466b-8862-d5d0ade7bcea",
        "IsUsed":false
        },
    ]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a busca dos cartões de presente.",
  "Error": "string (detalhes do erro)"
}

```

### Obtém o ID do Pedido

- Endpoint: /api/v1/order-id
- Método HTTP: GET
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ou 'User' ao ser decodificado.
- Resposta de Sucesso (200 OK):

```
{
  "OrderId": "string (14 caracteres)"
}

```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro ao obter o ID do pedido.",
  "Error": "string (detalhes do erro)"
}

```

### Cria Uma Nova Sala

- Endpoint: /api/v1/create-room
- Método HTTP: POST
- Descrição: Cria uma nova sala.
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ao ser decodificado.
- Corpo da Solicitação (JSON):

```
{
  "Id": "7d543d77-73ca-41d7-8cd3-7239e8c916d5",
  "RoomNumber": "10",
  "MovieTitle": "Mad Max",
  "MovieSubtitle": "Estrada de Fúria",
  "MovieCategory": "Ação",
  "EventDateTime": "2025-11-04T01:28:26.020Z"
  "CreatedAt": "2023-12-29T03:36:57.6533333",
  "UpdatedAt": "0001-01-01T00:00:00"
}
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Os campos não foram corretamente preenchidos",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a criação da sala.",
  "Error": "string (detalhes do erro)"
}

```

### Cria Um Novo Ingresso Para a Sala Especificada

- Endpoint: /api/v1/create-ticket/{roomId}
- Método HTTP: POST
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ou 'User' ao ser decodificado.
- Parâmetro de Rota (Path Parameter):
  roomId (string): ID da sala
- Corpo da Solicitação (JSON):

```
{
  "MovieTitle": "Avatar",
  "MovieSubtitle": "O Caminho da Água",
  "RoomNumber": "1",
  "OrderId": "#PlF519pkyx3hD",
  "AmountPaid": 10,
  "EventDateTime": {
    "Date": "2024-11-17T04:30",
    "Time": "04:30:00"
  },
  "UserId": "ff9cff63-6c05-4720-aea3-f251aac168e2",
  "PurchasedSeats": ["A03", "A04"],
   "CreatedAt": "2023-12-27T19:37:44.8733333",
   "UpdatedAt": "2023-12-29T03:32:19.6266667"
}
```

- Resposta de Sucesso (200 OK):

```
{
    "Ticket": {
        "Id": "94d2dd04-ce22-4ff2-a4b4-a6f4305256e7",
        "MovieTitle": "Avatar",
         "MovieSubtitle": "O Caminho da Água",
        "OrderId": "#PlF519pkyx3hD",
        "RoomNumber": "1",
        "AmountPaid": 2,
        "EventDateTime": {
            "Date": "2024-11-17T04:30:00",
            "Time": "04:30:00"
        },
        "UserId": "ff9cff63-6c05-4720-aea3-f251aac168e2",
        "PurchasedSeats": [
            "A03",
            "A04"
        ],
          "IsUsed": false,
    "CreatedAt": "2023-12-27T19:37:44.8733333",
    "UpdatedAt": "0001-01-01T00:00:00"
    }
}
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Os campos não foram corretamente preenchidos",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a criação do ingresso.",
  "Error": "string (detalhes do erro)"
}
```

### Cria Um Novo GiftCard

- Endpoint: /api/v1/create-giftcard
- Método HTTP: POST
- Descrição: Cria um novo cartão de presente.
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ao ser decodificado.
- Resposta de Sucesso (200 OK):

```
{
    "Message": "Gift card criado com sucesso",
    "GiftCard": {
        "Id": "8b9ee6f1-ca3b-4cea-9d85-ff0f56f64f03",
        "GiftCodigo": "b8c96cfb-e7ef-4cfd-944d-5a89b8e589a5",
        "IsUsed": false,
        "CreatedAt": "2023-12-29T03:43:13.18",
        "UpdatedAt": "0001-01-01T00:00:00"
    }
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a adição dos assentos.",
  "Error": "string (detalhes do erro)"
}
```

### Adicionar Assento à Sala

- Endpoint: /api/v1/add-seat
- Método HTTP: POST
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ao ser decodificado.
- Corpo da Solicitação (JSON):

```
{
    "Id": "7d543d77-73ca-41d7-8cd3-7239e8c916d5",
    "SeatNumber": [
        "A01",
    ],
    "SeatPrice": 1.0,
    "RoomId": "3bded671-6e73-4296-85b3-8ec4a2a60717"
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a atualização da sala.",
  "Error": "string (detalhes do erro)"
}
```

### Atualiza Salas

- Endpoint: /api/v1/update-room/{id}
- Método HTTP: PUT
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ao ser decodificado.
- Parâmetro de Rota (Path Parameter):
  id (string): ID da sala a ser atualizada
- Corpo da Solicitação (JSON):

```
{
  "Id": "7d543d77-73ca-41d7-8cd3-7239e8c916d5",
  "RoomNumber": "4",
  "MovieTitle": "Mad",
  "MovieSubtitle": "Estrada de Fúria",
  "MovieCategory": "Ação",
  "EventDateTime": "2025-11-04T01:28:26.020Z"
  "CreatedAt": "2023-12-29T04:47:34.4566667",
  "UpdatedAt": "2023-12-29T04:48:05.5533333"
}
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Os campos não foram corretamente preenchidos",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a atualização da sala.",
  "Error": "string (detalhes do erro)"
}
```

### Marca o GifCard como Utilizado

- Endpoint: /api/v1/update-gift/{code}
- Método HTTP: PUT
- Descrição: Marca um cartão de presente como utilizado.
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ou 'User' ao ser decodificado.
- Parâmetro de Rota (Path Parameter):
  code (string): Código do cartão de presente
- Resposta de Sucesso (200 OK):

```
true
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Algo deu errado",
"Errors": ["O gift com o código ca1213cc-e1c0-466b-8862-d5d0ade7bcea já foi utilizado."]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro ao marcar o cartão de presente como utilizado.",
  "Error": "string (detalhes do erro)"
}

```

### Marca o Ingresso como Utilizado

Endpoint: /api/v1/update-ticket/{ticketId}

- Método HTTP: PUT
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ao ser decodificado.
- Parâmetro de Rota (Path Parameter):
  ticketId (string): ID do ingresso a ser marcado como utilizado
- Resposta de Sucesso (200 OK):

```
true
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Algo deu errado",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message" = "Ocorreu um erro ao marcar o ingresso como utilizado.",
  "Error": "string (detalhes do erro)"
}
```

### Exclui uma Sala Específica

- Endpoint: /api/v1/delete-room/{id}
- Método HTTP: DELETE
- Cabeçalho de Autenticação: Para autenticação, o cabeçalho exige o token JWT de usuário do tipo 'Bearer' que contenha a função 'Admin' ao ser decodificado.
- Parâmetro de Rota (Path Parameter):
  id (string): ID da sala a ser excluída
- Resposta de Sucesso (200 OK):

```
{
  "Message": "A sala foi excluída corretamente"
}
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Algo deu errado",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a exclusão da sala.",
  "Error": "string (detalhes do erro)"
}
```
