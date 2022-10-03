<template>
<div class="modal__layout">
    <div class="modal__container">
            <div class="modal__header">
                <div class="modal__header1">
                    <font-awesome-icon icon="compact-disc" /> &ensp; Album
                </div>
                <div class="modal__header2">
                    <font-awesome-icon class="modal__close" icon="times-circle" @click="close_modal()"/>
                </div>
            </div>
            <div class="modal__body">

                <div class="modal__image">
                    <input type="button" :value="uploadImageLabel" class="modal__uploadCover" @click="$refs.coverImage.click()" />

                    <img :src="imageData" alt="" class="modal__trackImg" height="300px" width="300px">

                    <input id="uploadpic" ref="coverImage" style="display: none" type="file" accept="image/*" @change="previewImage($event)" />

                </div>

                <div class="modal__trackInfo">

                    <input type="text" class="modal__trackTitle" v-model="track_album" placeholder="Album">

                    <div class="modal__select">
                        <div class="modal__display" @click="showArtists()">{{ artistName }}</div>
                        <div class="modal__optionHolder" v-show="showArtist">
                            <div 
                                class="modal__options" 
                                v-for="(artist, a) in artists" 
                                :key="'a'+a" 
                                @click="setArtist(artist)">

                                {{ artist.artist_name }}

                            </div>
                        </div>
                    </div>

                </div>


            </div>

            <div class="modal__footer">
                <div class="modal__footer1">
                    <div v-show="showStatus">
                        <font-awesome-icon icon="spinner" v-show="showSpinner"/> &ensp; 
                        <span :style="`color: ${statusColor}; font-size: 16px;`"> {{ status }}... </span>
                    </div>
                </div>
                <div class="modal__footer2">
                    <input class="modal__buttonCancel" type="button" value="Clear" @click="clear_fields()">
                    <input class="modal__buttonSave" type="button" value="Save" @click="save_album()">
                </div>
            </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
data() {
    return {
        imageData: "bg.png",
        uploadImageLabel: "Upload Image",
        coverImage: "",

        showArtist: false,
        showAlbum: false,
        showStatus: false,
        showSpinner: false,
        status: "",
        statusColor: "#193C2A",

        track_album: "",
        artistName: "Choose the Artist or Band",
        artistInfo: ""
    }
},
methods: {
    showArtists() {
        this.showArtist = true;
    },
    setArtist(artist) {
        this.showArtist = false;
        this.artistName = artist.artist_name;
        this.artistInfo = artist;
    },
    clear_fields() {
        this.showStatus = false;
        this.status = "";
        this.coverImage = "";
        this.$refs.coverImage.value = null;
        this.imageData = "bg.png";
        this.uploadImageLabel = "Upload Image";
        this.track_album = "";
        this.artistName = "Choose the Artist or Band";
        this.artistInfo = "";
    },
    close_modal() {
        this.$store.commit("open_modal_addAlbum", false);
    },
    save_album() {
        // console.log("======================================");
        // console.log(this.track_album);
        // console.log("======================================");
        // console.log(this.imageData);
        // console.log(this.coverImage);
        // console.log("======================================");
        if(this.track_album == "") {
            this.showStatus = true;
            this.statusColor = "#E84D2E";
            this.status = "Please enter the album's name first."
        }
        else if(!this.coverImage) {
            this.showStatus = true;
            this.statusColor = "#E84D2E";
            this.status = "Please upload the album's cover photo."
        }
        else {
            this.showStatus = true;
            this.status = "Saving";
            this.statusColor = "#193C2A";
            const formData = new FormData();
            formData.append("image", this.coverImage, this.coverImage.name);
            formData.append("album_name", this.track_album);
            formData.append("artist_id", this.artistInfo.artist_id);

            axios.post(`${this.$axios.defaults.baseURL}/api/album`, formData,{
                headers: { 
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data"
                },
                })
                .then((res) => {
                    this.status = res.data.message;
                    console.log(res.data);
                    console.log(res.status);
                    console.log(res.data.message);
                    if(res.status >= 200 && res.status <=299) {
                        this.statusColor = "#00a651";
                    }
                    else if(res.status > 299) {
                        this.statusColor = "#E84D2E";
                    }
                    // FETCH ALBUMS
                    this.$store.dispatch("getAlbums");
                },
                error => {
                    this.statusColor = "#E84D2E";
                    this.status = error.response.data.error;
                    // console.log(error.response.data.error);
                });
        }
    },
    previewImage(event) {
        this.uploadImageLabel = "";
        var input = event.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.imageData = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
            this.coverImage = input.files[0];
        }
    },
    uploadTrack(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        // IMAGE NAME
        this.uploadTrackLabel = input.files[0].name;

        // IMAGE BLOB
        this.track_BlobData = input.files[0];
      }
    },
},
created() {
    this.$store.dispatch("getArtitist");
},
computed: {
    ...mapGetters(
            { 
                artists: "list_artist",
            }
        ),
}
}
</script>

<style>

</style>