<template>
<div class="player__layout">
    <div class="player__div1">
        <div 
            :style="`background-image: url(${playNow.track_img ? link+playNow.track_img:'default_artwork.png'})`"
            class="player__trackImg">
        </div>
        <div class="player__trackInfo">
            <div class="player__trackTitle">{{ playNow!= '' ? (playNow.track_name != '' ? playNow.track_name:'Unknown Track'):'Select a track to play' }}</div>
            <div class="player__trackSub" v-show="playNow != ''">
                {{ (playNow.artist_name != '' ? playNow.artist_name:'Unknown Artist')+' | '+(playNow.album_name != '' ? playNow.album_name:'Unknown Album') }}
            </div>
        </div>
    </div>
    <div class="player__div2">
        <div class="player__btn">
            <font-awesome-icon icon="step-backward" @click="prev()"/>
        </div>
        <div class="player__PlayPause" @click="playy()">
            <div class="player__button">
                <font-awesome-icon :icon="play == false? 'play':'pause'" />
            </div>
        </div>
        <div class="player__btn">
            <font-awesome-icon icon="step-forward" @click="nextt()"/>
        </div>
    </div>
    <div class="player__div3">

    </div>
</div>
</template>

<script>
export default {
data() {
    return {
        link: this.$axios.defaults.baseURL+"/",
        play: false,
        player: [],
        current_time: 0,
        current_track: [],
        listTracks: []
    }
},
methods: {
    prev() {
        var latestTrack = parseInt(this.listTracks.length) - 1;
        var trackIndex;
        // // FIND THE CURRENT TRACK'S ID FROM THE LIST
        for(let x=0; x < this.listTracks.length; x++) {
            if(this.listTracks[x].id === this.current_track.id) {
                trackIndex = x;
            };
        }

        if(trackIndex != undefined) {
            var indexx = trackIndex - 1;
            if(indexx < 0) {
                indexx = latestTrack;
            }

            if(this.listTracks[indexx].source != "") {
                this.$store.commit("setToPlay", this.listTracks[indexx]);
                this.$store.commit("playTrack", true);
            }
            else {
                alert("Track Index "+ indexx+" not found");
            }
        }
    },
    nextt() {
        var latestTrack = parseInt(this.listTracks.length) - 1;
        var trackIndex;
        // // FIND THE CURRENT TRACK'S ID FROM THE LIST
        for(let x=0; x < this.listTracks.length; x++) {
            if(this.listTracks[x].id === this.current_track.id) {
                trackIndex = x;
            };
        }

        if(trackIndex != undefined) {
            var indexx = trackIndex + 1;
            if(indexx > latestTrack) {
                this.$store.commit("setToPlay", this.listTracks[0]);
                this.$store.commit("playTrack", true);
            }
            else {
                if(this.listTracks[indexx].source != "") {
                    this.$store.commit("setToPlay", this.listTracks[indexx]);
                    this.$store.commit("playTrack", true);
                }
                else {
                    alert("Track Index "+ indexx+" not found");
                }
            }
        }
    },
    playy() {
        if(this.play == true) { // TO PAUSE
            // console.log("pause");
            this.play = false;
            this.player.pause();
            this.$store.commit("playTrack", false);

            this.current_time = this.player.currentTime;
        }
        else { // TO PLAY
            // console.log("play");
            this.play = true;
            this.$store.commit("playTrack", true);
            if(this.playNow == '') {
                console.log("=================================");
                console.log("this.$store.state.list_tracks");
                console.log("=================================");
                var topTrack = this.$store.state.list_tracks;
                console.log("=================================");
                this.$store.commit("setToPlay", topTrack[0]);
                this.$store.commit("playTrack", true);
            }
            else {
                this.playTrack();
            }
        }
    },
    playTrack() {
        if(this.playNow != "") {
            if(this.playNow.source != "") {
                if(this.current_track.id != undefined && this.current_track.id != this.playNow.id) {
                    // console.log(this.current_track.id+" - "+this.playNow.id);
                    this.current_track = [];
                    this.player.pause();
                    this.current_time = 0;
                }
                // GET CURRENT TRACK FROM STATE
                var playTrackNow = this.$store.state.playing;
                // console.log(this.link+playTrackNow.track_mp3);
                this.player = new Audio(this.link+playTrackNow.track_mp3);
                this.player.currentTime = this.current_time;

                // PLAY AUDIO
                this.player.play();
                var playerPromise = this.player.play();
                this.current_track = this.playNow;


                if (playerPromise !== undefined) {
                    playerPromise.then(_ => {
                        console.log(playerPromise);
                        // Automatic playback started!
                        // Show playing UI.
                        // We can now safely pause video...
                        // this.player.pause();
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                        this.play = false;
                        this.$store.commit("playTrack", false);
                        console.log(error);
                    });
                }
                else {
                    console.log("playerPromise is undefined");
                }

                // IF TRACK HAS ENDED
                // this.player.addEventListener(
                //     "ended",
                //     function() {
                //         this.$store.commit("playTrack", false);
                //     }
                //     function() {
                //         alert("Track has ended");
                //     }
                //     // function () {
                //     //     this.index++;
                //     //     if (this.index > this.songs.length - 1) {
                //     //         this.index = 0;
                //     //     }

                //     //     this.current = this.songs[this.index];
                //     //     this.play(this.current);
                //     // }.bind(this)
                // );
            }
            else {
                alert("Track Not Found");
            }
        }
    },
},
created() {
    this.listTracks =  this.$store.state.list_tracks;
},
watch: {
    playNow() {
        this.play = true;
        this.playTrack();
    }
},
computed: {
    playNow() {
        return this.$store.state.playing;
    }
}
}
</script>

<style>

</style>