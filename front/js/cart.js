let panier = localStorage.getItem("panier")
let panierJson = JSON.parse(panier) ? JSON.parse(panier) : []
let datasPanier;

function afficherPanier() {
    let sommePrix = 0
    if(panierJson.length === 0) {
        document.querySelector("#row-cart").innerHTML = "<p>Votre panier est vide. Veuillez ajouter au moins un article à votre panier.</p>";
    }
    
    if(panierJson.length > 0) {
        panierJson.forEach(async el => {
            const recup = await fetch(`http://localhost:3000/api/products/${el.produit.id}`)
            datasPanier = await recup.json()
        
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
                        <input class="quantite-input" type="number" name="quantity" value="${el.quantite}" minlength="1">
                    </div>
                    <a class="delete-article" href="#">Supprimer</a>
                </div>
            `)
            sommePrix += el.quantite * datasPanier.declinaisons[0].prix
            const sommePrixFormatted = sommePrix.toFixed(2)
            document.querySelector('#prixArticles').innerText = sommePrixFormatted
        })
        
        let sommeArticle = 0
        
        sommeArticle = panierJson.reduce((acc, el) => acc + el.quantite, 0)
        document.querySelector('#totalArticles').innerText = sommeArticle
        

        setTimeout(() => {
            // Fonction pour supprimer un élément du panier à partir du bouton delete-article
            const deleteArticle = document.querySelectorAll(".delete-article")
    
            deleteArticle.forEach((el, index) => {
                el.addEventListener('click', (e) => {
                    e.preventDefault()
                    // chercher l'élément avec la classe flex-cart le plus proche et le supprimer
                    el.closest(".flex-cart").remove()
                    panierJson.splice(index, 1)
                    localStorage.setItem("panier", JSON.stringify(panierJson))
                    numberItem()
                })
            })

            // Fonction pour modifier la quantité d'un article au changement sans avoir à recharger la page
            const quantiteInput = document.querySelectorAll(".quantite-input")

            quantiteInput.forEach((el, index) => {
                el.addEventListener('change', (e) => {
                    // Si la quantité est inférieure à 1 : supprimer la ligne. Sinon si la quantité est supérieure à 100 : ouvrire la modale avec le message : la quantité par oeuvre ne peut pas excéder 100.
                    e.preventDefault()
                    if (el.value < 1) {
                        el.closest(".flex-cart").remove()
                        panierJson.splice(index, 1)
                        localStorage.setItem("panier", JSON.stringify(panierJson))
                        numberItem()
                    } else if (el.value > 100) {
                        showModal('Vous ne pouvez pas commander plus de 100 produits d\'une même oeuvre.')
                        el.value = 100
                        panierJson[index].quantite = parseInt(el.value)
                        localStorage.setItem("panier", JSON.stringify(panierJson))
                        // Mettez à jour le prix total de cet article dans le DOM en temps réel
                        const prixArticle = panierJson[index].quantite * datasPanier.declinaisons[0].prix
                        el.closest(".flex-cart").querySelector(".prix-cart").innerText = `${prixArticle}€`
                        // Mettez à jour le nombre total d'articles en temps réel
                        const sommeArticle = panierJson.reduce((acc, el) => acc + el.quantite, 0)
                        document.querySelector('#totalArticles').innerText = sommeArticle
                        // Mettez à jour le prix total général en temps réel
                        sommePrix = panierJson.reduce((acc, el) => acc + el.quantite * datasPanier.declinaisons[0].prix, 0)
                        const sommePrixFormatted = sommePrix.toFixed(2)
                        document.querySelector('#prixArticles').innerText = sommePrixFormatted
                        numberItem()
                    } else {
                        panierJson[index].quantite = parseInt(el.value)
                        localStorage.setItem("panier", JSON.stringify(panierJson))
                        // Mettez à jour le prix total de cet article dans le DOM en temps réel
                        const prixArticle = panierJson[index].quantite * datasPanier.declinaisons[0].prix
                        el.closest(".flex-cart").querySelector(".prix-cart").innerText = `${prixArticle}€`
                        // Mettez à jour le nombre total d'articles en temps réel
                        const sommeArticle = panierJson.reduce((acc, el) => acc + el.quantite, 0)
                        document.querySelector('#totalArticles').innerText = sommeArticle
                        // Mettez à jour le prix total général en temps réel
                        sommePrix = panierJson.reduce((acc, el) => acc + el.quantite * datasPanier.declinaisons[0].prix, 0)
                        sommePrixFormatted = sommePrix.toFixed(2)
                        document.querySelector('#prixArticles').innerText = sommePrixFormatted
                        numberItem()
                    }
                })
            })
        }, 500);
    } else {
        document.querySelector("#row-cart").innerHTML = "<p>Votre panier est vide. Veuillez ajouter au moins un article à votre panier.</p>";
    }
}

afficherPanier()