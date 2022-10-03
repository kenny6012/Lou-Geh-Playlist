import state from "./state";
export default {
//   LOGIN_USER(state, user) {
//     // console.log(user);
//     state.usersState.push(user);
//   },
    setArtist(state, data) {
        state.list_artist = data;
    },
    setalbum(state, data) {
        state.list_album = data;
        // console.log("==========================");
        // console.log("state.list_albums");
        // console.log("==========================");
        // console.log(data);
        // console.log("==========================");
    },
    settracks(state, data) {
        // console.log("==========================");
        // console.log("state.list_tracks");
        // console.log("==========================");
        // console.log(data);
        state.list_tracks = data;
        // console.log("==========================");
    },
    activePages(state, data) {
        // console.log(data);
        state.activePage = data;
    },
    currentTrack(state, data) { // TO PUT THE FIRST TRACK ON playing STATE
        state.playing = data;
    },
    setToPlay(state, data) {
        // console.log("==========================");
        // console.log("state.playing");
        // console.log("==========================");
        // console.log(data[Object.keys(data)[0]]); //res.data[Object.keys(res.data)[0]]
        // console.log(data); //res.data[Object.keys(res.data)[0]]
        state.playing = data;
        state.playing.play = true;
        // console.log("==========================");
    },
    playTrack(state, data) {
        state.playing.play = data;
    },
    open_modal_addTrack(state, data) {
        state.open_add_track = data;
    },
    open_modal_addArtist(state, data) {
        state.open_add_artist = data;
    },
    open_modal_addAlbum(state, data) {
        state.open_add_album = data;
    }
};