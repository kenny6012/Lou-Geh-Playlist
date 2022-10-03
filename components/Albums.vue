<template>
<div class="pages__layout">
    <!-- ADD BUTTON -->
    <button class="pages__add" @click="add_music()">
        <font-awesome-icon icon="plus" />
    </button>

    <!-- CONTENTS -->
    <div class="pages__header">
        <div class="pages__header1">
            <div class="pages__searchBar">
                <div class="pages__searchIcon">
                    <font-awesome-icon icon="search" />
                </div>
                <input class="pages__searchInput" type="text" placeholder="Search album here..." v-model="find">
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
            <div class="covers__card" v-for="(album, a) in albumz" :key="'a'+a">
                <div class="covers__box">

                    <img :src="`${link}/${album.album_img}`" :alt="`${link}/${album.album_img}`" class="covers__img" width="100%" height="auto">
                    <div class="covers__text">
                        <div class="covers__title">{{ album.album_name }}</div>
                        <div class="covers__sub">{{ album.artist_name }}</div>
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
            // albums: [
            //     {
            //         album_id: 1,
            //         album_name: "album1",
            //         artist_name: "Paramore",
            //         album_img: "uploads/album_img/Clipboard - August 23, 2022 2_24 PM.png",
            //         status: "active    "
            //     }
            // ]
        }
    },
    methods: {
        add_music() {
            this.$store.commit("open_modal_addAlbum", true);
        }
    },
    created() {
        
    },
    mounted() {
        this.$store.commit("activePages", "nav_album");
    },
    computed: {
        ...mapGetters(
            { 
                albums: "list_album",
            }
        ),
        albumz() {
            return this.albums.filter(data => {
                return (
                String(data.artist)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.name)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.cover)
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