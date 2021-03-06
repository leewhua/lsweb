// var thechartmap;
var timer1 = null;
var _width = window.screen.width;
var _height = window.screen.height;
$(document).ready(function () {
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
    $('#total-number').height($('#today-number').height());
    $('.prizes-number').height($('#today-number').height());
    $('.join-number').height($('.join-number').find('.front').height());
    $(window).resize(function () {
        if(thechart != null){
            thechart.resize();
        }
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
        $('#total-number').height($('#today-number').height());
        $('.prizes-number').height($('#today-number').height());
        $('.join-number').height($('.join-number').find('.front').height());
    });

    checkScreen();
    //header 日期
    setInterval(function () {
        var dateNow = new Date();
        var dateYear = dateNow.getFullYear();
        var dateMonth = dateNow.getMonth() + 1;
        var dateDate = dateNow.getDate();
        var dateHours = dateNow.getHours();
        var dateMinutes = dateNow.getMinutes();
        var dateSeconds = dateNow.getSeconds();
        var output = dateYear + '.' + (dateMonth < 10 ? "0" : "" ) + dateMonth + '.' + (dateDate < 10 ? "0" : "") + dateDate + ' ' + dateHours + ':' + dateMinutes + ':' + dateSeconds;
        $('#DATE').html(output);
    },1000);

});
    var params={
        "from":"wx",
        "pc":"c",
        "province":"all",
        "city":"all",
        "begin":"",
        "end":"",
        "gender":"all",
        "activity":"all",
        "product":"all"
    };

function checkScreen(){
            setTimeout(function () {
                post("/rt", {}, function (res) {
                    console.log(res);

                    firstUpdataData(".wxtodayscanusers", res.wxtodayscanusers);
                    firstUpdataData(".wxtodayscans", res.wxtodayscans);
                    firstUpdataData(".wxscan", res.wxscan);
                    firstUpdataData(".wxtotalprizeusers", res.wxtotalprizeusers);
                    firstUpdataData(".wxtotalprizes", res.wxtotalprizes);
                    firstUpdataData(".wxtotalprizetimes", res.wxtotalprizetimes);

                    setTimeout(function () {
                        //设置日期 一年之内
                        var myDate = new Date(); //获取今天日期
                        myDate.setDate(myDate.getDate() - 365);
                        var time1 = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();//time1表示当前时间
                        post("/tr", {
                            "begin": time1,
                            "from": "wx",
                            "pc": "p",
                            "province": "all",
                            "city": "all",
                            "end": "",
                            "gender": "all",
                            "activity": "all",
                            "product": "all"
                        }, function (res) {
                             // console.log(res);
                            // console.log(res.data.罗志祥签名照片);
                            for(x in res.data){
                                var sum = 0;
                                var arr = res.data[x];
                                // console.log(arr.length);
                                if(x != "legend" && x != "xaxis"){
                                    for (var i=0; i<arr.length; i++){
                                        sum += arr[i];
                                    }
                                    // console.log(x + ": " +sum);
                                    var numLi = "<li>"+ x + ": " + sum;
                                    $('#dataList ul').append(numLi);
                                }

                            }

                            setTimeout(function () {
                                refresh(params);
                            },310);
                        });

                    },310);

                    timer1 = setInterval(function () {
                        console.log("setInterval");
                        post("/rt", {}, function (res) {

                            updateData(".wxtodayscanusers", res.wxtodayscanusers);
                            updateData(".wxtodayscans", res.wxtodayscans);
                            updateData(".wxscan", res.wxscan);
                            updateData(".wxtotalprizeusers", res.wxtotalprizeusers);
                            updateData(".wxtotalprizes", res.wxtotalprizes);
                            updateData(".wxtotalprizetimes", res.wxtotalprizetimes);
                        });
                    }, 10000);
                });
            },310);
        // }
    }

