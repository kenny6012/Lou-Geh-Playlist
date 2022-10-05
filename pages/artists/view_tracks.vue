<template>
<div class="pages__layout">
    <!-- CONTENTS -->
    <div class="pages__header">
        <div class="pages__header1">
            <div class="pages__searchBar">
                <!-- <div class="pages__searchIcon">
                    <font-awesome-icon icon="search" />
                </div>
                <input class="pages__searchInput" type="text" placeholder="Search artists here..." v-model="find"> -->
            </div>
        </div>
        <div class="pages__header2">       
            <button class="pages__logout">
                <font-awesome-icon icon="power-off" @click="logout()"/>
            </button>
        </div>
    </div>
    <div class="pages__content">
        <div class="view__layout">
            <div class="view__banner">
                <!-- {{ currentAlbum }} -->
                <img :src="link+currentArtist.artist_img" :alt="currentArtist.artist_img" class="view__bannerImg">
                <div class="view__bannerContent">
                    <div class="view__title">{{ currentArtist.artist_name }}</div>
                    <div class="view__bannerButtons">
                        <button class="view__edit" v-show="logged" @click="update_artist()">
                            <font-awesome-icon icon="user-circle"/> &ensp; Edit Artist
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="pages__body2">
           <div class="music__body music__scrollY" id="music_scroll">
                <div 
                    v-for="(track, t) in trackz" 
                    :key="'t'+t" @click="playNow(track)" 
                    :class="'music__bodyTable '+(track.track_id == playingNow.track_id ? 'music__playing':'')">
                    
                    <div class="music__head1">
                        <div class="special__div1">
                            <img :src="`${link+track.track_img}`" :alt="`${link+track.track_img}`" class="track__img" width="40px" height="40px">
                        </div>
                        <div class="special__div2">
                            <font-awesome-icon :icon="(track.track_id == playingNow.track_id && playingNow.play == true ? 'pause':'play')" />
                        </div>
                    </div>

                    <div class="music__head2">{{ track.track_name}}</div>
                    <div class="music__head3">{{ track.album_name }}</div>
                    <div class="music__head4">{{ track.artist_name }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    layout: "sidenav",
    data() {
        return {
            find: "",
            find_artist: "",
            link: this.$axios.defaults.baseURL+"/",
            logged: false,
        }
    },
    methods: {
        update_artist() {
            // console.log(track);
            this.$store.commit("update_artist", true);
        },
        logout() {
            this.$router.push('/');
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
        if(this.currentArtist == "") {
            this.$router.push('/artists');
        }
        else {
            this.find = this.currentArtist.artist_name;
        }
    },
    mounted() {
        this.$store.commit("activePages", "nav_artist");

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
                tracks: "list_tracks",
                currentArtist: "get_current_artist"
            }
        ),
        trackz() {
            return this.tracks.filter(data => {
                return (String(data.artist_name).toLowerCase().includes(this.find.toLowerCase()));
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