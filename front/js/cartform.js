const form = document.querySelector("#cart-form");
const firstName = document.querySelector("#prenom");
const lastName = document.querySelector("#nom");
const address = document.querySelector("#adresse");
const city = document.querySelector("#ville");
const email = document.querySelector("#mail");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validation du prénom : minimum 2 lettres, pas de caractères spéciaux mais accèpte les accents
    if (firstName.value.length < 2 || firstName.value.match(/[^a-zA-Z]/)) {
        showModal("Veuillez entrer un prénom valide");
        return;
    }
    // Validation du nom
    if (lastName.value.length < 2 || lastName.value.match(/[^a-zA-Z]/)) {
        showModal("Veuillez entrer un nom valide");
        return;
    }
    // Validation de l'adresse
    if (address.value.length < 10) {
        showModal("Veuillez entrer une adresse valide");
        return;
    }
    // Validation de la ville
    if (city.value.length < 3 || city.value.match(/[0-9]/)) {
        showModal("Veuillez entrer une ville valide");
        return;
    }
    // Validation de l'email
    if (!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        showModal("Veuillez entrer une adresse email valide");
        return;
    }
    
    // La page confirmation de commande
    // La page de confirmation de commande doit afficher le numéro de commande récupéré
    // depuis le back lors de la validation d’une commande.
    // Si le numéro de commande a bien été récupéré, les données dans les champs de formulaire
    // de commande doivent être réinitialisées.
    // Les données du panier doivent également être vidées

    const contact = {
        firstName : document.querySelector("#prenom").value,
        lastName : document.querySelector("#nom").value,
        address : document.querySelector("#adresse").value,
        city : document.querySelector("#ville").value,
        email : document.querySelector("#mail").value
    };

    const products = [];

    let panier = localStorage.getItem("panier");
    panier = panier ? JSON.parse(panier) : [];

    panier.forEach((item) => {
        products.push(item.id);
    });

    const data = { contact, products };
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("order", JSON.stringify(data));
            showModal("Félicitations! La commande a été passée avec succès. Voici votre numéro de commande : " + data.orderId);
        })

        setTimeout(() => {
            // Vider le localStorage panier après la commande
            localStorage.removeItem("panier");
            // Afficher un message à la place du panier
            document.querySelector("#row-cart").innerHTML = "<p>Votre panier est vide. Veuillez ajouter au moins un article à votre panier.</p>";
            // Réinitialiser les données : totalArticles, prixArticles, carticon sans avoir besoin de recharger la page
            document.querySelector('#totalArticles').innerText = 0
            document.querySelector('#prixArticles').innerText = 0
            document.querySelector('#carticon span').innerText = 0
            document.querySelector('#carticon span').style.visibility = "hidden"
            numberItem()
            // Réinitialiser les données du formulaire
            document.querySelector("#prenom").value = "";
            document.querySelector("#nom").value = "";
            document.querySelector("#adresse").value = "";
            document.querySelector("#ville").value = "";
            document.querySelector("#mail").value = "";
        } , 500);
});
