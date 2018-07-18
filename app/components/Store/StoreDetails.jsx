import React from 'react';
import { Header } from '../common/Header.jsx';
import StoreHeader from './StoreHeader.jsx';
import StoreNav from './StoreNav.jsx';

export default class StoreDetailes extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="storeDetailes">
        <Header bannerHeaderStyle={false} />
        <StoreHeader />
        <StoreNav />
      </div>
    );
  }
}
