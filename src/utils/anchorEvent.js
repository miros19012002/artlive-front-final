export const anchorEvent = (link, navigate) => {
  if (window.location.pathname !== "/") {
    navigate("/");
  }

  setTimeout(() => {
    window.scroll({
      top: document.getElementById(link).offsetTop,
      behavior: "smooth",
    });
  }, 100);
};
