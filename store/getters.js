export default {
    // allUsers(state) {
    //   return state.usersState;
    // },
    list_artist(state) {
      return state.list_artist;
    },
    list_album(state) {
      return state.list_album;
    },
    list_tracks(state) {
      return state.list_tracks;
    },
    active(state) {
      return state.activePage;
    },
    open_add_track(state) {
      return state.open_add_track;
    },
    open_add_artist(state) {
      return state.open_add_artist;
    },
    open_add_album(state) {
      return state.open_add_album;
    }
  };