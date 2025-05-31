export function createCard(cardData, likeHandler, imageClickHandler, deleteCardCallback, userId) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const cardDescription = cardElement.querySelector('.like_container');
  const likeCountElement = document.createElement('span');
  const isLiked = cardData.likes.some(like => like._id === userId);
  likeCountElement.classList.add('card__like-count'); 
  cardElement.appendChild(likeCountElement);
  cardElement.dataset.cardId = cardData._id;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardDescription.appendChild(likeCountElement);
  updateLikeCount(cardData.likes.length, likeCountElement);
  
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }
  deleteButton.addEventListener("click", () => deleteCardCallback(cardData._id));
  likeButton.addEventListener("click", function (evt) {
    likeHandler(evt.target, cardData, likeCountElement);
  });
  cardImage.addEventListener("click", function () {
    imageClickHandler(cardData.link, cardData.name);
  });

  return cardElement;

  function updateLikeCount(likeCount, likeCountElement) {
    likeCountElement.textContent = likeCount;
  }
}
