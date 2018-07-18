import React from 'react';
import { Header } from '../common/Header.jsx';
import Breadcrumb from '../common/Breadcrumb.jsx';
import './scss/ProductDetails.scss';
import '../../assets/css/animate.min.css';
import Swiper from 'swiper';

class Chooseamount extends React.Component {
  constructor() {
    super();
    this.state = {
      inputVal: 1,
      ReduceisDisable: true,
      AddisDisable: false
    };
  }


  _addNumber() {
    this.setState({
      inputVal: ++this.state.inputVal,
      ReduceisDisable: !(this.state.inputVal > 1)
    });
  }

  _reduceNumber() {
    if (this.state.inputVal > 1) {
      this.setState({
        inputVal: --this.state.inputVal,
        ReduceisDisable: this.state.inputVal <= 1
      });
    }
  }

  _handleChange(e) {
    this.setState({
      inputVal: e.target.value
    });
  }

  render() {
    return (
      <div className="Chooseamount clearfix">
        <input type="text" onChange={this._handleChange.bind(this)} value={this.state.inputVal} />
        <p>
          <span className={this.state.AddisDisable ? 'disabled' : ''} onClick={this._addNumber.bind(this)}>+</span>
          <span className={this.state.ReduceisDisable ? 'disabled' : ''} onClick={this._reduceNumber.bind(this)}>-</span>
        </p>

      </div>
    );
  }
}

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      // inputVal:1
    };
  }

  swiperNext() {
    console.log(this.mySwiper.activeIndex);
    this.mySwiper.swipeNext();
  }

  swiperPrev() {
    this.mySwiper.swipePrev();
  }

  componentDidMount() {
    const evt = new Event(),
      m = new Magnifier(evt);
    m.attach({
      thumb: '#thumb',
      large: '../../assets/imageOther/banner1.png',
      largeWrapper: 'preview',
      zoomable: true
    });

    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 5
    });
  }

  componentWillUnmount() {
    this.mySwiper.destroy();
  }

  render() {
    // let {inputVal} = this.state;
    return (
      <div className="productDetails">
        <Header bannerHeaderStyle={false} />
        <div className="container">
          <Breadcrumb />

          <div className="magnifier_container clearfix">
            <div className="left">
              <div className="magnifier">
                <a className="magnifier-thumb-wrapper" href="#">
                  <img id="thumb" src="../../assets/imageOther/banner1.png" />
                </a>
                <div className="magnifier-preview" id="preview" />
                <div className="SwiperBox clearfix">
                  <span onClick={this.swiperPrev.bind(this)}>上</span>
                  <div className="swiper-container">
                    <ul className="swiper-wrapper clearfix">
                      <li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" /></li>
                      <li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" />
                      </li>
                      <li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" />
                      </li>
                      <li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" />
                      </li><li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" />
                           </li><li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" />
                      </li><li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" />
                                </li><li className="swiper-slide"><img src="../../assets/imageOther/banner1.png" alt="" />
                           </li>
                    </ul>
                  </div>
                  <span onClick={this.swiperNext.bind(this)}>下</span>
                </div>

              </div>
              <div className="addCar">
                <h2>
                  <span>团购</span>
                                    Panasonic/松下家用上臂式全自动血压计EW3106全国联保血压测量仪
                </h2>
                <div className="price_box">
                  <div className="price">
                    <span>价格</span>
                    <a>¥</a>
                                        23000
                  </div>
                  <ul className="clearfix">
                    <li><i />收藏量<span>25</span></li>
                    <li><i />浏览量<span>25</span></li>
                  </ul>
                </div>
                <div className="combo clearfix">
                  <span>套餐</span>
                  <ul className="clearfix">
                    <li>默认<i /></li>
                    <li>套餐一<i /></li>
                    <li>套餐二<i /></li>
                  </ul>
                </div>
                <div className="Stock clearfix">
                  <span>数量</span>
                  <Chooseamount />
                                    库存99件
                </div>
                <div className="btn">
                  <i />加入购物车
                </div>
              </div>
            </div>
            <div className="right">
              <div className="store">
                <a><i /><img src="../../assets/imageOther/banner1.png" alt="" />
                  <ul className="animated bounce">
                    <li className="clearfix"><span>主营：</span><p>主营西门子、飞利浦等知名品牌的两行多余…</p> </li>
                    <li className="clearfix"><span>地址：</span><p>位于北京顺义区天竺泰达技园7号楼x号</p> </li>
                  </ul>
                </a>
                <p>北京惠安达医疗设备责任有限公司</p>
                <span>收藏店铺</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default ProductDetails;
