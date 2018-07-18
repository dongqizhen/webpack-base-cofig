import React from 'react';
import './scss/Banner.scss';
import Swiper from 'swiper';
import indexActions from '../../actions/indexActions.jsx';
import indexStores from '../../stores/indexStores.jsx';
import dispatchs from '../../dispatchs/Dispatch.jsx';

class BannerHideContainer extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }


  render() {
    return (
      <div className="bannerHideContainer">
        <ul>
          <li className="clearfix">
            <div className="left">推荐分类</div>
            <div className="right">
              <span>治疗机用X射线管</span>
              <span>施源器</span>
              <span>X射线管组件</span>
              <span>限束装置</span>
              <span>防散射滤线栅</span>
              <span>治疗机用X射线管</span>
              <span>限束装置</span>
            </div>
          </li>
          <li className="clearfix">
            <div className="left">超声影像类</div>
            <div className="right">
              <span>超声耦合垫</span>
              <span>超声水囊</span>
              <span>超声探头</span>
              <span>超声探头穿刺架</span>
            </div>
          </li>
          <li className="clearfix">
            <div className="left">推荐分类</div>
            <div className="right">
              <span>治疗机用X射线管</span>
              <span>施源器</span>
              <span>X射线管组件</span>
              <span>限束装置</span>
              <span>防散射滤线栅</span>
              <span>治疗机用X射线管</span>
              <span>限束装置</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

class Banner extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }


  componentDidMount() {
    // var mySwiper = new Swiper('.swiper-container',{
    //     progress:true,
    //     onProgressChange: function(swiper){
    //       for (var i = 0; i < swiper.slides.length; i++){
    //         var slide = swiper.slides[i];
    //         var progress = slide.progress;
    //         var translate = progress*swiper.width;
    //         var opacity = 1 - Math.min(Math.abs(progress),1);
    //         slide.style.opacity = opacity;
    //         swiper.setTransform(slide,'translate3d('+translate+'px,0,0)');
    //       }
    //     },
    //     onTouchStart:function(swiper){
    //       for (var i = 0; i < swiper.slides.length; i++){
    //         swiper.setTransition(swiper.slides[i], 0);
    //       }
    //     },
    //     onSetWrapperTransition: function(swiper, speed) {
    //       for (var i = 0; i < swiper.slides.length; i++){
    //         swiper.setTransition(swiper.slides[i], speed);
    //       }
    //     }
    //   })

    // if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){

    // }

    this.mySwiper = new Swiper('.swiper-container', {
      /* autoplay: {
                delay:3000,
                disableOnInteraction: false
            },//可选选项，自动滑动
            effect : 'fade',
            speed:2000,
            loop:true, */
      autoplay: 3000,
      loop: true,
      speed: 200,
      autoplayDisableOnInteraction: false,

    });
  }

  componentWillUnmount() {
    this.mySwiper.destroy();
  }


  render() {
    return (
      <div className="Banner">
        <div className="common">
          <div className="bannerContainer swiper-container" id="swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide"><img src="../../assets/imageOther/banner1.png" /></div>
              <div className="swiper-slide"><img src="../../assets/imageOther/banner2.png" /></div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}


export default Banner;
