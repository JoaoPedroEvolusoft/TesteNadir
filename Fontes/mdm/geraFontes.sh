#!/bin/bash
cd ..
ng new frontend
cd frontend
ng add @angular/material
npm install bootstrap@4.1.3 jquery@3.3.1 popper.js@1.14.3 --save 
cd ..
mkdir backend
mkdir backend/routes
mkdir backend/models
mkdir backend/app
mkdir backend/app/controllers
mkdir frontend/src/app/models
mkdir frontend/src/app/services
mkdir frontend/src/app/components
cd frontend/src/app/components/
ng g c add-item
ng g c list-item
ng g c details-item
ng g c add-imagemDeItem
ng g c list-imagemDeItem
ng g c details-imagemDeItem
ng g c add-fornecedorDeItem
ng g c list-fornecedorDeItem
ng g c details-fornecedorDeItem
ng g c add-parceiro
ng g c list-parceiro
ng g c details-parceiro
ng g c add-configuracaoBusca
ng g c list-configuracaoBusca
ng g c details-configuracaoBusca
ng g c add-variavel
ng g c list-variavel
ng g c details-variavel
cd ../../../..
cd backend/models
mi g app mean index > index.js
cd ..
mi g app mean server > server.js
npm init -y
npm install express mongoose cors --save
cd ..
mi g app angular appModule > frontend/src/app/app.module.ts
mi g app angular appRouting > frontend/src/app/app-routing.module.ts
mi g app angular appComponentHTML > frontend/src/app/app.component.html
mi g app angular appComponentTS > frontend/src/app/app.component.ts
mi g app angular appComponentCSS > frontend/src/app/app.component.css
mi g app angular indexHTML > frontend/src/index.html
mapperidea generate app mean mongoModel entityName=Item > backend/models/item.model.js
mapperidea generate app mean mongoModel entityName=ImagemDeItem > backend/models/imagemDeItem.model.js
mapperidea generate app mean mongoModel entityName=FornecedorDeItem > backend/models/fornecedorDeItem.model.js
mapperidea generate app mean mongoModel entityName=Parceiro > backend/models/parceiro.model.js
mapperidea generate app mean mongoModel entityName=ConfiguracaoBusca > backend/models/configuracaoBusca.model.js
mapperidea generate app mean mongoModel entityName=Variavel > backend/models/variavel.model.js
mapperidea generate app mean apiController entityName=Item > backend/app/controllers/item.controller.js
mapperidea generate app mean apiController entityName=ImagemDeItem > backend/app/controllers/imagemDeItem.controller.js
mapperidea generate app mean apiController entityName=FornecedorDeItem > backend/app/controllers/fornecedorDeItem.controller.js
mapperidea generate app mean apiController entityName=Parceiro > backend/app/controllers/parceiro.controller.js
mapperidea generate app mean apiController entityName=ConfiguracaoBusca > backend/app/controllers/configuracaoBusca.controller.js
mapperidea generate app mean apiController entityName=Variavel > backend/app/controllers/variavel.controller.js
mapperidea generate app angular model entityName=Item > frontend/src/app/models/item.model.ts
mapperidea generate app angular model entityName=ImagemDeItem > frontend/src/app/models/imagem-de-item.model.ts
mapperidea generate app angular model entityName=FornecedorDeItem > frontend/src/app/models/fornecedor-de-item.model.ts
mapperidea generate app angular model entityName=Parceiro > frontend/src/app/models/parceiro.model.ts
mapperidea generate app angular model entityName=ConfiguracaoBusca > frontend/src/app/models/configuracao-busca.model.ts
mapperidea generate app angular model entityName=Variavel > frontend/src/app/models/variavel.model.ts
mi g app angular dataService entityName=Item > frontend/src/app/services/item.service.ts
mi g app angular dataService entityName=ImagemDeItem > frontend/src/app/services/imagem-de-item.service.ts
mi g app angular dataService entityName=FornecedorDeItem > frontend/src/app/services/fornecedor-de-item.service.ts
mi g app angular dataService entityName=Parceiro > frontend/src/app/services/parceiro.service.ts
mi g app angular dataService entityName=ConfiguracaoBusca > frontend/src/app/services/configuracao-busca.service.ts
mi g app angular dataService entityName=Variavel > frontend/src/app/services/variavel.service.ts
mi g app mean routes entityName=Item > backend/routes/item.routes.js
mi g app mean routes entityName=ImagemDeItem > backend/routes/imagemDeItem.routes.js
mi g app mean routes entityName=FornecedorDeItem > backend/routes/fornecedorDeItem.routes.js
mi g app mean routes entityName=Parceiro > backend/routes/parceiro.routes.js
mi g app mean routes entityName=ConfiguracaoBusca > backend/routes/configuracaoBusca.routes.js
mi g app mean routes entityName=Variavel > backend/routes/variavel.routes.js
mi g app angular addComponentHTML editorName=ItemEditor >  frontend/src/app/components/add-item/add-item.component.html
mi g app angular addComponentTS editorName=ItemEditor >  frontend/src/app/components/add-item/add-item.component.ts
mi g app angular listComponentHTML listName=ItemList >  frontend/src/app/components/list-item/list-item.component.html 
mi g app angular listComponentTS listName=ItemList >  frontend/src/app/components/list-item/list-item.component.ts
mi g app angular detailsComponentHTML editorName=ItemEditor >  frontend/src/app/components/details-item/details-item.component.html
mi g app angular detailsComponentTS editorName=ItemEditor >  frontend/src/app/components/details-item/details-item.component.ts
mi g app angular addComponentHTML editorName=ImagemDeItemEditor >  frontend/src/app/components/add-imagem-de-item/add-imagem-de-item.component.html
mi g app angular addComponentTS editorName=ImagemDeItemEditor >  frontend/src/app/components/add-imagem-de-item/add-imagem-de-item.component.ts
mi g app angular listComponentHTML listName=ImagemDeItemList >  frontend/src/app/components/list-imagem-de-item/list-imagem-de-item.component.html 
mi g app angular listComponentTS listName=ImagemDeItemList >  frontend/src/app/components/list-imagem-de-item/list-imagem-de-item.component.ts
mi g app angular detailsComponentHTML editorName=ImagemDeItemEditor >  frontend/src/app/components/details-imagem-de-item/details-imagem-de-item.component.html
mi g app angular detailsComponentTS editorName=ImagemDeItemEditor >  frontend/src/app/components/details-imagem-de-item/details-imagem-de-item.component.ts
mi g app angular addComponentHTML editorName=FornecedorDeItemEditor >  frontend/src/app/components/add-fornecedor-de-item/add-fornecedor-de-item.component.html
mi g app angular addComponentTS editorName=FornecedorDeItemEditor >  frontend/src/app/components/add-fornecedor-de-item/add-fornecedor-de-item.component.ts
mi g app angular listComponentHTML listName=FornecedorDeItemList >  frontend/src/app/components/list-fornecedor-de-item/list-fornecedor-de-item.component.html 
mi g app angular listComponentTS listName=FornecedorDeItemList >  frontend/src/app/components/list-fornecedor-de-item/list-fornecedor-de-item.component.ts
mi g app angular detailsComponentHTML editorName=FornecedorDeItemEditor >  frontend/src/app/components/details-fornecedor-de-item/details-fornecedor-de-item.component.html
mi g app angular detailsComponentTS editorName=FornecedorDeItemEditor >  frontend/src/app/components/details-fornecedor-de-item/details-fornecedor-de-item.component.ts
mi g app angular addComponentHTML editorName=ParceiroEditor >  frontend/src/app/components/add-parceiro/add-parceiro.component.html
mi g app angular addComponentTS editorName=ParceiroEditor >  frontend/src/app/components/add-parceiro/add-parceiro.component.ts
mi g app angular listComponentHTML listName=ParceiroList >  frontend/src/app/components/list-parceiro/list-parceiro.component.html 
mi g app angular listComponentTS listName=ParceiroList >  frontend/src/app/components/list-parceiro/list-parceiro.component.ts
mi g app angular detailsComponentHTML editorName=ParceiroEditor >  frontend/src/app/components/details-parceiro/details-parceiro.component.html
mi g app angular detailsComponentTS editorName=ParceiroEditor >  frontend/src/app/components/details-parceiro/details-parceiro.component.ts
mi g app angular addComponentHTML editorName=ConfiguracaoBuscaEditor >  frontend/src/app/components/add-configuracao-busca/add-configuracao-busca.component.html
mi g app angular addComponentTS editorName=ConfiguracaoBuscaEditor >  frontend/src/app/components/add-configuracao-busca/add-configuracao-busca.component.ts
mi g app angular listComponentHTML listName=ConfiguracaoBuscaList >  frontend/src/app/components/list-configuracao-busca/list-configuracao-busca.component.html 
mi g app angular listComponentTS listName=ConfiguracaoBuscaList >  frontend/src/app/components/list-configuracao-busca/list-configuracao-busca.component.ts
mi g app angular detailsComponentHTML editorName=ConfiguracaoBuscaEditor >  frontend/src/app/components/details-configuracao-busca/details-configuracao-busca.component.html
mi g app angular detailsComponentTS editorName=ConfiguracaoBuscaEditor >  frontend/src/app/components/details-configuracao-busca/details-configuracao-busca.component.ts
mi g app angular addComponentHTML editorName=VariavelEditor >  frontend/src/app/components/add-variavel/add-variavel.component.html
mi g app angular addComponentTS editorName=VariavelEditor >  frontend/src/app/components/add-variavel/add-variavel.component.ts
mi g app angular listComponentHTML listName=VariavelList >  frontend/src/app/components/list-variavel/list-variavel.component.html 
mi g app angular listComponentTS listName=VariavelList >  frontend/src/app/components/list-variavel/list-variavel.component.ts
mi g app angular detailsComponentHTML editorName=VariavelEditor >  frontend/src/app/components/details-variavel/details-variavel.component.html
mi g app angular detailsComponentTS editorName=VariavelEditor >  frontend/src/app/components/details-variavel/details-variavel.component.ts
