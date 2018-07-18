import{ EventEmitter } from 'events'
import assign from 'object-assign'

let headerStores=assign({},EventEmitter.prototype,{
    bannerHeaderIsShow:true,

    getAllStore:function(){
        return this.bannerHeaderIsShow
    },

    emitChange:function(){//当stores变化时触发事件
        
        this.emit('change')
    },

    addChangeListener:function(callback){//监听stores变化
        
        this.on('change', callback);
    },

    removeChangeListener: function(callback){//移除监听事件
        this.removeListener('change', callback);
    }

})

export default headerStores;