<template>
  <div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Введите запрос" />
    </div>
    <div class="video-list">
      <div
        @click="chooseVideo(video)"
        :key="video.id"
        v-for="video in filteredVideos"
        class="video-item"
      >
        <div class="video-thumbnail">
          <img :src="video.thumbnail" alt="Video thumbnail" />
          <div class="thumbnail-overlay">
            <p class="video-title">{{ video.title }}</p>
            <p class="video-duration">{{ video.duration }}</p>
            <p class="video-preview">Кликай и смотри ролик</p>
          </div>
        </div>
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.creator }}</p>
          <p class="video-views">{{ getViews(video) }} Views</p>
        </div>
      </div>
    </div>
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
  name: 'VideoGlav',
  data () {
    return {
      videos,
      searchQuery: '',
      loggedInUsername: '',
      showLogoutButton: false
    }
  },
  created () {
    // При создании компонента проверяем, есть ли данные пользователя в localStorage
    const userData = localStorage.getItem('userData')
    if (userData) {
      const parsedUserData = JSON.parse(userData)
      this.loggedInUsername = parsedUserData.username // Устанавливаем имя пользователя из localStorage
    }
  },
  computed: {
    filteredVideos () {
      return this.videos.filter((video) => {
        const titleMatch = video.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
        const creatorMatch = video.creator
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
        return titleMatch || creatorMatch
      })
    }
  },
  methods: {
    chooseVideo (video) {
      // Проверяем, было ли уже увеличение просмотров для этого видео
      const viewed = localStorage.getItem(`viewed_${video.id}`)
      if (!viewed) {
        video.views = parseInt(localStorage.getItem(`views_${video.id}`)) || 0
        video.views += 1
        localStorage.setItem(`views_${video.id}`, video.views)
        // Устанавливаем флаг, чтобы избежать повторного увеличения просмотров
        localStorage.setItem(`viewed_${video.id}`, 'true')
      }
      localStorage.setItem('selectedVideoId', video.id)
      this.$router.push({ name: 'VideoPlayer', params: { videoId: video.id } })
    },
    search () {},
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
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.search-bar input {
  padding: 10px;
  width: 400px;
  border-radius: 20px; /* Закругляем углы поля ввода */
}

.search-bar button {
  padding: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 20px; /* Добавляем отступы слева и справа */
}

.video-item {
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.video-item:hover {
  transform: translateY(-5px);
}

.video-thumbnail {
  position: relative;
}

.video-thumbnail img {
  width: 100%;
  height: auto;
}

.thumbnail-overlay {
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

.video-item:hover .thumbnail-overlay {
  opacity: 1;
}

.video-title,
.video-duration,
.video-preview {
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.video-duration {
  font-size: 14px;
  margin-top: 5px;
}

.video-preview {
  font-size: 14px;
  margin-top: 5px;
}
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
</style>
