class DOMUtilities {
  getAncestorBySelector = (el, selector) => {
    let ancestor = el.parentElement;

    if (0 <= selector.indexOf('.') || 0 <= selector.indexOf('#')) {
      selector = selector.substring(1, selector.length);
    }

    if (
      el.classList.contains(selector) ||
      el.tagName === selector.toUpperCase() ||
      el.getAttribute('id') === selector
    ) {
      return el;
    }

    while ('HTML' !== ancestor.tagName) {
      if (
        ancestor.classList.contains(selector) ||
        ancestor.tagName === selector.toUpperCase() ||
        ancestor.getAttribute('id') === selector
      ) {
        return ancestor;
      }

      ancestor = ancestor.parentElement;
    }

    return null;
  };
}

export default DOMUtilities;
