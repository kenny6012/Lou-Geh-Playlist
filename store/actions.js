import axios from "axios";
// import moment from "moment";

export default {
    // async loginUser({ commit }, { email, password }) {
    //     return await axios({
    //       method: "PUT",
    //       url: `${this.$axios.defaults.baseURL}/users/login`,
    //       headers: {
    //         "Access-Control-Allow-Origin": "*"
    //       },
    //       data: {
    //         email,
    //         password
    //       }
    //     }).then(res => {
    //       commit("LOGIN_USER", res.data.patched);
    //       // console.log(res.status);
    //       return res;
    //     });
    //   },
    // FETCH LIST OF ARTIST 
    getArtitist({ commit }) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/artist`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            commit("setArtist", res.data);
            // console.log(res.status);
            // console.log(res.data);
            return res;
        });
    },
    getAlbums({ commit }) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/album`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            commit("setalbum", res.data);
            // console.log(res.status);
            // console.log(res.data);
            return res;
        });
    },
    getTracks({ commit }) {
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/track`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            commit("settracks", res.data);
            // console.log(res.status);
            // console.log(res.data);
            return res;
        });
    },
    

};