function firstUpdataData(classname, data) {
    // console.log("name: " + classname);
    // var newData  = data.classname;
    $(classname).siblings('.new-data').html(data);
    if( $(classname).html() != $(classname).siblings('.new-data').html()){
        $(classname).animate({
            "top": "12px",
            "opacity": "0"
        }, 300, function () {
            $(this).css("top", "82px");
            $(this).html("");
            // $('.new-data').show();
            $(classname).siblings('.new-data').animate({
                "top": "42px",
                "opacity": "1"
            }, 300);
        });

    }
}

function updateData(classname, res) {
    // alert($(classname).html() + ", " + res);
    if($(classname).html() != res && $(classname).html() != "" || $(classname).siblings('.new-data').html() != res ) {
        // newDataName = res;
        if ($(classname).html() == "") {
            $(classname).html(res);
                $(classname).siblings('.new-data').animate({
                    "top": "12px",
                    "opacity": "0"
                }, 300, function () {
                    $(this).html("");
                    $(this).css("top", "82px");
                    $(this).siblings('.fontSize').animate({
                        "top": "42px",
                        "opacity": "1"
                    }, 300);
                });
        }else if ($(classname).siblings('.new-data').html() == "") {
            $(classname).siblings('.new-data').html(res);
                $(classname).animate({
                    "top": "12px",
                    "opacity": "0"
                }, 300, function () {
                    $(this).html("");
                    $(this).css("top", "82px");
                    $(this).siblings('.new-data').animate({
                        "top": "42px",
                        "opacity": "1"
                    }, 300);
                });
        }
    }
}

