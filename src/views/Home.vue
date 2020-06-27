<template>
  <div class="home">
    <ul>
      <li v-for="stock in stocks">{{stock.pk}}--{{stock.fields.name}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

import {request} from "../network/request";

export default {
  name: 'Home',
  data(){
    return{
      stocks:[]
    }
  },
  components: {

  },
  created() {
    request({
      url:'/get_stocks'
    }).then(res=>{
      console.log('success')
      this.stocks=res.data['stocks']
    }).catch(error=>{
      error.log(error)
    })
  }
}
</script>
