import React from 'react';
import './scss/Filter.scss';

export default class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [
        {
          id: 1, name: '配件', image: '../../assets/images/accessory.png', activeImage: '../../assets/images/accessoryActive.png'
        },
        {
          id: 2, name: '整机', image: '../../assets/images/wholeMachine.png', activeImage: '../../assets/images/wholeMachineActive.png'
        },
        {
          id: 3, name: '耗材', image: '../../assets/images/consumable.png', activeImage: '../../assets/images/consumableActive.png'
        },
        {
          id: 4, name: '人工', image: '../../assets/images/artificial.png', activeImage: '../../assets/images/artificialActive.png'
        }
      ],
      addClass: 1,
      addTextClass: 'a',
      secondSort: 'shop'
    };
  }

  handleActive(addClass) {
    this.setState({
      addClass
    });
  }
  handleSortBackground(secondSort) {
    this.setState({
      secondSort
    });
  }
  handleActiveTextColor(addTextClass) {
    this.setState({
      addTextClass
    });
  }
  render() {
    return (
      <div className="filter">
        <div className="common">
          <div className="bigSort">
            <ul className="clearfix">
              {
                            this.state.lists.map((value, index, array) => (<li key={value.id} className={this.state.addClass == value.id ? 'active' : ''} onClick={() => this.handleActive(value.id)}><img src={this.state.addClass == value.id ? value.activeImage : value.image} alt="" />
                              <div className="sortName">{value.name}</div>
                              <div className="triangle" />
                                                                           </li>))
                        }
            </ul>
          </div>
        </div>
        <div className="secondSort">
          <div className="selectTitle">
            <div className="common">
              <div className="filterSort">
                <div className="shopOrProduct left clearfix">
                  <div className={this.state.secondSort == 'shop' ? 'active itemSort left' : 'itemSort left'} onClick={() => this.handleSortBackground('shop')}>
                    <div className="secondSortName">按店铺</div>
                    <div className="activeStyle">
                      <div className="blueBar" />
                      <div className="blueTriangle" />
                    </div>
                  </div>
                  <div className={this.state.secondSort == 'product' ? 'active itemSort right' : 'itemSort right'} onClick={() => this.handleSortBackground('product')}>
                    <div className="secondSortName productSecondSortName">按产品</div>
                    <div className="activeStyle">
                      <div className="blueBar" />
                      <div className="blueTriangle" />
                    </div>
                  </div>
                </div>
                <div className="codeIndex right">
                  <ul className="clearfix">
                    <li className={this.state.addTextClass == 'a' ? 'active' : ''} onClick={() => this.handleActiveTextColor('a')}>A-G</li>
                    <li className={this.state.addTextClass == 'h' ? 'active' : ''} onClick={() => this.handleActiveTextColor('h')}>H-N</li>
                    <li className={this.state.addTextClass == 'o' ? 'active' : ''} onClick={() => this.handleActiveTextColor('o')}>O-T</li>
                    <li className={this.state.addTextClass == 'u' ? 'active' : ''} onClick={() => this.handleActiveTextColor('u')}>U-Z</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <div className="filterResult">
            <div className="common">
              <ul className="clearfix">
                <li>这里最多显示十个字符</li>
                <li>这里最多显示十个字符</li>
                <li>这里最多显示十个字符</li>
                <li>这里最多显示十个字符</li>
                <li>这里最多显示十个字符</li>
                <li>这里最多显示十个字符这里最多显示十个字符</li>
                <li>这里最多显示十个字符这里最多显示十个字符</li>
                <li>这里最多显示十个字符这里最多显示十个字符</li>
                <li>这里最多显示十个字符这里最多显示十个字符</li>
                <li>这里最多显示十个字符这里最多显示十个字符</li>
              </ul>
              <div className="scanMore">
                            查看更多
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
