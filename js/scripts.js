/*
- Para listar o panier, usar o layout da tabela do ultimo trabalho (stgTable)

		//Se click do menu = accueil >> mastrar Lista de livros
		//Se click do menu for = panier >> Panier com livros escolhidos id=Total 

- Incluir o bootstrap no js e no css e usar a mesma classe da tabela do ultimo projeto em <table>

- Testar se a stgContent fica salva e usar as funcoes do MENU (sem chamar a funcao) só com document.getElementById("list").innerHTML = stgContent;

- Para listar as categorias e os autores usar a logica da funcao INFO e colocar numa <ul><li>

- Na lista de categorias e autores => incluir o onclick abrir lista de livros de acordo com o ID passado (this.id) = ver o dropdownlist do ultimo projeto

		//Detalhe de livro
		//Livro por categoria
		//Livro por autor

- Add livros do arquivo que livia complentou

- Checar redundancia nas funcoes

- Colocar todo o código em Ingles e comentar

- colocar no servidor se n vai dar o mesmo problema do parde do json
*/

$(document).ready(function() { 
 
    //$(".cart").ready(HTMLAreaElement.hide);
	loadXML(); 

});

//var donnes xml
var xmlLivres;

//var content html
var h3, stgContent, stgContentPanier;

//var info livre
var tabLivres, taille, livre;

//var panier
var qntd=0;
var panier = [];
var Product = function (id, nom, prix, qntd){
    this.id = id
    this.nom = nom
    this.prix = prix
    this.qntd = qntd
    this.totalUnit = prix * qntd
};

//Charger fichier xml
function loadXML(){
	$.ajax({
	url: 'xml/catalog.xml',
	type: 'GET',
	dataType: 'xml',
	success: function(listeLivres){
	
		xmlLivres = listeLivres;

		accueil();
	},
	error: function(){alert('Fichier introuvable'); }
	});
}

//Acueil = Liste de Livres
function accueil(){

	h3 = "<h3>Coup de Coeur</h3>";

	document.getElementById("title").innerHTML = h3;

	remplirListeLivres();
}

//creer div livres = APAGAR?
function listProducts(){
  
	h3 = "<h3>Products</h3>";

	document.getElementById("title").innerHTML = h3;

	remplirListeLivres();
}

function checkLivres() {
	
	tabLivres = xmlLivres.getElementsByTagName("book");

	taille = tabLivres.lenght;

	for (var i = 0; i < tabLivres.length; i++) {
		
		livre = tabLivres[i];
    
		id = livre.getElementsByTagName("id")[0].firstChild.nodeValue;
		title = livre.getElementsByTagName("title")[0].firstChild.nodeValue;
		author = livre.getElementsByTagName("author")[0].firstChild.nodeValue;
		genre = livre.getElementsByTagName("genre")[0].firstChild.nodeValue;
		price = livre.getElementsByTagName("price")[0].firstChild.nodeValue;
		year = livre.getElementsByTagName("year")[0].firstChild.nodeValue;
		description = livre.getElementsByTagName("description")[0].firstChild.nodeValue;
		image = livre.getElementsByTagName("image")[0].firstChild.nodeValue;
        
        
        return livre;
	}
}

