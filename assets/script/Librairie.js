import { livres } from "./livres.js";
import { Livre } from "./Livre.js";

export class Librairie {
  constructor(librairie) {
    //console.log("je suis ici");
    this._el = librairie;
    //console.log(this._el);
    this._elLivres = this._el.querySelector("[data-js-livres]");
    this._elFiltres = this._el.querySelector("[data-js-filtres]");
    this._elChaqueFiltre = this._elFiltres.querySelectorAll("[data-js-filtre]");
    //console.log(this._elChaqueFiltre);
    this.grille = document.querySelector("[data-js-modal]");
    //console.log(this.grille);

    this.affichagePageInitial();
    this.gestionDesFiltres();
    //this.afficherModal();
  }

  // gestion des clics sur les filtres

  affichagePageInitial() {
    let dom = "";
    for (let i = 0, l = 12; i < l; i++) {
      // if nouveaute
      dom = `
        <div class="card" data-js-index=${i}>
        </div>`;
      this._elLivres.insertAdjacentHTML("beforeend", dom);
      new Livre(this._elLivres.lastElementChild);
    }
  }

  gestionDesFiltres() {
    //console.log("ici");
    //console.log(this._elFiltres);

    for (let i = 0; i < this._elChaqueFiltre.length; i++) {
      //console.log(this._elChaqueFiltre[i]);
      this._elChaqueFiltre[i].addEventListener(
        "click",
        function (e) {
          //console.log("click");
          this.affichageDesFiltres(this._elChaqueFiltre[i]);
        }.bind(this)
      );
    }
  }

  affichageDesFiltres(filtre) {
    // Maintenant, si nous cliquons sur chaque filtre, il sera possible de récupérer chaque li
    this._el = filtre;
    console.log(this._el);

    // On va nettoie les livres et retourner les livres du filtre
    this._elLivres.innerHTML = "";

    // On recupere la categorie que on doit afficher
    this._categorieAffichage = this._el.dataset.jsFiltre;
    console.log(this._categorieAffichage);

    // On boucle dans le livres e on va compare si la categorie de chaque livre est la meme qu'on a clique
    for (let i = 0, l = livres.length; i < l; i++) {
      let dom = "";
      if (
        this._categorieAffichage === livres[i].categorie ||
        this._categorieAffichage === "Tous" ||
        livres.categorie === this._categorieAffichage ||
        this._categorieAffichage === "Nouveautés"
      ) {
        // Ici, on va faire EXACTEMENT la meme chose qu'on a fait pour l'affichage initial
        // On va mettre le div class=card dans le dom
        // Apres on va insertAdjacentHTML , beforeend
        // Apres on va instancier la classe Livre avec le lastElementChild et Javascript va faire les travaux pour nous !
        // N'oublie pas qu'on a les categorie et aussi l'option Tous e l'option nouveaute

        let dom = `<div class="card" data-js-index=${i}></div>`;
        this._elLivres.insertAdjacentHTML("beforeend", dom);
        new Livre(this._elLivres.lastElementChild);
      }
    }
  }
  
  afficherModal() {
    const modalContent = `
        <div class="modal">
            <img src="${this._infosLivre.image}" alt="${this._infosLivre.titre}">
            <h2>${this._infosLivre.titre}</h2>
            <p>Auteur: ${this._infosLivre.auteur}</p>
            <p>Éditeur: ${this._infosLivre.editeur}</p>
            <p>Nombre de pages: ${this._infosLivre.pages}</p>
            <p>${this._infosLivre.description}</p>
            <button class="modal-close">Fermer</button>
        </div>
    `;
    this.grille.insertAdjacentHTML("beforeend", modalContent);
    document.body.style.overflow = "hidden"; // Prévention du scroll

    // Gestion de la fermeture du modal
    document.querySelector(".modal-close").addEventListener("click", () => {
      document.querySelector(".modal").remove();
      document.body.style.overflow = ""; // Réactivation du scroll
    });
  }
}




/**---------------------------------------Références------------------------------------
 * https://www.w3schools.com/jsref/jsref_filter.asp
 * https://www.developpez.net/
 * https://stackoverflow.com/questions/15145807/setting-the-overflow-property-with-javascript
 * https://www.w3schools.com/jsref/prop_style_overflowy.asp
 * https://grafikart.fr/tutoriels/wordpress
 * https://runebook.dev/
 * https://fontawesome.com/icons/cart-shopping?f=classic&s=solid
 * https://www.youtube.com/@EcoleduWeb
 * https://www.youtube.com/@NetNinja
 * notes de cours
 *-------------------------------------------------------------------------------------*/
