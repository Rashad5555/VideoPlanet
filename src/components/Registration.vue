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
              placeholder="Придумайте имя (только кириллица, не менее трех)"
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
              placeholder="Придумайте пароль (не менее четырех символов)"
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
          <button
            class="button"
            id="order-action"
            @click="validateRegisterForm"
          >
            Зарегистрироваться
          </button>
        </div>
        <button class="button_register" @click="goToLogin">Назад</button>
        <div class="error-message" v-if="errorMessage !== ''">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Registration',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: '',
      storedUserData: null
    }
  },
  computed: {
    isNameValid () {
      // Проверяем, что имя содержит только кириллические буквы и не менее трех символов
      return /^[а-яёА-ЯЁ]{3,}$/.test(this.username)
    },
    isPasswordValid () {
      // Проверяем, что поле пароля содержит не менее трех символов
      return this.password.trim().length >= 4
    },
    isInvalid () {
      // Возвращает true, если имя не соответствует правилам или поле пароля пустое
      return !this.isNameValid || !this.isPasswordValid
    }
  },
  methods: {
    goToLogin () {
      this.$router.push('/login')
    },
    validateRegisterForm () {
      if (!this.username.trim()) {
        this.errorMessage = 'Введите имя'
        return
      }
      if (!this.password.trim()) {
        this.errorMessage = 'Введите пароль'
        return
      }
      // Проверка успешного ввода данных
      if (!this.isNameValid) {
        this.errorMessage =
          'Имя должно содержать только кириллические буквы и не менее трех символов'
        return
      }
      if (!this.isPasswordValid) {
        this.errorMessage = 'Пароль должен содержать не менее четырех символов'
        return
      }

      // Сохраняем данные пользователя в localStorage
      this.saveUserData()

      // Перенаправляем пользователя на страницу входа
      this.$router.push('/login')
    },
    toggleErrorMessage () {
      this.errorMessage = ''
    },
    saveUserData () {
      const userData = {
        username: this.username,
        password: this.password
      }
      localStorage.setItem('userData', JSON.stringify(userData))
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
  border-color: red; /* Красная рамка вокруг формы при неверном вводе имени */
}

.invalid-input input {
  background-color: #ffcdd2; /* Красный фон поля ввода имени при неверном вводе */
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
