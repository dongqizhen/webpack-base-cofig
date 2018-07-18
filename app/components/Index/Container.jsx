import React from 'react';
import ListItem from '../common/ListItem.jsx';
import './scss/Container.scss';
import Banner from '../common/Banner.jsx';
import Filter from './Filter.jsx';
import { Header, Bannerheader } from '../common/Header.jsx';
import '../common/scss/ListItem.scss';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1, productName: 'hello', brandName: 'GE', modelName: 'console.log', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 2, productName: '测试产品1号', brandName: 'GE', modelName: 'dkhfskjfhfksdj', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 3, productName: '测试产品2号', brandName: '飞利浦', modelName: 'console.log', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 4, productName: 'hello world', brandName: 'GE', modelName: '水电费是否sad', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 5, productName: '撒地方是否', brandName: 'GE', modelName: '胜多负少东方发生的发生水电费', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        }
      ]
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="Container">
        <Header bannerHeaderIsShow />
        <Banner />
        <Filter />
        <div className="listBox">
          <div className="common">
            <div className="product">
              <div className="title">
                <h3>热门产品推荐</h3>
                <div className="placeholder" />
              </div>
            </div>
            <ul className="clearfix">
              {
                              this.state.data.map((item, index, array) =>
                                //   {console.log(item)}
                                   (<li key={`${Date.now()}key${item.id}`} className="left">
                                     <ListItem itemObj={item} />
                                    </li>))
                          }
            </ul>
            <div className="shop">
              <div className="title">
                <h3>热门店铺推荐</h3>
                <div className="placeholder" />
              </div>
              <ul className="clearfix">
                <li className="left">
                  {/* <List /> */}
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

    );
  }
}
