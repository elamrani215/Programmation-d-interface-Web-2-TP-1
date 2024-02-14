import { livres } from "./livres.js";

// Définition de la classe "Livre".
export class Livre {
  constructor(livre) {
    this._el = livre;                         // Élément DOM de la tuile de livre

    //console.log(this._el);

    this._index = this._el.dataset.jsIndex;   // Index du livre dans le tableau des livres
    //console.log(this._index);
    this._infosLivre = livres[this._index];   // Récupération des infos du livre
    //console.log(this._infosLivre);

    this.affichageImage();
    this.affichageDetails();
    
    this._elParentLivres = this._el.closest('[data-js-livres]');
    this.gestionModal();

    this.ajoutPanier();

  }

  // Affichage de l'image du livre
  affichageImage() {
    let domImage = "";
    domImage = `<img src="${this._infosLivre.image}" alt="les-enfants-sont-calmes">`;
    this._el.innerHTML = domImage;
  }

  // Affichage des détails du livre (titre, prix, etc.)
  affichageDetails() {
    // Mise à jour pour afficher les informations du livre
    let domDetail = "";
    domDetail = `<div class="card-content">
                    <div class="card-title">${this._infosLivre.titre}</div>
                    <div class="card-price">${this._infosLivre.prix} $</div>
                    <a href="#" class="add-button" data-js-add="${this._index}">Ajouter</a>
                </div>`;
    this._el.insertAdjacentHTML("beforeend", domDetail);
  }

  gestionModal() {
    // dans le data-js-livres récupéré dans le constructor, ajouter un event listener.
    this._elParentLivres.addEventListener('click', function(e) { // Utilisation d'une fonction fléchée pour garder le contexte
      console.log('click');
      
      let target = e.target;
      // Assurer que le clic vient d'un élément permettant d'ouvrir un modal
      if (target.closest('[data-js-index]')) {
        let livreIndex = target.closest('[data-js-index]').dataset.jsIndex;
      console.log(target);
      console.log(livreIndex);    

        // Affichage des détails dans le modal
        this.afficherModal(livreIndex);
      }
    });
  }

  afficherModal(index) {
    let modal = document.querySelector('.modal');
    let modalContent = document.querySelector('.modal-content');
    let livre = livres[index]; // Utiliser 'livres' qui doit être accessible dans ce contexte

    // Construire le contenu du modal avec les détails du livre
    let detailsLivre = `
      <h2>${livre.titre}</h2>
      <p>Prix : ${livre.prix} $</p>
      <img src="${livre.image}" alt="${livre.titre}">
    `;

    modalContent.innerHTML = detailsLivre;
    modal.classList.toggle('modal--ferme'); // Basculer la classe pour ouvrir/fermer le modal

    // Ajouter la gestion de fermeture du modal
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) { // Permet de fermer le modal en cliquant à l'extérieur
        modal.classList.add('modal--ferme');
      }
    });
  }

  ajoutPanier() {
    this._el.addEventListener('click', (e) => {
      let target = e.target;
      if (target.dataset.jsAdd) {
        let livreIndex = target.dataset.jsAdd;
       
        console.log(`Livre ${livreIndex} ajouté au panier`);
        
      }
    });
  }

}
