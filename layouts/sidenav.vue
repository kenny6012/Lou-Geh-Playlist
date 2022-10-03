<template>
<div class="sidenav__layout">
    <AddTrack v-show="add_track"/>
    <AddArtist v-show="add_artist"/>
    <AddAlbum v-show="add_album"/>
    <div class="sidenav__body">
        <div class="sidenav__bar">
            <div class="sidenav__logo">
                <div class="sidenav__img"></div> &ensp; Lou Geh Playlist
            </div>
            <div class="sidenav__navigation">
                <div 
                    v-for="(nav, n) in navigation" 
                    :key="'n'+n" :id="nav.id" 
                    :class="`sidenav__nav ` + (nav.id === activeNav ? `sidenav__active`:``)"
                    @click="navigate(nav)"
                >

                    <div class="nav__icon">
                        <font-awesome-icon :icon="nav.icon" />
                    </div>
                    <div class="nav__text">{{ nav.nav }}</div>

                </div>
            </div>
        </div>
        <div class="sidenav__content">
            <Nuxt />
        </div>
    </div>
    <div class="sidenav__footer">
        <Player />
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "~/components/player.vue";
import AddTrack from "~/components/modal/add_track.vue";
import AddArtist from "~/components/modal/add_artist.vue";
import AddAlbum from "~/components/modal/add_album.vue";

export default {
    components: {
        Player,
        AddTrack,
        AddArtist,
        AddAlbum,
    },
    data() {
        return {
            logged: false,
            navigation2: [
                {
                    id: "nav_music",
                    nav: "Music",
                    icon: "music",
                    route: "../musiclist"
                },
                {
                    id: "nav_album",
                    nav: "Albums",
                    icon: "compact-disc",
                    route: "../albums"
                },
                {
                    id: "nav_artist",
                    nav: "Artists",
                    icon: "user-circle",
                    route: "../artists"
                },
                {
                    id: "nav_admin",
                    nav: "Admin Panel",
                    icon: "cog",
                    route: "../admin"
                },
            ],
            navigation: [
                {
                    id: "nav_music",
                    nav: "Music",
                    icon: "music",
                    route: "../musiclist"
                },
                {
                    id: "nav_album",
                    nav: "Albums",
                    icon: "compact-disc",
                    route: "../albums"
                },
                {
                    id: "nav_artist",
                    nav: "Artists",
                    icon: "user-circle",
                    route: "../artists"
                },
            ],
        }
    },
    created() {
        this.$store.dispatch("getArtitist");
        this.$store.dispatch("getAlbums");
        this.$store.dispatch("getTracks");
    },
    mounted() {
        if(localStorage.token[0]) {
            // console.log("NOT EMPTY");
            this.logged = true;
            this.navigation = this.navigation2;
        }
        else {
            // console.log("Empty");
            this.logged = false;
        }
    },
    watch: {
        
    },
    methods: {
        navigate(page) {
            this.$store.commit("activePages", page.id);
            this.$router.push({ path: page.route });
        }
    },
    computed: {
        ...mapGetters(
            { 
                activeNav: "active",
                add_track: "open_add_track",
                add_artist: "open_add_artist",
                add_album: "open_add_album",

                tracks: "list_tracks"
            }
        ),
        test() {
            return this.$store.state.activePage;
        }
    }
}
</script>

<style>

</style>