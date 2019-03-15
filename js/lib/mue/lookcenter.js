function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), r = {
    global: {
        normal: 21,
        high: 22,
        low: 23
    },
    single: {
        normal: 24,
        high: 0,
        low: 25
    },
    rank: {
        normal: 26,
        high: 0,
        low: 27
    }
}, n = function() {
    function n() {
        e(this, n);
    }
    return t(n, null, [ {
        key: "add",
        value: function(e, t) {
            var i = r[e];
            i ? t && (t >= 120 ? i.high && n.report([ {
                sid: i.high,
                time: 100 * t
            } ]) : (n.report([ {
                sid: i.normal,
                time: 100 * t
            } ]), t <= 30 && i.low && n.report([ {
                sid: i.low,
                time: 100 * t
            } ]))) : console.warn("No FPS sid for", e);
        }
    }, {
        key: "report",
        value: function(e) {
            var t = {
                pid: 415,
                speeds: []
            }, r = !0, n = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                    var a = o.value;
                    t.speeds.push(a.sid + "_" + a.time);
                }
            } catch (e) {
                n = !0, i = e;
            } finally {
                try {
                    !r && s.return && s.return();
                } finally {
                    if (n) throw i;
                }
            }
            t.speeds = t.speeds.join(";"), wx.request({
                url: "https://badjs.weixinbridge.com/frontend/reportspeed",
                method: "GET",
                data: t
            });
        }
    } ]), n;
}(), i = function() {
    function r() {
        e(this, r), this.avg = 0, this.pre = 0, this.count = 0;
    }
    return t(r, [ {
        key: "add",
        value: function(e) {
            this.avg = 1 * ((this.pre * this.count + e) / (this.count + 1)).toFixed(2), this.pre = e, 
            this.count++;
        }
    }, {
        key: "get",
        value: function() {
            return this.avg;
        }
    } ]), r;
}(), o = new (function() {
    function r() {
        e(this, r), this.performance = wx.getPerformance(), this.preFrameTime = 0, this.frame = 0, 
        this.fps = 0, this.isStarted = !1, this.scenes = {}, window.requestAnimationFrame(this.loop);
    }
    return t(r, [ {
        key: "startScenes",
        value: function(e, t) {
            var r = o;
            t || (t = .05), Math.random() <= t && (r.scenes[e] = new i(), r.isStarted = !0);
        }
    }, {
        key: "stopScenes",
        value: function(e) {
            var t = o;
            if (t.scenes[e]) {
                var r = t.scenes[e].get();
                console.debug("Avg fps:", e, r), n.add(e, r), delete t.scenes[e], 0 === Object.keys(t.scenes).length && (t.isStarted = !1, 
                t.reset());
            }
        }
    }, {
        key: "stopAll",
        value: function() {
            var e = o;
            for (var t in e.scenes) e.stopScenes(t);
        }
    }, {
        key: "reset",
        value: function() {
            var e = o;
            e.preFrameTime = 0, e.frame = 0, e.fps = 0;
        }
    }, {
        key: "loop",
        value: function() {
            var e = o;
            if (e.preFrameTime) {
                if (e.isStarted) {
                    e.frame++;
                    var t = Date.now(), r = t - e.preFrameTime;
                    if (r >= 1e3) {
                        e.fps = 1 * (e.frame / (r / 1e3)).toFixed(2), e.frame = 0, e.preFrameTime = t;
                        for (var n in e.scenes) e.scenes[n].add(e.fps);
                    }
                }
            } else e.preFrameTime = Date.now();
            window.requestAnimationFrame(e.loop);
        }
    } ]), r;
}())();

exports.default = o;