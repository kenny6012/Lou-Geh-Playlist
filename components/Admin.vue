<template>
<div class="pages__layout">
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
        <div class="play__layout">
            <div class="play__header">
                <div class="play__header1">
                    Most Played
                </div>
                <div class="play__header2">
                    <input class="play__buttons" type="button" value="Generate Report">
                    <input class="play__buttons" type="button" value="Add Artist">
                    <input class="play__buttons" type="button" value="Add Album">
                    <input class="play__buttons" type="button" value="Add Track" @click="add_music()">
                </div>
            </div>
            <div class="play__topTrack">
                <div class="play__top" v-show="showTopTrack && !find" @click="update_track(topTrack)">
                    <div class="play__track1">
                        <img :src="`${link}/${topTrack.track_img}`" :alt="`${link}/${topTrack.track_img}`" class="play__topImg" width="65px" height="65px">
                        <div class="play__trackInfo">
                            <div class="play__topTitle">{{ topTrack.track_name }}</div>
                            <div class="play__topSub">{{ `${topTrack.artist_name} | ${topTrack.album_name}` }}</div>
                        </div>
                    </div>
                    <div class="play__track2">
                        <div class="play__trackInfo">
                            <div class="play__topTitle">{{ topTrack.numberofplays }}</div>
                            <div class="play__topSub">Plays</div>
                        </div>
                    </div>
                    <div class="play__track3">
                        <div class="play__trackInfo">
                            <div class="play__topTitle">{{ secondsToMinutes(topTrack.track_length) }}</div>
                            <div class="play__topSub">Duration</div>
                        </div>
                    </div>
                    <div class="play__track4">
                        <div class="play__trackInfo">
                            <div class="play__topTitle">{{ dateFormat(topTrack.lastplayed) }}</div>
                            <div class="play__topSub">Last Played</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="play__scroll">
                <div class="play__tracks">

                    <div class="play__tracksContainer" 
                        v-for="(track, t) in trackz" 
                        :key="'t'+t" 
                        v-show="track.track_id != trackz[0].track_id"
                        @click="update_track(track)">

                        <div class="play__track1">
                            <!-- <div class="play__img" :style="`background-image: url(${ track.cover })`"></div> -->
                            <img :src="`${link}/${track.track_img}`" :alt="`${link}/${track.track_img}`" class="play__img" width="40px" height="40px">
                            <div class="play__trackInfo">
                                <div class="play__title play__titleX">{{ track.track_name }}</div>
                                <div class="play__sub">{{ `${track.artist_name} | ${track.album_name}` }}</div>
                            </div>
                        </div>
                        <div class="play__track2">
                            <div class="play__trackInfo">
                                <div class="play__title">{{ track.numberofplays }}</div>
                                <div class="play__sub">Plays</div>
                            </div>
                        </div>
                        <div class="play__track3">
                            <div class="play__trackInfo">
                                <div class="play__title">{{ secondsToMinutes(track.track_length) }}</div>
                                <div class="play__sub">Duration</div>
                            </div>
                        </div>
                        <div class="play__track4">
                            <div class="play__trackInfo">
                                <!-- <div class="play__title">{{ track.lastPlayed }}</div> -->
                                <div class="play__title">{{ (track.lastplayed != null ? dateFormat(track.lastplayed):'Not Played Yet') }}</div>
                                <div class="play__sub">Last Played</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
    data() {
        return {
            find: "",
            link: this.$axios.defaults.baseURL,
            topTrack: {},
            showTopTrack: false,
        }
    },
    watch: {
        trackz() {
            this.showTopTrack = true;
            this.topTrack = this.$store.state.list_tracks_reports[0];
        },
        openTab() {
            this.getTopTRack();
        }
    },
    created() {
        this.getTopTRack();
    },
    methods: {
        secondsToMinutes(sec) {
            return moment.utc(sec * 1000).format("mm:ss");
        },
        dateFormat(date) {
            if(date === null || date == null) {
                return "Not PLayed Yet"
            }
            else {
                return moment(date).format("MMMM DD, YYYY");
            }
        },
        add_music() {
            this.$store.commit("open_modal_addTrack", true);
        },
        update_track(track) {
            // console.log(track);
            this.$store.commit("update_track", true);
            this.$store.commit("track_updater", track);
        },
        getTopTRack() {
            var getTopTrack = setInterval(() => {
                var temp = this.$store.state.list_tracks_reports[0];
                if(temp) {
                    this.showTopTrack = true;
                    this.topTrack = temp;
                    clearInterval(getTopTrack);
                    // console.log("testss");
                }
            }, 1);
        },
        logout() {
            this.$router.push('/');
        },
    },
    mounted() {
        this.$store.commit("activePages", "nav_admin");
    },
    computed: {
        openTab() {
            return this.$store.state.activePages;
        },
        tracks() {
            return this.$store.state.list_tracks_reports;
        },
        trackz() {
            return this.tracks.filter(data => {
                return (
                String(data.artist_name)
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
    }
    
}
</script>

<style>

</style>