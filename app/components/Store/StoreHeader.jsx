import React from 'react';
import './scss/StoreHeader.scss';


class StoreHeader extends React.Component {
  constructor() {
    super();
    this.state = { };
  }


  componentDidMount() {

  }

  render() {
    return (
      <div className="storeHeader">
        <img src="../../assets/imageOther/banner1.png" alt="" />
        <div>
          <h2>
                    西门子直营店
            <i />
            <span className="collect"><i />收藏</span>
            <span className="share"><i />分享</span>
          </h2>
          <div className="clearfix">
            <ul className="left">
              <li><i />张三</li>
              <li><i />010-28787788</li>
              <li><i />北京市朝阳区望京街道x号x层</li>
            </ul>
            <ul className="center">
              <li><i />销量 &nbsp; 987</li>
              <li><i />人气 &nbsp; 789</li>
            </ul>
            <span className="right">联系卖家<i /></span>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreHeader;
