# API-iSaude

API desenvolvida com Node, Express e MongoDB com a finalidade de ser utilizada para a aplicação iSaúde.
URL : https://api-isaude.herokuapp.com

## ENDPOINTS:

- /user
- /login
- /user/:id
- /user/:id/vaccines
- /user/:userId/vaccines/:vaccineId

### Requisições:

### Rota /user

- Registrar usuário: POST


		{
		 	"name":"luiz",
			 "email":"lf@g.com",
			 "gender":"masc",
			 "dateOfBirth":"19/02/1995",
			 "state":"MG",
			 "city":"Araguari",
			 "cpf":"0000100111",
			 "password":"1234"
		}
		
		
- Resposta: Status 201:


		{
			"name": "luiz",
			"avatarUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
			"createdAt": "Fri Mar 18 2022 18:31:58 GMT+0000 (Coordinated Universal Time)",
			"email": "lf@g.com",
			"gender": "masc",
			"dateOfBirth": "19/02/1995",
			"state": "MG",
			"city": "Araguari",
			"cpf": "0000100111",
			"password": "1234",
			"vaccines": [],
			"_id": "6234d0c9feeaf6018e84ecd7",
			"__v": 0
		}
		
- Resposta: Status 500: 

		{
			"error":"Algo deu errado."
		}
		
### Rota /login: 

- Login de usuário: POST

		{
			"email":"lf@g.com",
			"password":"1234"
		}
		

- Resposta: Status 201:

		{

			"token": 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzRkMGM5ZmVlYWY2MDE4ZTg0ZWNkNyIsImlhdCI6MTY0NzYzMTEzMSwiZXhwIjoxNjQ3NzE3NTMxfQ.gnDMQJ9OJT6daGPDp2S3fydEVyMKSiKy4jXzmaIaDZ4",
			"user": {
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
				"password": "1234",
				"vaccines": [],
				"__v": 0
			}
		}
		



