// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8"/>
//     <script src="./LogBase/selectTriger.js"></script>
// </head>
// <body>
//     <input id="selectPicker-trigger" type="button" value="点击">

//     <script>
//     //初始化
//     var init = function() {
//         var calendar = new datePicker();
//         calendar.init({
//             "trigger": "#selectPicker-trigger",
//             "type": "date",
//             "minDate": getBeginDate(),//最小日期为当前时间后一天
//             "onSubmit": function() {

//             }
//         });
//     }

//     // 获取当前日期字符串
//     var getBeginDate = function() {
//         var date = new Date();
//         return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1);
//     }

//     init();
//     </script>
// </body>
// </html>

window.datePicker = (function() {
    var MobileCalendar = function() {
        this.gearDate;
        this.minY = 1900;
        this.minM = 1;
        this.minD = 1;
        this.maxY = 2099;
        this.maxM = 12;
        this.maxD = 31;
        this.value="";
    };
    
    var cssHtm='.gearYM,.gearDate,.gearDatetime,.gearTime{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;background-color:rgba(0,0,0,0.2);display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:9900;overflow:hidden;-webkit-animation-fill-mode:both;animation-fill-mode:both}.date_ctrl{vertical-align:middle;background-color:#d5d8df;color:#000;margin:0;height:auto;width:100%;position:absolute;left:0;bottom:0;z-index:9901;overflow:hidden;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.slideInUp{animation:slideInUp .3s ease;-webkit-animation:slideInUp .3s ease;}@-webkit-keyframes slideInUp{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.ym_roll,.date_roll,.datetime_roll,.time_roll{display:-webkit-box;width:100%;height:auto;overflow:hidden;font-weight:bold;background-color:transparent;-webkit-mask:-webkit-gradient(linear,0% 50%,0% 100%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(top,#debb47 50%,rgba(36,142,36,0))}.ym_roll>div,.date_roll>div,.datetime_roll>div,.time_roll>div{font-size:2.3em;height:6em;float:left;background-color:transparent;position:relative;overflow:hidden;-webkit-box-flex:4}.ym_roll>div .gear,.date_roll>div .gear,.datetime_roll>div .gear,.time_roll>div .gear{width:100%;float:left;position:absolute;z-index:9902;margin-top:-6em}.date_roll_mask{-webkit-mask:-webkit-gradient(linear,0% 40%,0% 0%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(bottom,#debb47 50%,rgba(36,142,36,0));padding:0 0 3em 0}.date_roll>div:nth-child(2){-webkit-box-flex:2}.date_roll>div:nth-child(1),.datetime_roll>div:nth-child(1){-webkit-box-flex:4}.datetime_roll>div:first-child{-webkit-box-flex:6}.datetime_roll>div:last-child{-webkit-box-flex:6}.date_grid{position:relative;top:2em;width:100%;height:2em;margin:0;box-sizing:border-box;z-index:0;border-top:1px solid #abaeb5;border-bottom:1px solid #abaeb5}.date_grid>div{color:#000;position:absolute;right:0;top:0;font-size:.8em;line-height:2.5em}.date_roll>div:nth-child(3) .date_grid>div{left:42%}.datetime_roll>div .date_grid>div{right:0}.datetime_roll>div:first-child .date_grid>div{left:auto;right:0%}.datetime_roll>div:last-child .date_grid>div{left:50%}.time_roll>div:nth-child(1) .date_grid>div{right:1em}.ym_roll>div:nth-child(1) .date_grid>div{right:.1em}.ym_roll>div .date_grid>div,.time_roll>div .date_grid>div{right:5em}.date_btn{color:#0575f2;font-size:1.6em;font-weight:bold;line-height:1em;text-align:center;padding:.8em 1em}.date_btn_box:before,.date_btn_box:after{content:"";position:absolute;height:1px;width:100%;display:block;background-color:#96979b;z-index:15;-webkit-transform:scaleY(0.33);transform:scaleY(0.33)}.date_btn_box{display:-webkit-box;-webkit-box-pack:justify;-webkit-box-align:stretch;background-color:#f1f2f4;position:relative}.date_btn_box:before{left:0;top:0;-webkit-transform-origin:50% 20%;transform-origin:50% 20%}.date_btn_box:after{left:0;bottom:0;-webkit-transform-origin:50% 70%;transform-origin:50% 70%}.date_roll>div:nth-child(1) .date_roll>div:nth-child(2) .gear{text-indent:-20%}.date_roll>div:nth-child(3) .gear{text-indent:-55%}.datetime_roll>div .gear{width:100%;text-indent:-25%}.datetime_roll>div:first-child .gear{text-indent:-10%}.datetime_roll>div:last-child .gear{text-indent:-50%}.ym_roll>div .gear,.time_roll>div .gear{width:100%;text-indent:-70%}.ym_roll>div:nth-child(1) .gear,.time_roll>div:nth-child(1) .gear{width:100%;text-indent:10%}.tooth{height:2em;line-height:2em;text-align:center}';
    var cssEle = document.createElement("style");
	cssEle.type = "text/css";
	cssEle.appendChild(document.createTextNode(cssHtm));
	document.getElementsByTagName("head")[0].appendChild(cssEle);
	
    MobileCalendar.prototype = {
        init: function(params) {
            this.type = params.type;
            this.trigger = document.querySelector(params.trigger);
            if (this.trigger.getAttribute("data-lcalendar") != null) {
                var arr = this.trigger.getAttribute("data-lcalendar").split(',');
                var minArr = arr[0].split('-');
                this.minY = ~~minArr[0];
                this.minM = ~~minArr[1];
                this.minD = ~~minArr[2];
                var maxArr = arr[1].split('-');
                this.maxY = ~~maxArr[0];
                this.maxM = ~~maxArr[1];
                this.maxD = ~~maxArr[2];
            };
            if (params.minDate) {
                var minArr = params.minDate.split('-');
                this.minY = ~~minArr[0];
                this.minM = ~~minArr[1];
                this.minD = ~~minArr[2];
            };
            if (params.maxDate) {
                var maxArr = params.maxDate.split('-');
                this.maxY = ~~maxArr[0];
                this.maxM = ~~maxArr[1];
                this.maxD = ~~maxArr[2];
            };
            this.onClose= params.onClose;
            this.onSubmit= params.onSubmit;
            this.onChange= params.onChange;
            this.onStart= params.onStart;
            this.bindEvent(this.type);
        },
        bindEvent: function(type) {
            var _self = this;
            var isTouched = false , isMoved = false;
            var pree;
            //呼出日期插件
            function popupDate(e) {
                
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="date_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '</div>' +                    
                    '</div>' +
                    '</div>' +
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                dateCtrlInit();
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileDate);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeMobileCalendar);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeMobileCalendar);
                lcalendar_finish.addEventListener('click', finishMobileDate);
                date_yy.addEventListener('mousedown', gearTouchStart);
                date_yy.addEventListener('mousemove', gearTouchMove);
                date_yy.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始化年月日插件默认值
            function dateCtrlInit() {
                
                var date = new Date();
                var dateArr = {
                    yy: date.getYear(),
                    mm: date.getMonth(),
                    dd: date.getDate() - 1
                };
                if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
                    dateArr.yy = rs[0] - _self.minY;
                    dateArr.mm = rs[1].replace(/-/g, "") - 1;
                    dateArr.dd = rs[2].replace(/-/g, "") - 1;
                } else {
                    dateArr.yy = dateArr.yy + 1900 - _self.minY;
                }
                _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                setDateGearTooth();
            }

            //重置日期节点个数
            function setDateGearTooth() {
                
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var itemStr = "";
                if (date_yy && date_yy.getAttribute("val")) {
                    //得到年份的值
                    var yyVal = parseInt(date_yy.getAttribute("val"));
                    //p 当前节点前后需要展示的节点个数
                    for (var p = 0; p <= passY - 1; p++) {
                        itemStr += "<div class='tooth'>" + (_self.minY + p) + "</div>";
                    }
                    date_yy.innerHTML = itemStr;
                    var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
                    if (!isNaN(top)) {
                        top % 2 == 0 ? (top = top) : (top = top + 1);
                        top > 8 && (top = 8);
                        var minTop = 8 - (passY - 1) * 2;
                        top < minTop && (top = minTop);
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
                        date_yy.setAttribute('top', top + 'em');
                        yyVal = Math.abs(top - 8) / 2;
                        date_yy.setAttribute("val", yyVal);
                    } else {
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
                        date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
                    }
                } else {
                    return;
                }
            }

            //求月份最大天数
            function calcDays(year, month) {
                if (month == 1) {
                    year += _self.minY;
                    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
                        return 29;
                    } else {
                        return 28;
                    }
                } else {
                    if (month == 3 || month == 5 || month == 8 || month == 10) {
                        return 30;
                    } else {
                        return 31;
                    }
                }
            }

            //触摸开始
            function gearTouchStart(e) {
            	if (isMoved || isTouched) return;            	
                isTouched = true;
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches ? e.targetTouches[0].screenY : e.pageY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                };
                pree=e;
                if (_self.onStart) _self.onStart();
            }
            //手指移动
            function gearTouchMove(e) {
            	if (!isTouched) return;
            	isMoved = true;
                e.preventDefault();
                if(pree) var target = pree.target; else
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches ? e.targetTouches[0].screenY : e.pageY;
                target["n_t_" + target.id] = (new Date()).getTime();
                //var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / target.clientHeight;
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
            }
            //离开屏幕
            function gearTouchEnd(e) {
            	if (!isTouched || !isMoved) {
                    isTouched = isMoved = false;
                    return;
                }
                isTouched = isMoved = false;
                e.preventDefault();
                if(pree) var target = pree.target; else
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                rollGear(target);
                pree=null;
            };
            //离开区域
            function gearTouchOut(e) {
            	gearTouchEnd(pree);
            };
            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;
                var passY = _self.maxY - _self.minY + 1;
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function() {
                    var pos = target["pos_" + target.id];
                    var speed = target["spd_" + target.id] * Math.exp(-0.1 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {} else {
                        speed = 0.1;
                        var b = Math.round(pos / 2) * 2;
                        if (Math.abs(pos - b) < 0.05) {
                            stopGear = true;
                        } else {
                            if (pos > b) {
                                pos -= speed
                            } else {
                                pos += speed
                            }
                        }
                    }
                    if (pos > 8) {
                        pos = 8;
                        stopGear = true;
                    }
                    switch (target.dataset.datetype) {
                        case "date_yy":
                            var minTop = 8 - (passY - 1) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "time_hh":
                            if (pos < -38) {
                                pos = -38;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "time_mm":
                            if (pos < -110) {
                                pos = -110;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        default:
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            }
            //控制插件滚动后停留的值
            function setGear(target, val) {
                val = Math.round(val);
                target.setAttribute("val", val);
                if (/date/.test(target.dataset.datetype)) {
                    setDateGearTooth();
                } else {
                    setTimeGearTooth();
                }
            }
            //取消
            function closeMobileCalendar(e) {
                e.preventDefault();
                isTouched = isMoved = false;
                if(_self.onClose) _self.onClose();
                var evt = new CustomEvent('input');
                _self.trigger.dispatchEvent(evt);
                document.body.removeChild(_self.gearDate);
            }
            //日期确认
            function finishMobileDate(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeMobileCalendar(e);
            }
            _self.trigger.addEventListener('click', {
                "date": popupDate
            }[type]);
        }
    }
    return MobileCalendar;
})();
