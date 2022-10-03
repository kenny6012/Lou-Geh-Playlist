<template>
<div class="modal__layout">
    <div class="modal__container">
            <div class="modal__header">
                <div class="modal__header1">
                    <font-awesome-icon icon="music" /> &ensp; Music
                </div>
                <div class="modal__header2">
                    <font-awesome-icon class="modal__close" icon="times-circle" @click="add_music_close()"/>
                </div>
            </div>
            <div class="modal__body">

                <div class="modal__image">
                    <input type="button" :value="uploadImageLabel" class="modal__uploadCover" @click="$refs.coverImage.click()" />

                    <img :src="imageData" alt="" class="modal__trackImg" height="300px" width="300px">

                    <input id="uploadpic" ref="coverImage" style="display: none" type="file" accept="image/*" @change="previewImage($event)" />

                </div>

                <div class="modal__trackInfo">

                    <input type="text" class="modal__trackTitle" v-model="track_title" placeholder="Track Title">

                    <div class="modal__select">
                        <div class="modal__display" @click="showArtists()">{{ track_artist }}</div>
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

                    <div class="modal__select">
                        <div class="modal__display" @click="showAlbums()">{{ track_album }}</div>
                        <div class="modal__optionHolder" v-show="showAlbum">
                            <div 
                                class="modal__options" 
                                v-for="(album, a) in albumz" 
                                :key="'a'+a" 
                                @click="setAlbums(album)">

                                {{ album.album_name }}

                            </div>
                        </div>
                    </div>

                    <input type="button" :value="uploadTrackLabel" class="modal__uploadTrack" @click="$refs.uploadTrack.click()" />
                    <input id="uploadTrack" ref="uploadTrack" style="display: none" type="file" accept=".mp3,audio/*" @change="uploadTrack($event)" />
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
                    <input class="modal__buttonCancel" type="button" value="Clear" @click="clearFields()">
                    <input class="modal__buttonSave" type="button" value="Save" @click="saveTrack()">
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
        uploadTrackLabel: "Upload Track",
        coverImage: "",

        findAlbums: "",

        showArtist: false,
        showAlbum: false,
        showStatus: false,
        showSpinner: false,

        status: "",
        statusColor: "#193C2A",

        track_BlobData: [],
        track_title: "",
        track_artist: "Select Artist/Band",
        track_album: "Select Album",

        final_album_id: "",
        final_artist_id: "",
        // track_artists: [],
        // track_albums: [],
    }
},
methods: {
    clearFields() {
        this.imageData = "bg.png",
        this.uploadImageLabel = "Upload Image",
        this.uploadTrackLabel = "Upload Track",
        this.coverImage = "",

        this.findAlbums = "",

        this.track_title = "";
        this.track_artist = "Select Artist/Band",
        this.track_album = "Select Album",

        this.status = "",
        this.statusColor = "#193C2A",

        this.showArtist = false,
        this.showAlbum = false,
        this.showStatus = false,
        this.showSpinner = false,

        this.final_album_id = "";
        this.final_artist_id = "";
        this.coverImage = [];
        this.track_BlobData = [];

    },
    saveTrack() {
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
        else if(this.track_BlobData) {
            this.showStatus = true;
            this.statusColor = "#E84D2E";
            this.status = "Please upload the track's audio file."
        }
        else {
            this.showStatus = true;
            this.status = "Saving";
            this.statusColor = "#193C2A";
            const formData = new FormData();
            
            formData.append("track_name", this.track_title);
            formData.append("album_id", this.final_album_id);
            formData.append("artist_id", this.final_artist_id);
            formData.append("image", this.coverImage, this.coverImage.name); // IMAGE FILE
            formData.append("songs", this.track_BlobData, this.track_BlobData.name); // AUDIO FILE

            axios.post(`${this.$axios.defaults.baseURL}/api/track`, formData,{
                headers: { 
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data"
                },
                })
                .then(res => {
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
                    // FETCH TRACKS
                    this.$store.dispatch("getTracks");
                },
                error => {
                    this.statusColor = "#E84D2E";
                    this.status = error.response.data.error;
                    // console.log(error.response.data.error);
                });
        }
    },
    add_music_close() {
        this.$store.commit("open_modal_addTrack", false);
    },
    showArtists() {
        this.showArtist = !this.showArtist;
        this.showAlbum = false;
    },
    showAlbums() {
        this.showAlbum = !this.showAlbum;
        this.showArtist = false;
    },
    setArtist(data) {
        this.showArtist = false;
        this.track_artist = data.artist_name;
        this.findAlbums = data.artist_name;
        this.final_artist_id = data.artist_id;
        this.track_album = "Choose Album";
        // console.log(data);
    },
    setAlbums(data) {
        this.showAlbum = false;
        this.track_album = data.album_name;
        this.final_album_id = data.album_id;
        // console.log(data);
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
    // for(var b=0; b < 10; b++) {
    //     this.track_albums.push(
    //         {
    //             id: "b"+b,
    //             name: "Album no. "+b,
    //             artist: "Artist"
    //         }
    //     );
    // }
    // for(var t=0; t < 10; t++) {
    //     this.track_artists.push(
    //         {
    //             id: "t"+t,
    //             name: "Artist no. "+t
    //         }
    //     );
    // }
},
computed: {
    ...mapGetters(
        { 
            track_albums: "list_album",
            track_artists: "list_artist"
        }
    ),
    albumz() {
        return this.track_albums.filter(data => {
            return (
                String(data.artist_name).toLowerCase().includes(this.findAlbums.toLowerCase())
            );
        });
    }
},
}
</script>

<style>

</style>