import React from 'react';
import '../common/scss/Footer.scss';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = { };
  }

  render() {
    return (
      <div className="footer">
        <div className="blueBG" />
        <div className="foot">
          <ul className="clearfix">
            <li><a href="#">关于我们</a></li>
            <li><a href="#">服务条款</a></li>
            <li><a href="#">广告服务</a></li>
            <li><a href="#">帮助中心</a></li>
            <li><a href="#">诚征英才</a></li>
            <li><a href="#">联系我们</a></li>
          </ul>
          <p>
            <span>版权所属：北京网来天下医疗科技有限责任公司</span>
            <span>客服电话：400-1212-11</span>
            <span>QQ服务：1823831121</span>
            <span>联系地址：北京市顺义区竺园路12号院天竺综合保税区泰达科技园7号楼</span>
          </p>
          <div className="copyRight">
            <span>Copyright 2005-2016 allbring.com Corporation, All Rights Reserved</span>
            <span>京ICP备16013128号</span>
          </div>
          <div className="code">
            <img src="../../assets/images/code.png" alt="" />
            <span>欢迎下载网来商城App</span>
          </div>
        </div>

      </div>

    );
  }

  componentDidMount() {

  }
}

export default Footer;
