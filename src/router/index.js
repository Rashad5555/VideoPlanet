import Vue from 'vue'
import Router from 'vue-router'
import VideoPlayer from '../components/VideoPlayer'
import VideoGlav from '../components/VideoGlav'
import Login from '../components/Login'
import Registration from '../components/Registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/video-glav',
      name: 'VideoGlav',
      component: VideoGlav
    },
    {
      path: '/video-player/:videoId',
      name: 'VideoPlayer',
      component: VideoPlayer,
      props: true
    }
  ]
})
