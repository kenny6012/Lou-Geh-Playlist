<template>
<div class="pages__layout">
    <!-- ADD BUTTON -->
    <button class="pages__add" @click="add_artist()">
        <font-awesome-icon icon="plus" />
    </button>

    <!-- CONTENTS -->
    <div class="pages__header">
        <div class="pages__header1">
            <div class="pages__searchBar">
                <div class="pages__searchIcon">
                    <font-awesome-icon icon="search" />
                </div>
                <input class="pages__searchInput" type="text" placeholder="Search artists here..." v-model="find">
            </div>
        </div>
        <div class="pages__header2">       
            <button class="pages__logout">
                <font-awesome-icon icon="power-off" />
            </button>
        </div>
    </div>
    <div class="pages__content">
        <div class="pages__body">
            <div class="covers__card" v-for="(artist, a) in artistz" :key="'a'+a">
                <div class="covers__box">
                    <!-- <div class="covers__img" :style="`background-image: url(${album.cover})`"></div> -->
                    <img :src="`${link}/${artist.artist_img}`" :alt="`${link}/${artist.artist_img}`" class="covers__img" width="100%" height="auto">
                    <div class="covers__text">
                        <div class="covers__title">{{ artist.artist_name }}</div>
                    </div>
                </div>
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
            link: this.$axios.defaults.baseURL,
            // artists: [
            //     {
            //         artist_id: 2,
            //         artist_name: "artist 12",
            //         artist_img: "default_disc.jpg",
            //         status: "active",
            //     }
            // ]
        }
    },
    methods: {
        add_artist() {
            this.$store.commit("open_modal_addArtist", true);
        }
    },
    created() {
        this.$store.dispatch("getArtitist");
    },
    mounted() {
        this.$store.commit("activePages", "nav_artist");
    },
    computed: {
        ...mapGetters(
            { 
                artists: "list_artist",
            }
        ),
        artistz() {
            return this.artists.filter(data => {
                return (
                String(data.artist_id)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.artist_img)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.artist_name)
                    .toLowerCase()
                    .includes(this.find.toLowerCase())
                );
            });
        }
    }
    
}
</script>

<style>

</style>