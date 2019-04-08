export const addCssClass = (element, className) => {
  if (element.current.classList) {
    element.current.classList.add(className);
  } else if (!this.hasClass(element.current, className)) {
    element.current.className += " active";
  }
};

export const removeCssClass = (element, className) => {
  if (element.current.classList) {
    element.current.classList.remove(className);
  } else if (this.hasClass(element.current, className)) {
    var reg = new RegExp("(\\s|^)active(\\s|$)");
    element.current.className = element.current.className.replace(reg, " ");
  }
};

// Returns if the class exists on the provided element
export const hasClass = (element, className) => {
  if (element.classList) return element.classList.contains(className);
  return !!element.className.match(
    new RegExp("(\\s|^)" + className + "(\\s|$)")
  );
};

export const resetBackground = body => {
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "top left";
  body.style.backgroundAttachment = "fixed";
  body.style.backgroundSize = "cover";
};
