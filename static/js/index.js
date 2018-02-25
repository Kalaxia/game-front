window.addEventListener("load", () => getCurrentPlayer().then(() => {
  window.location = (player.is_active) ? '/views/profile' : '/views/register';
}));
