# API-iSaude

API desenvolvida com Node, Express e MongoDB com a finalidade de ser utilizada para a aplicação iSaúde.
URL : https://api-isaude.herokuapp.com

## ENDPOINTS:

- /user
- /login
- /user/:id/vaccines
- /user/:userId/vaccines/:vaccineId

### Requisições:

### Rota /user

- Registrar usuário: POST

		```json
		{
		 	"name":"luiz",
			 "email":"lf@g.com",
			 "gender":"masculino",
			 "dateOfBirth":"19/02/1995",
			 "state":"MG",
			 "city":"Araguari",
			 "cpf":"0000100111",
			 "password":"1234"
		}
		```
		
- Resposta: Status 201:


		{
			"name": "luiz",
			"avatarUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
			"createdAt": "Fri Mar 18 2022 18:31:58 GMT+0000 (Coordinated Universal Time)",
			"email": "lf@g.com",
			"gender": "masculino",
			"dateOfBirth": "19/02/1995",
			"state": "MG",
			"city": "Araguari",
			"cpf": "0000100111",
			"password": "1234",
			"vaccines": [],
			"_id": "6234d0c9feeaf6018e84ecd7",
			"__v": 0
		}
		
- Resposta: Status 400: 

		{
			"error":"CPF ou e-mail já cadastrados."
		}
		
### Rota /login: 

- Login de usuário: POST

		{
			"email":"lf@g.com",
			"password":"1234"
		}
		

- Resposta: Status 200:

		{

			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzRkMGM5ZmVlYWY2MDE4ZTg0ZWNkNyIsImlhdCI6MTY0Nz
			YzMTEzMSwiZXhwIjoxNjQ3NzE3NTMxfQ.gnDMQJ9OJT6daGPDp2S3fydEVyMKSiKy4jXzmaIaDZ4",
			"user": {
				"_id": "6234d0c9feeaf6018e84ecd7",
				"name": "luiz",
				"avatarUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
				"createdAt": "Fri Mar 18 2022 18:31:58 GMT+0000 (Coordinated Universal Time)",
				"email": "lf@g.com",
				"gender": "masculino",
				"dateOfBirth": "19/02/1995",
				"state": "MG",
				"city": "Araguari",
				"cpf": "0000100111",
				"password": "1234",
				"vaccines": [],
				"__v": 0
			}
		}
		
- Resposta: Status 400: 

		{
			"error":"Usuário não existe."
		}
		

- Resposta: Status 400: 

		{
			"error":"Senha incorreta."
		}
		
		
## Rotas em que é necessária autenticação.

### Rota /user/:id/vaccines: 

- Criação de vacina: POST
		
		{
			"name":"Tétano",
			"manufacturer": "UFU",
			"batch": "444222",
			"applicationDate":"19/08/2020",
			"location":"Guaratinguetá"
		}
		
- Resposta: Status 200:

		{
			"_id": "6234d0c9feeaf6018e84ecd7",
			"name": "luiz",
			"avatarUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
			"createdAt": "Fri Mar 18 2022 18:31:58 GMT+0000 (Coordinated Universal Time)",
			"email": "lf@g.com",
			"gender": "masc",
			"dateOfBirth": "19/02/1995",
			"state": "MG",
			"city": "Araguari",
			"cpf": "0000100111",
			"vaccines": [],
			"__v": 0
		}
		
- Resposta: Status 400: 

		{
			"error":"Usuário não encontrado."
		}
		
- Buscar vacinas de um usuário: GET
		
- Resposta: Status 200:

		[
			{
				"name": "Tétano",
				"manufacturer": "UFU",
				"batch": "444222",
				"applicationDate": "19/08/2020",
				"location": "Guaratinguetá",
				"nextShot": "Esquema completo",
				"_id": "62385b999f1386618e6fda27",
				"__v": 0
			},
			{
				"name": "Covid-19",
				"manufacturer": "Pfizer",
				"batch": "123123",
				"applicationDate": "20/12/2020",
				"location": "Araguari",
				"nextShot": "Esquema completo",
				"_id": "62385bb99f1386618e6fda2b",
				"__v": 0
			}
		]
		
- Resposta: Status 400: 

		{
			"error":"Usuário não encontrado."
		}
		

### Rota /user/:id/vaccines/:vaccineId:

- Edição de vacina: PATCH --- Todos campos são alteráveis
		
		{
			"manufacturer": "UFU",
		}
		
- Resposta: Status 200:

		{
			"_id": "6234d0c9feeaf6018e84ecd7",
			"name": "luiz",
			"avatarUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
			"createdAt": "Fri Mar 18 2022 18:31:58 GMT+0000 (Coordinated Universal Time)",
			"email": "lf@g.com",
			"gender": "masc",
			"dateOfBirth": "19/02/1995",
			"state": "MG",
			"city": "Araguari",
			"cpf": "0000100111",
			"vaccines": [
				{
					"name": "Tétano",
					"manufacturer": "UFU",
					"batch": "444222",
					"applicationDate": "19/08/2020",
					"location": "Guaratinguetá",
					"nextShot": "Esquema completo",
					"_id": "6234db5fa10936ea9959e55e",
					"__v": 0
				}
			],
			"__v": 0
		}
		
- Resposta: Status 404: 

		{
			"error":"Usuário não encontrado."
		}
		
- Resposta: Status 404: 

		{
			"error":"Vacina não encontrada."
		}

- Deletar vacina: DELETE

/user/:id/vaccines/:vaccineId:


-Resposta status 204: 

			Não há corpo de requisição.


- Resposta: Status 404: 

		{
			"error":"Usuário não encontrado."
		}
		
- Resposta: Status 404: 

		{
			"error":"Vacina não encontrada."
		}

