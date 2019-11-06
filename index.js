const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
  uri: 'https://app1-paoshiro.s3-sa-east-1.amazonaws.com/index.html',
  transform: function (body) {
    return cheerio.load(body)
  }
}

rp(options)
  .then(($) => {

    const listaRivalidade = []
    $('.table tr').each(function () {
      const rivalidade = {
        posicao: $(this).find('.titlePosition').text(),
        time1: $(this).find('.titleTeam1').text(),
        time2: $(this).find('.titleTeam2').text(),
        pontuacao: $(this).find('.titlePoints').text(),
      }

      if (rivalidade.time1 !== "") {
        console.log(` Rivalidade entre times: ${rivalidade.posicao} -  ${rivalidade.time1} X ${rivalidade.time2} : ${rivalidade.pontuacao}`);
        listaRivalidade.push(rivalidade);
      }

    });

    verificaRivalidadeCorinthiana(listaRivalidade);

  })
  .catch((err) => {
    console.log("Erro de captura de informação", err);
  });

function verificaRivalidadeCorinthiana(listaRivalidade) {
  let rivalidadeCorinthiansPalmeiras;
  let rvalidadeCorinthiansSantos;

  listaRivalidade.forEach(element => {
    if (element.time1 === 'Corinthians' || element.time2 === 'Corinthians') {
      if (element.time1 == 'Palmeiras' || element.time2 === 'Palmeiras') {
        rivalidadeCorinthiansPalmeiras = element;
      }
    }

    if (element.time1 === 'Corinthians' || element.time2 === 'Corinthians') {
      if (element.time1 == 'Santos' || element.time2 === 'Santos') {
        rvalidadeCorinthiansSantos = element;
      }
    }
  });

  if ((rivalidadeCorinthiansPalmeiras && rivalidadeCorinthiansPalmeiras.pontuacao)
    > (rvalidadeCorinthiansSantos && rvalidadeCorinthiansSantos.pontuacao)) {
    console.log("Validação da hipótese: ");
    console.log(` ${rivalidadeCorinthiansPalmeiras.time1} X ${rivalidadeCorinthiansPalmeiras.time2} : ${rivalidadeCorinthiansPalmeiras.pontuacao}`);
    console.log(` ${rvalidadeCorinthiansSantos.time1} X ${rvalidadeCorinthiansSantos.time2} : ${rvalidadeCorinthiansSantos.pontuacao}`);
  }
}