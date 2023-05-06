var app = new Vue({
    el: '#app',
    data: {
        date: "01",
        months: 1,
        day: 0,
        characters: [
            "世间鲜有真可爱者，<br>你就是其中一个。",
            "希望你的心情能像星星一样，<br>常年闪闪发光偶尔躲躲乌云。",
            "难熬的日子总会过去，不信你回头看看，<br>你都已经在不知不觉中，熬过了很多苦难很棒吧。",
            "不是所有的坚持都会有结果，但你要相信，<br> 总有一些坚持会让冰封的土地绽放出千千万万朵怒放的蔷薇。",
            "待凛冬离去，雪融草青，<br>相信一定会有新的相逢将温暖延续。",
            "学会一个人生活不论身边是否有人疼爱，<br>做好自己该做的，有爱或无爱，都安然对待。",
            "心里藏着小星星，<br>生活才能亮晶晶。",
            "你未必万丈光芒，<br>但你温暖有光。",
            "不要顾虑太多，<br>做自己就好。",
            "温柔要有，但不是妥协，<br>我们要在安静中不慌不忙的坚强。",
        ],
        liveDesc: "",
        solarTerms:"",
        time:""
    },
    filters: {
        getWeek: function(dateString) {
            return "周" + "日一二三四五六".charAt(dateString);
        },
        getDate: function(dateString) {
            var date = dateString;
            if (date < 10) {
                date = "0" + date
            }
            return date;
        }
    },
    mounted() {
        let self = this;
        var myDate = new Date();
        self.months = myDate.getMonth() + 1;
        self.date = myDate.getDate();
        self.day = myDate.getDay();
        var num = Math.floor(Math.random() * 10);
        self.liveDesc = self.characters[num];
        self.time = myDate.getFullYear()+"-"+self.getDate(self.months)+"-"+self.getDate(self.date);
        self.solarTerms = self.getjq(myDate.getFullYear(), self.months, self.date)
    },
    methods: {
        getDate(dateString) {
            var date = dateString;
            if (date < 10) {
                date = "0" + date
            }
            return date;
        },
        getjq(yyyy, mm, dd) {
            mm = mm - 1;
            var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
            var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
            var solarTerms = "";
            //　　此方法是获取该日期是否为某节气
            //    var tmp1 = new Date((31556925974.7*(yyyy-1900)+sTermInfo[mm*2+1]*60000)+Date.UTC(1900,0,6,2,5));
            //    var tmp2 = tmp1.getUTCDate();
            //    if (tmp2==dd)
            //        solarTerms = solarTerm[mm*2+1];
            //    console.log(solarTerms);
            //    tmp1 = new Date((31556925974.7*(yyyy-1900)+sTermInfo[mm*2]*60000)+Date.UTC(1900,0,6,2,5));
            //    tmp2= tmp1.getUTCDate();
            //    if (tmp2==dd)
            //        solarTerms = solarTerm[mm*2];

            //　　此方法可以获取该日期处于某节气
            while (solarTerms == "") {
                var tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
                var tmp2 = tmp1.getUTCDate();
                if (tmp2 == dd) solarTerms = solarTerm[mm * 2 + 1];
                tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
                tmp2 = tmp1.getUTCDate();
                if (tmp2 == dd) solarTerms = solarTerm[mm * 2];
                if (dd > 1) {
                    dd = dd - 1;
                } else {
                    mm = mm - 1;
                    if (mm < 0) {
                        yyyy = yyyy - 1;
                        mm = 11;
                    }
                    dd = 31;
                }
            }
            return solarTerms;
        }
    }
})