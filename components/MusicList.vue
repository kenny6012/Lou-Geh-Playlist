<template>
<div class="pages__layout">
    <!-- ADD BUTTON -->
    <button class="pages__add" @click="add_music()" v-show="logged">
        <font-awesome-icon icon="plus" />
    </button>

    <!-- CONTENTS -->
    <div class="pages__header">
        <div class="pages__header1">
            <div class="pages__searchBar">
                <div class="pages__searchIcon">
                    <font-awesome-icon icon="search" />
                </div>
                <input class="pages__searchInput" type="text" placeholder="Search tracks here..." v-model="find">
            </div>
        </div>
        <div class="pages__header2">       
            <button class="pages__logout">
                <font-awesome-icon icon="power-off" @click="logout()"/>
            </button>
        </div>
    </div>
    <div class="pages__content">
        <div class="music__header">
            <div class="music__head1"></div>
            <div class="music__head2">Title</div>
            <div class="music__head3">Album</div>
            <div class="music__head4">Artist</div>
        </div>
        <div class="music__body music__scrollY" id="music_scroll">
            <div 
                v-for="(track, t) in trackz" 
                :key="'t'+t" @click="playNow(track)" 
                :class="'music__bodyTable '+(track.track_id == playingNow.track_id ? 'music__playing':'')">
                
                <div class="music__head1">
                    <div class="special__div1">
                        <!-- <div 
                            :style="'background-image: url'+link+'/'+track.track_img+')'" 
                            class="track__img">
                        </div> -->
                        <img :src="`${link}/${track.track_img}`" :alt="`${link}/${track.track_img}`" class="track__img" width="40px" height="40px">
                    </div>
                    <div class="special__div2">
                        <font-awesome-icon :icon="(track.track_id == playingNow.track_id && playingNow.play == true ? 'pause':'play')" />
                    </div>
                </div>

                <div class="music__head2">{{ track.track_name}}</div>
                <div class="music__head3">{{ track.album_name }}</div>
                <!-- <div class="music__head4">{{ link+'/'+track.track_img }}</div> -->
                <div class="music__head4">{{ track.artist_name }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            find: "",
            find_album: "",
            link: this.$axios.defaults.baseURL,
            logged: false,
            
        }
    },
    methods: {
        logout() {
            this.$router.push('/');
        },
        add_music() {
            this.$store.commit("open_modal_addTrack", true);
        },
        playNow(track) {
            if(track != "") {
                if(track.track_mp3 != "") {
                    this.$store.commit("setToPlay", track);
                    this.$store.commit("autoplay", true);
                }
            }
        }
    },
    created() {

    },
    mounted() {
        this.$store.commit("activePages", "nav_music");

        if(localStorage.token[0]) {
            // console.log("NOT EMPTY");
            this.logged = true;
        }
        else {
            // console.log("Empty");
            this.logged = false;
        }
    },
    computed: {
        ...mapGetters(
            { 
                albums: "list_album",
                artists: "list_artist",
                tracks: "list_tracks"
            }
        ),
        trackz() {
            return this.tracks.filter(data => {
                return (
                String(data.artist)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.track_name)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.track_img)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.album_name)
                    .toLowerCase()
                    .includes(this.find.toLowerCase())
                );
            });
        },
        playingNow() {
            return this.$store.state.playing;
        }
    }
    
}
</script>

<style>

</style>