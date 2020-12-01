// import Vue from 'vue';
// import App from './App.vue';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

// Vue.config.productionTip = false
// Vue.prototype.$EventBus = new Vue();

// Vue.use(Antd);

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


// // 阻止双击放大
// let lastTouchEnd = 0;

// document.addEventListener('touchstart', function (event) {
//   if (event.touches.length > 1) {
//     event.preventDefault();
//   }
// });
// document.addEventListener('touchend', function (event) {
//   const now = (new Date()).getTime();

//   if (now - lastTouchEnd <= 300) {
//     event.preventDefault();
//   }
//   lastTouchEnd = now;
// }, false);

// // 阻止双指放大
// document.addEventListener('gesturestart', function (event) {
//   event.preventDefault();
// });