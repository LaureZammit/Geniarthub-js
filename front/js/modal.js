// Modal : confirmation de commande et message d'erreur

function showModal(message) {
    const modal = document.createElement('dialog')
    modal.innerHTML = message
    document.body.appendChild(modal)
    modal.showModal()
    setTimeout(() => {
        modal.close()
        // Destroy modal
        modal.remove()
    }, 3000)
}