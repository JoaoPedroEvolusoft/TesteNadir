const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
const db = require("../../models");
const itemModel = require("../../models/item.model");
const { itens } = require("../../models");
const Item = db.itens;

async function buscarPuppetear(
  url = String,
  variaveis = [],
  caminhoImagem = String,
  Itens= []
) {
  for(let index=0; index<Itens.length; index++){
  const browser = await puppeteer.launch({ headless: false, maxConcurrency: 1});
  const page = await browser.newPage();
  await page.goto(url + Itens[index].descricao,{
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0
});

  //   await page.screenshot({path: 'example.png'});
  try {
    //clica no component do codigo
    // await page.click('#pages-search')
    // await page.click('#skrollr-body > main > div > section > div.search-content__products > div > div.product__img > a')
    // await page.waitForSelector('.newTitle')
    await page.waitForTimeout(5000);
    await page.click(variaveis[0], { clickCount: 1 });
    await page.waitForTimeout(5000);
    await page.click(variaveis[1], { clickCount: 1 });
  } catch (err) {}
  await page.waitForTimeout(10000);
  try {
    const imgList = await retornaListaImagens(page, caminhoImagem);
    console.log("O codigo é : " + Itens[index].item);
    console.log("Os src são : ");
    console.log(imgList);


    const codigoDoProduto = Itens[index].item;
    var caminhoPasta = "";
    const tamanhoVetor = codigoDoProduto.length;
    let i = 0;
    var posicao = 0;
    while (i != tamanhoVetor) {
      caminhoPasta = caminhoPasta + codigoDoProduto.substr(posicao, 2);
      // console.log(caminhoPasta);
      try {
        criarpasta(caminhoPasta);
      } catch (err) {
        console.log("Deu erro aqui mas segue o jogo!");
      }
      caminhoPasta = caminhoPasta + "/";
      i++;
      posicao = posicao + 2;
      if (codigoDoProduto.length < posicao) {
        i = codigoDoProduto.length;
      }
    }
    imgList.forEach(function (element = any, i = Number) {
      console.log("Elemento: ");
      console.log(element.src + "       " + i + "       " + Itens[index].item);
      console.log("Aqui estamos : "+caminhoPasta);
      baixarImagens(element.src, i, codigoDoProduto, caminhoPasta);
    });
  } catch (err) {
    console.log(err);
  }
  await page.waitForTimeout(10000);
  await browser.close();
}
}

async function retornaListaImagens(
  page = puppeteer.Page,
  caminhoImagem = String
) {
  const imgList = await page.evaluate((caminhoImagem) => {
    // var caminhoImagem =
    //   ".ui-pdp-gallery__column .ui-pdp-gallery__wrapper .ui-pdp-gallery__figure img";

    // var caminhoImagem2 = ".swiper-wrapper .swiper-slide .pswp-open img";

    //Declara o Caminho que vamos percorrer para chegar na imagem

    // toda essa funçao sera executada no browser
    //vamos pegar todas as imagens q estao na parte de postes
    const nodeList = document.querySelectorAll(caminhoImagem);
    console.log(nodeList);
    //transformar o nodeList em array
    const imgArray = [...nodeList];
    //transformar os nodes (elements html) em objetos js

    const imglist = imgArray.map(({ src }) => ({
      src,
    }));

    //colocar para fora da funçao
    return imglist;
  }, caminhoImagem);
  return imgList;
}

// function criarArquivosSRC(imgList = any, codigo = String){
//         fs.writeFile('imagens'+codigo+'.json',JSON.stringify(imgList, null, 2),err => {
//                 if(err) throw new Error('Something went wrong')

//                 console.log('well done')
//         })
// }
function baixarImagens(imgList = String, i = Number, codigo = String, caminhoPastas = String) {
  axios({
    method: "GET",
    url: imgList,
    responseType: "stream",
  })
    .then((response) => {
      response.data.pipe(
        fs.createWriteStream(
          "../frontend/src/assets/" +
            caminhoPastas+
            codigo +
            "_" +
            i +
            ".jpg"
        )
      );
      console.log("Baixada!");
    })
    .catch((error) => {
      console.log("Não Foi possivel Baixar");
    });
}
async function criarpasta(codigo = String) {
  const caminhoPasta = "../frontend/src/assets/" + codigo;
  try {
    fs.mkdirSync(caminhoPasta);
    console.log("Pasta criada");
  } catch (err) {
    console.log("Você ja criou estes diretórios do seguinte tipo: "+ caminhoPasta);
  }
}

