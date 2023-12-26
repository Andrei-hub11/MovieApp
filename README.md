![MovieApp React](https://github.com/Andrei-hub11/MovieApp/assets/83555334/b1f7134d-bcfa-481d-8cd0-27372ad7c87a)

Cria uma nova função.

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

Registra um novo usuário.

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

Endpoint: /api/v1/rooms

- Método HTTP: GET
- Descrição: Obtém todas as salas disponíveis.
- Política de Autorização: "UserOrAdmin"
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

Endpoint: /api/v1/rooms-events-coming

- Método HTTP: GET
- Descrição: Obtém os próximos eventos das -salas.
- Política de Autorização: "UserOrAdmin"
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

Endpoint: /api/v1/get-rooms-by-title

- Método HTTP: GET
- Descrição: Obtém salas por título de filme.
- Política de Autorização: "UserOrAdmin"
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

Endpoint: /api/v1/check-giftcard/{giftCode}

- Método HTTP: GET
- Descrição: Verifica se o código do cartão de presente foi usado.
- Política de Autorização: "UserOrAdmin"
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
