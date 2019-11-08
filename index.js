const rp = require('request-promise')
const cheerio = require('cheerio')

const CORINTHIANS = "Corinthians";
const PALMEIRAS =  "Palmeiras";
const SANTOS = "Santos";

// A url: https://app1-paoshiro.s3-sa-east-1.amazonaws.com/index.html é uma página desenvolvida com base na página do globo esporte
const options = {
  uri: 'https://app1-paoshiro.s3-sa-east-1.amazonaws.com/index.html',
  transform: function (body) {
    return cheerio.load(body)
  }
}

rp(options)
  .then(($) => {

    const listaRivalidade = []

    // Percorre as linhas das tabelas que contém os dados de cada clássico
    $('.table tr').each(function () {

      // cria um objeto com informações dos maiores clássicos do futebol e de acordo com a classe da coluna da tabela
      const rivalidade = {
        posicao: $(this).find('.titlePosition').text(),
        time1: $(this).find('.titleTeam1').text(),
        time2: $(this).find('.titleTeam2').text(),
        pontuacao: $(this).find('.titlePoints').text(),
      }

      // verifico se é um objeto com dados válidos e incremento na lista
      if (rivalidade.time1 && rivalidade.time2 && rivalidade.pontuacao) {
        console.log(` Rivalidade entre times: ${rivalidade.posicao} -  ${rivalidade.time1} X ${rivalidade.time2} : ${rivalidade.pontuacao}`);
        listaRivalidade.push(rivalidade);
      }

    });

    // chamo o método responsável pela validação do grau de rivalidade
    verificaRivalidadeCorinthiana(listaRivalidade);

  })
  .catch((err) => {
    console.log("Erro de captura de informação", err);
  });


  
// Método que verifica a hipótese da rivalidade entre Corinthians X Palmeiras ser maior que Corinthians X Santos
function verificaRivalidadeCorinthiana(listaRivalidade) {
  let rivalidadeCorinthiansPalmeiras;
  let rivalidadeCorinthiansSantos;

  listaRivalidade.forEach(element => {
    if (element.time1 === CORINTHIANS || element.time2 === CORINTHIANS) {
      if (element.time1 == PALMEIRAS || element.time2 === PALMEIRAS) {
        rivalidadeCorinthiansPalmeiras = element;
      }
    }

    if (element.time1 === CORINTHIANS || element.time2 === CORINTHIANS) {
      if (element.time1 == SANTOS || element.time2 === SANTOS) {
        rivalidadeCorinthiansSantos = element;
      }
    }
  });

  if ((rivalidadeCorinthiansPalmeiras && rivalidadeCorinthiansPalmeiras.pontuacao)
    > (rivalidadeCorinthiansSantos && rivalidadeCorinthiansSantos.pontuacao)) {
    console.log("Validação da hipótese: ");
    console.log(` ${rivalidadeCorinthiansPalmeiras.time1} X ${rivalidadeCorinthiansPalmeiras.time2} : ${rivalidadeCorinthiansPalmeiras.pontuacao}`);
    console.log(` ${rivalidadeCorinthiansSantos.time1} X ${rivalidadeCorinthiansSantos.time2} : ${rivalidadeCorinthiansSantos.pontuacao}`);
  }
}