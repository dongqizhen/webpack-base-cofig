import { EventEmitter } from 'events';
import assign from 'object-assign';
import dispatchs from '../dispatchs/Dispatch.jsx';
import indexActions from '../actions/indexActions.jsx';

const indexStores = assign({}, EventEmitter.prototype, {

  stores: {
    BannerHideBoxIsShow: false,
    currentIndex: 0
  },

  getAllStore() {
    return this.stores;
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
    case indexActions.BANNER_MOUSE_ENTER:
      indexStores.stores = {
        BannerHideBoxIsShow: true,
        currentIndex: action.currentIndex
      };
      indexStores.emitChange();
      break;

    case indexActions.BANNER_MOUSE_LEAVE:
      indexStores.stores.BannerHideBoxIsShow = false;
      indexStores.emitChange();
      break;

    default:
      break;
  }
});


export default indexStores;
