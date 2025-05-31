export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escapePress);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapePress);
}

function escapePress(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

export function closePopupBuOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

