export function getLoopedCarouselIndex(currentIndex, direction, itemCount) {
  if (!Number.isInteger(itemCount) || itemCount <= 0) {
    return 0;
  }

  return (currentIndex + direction + itemCount) % itemCount;
}

export function getNormalizedPhysicalIndex(
  physicalIndex,
  itemCount,
  cloneCount,
) {
  if (!Number.isInteger(itemCount) || itemCount <= 0) {
    return 0;
  }

  if (physicalIndex < cloneCount) {
    return physicalIndex + itemCount;
  }

  if (physicalIndex >= cloneCount + itemCount) {
    return physicalIndex - itemCount;
  }

  return physicalIndex;
}
