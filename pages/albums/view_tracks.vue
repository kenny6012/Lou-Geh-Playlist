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
                <img :src="link+currentAlbum.album_img" :alt="currentAlbum.album_img" class="view__bannerImg">
                <div class="view__bannerContent">
                    <div class="view__title">{{ currentAlbum.album_name }}</div>
                    <div class="view__sub">{{ currentAlbum.artist_name }}</div>
                    <div class="view__bannerButtons">
                        <button class="view__edit" v-show="logged" @click="update_album()">
                            <font-awesome-icon icon="pen"/> &ensp; Edit Album
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
            find_album: "",
            link: this.$axios.defaults.baseURL+"/",
            logged: false,
        }
    },
    methods: {
        update_album() {
            // console.log(track);
            this.$store.commit("update_album", true);
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
        if(this.currentAlbum == "") {
            this.$router.push('/albums');
        }
        else {
            this.find = this.currentAlbum.album_name;
        }
    },
    mounted() {
        this.$store.commit("activePages", "nav_album");

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
                currentAlbum: "get_current_album"
            }
        ),
        trackz() {
            return this.tracks.filter(data => {
                return (String(data.album_name).toLowerCase().includes(this.find.toLowerCase()));
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