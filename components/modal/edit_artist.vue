<template>
<div class="modal__layout">
    <div class="modal__container">
            <div class="modal__header">
                <div class="modal__header11">
                    <font-awesome-icon icon="compact-disc" /> &ensp; Edit artist info
                </div>
                <div class="modal__header2">
                    <font-awesome-icon class="modal__close" icon="times-circle" @click="edit_artist_close()"/>
                </div>
            </div>
            <div class="modal__body">

                <div class="modal__image">
                    <input type="button" :value="uploadImageLabel" class="modal__uploadCover" @click="$refs.coverImage.click()" />

                    <img :src="imageData" alt="" class="modal__trackImg" height="300px" width="300px">

                    <input id="uploadpic" ref="coverImage" style="display: none" type="file" accept="image/*" @change="previewImage($event)" />

                </div>

                <div class="modal__trackInfo">

                    <input type="text" class="modal__trackTitle" v-model="artist_title" placeholder="artist Title">

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
                    <input class="modal__buttonCancel" type="button" value="Revert" @click="assign_artist_info()">
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

        artist_title: "",

        link: this.$axios.defaults.baseURL+"/",
    }
},
methods: {
    clearFields() {
        this.imageData = "bg.png";
        this.uploadImageLabel = "Upload Image";
        this.coverImage = "";

        this.status = "";
        this.statusColor = "#193C2A";

        this.final_artist_id = "";
        this.artist_title = "";
    },
    assign_artist_info() {
        this.uploadImageLabel = "Upload New Cover";

        this.artist_title = this.artist_info.artist_name;

        this.final_artist_id = this.artist_info.artist_id;
    },
    saveTrack() {
        if(this.artist_info == "") {
            this.showStatus = true;
            this.statusColor = "#E84D2E";
            this.status = "Please enter the track's name first."
        }
        else if(!this.coverImage) {
            this.showStatus = true;
            this.statusColor = "#E84D2E";
            this.status = "Please upload the artist's cover photo."
        }
        else {
            this.showStatus = true;
            this.status = "Saving";
            this.statusColor = "#193C2A";
            const formData = new FormData();
            
            formData.append("artist_name", this.artist_title);
            formData.append("image", this.coverImage, this.coverImage.name); // IMAGE FILE


            axios.patch(`${this.$axios.defaults.baseURL}/api/artist/${this.artist_info.artist_id}`, formData,{
                headers: { 
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data"
                },
                })
                .then(async res => {
                    this.status = res.data.message;
                    console.log(res.data);
                    console.log(res.status);
                    // console.log(res.data.message);
                    if(res.status >= 200 && res.status <=299) {
                        this.statusColor = "#00a651";
                    }
                    else if(res.status > 299) {
                        this.statusColor = "#E84D2E";
                    }
                    // FETCH DATA
                    await this.$store.dispatch("getTracksForReports");
                    await this.$store.dispatch("getArtitist");
                    await this.$store.dispatch("getAlbums");
                    await this.$store.dispatch("getTracks");

                    // CLEAR FIELDS
                    this.clearFields();

                    // GET NEW artist DATA
                    this.getartistInfo(this.artist_info.artist_id);

                    // CLOSE
                    this.edit_artist_close();
                },
                error => {
                    this.statusColor = "#E84D2E";
                    this.status = error.response.data.error;
                    console.log(error);
                });
        }
    },
    getartistInfo(id) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/artist/${id}`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            if(res.data.length > 0) {
                var artist = res.data[0];
                this.$store.commit("find_current_artist", artist);
            }
            else {
                console.log(res.data);
            }
        });
    },
    edit_artist_close() {
        console.log("test");
        this.$store.commit("update_artist", false);
    },
    showArtists() {
        this.showArtist = !this.showArtist;
        this.showartist = false;
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
    open_edit_artist() {
        this.assign_artist_info();
    }
},
computed: {
    ...mapGetters(
        { 
            artist_info: "update_artist"
        }
    ),
    open_edit_artist() {
        return this.$store.state.update_artist;
    },
},
}
</script>

<style>

</style>