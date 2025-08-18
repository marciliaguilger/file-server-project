Cursor based pagination
 -> WHERE ID > 5 LIMIT 5 para que SQL  não precise fazer a leitura de todo o offset e aplicar o limit, para isso é necessário usar id com autoincrement.

Não é recomendável utilizar id auto increment para expor dados publicos.


UUIDv7 é ordenado. 

    