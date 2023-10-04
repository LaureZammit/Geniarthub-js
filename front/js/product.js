const urlIdItem = window.location.search;

// console.log(urlIdItem)

const idItem = new URLSearchParams(urlIdItem);

const idOpen = idItem.get('id')
// console.log(idOpen)

let datas = []

async function init() {
    datas = await resultIdOpen()
    // console.log(datas)
    showDatas(datas, 1)
}

init()

async function resultIdOpen() {
    const requete = await fetch(`http://localhost:3000/api/products/${idOpen}`)
    return await requete.json()
}

function showDatas(datas, id) {
    // Balise title
    document.querySelector("title").innerHTML = datas.titre

    // Modification de l'image
    document.querySelector("#image-oeuvre").src = datas.image
    document.querySelector("#image-oeuvre").alt = datas.titre

    // Modification de la partie droite
    document.querySelector("h1").innerHTML = datas.titre
    let minDescr = datas.description
    document.querySelector("#little-paragraphe").innerHTML = (minDescr.substring(0, 200)) + "..."

    // Bouton achat
    const buttonBuy = document.querySelector(".button-buy")
    buttonBuy.innerHTML = `Buy ${datas.shorttitle}`

    // Select
    const select = document.querySelector("select")
    
    datas.declinaisons.forEach((el, index) => {
        // console.log(el)
        
        // Tu t'ancre sur le select
        // Tu fais un innerHtml += avec options
        select.innerHTML += `<option data-id="${index}" value="${el.taille}">Format : ${el.taille}</option>`
    })
    
    // Affichage du prix
    document.querySelector('.showprice').innerHTML = `${datas.declinaisons[0].prix}€`
    
    select.addEventListener('change', () => {
        const format = document.querySelector("#format")
        const id = format.options[format.selectedIndex].dataset.id
        // console.log(id)
        document.querySelector(".showprice").innerHTML = `${datas.declinaisons[id].prix}€`
    })

    // Description basse
    document.querySelector(".description").innerHTML = datas.description
}

const quantity = document.querySelector(".quantity")

// quantity.addEventListener('change', function () {
//     let valeur = parseInt(quantity.value)

//     if (valeur < 0 || valeur > 100) {
//         valeur = 0;
//         quantity.value = valeur
//     }
// })

const buttonBuy = document.querySelector(".button-buy")

buttonBuy.addEventListener('click', (e) => {
    e.preventDefault()
    const quantite = document.querySelector("input").value
    const format = document.querySelector('#format').value;
    const produit = {
        id: datas._id,
        titre: datas.titre,
        image: datas.image,
        quantite:quantite,
        format: format
    };

    ajouterAuPanier(produit, quantite, format);

    let panier = localStorage.getItem("panier");
    if (panier === null || panier < 0) {
        panier = [];
    } else {
        panier = JSON.parse(panier);
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    
    document.querySelector(".modal").innerHTML = `
    <div class="modal-content">
    <p>Produit ajouté au panier !</p>
    <a href="cart.html">Voir le panier</a>
    <button class="close-modal">Fermer</button>
    </div>
    `;
    document.querySelector(".modal").style.display = "flex";
    
    const modal = document.querySelector(".close-modal");
    modal.addEventListener("click", () => {
        document.querySelector(".modal").style.display = "none";
    });
});

function ajouterAuPanier(produit, quantite, format) {

    let panier = localStorage.getItem("panier");
    panier = panier ? JSON.parse(panier) : [];

    const produitExistant = panier.find(item => item.id === produit.id && item.format === format);

    if (produitExistant) {
        produitExistant.quantite += parseInt(quantite);
        if(produitExistant.quantite >= 100) {
            // On ne peut pas dépasser 100 de quantité par produit et par format
            
        }
    } else {
        panier.push({ id: produit.id, quantite: parseInt(quantite), format: format, produit });
    }

    localStorage.setItem("panier", JSON.stringify(panier));
}

// localStorage.setItem("key", "value")

// <!-- Afficher le contenu d'un localStorage -->
// const key = localStorage.getItem("key")

// <!-- Modifier le contenu d'un localStorage -->
// localStorage.setItem("key", "nouvelle value")

// <!-- Supprimer le contenu d'un localStorage -->
// localStorage.removeItem("key")

// Info à prendre en compte
// Pour stocker des tableaux/objets sur les localStorage
// Vous allez devoir les stringify

// Pour récupérer les données en mode JSON
// Vous allez devoir les parse

// JSON.stringify()

// JSON.parse()