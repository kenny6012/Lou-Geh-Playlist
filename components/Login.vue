<template>
  <div>
    <div class="login-background">
      <Loading v-if="showLoading" />
      <b-container fluid class="login-container">
        <div>
          <b-card class="login-card mt-3">
            <b-form>
              <img class="login-card__image" src="/bfi_gradient.png" />

              <h6 class="login-card__title">
                <span>Lou Geh Playlist</span>
              </h6>

              <div class="login-card__subtitle">
                Version 1.0.2
              </div>
              <div>
                <b-form-group>
                  <div class="login-card__center">
                    <div class="login-card__inputs">
                    
                    <b-input-group-prepend class="mb-1">
                      <input
                        id="login_username"
                        class="login-card__input"
                        v-model="user.name"
                        placeholder="Username"
                        v-on:keyup.enter="focusPassword()"
                      />
                    </b-input-group-prepend>

                    <b-input-group-prepend class="mb-1">
                      <input
                        id="login_password"
                        class="login-card__input"
                        v-model="user.password"
                        placeholder="Password"
                        :type="passwordType"
                        ref="password"
                        v-on:keyup.enter="login()"
                      />
                      <span
                        @click="togglePassword()"
                        class="login-card__input-icon"
                      >
                        <font-awesome-icon :icon="icon" />
                      </span>
                    </b-input-group-prepend>


                    <button
                      id="login_button"
                      class="login-card__button"
                      @click="login()"
                      variant="success"
                      block
                      >LOGIN</button
                    >
                    <div class="login-card__subtitle">
                      &copy;&nbsp;2022 Biotech Farms Inc.
                    </div>

                    </div>
                  </div>


                </b-form-group>
                
              </div>
            </b-form>
          </b-card>
        </div>
      </b-container>
    </div>

    <div>
      <b-alert
        :show="alert.showAlert"
        dismissible
        :variant="alert.variant"
        @dismissed="alert.showAlert = null"
      >
        <font-awesome-icon
          :icon="alert.variant == 'success' ? 'check-circle' : 'exclamation'"
          class="alert-icon mr-1"
        />
        {{ alert.message }}
      </b-alert>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  layout: "loginLayout",
  data() {
    return {
      showLoading: false,

      alert: {
        showAlert: 0,
        dismissSecs: 0,
        variant: "success",
        message: ""
      },
      user: {
        name: null,
        password: null
      },

      passwordType: "password",
      icon: "eye"
    };
  },

  computed: {

  },
  methods: {
    togglePassword() {
      if (this.icon == "eye-slash") {
        this.passwordType = "password";
        this.icon = "eye";
      } else {
        this.passwordType = "text";
        this.icon = "eye-slash";
      }
    },

    focusPassword() {
      this.$refs["password"].focus();
    },
    showAlert(message, variant) {
      this.alert = {
        showAlert: 3,
        dismissSecs: 2,

        variant,
        message
      };
    },
    async login() {
      
    }
  }
};
</script>
