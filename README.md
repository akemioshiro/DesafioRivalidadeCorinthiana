# DesafioRivalidadeCorinthiana
Valida a hipótese de que o Corinthians 
possui uma rivalidade maior com o Palmeiras do que com o Santos, de acordo com uma pontuação baseada nos maiores clássicos do futebol brasileiro. 

# Descrição Técnica:
Desenvolvido um Web Crawler que busca informações em uma página que contém dados dos maiores clássicos do futebol brasileiro.
A página referência (https://app1-paoshiro.s3-sa-east-1.amazonaws.com/index.html) foi criada com base nas informações do site do Globo Esporte - Pombo Sem Asa (http://globoesporte.globo.com/blogs/especial-blog/pombo-sem-asa/post/com-mesmo-numero-de-votos-por-estado-elegemos-os-30-maiores-classicos-do-brasil-ranking.html).
Após a busca de informações, é verificado a hipótese de Rivalidade entre Corinthians X Palmeiras e Corinthians X Santos.

# Pré-requisito:
Instalação do NodeJS em sua máquina.
            Para download: https://nodejs.org/        



# Após o clone do projeto, entrar no diretório 'DesafioRivalidadeCorinthiana' e executar os seguintes comandos:

npm install

node index.js


# Utilizadas as bibliotecas:
request-promise: para chamadas REST.

cheerio: possibilita utilizar os seletores do JQuery em Node.js




