import { randomIntFromInterval } from '../helpers';
import getMessage from '../messages';

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

function parseFilterInput(filterInput /* color-green, types-fairy */) {
  const [attr, value] = filterInput.split(/-(.*)/s);
  return { attr, value };
}

const BASE_SCORE = 100;

function calculateScore(amountOfFilters, startTime) {
  const TIME_THRESHOLD = 30;
  const FILTER_THRESHOLD = 5;
  
  const FILTER_PENALTY = 8;
  const TIME_PENALTY = 0.5;
  
  const totalTimeInSeconds = (Date.now() - startTime) / 1000;
  const timePenalty = totalTimeInSeconds > TIME_THRESHOLD ? (totalTimeInSeconds - TIME_THRESHOLD) * TIME_PENALTY : 0;
  const filterPenalty = amountOfFilters > FILTER_THRESHOLD ? (amountOfFilters - FILTER_THRESHOLD) * FILTER_PENALTY : 0;
  
  const score = BASE_SCORE - timePenalty - filterPenalty;
  const finalScore = (
    score > 0 ?
      score.toFixed(2) :
      0
  );
  return {
    score: finalScore,
    reason: getMessage('score-reason', {
      amountOfFilters,
      totalTimeInSeconds,
      timePenalty: timePenalty.toFixed(2),
      filterPenalty: filterPenalty.toFixed(2),
    }),
  };
}

const ATTRS_NOT_TO_USE = new Set(['sprite', 'name']);

function getHint(filters, chosenPokemon) {
  const foundFilters = filters.filter(f => elementContainsFilter(f, chosenPokemon));
  const pokemonAttrEntries = Object.entries(chosenPokemon);
  
  const filterAttributesToUse = ([key]) => !ATTRS_NOT_TO_USE.has(key);
  const availableAttributes = pokemonAttrEntries.filter(filterAttributesToUse);
  
  const filterAttributesNotUsed = ([key]) => !foundFilters.some(({ name }) => name === key);
  const attributesNotUsedInFilters = availableAttributes.filter(filterAttributesNotUsed);
  
  if (attributesNotUsedInFilters.length === 0) return null;
  
  const randomAttrIdx = randomIntFromInterval(0, attributesNotUsedInFilters.length - 1);
  let [hintAttr, hintVal] = attributesNotUsedInFilters.at(randomAttrIdx);
  
  hintVal = Array.isArray(hintVal) ? hintVal.at(0) : hintVal;
  return `${hintAttr}-${hintVal}`;
}

export { filterBasedOnTarget, elementContainsFilter, parseFilterInput, calculateScore, getHint };
