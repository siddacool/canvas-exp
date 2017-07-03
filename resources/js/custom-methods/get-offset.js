export default (el) => {
  const elm = el.getBoundingClientRect();
  return {
    left: elm.left + window.scrollX,
    top: elm.top + window.scrollY,
  };
};
