// function $_GET(param) {
// 	let variable = {};
// 	window.location.href.replace( location.hash, '' ).replace( 
// 		/[?&]+([^=&]+)=?([^&]*)?/gi,
// 		function( m, key, value ) {
// 			variable[key] = value !== undefined ? value : '';
// 		}
// 	);

// 	if ( param ) {
// 		return variable[param] ? variable[param] : null;	
// 	}

// 	return variable;
// }

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

    // for (let i = 0; i < items.length; i++) {
    //     document.querySelector("option").innerHTML = el.taille
    //     document.querySelector("option").value = el.taille
    //     document.querySelector('.showprice').innerHTML = el.prix
    // }


    datas.declinaisons.forEach(el => {
        console.log(el)

        // Tu t'ancre sur le select
        // Tu fais un innerHtml += avec options
        document.querySelector("select").innerHTML += `<option value="${el.taille}">Format : ${el.taille}</option>`

        
    })
    document.querySelector('.showprice').innerHTML = datas.declinaisons[0].prix
    
    datas.declinaisons.forEach((taille, prix) => {
        document.querySelector('.showprice').innerHTML = datas.declinaisons[0].prix
    })


    //     <article>
    //         <div>
    //             <div class="price">
    //                 <p>Acheter pour</p>
    //                 <span class="showprice">35.25€</span>
    //             </div>
    //         </div>
    //     </article>
}

/*


<aside>
    <h2>Description de l’oeuvre :  Éclat Éthéré : Bird</h2>
    <p>Plongez dans l'univers mystique de 'Bird', une œuvre d'art captivante qui transcende les limites de la réalité. Réalisée dans le style éthéré et spectral, cette pièce évoque la présence d'un oiseau envoûtant qui semble flotter dans l'au-delà.</p>
    <p>L'attention méticuleuse aux détails se manifeste à travers la représentation hyperréaliste de l'eau, qui reflète avec une précision époustouflante la luminosité du monde qui l'entoure. Les fleurs, d'une beauté presque surnaturelle, dansent dans le tableau, apportant une touche de grâce et d'émerveillement à l'ensemble.</p>
    <p>Les teintes lumineuses qui illuminent cette œuvre d'art ajoutent une dimension magique, créant une atmosphère enchanteresse qui attire instantanément le regard. Chaque trait, réalisé avec un crayon de couleur illustré avec maîtrise, donne vie à l'ensemble de manière à la fois organique et surréaliste.</p>
    <p>'Bird' ne se limite pas à être une simple œuvre d'art, mais plutôt une expérience sensorielle qui vous transporte vers des paysages lumineux et fantastiques. Son esthétique unique et son évocation mystique éveilleront votre imagination et vous inviteront à vous perdre dans un monde où la réalité et le rêve se fondent harmonieusement.</p>
    <p>Cette pièce exceptionnelle, 'Éclat Éthéré : Bird', est bien plus qu'un simple tableau ; c'est une invitation à l'évasion, à la contemplation et à la découverte de l'extraordinaire. Laissez-vous envoûter par cette création artistique et offrez-vous un trésor qui égayera votre espace de vie et votre âme.</p>
</aside>
*/