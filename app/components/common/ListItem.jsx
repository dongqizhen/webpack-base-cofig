import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // {console.log(this.props)}
    return (
      <div className="item">
        <div className="proImg">
          <img src="../../assets/imageOther/banner1.png" alt="" />
        </div>
        <div className="itemText">
          <h2>{this.props.itemObj.productName}</h2>
          <div className="brandAndModel clearfix">
            <div className="wordWrap brandBox left">
              <span>品牌:</span><span className="brandName">{this.props.itemObj.brandName}</span>
            </div>
            <div className="wordWrap modelBox right">
              <span>型号:</span><span className="modelName">{this.props.itemObj.modelName}</span>
            </div>
          </div>
          <div className="saleNumAndPrice clearfix">
            <div className="left saleNum"><span>销量:</span><span className="number">{this.props.itemObj.saleNumber}</span></div>
            <div className="right price"><span className="priceImg">￥</span><span className="priceValue">{this.props.itemObj.price}</span></div>
          </div>
        </div>
        <div className="itemName clearfix">
          <img src={this.props.itemObj.photo} alt="" />
          <span className="right">{this.props.itemObj.shopName}</span>
        </div>
      </div>
    );
  }
}
