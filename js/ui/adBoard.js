function e(e) {
    if (Array.isArray(e)) {
        for (var i = 0, t = Array(e.length); i < e.length; i++) t[i] = e[i];
        return t;
    }
    return Array.from(e);
}

function i(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var a = i[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(i, t, a) {
        return t && e(i.prototype, t), a && e(i, a), i;
    };
}(), a = require("../config"), r = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    return i.default = e, i;
}(require("../lib/three")), o = require("../lib/animation"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../lib/mue/eventcenter")), s = a.AD_BOARD.RADIUS, u = a.AD_BOARD.x, l = function() {
    function l(e) {
        var t = this;
        i(this, l), this.camera = e.camera;
        var o = e.trademark_url;
        this.ad_url = e.ad_url, this.navigateToMiniProgramData = e.navigateToMiniProgramData;
        var h = new r.MeshBasicMaterial({
            map: a.loader.load(a.BASE_TRADE_MARK_RUL),
            transparent: !0,
            opacity: 0
        }), m = new r.CircleGeometry(s, 32);
        this.mesh = new r.Mesh(m, h), this.ePosition = [ u, 22, 10 ], this.sPosition = [ u, 20, 10 ], 
        this.mesh.visible = !1, this.camera.add(this.mesh), n.default.on(a.EVENT.TRIGGER_AD_JUMP, this.jumpToH5.bind(this)), 
        o ? a.loader.load(o, function(e) {
            t.mesh.material.map = e, t.mesh.material.needsUpdate = !0, t.show();
        }, function() {}, function(e) {
            console.error("load AD texture error:" + e), t.show();
        }) : this.show();
    }
    return t(l, [ {
        key: "show",
        value: function() {
            var i;
            (i = this.mesh.position).set.apply(i, e(this.sPosition)), this.mesh.material.opacity = 0, 
            this.mesh.visible = !0, o.customAnimation.to(this.mesh.position, .4, {
                y: this.ePosition[1]
            }), o.customAnimation.to(this.mesh.material, .4, {
                opacity: 1
            });
        }
    }, {
        key: "jumpToH5",
        value: function() {
            if (this.mesh.visible) {
                if (this.ad_url && wx.openUrl && wx.openUrl({
                    url: this.ad_url
                }), this.navigateToMiniProgramData) {
                    var e = this.navigateToMiniProgramData, i = e.appId, t = void 0 === i ? "" : i, r = e.path, o = void 0 === r ? "" : r, s = e.extraData, u = void 0 === s ? "" : s;
                    wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                        appId: t,
                        path: o,
                        extraData: u,
                        success: function() {
                            console.log("--navigateToMiniProgram");
                        },
                        fail: function(e) {
                            console.log("--navigateToMiniProgram fail", e);
                        }
                    });
                }
                this.mesh.visible = !1, n.default.emit(a.EVENT.JUMP_AD, {});
            }
        }
    }, {
        key: "destroy",
        value: function() {
            this.camera.remove(this.mesh), n.default.off(a.EVENT.TRIGGER_AD_JUMP, this.jumpToH5.bind(this));
        }
    } ]), l;
}();

exports.default = l;