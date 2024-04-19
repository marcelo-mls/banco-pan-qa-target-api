## Descrição
Este projeto é uma aplicação `Node.js` com `Express` que interage com as APIs da Adobe.

Ele realiza requisições HTTP para obter informações sobre atividades, ofertas e audiências dentro do ambiente do Adobe Target. Posteriormente, ele processa, manipula e organiza os dados recebidos, mesclando, ordenando e refinando os resultados conforme necessário. Esses dados são então disponibilizados de forma mais organizada e estruturada através de uma outra API HTTP para consumo externo.

Em suma, o projeto atua como uma ponte entre as APIs do Adobe Target e outros sistemas, entregando informações de maneira mais acessível e organizada.

## Tecnologias
Este projeto foi desenvolvido utilizando `Node.js` juntamente com as seguintes tecnologias e bibliotecas:

- `Express`: Utilizado como framework web para criar e gerenciar as rotas da API, facilitando o desenvolvimento de aplicativos web e APIs RESTful.
- `Cors`: Usado para habilitar o controle de acesso HTTP, permitindo que este aplicativo web seja acessado por outros domínios.
- `Dotenv`: Utilizado para carregar variáveis de ambiente a partir de um arquivo .env, facilitando a configuração de informações sensíveis, como chaves de acesso e segredos do cliente.
- `Nodemon`: Ferramenta de desenvolvimento usada para monitorar as alterações nos arquivos do projeto e reiniciar automaticamente o servidor quando necessário durante o desenvolvimento.
- `Eslint`: Utilizado como uma ferramenta de linting para manter um código JavaScript consistente e de alta qualidade.

Essas tecnologias e bibliotecas foram escolhidas para oferecer uma base sólida e eficiente para o desenvolvimento da aplicação, garantindo desempenho e facilidade de manutenção.

## Iniciando
1. Clone o repositório
2. Instale as dependências, com `npm i`
4. Informe as variáveis de ambiente
3. Inicie o servidor com `npm run dev`
>Aviso: O backend estará disponível na porta **3001**. Certifique-se de acessar esta porta para visualizar a aplicação.

## Variáveis de Ambiente
Importante lembrar de criar um arquivo `.env` e preencher com as variáveis de ambiente conforme indicado no arquivo `.env.example`

## Rotas
> Todas as rotas retornam JSON.
> Em caso de sucesso, o status de resposta é 200 (OK).
> Lembre-se de informar os parâmetros adequados

### Atividades
- `GET`: /activities/
>Retorna uma lista de todas as atividades.
- `GET`: /activities/:activityId
>Retorna os detalhes de uma atividade específica com base no seu ID.

### Audiências
- `GET`: /audiences/
>Retorna uma lista de todas as audiências.
- `GET`: /audiences/:audienceId
>Retorna os detalhes de uma audiência específica com base no seu ID.

### Ofertas
- `GET`: /offers/:offerId
>Retorna os detalhes de uma oferta específica com base no seu ID.

### Espaços
- `GET`: /space/clean/:spaceName
>Retorna todo o conteúdo de um espaço, incluindo atividades, ofertas e audiências.

---

- [Repositório do frontend do projeto](https://github.com/marcelo-mls/banco-pan-qa-target-frontend)
- [Repositório do backend do projeto](https://github.com/marcelo-mls/banco-pan-qa-target-api)