function remplirListeLivres(){

	//CONDICAO PARA O MENU com this.id
	//variaveis locais => globais
    var id, title, author, genre, price=0, year, description, image;
	
    tabLivres = xmlLivres.getElementsByTagName("book");

	taille = tabLivres.lenght;

	stgContent = "<ul>";

	for (var i = 0; i < tabLivres.length; i++) {
		
		livre = tabLivres[i]; 

		id = livre.getElementsByTagName("id")[0].firstChild.nodeValue;
		title = livre.getElementsByTagName("title")[0].firstChild.nodeValue;
		author = livre.getElementsByTagName("author")[0].firstChild.nodeValue;
		genre = livre.getElementsByTagName("genre")[0].firstChild.nodeValue;
		price = livre.getElementsByTagName("price")[0].firstChild.nodeValue;
		year = livre.getElementsByTagName("year")[0].firstChild.nodeValue;
		description = livre.getElementsByTagName("description")[0].firstChild.nodeValue;
		image = livre.getElementsByTagName("image")[0].firstChild.nodeValue;
       
		stgContent += "<li>"+
		"<div class='product'>"+
		"<a href='#' class='info' onclick='info(this.id);' id='"+id+"'>"+
		"<span class='holder'>"+
			"<img src='"+image+"'alt='img'/>"+
			"<span class='book-name'>"+title+"</span>"+
			"<span class='author'>"+author+"</span>"+
			"<span class='description'>"+genre+"<br/>"+"</span>"+
		"</span>"+
		"</a>"+
		"<a href='#' class='buy-btn' id='"+id+"'  onclick='addProduct(this.id)'>Panier<span class='price'>"+
		"<span class='low' data-price='"+price+"'>$</span>"+price+
		"</span>"+"</a>"+"</div>"+"</li>";
        
        //$(this).attr("id");
    }
    
    //('"+id+"','"+title+"','"+price+"','1')
 //document.getElementById('panier_btn').value,price,id
    
		stgContent += "</ul>";

		document.getElementById("listProd").innerHTML = stgContent;

}//fin function remplirListeLivres



//Gestion de panier
function addProduct(idLivre){
       
    //Ver se já tem esse id na matriz panier e sim, soma com a quant q tem lá
    for (var i in panier){
            
        if(panier[i].id === idLivre){

            panier[i].qntd += qntd;            
            
            return;
        }
    }  
        
    //checar qual é o produto pra add
	for (var i = 0; i < tabLivres.length; i++) {
    
        livre = tabLivres[i]; 

		id = livre.getElementsByTagName("id")[0].firstChild.nodeValue;
		title = livre.getElementsByTagName("title")[0].firstChild.nodeValue;
		price = livre.getElementsByTagName("price")[0].firstChild.nodeValue;
        qntd = 1;
      
        if (id === idLivre) {
            
            var item = new Product(id, title, price, qntd);
            panier.push(item);
            savePanier();    
        }//fin if
    }//fin for

	document.getElementById("total").innerHTML = "";
    document.getElementById("total").innerHTML = totalPanier();
    
}// fin ajouterProduct

function removeItem(id){
    
     for (var i in panier){
        
        if(panier[i].id === id){
            
            panier[i].qntd --;
            
            if (panier[i].qntd === 0){
                panier.splice(i,1);
            }
            
            break;            
        }//fin if
    }//fin for
    savePanier();
}

function removeAllItens(id){
    
       for (var i in panier){
        
        if(panier[i].id === id){
            
            panier.splice(i,1);
         
            break;               
        }
    }//fin for
    
    savePanier();
    
}// fin removeAllProducts

function clearPanier(){
    
    panier = [];
    
    savePanier();
    
}//fin clearPanier

function countPanier(){
    
    var totalCount = 0;
    
    for (var i in panier){
       
       totalCount += panier[i].qntd;                      
    }
    
    return totalCount;
    
}// fin countPanier  

function totalPanier(){
    
    var totalPanier = 0;
        
    for (var i in panier){
        
        totalPanier += panier[i].prix*panier[i].qntd;
    }   
    
    console.log(Number(totalPanier));
    
    return totalPanier;
    
}//fin totalPanier

//PanierCopy
function listCart(){
    
    var panierCopy = [];
    
    for (var i in panier){
        var item = panier[i];
        var itemCopy = {};
        
        for (var p in item){
            itemCopy[p] = item[p];
        }
        panierCopy.push(itemCopy);
    }
    
    return panierCopy;
    
}// fin listCart

//Local Storage
function savePanier(){
        
    localStorage.setItem("panier", JSON.stringify(panier));

}

