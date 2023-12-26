# Use a imagem base do SQL Server 2019
FROM mcr.microsoft.com/mssql/server:2019-latest

# Copie o arquivo setup.sql para dentro do container
COPY setup.sql /docker-entrypoint-initdb.d/

# Defina variáveis de ambiente para o SQL Server
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=S3nh@V@lid4

USER root
# Copie o script de inicialização personalizado
COPY custom-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/custom-entrypoint.sh
USER mssql

# Defina o novo ponto de entrada para o contêiner usando o script personalizado
ENTRYPOINT ["/usr/local/bin/custom-entrypoint.sh"]
