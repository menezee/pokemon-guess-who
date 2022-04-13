function elementContainsFilter(filter, el) {
  const { name: attributeName, value: filterValue } = filter;
  const elementAttribute = el[attributeName];

  const isAttrArray = Array.isArray(elementAttribute);
  if (isAttrArray) {
    return elementAttribute.some((attr) => filterValue === attr);
  }

  return filterValue === elementAttribute;
}

function filterBasedOnTarget(filters, target, list) {
  function _filterBasedOnTarget(filterIdx, currList) {
    if (filterIdx >= filters.length) return currList;

    const currFilter = filters[filterIdx];
    const targetContainsFilter = elementContainsFilter(currFilter, target);

    const filteredList = currList.filter((el) => {
      const elContainsFilter = elementContainsFilter(currFilter, el);
      return elContainsFilter === targetContainsFilter;
    });

    return _filterBasedOnTarget(filterIdx + 1, filteredList);
  }

  return _filterBasedOnTarget(0, list);
}

export { filterBasedOnTarget, elementContainsFilter };