var thechart = null;
function refresh(params){
    $("#map").children().remove();
    if (params.pc=="p"){
        $.get('3rdjs/china.json',
            function(chinaJson) {
                echarts.registerMap('china', chinaJson);
               thechart = echarts.init(document.getElementById('map'));
                var theoption = {
                    title : {
                        text: '省级行政区分布',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        x:'right',
                        data:['参与人次']
                    },
                    // dataRange: {
                    //     min: 0,
                    //     max: 30000,
                    //     x: 'left',
                    //     y: 'bottom',
                    //     text:['高','低'],
                    //     calculable : true
                    // },
                    toolbox: {
                        show: true,
                        orient : 'vertical',
                        x: 'right',
                        y: 'center',
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    roamController: {
                        show: true,
                        x: 'right',
                        mapTypeControl: {
                            'china': true
                        }
                    },
                    series : [
                        {
                            name: '参与人次',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:[]
                        }
                    ]
                };
                thechart.showLoading();
                post("/c", params, function(res){
                    console.log(res);
                    thechart.hideLoading();
                    var total = 0;
                    for (var i=0;i<res.data.length;i++){
                        if (res.data[i].name.indexOf("省", res.data[i].name.length - "省".length) !== -1||
                            res.data[i].name.indexOf("市", res.data[i].name.length - "市".length) !== -1){
                            res.data[i].name=res.data[i].name.slice(0, res.data[i].name.length-1);
                        }
                        if (res.data[i].name.indexOf("自治区", res.data[i].name.length - "自治区".length) !== -1){
                            res.data[i].name=res.data[i].name.slice(0, res.data[i].name.length-3);
                        }
                        if (res.data[i].name.indexOf("特别行政区", res.data[i].name.length - "特别行政区".length) !== -1){
                            res.data[i].name=res.data[i].name.slice(0, res.data[i].name.length-5);
                        }
                        total+=res.data[i].value;
                    }
                    theoption.series[0].data=res.data;
                    theoption.title.text=res.begin+"到"+res.end+"期间省级行政区总参与人次："+total+"("+($("input[name='from']:checked").val()=="wx"?"微信":"支付宝")+")";
                    thechart.setOption(theoption, true);
                });
            }
        );
    } else {
        $.get('3rdjs/china.json',
            function(chinaJson) {
                echarts.registerMap('china', chinaJson);
                thechart = echarts.init(document.getElementById('map'));
                var theoption = {
                    title: {
                        subtext: '',
                        sublink: '',
                        x:'left',
                        textStyle: {
                            //color: '#149e7a',
                            //fontSize:16
                        },
                        left : 'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: function(obj){
                            return obj.seriesName+"<br>"+obj.name+":"+obj.value[2];
                        }
                    },
                    // dataRange: {
                    //     min: 0,
                    //     max: 30000,
                    //     x: 'left',
                    //     y: 'bottom',
                    //     text:['高','低'],
                    //     calculable : true
                    // },
                    // toolbox: {
                    //     show : true,
                    //     orient : 'vertical',
                    //     x: 'right',
                    //     y: 'center',
                    //     feature : {
                    //         mark : {show: true},
                    //         dataView : {show: true, readOnly: false},
                    //         restore : {show: true},
                    //         saveAsImage : {show: true}
                    //     }
                    // },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#4961e5',
                                borderColor: '#16213c'
                            },
                            emphasis: {
                                areaColor: '#4d4bd1'
                            }
                        }
                    },
                    series : [
                        {
                            name: '参与人次',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: [],
                            symbolSize: function (val) {
                                if (val[2]>10000){
                                    return 20;
                                }
                                if (val[2]>5000){
                                    return 18;
                                }
                                if (val[2]>1000){
                                    return 16;
                                }
                                if (val[2]>500){
                                    return 14;
                                }
                                if (val[2]>100){
                                    return 12;
                                }
                                if (val[2]>10){
                                    return 10;
                                }
                                return val[2];
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#e4f4fd'
                                }
                            }
                        }
                    ]
                };
                thechart.showLoading();
                post("/c", params, function(res){
                    // console.log("1111111111111");
                    // console.log(res);
                    thechart.hideLoading();

                    var total = 0;
                    for (var i=0;i<res.data.length;i++){
                        if (res.data[i].name.indexOf("省", res.data[i].name.length - "省".length) !== -1||
                            res.data[i].name.indexOf("市", res.data[i].name.length - "市".length) !== -1){
                            res.data[i].name=res.data[i].name.slice(0, res.data[i].name.length-1);
                        }
                        if (res.data[i].name.indexOf("自治区", res.data[i].name.length - "自治区".length) !== -1){
                            res.data[i].name=res.data[i].name.slice(0, res.data[i].name.length-3);
                        }
                        if (res.data[i].name.indexOf("特别行政区", res.data[i].name.length - "特别行政区".length) !== -1){
                            res.data[i].name=res.data[i].name.slice(0, res.data[i].name.length-5);
                        }
                        total+=res.data[i].value;
                    }
                    theoption.series[0].data=convertData(res.data);
                    // theoption.title.text=res.begin+"到"+res.end+"期间全国城市总参与人次："+total+"("+($("input[name='from']:checked").val()=="wx"?"微信":"支付宝")+")";
                    thechart.setOption(theoption, true);
                    // if(_width > _height || _width >= 768){
                        thechart.on(echartsConfig.EVENT.CLICK, function (param){
                            _width = window.screen.width;
                            _height = window.screen.height;
                            if(_width > _height || _width >= 768){
                                if (geoCoordMap[param.name]){
                                    // alert(param.name);
                                    init(param.name,7);
                                } else {
                                    init(param.name,7);
                                }
                            }
                        });
                    // }

                    setTimeout(function () {
                        FunOption1();
                    },310);
                });
            }
        );
    }
}

