<template>
  <div>
    <div class="login-background">
      <!-- <Loading v-if="showLoading" /> -->
      <b-container fluid class="login-container">
        <div>
          <b-card class="login-card mt-3">
            <div>
              <img class="login-card__image" src="/bfi_gradient.png" />

              <h6 class="login-card__title">
                <span>Lou Geh Playlist</span>
              </h6>

              <div class="login-card__subtitle">
                Version 1.0.2
              </div>
              <div>
                <div>
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
                      id=""
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


                </div>
                
              </div>
            </div>
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
import axios from "axios";

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
  mounted() {
    localStorage.token = "";
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
    login() {
      // this.$router.push({ path: "/musiclist" });
      axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/api/login`,
            headers: {"Access-Control-Allow-Origin": "*"},
            data: {
              username: this.user.name,
              password: this.user.password
            }
        }).then(res => {
            if(res.data.token != "" || res.data.token != undefined) {
              this.$router.push({ path: "/musiclist" });
              localStorage.token = res.data.token;
              this.showAlert(
                "Login: Success",
                "success"
              );
            }
        }).catch(error => {
          this.showAlert(
            "Login: Failed",
            "success"
          );
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
.alert {
  position: fixed;
  bottom: 5%;
  right: 5%;
  z-index: 10000;
  animation: fadein 0.4s;
}
.alert svg path {
  color: white;
}
.alert-danger {
  color: #fff;
  background-color: red;
  border-color: transparent;
}
.alert-success {
  color: white;
  background-color: green;
  border-color: transparent;
}
@keyframes fadein {
  0% {
    opacity: 0%;
    bottom: 1%;
    right: 5%;
  }
  50% {
    opacity: 50%;
  }
  100% {
    opacity: 1000%;
    bottom: 5%;
    right: 5%;
  }
}
</style>
