function delegateEvent(parentElement, selector, eventType, callback) {
  if (!(parentElement instanceof Element)) return undefined;

  parentElement.addEventListener(eventType, (event) => {
    if (event.target.matches(selector)) callback(event);
  });

  return true;
}