function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
}
var geoCoordMap = {
    '海门':[121.15,31.89],
    '鄂尔多斯':[109.781327,39.608266],
    '招远':[120.38,37.35],
    '舟山':[122.207216,29.985295],
    '齐齐哈尔':[123.97,47.33],
    '盐城':[120.13,33.38],
    '赤峰':[118.87,42.28],
    '青岛':[120.33,36.07],
    '乳山':[121.52,36.89],
    '金昌':[102.188043,38.520089],
    '泉州':[118.58,24.93],
    '莱西':[120.53,36.86],
    '日照':[119.46,35.42],
    '胶南':[119.97,35.88],
    '南通':[121.05,32.08],
    '拉萨':[91.11,29.97],
    '云浮':[112.02,22.93],
    '梅州':[116.1,24.55],
    '文登':[122.05,37.2],
    '上海':[121.48,31.22],
    '攀枝花':[101.718637,26.582347],
    '威海':[122.1,37.5],
    '承德':[117.93,40.97],
    '厦门':[118.1,24.46],
    '汕尾':[115.375279,22.786211],
    '潮州':[116.63,23.68],
    '丹东':[124.37,40.13],
    '太仓':[121.1,31.45],
    '曲靖':[103.79,25.51],
    '烟台':[121.39,37.52],
    '福州':[119.3,26.08],
    '瓦房店':[121.979603,39.627114],
    '即墨':[120.45,36.38],
    '抚顺':[123.97,41.97],
    '玉溪':[102.52,24.35],
    '张家口':[114.87,40.82],
    '阳泉':[113.57,37.85],
    '莱州':[119.942327,37.177017],
    '湖州':[120.1,30.86],
    '汕头':[116.69,23.39],
    '昆山':[120.95,31.39],
    '宁波':[121.56,29.86],
    '湛江':[110.359377,21.270708],
    '揭阳':[116.35,23.55],
    '荣成':[122.41,37.16],
    '连云港':[119.16,34.59],
    '葫芦岛':[120.836932,40.711052],
    '常熟':[120.74,31.64],
    '东莞':[113.75,23.04],
    '河源':[114.68,23.73],
    '淮安':[119.15,33.5],
    '泰州':[119.9,32.49],
    '南宁':[108.33,22.84],
    '营口':[122.18,40.65],
    '惠州':[114.4,23.09],
    '江阴':[120.26,31.91],
    '蓬莱':[120.75,37.8],
    '韶关':[113.62,24.84],
    '嘉峪关':[98.289152,39.77313],
    '广州':[113.23,23.16],
    '延安':[109.47,36.6],
    '太原':[112.53,37.87],
    '清远':[113.01,23.7],
    '中山':[113.38,22.52],
    '昆明':[102.73,25.04],
    '寿光':[118.73,36.86],
    '盘锦':[122.070714,41.119997],
    '长治':[113.08,36.18],
    '深圳':[114.07,22.62],
    '珠海':[113.52,22.3],
    '宿迁':[118.3,33.96],
    '咸阳':[108.72,34.36],
    '铜川':[109.11,35.09],
    '平度':[119.97,36.77],
    '佛山':[113.11,23.05],
    '海口':[110.35,20.02],
    '江门':[113.06,22.61],
    '章丘':[117.53,36.72],
    '肇庆':[112.44,23.05],
    '大连':[121.62,38.92],
    '临汾':[111.5,36.08],
    '吴江':[120.63,31.16],
    '石嘴山':[106.39,39.04],
    '沈阳':[123.38,41.8],
    '苏州':[120.62,31.32],
    '茂名':[110.88,21.68],
    '嘉兴':[120.76,30.77],
    '长春':[125.35,43.88],
    '胶州':[120.03336,36.264622],
    '银川':[106.27,38.47],
    '张家港':[120.555821,31.875428],
    '三门峡':[111.19,34.76],
    '锦州':[121.15,41.13],
    '南昌':[115.89,28.68],
    '柳州':[109.4,24.33],
    '三亚':[109.511909,18.252847],
    '自贡':[104.778442,29.33903],
    '吉林':[126.57,43.87],
    '阳江':[111.95,21.85],
    '泸州':[105.39,28.91],
    '西宁':[101.74,36.56],
    '宜宾':[104.56,29.77],
    '呼和浩特':[111.65,40.82],
    '成都':[104.06,30.67],
    '大同':[113.3,40.12],
    '镇江':[119.44,32.2],
    '桂林':[110.28,25.29],
    '张家界':[110.479191,29.117096],
    '宜兴':[119.82,31.36],
    '北海':[109.12,21.49],
    '西安':[108.95,34.27],
    '金坛':[119.56,31.74],
    '东营':[118.49,37.46],
    '牡丹江':[129.58,44.6],
    '遵义':[106.9,27.7],
    '绍兴':[120.58,30.01],
    '扬州':[119.42,32.39],
    '常州':[119.95,31.79],
    '潍坊':[119.1,36.62],
    '重庆':[106.54,29.59],
    '台州':[121.420757,28.656386],
    '南京':[118.78,32.04],
    '滨州':[118.03,37.36],
    '贵阳':[106.71,26.57],
    '无锡':[120.29,31.59],
    '本溪':[123.73,41.3],
    '克拉玛依':[84.77,45.59],
    '渭南':[109.5,34.52],
    '马鞍山':[118.48,31.56],
    '宝鸡':[107.15,34.38],
    '焦作':[113.21,35.24],
    '句容':[119.16,31.95],
    '北京':[116.46,39.92],
    '徐州':[117.2,34.26],
    '衡水':[115.72,37.72],
    '包头':[110,40.58],
    '绵阳':[104.73,31.48],
    '乌鲁木齐':[87.68,43.77],
    '枣庄':[117.57,34.86],
    '杭州':[120.19,30.26],
    '淄博':[118.05,36.78],
    '鞍山':[122.85,41.12],
    '溧阳':[119.48,31.43],
    '库尔勒':[86.06,41.68],
    '安阳':[114.35,36.1],
    '开封':[114.35,34.79],
    '济南':[117,36.65],
    '德阳':[104.37,31.13],
    '温州':[120.65,28.01],
    '九江':[115.97,29.71],
    '邯郸':[114.47,36.6],
    '临安':[119.72,30.23],
    '兰州':[103.73,36.03],
    '沧州':[116.83,38.33],
    '临沂':[118.35,35.05],
    '南充':[106.110698,30.837793],
    '天津':[117.2,39.13],
    '富阳':[119.95,30.07],
    '泰安':[117.13,36.18],
    '诸暨':[120.23,29.71],
    '郑州':[113.65,34.76],
    '哈尔滨':[126.63,45.75],
    '聊城':[115.97,36.45],
    '芜湖':[118.38,31.33],
    '唐山':[118.02,39.63],
    '平顶山':[113.29,33.75],
    '邢台':[114.48,37.05],
    '德州':[116.29,37.45],
    '济宁':[116.59,35.38],
    '荆州':[112.239741,30.335165],
    '宜昌':[111.3,30.7],
    '义乌':[120.06,29.32],
    '丽水':[119.92,28.45],
    '洛阳':[112.44,34.7],
    '秦皇岛':[119.57,39.95],
    '株洲':[113.16,27.83],
    '石家庄':[114.48,38.03],
    '莱芜':[117.67,36.19],
    '常德':[111.69,29.05],
    '保定':[115.48,38.85],
    '湘潭':[112.91,27.87],
    '金华':[119.64,29.12],
    '岳阳':[113.09,29.37],
    '长沙':[113,28.21],
    '衢州':[118.88,28.97],
    '廊坊':[116.7,39.53],
    '菏泽':[115.480656,35.23375],
    '合肥':[117.27,31.86],
    '武汉':[114.31,30.52],
    '大庆':[125.03,46.58]
};


// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('trend'));
var myChart2 = echarts.init(document.getElementById('situation'));
var myChart3 = echarts.init(document.getElementById('ranking'));

// 指定图表的配置项和数据
var option1 = {
    backgroundColor: '#1f2840',
    // title: {
    //     padding: 10,
    //     text: '     7日扫码趋势',
    //     textStyle: {
    //         color: '#ffffff',
    //         fontWeight: 'normal'
    //     }
    // },
    tooltip : {
        trigger: 'axis'
        // axisPointer: {
        //     type: 'cross',
        //     label: {
        //         backgroundColor: '#7e8392'
        //     }
        // }
    },
    // legend: {
    //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    // },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    grid: {
        left: '4%',
        right: '6%',
        bottom: '8%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data:[],
           // data : ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel: {
                show: true,
                interval:0,
                rotate: 0,
                textStyle: {
                    color: '#7e8392'
                }
            },
            splitLine:{
                lineStyle: {
                    width: 1,
                    type: 'dashed',  //虚线
                    color: 'rgba(255,255,255,.2)'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#7e8392'
                }
            },
            splitLine:{
                lineStyle: {
                    width: 1,
                    type: 'dashed',  //虚线
                    color: 'rgba(255,255,255,.2)'
                }
            }
        }
    ],
    series : [
        {
            name: '扫码量',
            type: 'line',
            smooth: true,
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(97, 41, 164, 0.95)'
                        },{
                            offset: 1,
                            color: 'rgba(82, 81, 212, 0.95)'
                        }
                    ])
                }
            },
            data:[],
            //data:[820, 932, 901, 934, 1290, 1330, 1320],
            itemStyle : {
                normal : {
                    color:'#683ac6',   //折点颜色
                    lineStyle:{
                        color:'#c182ff'
                    }
                }
            }
        }
    ]
};


