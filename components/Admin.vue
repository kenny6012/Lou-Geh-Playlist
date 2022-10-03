<template>
<div class="pages__layout">
    <div class="pages__header">
        <div class="pages__header1">
            <div class="pages__searchBar">
                <div class="pages__searchIcon">
                    <font-awesome-icon icon="search" />
                </div>
                <input class="pages__searchInput" type="text" placeholder="Search tracks here...">
            </div>
        </div>
        <div class="pages__header2">       
            <button class="pages__logout">
                <font-awesome-icon icon="power-off" />
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
                    <input class="play__buttons" type="button" value="Add Track">
                </div>
            </div>
            <div class="play__topTrack">
                <div class="play__top">
                    <div class="play__track1">
                        <div class="play__topImg" :style="`background-image: url(${ trackz[0].cover })`"></div>
                        <div class="play__trackInfo">
                            <div class="play__topTitle">{{ trackz[0].name }}</div>
                            <div class="play__topSub">{{ `${trackz[0].artist} | ${trackz[0].album}` }}</div>
                        </div>
                    </div>
                    <div class="play__track2">
                        <div class="play__trackInfo">
                            <div class="play__topTitle">{{ trackz[0].played }}</div>
                            <div class="play__topSub">Plays</div>
                        </div>
                    </div>
                    <div class="play__track3">
                        <div class="play__trackInfo">
                            <div class="play__topTitle">{{ trackz[0].lastPlayed }}</div>
                            <div class="play__topSub">Last Played</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="play__scroll">
                <div class="play__tracks">
                    <div class="play__tracksContainer" v-for="(track, t) in trackz" :key="'t'+t" v-show="track.id != trackz[0].id">
                        <div class="play__track1">
                            <div class="play__img" :style="`background-image: url(${ track.cover })`"></div>
                            <div class="play__trackInfo1">
                                <div class="play__title play__titleX">{{ track.name }}</div>
                                <div class="play__sub">{{ `${track.artist} | ${track.album}` }}</div>
                            </div>
                        </div>
                        <div class="play__track2">
                            <div class="play__trackInfo">
                                <div class="play__title">{{ track.played }}</div>
                                <div class="play__sub">Plays</div>
                            </div>
                        </div>
                        <div class="play__track3">
                            <div class="play__trackInfo">
                                <div class="play__title">{{ track.lastPlayed }}</div>
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
export default {
    data() {
        return {
            find: "",
            tracks: [
                {
                    id: 'T0',
                    name: "The Only Exception",
                    artist: "Paramore",
                    album: "Brand New Eyes",
                    cover: "Paramore_Brand_New_Eyes.png",
                    source: "Paramore_The_Only_Exception.mp3",
                    play: false,
                    played: 10000,
                    lastPlayed: "Month 00, 0000",
                },
                {
                    id: 'T1',
                    name: "Brick by Boring Brick",
                    artist: "Paramore",
                    album: "Brand New Eyes",
                    cover: "Paramore_Brand_New_Eyes.png",
                    source: "Paramore_Brick_By_Boring_Brick.mp3",
                    play: false,
                    played: 10000,
                    lastPlayed: "Month 00, 0000",
                },
            ],
        }
    },
    created() {
        for(var t=2; t <= 20; t++) {
            this.tracks.push(
                { 
                    id: 'T'+t,
                    name: "Track no. "+t,
                    artist: "Artist",
                    album: "Album",
                    source: "",
                    cover: "default_artwork.png",
                    play: false,
                    played: t + 232.51,
                    lastPlayed: "Month 00, 0000",
                }
            );
        }
    },
    mounted() {
        this.$store.commit("activePages", "nav_admin");
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
    }
    
}
</script>

<style>

</style>