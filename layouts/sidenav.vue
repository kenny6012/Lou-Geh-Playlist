<template>
<div class="sidenav__layout">
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

export default {
    components: {
        Player
    },
    data() {
        return {
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
                {
                    id: "nav_admin",
                    nav: "Admin Panel",
                    icon: "cog",
                    route: "../admin"
                },
            ]
        }
    },
    methods: {
        navigate(page) {
            this.$store.commit("activePages", page.id);
            this.$router.push({ path: page.route });
        }
    },
    computed: {
        ...mapGetters({ activeNav: "active" }),
        test() {
            return this.$store.state.activePage;
        }
    }
}
</script>

<style>

</style>