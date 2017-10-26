// var init = function() {
//     var picker = new selectPicker();
//     picker.init({
//         trigger: "#selectPicker-trigger",
//         options: [
//             "红",
//             "绿",
//             "蓝",
//             "黑",
//             "白",
//             "黄"
//         ],
//         defaultIndex: 0,
//         onSubmit: function(v) {
//             console.log(v);
//         }
//     });
// }
// init();

window.selectPicker = (function() {
    var MobilePicker = function() {
        this.gear;
        this.value = "";
    };

    var cssHtm='.gearYM,.gearCont,.gearTime{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;background-color:rgba(0,0,0,0.2);display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:9900;overflow:hidden;-webkit-animation-fill-mode:both;animation-fill-mode:both}.gear_ctrl{vertical-align:middle;background-color:#ffffff;color:#000;margin:0;height:auto;width:100%;position:absolute;left:0;bottom:0;z-index:9901;overflow:hidden;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.slideInUp{animation:slideInUp .3s ease;-webkit-animation:slideInUp .3s ease;}@-webkit-keyframes slideInUp{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.ym_roll,.gear_roll,.datetime_roll,.time_roll{display:-webkit-box;width:100%;height:auto;overflow:hidden;font-weight:bold;background-color:transparent;-webkit-mask:-webkit-gradient(linear,0% 50%,0% 100%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(top,#debb47 50%,rgba(36,142,36,0))}.ym_roll>div,.gear_roll>div,.datetime_roll>div,.time_roll>div{font-size:2.3em;height:6em;float:left;background-color:transparent;position:relative;overflow:hidden;-webkit-box-flex:4}.ym_roll>div .gear,.gear_roll>div .gear,.datetime_roll>div .gear,.time_roll>div .gear{width:100%;float:left;position:absolute;z-index:9902;margin-top:-6em}.gear_roll_mask{-webkit-mask:-webkit-gradient(linear,0% 40%,0% 0%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(bottom,#debb47 50%,rgba(36,142,36,0));padding:0 0 3em 0}.gear_roll>div:nth-child(2){-webkit-box-flex:2}.gear_roll>div:nth-child(1),.datetime_roll>div:nth-child(1){-webkit-box-flex:4}.datetime_roll>div:first-child{-webkit-box-flex:6}.datetime_roll>div:last-child{-webkit-box-flex:6}.select_grid{position:relative;top:2em;width:100%;height:2em;margin:0;box-sizing:border-box;z-index:0;border-top:1px solid #abaeb5;border-bottom:1px solid #abaeb5}.select_grid>div{color:#000;position:absolute;right:0;top:0;font-size:.8em;line-height:2.5em}.gear_roll>div:nth-child(3) .select_grid>div{left:42%}.datetime_roll>div .select_grid>div{right:0}.datetime_roll>div:first-child .select_grid>div{left:auto;right:0%}.datetime_roll>div:last-child .select_grid>div{left:50%}.time_roll>div:nth-child(1) .select_grid>div{right:1em}.ym_roll>div:nth-child(1) .select_grid>div{right:.1em}.ym_roll>div .select_grid>div,.time_roll>div .select_grid>div{right:5em}.gear_btn{color:#0575f2;font-size:1.6em;font-weight:bold;line-height:1em;text-align:center;padding:.8em 1em}.gear_btn_box:before,.gear_btn_box:after{content:"";position:absolute;height:1px;width:100%;display:block;background-color:#96979b;z-index:15;-webkit-transform:scaleY(0.33);transform:scaleY(0.33)}.gear_btn_box{display:-webkit-box;-webkit-box-pack:justify;-webkit-box-align:stretch;position:relative}.gear_btn_box:before{left:0;top:0;-webkit-transform-origin:50% 20%;transform-origin:50% 20%}.gear_btn_box:after{left:0;bottom:0;-webkit-transform-origin:50% 70%;transform-origin:50% 70%}.select_tooth{height:2em;line-height:2em;text-align:center}.select_tooth_text{font-size:0.8em;}';
    var cssEle = document.createElement("style");
	cssEle.type = "text/css";
	cssEle.appendChild(document.createTextNode(cssHtm));
	document.getElementsByTagName("head")[0].appendChild(cssEle);

    MobilePicker.prototype = {
        init: function(params) {
            this.trigger = document.querySelector(params.trigger);
            this.options = params.options;
            this.defaultIndex = params.defaultIndex;

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

            //弹出
            function popupDate(e) {
                _self.gear = document.createElement("div");
                _self.gear.className = "gearCont";
                _self.gear.innerHTML = '<div class="gear_ctrl slideInUp">' +
                    '<div class="gear_btn_box">' +
                    '<div class="gear_btn picker_cancel">取消</div>' +
                    '<div class="gear_btn picker_finish">确定</div>' +
                    '</div>' +
                    '<div class="gear_roll_mask">' +
                    '<div class="gear_roll">' +
                    '<div>' +
                    '<div class="gear select_opt"></div>' +
                    '<div class="select_grid">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div><div class="picker_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gear);
                pickerInit();

                var picker_cancel = _self.gear.querySelector(".picker_cancel");
                picker_cancel.addEventListener('touchstart', closeMobilePicker);
                var picker_finish = _self.gear.querySelector(".picker_finish");
                picker_finish.addEventListener('touchstart', comfirmMobilePicker);
                var picker_bg = _self.gear.querySelector(".picker_bg");
                picker_bg.addEventListener('click', closeMobilePicker);
                var select_opt = _self.gear.querySelector(".select_opt");
                select_opt.addEventListener('touchstart', gearTouchStart);
                select_opt.addEventListener('touchmove', gearTouchMove);
                select_opt.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                picker_cancel.addEventListener('click', closeMobilePicker);
                picker_finish.addEventListener('click', comfirmMobilePicker);
                select_opt.addEventListener('mousedown', gearTouchStart);
                select_opt.addEventListener('mousemove', gearTouchMove);
                select_opt.addEventListener('mouseup', gearTouchEnd);
                _self.gear.querySelector(".gear_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gear.querySelector(".gear_roll_mask").addEventListener('mouseup', gearTouchOut);
            }

            //初始化默认值
            function pickerInit() {
                _self.gear.querySelector(".select_opt").setAttribute("val", _self.defaultIndex);
                setGearselect_tooth();
            }

            //重置节点个数
            function setGearselect_tooth() {
                var passY = _self.options.length;
                var select_opt = _self.gear.querySelector(".select_opt");
                var itemStr = "";
                if (select_opt && select_opt.getAttribute("val")) {
                    //得到值
                    var optVal = parseInt(select_opt.getAttribute("val"));

                    //当前节点前后需要展示的节点个数
                    for (var p = 0; p <= passY - 1; p++) {
                        itemStr += "<div class='select_tooth'><span class='select_tooth_text'>" + (_self.options[p]) + "</span></div>";
                    }
                    select_opt.innerHTML = itemStr;

                    var top = Math.floor(parseFloat(select_opt.getAttribute('top')));
                    if (!isNaN(top)) {
                        top % 2 == 0 ? (top = top) : (top = top + 1);
                        top > 8 && (top = 8);

                        var minTop = 8 - (passY - 1) * 2;
                        top < minTop && (top = minTop);
                        select_opt.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
                        select_opt.setAttribute('top', top + 'em');

                        optVal = Math.abs(top - 8) / 2;
                        select_opt.setAttribute("val", optVal);
                    } else {
                        select_opt.style["-webkit-transform"] = 'translate3d(0,' + (8 - optVal * 2) + 'em,0)';
                        select_opt.setAttribute('top', 8 - optVal * 2 + 'em');
                    }
                } else {
                    return;
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
                        break;
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
                pree = e;
                if (_self.onStart) _self.onStart();
            }

            //手指移动
            function gearTouchMove(e) {
            	if (!isTouched) return;

            	isMoved = true;
                e.preventDefault();

                if (pree) {
                    var target = pree.target;
                } else {
                    var target = e.target;
                }

                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }

                target["new_" + target.id] = e.targetTouches ? e.targetTouches[0].screenY : e.pageY;
                target["n_t_" + target.id] = (new Date()).getTime();

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
                if (pree) {
                    var target = pree.target;
                } else {
                    var target = e.target;
                }
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
                pree = null;
            };

            //离开区域
            function gearTouchOut(e) {
            	gearTouchEnd(pree);
            };

            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;
                var passY = _self.options.length;
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
                setGearselect_tooth();
            }

            //取消
            function closeMobilePicker(e) {
                e.preventDefault();
                isTouched = isMoved = false;
                if(_self.onClose) _self.onClose();
                var evt = new CustomEvent('input');
                _self.trigger.dispatchEvent(evt);
                document.body.removeChild(_self.gear);
            }

            //确认
            function comfirmMobilePicker(e) {
                var n = parseInt(_self.gear.querySelector(".select_opt").getAttribute("val"));
                if(_self.onSubmit) _self.onSubmit(_self.options[n], n);
                closeMobilePicker(e);
            }

            _self.trigger.addEventListener('click', popupDate);
        }
    }
    return MobilePicker;
})();
