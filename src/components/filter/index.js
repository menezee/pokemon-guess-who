import styles from './filter.module.css';
import filters from '../../data/filters.json';
import { play, AudioFiles } from '../helpers';

function Filter({ selectFilter, selectedFilters }) {
  const onChange = (e) => {
    play(AudioFiles.GUESS);
    selectFilter(e.target.value);
  };
  
  const hideAlreadySelectedFilters = section => v => !selectedFilters.some(f => f.name === section && f.value === v);
  
  return (
    <select className={styles.filter} onChange={onChange}>
      <option>-------</option>
      {Object.entries(filters).map(([section, values]) => (
        <optgroup key={section} label={section}>
          {
            values
              .filter(hideAlreadySelectedFilters(section))
              .map((val) => (
                <option key={val} value={`${section}-${val}`}>
                  {String(val)}
                </option>
              ))
          }
        </optgroup>
      ))}
    </select>
  );
}

export { Filter };