// // 异步加载数据
function FunOption1() {
//     //设置日期，当前日期的前七天
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 7);
    var  time1=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();//time1表示当前时间
    console.log(time1);
    post("/sc", {"begin": time1, "from": "wx", "pc":"p", "province": "all", "city": "all","end":"","gender":"all","activity":"all","product":"all"}, function(res) {
        //  console.log(res);
        // 填入数据
        var len = res.data.length;
        var arrayObj = new Array();
        for (var i = 0; i < len; i++) {
            var x = 0;
            for (var j = 0; j < res.data[i].length; j++) {
                //  console.log(res.data[i][j]);
                x += res.data[i][j];
            }
            //   console.log(x);
            arrayObj.push(x);
        }
        //  console.log(arrayObj);

        option1.xAxis[0].data = res.timelines;
        option1.series[0].data = arrayObj;

        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
        setTimeout(function () {
            FunOption2();
        },310);
    });

}
var option2 = {
    backgroundColor: '#1f2840',
    // title: {
    //     top: 10,
    //     text: '     7日中奖情况',
    //     textStyle: {
    //         color: '#ffffff',
    //         fontWeight: 'normal'
    //     }
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: 5,
        left: 25,
        right: 25,
        data: [],
        // data:['1元','2元','99元','滴滴','OfO'],
        textStyle: {
            color: '#7e8392'
        }
    },
    grid: {
        left: '4%',
        right: '6%',
        bottom: '6%',
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:[],
        // data: ['周一','周二','周三','周四','周五','周六','周日'],
        axisLabel: {
            show: true,
            interval:0,
            rotate: 0,
            textStyle: {
                color: '#7e8392'
            }
        },
        splitLine:{
            lineStyle: {
                width: 1,
                type: 'dashed',  //虚线
                color: 'rgba(255,255,255,.2)'
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#7e8392'
            }
        },
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: 'rgba(255,255,255,.2)',//左边线的颜色
                width:'1'//坐标线的宽度
            }
        },
        splitLine:{
            lineStyle: {
                width: 1,
                type: 'dashed',  //虚线
                color: 'rgba(255,255,255,.2)'
            }
        }
    },
    series: [

    ]
};
// 异步加载数据
function FunOption2() {
    //设置日期，当前日期的前七天
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 7);
    var time1 = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();//time1表示当前时间
    // console.log(time1);
    post("/tr", {
        "begin": time1,
        "from": "wx",
        "pc": "p",
        "province": "all",
        "city": "all",
        "end": "",
        "gender": "all",
        "activity": "all",
        "product": "all"
    }, function (res) {
        // console.log(res);
        var arrayObj = new Array();
        var len =res.data.legend.length;
        for(var i=0;i<len;i++){
            var name =res.data.legend[i];
            // console.log(name);
            if(name!=""){
                arrayObj.push(name);
            }
        }

        option2.xAxis.data = res.data.xaxis;
        option2.legend.data = arrayObj;
         option2.series=[];
        for (var i = 0; i < arrayObj.length; i++) {
            // console.log(arrayObj[i]);
            option2.series.push({
                "name": arrayObj[i],
                "smooth": false,
                "type": "line",
                "stack": "总量",
                "data": res.data[arrayObj[i]]
            });
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
        // myChartpopup2.setOption(option2);
        setTimeout(function () {
            FunOption3();
        },310);
    });

}

