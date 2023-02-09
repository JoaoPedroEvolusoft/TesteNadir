const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
const mongodb = require("mongodb");

async function puxarItens() {
  // const connectionString = 'mongodb://localhost:27017/live_fabrica';
  const connectionString =
    "mongodb+srv://admin:admin@cluster0.a3mav.mongodb.net/curso-javascript?retryWrites=true&w=majority";

  console.info("Conectando ao banco de dados MongoDB...");

  const options = {
    useUnifiedTopology: true,
  };

  const client = await mongodb.MongoClient.connect(connectionString, options);

  const db = client.db("curso-javascript");
  const mensagens = db.collection("items");

  const getItemsValidas = () => mensagens.find({}).toArray();

  const items = await getItemsValidas();
  return items;
}
async function puxarDados() {
  // const connectionString = 'mongodb://localhost:27017/live_fabrica';
  const connectionString =
    "mongodb+srv://admin:admin@cluster0.a3mav.mongodb.net/curso-javascript?retryWrites=true&w=majority";

  console.info("Conectando ao banco de dados MongoDB...");

  const options = {
    useUnifiedTopology: true,
  };

  const client = await mongodb.MongoClient.connect(connectionString, options);

  const db = client.db("curso-javascript");
  const mensagens = db.collection("items");

  const getItemsValidas = () => mensagens.find({}).toArray();

  const items = await getItemsValidas();

  const CodItems = [];
  items.forEach(function (name, i) {
    CodItems.push(items[i].item);
  });

  return CodItems;
}

async function buscarPuppetear(url = String, variaveis= [], caminhoImagem= String, codigo = String) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url + codigo);

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
  } catch (err) {
    console.log("Erro: " + err);
  }
  await page.waitForTimeout(10000);
  try {
    const imgList = await retornaListaImagens(page, caminhoImagem);
    console.log("O codigo é : " + codigo);
    console.log("Os src são : ");
    console.log(imgList);

    imgList.forEach(function (element = any, i = Number) {
      console.log("Elemento: ");
      console.log(element.src + "       " + i + "       " + codigo);

      baixarImagens(element.src, i, codigo);
    });
  } catch (err) {
    console.log("Erro aqui : ");
    console.log(err);
  }
  await page.waitForTimeout(10000);
  await browser.close();
}

async function retornaListaImagens(page = puppeteer.Page, caminhoImagem = String) {
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
function baixarImagens(imgList = String, i = Number, codigo = String) {
  axios({
    method: "GET",
    url: imgList,
    responseType: "stream",
  })
    .then((response) => {
      response.data.pipe(
        fs.createWriteStream(
          "../frontend/src/assets/" +
            codigo +
            "/img" +
            codigo +
            "_" +
            i +
            ".jpg"
        )
      );
      console.log("Baixada!");
    })
    .catch((error) => {
      console.log(error);
    });
}
async function criarpasta(codigo = String) {
  const caminhoPasta = "../frontend/src/assets/" + codigo;
  try {
    fs.mkdirSync(caminhoPasta);
    console.log("Pasta criada");
  } catch (err) {
    console.log(err);
  }
}

exports.start = async (req, res) => {
	const urlbusca = req.body.urlbusca;
  const variaveis = req.body.variaveis;
  const caminhoImagem = req.body.caminhoImagem;
	if(!urlbusca){
		res.status(400).send({
			message:
			err.message || "Não tem link válido!"
		});
	}
	
	try {

		const codigos = await puxarDados();
  		codigos.forEach(function (codigo = String) {
			console.log(codigo);
			criarpasta(codigo);
			buscarPuppetear(urlbusca, variaveis , caminhoImagem , codigo);
  		});

		res.status(200).send({
			message: "Deu bom"
		});

	} catch (error) {
		res.status(400).send({
			message:
			err.message || "Não foi possível realizar a busca"
		});
	}
}


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
  arrayItens.forEach(function(item=String,i=Number){
        descricao.push(arrayItens[i].descricao);
  });

  console.log(descricao);

	if(!urlbusca){
		res.status(400).send({
			message:
			err.message || "Não tem link válido!"
		});
	}
	
	try {

    
  
  		descricao.forEach(function(ola=String,i= Number){
			console.log(descricao[i]);
			criarpasta(descricao[i]);

      console.log(urlbusca);
      console.log(variaveis[i]);
      console.log(caminhoImagem);

			buscarPuppetear(urlbusca, variaveis , caminhoImagem , descricao[i]);
  		});

		res.status(200).send({
			message: "Deu bom"
		});

	} catch (error) {
		res.status(400).send({
			message:
			err.message || "Não foi possível realizar a busca"
		});
	}
}

exports.start3 = async (req, res) => {

    const corpo = req.body;
    // console.log(array);
    const arrayItens= [];
   idparceiro = corpo.parceiro.id;
   console.log(idparceiro);
   const configbusca = corpo.configuracaoBusca;
   const urlbusca = configbusca.urlbusca;
   const variaveis = configbusca.variaveis;
   const caminhoImagem = configbusca.caminhoImagem;

   const itens = await puxarItens();
   itens.forEach(function(string= String,i=Number){
    if(itens[i].parceiro == idparceiro){
      console.log('Empilhado');
      arrayItens.push(itens[i]);
     }else{
      console.log('Não Empilhado!');
     }
   }
   )
   
   console.log(arrayItens);

  const descricao = [];
  arrayItens.forEach(function(item=String,i=Number){
        descricao.push(arrayItens[i].descricao);
  });

  console.log(descricao);

	if(!urlbusca){
		res.status(400).send({
			message:
			err.message || "Não tem link válido!"
		});
	}
	
	try {

    
  
  		descricao.forEach(function(ola=String,i= Number){
			console.log(descricao[i]);
			criarpasta(descricao[i]);

      console.log(urlbusca);
      console.log(variaveis[i]);
      console.log(caminhoImagem);

			buscarPuppetear(urlbusca, variaveis , caminhoImagem , descricao[i]);
  		});

		res.status(200).send({
			message: "Deu bom"
		});

	} catch (error) {
		res.status(400).send({
			message:
			err.message || "Não foi possível realizar a busca"
		});
	}
}