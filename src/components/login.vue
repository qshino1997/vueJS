<template>
  <div class="login">
    <form action="/post" v-if="!loading">
      <label><b>Username</b></label>
      <input type="text" v-model="username">
      <label><b>Password</b></label>
      <input type="password" v-model="password">
      <input type="submit" v-on:click.prevent="login">
  </form>
  <div v-if="msg"><h1>Sai pass or username</h1></div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loading: false,
      username: "",
      password: "",
      msg: false
    }
  },
  methods:{
    login: function(){
      // should be replaced by real login code
      // there I just did some simple validation and use a fake login
      if(this.username != '' && this.password!= '' )
      {
        if(this.username == "admin" && this.password == "admin"){
          // show the loading message
          this.loading = true;
          setTimeout(()=>{
            this.loading = false;
            
            // use vuex to store user inforamtion
            this.$store.dispatch('update_user_name',this.username);
            
            // save login status in localstorage
            localStorage.setItem('login', true);
            
            // redirect to user page
            this.$router.push('/user')
          },1000);
        } else {
            this.msg = true
        }
      }
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
