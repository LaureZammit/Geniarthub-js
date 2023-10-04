// http://localhost:3000/api/products/

let datas = []

async function init() {
    datas = await result()
    console.log(datas)
    showDatas(datas, 1)
}

init()

async function result() {
    const requete = await fetch('http://localhost:3000/api/products/')
    return await requete.json()
}

function showDatas(datas, id) {
    for (let i = 0; i < datas.length; i++) {
        document.querySelector(".products").innerHTML += `
            <article>
                <img src="${datas[i].image}" alt="${datas[i].shorttitle}">
                <a href="product.html?id=${datas[i]._id}">
                    Buy ${datas[i].shorttitle}
                </a>
            </article>
        `;
    }
}