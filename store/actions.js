import axios from "axios";
// import moment from "moment";

export default {
    // FETCH LIST OF ARTIST 
    getArtitist({ commit }) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/artist`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            commit("setArtist", res.data);
        });
    },
    getAlbums({ commit }) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/album`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            commit("setalbum", res.data);
        });
    },
    getTracks({ commit }) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/track`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            commit("settracks", res.data.reverse());
        });
    },
    getTracksForReports({ commit }) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/track`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            // console.log("Test");
            var temp = res.data;
            temp.sort((a, b) => { return b.numberofplays - a.numberofplays; });
            commit("setTrackReport", temp);
        });
    },
    

};