exports.start = async (req, res) => {

  const itens = await Item.find();

  const urlbusca = req.body.urlbusca;
  const variaveis = req.body.variaveis;
  const caminhoImagem = req.body.caminhoImagem;
  if (!urlbusca) {
    res.status(400).send({
      message: err.message || "Não tem link válido!",
    });
  }

  try {
    itens.forEach(async function (codigo = String,index = Number) {
      const codigoDoProduto = itens[index].item;
      var caminhoPasta = "";
      const tamanhoVetor = codigoDoProduto.length;
      let i = 0;
      var posicao = 0;
      while (i != tamanhoVetor) {
        caminhoPasta = caminhoPasta + codigoDoProduto.substr(posicao, 2);
        // console.log(caminhoPasta);
        try {
          criarpasta(caminhoPasta);
        } catch (err) {
          console.log("Deu erro aqui mas segue o jogo!");
        }
        caminhoPasta = caminhoPasta + "/";
        i++;
        posicao = posicao + 2;
        // console.log(caminhoPasta);
        if (codigoDoProduto.length < posicao) {
          i = codigoDoProduto.length;
        }
      }
    });
     buscarPuppetear(urlbusca, variaveis , caminhoImagem , itens);
    res.status(200).send({
      message: "Deu bom",
    });
  } catch (error) {
    res.status(400).send({
      message: err.message || "Não foi possível realizar a busca",
    });
  }
};

// for(let i=0 ; i<20 ; i++){
//         let codigo = ''+i
//         criarpasta(codigo);
//         buscarPuppetear('https://lista.mercadolivre.com.br/', i);
// }
exports.start2 = async (req, res) => {
  const arrayItens = req.body;

  const configbusca = arrayItens[0].config;

  const urlbusca = configbusca.urlbusca;
  const variaveis = configbusca.variaveis;
  const caminhoImagem = configbusca.caminhoImagem;

  const descricao = [];
  const codigo = [];
  arrayItens.forEach(function (item = String, i = Number) {
    descricao.push(arrayItens[i].descricao);
    codigo.push(arrayItens[i].item);
  });

  console.log(descricao);

  if (!urlbusca) {
    res.status(400).send({
      message: err.message || "Não tem link válido!",
    });
  }

  try {
    descricao.forEach(function (ola = String, i = Number) {
      console.log(descricao[i]);

      const codigoDoProduto = codigo[i];
      var caminhoPasta = "";
      const tamanhoVetor = codigoDoProduto.length;
      let indexDoWhile = 0;
      var posicao = 0;
      while (indexDoWhile != tamanhoVetor) {
        caminhoPasta = caminhoPasta + codigoDoProduto.substr(posicao, 2);
        console.log(caminhoPasta);
        try {
          criarpasta(caminhoPasta);
        } catch (err) {
          console.log("Deu erro aqui mas segue o jogo!");
        }
        caminhoPasta = caminhoPasta + "/";
        indexDoWhile++;
        posicao = posicao + 2;
        console.log(caminhoPasta);
        if (codigoDoProduto.length < posicao) {
          indexDoWhile = codigoDoProduto.length;
        }
      }

      console.log(urlbusca);
      console.log(variaveis[i]);
      console.log(caminhoImagem);

      buscarPuppetear(urlbusca, variaveis , caminhoImagem , descricao[i], codigo[i]);
    });

    res.status(200).send({
      message: "Deu bom",
    });
  } catch (error) {
    res.status(400).send({
      message: err.message || "Não foi possível realizar a busca",
    });
  }
};

exports.start3 = async (req, res) => {
  const corpo = req.body;
  // console.log(array);
  const arrayItens = [];
  idparceiro = corpo.parceiro.id;
  console.log(idparceiro);
  const configbusca = corpo.configuracaoBusca;
  const urlbusca = configbusca.urlbusca;
  const variaveis = configbusca.variaveis;
  const caminhoImagem = configbusca.caminhoImagem;

  const itens = await puxarItens();
  itens.forEach(function (string = String, i = Number) {
    if (itens[i].parceiro == idparceiro) {
      console.log("Empilhado");
      arrayItens.push(itens[i]);
    } else {
      console.log("Não Empilhado!");
    }
  });

  console.log(arrayItens);

  const descricao = [];
  const codigo = [];

  arrayItens.forEach(function (item = String, i = Number) {
    descricao.push(arrayItens[i].descricao);
    codigo.push(arrayItens[i].item);

  });

  console.log(descricao);

  if (!urlbusca) {
    res.status(400).send({
      message: err.message || "Não tem link válido!",
    });
  }

  try {
    descricao.forEach(function (ola = String, i = Number) {
      console.log(descricao[i]);

      const codigoDoProduto = codigo[i];
      var caminhoPasta = "";
      const tamanhoVetor = codigoDoProduto.length;
      let indexDoWhile = 0;
      var posicao = 0;
      while (indexDoWhile != tamanhoVetor) {
        caminhoPasta = caminhoPasta + codigoDoProduto.substr(posicao, 2);
        console.log(caminhoPasta);
        try {
          criarpasta(caminhoPasta);
        } catch (err) {
          console.log("Deu erro aqui mas segue o jogo!");
        }
        caminhoPasta = caminhoPasta + "/";
        indexDoWhile++;
        posicao = posicao + 2;
        console.log(caminhoPasta);
        if (codigoDoProduto.length < posicao) {
          indexDoWhile = codigoDoProduto.length;
        }
      }

      console.log(urlbusca);
      console.log(variaveis[i]);
      console.log(caminhoImagem);

      buscarPuppetear(urlbusca, variaveis , caminhoImagem , descricao[i],codigo[i]);
    });

    res.status(200).send({
      message: "Deu bom",
    });
  } catch (error) {
    res.status(400).send({
      message: err.message || "Não foi possível realizar a busca",
    });
  }
};
