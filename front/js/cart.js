let panier = localStorage.getItem("panier")
let panierJson = JSON.parse(panier)

// console.log(panierJson)
// console.log(panierJson[1].id)

// const produit = contient id, titre, image, quantite format
// Manque le prix

// console.log(panierJson[2])

// Création de la partie contenant le panier

let sommePrix = 0

panierJson.forEach(async (el) => {
    const recup = await fetch(`http://localhost:3000/api/products/${el.produit.id}`)
    const datasPanier = await recup.json()

    let rowCart = document.querySelector("#row-cart")

    const indexOptions = datasPanier.declinaisons.findIndex(item => item.taille === el.format);

    rowCart.insertAdjacentHTML("afterbegin", `
    <div class="flex-cart">
        <img src=${el.produit.image} alt=${el.produit.shorttitle} \>
        <h2 class="cart-title">${el.produit.titre}</h2>
        <p class="format-cart">Format ${el.format}</p>
        <p class="prix-cart">${datasPanier.declinaisons[indexOptions].prix}€</p>
        <div>
            <p class="quantite-cart">Quantité : </p>
            <input type="number" name="quantity" placeholder="${el.quantite}" minlength="1">
        </div>
        <a class="delete-article" href="">Supprimer</a>
    </div>
    `)
    sommePrix += el.quantite * datasPanier.declinaisons[0].prix
    document.querySelector('#prixArticles').innerText = sommePrix
})
console.log(sommePrix)

let sommeArticle = 0

sommeArticle = panierJson.reduce((acc, el) => acc + el.quantite, 0)
document.querySelector('#totalArticles').innerText = sommeArticle

