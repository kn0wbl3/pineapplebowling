// Open links to other sites (Standings, Photos, Drive files) in a new tab.
document.querySelectorAll('a[href^="http"]').forEach(function (a) {
  if (a.hostname !== window.location.hostname) {
    a.target = "_blank";
    a.rel = "noopener";
  }
});
