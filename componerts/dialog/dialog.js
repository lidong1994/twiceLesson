Component({
  properties: {


  },

  methods:{
cel(){
  this.triggerEvent('cancel', { hiddens: true })
}
  }
})