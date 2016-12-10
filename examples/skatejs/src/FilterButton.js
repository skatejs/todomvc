/** @jsx h */

import { h } from 'skatejs';
import { classes } from './style';

export default ({ handleFilter, filter, shouldFilter }, chren) => (
  <a
    class={filter === shouldFilter ? classes.selected : ''}
    href={`#/${shouldFilter}`}
    onClick={handleFilter}
  >{chren}</a>
);
