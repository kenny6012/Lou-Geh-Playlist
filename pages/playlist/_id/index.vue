<template>
  <b-card class="c-card">
    <div class="header">
      <h3>{{ playlist_name }}</h3>
    </div>
    <div class="main">
      <b-row>
        <b-col cols="6" class="playlist">
          <div>
            <b-card>
              <b-button v-b-modal.add-modal class="mb-2" variant="success"
                ><font-awesome-icon icon="add" /> Add Song</b-button
              >
              <b-row v-for="(song, index) in songs" :key="index"
                ><b-col cols="11">
                  <button
                    @click="play(song)"
                    :class="song.src == current.src ? 'song playing' : 'song'"
                  >
                    {{ song.title }} - {{ song.artist }}
                  </button>
                </b-col>
                <b-col cols="1"
                  ><b-button
                    id="remove-song"
                    @click="removeSong(song)"
                    class="buttonRemove"
                  >
                    <font-awesome-icon style="color: white" icon="trash" />
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
        <br />
        <b-col>
          <b-card class="music_player">
            <div class="player">
              <h2 class="song-title">
                {{ current.title }} - <span>{{ current.artist }}</span>
              </h2>
              <div class="controls">
                <button class="prev" @click="prev">
                  <font-awesome-icon icon="caret-left" />
                </button>
                <button class="play" v-if="!isPlaying" @click="play">
                  <font-awesome-icon icon="play" />
                </button>
                <button class="pause" v-else @click="pause">
                  <font-awesome-icon icon="pause" />
                </button>
                <button class="next" @click="next">
                  <font-awesome-icon icon="caret-right" />
                </button>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <!-- Modal for selecting music -->
    <b-modal
      title="Add Song"
      header-bg-variant="success"
      header-text-variant="light"
      no-close-on-backdrop
      size="lg"
      id="add-modal"
      ><b-row>
        <b-col cols="12">
          <b-table
            selectable
            hover
            show-empty
            :items="items"
            :fields="fields"
            @row-selected="selectSong"
            selected-variant="success"
          ></b-table>
        </b-col>
      </b-row>
      <template #modal-footer class="modal-footer">
        <div class="text-right mt-3">
          <b-button size="sm" @click="closeModal()">Cancel</b-button>
          <b-button size="sm" variant="success" @click="addSong()"
            >Add</b-button
          >
        </div>
      </template></b-modal
    >
  </b-card>
</template>

<script>
export default {
  name: "app",
  layout: "Sidebar",
  data() {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          title: "Grateful",
          artist: "Neffex",
          src: "/neffex-grateful.mp3",
        },
        {
          title: "Invincible",
          artist: "Deaf Kev",
          src: "/deaf-kev-invincible.mp3",
        },
        {
          title: "Stay",
          artist: "The Kid Laroi",
          src: "/Stay.mp3",
        },
      ],
      player: [],
      playlist_name: null,
      fields: ["artist", "song"],
      items: [
        {
          artist: "Troye Sivan",
          song: "Angel Baby",
        },
        {
          artist: "Boyce Avenue",
          song: "Counting Stars",
        },
      ],
      songAdd: [],
    };
  },
  created() {
    // Get playlist name from params
    this.playlist_name = this.$route.params.id;
  },
  mounted() {
    // Update when clicking play/pause
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  },
  methods: {
    selectSong(row) {
      for (let i = 0; i < row.length; i++) {
        const element = row[i];

        this.songAdd = {
          artist: element.artist,
          title: element.song,
          src: "/snake.mp3",
        };
      }
    },
    addSong() {
      this.songs.push(this.songAdd);
      this.$bvModal.hide("add-modal");
    },
    closeModal() {
      (this.playlist_name = null), (this.description = null);
      this.$bvModal.hide("add-modal");
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    removeSong(song) {
      var index = this.songs.indexOf(song);
      this.songs.splice(index, 1);
    },
    play(song) {
      if (typeof song.src != "undefined") {
        this.current = song;

        this.player.src = this.current.src;
      }
      this.player = new Audio(this.player.src);
      this.player.play();
      this.player.addEventListener(
        "ended",
        function () {
          this.index++;
          if (this.index > this.songs.length - 1) {
            this.index = 0;
          }

          this.current = this.songs[this.index];
          this.play(this.current);
        }.bind(this)
      );
      this.isPlaying = true;
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    next() {
      this.index++;
      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },
  },
};
</script>

<style>
</style>