var option3 = {
    backgroundColor: '#1f2840',
    // title: {
    //     top: 10,
    //     text: '     7日活动参与区域排名',
    //     textStyle: {
    //         color: '#ffffff',
    //         fontWeight: 'normal'
    //     }
    // },
    tooltip: {},
    legend: {},
    grid: {
        left: '4%',
        right: '6%',
        bottom: '6%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data:[],
        // data: ["厦门","福州","莆田","温州","惠州","武汉","成都","北海","上海","无锡"],
        axisLabel: {
            show: true,
            interval:0,
            textStyle: {
                color: '#7e8392'
            }
        },
        splitLine:{
            show: false
        }
    },
    yAxis: {
        type: 'value',
        data: [],
        // data: ["周一","周二","周三","周四","周五","周六","周日"],
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#7e8392'
            }
        },
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: 'rgba(255,255,255,.2)',//左边线的颜色
                width:'1'//坐标线的宽度
            }
        },
        splitLine:{
            lineStyle: {
                width: 1,
                type: 'dashed',  //虚线
                color: 'rgba(255,255,255,.2)'
            }
        }
    },
    series: [
        {
            type: 'bar',
            barMaxWidth: 25,
            data: [],
            // data: [5, 20, 36, 10, 10, 20, 14, 30, 40, 17],
            itemStyle : {
                normal : {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        var colorList = ['#434bfb', '#7c4afb', '#cb4b93', '#0669ff', '#bf41f4', '#434bfb', '#7c4afb', '#cb4b93', '#0669ff', '#7c4afb'];
                        return colorList[params.dataIndex];
                    }
                }
            }
        }
    ]
};

function FunOption3() {
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 7);
    var  time1=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();//time1表示当前时间
    // console.log(time1);
    post("/c", {"begin": time1, "from": "wx", "pc":"p", "province": "all", "city": "all","end":"","gender":"all","activity":"all","product":"all"}, function(res){
        // console.log(res);
        var len=res.data.length;
        var arrayObj = new Array();
        for(var i=0;i<len;i++){
            var x=0;
            for(var j=0;j<res.data[i].length;j++){
                //  console.log(res.data[i][j]);
                x+=res.data[i][j];
            }
            //   console.log(x);
            arrayObj.push(x);
        }
        var array2 =  new Array();
        var arrValues = new Array();
        var len=res.data.length;
        if(len>10){
            len=10;
        }
        for(var n = 0; n<len; n++){
            var m = '';
            var x = '';
            m += res.data[n].name;
            x += res.data[n].value;
            array2.push(m);
            arrValues.push(x);
        }
        // console.log(array2);
        // console.log(arrValues);

        option3.xAxis.data = array2;
        option3.series[0].data = arrValues;
        // 使用刚指定的配置项和数据显示图表。
        myChart3.setOption(option3);
        // myChartpopup3.setOption(option3);
    });
}

//鼠标移入显示数据列表
// $('#dataList').mouseenter(function () {
//     console.log("mouseenter");
//     setTimeout(function () {
//         //设置日期 一年之内
//         var myDate = new Date(); //获取今天日期
//         myDate.setDate(myDate.getDate() - 365);
//         var time1 = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();//time1表示当前时间
//         // function FunOption2() {
//         post("/tr", {
//             "begin": time1,
//             "from": "wx",
//             "pc": "p",
//             "province": "all",
//             "city": "all",
//             "end": "",
//             "gender": "all",
//             "activity": "all",
//             "product": "all"
//         }, function (res) {
//             // console.log(res);
//             var arrayObj = new Array();
//             var len =res.data.legend.length;
//             for(var i=0;i<len;i++){
//                 var name =res.data.legend[i];
//                 // console.log(name);
//                 if(name!=""){
//                     arrayObj.push(name);
//                 }
//
//             }
//             console.log(arrayObj);
//
//         });
//
//         // }
//     },310);
// });

window.onresize = function () {
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();

}





