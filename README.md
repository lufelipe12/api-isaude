# API-iSaude

API desenvolvida com Node, Express e MongoDB com a finalidade de ser utilizada para a aplicação iSaúde.
URL : https://api-isaude.herokuapp.com

## ENDPOINTS:

- /user
- /user/:id
- /user/:id/vaccines
- /user/:userId/vaccines/:vaccineId

### Requisições:

- Registrar usuário: ###POST


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


