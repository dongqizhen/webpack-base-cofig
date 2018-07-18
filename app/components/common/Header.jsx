import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styles from './scss/Header.scss';
import Search from '../Search/Search.jsx';
import dispatchs from '../../dispatchs/Dispatch.jsx';
import indexActions from '../../actions/indexActions.jsx';
import indexStores from '../../stores/indexStores.jsx';


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


class Bannerheader extends React.Component {
  constructor() {
    super();
    this.state = {
      stores: indexStores.getAllStore(),
      json: {
        配件: ['常用配件', '超声配件', '电子配件', '手术配件'],
        整机: ['超声配件', '超声配件', '超声配件', '手术配件'],
        耗材: ['常用配件', '超声配件', '电子配件', '手术配件'],
        租赁: ['常用配件', '超声配件', '电子配件', '手术配件'],
      }
    };
  }

  componentDidMount() {
    indexStores.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    indexStores.removeChangeListener(this._onChange.bind(this));
  }

  mouseEnterEvent(n) {
    dispatchs.dispatch({
      actionType: indexActions.BANNER_MOUSE_ENTER,
      currentIndex: n
    });
  }

  mouseLeaveEvent() {
    dispatchs.dispatch({
      actionType: indexActions.BANNER_MOUSE_LEAVE
    });
  }

  _onChange() {
    this.setState({
      stores: indexStores.getAllStore()
    });
  }

  render() {
    let elementArr = [],
      n = 0;
    for (const key in this.state.json) {
      const str = (
        <li className={`listItem-${n++}`} key={key} onMouseEnter={this.mouseEnterEvent.bind(this, n)} onMouseLeave={this.mouseLeaveEvent.bind(this)}>
          <h2><i /><span> {key} </span></h2><div className="moudel">
            {
                                this.state.json[key].map((value, key) =>
                                  <span key={key}> {value}</span>)
                            }

                                            </div>

          {
                        this.state.stores.currentIndex == n && this.state.stores.BannerHideBoxIsShow && <BannerHideContainer />
                        }
        </li>
      );

      elementArr.push(str);
    }


    return (
      <div className="bannerHeader">
        <span><i />全部商品分类</span>
        <ul className="bannerNav" style={{ display: this.props.headerStyle ? 'block' : 'none' }}>
          {elementArr}
        </ul>
        <ul className="clearfix nav">
          <li><a href="#">配件</a></li>
          <li><a href="#">整机</a></li>
          <li><a href="#">耗材</a></li>
          <li><a href="#">人工</a></li>
          <li><a href="#">店铺</a></li>
          <li><a href="#">团购</a></li>
          <li><a href="#">联系我们</a></li>
        </ul>
      </div>
    );
  }
}


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
  }

  inputValueChangeEvent(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleClick(e) {
    this.state.inputValue == '' ?
      e.preventDefault() : '';
  }

  render() {
    return (
      <Router basename="/">
        <div className="header">
          <div className="head">
            <div>
              <ul className="clearfix">
                <li> 登陆/我的商城 </li>
                <li> <i /> 购物车 </li>
                <li> 商家中心 </li>
                <li className="last"> <i /> 网来商城App </li>
              </ul>
            </div>
          </div>

          <div className="search clearfix">
            <div className="logo">
              <a href="#">
                <img src="../../assets/images/logo.png" />
              </a>
            </div>
            <div className="searchContainer">
              <div className="seach_btn">
                <i />
                <input type="text" placeholder="请输入搜索内容，如飞利浦血压仪等" onChange={this.inputValueChangeEvent.bind(this)} />
                <Link to={{ pathname: '/search', search: `?value=${this.state.inputValue}` }} target="_blank" onClick={this.handleClick.bind(this)}>搜索</Link>
              </div>
              <ul className="clearfix">
                <li>血压仪</li>
                <li>血压仪</li>
                <li>血压仪</li>
                <li>血压仪</li>
                <li>血压仪</li>
                <li>血压仪</li>
                <li>血压仪</li>
                <li>血压仪</li>
              </ul>
            </div>
          </div>
          {
                        /**
                         * bannerHeaderStyle:控制头部导航是否显示
                         */
                    }
          { (this.props.bannerHeaderStyle == undefined || this.props.bannerHeaderStyle) && <Bannerheader headerStyle={this.props.bannerHeaderIsShow} />}
        </div>
      </Router>
    );
  }

  componentDidMount() {}
}

export {
  Header,
  Bannerheader,
  BannerHideContainer
};
