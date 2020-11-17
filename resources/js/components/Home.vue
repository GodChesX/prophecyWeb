<template>
    <div>
        <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
        <div class="container">
            <div class="text-center">
                <label style="font-size:40px"
                    ><strong>พยากรอากาศ ระดับภูมิภาค</strong></label
                >
                <div class="row">
                    <div class="col-sm-8">
                        <v-btn
                            class="red"
                            :disabled="activeBtn.all"
                            @click="getAllData(selectDate)"
                            style="width:91.5%;height:80px;margin-top:15px"
                        >
                            <label
                                style="color:#fff;margin-top:10px;font-size:20px"
                            >
                                ทั้งหมด
                            </label>
                        </v-btn>
                        <br />
                        <!-- <br /> -->
                        <v-btn
                            class="red"
                            :disabled="activeBtn.c"
                            @click="getProphecy('C')"
                            style="width:45%;margin-top:15px;height:60px"
                        >
                            <label style="color:#fff;margin-top:10px">
                                ภาคกลาง
                            </label>
                        </v-btn>
                        &nbsp;&nbsp;
                        <v-btn
                            class="red"
                            :disabled="activeBtn.n"
                            @click="getProphecy('N')"
                            style="width:45%;margin-top:15px;height:60px"
                        >
                            <label style="color:#fff;margin-top:10px">
                                ภาคเหนือ
                            </label>
                        </v-btn>
                        <br />
                        <v-btn
                            class="red"
                            :disabled="activeBtn.ne"
                            @click="getProphecy('NE')"
                            style="width:45%;margin-top:15px;height:60px"
                        >
                            <label style="color:#fff;margin-top:10px">
                                ภาคตะวันออกเฉียงเหนือ
                            </label>
                        </v-btn>
                        &nbsp;&nbsp;
                        <v-btn
                            class="red"
                            :disabled="activeBtn.e"
                            @click="getProphecy('E')"
                            style="width:45%;margin-top:15px;height:60px"
                        >
                            <label style="color:#fff;margin-top:10px">
                                ภาคตะวันออก
                            </label>
                        </v-btn>
                        <br />
                        <v-btn
                            class="red"
                            :disabled="activeBtn.s"
                            @click="getProphecy('S')"
                            style="width:45%;margin-top:15px;height:60px"
                        >
                            <label style="color:#fff;margin-top:10px">
                                ภาคใต้
                            </label>
                        </v-btn>
                        &nbsp;&nbsp;
                        <v-btn
                            class="red"
                            :disabled="activeBtn.w"
                            @click="getProphecy('W')"
                            style="width:45%;margin-top:15px;height:60px"
                        >
                            <label style="color:#fff;margin-top:10px">
                                ภาคตะวันตก
                            </label>
                        </v-btn>
                    </div>
                    <div class="col-sm-4">
                        <v-date-picker
                            v-model="selectDate"
                            @click:date="getDate"
                            :min="toDay"
                            :max="maxDate"
                            color="green"
                            header-color="green"
                            width="100%"
                        ></v-date-picker>
                    </div>
                </div>
                <div width="100%">
                    <BeeGridTable
                        :columns="columns"
                        :data="datas"
                        :showFilter="false"
                        :loading="loading"
                    ></BeeGridTable>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name: "Home",
    props: {},
    components: { Loading },
    data() {
        return {
            token:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ0NzkzODI0ZTY5ZTFkMmJjNDEwMzkyODBlODZjMGEyNmZhNGM5NDc0ZDRjMzJkOGNjYWMxMWJlMzdlNWRjNTM4NjIzNGYyNGQ0MzNjZWEyIn0.eyJhdWQiOiIyIiwianRpIjoiNDQ3OTM4MjRlNjllMWQyYmM0MTAzOTI4MGU4NmMwYTI2ZmE0Yzk0NzRkNGMzMmQ4Y2NhYzExYmUzN2U1ZGM1Mzg2MjM0ZjI0ZDQzM2NlYTIiLCJpYXQiOjE2MDU1OTIxODMsIm5iZiI6MTYwNTU5MjE4MywiZXhwIjoxNjM3MTI4MTgzLCJzdWIiOiIxMDkzIiwic2NvcGVzIjpbXX0.TxzaGSCbRmjRsu_zPB3m3AJZXsTbHomV5y1jX0wrOr_D0cBnP125hHOaDs-O-_orhWy_tSX74dK_vrOsI6Pk22g5r4H59BN-ONXuz6RtJ7T9yZzqXIIZ2F6h5wINH7Gpl5mLuCM6ZttLzJzUGUjMnTCgfmSjqdn9yRh6JwCVg1afI1sJvQVMOsXkAhs1BB4v4wrHstcTaV5vDtT6524_KzX8r0XqZ-3o3yLcDgg6sKRtqtprOv4VJt3AKMjTuCxwUFprQTgDUFVnOm2MEbwfYDExhjqo1UPs3Kz-X6Qk_w0iU1Tz1CtWqCY8Ey2kc9Q8Z4nyslYpx0KCGt4oZj2MpGUCOVpuA6sLjQKF04qx0Zer-_iDLhVdQcOi6AxAl9HeVw9thvxZRi36EkC6oCkksJtzXS2ELlbmCbImQRmpE0UIaTA-wgXZqeauUzlN2cqh50JtAqDlwkx8Aa3U9epj0k6_2R-cODep1OdXjdPOJG7MjYecgVMmNegg7WXS2a_nhXrGrEJdlpNxLJaza6-7EHMcPzlgKpHPMdgjbzmmIMnYY2CAg7LpYGQ3DkIogGA-l1IQ2QP6XqcC6snPG8l3LGgu0sUdAHWsyB2T7yxxUDNjHc2gA3G6yKVoFqQRYx30DpCAJqrxNBeIvqO9oZcY9T2LIjHnScdZFeCxm3vtlb0",
            API: "",
            fields: "tc_max,tc_min,rh,ws10m,rain,cond,wd10m,psfc",
            region: ["C", "N", "NE", "E", "S", "W"],
            data: [],
            selectDate: new Date().toISOString().substr(0, 10),
            toDay: new Date().toISOString().substr(0, 10),
            activeBtn: {
                all: true,
                c: false,
                n: false,
                ne: false,
                e: false,
                s: false,
                w: false
            },
            columns: [
                {
                    title: "จังหวัด",
                    key: "province",
                    align: "center",
                    resizable: true,
                    sortable: true
                    // width: "100%"
                },
                {
                    title: "อุณหภูมิ (°C)",
                    align: "center",
                    children: [
                        {
                            title: "สูงสุด",
                            key: "tc_max",
                            align: "center",
                            // width: "100%",
                            sortable: true
                        },
                        {
                            title: "ต่ำสุด",
                            key: "tc_min",
                            align: "center",
                            // width: "100%",
                            sortable: true
                        }
                    ]
                },
                {
                    title: "ความเร็วลม (m/s)",
                    key: "ws10m",
                    align: "center",
                    resizable: true
                    // width: "100%"
                },
                {
                    title: "ความชื้นสัมพัทธเฉลี่ย (%)",
                    key: "rh",
                    align: "center"
                    // width: "100%"
                },
                {
                    title: "ปริมาณฝน (mm)",
                    key: "rain",
                    align: "center"
                    // width: "100%"
                },
                {
                    title: "สภาพอากาศโดยทั่วไป",
                    key: "cond",
                    align: "center"
                    // width: "100%"
                }
            ],
            datas: [],
            isLoading: false,
            fullPage: true,
            loading: true
        };
    },
    async created() {
        // console.log(this.data + "fasdfas");
    },
    async mounted() {
        // var toDay = new Date();
        // this.selectDate = toDay;
        this.API = axios.create({
            baseURL:
                "https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/",
            headers: {
                // "Content-Type": "application/json",
                Authorization: this.token,
                Accept: "application/json"
            },
            timeout: 85000
        });
        await this.getAllData();
    },
    methods: {
        async getDate(date) {
            // alert(`You have just double clicked the following date: ${date}`);
            console.log(date);
            if (this.activeBtn.all) {
                // this.isLoading = true;
                await this.getAllData(date);
            } else {
                // this.isLoading = true;
                if (this.activeBtn.c) {
                    await this.getProphecy("C");
                } else if (this.activeBtn.n) {
                    await this.getProphecy("N");
                } else if (this.activeBtn.ne) {
                    await this.getProphecy("NE");
                } else if (this.activeBtn.e) {
                    await this.getProphecy("E");
                } else if (this.activeBtn.s) {
                    await this.getProphecy("S");
                } else if (this.activeBtn.w) {
                    await this.getProphecy("W");
                }
            }
        },
        async getAllData(date) {
            this.isLoading = true;
            // var toDay = new Date();
            this.activeBtn.all = true;
            this.activeBtn.c = false;
            this.activeBtn.n = false;
            this.activeBtn.ne = false;
            this.activeBtn.e = false;
            this.activeBtn.s = false;
            this.activeBtn.w = false;
            this.datas = [];
            var setdate;
            // console.log(date);
            if (date) {
                setdate = date;
            } else {
                setdate = this.selectDate;
            }
            // var date =
            //     toDay.getFullYear() +
            //     "-" +
            //     (toDay.getMonth() + 1) +
            //     "-" +
            //     toDay.getDate();
            var count = 0;
            await this.region.forEach(async e => {
                // this.loading = true;
                await this.API.get(
                    "/region?region=" +
                        e +
                        "&date=" +
                        setdate +
                        "&fields=" +
                        this.fields
                ).then(
                    response => {
                        console.log("res", response.data);
                        response.data.WeatherForecasts.forEach(e => {
                            let cond;
                            if (e.forecasts[0].data.cond == 1) {
                                cond = "ท้องฟ้าแจ่มใส";
                            } else if (e.forecasts[0].data.cond == 2) {
                                cond = "มีเมฆบางส่วน";
                            } else if (e.forecasts[0].data.cond == 3) {
                                cond = "เมฆเป็นส่วนมาก";
                            } else if (e.forecasts[0].data.cond == 4) {
                                cond = "มีเมฆมาก";
                            } else if (e.forecasts[0].data.cond == 5) {
                                cond = "ฝนตกเล็กน้อย";
                            } else if (e.forecasts[0].data.cond == 6) {
                                cond = "ฝนปานกลาง";
                            } else if (e.forecasts[0].data.cond == 7) {
                                cond = "ฝนตกหนัก";
                            } else if (e.forecasts[0].data.cond == 8) {
                                cond = "ฝนฟ้าคะนอง";
                            } else if (e.forecasts[0].data.cond == 9) {
                                cond = "อากาศหนาวจัด";
                            } else if (e.forecasts[0].data.cond == 10) {
                                cond = "อากาศหนาว";
                            } else if (e.forecasts[0].data.cond == 11) {
                                cond = "อากาศเย็น";
                            } else if (e.forecasts[0].data.cond == 12) {
                                cond = "อากาศร้อนจัด";
                            }
                            this.datas.push({
                                province: e.location.name,
                                tc_max: e.forecasts[0].data.tc_max,
                                tc_min: e.forecasts[0].data.tc_min,
                                ws10m: e.forecasts[0].data.ws10m,
                                rh: e.forecasts[0].data.rh,
                                rain: e.forecasts[0].data.rain,
                                cond: cond
                            });
                        });
                    },
                    response => {
                        console.log("error", response);
                    }
                );
                count += 1;
                if (count === this.region.length) {
                    this.loading = false;
                    this.isLoading = false;
                }
            });
            // await console.log(this.data + "fasdfas");
        },
        async getProphecy(region) {
            this.isLoading = true;
            this.datas = [];
            if (region === "C") {
                this.activeBtn.all = false;
                this.activeBtn.c = true;
                this.activeBtn.n = false;
                this.activeBtn.ne = false;
                this.activeBtn.e = false;
                this.activeBtn.s = false;
                this.activeBtn.w = false;
            } else if (region === "N") {
                this.activeBtn.all = false;
                this.activeBtn.c = false;
                this.activeBtn.n = true;
                this.activeBtn.ne = false;
                this.activeBtn.e = false;
                this.activeBtn.s = false;
                this.activeBtn.w = false;
            } else if (region === "NE") {
                this.activeBtn.all = false;
                this.activeBtn.c = false;
                this.activeBtn.n = false;
                this.activeBtn.ne = true;
                this.activeBtn.e = false;
                this.activeBtn.s = false;
                this.activeBtn.w = false;
            } else if (region === "E") {
                this.activeBtn.all = false;
                this.activeBtn.c = false;
                this.activeBtn.n = false;
                this.activeBtn.ne = false;
                this.activeBtn.e = true;
                this.activeBtn.s = false;
                this.activeBtn.w = false;
            } else if (region === "S") {
                this.activeBtn.all = false;
                this.activeBtn.c = false;
                this.activeBtn.n = false;
                this.activeBtn.ne = false;
                this.activeBtn.e = false;
                this.activeBtn.s = true;
                this.activeBtn.w = false;
            } else if (region === "W") {
                this.activeBtn.all = false;
                this.activeBtn.c = false;
                this.activeBtn.n = false;
                this.activeBtn.ne = false;
                this.activeBtn.e = false;
                this.activeBtn.s = false;
                this.activeBtn.w = true;
            }
            await this.API.get(
                "/region?region=" +
                    region +
                    "&date=" +
                    this.selectDate +
                    "&fields=" +
                    this.fields
            ).then(
                response => {
                    console.log("res", response);
                    response.data.WeatherForecasts.forEach(e => {
                        let cond;
                        if (e.forecasts[0].data.cond == 1) {
                            cond = "ท้องฟ้าแจ่มใส";
                        } else if (e.forecasts[0].data.cond == 2) {
                            cond = "มีเมฆบางส่วน";
                        } else if (e.forecasts[0].data.cond == 3) {
                            cond = "เมฆเป็นส่วนมาก";
                        } else if (e.forecasts[0].data.cond == 4) {
                            cond = "มีเมฆมาก";
                        } else if (e.forecasts[0].data.cond == 5) {
                            cond = "ฝนตกเล็กน้อย";
                        } else if (e.forecasts[0].data.cond == 6) {
                            cond = "ฝนปานกลาง";
                        } else if (e.forecasts[0].data.cond == 7) {
                            cond = "ฝนตกหนัก";
                        } else if (e.forecasts[0].data.cond == 8) {
                            cond = "ฝนฟ้าคะนอง";
                        } else if (e.forecasts[0].data.cond == 9) {
                            cond = "อากาศหนาวจัด";
                        } else if (e.forecasts[0].data.cond == 10) {
                            cond = "อากาศหนาว";
                        } else if (e.forecasts[0].data.cond == 11) {
                            cond = "อากาศเย็น";
                        } else if (e.forecasts[0].data.cond == 12) {
                            cond = "อากาศร้อนจัด";
                        }
                        this.datas.push({
                            province: e.location.name,
                            tc_max: e.forecasts[0].data.tc_max,
                            tc_min: e.forecasts[0].data.tc_min,
                            ws10m: e.forecasts[0].data.ws10m,
                            rh: e.forecasts[0].data.rh,
                            rain: e.forecasts[0].data.rain,
                            cond: cond
                        });
                    });
                },
                response => {
                    console.log("error", response);
                }
            );
            this.loading = false;
            this.isLoading = false;
        }
    },
    computed: {
        maxDate() {
            var date = new Date();
            date.setDate(date.getDate() + 6);
            return date.toISOString();
        }
    },
    watch: {
        data: {
            handler(newVal, oldVal) {
                if (newVal) {
                }
            }
        }
    }
};
</script>
<style scoped></style>
