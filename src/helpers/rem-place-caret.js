const placeCaret = (el, atStart = false) => {
  el.focus();
  if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      // true to put the caret at start
      range.collapse(atStart);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(atStart);
      textRange.select();
  }
}

export const placeCaretAtEnd = (el) => {
  placeCaret(el, false)
}
export const placeCaretAtStart = (el) => {
  placeCaret(el, true)
}