var wheelNegativeTarget,
  wheelPositiveTarget,
  wheelTargetClass;

const initTouchEvents = (negativeTarget, positiveTarget, targetClass) => {
  wheelNegativeTarget = negativeTarget || null;
  wheelPositiveTarget = positiveTarget || null;
  wheelTargetClass = targetClass || null;
  window.addEventListener('wheel', handleWheelMove);
};

const handleWheelMove = event => {
  event.preventDefault();
  if (event.deltaY > 0 && wheelNegativeTarget !== null) {
    window.location = wheelNegativeTarget;
  } else if (event.deltaY < 0 && wheelPositiveTarget !== null) {
    // If a target class is specified, we pick the ID from the element attributes to get the final URL
    if (wheelTargetClass !== null && event.target.classList.contains(wheelTargetClass)) {
      window.location = wheelPositiveTarget.replace("{id}", event.target.getAttribute('data-id'));
    } else if (wheelTargetClass === null) {
      window.location = window.wheelPositiveTarget;
    }
  }
};
