import React from 'react';
import './scss/Sidebar.scss';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideTipIsShow: false,
      keysWord: '',
      background: 'rgba(1,157,221,1)'
    };
  }

  componentDidMount() {
  }

  mouseEnterEvent(parmas) {
    this.setState({
      hideTipIsShow: true,
      keysWord: parmas
    });
  }

  mouseLeaveEvent() {
    this.setState({
      hideTipIsShow: false,
    });
  }

  moveToTop() {
    /* (function smoothscroll(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                 window.requestAnimationFrame(smoothscroll);
                 window.scrollTo (0,currentScroll - (currentScroll/10));
            }
        })();  */

    let timeOut;
    (function scrollToTop() {
      if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
        window.scrollBy(0, -50);
        timeOut = setTimeout(scrollToTop, 10);
      } else {
        clearTimeout(timeOut);
      }
    }());
  }

  render() {
    return (
      <div className="sidebar">

        <div className="shoppingCar">
          <p><i /><span>购物车</span></p>
        </div>
        <div className="feedback" onMouseEnter={this.mouseEnterEvent.bind(this, 'FEEDBACK')} onMouseLeave={this.mouseLeaveEvent.bind(this)}>
          <i />
          <span className={`feedbackHide ${this.state.hideTipIsShow && this.state.keysWord == 'FEEDBACK' ? 'active' : ''}`}>用户反馈</span>
        </div>
        <div className="backTop" onMouseEnter={this.mouseEnterEvent.bind(this, 'BACKTOP')} onMouseLeave={this.mouseLeaveEvent.bind(this)} onClick={this.moveToTop.bind(this)}>
          <i />
          <span className={`backTopHide ${this.state.hideTipIsShow && this.state.keysWord == 'BACKTOP' ? 'active' : ''}`}>回顶部</span>
        </div>


      </div>
    );
  }
}
