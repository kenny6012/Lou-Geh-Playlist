<template>
  <b-container fluid class="px-0">
    <!-- Header -->
    <h1>Music</h1>
    <div>
      <b-row>
        <!-- Search -->
        <b-col cols="12" class="my-1">
          <b-form-group>
            <b-input-group>
              <b-form-input
                block
                v-model="filter"
                type="search"
                id="search_pending_transc"
                placeholder="Search Music"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!-- Cards -->
        <b-col>
          <div class="wrapper">
            <div class="card-container">
              <b-button
                style="border: none"
                class="music-card"
                v-for="(song, index) in songs"
                :key="index"
                @click="play(song)"
                :class="song.src == current.src ? 'song playing' : 'song'"
              >
                <img :src="song.image" />
                <h4>{{ song.title }}</h4>
                <p>
                  {{ song.artist }}
                </p>
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- Footer Music Player -->
    <div id="cs_audioplayer">
      <span id="cs_play_pause_btn" style="position: relative">
        {{ current.title }} - {{ current.artist }}
        <b-button class="play" v-if="!isPlaying" @click="play">
          <font-awesome-icon icon="play" />
        </b-button>
        <b-button class="pause" v-else @click="pause">
          <font-awesome-icon icon="pause" />
        </b-button>
      </span>

    </div> 
  </b-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          title: "Dua Lipa",
          artist: "The Weekend",
          image:
            "https://3.bp.blogspot.com/-cvF9UEYgmkc/V37qCNZQwLI/AAAAAAAAAbY/3Vrvqlv9tvkwpfB4f-qiq-ZuD5PsBKawQCLcB/s1600/DL%2B-%2BDL.png",
          src: "/neffex-grateful.mp3",
        },
        {
          title: "Baby",
          artist: "Justin Bieber",
          image:
            "https://www.justinbiebermusic.com/sites/g/files/aaj14521/f/styles/suzuki_breakpoints_image_mobile-md_sq/public/release/202102/WEB-%26-SOCIAL_JB_JUSTICE_ALBUM_08.jpg?itok=_kbKwkv3",
          src: "/neffex-grateful.mp3",
        },
        {
          title: "Talk that talk",
          artist: "Twice",
          image: "https://www.kpopscene.com/wp-content/uploads/twice-kpop.jpg",
          src: "/neffex-grateful.mp3",
        },
        {
          title: "Thunderous",
          artist: "Stray Kids",
          image:
            "https://assets.teenvogue.com/photos/612f8bf4e8c260b3d41cc82c/master/pass/Stray%20Kids%20(1).jpg",
          src: "/neffex-grateful.mp3",
        },
      ],
      filter: null,
      player: [],
    };
  },

  mounted() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  },

  computed: {},

  methods: {
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
  },

  beforeDestroy() {},

  created() {},
  async beforeCreate() {},
};
</script>
``
<style>
</style>
