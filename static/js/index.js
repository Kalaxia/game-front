window.addEventListener("load", () => getPlayer().then(() => {
  window.location = (player.is_active) ? '/views/profile' : '/views/register';
}));
