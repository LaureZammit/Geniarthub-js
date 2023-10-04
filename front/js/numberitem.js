/*
    Récupérer le cart dans le local storage
    s'il y a les éléments enregistrés dedans,
    récupérer la quantité et l'afficher dans un span qu'il faut insérer dans #carticon
*/

const span = '<span>0</span>'
const carticon = document.querySelector('#carticon')
carticon.insertAdjacentHTML('beforeend', span)


function numberItem() {
    const cart = JSON.parse(localStorage.getItem('panier')) || []
    estCaché = document.querySelector('#carticon span').hidden
    // let panier = localStorage.getItem("panier");

    if(cart.length == 0) {
        // cart le #carticon span
        document.querySelector('#carticon span').style.visibility = "hidden"
    }

    if(cart.length > 0) {
        const quantite = cart.reduce((acc, el) => acc + el.quantite, 0)
        document.querySelector('#carticon span').textContent = quantite
        document.querySelector('#carticon span').style.visibility = "visible"
    }
}

numberItem()