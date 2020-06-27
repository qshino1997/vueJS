// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    username (state,name) {
      state.username = name;
    }
  },
  actions: {
    update_user_name(store,name)
    {
      store.commit('username',name);
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>',
  created: function () {
    this.checkLogin()
  },
  methods: {
  	checkLogin() {
  		if(!localStorage.getItem('login')) {
  			this.$router.push('/login');
  		} else {
  			this.$router.push('/home');
      }

      // if user refresh the page, information stroed in vuex will lost. 
      // so we need to get user information again, based on the information stored in localstorage, 
      // in this application, I only stored a boolean value,
      // but I think in a real life applicaiton, this could be a token or id or somethig else that can be sent to server to identify a user 
      if(!this.$store.username && localStorage.getItem('login'))
      {
        // I am using a fake method.
        this.$store.dispatch('update_user_name',123);
        this.$router.push('/home');
        return;
      }

      // if everything is fine, redirect
      if(this.$store.username && localStorage.getItem('login'))
      {
        this.$router.push('/home');
        return;
      }
    }
  }
})