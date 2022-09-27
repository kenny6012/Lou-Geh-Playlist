<template>
  <div>
    <nav class="sidebar">
      <div class="sidebar__header">
        <b-img src="/bfi_full.png" class="sidebar__image" center></b-img>
        <b-img src="/bfi-org.png" class="sidebar__icon" center></b-img>
        <hr class="sidebar__line mb-0" />
      </div>

      <ul class="sidebar__list" >
        <!-- Admin Module -->
        <!--<li>
          <a
            id="admin_toggle"
            data-toggle="collapse"
            aria-expanded="false"
            class="sidebar__item"
          >
            <b-container>
              <b-row>
                <b-col cols="2">
                  <font-awesome-icon icon="user-cog" />
                </b-col>
                <b-col class="sidebar__item-name">
                  <span>Admin</span>
                </b-col>
                <b-col cols="auto" class="sidebar__item-caret">
                  <font-awesome-icon
                    :icon="visible == false ? 'caret-right' : 'caret-down'"
                  />
                </b-col>
              </b-row>
            </b-container>
          </a>

           <b-collapse id="collapse-1" class="mt-1" v-model="visible">
            <li
              style="background: #00803e"
            >
              <router-link
                id="modules"
                to="/admin/modules"
                class="sidebar__item pl-4"
              >
                <b-container>
                  <b-row>
                    <b-col cols="2">
                      <font-awesome-icon icon="envelope" />
                    </b-col>
                    <b-col>
                      <span class="sidebar__item-name">Module</span>
                    </b-col>
                  </b-row>
                </b-container>
              </router-link>
            </li>
          </b-collapse> 
        </li>-->
        <li
          style="border-radius:3px"
        >
          <router-link id="transaction" to="/music" class="sidebar__item">
            <b-container>
              <b-row>
                <b-col cols="2">
                  <font-awesome-icon icon="music" />
                </b-col>
                <b-col>
                  <span class="sidebar__item-name">Music </span>
                </b-col>
              </b-row>
            </b-container>
          </router-link>
        </li>
        <li
          style="border-radius:3px"
        >
          <router-link id="transaction" to="/playlist" class="sidebar__item">
            <b-container>
              <b-row>
                <b-col cols="2">
                  <font-awesome-icon icon="headphones" />
                </b-col>
                <b-col>
                  <span class="sidebar__item-name">Playlist </span>
                </b-col>
              </b-row>
            </b-container>
          </router-link>
        </li>
        <!-- <li
          style="border-radius:3px"
        >
          <router-link id="transaction" to="/transaction" class="sidebar__item">
            <b-container>
              <b-row>
                <b-col cols="2">
                  <font-awesome-icon icon="file-signature" />
                </b-col>
                <b-col>
                  <span class="sidebar__item-name">Transactions </span>
                </b-col>
              </b-row>
            </b-container>
          </router-link>
        </li>
        <li
          style="border-radius:3px"
        >
          <router-link id="reports" to="/reports" class="sidebar__item">
            <b-container>
              <b-row>
                <b-col cols="2">
                  <font-awesome-icon icon="book" />
                </b-col>
                <b-col>
                  <span class="sidebar__item-name">Reports </span>
                </b-col>
              </b-row>
            </b-container>
          </router-link>
        </li> -->
      </ul>
    </nav>

    <!-- Navbar -->
    <b-container fluid class="navbar">
      <b-row class="navbar__row" align-h="end" align-v="center">
        <b-col cols="auto" class="navbar__icon pr-1">
          <font-awesome-icon icon="user" />
        </b-col>

        <b-col cols="auto" class="px-0 navbar__user-detail">
          <div>
            <b> Admin</b>
          </div>
          <div>
            <b-badge variant="success" class="navbar__role">
              Admin
            </b-badge>
          </div>
        </b-col>

        <b-col cols="auto" class="pr-0">
          <b-button
            @click="$bvModal.show('logout-modal')"
            class="navbar__button"
          >
            <div class="navbar__button-icon">
              <font-awesome-icon id="logout" icon="power-off" />
            </div>
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <!-- Logout Modal -->

    <b-modal
      size="sm"
      header-bg-variant="success"
      header-text-variant="light"
      id="logout-modal"
      class="modal"
    >
      <template v-slot:modal-title>
        <h6>Confirm Log-out</h6>
      </template>
      <H6>Are you sure you want to log-out?</H6>
      <template v-slot:modal-footer="{}">
        <b-button
          id="btn-save-logout"
          size="sm"
          class="button"
          variant="success"
          @click="logout()"
          >Yes</b-button
        >

        <b-button
          id="btn-cancel-logout"
          class="button"
          size="sm"
          @click="$bvModal.hide('logout-modal')"
          variant="secondary"
          >No</b-button
        >
      </template>
    </b-modal>

    <!-- Nuxt Content -->

    <div class="nuxt">
      <nuxt :key="reload" />
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {

  data() {
    return {
      visible: false,
      reload: 0,
      user_password: null,
      showLoading: false,
      isLoadTest: false,
      role: null,
      user: null,
      activelinks: [],
      isAdmin: false,

    }
  },

  created() {
  },

  methods: {
    logout() {
      // localStorage.clear();
      this.$router.push("/");
    },

  }
};
</script>
<style scoped>
/* END */
</style>
