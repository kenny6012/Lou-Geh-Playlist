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

                                {{ artist.name }}

                            </div>
                        </div>
                    </div>

                    <div class="modal__select">
                        <div class="modal__display" @click="showAlbums()">{{ track_album }}</div>
                        <div class="modal__optionHolder" v-show="showAlbum">
                            <div 
                                class="modal__options" 
                                v-for="(album, a) in track_albums" 
                                :key="'a'+a" 
                                @click="setAlbums(album)">

                                {{ album.name }}

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
                        <font-awesome-icon icon="spinner" /> &ensp; Status...
                    </div>
                </div>
                <div class="modal__footer2">
                    <input class="modal__buttonCancel" type="button" value="Clear">
                    <input class="modal__buttonSave" type="button" value="Save">
                </div>
            </div>
    </div>
</div>
</template>

<script>
export default {
data() {
    return {
        imageData: "bg.png",
        uploadImageLabel: "Upload Image",
        uploadTrackLabel: "Upload Track",
        coverImage: "",

        showArtist: false,
        showAlbum: false,
        showStatus: false,

        track_BlobData: [],
        track_title: "",
        track_artist: "Artist/Band",
        track_album: "Album",
        track_title: "",
        track_artists: [],
        track_albums: [],
    }
},
methods: {
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
        this.track_artist = data.name;
        // console.log(data);
    },
    setAlbums(data) {
        this.showAlbum = false;
        this.track_album = data.name;
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
    for(var b=0; b < 10; b++) {
        this.track_albums.push(
            {
                id: "b"+b,
                name: "Album no. "+b,
                artist: "Artist"
            }
        );
    }
    for(var t=0; t < 10; t++) {
        this.track_artists.push(
            {
                id: "t"+t,
                name: "Artist no. "+t
            }
        );
    }
}
}
</script>

<style>

</style>