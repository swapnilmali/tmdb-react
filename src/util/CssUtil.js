/**
 * Adds css class to the dom element
 * @param {*} element
 * @param {*} className
 */
export const addCssClass = (element, className) => {
  if (element.current.classList) {
    element.current.classList.add(className);
  } else if (!this.hasClass(element.current, className)) {
    element.current.className += " active";
  }
};

/**
 * Removes css class of the dom element
 * @param {*} element
 * @param {*} className
 */
export const removeCssClass = (element, className) => {
  if (element.current.classList) {
    element.current.classList.remove(className);
  } else if (this.hasClass(element.current, className)) {
    var reg = new RegExp("(\\s|^)active(\\s|$)");
    element.current.className = element.current.className.replace(reg, " ");
  }
};

/**
 * Returns if the class exists on the provided element
 * @param {*} element
 * @param {*} className
 */
export const hasClass = (element, className) => {
  if (element.classList) return element.classList.contains(className);
  return !!element.className.match(
    new RegExp("(\\s|^)" + className + "(\\s|$)")
  );
};

/**
 * Reset the background properties of the given element
 * @param {*} element
 */
export const resetBackground = element => {
  element.style.backgroundRepeat = "no-repeat";
  element.style.backgroundPosition = "top left";
  element.style.backgroundAttachment = "fixed";
  element.style.backgroundSize = "cover";
};
