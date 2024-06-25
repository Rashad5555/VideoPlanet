<template>
  <div class="video-player">
    <div class="video-container">
      <iframe
        :src="activeVideo.youtubeURL"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      >
      </iframe>
      <h3>{{ activeVideo.title }}</h3>
      <p>{{ activeVideo.creator }}</p>
      <div class="row">
        <p>{{ getViews(activeVideo) }} views</p>
        <p>{{ activeVideo.likes }} <button @click="addLike">Like</button></p>
      </div>
    </div>
    <div class="video-list">
      <div
        @click="chooseVideo(video)"
        :key="video.id"
        v-for="video in videos"
        class="thumbnail"
      >
        <div class="thumbnail-img">
          <img :src="video.thumbnail" />
          <div class="thumbnail-preview">
            <p class="thumbnail-preview-text">{{ video.title }}</p>
            <p class="video-preview">Кликай и смотри ролик</p>
          </div>
        </div>
        <div class="thumbnail-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.creator }}</p>
          <p class="thumbnail-views">{{ getViews(video) }} Views</p>
        </div>
      </div>
    </div>
    <!-- Добавленный блок кода -->
    <div class="user-info" @click="toggleLogoutButton">
      <p>{{ loggedInUsername }}</p>
      <button class="vyiti" v-show="showLogoutButton" @click="logout">
        Выйти
      </button>
    </div>
  </div>
</template>

<script>
import videos from '../base/videos.json'

export default {
  name: 'VideoPlayer',
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      videos,
      activeVideo: null,
      showLogoutButton: false,
      loggedInUsername: ''
    }
  },
  created () {
    const selectedVideoId = localStorage.getItem('selectedVideoId')
    this.activeVideo = this.videos.find(
      (video) => String(video.id) === selectedVideoId
    )
    if (this.activeVideo) {
      this.activeVideo.likes =
        parseInt(localStorage.getItem(`likes_${selectedVideoId}`)) ||
        this.activeVideo.likes
    }
    const userData = localStorage.getItem('userData')
    if (userData) {
      const parsedUserData = JSON.parse(userData)
      this.loggedInUsername = parsedUserData.username // Устанавливаем имя пользователя из localStorage
    }
  },
  methods: {
    chooseVideo (video) {
      // SET VIDEO AS ACTIVE VIDEO
      this.activeVideo = video
      // INCREASE THE VIDEOS VIEWS BY 1
      video.views =
        (parseInt(localStorage.getItem(`views_${video.id}`)) || 0) + 1
      localStorage.setItem('selectedVideoId', video.id)
      localStorage.setItem(`views_${video.id}`, video.views)
    },
    addLike () {
      this.activeVideo.likes += 1
      localStorage.setItem(
        `likes_${this.activeVideo.id}`,
        this.activeVideo.likes
      )
    },
    getViews (video) {
      return localStorage.getItem(`views_${video.id}`) || 0
    },
    logout () {
      // Перенаправляем пользователя на страницу авторизации
      this.$router.push('/login')
    },
    toggleLogoutButton () {
      this.showLogoutButton = !this.showLogoutButton
    }
  },
  beforeDestroy () {
    // Обновляем данные о просмотрах перед уходом с текущей страницы
    localStorage.setItem(
      `views_${this.activeVideo.id}`,
      (parseInt(localStorage.getItem(`views_${this.activeVideo.id}`)) || 0) + 1
    )
  }
}
</script>

<style scoped>
.thumbnail {
  display: flex;
  cursor: pointer;
  position: relative;
}

.thumbnail img {
  width: 168px;
  border-radius: 8px;
}

.thumbnail-info {
  margin-left: 20px;
}

.thumbnail h3 {
  font-size: 16px;
}

h3,
p {
  margin: 0;
  padding: 0;
}

h3 {
  color: #000000;
  font-size: 24px;
  margin-bottom: 15px;
  margin-top: 15px;
}

.thumbnail-views {
  font-size: 14px;
}

.video-player {
  display: flex;
  margin-left: 40px;
  margin-right: 40px;
}

.video-container {
  margin-right: 40px;
}

.video-container iframe {
  width: 1140px;
  height: 560px;
  border-radius: 8px;
}

.row {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

button {
  background: #d0021b;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.thumbnail-img {
  position: relative;
}

.thumbnail-preview {
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.thumbnail:hover .thumbnail-preview {
  opacity: 1;
}

.thumbnail-preview-text {
  color: white;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
}
.video-preview {
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}
/* Добавленные стили */
.user-info {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.vyiti {
  margin-top: 10px;
  border: 1px solid red;
  width: 100%;
  height: 40px;
  background: white;
  border-radius: 8px;
  color: red;
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .video-container {
    margin-right: 0;
  }

  .video-container iframe {
    max-width: 930px;
  }

  .video-player {
    flex-direction: column;
  }

  .row {
    margin-bottom: 20px;
  }
}

@media (max-width: 950px) {
  .video-container iframe {
    max-width: 830px;
  }
}

@media (max-width: 768px) {
  .video-container iframe {
    max-width: 650px;
    max-height: 450px;
  }
}

@media (max-width: 650px) {
  .video-container iframe {
    max-width: 500px;
    max-height: 350px;
  }
}

@media (max-width: 425px) {
  .video-container iframe {
    max-width: 330px;
    max-height: 250px;
  }
}

@media (max-width: 375px) {
  .video-container iframe {
    max-width: 300px;
    max-height: 200px;
  }
}

@media (max-width: 375px) {
  .video-container iframe {
    max-width: 280px;
    max-height: 180px;
  }
}

</style>
