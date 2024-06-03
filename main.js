'use strict';

//Retrieve elements id
const form = document.getElementById('form');
const submitButton = document.getElementById('submitButton')
const selectForm = document.getElementById('selectForm');
const promoInput = document.getElementById('promoInput');

//Modal for valid promo feedback or wrong one.
const wrongPromo = new bootstrap.Modal(document.getElementById("wrongPromo"));
const validModal = new bootstrap.Modal(document.getElementById("validModal"));

//Valid modal title and p
const validModalTitle = document.getElementById('validModalTitle');
const validModalText = document.getElementById('validModalText');

//Prevent Default Form
form.addEventListener('submit', function (ev) {
  ev.preventDefault()
})

//Submit event listener
form.addEventListener('submit', function () {
  const selectFormValue = Number(selectForm.value);

  let basePrice;
  switch (selectFormValue) {
    case 1:
      basePrice = 20.50 * 10;
      console.log(basePrice)
      break;
    case 2:
      basePrice = 15.30 * 10;
      console.log(basePrice)
      break;
    case 3:
      basePrice = 33.60 * 10;
      console.log(basePrice)
      break;
  }

  //Check PromoCode Valid
  function isPromoValid(promocodeInserted) {
    const promoAvailable = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

    //If input not empty, then check value
    if (promocodeInserted.trim() != "") {
      if (promoAvailable.includes(promocodeInserted)) {
        validModalTitle.innerHTML = `Sconto applicato!`
        validModalText.innerHTML = `Sconto del 25% applicato, invece di ${basePrice}€ pagherai soltanto ${basePrice * 0.75}€`
        validModal.show()
        return true;
      } else {
        wrongPromo.show()
        return false;
      }
    }
  }

  if (promoInput.value.trim() === "") {
    validModalTitle.innerHTML = `Preventivo Inoltrato`;
    validModalText.innerHTML = `Il costo del progetto è di ${basePrice}€`;
    validModal.show();
  } else {
    isPromoValid(promoInput.value);
  }
})

//Ho volutamente evitato di validare tramite JS gli altri input.. l'ho già fatto abbastanza negli esercizi precedenti :)