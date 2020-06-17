# Confere_Back-end
<h2>Rodando a aplicação</h2>
<p>Para conseguir executar a aplicação na sua máquina, faça o clone do repositório</p>
<p>Dentro da pasta do projeto com ele aberto no seu terminal/IDE, execute o comando "yarn"</p>
<p>Crie uma imagem postgress no docker com o comando</p>
```
docker run --name confere -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
<p>na pasta raíz do projeto crie dois arquivos um ".env" e um "ormconfig.json"</p>
<p>dentro do arquivo ".env" adicione uma sequencia de caracteres randomicos para usar de base para o JWT</p>
<p>dentro do ormconfig.json complete o campo username, password, database com os próprios </p>
<p>caso tenha utilizado meu comando para criar a imagem pode preencher da seguinte maneira</p>
<p>username:postgres </p>
<p>senha: docker</p>
<p>Para criar o banco de dados utilize o gerenciador da sua preferencia, minha recomendação é o DBeaver</p>
<p>E crie um novo banco de dados com o nome de Confere dentro da sua imagem postgres</p>
<p>em seguida execute o comando</p>

  ````
  yarn typeorm migration:run
 ```` 
<p>para rodar as migrations.</p>

<h2>Testes</h2>
````
<p>yarn test</p>
````

<h2>Subir servidor com live-reload</h2>

````
yarn dev:server
````

<h2> Build</h2>
````
yarn build
````

