import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './scss/Breadcrumb.scss';
import CassifyStores from '../../stores/CassifyStores.jsx';

class Breadcrumb extends React.Component {
  constructor() {
    super();
    this.state = {
      stores: CassifyStores.getAllStore()
    };
  }

  _hundleClick() {

  }

  componentDidMount() {
    CassifyStores.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    CassifyStores.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({
      stores: CassifyStores.getAllStore()
    });
  }

  render() {
    return (
      <ul className="breadcrumb clearfix">
        <li><Link to="/">首页</Link><i /></li>
        <li><Link to="#" className="active">搜索结果页</Link><i /></li>
        {
              this.state.stores.BreadCrumbStores.map((val, i) => (
                <li key={i}>
                  <span>{val}</span>
                  {this.state.stores.BreadCrumbStores.length - 1 > i && <i /> }
                </li>
              ))
            }
      </ul>
    );
  }
}

export default Breadcrumb;
