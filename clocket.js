!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).clocklet = e()
}(this, function () {
    "use strict";

    function r(t, e, o) {
        return t = String(t), !e || !isFinite(e) || t.length >= e ? t : n(e - t.length, o) + t
    }

    function t(t, e, o) {
        return t = String(t), !e || !isFinite(e) || t.length >= e ? t : t + n(e - t.length, o)
    }

    function n(t, e) {
        for (var o = e = null == e || "" === e ? " " : String(e); o.length < t;) o += e;
        return o.substr(0, t)
    }

    function o() {
        for (var t = 0, e = arguments.length; t < e; ++t) {
            var o = arguments[t];
            if ("number" == typeof o) return o;
            if ("string" == typeof o) {
                o = parseFloat(o);
                if (isFinite(o)) return o
            }
        }
    }

    var l = 1e3, c = 60 * l, i = 60 * c, e = 12 * i, a = 24 * i;

    function u() {
        return (Date.now() - (new Date).getTimezoneOffset() * c) % a
    }

    function s(t) {
        t = Math.floor(t) % a;
        return 0 <= t ? t : t + a
    }

    function p(t) {
        return e <= t ? t - e : t
    }

    function k(t) {
        return t < e ? t + e : t
    }

    function d(t, e) {
        switch (t = s(t), e && String(e)[0].toLowerCase()) {
            case"a":
                return p(t);
            case"p":
                return k(t);
            default:
                return t
        }
    }

    function f(t) {
        switch (typeof t) {
            case"number":
                return s(t);
            case"string":
                return function (t) {
                    if (!(t = t && String(t).replace(/[\uff00-\uffef]/g, function (t) {
                        return String.fromCharCode(t.charCodeAt(0) - 65248)
                    }).replace(/\s/g, "").replace(/(a|p)\.?m?\.?$/i, function (t, e) {
                        return e.toLowerCase()
                    }))) return 0;
                    if ("now" === t.toLowerCase()) return u();
                    t = t.match(/^([+-]?[0-9]{1,2})(?:([0-9]{2})(?:([0-9]{2})([0-9]*))?)?(a|p)?$/i) || t.match(/^([+-]?[0-9]*\.[0-9]*)()()()(a|p)?$/i) || t.match(/^([+-]?[0-9]*\.?[0-9]*):([+-]?[0-9]*\.?[0-9]*)(?::([+-]?[0-9]*\.?[0-9]*))?()(a|p)?$/i);
                    return t ? d((t[1] ? parseFloat(t[1]) * i : 0) + (t[2] ? parseFloat(t[2]) * c : 0) + (t[3] ? parseFloat(t[3]) * l : 0) + (t[4] ? 1e3 * parseFloat("0." + t[4]) : 0), t[5]) : NaN
                }(t);
            case"object":
                if (t) return function (t) {
                    if ("number" == typeof t.totalMilliseconds) return s(t.totalMilliseconds);
                    var e = o(t.h, t.hour, t.hours, 0) * i + o(t.m, t.minute, t.minutes, 0) * c + o(t.s, t.second, t.seconds, 0) * l + o(t.S, t.millisecond, t.milliseconds, 0);
                    return !0 !== t.am && !1 !== t.pm ? !0 !== t.pm && !1 !== t.am ? d(e, t.a) : k(e) : p(e)
                }(t instanceof Array ? {h: t[0], m: t[1], s: t[2], S: t[3]} : t)
        }
        return NaN
    }

    function b() {
        return /\\.|HH?|hh?|kk?|mm?|ss?|S{1,3}|AA?|aa?|_H|_h|_k|_m|_s/g
    }

    var h = {
        H: m(0, 23),
        HH: m(0, 23, 2, "0"),
        _H: m(0, 23, 2),
        h: m(1, 12),
        hh: m(1, 12, 2, "0"),
        _h: m(1, 12, 2),
        k: m(0, 11),
        kk: m(0, 11, 2, "0"),
        _k: m(0, 23, 2),
        m: m(0, 59),
        mm: m(0, 59, 2, "0"),
        _m: m(0, 59, 2),
        s: m(0, 59),
        ss: m(0, 59, 2, "0"),
        _s: m(0, 59, 2),
        S: m(0, 9),
        SS: m(0, 99, 2, "0"),
        SSS: m(0, 999, 3, "0"),
        a: function (e) {
            return function (t) {
                return "pm" === e ? "am" : "pm"
            }
        },
        A: function (e) {
            return function (t) {
                return "PM" === e ? "AM" : "PM"
            }
        },
        aa: function (e) {
            return function (t) {
                return "p.m." === e ? "a.m." : "p.m."
            }
        },
        AA: function (e) {
            return function (t) {
                return "P.M." === e ? "A.M." : "P.M."
            }
        }
    };

    function m(c, i, a, u) {
        return void 0 === a && (a = 1), function (l) {
            return function (t, e) {
                var o, n,
                    o = (o = parseInt(l, 10) + t, n = c, t = i, e ? (o = (o - n) % (++t - n)) < 0 ? o + t : o + n : o < n ? n : t < o ? t : o);
                return isNaN(o) ? void 0 : r(o, a, u)
            }
        }
    }

    function y(t, e, o) {
        for (var n = v(t), l = 0, c = 0, i = 0; i < n.length; ++i) {
            var a = n[i];
            if (a.literal) {
                var u = e.indexOf(a.property, l);
                if (-1 === u || o <= u) {
                    if (0 === i) return;
                    var r = e.slice(c, u);
                    return {property: s = n[i - 1].property, index: c, value: r, adjust: h[s](r)}
                }
                c = l = u + a.property.length
            } else "_" === a.property[0] && " " === e[l] && ++l
        }
        t = n[n.length - 1];
        if (t && !t.literal) {
            var s, r = e.slice(l);
            return {property: s = t.property, index: l, value: r, adjust: h[s](r)}
        }
    }

    function v(t) {
        for (var e, o = b(), n = [], l = 0; e = o.exec(t);) {
            var c = e.index, i = o.lastIndex;
            l !== c && n.push({index: l, property: t.slice(l, c), literal: !0}), "\\" === e[0][0] ? n.push({
                index: c,
                property: e[0].slice(1),
                literal: !0
            }) : n.push({index: c, property: e[0], literal: !1}), l = i
        }
        return l < t.length && n.push({index: l, property: t.slice(l), literal: !0}), n
    }

    var g = (Object.defineProperty(O.prototype, "hour", {
        get: function () {
            return Math.floor(this._totalMilliseconds / i)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "hour12", {
        get: function () {
            return (this.hour + 11) % 12 + 1
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "minute", {
        get: function () {
            return Math.floor(this._totalMilliseconds % i / c)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "second", {
        get: function () {
            return Math.floor(this._totalMilliseconds % c / l)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "millisecond", {
        get: function () {
            return this._totalMilliseconds % l
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "am", {
        get: function () {
            return this.hour < 12
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "pm", {
        get: function () {
            return 12 <= this.hour
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "hours", {
        get: function () {
            return this.hour
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "hours12", {
        get: function () {
            return this.hour12
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "minutes", {
        get: function () {
            return this.minute
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "seconds", {
        get: function () {
            return this.second
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "milliseconds", {
        get: function () {
            return this.millisecond
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "H", {
        get: function () {
            return this.invalid ? "-" : String(this.hour)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "h", {
        get: function () {
            return this.invalid ? "-" : String(this.hour12)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "k", {
        get: function () {
            return this.invalid ? "-" : String((this.hour + 23) % 24 + 1)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "m", {
        get: function () {
            return this.invalid ? "-" : String(this.minute)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "s", {
        get: function () {
            return this.invalid ? "-" : String(this.second)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "S", {
        get: function () {
            return this.invalid ? "-" : String(Math.floor(this.millisecond / 100))
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "SS", {
        get: function () {
            return this.invalid ? "--" : t(Math.floor(this.millisecond / 10), 2, "0")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "SSS", {
        get: function () {
            return this.invalid ? "---" : t(this.millisecond, 3, "0")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "a", {
        get: function () {
            return this.invalid ? "--" : this.am ? "am" : "pm"
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "A", {
        get: function () {
            return this.invalid ? "--" : this.am ? "AM" : "PM"
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "aa", {
        get: function () {
            return this.invalid ? "----" : this.am ? "a.m." : "p.m."
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "AA", {
        get: function () {
            return this.invalid ? "----" : this.am ? "A.M." : "P.M."
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "HH", {
        get: function () {
            return this.invalid ? "--" : r(this.H, 2, "0")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "_H", {
        get: function () {
            return this.invalid ? "--" : r(this.H, 2, " ")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "hh", {
        get: function () {
            return this.invalid ? "--" : r(this.h, 2, "0")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "_h", {
        get: function () {
            return this.invalid ? "--" : r(this.h, 2, " ")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "kk", {
        get: function () {
            return this.invalid ? "--" : r(this.k, 2, "0")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "_k", {
        get: function () {
            return this.invalid ? "--" : r(this.k, 2, " ")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "mm", {
        get: function () {
            return this.invalid ? "--" : r(this.m, 2, "0")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "_m", {
        get: function () {
            return this.invalid ? "--" : r(this.m, 2, " ")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "ss", {
        get: function () {
            return this.invalid ? "--" : r(this.s, 2, "0")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "_s", {
        get: function () {
            return this.invalid ? "--" : r(this.s, 2, " ")
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "HHmm", {
        get: function () {
            return this.HH + ":" + this.mm
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "HHmmss", {
        get: function () {
            return this.HHmm + ":" + this.ss
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "HHmmssSSS", {
        get: function () {
            return this.HHmmss + "." + this.SSS
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "totalMilliseconds", {
        get: function () {
            return this._totalMilliseconds
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "totalSeconds", {
        get: function () {
            return Math.floor(this._totalMilliseconds / l)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "totalMinutes", {
        get: function () {
            return Math.floor(this._totalMilliseconds / c)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "valid", {
        get: function () {
            return 0 <= this._totalMilliseconds && this._totalMilliseconds < a
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "invalid", {
        get: function () {
            return !this.valid
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "startOfHour", {
        get: function () {
            return new O(this._totalMilliseconds - this._totalMilliseconds % i)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "startOfMinute", {
        get: function () {
            return new O(this._totalMilliseconds - this._totalMilliseconds % c)
        }, enumerable: !0, configurable: !0
    }), Object.defineProperty(O.prototype, "startOfSecond", {
        get: function () {
            return new O(this._totalMilliseconds - this._totalMilliseconds % l)
        }, enumerable: !0, configurable: !0
    }), O.prototype.ifInvalid = function (t) {
        return this.valid ? this : new O(f(t))
    }, O.prototype.startOf = function (t) {
        switch (t) {
            case"hour":
                return this.startOfHour;
            case"minute":
                return this.startOfMinute;
            case"second":
                return this.startOfSecond;
            default:
                return this
        }
    }, O.prototype.toString = function () {
        return this.HHmmssSSS
    }, O.prototype.format = function (t) {
        return e = this, String(t).replace(b(), function (t) {
            return "\\" === t[0] ? t[1] : e[t]
        });
        var e
    }, O.prototype.with = function (t) {
        return new O(f({
            h: o(t.h, t.hour, t.hours, this.hour),
            m: o(t.m, t.minute, t.minutes, this.minute),
            s: o(t.s, t.second, t.seconds, this.second),
            S: o(t.S, t.millisecond, t.milliseconds, this.millisecond),
            am: !0 === t.am || !1 === t.pm || "am" === t.a || "pm" !== t.a && void 0
        }))
    }, O.prototype.plus = function (t) {
        t = f(t);
        return 0 === t ? this : new O(this._totalMilliseconds + t)
    }, O.prototype.minus = function (t) {
        t = f(t);
        return 0 === t ? this : new O(this._totalMilliseconds - t)
    }, O.prototype.equals = function (t) {
        return 0 === this.compareTo(t)
    }, O.prototype.compareTo = function (t) {
        return this._totalMilliseconds - f(t)
    }, O.prototype.isBefore = function (t) {
        return this.compareTo(t) < 0
    }, O.prototype.isBeforeOrEqual = function (t) {
        return this.compareTo(t) <= 0
    }, O.prototype.isAfter = function (t) {
        return 0 < this.compareTo(t)
    }, O.prototype.isAfterOrEqual = function (t) {
        return 0 <= this.compareTo(t)
    }, O.prototype.isBetweenExclusive = function (t, e) {
        return this.isAfter(t) && this.isBefore(e)
    }, O.prototype.isBetweenInclusive = function (t, e) {
        return this.isAfterOrEqual(t) && this.isBeforeOrEqual(e)
    }, O);

    function O(t) {
        this._totalMilliseconds = t
    }

    function E(t) {
        return null == t ? P : t instanceof g ? t : 0 === (t = f(t)) ? S : isNaN(t) ? P : new g(t)
    }

    var S = new g(0), P = new g(NaN);

    function j(t, e, o) {
        void 0 === o && (o = P);
        for (var n = o, l = 0, c = t.length; l < c; ++l) {
            var i = E(t[l]);
            i.valid && (n = e(n, i, l, t))
        }
        return n
    }

    function _(t) {
        var e = document.createEvent("CustomEvent");
        e.initCustomEvent("input", !0, !1, "complete"), t.dispatchEvent(e)
    }

    E.prototype = g.prototype, E.INVALID = P, E.ZERO = S, E.now = function () {
        return new g(u())
    }, E.min = function () {
        return j(arguments, function (t, e) {
            return t.invalid || e.isBefore(t) ? e : t
        })
    }, E.max = function () {
        return j(arguments, function (t, e) {
            return t.invalid || e.isAfter(t) ? e : t
        })
    };
    var w, M, x = function () {
        return (x = Object.assign || function (t) {
            for (var e, o = 1, n = arguments.length; o < n; o++) for (var l in e = arguments[o]) Object.prototype.hasOwnProperty.call(e, l) && (t[l] = e[l]);
            return t
        }).apply(this, arguments)
    };
    void 0 === window.ontouchend ? M = !1 : (w = window.ontouchend, M = (window.ontouchend = void 0) !== window.ontouchend, window.ontouchend = w);
    var H = M;

    function L(t, e, o, n, l) {
        var c = document.createEvent("CustomEvent");
        return c.initCustomEvent(e, o, n, l), c.preventDefault = function () {
            Object.defineProperty(this, "defaultPrevented", {
                get: function () {
                    return !0
                }
            })
        }, t.dispatchEvent(c), c
    }

    function A(t, e) {
        return t.getAttribute("data-clocklet-" + e)
    }

    function C(t, e, o) {
        t.setAttribute("data-clocklet-" + e, o)
    }

    var N = (T.prototype.value = function (t) {
        this.hand.style.transform = "rotate(" + 360 * t / this.maxValue + "deg)";
        var e = "clocklet-tick--selected", o = this.dial.getElementsByClassName(e)[0],
            t = this.dial.querySelector('[data-clocklet-tick-value="' + t + '"]');
        o !== t && (o && o.classList.remove(e), t && t.classList.add(e))
    }, T.prototype._onDragStart = function (t) {
        var e;
        t.touches && 1 < t.touches.length ? this.dragging = !1 : (this.dragging = !0, (e = A(t.target, "tick-value")) && this.setValue(e), t.preventDefault(), L(this.dial, "clocklet.dragstart", !0, !1))
    }, T.prototype._onDrag = function (t) {
        var e, o, n;
        this.dragging && (e = t.targetTouches ? t.targetTouches[0] : t, (n = (o = document.elementFromPoint(e.clientX, e.clientY)) && A(o, "tick-value")) && this.dial.contains(o) ? this.setValue(n) : (o = this.dial.getBoundingClientRect(), n = e.clientX - o.left - o.width / 2, o = e.clientY - o.top - o.height / 2, n = Math.atan2(o, n), this.setValue(Math.round(n * this.maxValue / (2 * Math.PI) + this.maxValue / 4 + this.maxValue) % this.maxValue)), t.preventDefault())
    }, T.prototype._onDragEnd = function (t) {
        this.dragging = !1, t.preventDefault(), L(this.dial, "clocklet.dragend", !0, !1)
    }, T);

    function T(t, e, o) {
        this.dial = t, this.maxValue = e, this.setValue = o, this.hand = this.dial.getElementsByClassName("clocklet-hand")[0], this.dragging = !1, window.PointerEvent ? (t.addEventListener("pointerdown", this._onDragStart.bind(this)), addEventListener("pointermove", this._onDrag.bind(this), !0), addEventListener("pointerup", this._onDragEnd.bind(this), !0)) : H ? (t.addEventListener("touchstart", this._onDragStart.bind(this)), t.addEventListener("touchmove", this._onDrag.bind(this)), t.addEventListener("touchend", this._onDragEnd.bind(this))) : (t.addEventListener("mousedown", this._onDragStart.bind(this)), addEventListener("mousemove", this._onDrag.bind(this), !0), addEventListener("mouseup", this._onDragEnd.bind(this), !0))
    }

    var D = {
        className: "",
        format: "HH:mm",
        placement: "bottom",
        alignment: "left",
        appendTo: "body",
        zIndex: "",
        dispatchesInputEvents: !0
    };

    function I(t) {
        if (t) {
            for (var e = {}, o = 0, n = t.split(";"); o < n.length; o++) {
                var l = n[o], c = l.indexOf(":");
                e[l.slice(0, c).trim().replace(/[a-zA-Z0-9_]-[a-z]/g, function (t) {
                    return t[0] + t[2].toUpperCase()
                })] = l.slice(c + 1).trim()
            }
            return e
        }
    }

    var B = '<div class="clocklet"><div class="clocklet-plate"><div class="clocklet-dial clocklet-dial--minute"><div class="clocklet-hand clocklet-hand--minute"></div><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="0" style="left:50%;top:11%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="1" style="left:54.8%;top:4.3%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="2" style="left:59.6%;top:5%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="3" style="left:64.2%;top:6.3%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="4" style="left:68.7%;top:8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="5" style="left:69.5%;top:16.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="6" style="left:77%;top:12.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="7" style="left:80.8%;top:15.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="8" style="left:84.2%;top:19.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="9" style="left:87.2%;top:23%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="10" style="left:83.8%;top:30.5%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="11" style="left:92%;top:31.3%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="12" style="left:93.7%;top:35.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="13" style="left:95%;top:40.4%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="14" style="left:95.7%;top:45.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="15" style="left:89%;top:50%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="16" style="left:95.7%;top:54.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="17" style="left:95%;top:59.6%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="18" style="left:93.7%;top:64.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="19" style="left:92%;top:68.7%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="20" style="left:83.8%;top:69.5%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="21" style="left:87.2%;top:77%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="22" style="left:84.2%;top:80.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="23" style="left:80.8%;top:84.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="24" style="left:77%;top:87.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="25" style="left:69.5%;top:83.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="26" style="left:68.7%;top:92%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="27" style="left:64.2%;top:93.7%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="28" style="left:59.6%;top:95%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="29" style="left:54.8%;top:95.7%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="30" style="left:50%;top:89%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="31" style="left:45.2%;top:95.7%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="32" style="left:40.4%;top:95%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="33" style="left:35.8%;top:93.7%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="34" style="left:31.3%;top:92%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="35" style="left:30.5%;top:83.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="36" style="left:23%;top:87.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="37" style="left:19.2%;top:84.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="38" style="left:15.8%;top:80.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="39" style="left:12.8%;top:77%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="40" style="left:16.2%;top:69.5%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="41" style="left:8%;top:68.7%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="42" style="left:6.3%;top:64.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="43" style="left:5%;top:59.6%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="44" style="left:4.3%;top:54.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="45" style="left:11%;top:50%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="46" style="left:4.3%;top:45.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="47" style="left:5%;top:40.4%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="48" style="left:6.3%;top:35.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="49" style="left:8%;top:31.3%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="50" style="left:16.2%;top:30.5%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="51" style="left:12.8%;top:23%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="52" style="left:15.8%;top:19.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="53" style="left:19.2%;top:15.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="54" style="left:23%;top:12.8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="55" style="left:30.5%;top:16.2%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="56" style="left:31.3%;top:8%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="57" style="left:35.8%;top:6.3%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="58" style="left:40.4%;top:5%"></button><button class="clocklet-tick clocklet-tick--minute" type="button" data-clocklet-tick-value="59" style="left:45.2%;top:4.3%"></button></div><div class="clocklet-dial clocklet-dial--hour"><div class="clocklet-hand clocklet-hand--hour"></div><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="0" style="left:50%;top:11%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="1" style="left:69.5%;top:16.2%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="2" style="left:83.8%;top:30.5%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="3" style="left:89%;top:50%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="4" style="left:83.8%;top:69.5%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="5" style="left:69.5%;top:83.8%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="6" style="left:50%;top:89%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="7" style="left:30.5%;top:83.8%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="8" style="left:16.2%;top:69.5%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="9" style="left:11%;top:50%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="10" style="left:16.2%;top:30.5%"></button><button class="clocklet-tick clocklet-tick--hour" type="button" data-clocklet-tick-value="11" style="left:30.5%;top:16.2%"></button></div><div class="clocklet-ampm"></div><div class="clocklet-hand-origin"></div></div></div>';

    function V(t, e) {
        return z(t, e, /[Hhk]$/)
    }

    function R(t, e) {
        return z(t, e, /a/i)
    }

    function z(t, e, o) {
        for (var n = 0, l = 0, c = v(e); l < c.length; l++) {
            var i = c[l];
            if (i.literal) n += i.property.length; else {
                var a = t[i.property];
                if (o.test(i.property)) return {index: n, value: a};
                n += a.length
            }
        }
    }

    var F = ["position", "left", "top", "right", "bottom", "marginLeft", "marginTop", "marginRight", "marginBottom"],
        q = matchMedia("(hover: none)").matches, $ = (Z.prototype.open = function (e, t) {
            var o = this, n = x(Object.create(this.defaultOptions), t), l = e.getBoundingClientRect(),
                c = getComputedStyle(e), i = this.container, a = this.root, t = {options: n};
            L(e, "clocklet.opening", !0, !0, t).defaultPrevented || (this.input = e, this.dispatchesInputEvents = n.dispatchesInputEvents, C(a, "placement", n.placement), C(a, "alignment", n.alignment), C(a, "format", n.format), C(a, "append-to", n.appendTo), a.className = "clocklet clocklet--showing " + (q ? "" : "clocklet--hoverable ") + n.className, i.style.zIndex = "" !== n.zIndex ? n.zIndex : (parseInt(c.zIndex, 10) || 0) + 1, "parent" === n.appendTo ? e.parentElement.insertBefore(i, e) : i.parentElement !== document.body && document.body.appendChild(i), "top" === n.placement ? (a.style.top = "", a.style.bottom = "0") : (a.style.top = l.height + "px", a.style.bottom = ""), "right" === n.alignment ? (a.style.left = "", a.style.right = "-" + l.width + "px") : ("center" === n.alignment ? a.style.left = (e.offsetWidth - a.offsetWidth) / 2 + "px" : a.style.left = "0", a.style.right = ""), "fixed" === c.position || "parent" === n.appendTo && "absolute" === c.position ? (this._relocate = void 0, K(i.style, c, F)) : (K(i.style, {}, F), "parent" === n.appendTo ? "flex" === (n = getComputedStyle(e.parentElement)).display || "inline-flex" === n.display ? (i.style.position = "absolute", this._relocate = function () {
                i.style.left = e.offsetLeft + "px", i.style.top = e.offsetTop + "px"
            }) : (i.style.position = "relative", this._relocate = function () {
                i.style.left = i.style.top = "", i.style.left = e.offsetLeft - i.offsetLeft + "px", i.style.top = e.offsetTop - i.offsetTop + "px"
            }) : (i.style.position = "absolute", this._relocate = function () {
                var t = e.getBoundingClientRect();
                i.style.left = document.documentElement.scrollLeft + document.body.scrollLeft + t.left + "px", i.style.top = document.documentElement.scrollTop + document.body.scrollTop + t.top + "px"
            }), this._relocate()), this.updateHighlight(), setTimeout(function () {
                a.classList.remove("clocklet--showing"), o.input && a.classList.add("clocklet--shown")
            }), L(e, "clocklet.opened", !0, !1, t))
        }, Z.prototype.close = function () {
            var t = this.input, e = {};
            t && (L(t, "clocklet.closing", !0, !0, e).defaultPrevented ? t.focus() : (this.input = void 0, this.root.classList.remove("clocklet--shown"), L(t, "clocklet.closed", !0, !1, e)))
        }, Z.prototype.inline = function (t, e) {
            var o = void 0 === e ? {} : e, n = o.input, e = o.format, o = new Z(this.defaultOptions);
            return t.appendChild(o.container), o.container.classList.add("clocklet-container--inline"), o.root.classList.add("clocklet--inline"), o.dispatchesInputEvents = o.defaultOptions.dispatchesInputEvents, e = e || o.defaultOptions.format, C(o.root, "format", e), n || ((n = t.appendChild(document.createElement("input"))).style.display = "none"), n.setAttribute("data-clocklet", "format:" + e), n.setAttribute("data-clocklet-inline", ""), o.input = n, o.updateHighlight(), o
        }, Z.prototype.value = function (t) {
            var e, o, n;
            this.input && (e = this.input.value, o = "string" == typeof t ? E(t) : E(this.input.value).with(void 0 !== t.a ? t : {
                h: t.h,
                m: t.m,
                a: A(this.ampm, "ampm")
            }), n = A(this.root, "format"), this.input.value = o.format(n), "text" !== this.input.type || "object" != typeof t || (n = void 0 !== t.h ? V(o, n) : void 0 !== t.m ? z(o, n, /m$/) : void 0 !== t.a ? R(o, n) || V(o, n) : void 0) && this.input.setSelectionRange(n.index, n.index + n.value.length), this.dispatchesInputEvents && this.input.value !== e && L(this.input, "input", !0, !1, {time: o}))
        }, Z.prototype.updateHighlight = function () {
            var t;
            this.input && ((t = this.input.value ? E(this.input.value) : E.INVALID).valid ? (C(this.root, "value", t.HHmm), this.hour.value(t.hour % 12), this.minute.value(t.minute), C(this.ampm, "ampm", t.a)) : (C(this.root, "value", ""), this.hour.value(-1), this.minute.value(-1), C(this.ampm, "ampm", "am")), t = R(t.valid ? t : E.ZERO, A(this.root, "format")), C(this.ampm, "ampm-formatted", t && t.value || ""))
        }, Z);

    function Z(t) {
        var e, o = this;
        this.container = ((e = document.createElement("div")).className = "clocklet-container", e.innerHTML = B, e), this.root = this.container.firstElementChild, this.plate = this.root.firstElementChild, this.hour = new N(this.plate.getElementsByClassName("clocklet-dial--hour")[0], 12, function (t) {
            return o.value({h: t})
        }), this.minute = new N(this.plate.getElementsByClassName("clocklet-dial--minute")[0], 60, function (t) {
            return o.value({m: t})
        }), this.ampm = this.plate.getElementsByClassName("clocklet-ampm")[0], this.defaultOptions = x(Object.create(D), t), addEventListener("input", function (t) {
            return t.target === o.input && o.updateHighlight()
        }, !0), this.root.addEventListener("mousedown", function (t) {
            return t.preventDefault()
        }), this.ampm.addEventListener("mousedown", function () {
            return o.value({a: "pm" === A(o.ampm, "ampm") ? "am" : "pm"})
        }), this.root.addEventListener("clocklet.dragstart", function () {
            return o.root.classList.add("clocklet--dragging")
        }), this.root.addEventListener("clocklet.dragend", function () {
            return o.root.classList.remove("clocklet--dragging")
        });
        t = function () {
            return o._relocate && o._relocate()
        };
        addEventListener("resize", t), addEventListener("orientationchange", t)
    }

    function K(t, e, o) {
        for (var n = 0, l = o; n < l.length; n++) {
            var c = l[n];
            t[c] = e[c] || ""
        }
    }

    var W, X, Y, U, G, J, Q = {
        dataAttributeName: "clocklet", formatSelector: function (t) {
            t = I(t.getAttribute("data-clocklet"));
            return t && t.format
        }
    };
    return G = (U = Q) && U.dataAttributeName || "lenientime", J = U && U.formatSelector || function (t) {
        return t.dataset.lenientime
    }, addEventListener("change", function (t) {
        var e = t.target, o = e.value, t = e.dataset;
        o && G in t && ((t = (t = E(o)).valid ? t.format(J(e) || "HH:mm") : "") !== o && (e.value = t, _(e)))
    }, !0), X = (W = Q) && W.dataAttributeName || "lenientime", Y = W && W.formatSelector || function (t) {
        return t.dataset.lenientime
    }, W && W.amountSelector, addEventListener("keydown", function (t) {
        var e, o, n, l, c = t.which;
        38 !== c && 40 !== c || t.altKey || t.ctrlKey || t.metaKey || (n = (e = t.target).dataset, X in n && (t.preventDefault(), o = Y(e) || "HH:mm", (n = e.value) ? (l = null === (t = e.selectionStart) ? void 0 : y(o, n, t)) && (t = (38 === c ? 1 : -1) * (W && W.amountSelector && W.amountSelector(e) || 1), void 0 !== (c = l.adjust(t, !0)) && (t = l.index, e.value = n.slice(0, t) + c + n.slice(t + l.value.length), e.setSelectionRange(t, t + c.length), _(e))) : (e.value = E.ZERO.format(o), (l = y(o, e.value, 0)) && e.setSelectionRange(l.index, l.index + l.value.length), _(e))))
    }, !0), function (t) {
        void 0 === t && (t = {});
        var e, o = new $(t.defaultOptions), n = t.target || "input[data-clocklet]:not([data-clocklet-inline])",
            l = t.optionsSelector || function (t) {
                return I(t.getAttribute("data-clocklet"))
            }, t = o.close.bind(o);
        return n instanceof Element ? (n.addEventListener("focus", function (t) {
            return o.open(t.target, l(t.target))
        }), n.addEventListener("blur", t)) : (e = "function" == typeof n ? n : function (t) {
            return (Element.prototype.matches || Element.prototype.msMatchesSelector).call(t, n)
        }, addEventListener("focusin", function (t) {
            t = t.target;
            e(t) && o.open(t, l(t))
        }, !0), addEventListener("focusout", t, !0)), o
    }()
});
