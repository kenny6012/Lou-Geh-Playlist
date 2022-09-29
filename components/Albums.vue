<template>
<div class="pages__layout">
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
                    <!-- <div class="covers__img" :style="`background-image: url(${album.cover})`"></div> -->
                    <img :src="album.cover" :alt="album.name" class="covers__img" width="100%" height="auto">
                    <div class="covers__text">
                        <div class="covers__title">{{ album.name }}</div>
                        <div class="covers__sub">{{ album.artist }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            find: "",
            albums: [
                {
                    id: "A0",
                    name: "Brand New Eyes",
                    artist: "Paramore",
                    cover: "Paramore_Brand_New_Eyes.png"
                }
            ]
        }
    },
    created() {
        for(var a=1; a <= 20; a++) {
            this.albums.push(
                {
                    id: "A"+a,
                    name: "Album no. "+a,
                    artist: "Artist",
                    cover: "default_disc.jpg"
                }
            );
        }
    },
    mounted() {
        this.$store.commit("activePages", "nav_album");
    },
    computed: {
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