//Local Storage
function loadPanier(){
    
    panier = JSON.parse(localStorage.getItem("panier"));
    
}

//Liste de livres de panier
function displayCart(){
    
    //$(".products").click(HTMLAreaElement.hide);
    //$(".cart").show;
    console.log(listCart());
        
    var cartArray = listCart();
    stgContentPanier =  //"<div>"+
                        //"<table class='tableCart' id='tableCart'>"+
                        "<tr class='cart_title'>"+
                           "<th>"+'Book name'+"</th>"+
                           "<th>"+'Unit price'+"</th>"+
                           "<th>"+'Qtd'+"</th>"+
                           "<th>"+'Total'+"</th>"+
                       "</tr>";   
    
    for (var i in cartArray){
        
        stgContentPanier += "<tr>"+
                                "<td>"+cartArray[i].nom+"</td>"+
                                "<td>"+cartArray[i].prix+"</td>"+
                                "<td>"+cartArray[i].qntd+"</td>"+
                                "<td>"+Number(cartArray[i].prix*cartArray[i].qntd)+"</td>"+
                                "<td>"+"<button>"+" - "+"</buton>"+
                                "<td>"+"<button>"+" + "+"</buton>"+"</td>"+
                            "</tr>"; 
    }
    
    stgContentPanier += "<br/>"+"<h3>"+'Total: '+   totalPanier()+"</h3>";
	
    document.getElementById("title").innerHTML = "<h3>Panier</h3>";
	document.getElementById("tableCart").innerHTML = stgContentPanier;
}

//Form Nous Joindre
function nousJoindre(){

   document.getElementById("title").innerHTML = "<h3>Nous Joindre</h3>";

   var form = "FORM"; // FORM

   document.getElementById("list").innerHTML = form;
}

//Form login
function login(){

	document.getElementById("title").innerHTML = "<h3>Login</h3>";
	document.getElementById("list").innerHTML = "LOGIN";
}

//Effacer stringContent
function clear(){

	document.getElementById("title").innerHTML = "";
	document.getElementById("list").innerHTML = "";
}

//Remplir liste categories
function categories(){
 

}

//remplir liste autheurs
function autheurs(){


}

//Information par livre
function info(idLivre){

	for (var i = 0; i < tabLivres.length; i++) {

		livre = tabLivres[i];

		id = livre.getElementsByTagName("id")[0].firstChild.nodeValue;
		title = livre.getElementsByTagName("title")[0].firstChild.nodeValue;
		author = livre.getElementsByTagName("author")[0].firstChild.nodeValue;
		genre = livre.getElementsByTagName("genre")[0].firstChild.nodeValue;
		price = livre.getElementsByTagName("price")[0].firstChild.nodeValue;
		year = livre.getElementsByTagName("year")[0].firstChild.nodeValue;
		description = livre.getElementsByTagName("description")[0].firstChild.nodeValue;
		image = livre.getElementsByTagName("image")[0].firstChild.nodeValue;

		if (id == idLivre) {

			console.log(id);

			stgContent = "<div>"+
			"<div class='product'>"+
			"<a href='#' class='info'>"+
			"<span class='holder'>"+
				"<img src='"+image+"'alt='img'/>"+
				"<span class='book-name'>"+title+"</span>"+
				"<span class='author'>"+author+"</span>"+
				"<span class='description'>"+genre+"<br/>"+"</span>"+
			"</span>"+
			"</a>"+
			"<a href='#' class='buy-btn'>Panier<span class='price'>"+
			"<span class='low'>$</span>"+price+
			"</span>"+"</a>"+"</div>"+"<div>";

			}//fin if


		}//fin for

		//stgContent = "LIVRO: ";
		document.getElementById("title").innerHTML = "<h3>Informations</h3>";
		document.getElementById("list").innerHTML = stgContent;

}//fin function description
