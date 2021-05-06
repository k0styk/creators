import React from 'react';
import s from './Footer.module.scss';
import logo from '../logo.png';

class Index extends React.Component {
  render() {
    return (
      <div className={s.footer}>
        <div className={s.header}>
          <img src={logo} alt="Logo" className={s.logo}/>
          <div className={s.official}>
            <div> ООО «Компания»</div>
            <div> ИНН 7777777777</div>
          </div>
        </div>
        <div className={s.divider}/>
        <div className={s.footerEnd}>
          <div className={s.copy}>© Copyright - Creators</div>
          <div className={s.phone}> тел. +7 (922) 111-11-11 </div>
        </div>
      </div>
    );
  }
}

export default Index;
