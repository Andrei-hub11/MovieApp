#!/bin/bash

# Iniciar o serviço do SQL Server
/opt/mssql/bin/sqlservr &

# Esperar um tempo para garantir que o SQL Server esteja pronto para aceitar conexões
sleep 50

# Executar o script SQL usando sqlcmd
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P S3nh@V@lid4 -i /docker-entrypoint-initdb.d/setup.sql

# Manter o contêiner em execução
tail -f /dev/null
