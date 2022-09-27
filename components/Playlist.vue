<template>
  <b-container fluid class="px-0">
    <!-- Header -->
    <h1>Playlist</h1>
    <div>
      <b-row>
        <!-- Search -->
        <b-col cols="12" class="my-1">
          <b-button v-b-modal.add-modal class="mb-2" variant="success"
            ><font-awesome-icon icon="add" /> Add Playlist</b-button
          >
        </b-col>
        <!-- Cards -->
        <b-col>
          <div class="wrapper">
            <div class="card-container">
              <div
               @click="goToPlaylist(list)"
                class="music-card"
                v-for="(list, index) in playlist"
                :key="index"
              >
                <img src="/music_logo.png" />
                <h4>{{ list.title }}</h4>
                <p>
                  {{ list.desc }}
                </p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- Modal Add Playlist -->
    <b-modal
      title="Add Playlist"
      header-bg-variant="success"
      header-text-variant="light"
      no-close-on-backdrop
      id="add-modal"
      ><b-row>
        <b-col cols="12">
          <label for="">Playlist name:</label>
          <b-form-input v-model="playlist_name"></b-form-input>
        </b-col>
        <b-col cols="12">
          <label for="">Description:</label>
          <b-form-input v-model="description"></b-form-input>
        </b-col>
      </b-row>
      <template #modal-footer class="modal-footer">
        <div class="text-right mt-3">
          <b-button size="sm" @click="closeModal()">Cancel</b-button>
          <b-button size="sm" variant="success" @click="addPlaylist()"
            >Add</b-button
          >
        </div>
      </template></b-modal
    >
  </b-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      playlist: [
        {
          title: "Monday",
          desc: "Monday Mood",
        },
        {
          title: "Tuesday",
          desc: "Tuesday Mood",
        },
      ],
      playlist_name: null,
      description: null,
      filter: null,
    };
  },

  mounted() {},

  computed: {},

  methods: {
    addPlaylist() {
      const add = {
        title: this.playlist_name,
        desc: this.description,
      };
      this.playlist.push(add);
      this.$bvModal.hide("add-modal");
    },
    closeModal() {
      (this.playlist_name = null), (this.description = null);
      this.$bvModal.hide("add-modal");
    },
    goToPlaylist(row) {
      this.$router.push(`/playlist/${row.title}`); 
    }
  },

  beforeDestroy() {},

  created() {},
  async beforeCreate() {},
};
</script>
``
<style>
</style>
