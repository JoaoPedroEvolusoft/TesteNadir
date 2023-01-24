const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios')
const mongodb= require('mongodb');

async function puxarDados(){

        // const connectionString = 'mongodb://localhost:27017/live_fabrica';
        const connectionString = 'mongodb+srv://admin:admin@cluster0.a3mav.mongodb.net/curso-javascript?retryWrites=true&w=majority';
        
        console.info('Conectando ao banco de dados MongoDB...');
        
        const options = {
            useUnifiedTopology: true
        };
        
        const client = await mongodb.MongoClient.connect(connectionString, options);
        
        const db = client.db('curso-javascript');
        const mensagens = db.collection('items');
        
        const getItemsValidas = () => mensagens.find({}).toArray();

        const items = await getItemsValidas();
        const CodItems= [];
        items.forEach( function (name,i){
              CodItems.push(items[i].item);
        });
        return CodItems;
}

const numero = 1;

var caminhoImagem;
if(numero == 1){
    url= 'https://lista.mercadolivre.com.br/';
}
if(numero == 2){
    url= 'https://www.tramontinastore.com/';
}

async function buscarPuppetear(url= String,codigo = String) {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url+codigo);
  
//   await page.screenshot({path: 'example.png'});
try{
if(numero == 1){
//Define onde vamos clicar ate chegar no produto
const clicar = ['.cookie-consent-banner-opt-out__action.cookie-consent-banner-opt-out__action--primary.cookie-consent-banner-opt-out__action--key-accept','.ui-search-result-image__element.shops__image-element'];



//clica no component do codigo
// await page.click('#pages-search')
// await page.click('#skrollr-body > main > div > section > div.search-content__products > div > div.product__img > a')
// await page.waitForSelector('.newTitle')
        await page.click(clicar[0], { clickCount: 1 })

        await page.click(clicar[1], { clickCount: 1 })
}
if(numero == 2){
        const clicarTramontina= '.bf-shelf-item__img.bf-shelf-item__img-front'
        const clicarX= '.close-modal'
        const clicarAcept = '#onetrust-accept-btn-handler'


        await page.waitForTimeout(5000);

        await page.click(clicarX, { clickCount: 1});
        await page.click(clicarAcept, { clickCount: 1});
        await page.waitForTimeout(5000);

        await page.click(clicarTramontina, { clickCount: 1});
}
}catch(err){
        console.log("Erro: "+ err);
}
console.log('aquii');
await page.waitForTimeout(10000);
try{
        const imgList = await retornaListaImagens(page);
        console.log("O codigo é : " +codigo);
        console.log("Os src são : " );
        console.log(imgList);

        imgList.forEach(function(element= any,i=Number){
                console.log("Elemento: ");
                console.log(element.src+"       "+i+"       "+codigo);
     
                baixarImagens(element.src,i,codigo);
        });

}catch(err){
        console.log("Erro aqui : ");
        console.log(err);
}
await page.waitForTimeout(10000);
await browser.close();
}


async function retornaListaImagens(page = puppeteer.Page){
        const imgList= await page.evaluate(() => {

                var caminhoImagem='.ui-pdp-gallery__column .ui-pdp-gallery__wrapper .ui-pdp-gallery__figure img';
     
                var caminhoImagem2='.swiper-wrapper .swiper-slide .pswp-open img';
                
        //Declara o Caminho que vamos percorrer para chegar na imagem
       
        
// toda essa funçao sera executada no browser
//vamos pegar todas as imagens q estao na parte de postes
        const nodeList = document.querySelectorAll(caminhoImagem)
        console.log(nodeList);
//transformar o nodeList em array
        const imgArray = [...nodeList]
//transformar os nodes (elements html) em objetos js

        const imglist= imgArray.map( ({src}) => ({
            src
        })) 

//colocar para fora da funçao
        return imglist;
    }  );
        return imgList;
}

// function criarArquivosSRC(imgList = any, codigo = String){
//         fs.writeFile('imagens'+codigo+'.json',JSON.stringify(imgList, null, 2),err => {
//                 if(err) throw new Error('Something went wrong')
            
//                 console.log('well done')
//         })
// }
function baixarImagens(imgList = String,i= Number, codigo = String){
        
        axios({
            method: 'GET',
            url: imgList,
            responseType: 'stream'
        }).then(response => {
            response.data.pipe(fs.createWriteStream('assets/'+codigo+'/img'+codigo+"_"+i+'.jpg'))
            console.log('Baixada!')
        }).catch(error => {console.log(error)})

}
async function criarpasta(codigo= String){
        const caminhoPasta = 'assets/'+codigo;
        try{
                fs.mkdirSync(caminhoPasta);
                console.log('Pasta criada');
        }catch(err){
                    console.log(err);
        }
}
async function start(){

const codigos = await puxarDados();
codigos.forEach( function(i=String){
        console.log(i);
        // criarpasta(i);
        // buscarPuppetear('https://lista.mercadolivre.com.br/', i);
});
}

start();
