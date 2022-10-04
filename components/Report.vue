<template>
<div id="scrollrr" class="scrollrr">
    <div class="formCont">
        <section>
            <div class="formSection">
                <div class="formArticle">
                    <div class="formHeader">
                        <div class="centerAl">  <img class="formLogo" src="/logos/bfi_full.png" alt="applicant name"> </div>
                        <div class="centerAl"> <div class="formLabel"> REPORT FILE</div> </div>
                        <div class="centerAl"> <div class="formSub"> {{ stager }} </div> </div>
                        <br>
                    </div>
                    <div class="formData">
                        <table class="formBorder">
                            <tr class="reportBorder">
                                <th width="20%">Application Date</th>
                                <th width="20%">Applicant</th>
                                <th width="20%">Contacts</th>
                                <th width="5%">Livetstock</th>
                                <th width="5%">WTT</th>
                                <!-- <th>Exam dates</th> --> 
                                <th width="20%">Assessment Schedule</th>
                            </tr>

                            <tr v-for="(data, r) in report_data" :key="'r'+r" :class="(String(data.date_received) != 'null' ? '':'redr')">
                                <td class="formAnswer noWrap" align="center">
                                    <b>
                                    <div v-if="String(data.date_received) != 'null'">
                                        {{ new Date(String(data.date_received).split("T")[0]).toLocaleString("default", { month: "long" }) }}
                                        {{ new Date(String(data.date_received).split("T")[0]).getDate() }},
                                        {{ new Date(String(data.date_received).split("T")[0]).getFullYear() }}
                                    </div>
                                    </b>
                                </td>
                                <td class="formAnswer noWrap">
                                    <div class="rowPaddr">
                                        <div><b>{{ data.name }}</b></div>
                                        <div>{{ data.position }}</div>
                                    </div>
                                </td>
                                <td class="formAnswer noWrap">
                                    <div class="rowPaddr">
                                        <div>{{ data.mobile }}</div>
                                        <div>{{ data.email }}</div>
                                    </div>
                                </td>
                                <td class="formAnswer" align="center">{{ data.livestock }}</td>
                                <td class="formAnswer" align="center">{{ data.willing_to_travel }}</td>
                                <!-- <td class="formAnswer noWrap">
                                    <div class="rowPaddr" v-if="data.onlineExamEndDate != undefined">
                                        <div> From&ensp;:&ensp;
                                            {{ new Date(String(data.onlineExamStartDate).split("T")[0]).toLocaleString("default", { month: "long" }) }}
                                            {{ new Date(String(data.onlineExamStartDate).split("T")[0]).getDate() }},
                                            {{ new Date(String(data.onlineExamStartDate).split("T")[0]).getFullYear() }}
                                        </div>
                                        <div> To&ensp;:&ensp;
                                            {{ new Date(String(data.onlineExamEndDate).split("T")[0] ).toLocaleString("default", { month: "long" }) }}
                                            {{ new Date(String(data.onlineExamEndDate).split("T")[0]).getDate() }},
                                            {{ new Date(String(data.onlineExamEndDate).split("T")[0]).getFullYear() }}
                                        </div>
                                    </div>
                                </td> -->
                                <td class="formAnswer noWrap" align="center">
                                    <div v-if="String(data.date_assessment) != 'null'">
                                        {{ new Date(String(data.date_assessment).split("T")[0]).toLocaleString("default", { month: "long" }) }}
                                        {{ new Date(String(data.date_assessment).split("T")[0]).getDate() }},
                                        {{ new Date(String(data.date_assessment).split("T")[0]).getFullYear() }}
                                    </div>
                                </td>
                            </tr>

                            <tr class="rowMargin"> <th colspan="7"><div class="spacr"></div></th> </tr>
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
                            </tr>
                            
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
        <fa :icon="['fa', 'print']" />
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
            stager: "",
            url_stage: "",
            errorMess: ""
        }
    },
    methods: {
        prints() {
            document.getElementById("scrollrr").classList.remove("scrollrr");
            document.getElementById("printr").style.display = "none";
            window.print();
        },
        getData_byDates(token, from, to, u_dep, u_team, u_id, u_role) {
            // WITH OR WITHOUT DATES (without dates returns all the data)
            axios({
                method: "POST",
                url: `${this.$axios.defaults.baseURL}/users/${this.url_stage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    id: u_id,
                    role: u_role,
                    deptID: u_dep,
                    teamID: u_team,
                    dateFrom: from,
                    dateTo: to,
                }
            }).then(
                res => {
                    this.report_data = res.data[Object.keys(res.data)[0]];
                },
                error => {
                    console.log(error);
                }
            );
        },
        getData_byDep(token, dep, pos) {
            // FILTER BY DEPARTMENT AND POSITION ONLY
            axios({
                method: "GET",
                url: `${this.$axios.defaults.baseURL}/users/${this.url_stage}/filter/${dep}/${pos}`,
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(
                res => {
                    this.report_data = res.data[Object.keys(res.data)[0]];
                },
                error => {
                    console.log(error);
                }
            );
        },
        getData_byPos_byDates(token, from, to, pos) {
            // FILTER BY POSITION AND DATES
            axios({
                method: "GET",
                url: `${this.$axios.defaults.baseURL}/users/${this.url_stage}/get?posid=${pos}&from=${from}&to=${to}`,
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(
                res => {
                    this.report_data = res.data[Object.keys(res.data)[0]];
                },
                error => {
                    console.log(error);
                }
            );
        },
        evaluate(token, from, to, dep, pos, u_id, u_role, u_dep, u_team) {
            console.log("======================================");
            console.log("EVALUATE");
            console.log("======================================");
            // console.log("toke: " + token);
            console.log("from: " + from);
            console.log("to: " + to);
            console.log("dep: " + dep);
            console.log("pos: " + pos);
            console.log("u_id: " + u_id);
            console.log("u_role: " + u_role);
            console.log("u_dep: " + u_dep);
            console.log("u_team: " + u_team);
            console.log("url_stage: " + this.url_stage);
            console.log("======================================");

            if(from == "" || to == "") {
                // WITHOUT DATES
                console.log("======================================");
                console.log("No Dates");
                console.log("======================================");
                if(dep == "" && pos == "") {
                    console.log("No Department & Position filter");
                    // GET ALL DATA
                    this.getData_byDates(token, from, to, u_dep, u_team, u_id, u_role);
                }
                else {
                    console.log("department: "+dep);
                    console.log("position: "+pos);
                    // GET DATA BY DEPARTMENT AND POSITION
                    this.getData_byDep(token, dep, pos);
                }
                console.log("======================================");
            }
            else {
                // WITH DATES
                console.log("======================================");
                console.log("With Dates");
                console.log("======================================");
                console.log("from: " + from);
                console.log("to: " + to);

                if(dep == "" && pos == "") {
                    console.log("No Department & Position filter");
                    // GET DATA BY DATES ONLY
                    this.getData_byDates(token, from, to, u_dep, u_team, u_id, u_role);
                }
                else {
                    console.log("department: "+dep);
                    console.log("position: "+pos);
                    // GET DATA BY DATES AND POSITION
                    // this.getData_byDates(token, from, to, u_dep, u_team, u_id, u_role);
                    this.getData_byPos_byDates(token, from, to, pos)
                }
                console.log("======================================");
            }
        }
    },
    created() {
        var token = this.$route.query.token;
        var stage = this.$route.query.stage;
        var from = this.$route.query.from;
        var to = this.$route.query.to;
        var dep = this.$route.query.dep;
        var pos = this.$route.query.pos;
        var u_id = this.$route.query.user.split('_')[0];
        var u_role = this.$route.query.user.split('_')[1];
        var u_dep = this.$route.query.user.split('_')[2];
        var u_team = this.$route.query.user.split('_')[3];

        if(from == "none" && to == "none") {
            from = "";
            to = "";
        }
        if(dep == "none" && pos == "none") {
            dep = "";
            pos = "";
        }
        if(from == to) {
            from = "";
            to = "";
        }

        // console.log("======================================");
        // console.log("DATA PASSED");
        // console.log("======================================");
        // console.log("toke: " + token);
        // console.log("stage: " + stage);
        // console.log("from: " + from);
        // console.log("to: " + to);
        // console.log("dep: " + dep);
        // console.log("pos: " + pos);
        // console.log("u_id: " + u_id);
        // console.log("u_role: " + u_role);
        // console.log("u_dep: " + u_dep);
        // console.log("u_team: " + u_team);
        // console.log("======================================");

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

        // GET DATA FROM STATE
        if(stage == "keptForReference") {
            console.log("keptForReference");
            this.stager = "Kept for Reference";
            this.url_stage = "kept-reference";
            // EVALUATE DATA
            this.evaluate(token, from, to, dep, pos, u_id, u_role, u_dep, u_team);
        }
        else if(stage == "deployed") {
            console.log("deployed");
            this.stager = "Deployed Applicants";
            this.url_stage = "deployed";
            // EVALUATE DATA
            this.evaluate(token, from, to, dep, pos, u_id, u_role, u_dep, u_team);
        }
        else if(stage == "blacklisted") {
            console.log("blacklisted");
            this.stager = "Blacklisted Applicants";
            this.url_stage = "blacklisted";
            // EVALUATE DATA
            this.evaluate(token, from, to, dep, pos, u_id, u_role, u_dep, u_team);
        }
        else if(stage == "rejected") {
            console.log("rejected");
            this.stager = "Rejected Applicants";
            this.url_stage = "rejected";
            // EVALUATE DATA
            this.evaluate(token, from, to, dep, pos, u_id, u_role, u_dep, u_team);
        }
    },
    computed: {
        totalApplicants() {
            return this.report_data.length;
        },
        totalWTT() {
            var cnt = 0;
            for(var c=0; c < this.report_data.length; c++) {
                var word = String(this.report_data[c].willing_to_travel).toLowerCase();
                if(word.includes('yes') && word.length == 3) {
                    cnt = cnt + 1;
                }
            }
            return cnt;
        },
        totalLivestock() {
            var cnt2 = 0;
            for(var c=0; c < this.report_data.length; c++) {
                var word = String(this.report_data[c].livestock).toLowerCase();
                if(word.includes('no') || word.includes('/a') || word == 'na') {
                    cnt2 = cnt2 + 1;
                    // console.log(cnt2 +" - "+ word);
                }
            }
            return parseInt(this.report_data.length) - parseInt(cnt2);
        },
        totalPositions() {
            return this.positions.length;
        },
        positions() {
            var cnt = [];
            for(var c=0; c < this.report_data.length; c++) {
                this.report_data[c].position;
                var counter = 0;
                for(var x=0; x < this.report_data.length; x++) {
                    if(this.report_data[c].position.includes(this.report_data[x].position)) {
                        counter = counter + 1;
                        cnt[c] = counter + '|' + this.report_data[x].position;
                    }
                }
            }
            // console.log(cnt);
            let uniq = [...new Set(cnt)];
            return uniq;
        }
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