window.addEventListener("load", () => getPlayer().then(() => {
  window.location = (player.is_active) ? '/views/map' : '/views/register';
}));
