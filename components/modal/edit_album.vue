<template>
<div class="modal__layout">
    <div class="modal__container">
            <div class="modal__header">
                <div class="modal__header11">
                    <font-awesome-icon icon="compact-disc" /> &ensp; Edit album info
                </div>
                <div class="modal__header2">
                    <font-awesome-icon class="modal__close" icon="times-circle" @click="edit_album_close()"/>
                </div>
            </div>
            <div class="modal__body">

                <div class="modal__image">
                    <input type="button" :value="uploadImageLabel" class="modal__uploadCover" @click="$refs.coverImage.click()" />

                    <img :src="imageData" alt="" class="modal__trackImg" height="300px" width="300px">

                    <input id="uploadpic" ref="coverImage" style="display: none" type="file" accept="image/*" @change="previewImage($event)" />

                </div>

                <div class="modal__trackInfo">

                    <input type="text" class="modal__trackTitle" v-model="album_title" placeholder="Album Title">


                    <div class="modal__select">
                        <div class="modal__display" @click="showArtists()">{{ album_artist }}</div>
                        <div class="modal__optionHolder" v-show="showArtist">
                            <div 
                                class="modal__options" 
                                v-for="(artist, a) in track_artists" 
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
                    <input class="modal__buttonCancel" type="button" value="Revert" @click="assign_album_info()">
                    <input class="modal__buttonSave2" type="button" value="Save" @click="saveTrack()">
                </div>
            </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
data() {
    return {
        imageData: "bg.png",
        uploadImageLabel: "Upload Image",
        coverImage: "",

        showArtist: false,
        showStatus: false,
        showSpinner: false,

        status: "",
        statusColor: "#193C2A",

        final_artist_id: "",

        album_title: "",
        album_artist: "Select Artist/Band",

        link: this.$axios.defaults.baseURL+"/",
    }
},
methods: {
    clearFields() {
        this.imageData = "bg.png";
        this.uploadImageLabel = "Upload Image";
        this.coverImage = "";

        this.showArtist = false;
        this.showStatus = false;
        this.showSpinner = false;

        this.status = "";
        this.statusColor = "#193C2A";

        this.final_artist_id

        this.album_title = "";
        this.track_artist = "Select Artist/Band";
    },
    assign_album_info() {
        console.log(this.album_info);
        this.uploadImageLabel = "Upload New Cover";
        // this.imageData = this.link+this.track_info.track_img;

        this.album_title = this.album_info.album_name;
        this.album_artist = this.album_info.artist_name;

        this.final_artist_id = this.album_info.artist_id;

        this.findAlbums = this.album_info.artist_name;
    },
    saveTrack() {
        if(this.album_info == "") {
            this.showStatus = true;
            this.statusColor = "#E84D2E";
            this.status = "Please enter the track's name first."
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
            
            formData.append("album_name", this.album_title);
            formData.append("artist_id", this.final_artist_id);
            formData.append("image", this.coverImage, this.coverImage.name); // IMAGE FILE


            axios.patch(`${this.$axios.defaults.baseURL}/api/album/${this.album_info.album_id}`, formData,{
                headers: { 
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data"
                },
                })
                .then(res => {
                    this.status = res.data.message;
                    // console.log(res.data);
                    // console.log(res.status);
                    // console.log(res.data.message);
                    if(res.status >= 200 && res.status <=299) {
                        this.statusColor = "#00a651";
                    }
                    else if(res.status > 299) {
                        this.statusColor = "#E84D2E";
                    }
                    // FETCH DATA
                    this.$store.dispatch("getTracksForReports");
                    this.$store.dispatch("getAlbums");
                    this.$store.dispatch("getTracks");

                    // CLEAR FIELDS
                    this.clearFields();

                    // GET NEW ALBUM DATA
                    this.getALbumInfo(this.album_info.album_id);

                    // CLOSE
                    this.edit_album_close();
                },
                error => {
                    this.statusColor = "#E84D2E";
                    this.status = error.response.data.error;
                    console.log(error);
                });
        }
    },
    getALbumInfo(id) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/album/${id}`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            if(res.data.length > 0) {
                var album = res.data[0];
                this.$store.commit("find_current_album", album);
            }
            else {
                console.log(res.data);
            }
        });
    },
    edit_album_close() {
        console.log("test");
        this.findAlbums = "";
        this.$store.commit("update_album", false);
    },
    showArtists() {
        this.showArtist = !this.showArtist;
        this.showAlbum = false;
    },
    setArtist(data) {
        this.showArtist = false;
        this.album_artist = data.artist_name;
        this.final_artist_id = data.artist_id;
    },
    previewImage(event) {
        console.log("test");
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
},
watch: {
    open_edit_album() {
        this.assign_album_info();
    }
},
computed: {
    ...mapGetters(
        { 
            album_info: "update_album",

            track_artists: "list_artist"
        }
    ),
    open_edit_album() {
        return this.$store.state.update_album;
    },
},
}
</script>

<style>

</style>