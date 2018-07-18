import React from 'react';
import './scss/StoreNav.scss';
import Swiper from 'swiper';
import Cassify from '../Search/Cassify.jsx';
import { PageAndList } from '../Search/Search.jsx';
import { ListNav } from '../common/ListNav.jsx';

class StoreNav extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      navArr: ['全部商品', '店铺介绍', '店铺资料']
    };
  }

  handleClick(index, e) {
    e.preventDefault();

    this.setState({
      currentIndex: index
    });

    this.mySwiper.swipeTo(index);
  }

  componentDidMount() {
    this.mySwiper = new Swiper('.swiper-container', {
      speed: 500,
      // noSwiping : true,
      simulateTouch: false,
      onSlideChangeStart: () => {
        this.setState({
          currentIndex: this.mySwiper.activeIndex
        });
      }
    });
  }

  componentWillUnmount() {
    this.mySwiper.destroy();
  }

  render() {
    const { currentIndex, navArr } = this.state;
    return (
      <div className="StoreNav">
        <ul className="StoreTabHeader clearfix">

          {
                navArr.map((val, i) => (
                  <li key={i} className={currentIndex == i ? 'active' : ''} onClick={this.handleClick.bind(this, i)}><span>
                    {
                      i == 0 ? val += '（99）' : val
                    }
                  </span><i />
                  </li>
                  ))
              }

          { /* <li onClick={this.handleClick.bind(this)}><span>全部商品(99)</span></li>
                <li><span>店铺介绍</span></li>
                <li><span>店铺资料</span></li> */}
        </ul>
        <div className="swiper-container">
          <ul className="StoreTabBody swiper-wrapper clearfix">
            <li className="swiper-slide swiper-no-swiping">
              <Cassify />
              <ListNav />
              <PageAndList />

            </li>
            <li className="swiper-slide swiper-no-swiping">vv</li>
            <li className="swiper-slide swiper-no-swiping">
              <p><i /><span>店铺类型：</span>原厂</p>
              <p><i /><span>店铺名称：</span>西门子直营店</p>
              <p><i /><span>店铺地址：</span>北京市朝阳区望京街道004号</p>
              <p><i /><span>经营范围：</span>扫描仪、B超机、手术床以及各种医疗器械</p>
              <p><i /><span>店铺认证资料：</span>扫描仪、B超机、手术床以及各种医疗器械</p>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

export default StoreNav;
