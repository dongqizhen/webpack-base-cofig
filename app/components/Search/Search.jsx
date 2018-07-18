import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Breadcrumb from '../common/Breadcrumb.jsx';
import { Header } from '../common/Header.jsx';
import Cassify from './Cassify.jsx';
import ReactPaginate from 'react-paginate';
import './scss/paginate.scss';
import { ListNav, StoreOrProduct } from '../common/ListNav.jsx';
import ListItem from '../common/ListItem.jsx';
import './scss/list_5.scss';

export class PageAndList extends React.Component {
  constructor() {
    super();
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
        }, {
          id: 6, productName: 'hello', brandName: 'GE', modelName: 'console.log', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 7, productName: '测试产品1号', brandName: 'GE', modelName: 'dkhfskjfhfksdj', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 8, productName: '测试产品2号', brandName: '飞利浦', modelName: 'console.log', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 9, productName: 'hello world', brandName: 'GE', modelName: '水电费是否sad', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        },
        {
          id: 10, productName: '撒地方是否', brandName: 'GE', modelName: '胜多负少东方发生的发生水电费', saleNumber: '123', price: '123456789', shopName: '北京华脉诚信科技有限公司', photo: '../../assets/images/photo.png'
        }
      ]
    };
  }

  render() {
    return (
      <div className="paginationContainer">
        <ul className="clearfix fiveList">
          {
                  this.state.data.map((item, i) => (<li key={`${Date.now()}key${item.id}`} className="left">
                    <ListItem itemObj={item} />
                                                    </li>))
              }
        </ul>
        <ReactPaginate
          previousLabel={<span><i />上一页</span>}
          nextLabel={<span>下一页<i /></span>}
          breakLabel={<a>...</a>}
          breakClassName="break-me"
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          pageClassName="tag"
        />
      </div>
    );
  }
}

export class Search extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="serach">
        <Header />
        <Breadcrumb history={this.props.history} />
        <Cassify />
        <div className="list_container">
          <ListNav>
            <StoreOrProduct />
          </ListNav>
        </div>
        {/* <div className="paginationContainer">
            <ul className="clearfix fiveList">
              {
                  this.state.data.map((item,i)=>{
                   return <li key={Date.now()+"key"+item.id} className="left">
                            <ListItem itemObj={item}/>
                          </li>
                  })
              }
            </ul>
            <ReactPaginate previousLabel={<span><i></i>上一页</span>}
                        nextLabel={<span>下一页<i></i></span>}
                        breakLabel={<a>...</a>}
                        breakClassName={"break-me"}
                        pageCount={20}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        pageClassName={"tag"} />
          </div> */}
        <PageAndList />
      </div>
    );
  }

  componentDidMount() {
    // this.setState({ someKey: 'otherValue' });
  }
}

