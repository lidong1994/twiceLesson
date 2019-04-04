Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    canyin:{
      type:Object,
      value:''
    },
    tap:{
      type:Number,
      value:''
    },
    titles:{
      type:String,
      value:''
    }
  },
  data: {
    // 这里是一些组件内部数据
      index:0,
      food_list:[],
      name:'',
      titles:'',//标题
  },
  attached() {
    this.setData({
      tap: this.properties.tap
    })
    console.log(this.properties.tap)
  },
  created: function () {


   },
  methods: {
    // 这里是一个自定义方法

    customMethod() { },
    /**
     * 向父组件传值
     */
    select(e){
      let tap = e.currentTarget.dataset.ids
      console.log(tap)
      this.setData({
        index:e.currentTarget.dataset.id,
        name: e.currentTarget.dataset.name
      })
      this.triggerEvent('myevent', { paramBtoA: this.data.name,tapB:tap});

    },
    /**
     * 向父组件传值取消弹框
     */
    quxiao(){
      this.triggerEvent('hiddenTab', { hiddens: true})
    }
  }
})