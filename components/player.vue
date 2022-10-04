<template>
<div class="player__layout">
    <div class="player__div1">

        <img 
            v-if="!playNow.track_img || !playNow" 
            src="default_artwork.png" 
            alt="Default Cover" 
            class="player__trackImg" 
            width="75px" 
            height="75px">
        <img 
            v-else
            :src="`${link+playNow.track_img ? link+playNow.track_img:'default_artwork.png'}`" 
            :alt="`${link+playNow.track_img ? link+playNow.track_img:'default_artwork.png'}`" 
            class="player__trackImg" 
            width="75px" 
            height="75px">

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
        <div class="player__timeProgress">{{ secondsToMinutes(track_time) }}</div>
        &emsp;
        <input type="range" value="0" min="1" max="100" step="1" class="slider" id="test1">
        &emsp;
        <div class="player__timeProgress">{{ secondsToMinutes(track_progress) }}</div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import moment from 'moment';

export default {
data() {
    return {
        link: this.$axios.defaults.baseURL+"/",
        play: false,
        player: [],
        current_time: 0,
        current_track: [],

        track_time: 0,
        track_progress: 0,
    }
},
methods: {
    secondsToMinutes(sec) {
        return moment.utc(sec * 1000).format("mm:ss");
    },
    prev() {
        var latestTrack = parseInt(this.listTracks.length) - 1;
        var trackIndex;
        // // FIND THE CURRENT TRACK'S ID FROM THE LIST
        for(let x=0; x < this.listTracks.length; x++) {
            if(this.listTracks[x].track_id === this.current_track.track_id) {
                trackIndex = x;
            };
        }

        if(trackIndex != undefined) {
            var indexx = trackIndex - 1;
            if(indexx < 0) {
                indexx = latestTrack;
            }

            if(this.listTracks[indexx].track_mp3 != "") {
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

        // alert("Na next?");

        // FIND THE CURRENT TRACK'S ID FROM THE LIST
        for(let x=0; x < this.listTracks.length; x++) {
            if(this.listTracks[x].track_id === this.current_track.track_id) {
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
                if(this.listTracks[indexx].track_mp3 != "") {
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
            this.play = false;
            this.player.pause();
            this.$store.commit("playTrack", false);
            this.$store.commit("autoplay", false);

            this.current_time = this.player.currentTime;
        }
        else { // TO PLAY
            this.play = true;
            this.$store.commit("playTrack", true);
            this.$store.commit("autoplay", true);

            this.playTrack();
        }
    },
    playTrack() {
        if(this.playNow) {
            if(this.playNow.track_mp3 != "") {

                if(this.playNow.track_id != this.current_track.track_id && this.current_track.track_id != undefined) {
                    // console.log("test");
                    this.current_track = [];
                    this.player.pause();
                    this.current_time = 0;
                }

                
                // GET AUDIO
                this.player = new Audio(this.link+this.playNow.track_mp3);
                this.player.currentTime = this.current_time;

                // PLAY AUDIO
                if(this.autoPlay == true) {
                    this.play = true;
                    this.player.play();
                    var playerPromise = this.player.play();

                    // UPDATE NUMBER OF PLAYS
                    this.updateNumberOfPlays(this.playNow);

                    // IF TRACK HAS ENDED
                    var ref = this;
                    this.player.addEventListener("ended", function() {
                        ref.nextt();
                    });

                    const progressEl = document.querySelector('input[type="range"]');

                    let mouseDownOnSlider = false;

                    this.player.addEventListener("loadeddata", () => {
                        progressEl.value = 0;
                    });

                    this.player.addEventListener("timeupdate", (e) => {
                        if (!mouseDownOnSlider) {
                            progressEl.value = this.player.currentTime / this.player.duration * 100;

                            
                            console.log(this.track_time+" - "+this.track_progress);
                            if(!Number.isNaN(this.player.duration)) {
                                this.track_time = this.player.duration;
                                this.track_progress = this.player.currentTime;
                                progressEl.style.backgroundSize = (progressEl.value - 0) * 100 / (100 - 0) + '% 100%';
                            }


                        }
                        
                    });

                    progressEl.addEventListener("change", (e) => {
                        const pct = progressEl.value / 100;
                        this.player.currentTime = (this.player.duration || 0) * pct;

                        console.log(this.track_time+" - "+this.track_progress);
                        if(!Number.isNaN(this.player.duration)) {
                            this.track_time = this.player.duration;
                            this.track_progress = this.player.currentTime;
                            progressEl.style.backgroundSize = (progressEl.value - 0) * 100 / (100 - 0) + '% 100%';
                        }

                    });

                    progressEl.addEventListener("mousedown", () => {
                        mouseDownOnSlider = true;   
                    });
                    progressEl.addEventListener("mouseup", () => {
                        mouseDownOnSlider = false;
                    });

                }
                else {
                    this.play = false;
                    this.$store.commit("playTrack", false);
                }
                this.current_track = this.playNow;

                // console.log(this.current_track);

                if (playerPromise !== undefined) {
                    playerPromise.then(_ => {
                        // console.log(playerPromise);
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

            }
            else {
                alert("Track Not Found");
            }
        }
    },
    updateNumberOfPlays(track) {
        // GET CURRENT NUMBER OF PLAYS
        // console.log(track.track_name);
        // console.log(track.numberofplays);
        var currentCount = parseInt(track.numberofplays);
        var latestCount = currentCount + 1;

        axios({
            method: "PATCH",
            url: `${this.$axios.defaults.baseURL}/api/track/play/${track.track_id}`,
            headers: {"Access-Control-Allow-Origin": "*"},
            data: {
                numberofplays: latestCount
            }
        }).then(res => {
            this.$store.dispatch("getTracksForReports");
            latestCount = 0;
            currentCount = 0;
        });
    }
},
created() {
    // this.listTracks =  this.$store.state.list_tracks;
},
watch: {
    playNow() {
        this.playTrack();
    },
    listTracks() {
        var firstTrack = this.$store.state.list_tracks;
        this.$store.commit("currentTrack", firstTrack[0]);
    }
},
computed: {
    listTracks() {
        return this.$store.state.list_tracks;
    },
    playNow() {
        return this.$store.state.playing;
    },
    autoPlay() {
        return this.$store.state.autoPlay;
    }
}
}
</script>

<style lang="scss">
.slidecontainer {
  width: 100%;
}

input[type=range] {
    outline: none;
    padding: 0;
    width: 250px;
    height: 8px;
    background-color: #ECF2EA;
    background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #A0B0A5), color-stop(100%, #A0B0A5));
    background-size: 1% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: pointer;
    -webkit-appearance: none;
}

input[type=range]::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    -webkit-appearance: none;
}


input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 8px;
    background: transparent;
    border-radius: 10px;
    cursor: pointer;
}

</style>