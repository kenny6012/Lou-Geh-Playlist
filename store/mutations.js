import state from "./state";
export default {
//   LOGIN_USER(state, user) {
//     // console.log(user);
//     state.usersState.push(user);
//   },
    activePages(state, data) {
        // console.log(data);
        state.activePage = data;
    },
    setToPlay(state, data) {
        state.playing = data;
    },
    setToPause(state, data) {
        state.playing.play = data;
    }
};