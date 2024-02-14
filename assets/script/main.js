import { Librairie } from "./Librairie.js";

(function () {
  let elLibrairie = document.querySelector("[data-js-librairie]");
  console.log(elLibrairie);
  new Librairie(elLibrairie);
})();