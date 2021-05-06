import React from 'react';
import s from './Search.module.scss';
import Filter from '../../shared/Filter';
import Cards from "../../shared/PromoCard/Cards";

class Search extends React.Component {
  render() {
    const cards = [];
    for (let i =1; i<9; i++) {
      cards.push(i);
    }
    return (
      <div>
        <div className={s.title}>
                    Видео
        </div>
        <Filter withButton={true}/>
        <div className={s.helperText}> Вот, что мы нашли по вашему запросу</div>
          <Cards promos={cards} withIncludes={true}/>
      </div>
    )
    ;
  }
}
export default Search;
