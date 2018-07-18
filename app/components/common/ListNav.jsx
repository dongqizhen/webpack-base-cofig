import React from 'react';
import '../common/scss/ListNav.scss';


export class ListNav extends React.Component {
  constructor() {
    super();
    this.state = {
      navList: [
        {
          name: '最新',
        },
        {
          name: '最热'
        },
        {
          name: '价格'
        },
        {
          name: '好评'
        }
      ],
      isActive: true,
      ActiveIndex: 0
    };
  }


  _handleClick(index, e) {
    this.setState({
      ActiveIndex: index
    });
  }

  render() {
    return (
      <div className="ListNav clearfix">
        <ul className="clearfix">
          {
              this.state.navList.map((val, i) => (<li
                key={i}
                className={this.state.isActive && this.state.ActiveIndex == i ? 'active'
              : ''}
                onClick={this._handleClick.bind(this, i)}
              >
                {val.name}
                <i />
                <strong />
              </li>))
            }
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export class StoreOrProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      listStores: [
        {
          name: '按产品'
        }, {
          name: '按店铺'
        }
      ],
      ActiveIndex: 0
    };
  }

  _handleClick(index, e) {
    this.setState({
      ActiveIndex: index
    });
  }

  render() {
    return (
      <div className="StoreOrProduct">
        <ul className="clearfix">
          {
              this.state.listStores.map((val, i) => (
                <li key={i} className={this.state.ActiveIndex == i ? 'active' : ''} onClick={this._handleClick.bind(this, i)}>
                  <span />
                  {val.name}
                </li>
                ))
            }
        </ul>
      </div>
    );
  }
}

