/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// import vform
import { Form, HasError, AlertError } from 'vform';
// import moment
import moment from 'moment';
// import sweetalert
import swal from 'sweetalert2';
window.swal = swal;
// configure toaster with swal
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
window.toast = toast;
// new vue event to use everywhere
window.Fire = new Vue();

window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

// import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// vue progressbar
import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, { // options
    color: '#bffaf3',
    failedColor: '#874b4b',
    height: '3px'
});

// capitalize fucntion for vue components
Vue.filter('capitalize', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1); // for capitalize first letter
});
// format date with required format
Vue.filter('dateFormat', function(date){
    return moment(date).format('MMMM DD, YYYY h:mm a'); // date format
});
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
*/

// 1. Define route components.
// These can be imported from other files
// const Profile = { template: '<div>foo</div>' }
// const Dashboard = { template: '<div>bar</div>' }

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const routes = [
  { path: '/home', component: require('./components/Home.vue').default },
  { path: '/dashboard', component: require('./components/Dashboard.vue').default },
  { path: '/users', component: require('./components/Users.vue').default },
  { path: '/profile', component: require('./components/Profile.vue').default }
];

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  el: '#app',
  router
});
