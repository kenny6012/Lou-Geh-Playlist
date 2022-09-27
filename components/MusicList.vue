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
                <font-awesome-icon icon="power-off" />
            </button>
        </div>
    </div>
    <div class="pages__content">
        <div class="music__header">
            <div class="music__head1"></div>
            <div class="music__head2">Title</div>
            <div class="music__head3">Album {{ playingNow.play }}</div>
            <div class="music__head4">Artist</div>
        </div>
        <div class="music__body music__scrollY">
            <div 
                v-for="(track, t) in trackz" 
                :key="'t'+t" @click="playNow(track)" 
                :class="'music__bodyTable '+(track.id == playingNow.id ? 'music__playing':'')">
                
                <div class="music__head1">
                    <div class="special__div1">
                        <div 
                            :style="'background-image: url('+(track.cover != ''? track.cover : 'default_artwork.png')+')'" 
                            class="track__img">
                        </div>
                    </div>
                    <div class="special__div2">
                        <font-awesome-icon :icon="(track.id == playingNow.id && playingNow.play == true ? 'pause':'play')" />
                    </div>
                </div>

                <div class="music__head2">{{ track.name}}</div>
                <div class="music__head3">{{ track.album }}</div>
                <div class="music__head4">{{ track.artist }}</div>
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
            tracks: [
                {
                    id: 'T0',
                    name: "Only Exception",
                    artist: "Paramore",
                    album: "Brand New Eyes",
                    cover: "Paramore_Brand_New_Eyes.png",
                    play: false
                },
            ],
            
        }
    },
    methods: {
        playNow(track) {
            this.$store.commit("setToPlay", track);
            this.$store.commit("setToPause", true);
        }
    },
    created() {
        for(var t=1; t <= 20; t++) {
            this.tracks.push(
                {
                    id: 'T'+t,
                    name: "Track no. "+t,
                    artist: "Artist",
                    album: "Album",
                    cover: "default_artwork.png",
                    play: false,
                }
            );
        }
    },
    mounted() {
        this.$store.commit("activePages", "nav_music");
    },
    computed: {
        trackz() {
            return this.tracks.filter(data => {
                return (
                String(data.artist)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.name)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.cover)
                    .toLowerCase()
                    .includes(this.find.toLowerCase()) ||
                String(data.album)
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