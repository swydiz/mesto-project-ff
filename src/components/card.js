export function likeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function createCard(cardData, likeHandler, imageClickHandler) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", function (evt) {
    likeHandler(evt.target, cardData);
  });
  cardImage.addEventListener("click", function () {
    imageClickHandler(cardData.link, cardData.name);
  });
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}
