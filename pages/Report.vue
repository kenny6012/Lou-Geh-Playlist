<template>
<div id="scrollrr" class="scrollrr">
    <div class="formCont">
        <section>
            <div class="formSection">
                <div class="formArticle">
                    <div class="formHeader">
                        <div class="centerAl">  <img class="formLogo" src="bfi_full.png" alt="applicant name"> </div>
                        <div class="centerAl"> <div class="formLabel"> REPORT FILE </div> </div>
                        <br>
                    </div>
                    <div class="formData">
                        <table class="formBorder">
                            <tr class="reportBorder">
                                <th width="20%">Title</th>
                                <th width="20%">Artist</th>
                                <th width="20%">Album</th>
                                <th width="5%">Plays</th>
                                <th width="5%">Duration</th>
                                <th width="20%">Last Played</th>
                            </tr>

                            <tr v-for="(data, r) in report_data" :key="'r'+r">
                                <td class="formAnswer noWrap" align="left">
                                    <b>{{ data.track_name }}</b>
                                </td>
                                <td class="formAnswer noWrap">
                                    <div class="rowPaddr">{{ data.artist_name }}</div>
                                </td>
                                <td class="formAnswer noWrap">
                                    <div class="rowPaddr">{{ data.album_name }}</div>
                                </td>
                                <td class="formAnswer" align="center">{{ data.numberofplays }}</td>
                                <td class="formAnswer" align="center">{{ data.track_length }}</td>
 
                                <td class="formAnswer noWrap" align="center">{{ data.lastplayed }}</td>
                            </tr>

                            <!-- <tr class="rowMargin"> <th colspan="7"><div class="spacr"></div></th> </tr>
                            <tr class="rowMargin"> <th colspan="7"><div class="spacr"></div></th> </tr>
                            <tr class="rowMargin"> <th colspan="7"><div class="spacr" align="center"><b>Report Summary</b></div></th> </tr>

                            <tr class="rowMargin">
                                <th colspan="1" class="formAnswer" align="left">
                                    <div class="rowPaddr">
                                        <b>Applicants with livestocks</b>
                                    </div>
                                </th>
                                <th colspan="1" class="formAnswer" align="left">
                                    <div class="rowPaddr">
                                        <b>:&ensp;{{ totalLivestock }}</b>
                                    </div>
                                </th>
                            </tr>
                            <tr class="rowMargin">
                                <th colspan="1" class="formAnswer" align="right">
                                    <div class="rowPaddr">
                                        <b>Willing to Travel (WTT)</b>
                                    </div>
                                </th>
                                <th colspan="1" class="formAnswer" align="right">
                                    <div class="rowPaddr">
                                        <b>:&ensp;{{ totalWTT }}</b>
                                    </div>
                                </th>
                            </tr>
                            <tr class="rowMargin">
                                <th colspan="1" class="formAnswer" align="left">
                                    <div class="rowPaddr">
                                        <b>Applicants per position</b>
                                    </div>
                                </th>
                                <th colspan="1" class="formAnswer" align="left">
                                    <div class="rowPaddr">
                                        <b>:&ensp;(examine the table below)</b>
                                    </div>
                                </th>
                            </tr>

                            <tr class="reportBorder">
                                <th colspan="1">No. of Applicants</th>
                                <th colspan="6">Positions</th>
                            </tr>

                            <tr v-for="(data, p) in positions" :key="'p'+p">
                                <td colspan="1" class="formAnswer" align="center">
                                    <div class="rowPaddr">
                                        {{ data.split('|')[0] }}
                                    </div>
                                </td>
                                <td colspan="6" class="formAnswer" align="left">
                                    <div class="rowPaddr">
                                        {{ data.split('|')[1] }}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="1" class="formAnswer" align="left">
                                    <div class="rowPaddr">
                                        <b>Total&ensp;: {{ totalApplicants }}</b>
                                    </div>
                                </td>
                                <td colspan="6" class="formAnswer" align="right">
                                    <div class="rowPaddr">
                                        <b>Total of {{ totalPositions }} positions</b>
                                    </div>
                                </td>
                            </tr> -->
                            
                        </table>

                        <!-- <div v-else>
                            Nothing to see here...
                        </div> -->
                    </div>
                </div>
            </div>
        </section>
    </div>

    <button id="printr" class="printr" @click="prints()">
        <font-awesome-icon icon="print" />
    </button>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
    data() {
        return {
            report_data: [],
            errorMess: ""
        }
    },
    methods: {
        prints() {
            document.getElementById("scrollrr").classList.remove("scrollrr");
            document.getElementById("printr").style.display = "none";
            window.print();
        },
    },
    created() {

        
        // var token = this.$route.query.token;
        // var stage = this.$route.query.stage;
        // var from = this.$route.query.from;
        // var to = this.$route.query.to;
        // var dep = this.$route.query.dep;
        // var pos = this.$route.query.pos;
        // var u_id = this.$route.query.user.split('_')[0];
        // var u_role = this.$route.query.user.split('_')[1];
        // var u_dep = this.$route.query.user.split('_')[2];
        // var u_team = this.$route.query.user.split('_')[3];


        // GET REPORT DATA
        axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/api/track`,
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(res => {
            // console.log("Test");
            var temp = res.data;
            temp.sort((a, b) => { return b.numberofplays - a.numberofplays; });
            this.report_data = temp;
        });

    },
    mounted() {
        // ADD SCROLLER
        window.addEventListener("afterprint", function() {
            document.getElementById("printr").style.display = "block";
            document.getElementById("scrollrr").classList.add("scrollrr");
        });

        // REMOVE SCROLLER (To automatically break pages)
        document.addEventListener("keydown", function(e) {
                // CTRL + P
                if (e.ctrlKey && e.keyCode == 80) {
                    document.getElementById("printr").style.display = "none";
                    document.getElementById("scrollrr").classList.remove("scrollrr");
                }
            },
            false
        );
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">

.formLogo {
    width: auto;
    height: 90px;
    -webkit-print-color-adjust: exact;
    // border: 1px solid red;
}
</style>