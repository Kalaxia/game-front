window.addEventListener("load", () => getPlayer().then(() => {
  window.location = (player.isActive) ? '/views/map' : '/views/register';
}));
