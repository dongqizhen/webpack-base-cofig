import { EventEmitter } from 'events';
import assign from 'object-assign';
import dispatchs from '../dispatchs/Dispatch.jsx';
import searchActions from '../actions/searchActions.jsx';

const searchStores = assign({}, EventEmitter.prototype, {

  stores: {
    BreadCrumbStores: [] // 面包屑导航详情数组
  },

  getAllStore() {
    return this.stores;
  },

  clearStoreBreadCrumbStores() { // 组建unamout时清除数据
    this.stores.BreadCrumbStores = [];
  },

  emitChange() { // 当stores变化时触发事件
    this.emit('change');
  },

  addChangeListener(callback) { // 监听stores变化
    this.on('change', callback);
  },

  removeChangeListener(callback) { // 移除监听事件
    this.removeListener('change', callback);
  }
});

dispatchs.register((action) => {
  switch (action.actionType) {
    case searchActions.CASSIFY_MOUSE_CLICK:
      console.log(action.text);
      searchStores.stores.BreadCrumbStores.push(action.text);
      searchStores.emitChange();
      break;

    case searchActions.BANNER_MOUSE_LEAVE:
      searchActions.stores.BannerHideBoxIsShow = false;
      searchActions.emitChange();
      break;

    default:
      break;
  }
});


export default searchStores;
