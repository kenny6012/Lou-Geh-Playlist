<template>
<div class="player__layout">
    <div class="player__div1">
        <div 
            :style="'background-image: url('+(playNow != '' ? (playNow.cover != '' ? playNow.cover:'default_artwork.png'):'default_artwork.png')+')'"
            class="player__trackImg">
        </div>
        <div class="player__trackInfo">
            <div class="player__trackTitle">{{ playNow!= '' ? (playNow.name != '' ? playNow.name:'Unknown Track'):'Select a track to play' }}</div>
            <div class="player__trackSub" v-show="playNow != ''">
                {{ (playNow.artist != '' ? playNow.artist:'Unknown Artist')+' | '+(playNow.artist != '' ? playNow.artist:'Unknown Album') }}
            </div>
        </div>
    </div>
    <div class="player__div2">
        <div class="player__btn">
            <font-awesome-icon icon="step-backward" />
        </div>
        <div class="player__PlayPause" @click="playTrack()">
            <div class="player__button">
                <font-awesome-icon :icon="play == false? 'play':'pause'" />
            </div>
        </div>
        <div class="player__btn">
            <font-awesome-icon icon="step-forward" />
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
        play: false,
    }
},
methods: {
    playTrack(track) {
        // alert("Play");
        if(this.play == true) {
            this.play = false;
            this.$store.commit("setToPause", false);
        }
        else {
            this.play = true;
            this.$store.commit("setToPause", true);
        }
    }
},
watch: {
    playNow() {
        this.play = true;
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