<template>
  <section class="order" id="order">
    <div class="container">
      <div class="order-form" :class="{ invalid: isInvalid }">
        <div class="order-form-inputs">
          <div
            class="order-form-input"
            :class="{ 'invalid-input': !isNameValid }"
          >
            <input
              type="text"
              placeholder="Введите имя (только кириллица, не менее трех)"
              v-model="username"
              @focus="clearInput('username')"
            />
          </div>
          <div
            class="order-form-input"
            :class="{ 'invalid-input': !isPasswordValid }"
          >
            <input
              type="password"
              placeholder="Введите пароль (не менее четырех символов)"
              v-model="password"
              @focus="clearInput('password')"
            />
          </div>
          <div
            class="error-info"
            v-if="errorMessage !== ''"
            @click="toggleErrorMessage"
          >
            <i class="fa fa-info-circle"></i>
          </div>
          <button class="button" id="order-action" @click="validateLoginForm">
            Войти
          </button>
        </div>
        <button class="button_register" @click="goToRegistration">
          Зарегистрироваться
        </button>
        <div class="error-message" v-if="errorMessage !== ''">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: '',
      storedUserData: null
    }
  },
  mounted () {
    this.storedUserData = JSON.parse(localStorage.getItem('userData'))
  },
  computed: {
    isNameValid () {
      return /^[а-яёА-ЯЁ]{3,}$/.test(this.username)
    },
    isPasswordValid () {
      return this.password.trim().length >= 4
    },
    isInvalid () {
      return !this.isNameValid || !this.isPasswordValid
    }
  },
  methods: {
    goToRegistration () {
      this.$router.push('/registration')
    },
    validateLoginForm () {
      if (this.isCredentialsValid()) {
        this.$router.push('/video-glav')
      } else {
        this.errorMessage = 'Неправильное имя пользователя или пароль'
      }
    },
    toggleErrorMessage () {
      this.errorMessage = ''
    },
    isCredentialsValid () {
      return (
        this.storedUserData &&
        this.storedUserData.username === this.username &&
        this.storedUserData.password === this.password
      )
    },
    clearInput (field) {
      this[field] = ''
    }
  }
}
</script>

<style scoped>
.order {
  display: flex;
  justify-content: center;
}

.order-form {
  border-radius: 16px;
  border: 1px solid #353535;
  background: linear-gradient(180deg, #c1e4ff 0%, #b0d7f3 50%, #6dbb6a 100%);
  margin-top: 60px;
  width: 426px;
  padding: 60px 40px;
  box-sizing: border-box;
}

.order-form-input {
  width: 100%;
  height: 62px;
  background: linear-gradient(95.61deg, #c1e4ff 0%, #b0d7f3 100%);
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-form-input input {
  padding: 16px 10px;
  border-radius: 8px;
  color: black;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid transparent;
}

.order-form-inputs .button,
.button_register {
  margin-top: 20px;
  width: 100%;
  height: 60px;
  background: linear-gradient(95.61deg, #3d85c6 0%, #6dbb6a 100%);
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
}

.button_register {
  background: linear-gradient(95.61deg, #d1a68c 0%, #353535 100%);
}
.order-form.invalid {
  border-color: red;
}

.invalid-input input {
  background-color: #ffcdd2;
}
.error-info {
  cursor: pointer;
}

.error-message {
  color: red;
}

@media (max-width: 425px){
  .order-form {
    max-width: 350px;
  }
}

@media (max-width: 375px){
  .order-form {
    max-width: 300px;
  }
}
</style>
