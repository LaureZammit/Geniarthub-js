const urlIdItem = window.location.search;

// console.log(urlIdItem)

const idItem = new URLSearchParams(urlIdItem);

const idOpen = idItem.get('id')
console.log(idOpen)

let datas = []

async function init() {
    datas = await resultIdOpen()
    console.log(datas)
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
    document.querySelector("#little-paragraphe").innerHTML = (minDescr.substring(0, 200))

    // Bouton achat
    document.querySelector(".button-buy").innerHTML = `Buy ${datas.shorttitle}`

    // Select
    let declinaisons = datas.declinaisons

    const select = document.querySelector("select")

    datas.declinaisons.forEach(el => {
        console.log(el)

        // Tu t'ancre sur le select
        // Tu fais un innerHtml += avec options
        select.innerHTML += `<option value="${el.taille}">Format : ${el.taille}</option>`
    })

    // Affichage du prix
    document.querySelector('.showprice').innerHTML = `${datas.declinaisons[0].prix}€`

    const option = document.querySelector('option')

    option.addEventListener('click', () => {
        for (let j = 0; j < datas.declinaisons; j++) {
            document.querySelector('.showprice').innerHTML = `${datas.declinaisons[j].prix}€`
        }

        // datas.declinaisons.forEach((taille, prix) => {
        //     document.querySelector('.showprice').innerHTML = datas.declinaisons.prix
        // })
    })

    // Description basse
    document.querySelector(".description").innerHTML = datas.description
}