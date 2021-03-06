/*press-1.0*/
function HashTable(b) {
    this.length = 0;
    this.items = {};
    for (var a in b) {
        if (b.hasOwnProperty(a)) {
            this.items[a] = b[a];
            this.length++
        }
    }
}
HashTable.prototype.setItem = function (a, c) {
    var b = undefined;
    if (this.hasItem(a)) {
        b = this.items[a]
    } else {
        this.length++
    }
    this.items[a] = c;
    return b
};
HashTable.prototype.getItem = function (a) {
    return this.hasItem(a) ? this.items[a] : undefined
};
HashTable.prototype.hasItem = function (a) {
    return this.items.hasOwnProperty(a)
};
HashTable.prototype.removeItem = function (a) {
    if (this.hasItem(a)) {
        previous = this.items[a];
        this.length--;
        delete this.items[a];
        return previous
    } else {
        return undefined
    }
};
HashTable.prototype.keys = function () {
    var b = [];
    for (var a in this.items) {
        if (this.hasItem(a)) {
            b.push(a)
        }
    }
    return b
};
HashTable.prototype.values = function () {
    var b = [];
    for (var a in this.items) {
        if (this.hasItem(a)) {
            b.push(this.items[a])
        }
    }
    return b
};
HashTable.prototype.each = function (b) {
    for (var a in this.items) {
        if (this.hasItem(a)) {
            b(a, this.items[a])
        }
    }
};
HashTable.prototype.clear = function () {
    this.items = {};
    this.length = 0
};
(function (a) {
    a.fn.closable = function (b) {
        var c = {
            handle: null,
            closeHandler: null,
            cssClass: "closebox",
            imageUrl: null,
            fadeOut: null
        };
        a.extend(c, b);
        return this.each(function (d) {
            var f = a(this);
            var j = f.css("position");
            if (!j || j == "static") {
                f.css("position", "relative")
            }
            var e = c.handle ? a(c.handle).css({
                position: "relative"
            }) : f;
            var g = c.imageUrl ? a("<img>").attr("src", c.imageUrl).css("cursor", "pointer") : a("<div>");
            g.addClass(c.cssClass).click(function (h) {
                if (c.closeHandler) {
                    if (!c.closeHandler.call(this, h)) {
                        return
                    }
                }
                if (c.fadeOut) {
                    a(f).fadeOut(c.fadeOut)
                } else {
                    a(f).hide()
                }
            });
            if (c.imageUrl) {
                g.css("background-image", "none")
            }
            e.append(g)
        })
    }
})(jQuery);
(function () {
    var b = 0;
    var a = 0;
    var e = 0;

    function f(m) {
        m = m || {};
        this.latlng_ = null;
        this.text_ = null;
        this.div_ = null;
        this.cursorNode = null;
        this.style_ = m.style || {}
    }
    f.prototype = new google.maps.OverlayView();
    f.prototype.onAdd = function () {
        var o = document.createElement("DIV");
        o.style.border = "1px solid black";
        o.style.position = "absolute";
        o.style.whiteSpace = "nowrap";
        o.style.backgroundColor = "white";
        if (this.style_) {
            for (var m in this.style_) {
                if (this.style_.hasOwnProperty(m)) {
                    o.style[m] = this.style_[m]
                }
            }
        }
        this.div_ = o;
        var n = this.getPanes();
        this.cursorNode = n.overlayLayer.parentNode;
        n.floatPane.appendChild(o);
        google.maps.event.trigger(this, "ready")
    };
    f.prototype.draw = function () {
        var n = this.getProjection();
        if (this.latlng_) {
            var m = n.fromLatLngToDivPixel(this.latlng_);
            var o = this.div_;
            o.style.left = (m.x - 20) + "px";
            o.style.top = (m.y + 20) + "px";
            o.innerHTML = this.text_
        }
    };
    f.prototype.onRemove = function () {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null
    };
    f.prototype.hide = function () {
        if (this.div_) {
            this.div_.style.visibility = "hidden"
        }
    };
    f.prototype.show = function (n, m) {
        if (this.div_) {
            this.div_.style.visibility = "visible"
        }
        if (n || m) {
            this.latlng_ = n || this.latlng_;
            this.text_ = m;
            this.draw()
        }
    };
    f.prototype.setUrlTokenResolver = function (m) {
        this.urlTokenResolver_ = m
    };
    f.prototype.setCustomQueryUrl = function (m) {
        this.customQueryUrl_ = m
    };
    f.prototype.getCustomQueryUrl = function () {
        return this.customQueryUrl_
    };

    function h(n) {
        var o = 0;
        var m = 0;
        if (n.offsetParent) {
            do {
                o += n.offsetLeft;
                m += n.offsetTop;
                n = n.offsetParent
            } while (n != null)
        }
        return {
            x: o,
            y: m
        }
    }

    function c(n) {
        var m = 0;
        var o = 0;
        if (!n) {
            var n = window.event
        }
        if (n.pageX || n.pageY) {
            m = n.pageX;
            o = n.pageY
        } else {
            if (n.clientX || n.clientY) {
                m = n.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                o = n.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }
        }
        return {
            x: m,
            y: o
        }
    }

    function j(n, m) {
        if (n.style[m]) {
            return n.style[m]
        } else {
            if (n.getComputedStyle) {
                return n.getComputedStyle()[m]
            } else {
                if (n.currentStyle) {
                    return n.currentStyle[m]
                } else {
                    if (window.getComputedStyle) {
                        return document.defaultView.getComputedStyle(n, null).getPropertyValue(m)
                    }
                }
            }
        }
        return null
    }

    function k(o, n) {
        if (n == null) {
            return false
        }
        for (var m in o) {
            if (o.hasOwnProperty(m)) {
                if (!n[m] || n[m].value != o[m].value) {
                    return false
                }
            }
        }
        return true
    }
    var l = 0;
    google.maps.FusionTablesLayer.prototype.enableMapTips = function (n) {
        n = n || {};
        var w = new f(null, null);
        var y = this;
        var v = null;
        var q = null;
        var A = null;
        var o = null;
        var t = false;
        var u = h(y.getMap().getDiv());
        var B = n.tolerance || 6;
        google.maps.event.addListenerOnce(w, "ready", function () {
            y.mousemoveListener_ = google.maps.event.addDomListener(y.getMap().getDiv(), "mousemove", function (E) {
                var D = E.clientX;
                var H = E.clientY;
                if (b === D && a === H) {
                    e++
                } else {
                    e = 0
                }
                if (e >= 2) {
                    return
                }
                if (o) {
                    window.clearTimeout(o);
                    o = null
                }
                var G = j(w.cursorNode, "cursor");
                if (G != q && q == "pointer") {
                    google.maps.event.trigger(y, "mouseout", {
                        row: A
                    });
                    A = null;
                    w.hide()
                } else {
                    if (G == "pointer" && !t && !o) {
                        var C = c(E);
                        var F = new google.maps.Point(C.x - u.x, C.y - u.y);
                        v = w.getProjection().fromContainerPixelToLatLng(F);
                        if (n.useCustomQuery) {
                            w.setCustomQueryUrl(n.customQueryUrl);
                            w.setUrlTokenResolver(n.urlTokenResolver);
                            o = window.setTimeout(x, n.delay || 400)
                        } else {
                            o = window.setTimeout(p, n.delay || 400)
                        }
                    } else {}
                }
                q = G;
                b = D;
                a = H
            })
        });
        w.setMap(this.getMap());
        this.maptipOverlay_ = w;
        if (typeof (Number.prototype.toRad) === "undefined") {
            Number.prototype.toRad = function () {
                return this * Math.PI / 180
            }
        }

        function x() {
            if (t) {
                return
            }
            var O = v;
            var P = w.getProjection();
            var R = P.fromLatLngToDivPixel(O);
            R.x -= B;
            R.y += B;
            var S = P.fromDivPixelToLatLng(R);
            R.x += B * 2;
            R.y -= B * 2;
            var M = P.fromDivPixelToLatLng(R);
            var N = new google.maps.LatLngBounds(S, M);
            var K = N.getNorthEast().lat();
            var J = N.getSouthWest().lat();
            var ac = N.getNorthEast().lng();
            var ab = N.getSouthWest().lng();
            var H = 6371000;
            var L = (J - K).toRad();
            var ae = (ab - ac).toRad();
            var K = K.toRad();
            var J = J.toRad();
            var I = Math.sin(L / 2);
            var G = Math.sin(L / 2);
            var F = Math.sin(ae / 2);
            var E = Math.sin(ae / 2);
            var D = Math.cos(K);
            var C = Math.cos(J);
            var aa = I * G;
            var Z = F * E * D * C;
            var Y = aa + Z;
            var W = 2 * Math.atan2(Math.sqrt(Y), Math.sqrt(1 - Y));
            var V = H * W;
            var O = P.fromDivPixelToLatLng(R);
            var U = w.getCustomQueryUrl();
            if (U === undefined) {
                return
            }
            var T = O.lat() + " " + O.lng();
            var Q = Math.round(V / 2);
            U = U.replace("{lnglatText}", T);
            U = U.replace("{radius}", Q);
            var X = w.urlTokenResolver_;
            if (X !== undefined && X !== null) {
                for (var ad in w.urlTokenResolver_) {
                    U = U.replace("{" + ad + "}", X[ad])
                }
            }
            t = true;
            jQuery.ajax({
                dataType: "json",
                url: U,
                async: true,
                error: function (ag, af, ah) {
                    console.log("mapTip query error: " + ah);
                    t = false
                },
                success: function (af) {
                    r(af, O);
                    t = false
                }
            })
        }

        function p() {
            if (t) {
                return
            }
            var J = v;
            var E = w.getProjection();
            var G = E.fromLatLngToDivPixel(J);
            G.x -= B;
            G.y += B;
            var D = E.fromDivPixelToLatLng(G);
            G.x += B * 2;
            G.y -= B * 2;
            var I = E.fromDivPixelToLatLng(G);
            var H = new google.maps.LatLngBounds(D, I);
            var C = "ST_INTERSECTS(" + n.geometryColumn + ",RECTANGLE(LATLNG(" + H.getSouthWest().lat() + "," + H.getSouthWest().lng() + "),LATLNG(" + H.getNorthEast().lat() + "," + H.getNorthEast().lng() + ")))";
            var F = encodeURIComponent("SELECT " + n.select + " FROM " + n.from + " WHERE " + C);
            t = true;
            m(J, F)
        }

        function s(E, D) {
            var C = new google.visualization.Query("http://www.google.com/fusiontables/gvizdata?tq=" + D);
            C.send(function (G) {
                t = false;
                var H = G.getDataTable();
                html = "";
                var K = {};
                if (H) {
                    var I = H.getNumberOfRows();
                    var J = H.getNumberOfColumns();
                    if (I > 0) {
                        for (i = 0; i < J; i++) {
                            html += H.getValue(0, i) + "<br/>";
                            var F = {
                                columnName: H.getColumnLabel(i),
                                value: H.getValue(0, i)
                            };
                            K[H.getColumnLabel(i)] = F
                        }
                    }
                } else {}
                z(html, E, K)
            })
        }
        window.fusiontips = window.fusiontips || {};

        function m(F, E) {
            var D = document.createElement("script");
            var C = "query_" + l++;
            D.setAttribute("src", "http://fusiontables.googleusercontent.com/fusiontables/api/query?sql=" + E + "&jsonCallback=fusiontips." + C);
            D.setAttribute("id", "fusiontips." + C);
            window.fusiontips[C] = function (G) {
                t = false;
                r(G, F);
                delete window.fusiontips[C];
                D.parentNode.removeChild(D)
            };
            document.getElementsByTagName("head")[0].appendChild(D)
        }

        function r(D, I) {
            var E = D.table;
            html = "";
            var H = null;
            if (d != null) {
                html = d(E, I)
            } else {
                if (E) {
                    var F = E.rows.length;
                    var G = E.cols.length;
                    if (F > 0) {
                        H = {};
                        for (i = 0; i < G; i++) {
                            html += E.rows[0][i] + "<br/>";
                            var C = {
                                columnName: E.cols[i],
                                value: E.rows[0][i]
                            };
                            H[E.cols[i]] = C
                        }
                    }
                } else {}
            }
            z(html, I, H)
        }

        function z(C, E, D) {
            if (!n.suppressMapTips && w && E && C) {
                w.show(E, C)
            }
            if (D && !k(D, A)) {
                if (A) {
                    google.maps.event.trigger(y, "mouseout", {
                        row: A
                    })
                }
                google.maps.event.trigger(y, "mouseover", {
                    infoWindowHtml: C,
                    latLng: E,
                    row: D
                })
            }
            A = D
        }
    };
    var d = null;
    google.maps.FusionTablesLayer.prototype.setMapTipsHtmlRender = function (m) {
        d = m
    };
    google.maps.FusionTablesLayer.prototype.disableMapTips = function () {
        if (this.maptipOverlay_) {
            this.maptipOverlay_.setMap(null);
            this.maptipOverlay_ = null
        }
        if (this.mousemoveListener_) {
            google.maps.event.removeListener(this.mousemoveListener_);
            this.mousemoveListener_ = null
        }
    };
    var g = google.maps.FusionTablesLayer.prototype.setMap;
    google.maps.FusionTablesLayer.prototype.setMap = function (m) {
        if (m == null) {
            this.disableMapTips()
        }
        g.call(this, m)
    }
})();
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
(function (a, b) {
    if (typeof exports === "object" && exports) {
        b(exports)
    } else {
        var c = {};
        b(c);
        if (typeof define === "function" && define.amd) {
            define(c)
        } else {
            a.Mustache = c
        }
    }
}(this, function (a) {
    var e = /\s*/;
    var l = /\s+/;
    var j = /\S/;
    var h = /\s*=/;
    var n = /\s*\}/;
    var t = /#|\^|\/|>|\{|&|=|!/;
    var f = RegExp.prototype.test;

    function s(z, y) {
        return f.call(z, y)
    }

    function g(y) {
        return !s(j, y)
    }
    var v = Object.prototype.toString;
    var k = Array.isArray || function (y) {
        return v.call(y) === "[object Array]"
    };

    function d(y) {
        return y.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    }
    var c = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };

    function m(y) {
        return String(y).replace(/[&<>"'\/]/g, function (z) {
            return c[z]
        })
    }

    function u(y) {
        this.string = y;
        this.tail = y;
        this.pos = 0
    }
    u.prototype.eos = function () {
        return this.tail === ""
    };
    u.prototype.scan = function (z) {
        var y = this.tail.match(z);
        if (y && y.index === 0) {
            this.tail = this.tail.substring(y[0].length);
            this.pos += y[0].length;
            return y[0]
        }
        return ""
    };
    u.prototype.scanUntil = function (z) {
        var y, A = this.tail.search(z);
        switch (A) {
        case -1:
            y = this.tail;
            this.pos += this.tail.length;
            this.tail = "";
            break;
        case 0:
            y = "";
            break;
        default:
            y = this.tail.substring(0, A);
            this.tail = this.tail.substring(A);
            this.pos += A
        }
        return y
    };

    function r(y, z) {
        this.view = y || {};
        this.parent = z;
        this._cache = {}
    }
    r.make = function (y) {
        return (y instanceof r) ? y : new r(y)
    };
    r.prototype.push = function (y) {
        return new r(y, this)
    };
    r.prototype.lookup = function (y) {
        var B = this._cache[y];
        if (!B) {
            if (y == ".") {
                B = this.view
            } else {
                var A = this;
                while (A) {
                    if (y.indexOf(".") > 0) {
                        B = A.view;
                        var C = y.split("."),
                            z = 0;
                        while (B && z < C.length) {
                            B = B[C[z++]]
                        }
                    } else {
                        B = A.view[y]
                    }
                    if (B != null) {
                        break
                    }
                    A = A.parent
                }
            }
            this._cache[y] = B
        }
        if (typeof B === "function") {
            B = B.call(this.view)
        }
        return B
    };

    function p() {
        this.clearCache()
    }
    p.prototype.clearCache = function () {
        this._cache = {};
        this._partialCache = {}
    };
    p.prototype.compile = function (A, y) {
        var z = this._cache[A];
        if (!z) {
            var B = a.parse(A, y);
            z = this._cache[A] = this.compileTokens(B, A)
        }
        return z
    };
    p.prototype.compilePartial = function (z, B, y) {
        var A = this.compile(B, y);
        this._partialCache[z] = A;
        return A
    };
    p.prototype.getPartial = function (y) {
        if (!(y in this._partialCache) && this._loadPartial) {
            this.compilePartial(y, this._loadPartial(y))
        }
        return this._partialCache[y]
    };
    p.prototype.compileTokens = function (A, z) {
        var y = this;
        return function (B, D) {
            if (D) {
                if (typeof D === "function") {
                    y._loadPartial = D
                } else {
                    for (var C in D) {
                        y.compilePartial(C, D[C])
                    }
                }
            }
            return o(A, y, r.make(B), z)
        }
    };
    p.prototype.render = function (A, y, z) {
        return this.compile(A)(y, z)
    };

    function o(F, z, y, I) {
        var C = "";
        var A, G, H;
        for (var D = 0, E = F.length; D < E; ++D) {
            A = F[D];
            G = A[1];
            switch (A[0]) {
            case "#":
                H = y.lookup(G);
                if (typeof H === "object") {
                    if (k(H)) {
                        for (var B = 0, K = H.length; B < K; ++B) {
                            C += o(A[4], z, y.push(H[B]), I)
                        }
                    } else {
                        if (H) {
                            C += o(A[4], z, y.push(H), I)
                        }
                    }
                } else {
                    if (typeof H === "function") {
                        var J = I == null ? null : I.slice(A[3], A[5]);
                        H = H.call(y.view, J, function (L) {
                            return z.render(L, y)
                        });
                        if (H != null) {
                            C += H
                        }
                    } else {
                        if (H) {
                            C += o(A[4], z, y, I)
                        }
                    }
                }
                break;
            case "^":
                H = y.lookup(G);
                if (!H || (k(H) && H.length === 0)) {
                    C += o(A[4], z, y, I)
                }
                break;
            case ">":
                H = z.getPartial(G);
                if (typeof H === "function") {
                    C += H(y)
                }
                break;
            case "&":
                H = y.lookup(G);
                if (H != null) {
                    C += H
                }
                break;
            case "name":
                H = y.lookup(G);
                if (H != null) {
                    C += a.escape(H)
                }
                break;
            case "text":
                C += G;
                break
            }
        }
        return C
    }

    function x(E) {
        var z = [];
        var D = z;
        var F = [];
        var B;
        for (var A = 0, y = E.length; A < y; ++A) {
            B = E[A];
            switch (B[0]) {
            case "#":
            case "^":
                F.push(B);
                D.push(B);
                D = B[4] = [];
                break;
            case "/":
                var C = F.pop();
                C[5] = B[2];
                D = F.length > 0 ? F[F.length - 1][4] : z;
                break;
            default:
                D.push(B)
            }
        }
        return z
    }

    function b(D) {
        var A = [];
        var C, z;
        for (var B = 0, y = D.length; B < y; ++B) {
            C = D[B];
            if (C) {
                if (C[0] === "text" && z && z[0] === "text") {
                    z[1] += C[1];
                    z[3] = C[3]
                } else {
                    z = C;
                    A.push(C)
                }
            }
        }
        return A
    }

    function q(y) {
        return [new RegExp(d(y[0]) + "\\s*"), new RegExp("\\s*" + d(y[1]))]
    }

    function w(O, E) {
        O = O || "";
        E = E || a.tags;
        if (typeof E === "string") {
            E = E.split(l)
        }
        if (E.length !== 2) {
            throw new Error("Invalid tags: " + E.join(", "))
        }
        var I = q(E);
        var A = new u(O);
        var G = [];
        var F = [];
        var D = [];
        var P = false;
        var N = false;

        function M() {
            if (P && !N) {
                while (D.length) {
                    delete F[D.pop()]
                }
            } else {
                D = []
            }
            P = false;
            N = false
        }
        var B, z, H, J, C;
        while (!A.eos()) {
            B = A.pos;
            H = A.scanUntil(I[0]);
            if (H) {
                for (var K = 0, L = H.length; K < L; ++K) {
                    J = H.charAt(K);
                    if (g(J)) {
                        D.push(F.length)
                    } else {
                        N = true
                    }
                    F.push(["text", J, B, B + 1]);
                    B += 1;
                    if (J == "\n") {
                        M()
                    }
                }
            }
            if (!A.scan(I[0])) {
                break
            }
            P = true;
            z = A.scan(t) || "name";
            A.scan(e);
            if (z === "=") {
                H = A.scanUntil(h);
                A.scan(h);
                A.scanUntil(I[1])
            } else {
                if (z === "{") {
                    H = A.scanUntil(new RegExp("\\s*" + d("}" + E[1])));
                    A.scan(n);
                    A.scanUntil(I[1]);
                    z = "&"
                } else {
                    H = A.scanUntil(I[1])
                }
            }
            if (!A.scan(I[1])) {
                throw new Error("Unclosed tag at " + A.pos)
            }
            C = [z, H, B, A.pos];
            F.push(C);
            if (z === "#" || z === "^") {
                G.push(C)
            } else {
                if (z === "/") {
                    if (G.length === 0) {
                        throw new Error('Unopened section "' + H + '" at ' + B)
                    }
                    var y = G.pop();
                    if (y[1] !== H) {
                        throw new Error('Unclosed section "' + y[1] + '" at ' + B)
                    }
                } else {
                    if (z === "name" || z === "{" || z === "&") {
                        N = true
                    } else {
                        if (z === "=") {
                            E = H.split(l);
                            if (E.length !== 2) {
                                throw new Error("Invalid tags at " + B + ": " + E.join(", "))
                            }
                            I = q(E)
                        }
                    }
                }
            }
        }
        var y = G.pop();
        if (y) {
            throw new Error('Unclosed section "' + y[1] + '" at ' + A.pos)
        }
        F = b(F);
        return x(F)
    }
    a.name = "mustache.js";
    a.version = "0.7.2";
    a.tags = ["{{", "}}"];
    a.Scanner = u;
    a.Context = r;
    a.Writer = p;
    a.parse = w;
    a.escape = m;
    var i = new p();
    a.clearCache = function () {
        return i.clearCache()
    };
    a.compile = function (z, y) {
        return i.compile(z, y)
    };
    a.compilePartial = function (z, A, y) {
        return i.compilePartial(z, A, y)
    };
    a.compileTokens = function (z, y) {
        return i.compileTokens(z, y)
    };
    a.render = function (A, y, z) {
        return i.render(A, y, z)
    };
    a.to_html = function (B, z, A, C) {
        var y = a.render(B, z, A);
        if (typeof C === "function") {
            C(y)
        } else {
            return y
        }
    }
}));
/*! jQuery UI - v1.11.1 - 2014-08-13
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function (I) {
    /*!
     * jQuery UI Core 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */
    I.ui = I.ui || {};
    I.extend(I.ui, {
        version: "1.11.1",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    I.fn.extend({
        scrollParent: function (ag) {
            var af = this.css("position"),
                ae = af === "absolute",
                ah = ag ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                ai = this.parents().filter(function () {
                    var aj = I(this);
                    if (ae && aj.css("position") === "static") {
                        return false
                    }
                    return ah.test(aj.css("overflow") + aj.css("overflow-y") + aj.css("overflow-x"))
                }).eq(0);
            return af === "fixed" || !ai.length ? I(this[0].ownerDocument || document) : ai
        },
        uniqueId: (function () {
            var ae = 0;
            return function () {
                return this.each(function () {
                    if (!this.id) {
                        this.id = "ui-id-" + (++ae)
                    }
                })
            }
        })(),
        removeUniqueId: function () {
            return this.each(function () {
                if (/^ui-id-\d+$/.test(this.id)) {
                    I(this).removeAttr("id")
                }
            })
        }
    });

    function v(ag, ae) {
        var ai, ah, af, aj = ag.nodeName.toLowerCase();
        if ("area" === aj) {
            ai = ag.parentNode;
            ah = ai.name;
            if (!ag.href || !ah || ai.nodeName.toLowerCase() !== "map") {
                return false
            }
            af = I("img[usemap='#" + ah + "']")[0];
            return !!af && w(af)
        }
        return (/input|select|textarea|button|object/.test(aj) ? !ag.disabled : "a" === aj ? ag.href || ae : ae) && w(ag)
    }

    function w(ae) {
        return I.expr.filters.visible(ae) && !I(ae).parents().addBack().filter(function () {
            return I.css(this, "visibility") === "hidden"
        }).length
    }
    I.extend(I.expr[":"], {
        data: I.expr.createPseudo ? I.expr.createPseudo(function (ae) {
            return function (af) {
                return !!I.data(af, ae)
            }
        }) : function (ag, af, ae) {
            return !!I.data(ag, ae[3])
        },
        focusable: function (ae) {
            return v(ae, !isNaN(I.attr(ae, "tabindex")))
        },
        tabbable: function (ag) {
            var ae = I.attr(ag, "tabindex"),
                af = isNaN(ae);
            return (af || ae >= 0) && v(ag, !af)
        }
    });
    if (!I("<a>").outerWidth(1).jquery) {
        I.each(["Width", "Height"], function (ag, ae) {
            var af = ae === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                ah = ae.toLowerCase(),
                aj = {
                    innerWidth: I.fn.innerWidth,
                    innerHeight: I.fn.innerHeight,
                    outerWidth: I.fn.outerWidth,
                    outerHeight: I.fn.outerHeight
                };

            function ai(am, al, ak, an) {
                I.each(af, function () {
                    al -= parseFloat(I.css(am, "padding" + this)) || 0;
                    if (ak) {
                        al -= parseFloat(I.css(am, "border" + this + "Width")) || 0
                    }
                    if (an) {
                        al -= parseFloat(I.css(am, "margin" + this)) || 0
                    }
                });
                return al
            }
            I.fn["inner" + ae] = function (ak) {
                if (ak === undefined) {
                    return aj["inner" + ae].call(this)
                }
                return this.each(function () {
                    I(this).css(ah, ai(this, ak) + "px")
                })
            };
            I.fn["outer" + ae] = function (ak, al) {
                if (typeof ak !== "number") {
                    return aj["outer" + ae].call(this, ak)
                }
                return this.each(function () {
                    I(this).css(ah, ai(this, ak, true, al) + "px")
                })
            }
        })
    }
    if (!I.fn.addBack) {
        I.fn.addBack = function (ae) {
            return this.add(ae == null ? this.prevObject : this.prevObject.filter(ae))
        }
    }
    if (I("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        I.fn.removeData = (function (ae) {
            return function (af) {
                if (arguments.length) {
                    return ae.call(this, I.camelCase(af))
                } else {
                    return ae.call(this)
                }
            }
        })(I.fn.removeData)
    }
    I.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    I.fn.extend({
        focus: (function (ae) {
            return function (af, ag) {
                return typeof af === "number" ? this.each(function () {
                    var ah = this;
                    setTimeout(function () {
                        I(ah).focus();
                        if (ag) {
                            ag.call(ah)
                        }
                    }, af)
                }) : ae.apply(this, arguments)
            }
        })(I.fn.focus),
        disableSelection: (function () {
            var ae = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(ae + ".ui-disableSelection", function (af) {
                    af.preventDefault()
                })
            }
        })(),
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function (ah) {
            if (ah !== undefined) {
                return this.css("zIndex", ah)
            }
            if (this.length) {
                var af = I(this[0]),
                    ae, ag;
                while (af.length && af[0] !== document) {
                    ae = af.css("position");
                    if (ae === "absolute" || ae === "relative" || ae === "fixed") {
                        ag = parseInt(af.css("zIndex"), 10);
                        if (!isNaN(ag) && ag !== 0) {
                            return ag
                        }
                    }
                    af = af.parent()
                }
            }
            return 0
        }
    });
    I.ui.plugin = {
        add: function (af, ag, ai) {
            var ae, ah = I.ui[af].prototype;
            for (ae in ai) {
                ah.plugins[ae] = ah.plugins[ae] || [];
                ah.plugins[ae].push([ag, ai[ae]])
            }
        },
        call: function (ae, ah, ag, af) {
            var ai, aj = ae.plugins[ah];
            if (!aj) {
                return
            }
            if (!af && (!ae.element[0].parentNode || ae.element[0].parentNode.nodeType === 11)) {
                return
            }
            for (ai = 0; ai < aj.length; ai++) {
                if (ae.options[aj[ai][0]]) {
                    aj[ai][1].apply(ae.element, ag)
                }
            }
        }
    };
    /*!
     * jQuery UI Widget 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */
    var O = 0,
        i = Array.prototype.slice;
    I.cleanData = (function (ae) {
        return function (af) {
            var ah, ai, ag;
            for (ag = 0;
                (ai = af[ag]) != null; ag++) {
                try {
                    ah = I._data(ai, "events");
                    if (ah && ah.remove) {
                        I(ai).triggerHandler("remove")
                    }
                } catch (aj) {}
            }
            ae(af)
        }
    })(I.cleanData);
    I.widget = function (ae, af, am) {
        var aj, ak, ah, al, ag = {},
            ai = ae.split(".")[0];
        ae = ae.split(".")[1];
        aj = ai + "-" + ae;
        if (!am) {
            am = af;
            af = I.Widget
        }
        I.expr[":"][aj.toLowerCase()] = function (an) {
            return !!I.data(an, aj)
        };
        I[ai] = I[ai] || {};
        ak = I[ai][ae];
        ah = I[ai][ae] = function (an, ao) {
            if (!this._createWidget) {
                return new ah(an, ao)
            }
            if (arguments.length) {
                this._createWidget(an, ao)
            }
        };
        I.extend(ah, ak, {
            version: am.version,
            _proto: I.extend({}, am),
            _childConstructors: []
        });
        al = new af();
        al.options = I.widget.extend({}, al.options);
        I.each(am, function (ao, an) {
            if (!I.isFunction(an)) {
                ag[ao] = an;
                return
            }
            ag[ao] = (function () {
                var ap = function () {
                        return af.prototype[ao].apply(this, arguments)
                    },
                    aq = function (ar) {
                        return af.prototype[ao].apply(this, ar)
                    };
                return function () {
                    var au = this._super,
                        ar = this._superApply,
                        at;
                    this._super = ap;
                    this._superApply = aq;
                    at = an.apply(this, arguments);
                    this._super = au;
                    this._superApply = ar;
                    return at
                }
            })()
        });
        ah.prototype = I.widget.extend(al, {
            widgetEventPrefix: ak ? (al.widgetEventPrefix || ae) : ae
        }, ag, {
            constructor: ah,
            namespace: ai,
            widgetName: ae,
            widgetFullName: aj
        });
        if (ak) {
            I.each(ak._childConstructors, function (ao, ap) {
                var an = ap.prototype;
                I.widget(an.namespace + "." + an.widgetName, ah, ap._proto)
            });
            delete ak._childConstructors
        } else {
            af._childConstructors.push(ah)
        }
        I.widget.bridge(ae, ah);
        return ah
    };
    I.widget.extend = function (aj) {
        var af = i.call(arguments, 1),
            ai = 0,
            ae = af.length,
            ag, ah;
        for (; ai < ae; ai++) {
            for (ag in af[ai]) {
                ah = af[ai][ag];
                if (af[ai].hasOwnProperty(ag) && ah !== undefined) {
                    if (I.isPlainObject(ah)) {
                        aj[ag] = I.isPlainObject(aj[ag]) ? I.widget.extend({}, aj[ag], ah) : I.widget.extend({}, ah)
                    } else {
                        aj[ag] = ah
                    }
                }
            }
        }
        return aj
    };
    I.widget.bridge = function (af, ae) {
        var ag = ae.prototype.widgetFullName || af;
        I.fn[af] = function (aj) {
            var ah = typeof aj === "string",
                ai = i.call(arguments, 1),
                ak = this;
            aj = !ah && ai.length ? I.widget.extend.apply(null, [aj].concat(ai)) : aj;
            if (ah) {
                this.each(function () {
                    var am, al = I.data(this, ag);
                    if (aj === "instance") {
                        ak = al;
                        return false
                    }
                    if (!al) {
                        return I.error("cannot call methods on " + af + " prior to initialization; attempted to call method '" + aj + "'")
                    }
                    if (!I.isFunction(al[aj]) || aj.charAt(0) === "_") {
                        return I.error("no such method '" + aj + "' for " + af + " widget instance")
                    }
                    am = al[aj].apply(al, ai);
                    if (am !== al && am !== undefined) {
                        ak = am && am.jquery ? ak.pushStack(am.get()) : am;
                        return false
                    }
                })
            } else {
                this.each(function () {
                    var al = I.data(this, ag);
                    if (al) {
                        al.option(aj || {});
                        if (al._init) {
                            al._init()
                        }
                    } else {
                        I.data(this, ag, new ae(aj, this))
                    }
                })
            }
            return ak
        }
    };
    I.Widget = function () {};
    I.Widget._childConstructors = [];
    I.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function (ae, af) {
            af = I(af || this.defaultElement || this)[0];
            this.element = I(af);
            this.uuid = O++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = I.widget.extend({}, this.options, this._getCreateOptions(), ae);
            this.bindings = I();
            this.hoverable = I();
            this.focusable = I();
            if (af !== this) {
                I.data(af, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (ag) {
                        if (ag.target === af) {
                            this.destroy()
                        }
                    }
                });
                this.document = I(af.style ? af.ownerDocument : af.document || af);
                this.window = I(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: I.noop,
        _getCreateEventData: I.noop,
        _create: I.noop,
        _init: I.noop,
        destroy: function () {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(I.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: I.noop,
        widget: function () {
            return this.element
        },
        option: function (ah, ai) {
            var ae = ah,
                aj, ag, af;
            if (arguments.length === 0) {
                return I.widget.extend({}, this.options)
            }
            if (typeof ah === "string") {
                ae = {};
                aj = ah.split(".");
                ah = aj.shift();
                if (aj.length) {
                    ag = ae[ah] = I.widget.extend({}, this.options[ah]);
                    for (af = 0; af < aj.length - 1; af++) {
                        ag[aj[af]] = ag[aj[af]] || {};
                        ag = ag[aj[af]]
                    }
                    ah = aj.pop();
                    if (arguments.length === 1) {
                        return ag[ah] === undefined ? null : ag[ah]
                    }
                    ag[ah] = ai
                } else {
                    if (arguments.length === 1) {
                        return this.options[ah] === undefined ? null : this.options[ah]
                    }
                    ae[ah] = ai
                }
            }
            this._setOptions(ae);
            return this
        },
        _setOptions: function (ae) {
            var af;
            for (af in ae) {
                this._setOption(af, ae[af])
            }
            return this
        },
        _setOption: function (ae, af) {
            this.options[ae] = af;
            if (ae === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled", !!af);
                if (af) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus")
                }
            }
            return this
        },
        enable: function () {
            return this._setOptions({
                disabled: false
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: true
            })
        },
        _on: function (ah, ag, af) {
            var ai, ae = this;
            if (typeof ah !== "boolean") {
                af = ag;
                ag = ah;
                ah = false
            }
            if (!af) {
                af = ag;
                ag = this.element;
                ai = this.widget()
            } else {
                ag = ai = I(ag);
                this.bindings = this.bindings.add(ag)
            }
            I.each(af, function (ao, an) {
                function al() {
                    if (!ah && (ae.options.disabled === true || I(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof an === "string" ? ae[an] : an).apply(ae, arguments)
                }
                if (typeof an !== "string") {
                    al.guid = an.guid = an.guid || al.guid || I.guid++
                }
                var am = ao.match(/^([\w:-]*)\s*(.*)$/),
                    ak = am[1] + ae.eventNamespace,
                    aj = am[2];
                if (aj) {
                    ai.delegate(aj, ak, al)
                } else {
                    ag.bind(ak, al)
                }
            })
        },
        _off: function (af, ae) {
            ae = (ae || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            af.unbind(ae).undelegate(ae)
        },
        _delay: function (ah, ag) {
            function af() {
                return (typeof ah === "string" ? ae[ah] : ah).apply(ae, arguments)
            }
            var ae = this;
            return setTimeout(af, ag || 0)
        },
        _hoverable: function (ae) {
            this.hoverable = this.hoverable.add(ae);
            this._on(ae, {
                mouseenter: function (af) {
                    I(af.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (af) {
                    I(af.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (ae) {
            this.focusable = this.focusable.add(ae);
            this._on(ae, {
                focusin: function (af) {
                    I(af.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (af) {
                    I(af.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (ae, af, ag) {
            var aj, ai, ah = this.options[ae];
            ag = ag || {};
            af = I.Event(af);
            af.type = (ae === this.widgetEventPrefix ? ae : this.widgetEventPrefix + ae).toLowerCase();
            af.target = this.element[0];
            ai = af.originalEvent;
            if (ai) {
                for (aj in ai) {
                    if (!(aj in af)) {
                        af[aj] = ai[aj]
                    }
                }
            }
            this.element.trigger(af, ag);
            return !(I.isFunction(ah) && ah.apply(this.element[0], [af].concat(ag)) === false || af.isDefaultPrevented())
        }
    };
    I.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (af, ae) {
        I.Widget.prototype["_" + af] = function (ai, ah, ak) {
            if (typeof ah === "string") {
                ah = {
                    effect: ah
                }
            }
            var aj, ag = !ah ? af : ah === true || typeof ah === "number" ? ae : ah.effect || ae;
            ah = ah || {};
            if (typeof ah === "number") {
                ah = {
                    duration: ah
                }
            }
            aj = !I.isEmptyObject(ah);
            ah.complete = ak;
            if (ah.delay) {
                ai.delay(ah.delay)
            }
            if (aj && I.effects && I.effects.effect[ag]) {
                ai[af](ah)
            } else {
                if (ag !== af && ai[ag]) {
                    ai[ag](ah.duration, ah.easing, ak)
                } else {
                    ai.queue(function (al) {
                        I(this)[af]();
                        if (ak) {
                            ak.call(ai[0])
                        }
                        al()
                    })
                }
            }
        }
    });
    var J = I.widget;
    /*!
     * jQuery UI Mouse 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/mouse/
     */
    var b = false;
    I(document).mouseup(function () {
        b = false
    });
    var G = I.widget("ui.mouse", {
        version: "1.11.1",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var ae = this;
            this.element.bind("mousedown." + this.widgetName, function (af) {
                return ae._mouseDown(af)
            }).bind("click." + this.widgetName, function (af) {
                if (true === I.data(af.target, ae.widgetName + ".preventClickEvent")) {
                    I.removeData(af.target, ae.widgetName + ".preventClickEvent");
                    af.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function (ag) {
            if (b) {
                return
            }(this._mouseStarted && this._mouseUp(ag));
            this._mouseDownEvent = ag;
            var af = this,
                ah = (ag.which === 1),
                ae = (typeof this.options.cancel === "string" && ag.target.nodeName ? I(ag.target).closest(this.options.cancel).length : false);
            if (!ah || ae || !this._mouseCapture(ag)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    af.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(ag) && this._mouseDelayMet(ag)) {
                this._mouseStarted = (this._mouseStart(ag) !== false);
                if (!this._mouseStarted) {
                    ag.preventDefault();
                    return true
                }
            }
            if (true === I.data(ag.target, this.widgetName + ".preventClickEvent")) {
                I.removeData(ag.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function (ai) {
                return af._mouseMove(ai)
            };
            this._mouseUpDelegate = function (ai) {
                return af._mouseUp(ai)
            };
            this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            ag.preventDefault();
            b = true;
            return true
        },
        _mouseMove: function (ae) {
            if (I.ui.ie && (!document.documentMode || document.documentMode < 9) && !ae.button) {
                return this._mouseUp(ae)
            } else {
                if (!ae.which) {
                    return this._mouseUp(ae)
                }
            }
            if (this._mouseStarted) {
                this._mouseDrag(ae);
                return ae.preventDefault()
            }
            if (this._mouseDistanceMet(ae) && this._mouseDelayMet(ae)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, ae) !== false);
                (this._mouseStarted ? this._mouseDrag(ae) : this._mouseUp(ae))
            }
            return !this._mouseStarted
        },
        _mouseUp: function (ae) {
            this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (ae.target === this._mouseDownEvent.target) {
                    I.data(ae.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(ae)
            }
            b = false;
            return false
        },
        _mouseDistanceMet: function (ae) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - ae.pageX), Math.abs(this._mouseDownEvent.pageY - ae.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    });
    /*!
     * jQuery UI Position 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    (function () {
        I.ui = I.ui || {};
        var al, ao, am = Math.max,
            ar = Math.abs,
            ap = Math.round,
            ag = /left|center|right/,
            aj = /top|center|bottom/,
            ae = /[\+\-]\d+(\.[\d]+)?%?/,
            an = /^\w+/,
            af = /%$/,
            ai = I.fn.position;

        function aq(av, au, at) {
            return [parseFloat(av[0]) * (af.test(av[0]) ? au / 100 : 1), parseFloat(av[1]) * (af.test(av[1]) ? at / 100 : 1)]
        }

        function ak(at, au) {
            return parseInt(I.css(at, au), 10) || 0
        }

        function ah(au) {
            var at = au[0];
            if (at.nodeType === 9) {
                return {
                    width: au.width(),
                    height: au.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                }
            }
            if (I.isWindow(at)) {
                return {
                    width: au.width(),
                    height: au.height(),
                    offset: {
                        top: au.scrollTop(),
                        left: au.scrollLeft()
                    }
                }
            }
            if (at.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: at.pageY,
                        left: at.pageX
                    }
                }
            }
            return {
                width: au.outerWidth(),
                height: au.outerHeight(),
                offset: au.offset()
            }
        }
        I.position = {
            scrollbarWidth: function () {
                if (al !== undefined) {
                    return al
                }
                var au, at, aw = I("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    av = aw.children()[0];
                I("body").append(aw);
                au = av.offsetWidth;
                aw.css("overflow", "scroll");
                at = av.offsetWidth;
                if (au === at) {
                    at = aw[0].clientWidth
                }
                aw.remove();
                return (al = au - at)
            },
            getScrollInfo: function (ax) {
                var aw = ax.isWindow || ax.isDocument ? "" : ax.element.css("overflow-x"),
                    av = ax.isWindow || ax.isDocument ? "" : ax.element.css("overflow-y"),
                    au = aw === "scroll" || (aw === "auto" && ax.width < ax.element[0].scrollWidth),
                    at = av === "scroll" || (av === "auto" && ax.height < ax.element[0].scrollHeight);
                return {
                    width: at ? I.position.scrollbarWidth() : 0,
                    height: au ? I.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function (au) {
                var av = I(au || window),
                    at = I.isWindow(av[0]),
                    aw = !!av[0] && av[0].nodeType === 9;
                return {
                    element: av,
                    isWindow: at,
                    isDocument: aw,
                    offset: av.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: av.scrollLeft(),
                    scrollTop: av.scrollTop(),
                    width: at || aw ? av.width() : av.outerWidth(),
                    height: at || aw ? av.height() : av.outerHeight()
                }
            }
        };
        I.fn.position = function (aD) {
            if (!aD || !aD.of) {
                return ai.apply(this, arguments)
            }
            aD = I.extend({}, aD);
            var aE, aA, ay, aC, ax, at, az = I(aD.of),
                aw = I.position.getWithinInfo(aD.within),
                au = I.position.getScrollInfo(aw),
                aB = (aD.collision || "flip").split(" "),
                av = {};
            at = ah(az);
            if (az[0].preventDefault) {
                aD.at = "left top"
            }
            aA = at.width;
            ay = at.height;
            aC = at.offset;
            ax = I.extend({}, aC);
            I.each(["my", "at"], function () {
                var aH = (aD[this] || "").split(" "),
                    aG, aF;
                if (aH.length === 1) {
                    aH = ag.test(aH[0]) ? aH.concat(["center"]) : aj.test(aH[0]) ? ["center"].concat(aH) : ["center", "center"]
                }
                aH[0] = ag.test(aH[0]) ? aH[0] : "center";
                aH[1] = aj.test(aH[1]) ? aH[1] : "center";
                aG = ae.exec(aH[0]);
                aF = ae.exec(aH[1]);
                av[this] = [aG ? aG[0] : 0, aF ? aF[0] : 0];
                aD[this] = [an.exec(aH[0])[0], an.exec(aH[1])[0]]
            });
            if (aB.length === 1) {
                aB[1] = aB[0]
            }
            if (aD.at[0] === "right") {
                ax.left += aA
            } else {
                if (aD.at[0] === "center") {
                    ax.left += aA / 2
                }
            }
            if (aD.at[1] === "bottom") {
                ax.top += ay
            } else {
                if (aD.at[1] === "center") {
                    ax.top += ay / 2
                }
            }
            aE = aq(av.at, aA, ay);
            ax.left += aE[0];
            ax.top += aE[1];
            return this.each(function () {
                var aG, aP, aI = I(this),
                    aK = aI.outerWidth(),
                    aH = aI.outerHeight(),
                    aJ = ak(this, "marginLeft"),
                    aF = ak(this, "marginTop"),
                    aO = aK + aJ + ak(this, "marginRight") + au.width,
                    aN = aH + aF + ak(this, "marginBottom") + au.height,
                    aL = I.extend({}, ax),
                    aM = aq(av.my, aI.outerWidth(), aI.outerHeight());
                if (aD.my[0] === "right") {
                    aL.left -= aK
                } else {
                    if (aD.my[0] === "center") {
                        aL.left -= aK / 2
                    }
                }
                if (aD.my[1] === "bottom") {
                    aL.top -= aH
                } else {
                    if (aD.my[1] === "center") {
                        aL.top -= aH / 2
                    }
                }
                aL.left += aM[0];
                aL.top += aM[1];
                if (!ao) {
                    aL.left = ap(aL.left);
                    aL.top = ap(aL.top)
                }
                aG = {
                    marginLeft: aJ,
                    marginTop: aF
                };
                I.each(["left", "top"], function (aR, aQ) {
                    if (I.ui.position[aB[aR]]) {
                        I.ui.position[aB[aR]][aQ](aL, {
                            targetWidth: aA,
                            targetHeight: ay,
                            elemWidth: aK,
                            elemHeight: aH,
                            collisionPosition: aG,
                            collisionWidth: aO,
                            collisionHeight: aN,
                            offset: [aE[0] + aM[0], aE[1] + aM[1]],
                            my: aD.my,
                            at: aD.at,
                            within: aw,
                            elem: aI
                        })
                    }
                });
                if (aD.using) {
                    aP = function (aT) {
                        var aV = aC.left - aL.left,
                            aS = aV + aA - aK,
                            aU = aC.top - aL.top,
                            aR = aU + ay - aH,
                            aQ = {
                                target: {
                                    element: az,
                                    left: aC.left,
                                    top: aC.top,
                                    width: aA,
                                    height: ay
                                },
                                element: {
                                    element: aI,
                                    left: aL.left,
                                    top: aL.top,
                                    width: aK,
                                    height: aH
                                },
                                horizontal: aS < 0 ? "left" : aV > 0 ? "right" : "center",
                                vertical: aR < 0 ? "top" : aU > 0 ? "bottom" : "middle"
                            };
                        if (aA < aK && ar(aV + aS) < aA) {
                            aQ.horizontal = "center"
                        }
                        if (ay < aH && ar(aU + aR) < ay) {
                            aQ.vertical = "middle"
                        }
                        if (am(ar(aV), ar(aS)) > am(ar(aU), ar(aR))) {
                            aQ.important = "horizontal"
                        } else {
                            aQ.important = "vertical"
                        }
                        aD.using.call(this, aT, aQ)
                    }
                }
                aI.offset(I.extend(aL, {
                    using: aP
                }))
            })
        };
        I.ui.position = {
            fit: {
                left: function (ax, aw) {
                    var av = aw.within,
                        az = av.isWindow ? av.scrollLeft : av.offset.left,
                        aB = av.width,
                        ay = ax.left - aw.collisionPosition.marginLeft,
                        aA = az - ay,
                        au = ay + aw.collisionWidth - aB - az,
                        at;
                    if (aw.collisionWidth > aB) {
                        if (aA > 0 && au <= 0) {
                            at = ax.left + aA + aw.collisionWidth - aB - az;
                            ax.left += aA - at
                        } else {
                            if (au > 0 && aA <= 0) {
                                ax.left = az
                            } else {
                                if (aA > au) {
                                    ax.left = az + aB - aw.collisionWidth
                                } else {
                                    ax.left = az
                                }
                            }
                        }
                    } else {
                        if (aA > 0) {
                            ax.left += aA
                        } else {
                            if (au > 0) {
                                ax.left -= au
                            } else {
                                ax.left = am(ax.left - ay, ax.left)
                            }
                        }
                    }
                },
                top: function (aw, av) {
                    var au = av.within,
                        aA = au.isWindow ? au.scrollTop : au.offset.top,
                        aB = av.within.height,
                        ay = aw.top - av.collisionPosition.marginTop,
                        az = aA - ay,
                        ax = ay + av.collisionHeight - aB - aA,
                        at;
                    if (av.collisionHeight > aB) {
                        if (az > 0 && ax <= 0) {
                            at = aw.top + az + av.collisionHeight - aB - aA;
                            aw.top += az - at
                        } else {
                            if (ax > 0 && az <= 0) {
                                aw.top = aA
                            } else {
                                if (az > ax) {
                                    aw.top = aA + aB - av.collisionHeight
                                } else {
                                    aw.top = aA
                                }
                            }
                        }
                    } else {
                        if (az > 0) {
                            aw.top += az
                        } else {
                            if (ax > 0) {
                                aw.top -= ax
                            } else {
                                aw.top = am(aw.top - ay, aw.top)
                            }
                        }
                    }
                }
            },
            flip: {
                left: function (az, ay) {
                    var ax = ay.within,
                        aD = ax.offset.left + ax.scrollLeft,
                        aG = ax.width,
                        av = ax.isWindow ? ax.scrollLeft : ax.offset.left,
                        aA = az.left - ay.collisionPosition.marginLeft,
                        aE = aA - av,
                        au = aA + ay.collisionWidth - aG - av,
                        aC = ay.my[0] === "left" ? -ay.elemWidth : ay.my[0] === "right" ? ay.elemWidth : 0,
                        aF = ay.at[0] === "left" ? ay.targetWidth : ay.at[0] === "right" ? -ay.targetWidth : 0,
                        aw = -2 * ay.offset[0],
                        at, aB;
                    if (aE < 0) {
                        at = az.left + aC + aF + aw + ay.collisionWidth - aG - aD;
                        if (at < 0 || at < ar(aE)) {
                            az.left += aC + aF + aw
                        }
                    } else {
                        if (au > 0) {
                            aB = az.left - ay.collisionPosition.marginLeft + aC + aF + aw - av;
                            if (aB > 0 || ar(aB) < au) {
                                az.left += aC + aF + aw
                            }
                        }
                    }
                },
                top: function (ay, ax) {
                    var aw = ax.within,
                        aF = aw.offset.top + aw.scrollTop,
                        aG = aw.height,
                        at = aw.isWindow ? aw.scrollTop : aw.offset.top,
                        aA = ay.top - ax.collisionPosition.marginTop,
                        aC = aA - at,
                        az = aA + ax.collisionHeight - aG - at,
                        aD = ax.my[1] === "top",
                        aB = aD ? -ax.elemHeight : ax.my[1] === "bottom" ? ax.elemHeight : 0,
                        aH = ax.at[1] === "top" ? ax.targetHeight : ax.at[1] === "bottom" ? -ax.targetHeight : 0,
                        av = -2 * ax.offset[1],
                        aE, au;
                    if (aC < 0) {
                        au = ay.top + aB + aH + av + ax.collisionHeight - aG - aF;
                        if ((ay.top + aB + aH + av) > aC && (au < 0 || au < ar(aC))) {
                            ay.top += aB + aH + av
                        }
                    } else {
                        if (az > 0) {
                            aE = ay.top - ax.collisionPosition.marginTop + aB + aH + av - at;
                            if ((ay.top + aB + aH + av) > az && (aE > 0 || ar(aE) < az)) {
                                ay.top += aB + aH + av
                            }
                        }
                    }
                }
            },
            flipfit: {
                left: function () {
                    I.ui.position.flip.left.apply(this, arguments);
                    I.ui.position.fit.left.apply(this, arguments)
                },
                top: function () {
                    I.ui.position.flip.top.apply(this, arguments);
                    I.ui.position.fit.top.apply(this, arguments)
                }
            }
        };
        (function () {
            var ax, az, au, aw, av, at = document.getElementsByTagName("body")[0],
                ay = document.createElement("div");
            ax = document.createElement(at ? "div" : "body");
            au = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (at) {
                I.extend(au, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                })
            }
            for (av in au) {
                ax.style[av] = au[av]
            }
            ax.appendChild(ay);
            az = at || document.documentElement;
            az.insertBefore(ax, az.firstChild);
            ay.style.cssText = "position: absolute; left: 10.7432222px;";
            aw = I(ay).offset().left;
            ao = aw > 10 && aw < 11;
            ax.innerHTML = "";
            az.removeChild(ax)
        })()
    })();
    var P = I.ui.position;
    /*!
     * jQuery UI Accordion 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/accordion/
     */
    var ad = I.widget("ui.accordion", {
        version: "1.11.1",
        options: {
            active: 0,
            animate: {},
            collapsible: false,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function () {
            var ae = this.options;
            this.prevShow = this.prevHide = I();
            this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist");
            if (!ae.collapsible && (ae.active === false || ae.active == null)) {
                ae.active = 0
            }
            this._processPanels();
            if (ae.active < 0) {
                ae.active += this.headers.length
            }
            this._refresh()
        },
        _getCreateEventData: function () {
            return {
                header: this.active,
                panel: !this.active.length ? I() : this.active.next()
            }
        },
        _createIcons: function () {
            var ae = this.options.icons;
            if (ae) {
                I("<span>").addClass("ui-accordion-header-icon ui-icon " + ae.header).prependTo(this.headers);
                this.active.children(".ui-accordion-header-icon").removeClass(ae.header).addClass(ae.activeHeader);
                this.headers.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function () {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function () {
            var ae;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId();
            this._destroyIcons();
            ae = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId();
            if (this.options.heightStyle !== "content") {
                ae.css("height", "")
            }
        },
        _setOption: function (ae, af) {
            if (ae === "active") {
                this._activate(af);
                return
            }
            if (ae === "event") {
                if (this.options.event) {
                    this._off(this.headers, this.options.event)
                }
                this._setupEvents(af)
            }
            this._super(ae, af);
            if (ae === "collapsible" && !af && this.options.active === false) {
                this._activate(0)
            }
            if (ae === "icons") {
                this._destroyIcons();
                if (af) {
                    this._createIcons()
                }
            }
            if (ae === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!af).attr("aria-disabled", af);
                this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!af)
            }
        },
        _keydown: function (ah) {
            if (ah.altKey || ah.ctrlKey) {
                return
            }
            var ai = I.ui.keyCode,
                ag = this.headers.length,
                ae = this.headers.index(ah.target),
                af = false;
            switch (ah.keyCode) {
            case ai.RIGHT:
            case ai.DOWN:
                af = this.headers[(ae + 1) % ag];
                break;
            case ai.LEFT:
            case ai.UP:
                af = this.headers[(ae - 1 + ag) % ag];
                break;
            case ai.SPACE:
            case ai.ENTER:
                this._eventHandler(ah);
                break;
            case ai.HOME:
                af = this.headers[0];
                break;
            case ai.END:
                af = this.headers[ag - 1];
                break
            }
            if (af) {
                I(ah.target).attr("tabIndex", -1);
                I(af).attr("tabIndex", 0);
                af.focus();
                ah.preventDefault()
            }
        },
        _panelKeyDown: function (ae) {
            if (ae.keyCode === I.ui.keyCode.UP && ae.ctrlKey) {
                I(ae.currentTarget).prev().focus()
            }
        },
        refresh: function () {
            var ae = this.options;
            this._processPanels();
            if ((ae.active === false && ae.collapsible === true) || !this.headers.length) {
                ae.active = false;
                this.active = I()
            } else {
                if (ae.active === false) {
                    this._activate(0)
                } else {
                    if (this.active.length && !I.contains(this.element[0], this.active[0])) {
                        if (this.headers.length === this.headers.find(".ui-state-disabled").length) {
                            ae.active = false;
                            this.active = I()
                        } else {
                            this._activate(Math.max(0, ae.active - 1))
                        }
                    } else {
                        ae.active = this.headers.index(this.active)
                    }
                }
            }
            this._destroyIcons();
            this._refresh()
        },
        _processPanels: function () {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all");
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function () {
            var ah, af = this.options,
                ae = af.heightStyle,
                ag = this.element.parent();
            this.active = this._findActive(af.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all");
            this.active.next().addClass("ui-accordion-content-active").show();
            this.headers.attr("role", "tab").each(function () {
                var al = I(this),
                    ak = al.uniqueId().attr("id"),
                    ai = al.next(),
                    aj = ai.uniqueId().attr("id");
                al.attr("aria-controls", aj);
                ai.attr("aria-labelledby", ak)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", 0)
            } else {
                this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-hidden": "false"
                })
            }
            this._createIcons();
            this._setupEvents(af.event);
            if (ae === "fill") {
                ah = ag.height();
                this.element.siblings(":visible").each(function () {
                    var aj = I(this),
                        ai = aj.css("position");
                    if (ai === "absolute" || ai === "fixed") {
                        return
                    }
                    ah -= aj.outerHeight(true)
                });
                this.headers.each(function () {
                    ah -= I(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    I(this).height(Math.max(0, ah - I(this).innerHeight() + I(this).height()))
                }).css("overflow", "auto")
            } else {
                if (ae === "auto") {
                    ah = 0;
                    this.headers.next().each(function () {
                        ah = Math.max(ah, I(this).css("height", "").height())
                    }).height(ah)
                }
            }
        },
        _activate: function (ae) {
            var af = this._findActive(ae)[0];
            if (af === this.active[0]) {
                return
            }
            af = af || this.active[0];
            this._eventHandler({
                target: af,
                currentTarget: af,
                preventDefault: I.noop
            })
        },
        _findActive: function (ae) {
            return typeof ae === "number" ? this.headers.eq(ae) : I()
        },
        _setupEvents: function (af) {
            var ae = {
                keydown: "_keydown"
            };
            if (af) {
                I.each(af.split(" "), function (ah, ag) {
                    ae[ag] = "_eventHandler"
                })
            }
            this._off(this.headers.add(this.headers.next()));
            this._on(this.headers, ae);
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            });
            this._hoverable(this.headers);
            this._focusable(this.headers)
        },
        _eventHandler: function (ae) {
            var am = this.options,
                ah = this.active,
                ai = I(ae.currentTarget),
                ak = ai[0] === ah[0],
                af = ak && am.collapsible,
                ag = af ? I() : ai.next(),
                aj = ah.next(),
                al = {
                    oldHeader: ah,
                    oldPanel: aj,
                    newHeader: af ? I() : ai,
                    newPanel: ag
                };
            ae.preventDefault();
            if ((ak && !am.collapsible) || (this._trigger("beforeActivate", ae, al) === false)) {
                return
            }
            am.active = af ? false : this.headers.index(ai);
            this.active = ak ? I() : ai;
            this._toggle(al);
            ah.removeClass("ui-accordion-header-active ui-state-active");
            if (am.icons) {
                ah.children(".ui-accordion-header-icon").removeClass(am.icons.activeHeader).addClass(am.icons.header)
            }
            if (!ak) {
                ai.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top");
                if (am.icons) {
                    ai.children(".ui-accordion-header-icon").removeClass(am.icons.header).addClass(am.icons.activeHeader)
                }
                ai.next().addClass("ui-accordion-content-active")
            }
        },
        _toggle: function (ag) {
            var ae = ag.newPanel,
                af = this.prevShow.length ? this.prevShow : ag.oldPanel;
            this.prevShow.add(this.prevHide).stop(true, true);
            this.prevShow = ae;
            this.prevHide = af;
            if (this.options.animate) {
                this._animate(ae, af, ag)
            } else {
                af.hide();
                ae.show();
                this._toggleComplete(ag)
            }
            af.attr({
                "aria-hidden": "true"
            });
            af.prev().attr("aria-selected", "false");
            if (ae.length && af.length) {
                af.prev().attr({
                    tabIndex: -1,
                    "aria-expanded": "false"
                })
            } else {
                if (ae.length) {
                    this.headers.filter(function () {
                        return I(this).attr("tabIndex") === 0
                    }).attr("tabIndex", -1)
                }
            }
            ae.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                tabIndex: 0,
                "aria-expanded": "true"
            })
        },
        _animate: function (ae, am, ai) {
            var al, ak, ah, aj = this,
                an = 0,
                ao = ae.length && (!am.length || (ae.index() < am.index())),
                ag = this.options.animate || {},
                ap = ao && ag.down || ag,
                af = function () {
                    aj._toggleComplete(ai)
                };
            if (typeof ap === "number") {
                ah = ap
            }
            if (typeof ap === "string") {
                ak = ap
            }
            ak = ak || ap.easing || ag.easing;
            ah = ah || ap.duration || ag.duration;
            if (!am.length) {
                return ae.animate(this.showProps, ah, ak, af)
            }
            if (!ae.length) {
                return am.animate(this.hideProps, ah, ak, af)
            }
            al = ae.show().outerHeight();
            am.animate(this.hideProps, {
                duration: ah,
                easing: ak,
                step: function (aq, ar) {
                    ar.now = Math.round(aq)
                }
            });
            ae.hide().animate(this.showProps, {
                duration: ah,
                easing: ak,
                complete: af,
                step: function (aq, ar) {
                    ar.now = Math.round(aq);
                    if (ar.prop !== "height") {
                        an += ar.now
                    } else {
                        if (aj.options.heightStyle !== "content") {
                            ar.now = Math.round(al - am.outerHeight() - an);
                            an = 0
                        }
                    }
                }
            })
        },
        _toggleComplete: function (af) {
            var ae = af.oldPanel;
            ae.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all");
            if (ae.length) {
                ae.parent()[0].className = ae.parent()[0].className
            }
            this._trigger("activate", null, af)
        }
    });
    /*!
     * jQuery UI Menu 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/menu/
     */
    var aa = I.widget("ui.menu", {
        version: "1.11.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left-1 top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element;
            this.mouseHandled = false;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            });
            if (this.options.disabled) {
                this.element.addClass("ui-state-disabled").attr("aria-disabled", "true")
            }
            this._on({
                "mousedown .ui-menu-item": function (ae) {
                    ae.preventDefault()
                },
                "click .ui-menu-item": function (ae) {
                    var af = I(ae.target);
                    if (!this.mouseHandled && af.not(".ui-state-disabled").length) {
                        this.select(ae);
                        if (!ae.isPropagationStopped()) {
                            this.mouseHandled = true
                        }
                        if (af.has(".ui-menu").length) {
                            this.expand(ae)
                        } else {
                            if (!this.element.is(":focus") && I(this.document[0].activeElement).closest(".ui-menu").length) {
                                this.element.trigger("focus", [true]);
                                if (this.active && this.active.parents(".ui-menu").length === 1) {
                                    clearTimeout(this.timer)
                                }
                            }
                        }
                    }
                },
                "mouseenter .ui-menu-item": function (ae) {
                    var af = I(ae.currentTarget);
                    af.siblings(".ui-state-active").removeClass("ui-state-active");
                    this.focus(ae, af)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (ag, ae) {
                    var af = this.active || this.element.find(this.options.items).eq(0);
                    if (!ae) {
                        this.focus(ag, af)
                    }
                },
                blur: function (ae) {
                    this._delay(function () {
                        if (!I.contains(this.element[0], this.document[0].activeElement)) {
                            this.collapseAll(ae)
                        }
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function (ae) {
                    if (this._closeOnDocumentClick(ae)) {
                        this.collapseAll(ae)
                    }
                    this.mouseHandled = false
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var ae = I(this);
                if (ae.data("ui-menu-submenu-carat")) {
                    ae.remove()
                }
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (ak) {
            var af, aj, al, ai, ah, ae = true;

            function ag(am) {
                return am.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            switch (ak.keyCode) {
            case I.ui.keyCode.PAGE_UP:
                this.previousPage(ak);
                break;
            case I.ui.keyCode.PAGE_DOWN:
                this.nextPage(ak);
                break;
            case I.ui.keyCode.HOME:
                this._move("first", "first", ak);
                break;
            case I.ui.keyCode.END:
                this._move("last", "last", ak);
                break;
            case I.ui.keyCode.UP:
                this.previous(ak);
                break;
            case I.ui.keyCode.DOWN:
                this.next(ak);
                break;
            case I.ui.keyCode.LEFT:
                this.collapse(ak);
                break;
            case I.ui.keyCode.RIGHT:
                if (this.active && !this.active.is(".ui-state-disabled")) {
                    this.expand(ak)
                }
                break;
            case I.ui.keyCode.ENTER:
            case I.ui.keyCode.SPACE:
                this._activate(ak);
                break;
            case I.ui.keyCode.ESCAPE:
                this.collapse(ak);
                break;
            default:
                ae = false;
                aj = this.previousFilter || "";
                al = String.fromCharCode(ak.keyCode);
                ai = false;
                clearTimeout(this.filterTimer);
                if (al === aj) {
                    ai = true
                } else {
                    al = aj + al
                }
                ah = new RegExp("^" + ag(al), "i");
                af = this.activeMenu.find(this.options.items).filter(function () {
                    return ah.test(I(this).text())
                });
                af = ai && af.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : af;
                if (!af.length) {
                    al = String.fromCharCode(ak.keyCode);
                    ah = new RegExp("^" + ag(al), "i");
                    af = this.activeMenu.find(this.options.items).filter(function () {
                        return ah.test(I(this).text())
                    })
                }
                if (af.length) {
                    this.focus(ak, af);
                    if (af.length > 1) {
                        this.previousFilter = al;
                        this.filterTimer = this._delay(function () {
                            delete this.previousFilter
                        }, 1000)
                    } else {
                        delete this.previousFilter
                    }
                } else {
                    delete this.previousFilter
                }
            }
            if (ae) {
                ak.preventDefault()
            }
        },
        _activate: function (ae) {
            if (!this.active.is(".ui-state-disabled")) {
                if (this.active.is("[aria-haspopup='true']")) {
                    this.expand(ae)
                } else {
                    this.select(ae)
                }
            }
        },
        refresh: function () {
            var ai, af, ah = this,
                ag = this.options.icons.submenu,
                ae = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
            ae.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var al = I(this),
                    ak = al.parent(),
                    aj = I("<span>").addClass("ui-menu-icon ui-icon " + ag).data("ui-menu-submenu-carat", true);
                ak.attr("aria-haspopup", "true").prepend(aj);
                al.attr("aria-labelledby", ak.attr("id"))
            });
            ai = ae.add(this.element);
            af = ai.find(this.options.items);
            af.not(".ui-menu-item").each(function () {
                var aj = I(this);
                if (ah._isDivider(aj)) {
                    aj.addClass("ui-widget-content ui-menu-divider")
                }
            });
            af.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            af.filter(".ui-state-disabled").attr("aria-disabled", "true");
            if (this.active && !I.contains(this.element[0], this.active[0])) {
                this.blur()
            }
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function (ae, af) {
            if (ae === "icons") {
                this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(af.submenu)
            }
            if (ae === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!af).attr("aria-disabled", af)
            }
            this._super(ae, af)
        },
        focus: function (af, ae) {
            var ah, ag;
            this.blur(af, af && af.type === "focus");
            this._scrollIntoView(ae);
            this.active = ae.first();
            ag = this.active.addClass("ui-state-focus").removeClass("ui-state-active");
            if (this.options.role) {
                this.element.attr("aria-activedescendant", ag.attr("id"))
            }
            this.active.parent().closest(".ui-menu-item").addClass("ui-state-active");
            if (af && af.type === "keydown") {
                this._close()
            } else {
                this.timer = this._delay(function () {
                    this._close()
                }, this.delay)
            }
            ah = ae.children(".ui-menu");
            if (ah.length && af && (/^mouse/.test(af.type))) {
                this._startOpening(ah)
            }
            this.activeMenu = ae.parent();
            this._trigger("focus", af, {
                item: ae
            })
        },
        _scrollIntoView: function (ah) {
            var ak, ag, ai, ae, af, aj;
            if (this._hasScroll()) {
                ak = parseFloat(I.css(this.activeMenu[0], "borderTopWidth")) || 0;
                ag = parseFloat(I.css(this.activeMenu[0], "paddingTop")) || 0;
                ai = ah.offset().top - this.activeMenu.offset().top - ak - ag;
                ae = this.activeMenu.scrollTop();
                af = this.activeMenu.height();
                aj = ah.outerHeight();
                if (ai < 0) {
                    this.activeMenu.scrollTop(ae + ai)
                } else {
                    if (ai + aj > af) {
                        this.activeMenu.scrollTop(ae + ai - af + aj)
                    }
                }
            }
        },
        blur: function (af, ae) {
            if (!ae) {
                clearTimeout(this.timer)
            }
            if (!this.active) {
                return
            }
            this.active.removeClass("ui-state-focus");
            this.active = null;
            this._trigger("blur", af, {
                item: this.active
            })
        },
        _startOpening: function (ae) {
            clearTimeout(this.timer);
            if (ae.attr("aria-hidden") !== "true") {
                return
            }
            this.timer = this._delay(function () {
                this._close();
                this._open(ae)
            }, this.delay)
        },
        _open: function (af) {
            var ae = I.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(af.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            af.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(ae)
        },
        collapseAll: function (af, ae) {
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                var ag = ae ? this.element : I(af && af.target).closest(this.element.find(".ui-menu"));
                if (!ag.length) {
                    ag = this.element
                }
                this._close(ag);
                this.blur(af);
                this.activeMenu = ag
            }, this.delay)
        },
        _close: function (ae) {
            if (!ae) {
                ae = this.active ? this.active.parent() : this.element
            }
            ae.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
        },
        _closeOnDocumentClick: function (ae) {
            return !I(ae.target).closest(".ui-menu").length
        },
        _isDivider: function (ae) {
            return !/[^\-\u2014\u2013\s]/.test(ae.text())
        },
        collapse: function (af) {
            var ae = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            if (ae && ae.length) {
                this._close();
                this.focus(af, ae)
            }
        },
        expand: function (af) {
            var ae = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            if (ae && ae.length) {
                this._open(ae.parent());
                this._delay(function () {
                    this.focus(af, ae)
                })
            }
        },
        next: function (ae) {
            this._move("next", "first", ae)
        },
        previous: function (ae) {
            this._move("prev", "last", ae)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (ah, af, ag) {
            var ae;
            if (this.active) {
                if (ah === "first" || ah === "last") {
                    ae = this.active[ah === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1)
                } else {
                    ae = this.active[ah + "All"](".ui-menu-item").eq(0)
                }
            }
            if (!ae || !ae.length || !this.active) {
                ae = this.activeMenu.find(this.options.items)[af]()
            }
            this.focus(ag, ae)
        },
        nextPage: function (ag) {
            var af, ah, ae;
            if (!this.active) {
                this.next(ag);
                return
            }
            if (this.isLastItem()) {
                return
            }
            if (this._hasScroll()) {
                ah = this.active.offset().top;
                ae = this.element.height();
                this.active.nextAll(".ui-menu-item").each(function () {
                    af = I(this);
                    return af.offset().top - ah - ae < 0
                });
                this.focus(ag, af)
            } else {
                this.focus(ag, this.activeMenu.find(this.options.items)[!this.active ? "first" : "last"]())
            }
        },
        previousPage: function (ag) {
            var af, ah, ae;
            if (!this.active) {
                this.next(ag);
                return
            }
            if (this.isFirstItem()) {
                return
            }
            if (this._hasScroll()) {
                ah = this.active.offset().top;
                ae = this.element.height();
                this.active.prevAll(".ui-menu-item").each(function () {
                    af = I(this);
                    return af.offset().top - ah + ae > 0
                });
                this.focus(ag, af)
            } else {
                this.focus(ag, this.activeMenu.find(this.options.items).first())
            }
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (ae) {
            this.active = this.active || I(ae.target).closest(".ui-menu-item");
            var af = {
                item: this.active
            };
            if (!this.active.has(".ui-menu").length) {
                this.collapseAll(ae, true)
            }
            this._trigger("select", ae, af)
        }
    });
    /*!
     * jQuery UI Autocomplete 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/autocomplete/
     */
    I.widget("ui.autocomplete", {
        version: "1.11.1",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
            var ag, ae, ah, aj = this.element[0].nodeName.toLowerCase(),
                ai = aj === "textarea",
                af = aj === "input";
            this.isMultiLine = ai ? true : af ? false : this.element.prop("isContentEditable");
            this.valueMethod = this.element[ai || af ? "val" : "text"];
            this.isNewMenu = true;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function (ak) {
                    if (this.element.prop("readOnly")) {
                        ag = true;
                        ah = true;
                        ae = true;
                        return
                    }
                    ag = false;
                    ah = false;
                    ae = false;
                    var al = I.ui.keyCode;
                    switch (ak.keyCode) {
                    case al.PAGE_UP:
                        ag = true;
                        this._move("previousPage", ak);
                        break;
                    case al.PAGE_DOWN:
                        ag = true;
                        this._move("nextPage", ak);
                        break;
                    case al.UP:
                        ag = true;
                        this._keyEvent("previous", ak);
                        break;
                    case al.DOWN:
                        ag = true;
                        this._keyEvent("next", ak);
                        break;
                    case al.ENTER:
                        if (this.menu.active) {
                            ag = true;
                            ak.preventDefault();
                            this.menu.select(ak)
                        }
                        break;
                    case al.TAB:
                        if (this.menu.active) {
                            this.menu.select(ak)
                        }
                        break;
                    case al.ESCAPE:
                        if (this.menu.element.is(":visible")) {
                            if (!this.isMultiLine) {
                                this._value(this.term)
                            }
                            this.close(ak);
                            ak.preventDefault()
                        }
                        break;
                    default:
                        ae = true;
                        this._searchTimeout(ak);
                        break
                    }
                },
                keypress: function (ak) {
                    if (ag) {
                        ag = false;
                        if (!this.isMultiLine || this.menu.element.is(":visible")) {
                            ak.preventDefault()
                        }
                        return
                    }
                    if (ae) {
                        return
                    }
                    var al = I.ui.keyCode;
                    switch (ak.keyCode) {
                    case al.PAGE_UP:
                        this._move("previousPage", ak);
                        break;
                    case al.PAGE_DOWN:
                        this._move("nextPage", ak);
                        break;
                    case al.UP:
                        this._keyEvent("previous", ak);
                        break;
                    case al.DOWN:
                        this._keyEvent("next", ak);
                        break
                    }
                },
                input: function (ak) {
                    if (ah) {
                        ah = false;
                        ak.preventDefault();
                        return
                    }
                    this._searchTimeout(ak)
                },
                focus: function () {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function (ak) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    clearTimeout(this.searching);
                    this.close(ak);
                    this._change(ak)
                }
            });
            this._initSource();
            this.menu = I("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance");
            this._on(this.menu.element, {
                mousedown: function (ak) {
                    ak.preventDefault();
                    this.cancelBlur = true;
                    this._delay(function () {
                        delete this.cancelBlur
                    });
                    var al = this.menu.element[0];
                    if (!I(ak.target).closest(".ui-menu-item").length) {
                        this._delay(function () {
                            var am = this;
                            this.document.one("mousedown", function (an) {
                                if (an.target !== am.element[0] && an.target !== al && !I.contains(al, an.target)) {
                                    am.close()
                                }
                            })
                        })
                    }
                },
                menufocus: function (am, an) {
                    var ak, al;
                    if (this.isNewMenu) {
                        this.isNewMenu = false;
                        if (am.originalEvent && /^mouse/.test(am.originalEvent.type)) {
                            this.menu.blur();
                            this.document.one("mousemove", function () {
                                I(am.target).trigger(am.originalEvent)
                            });
                            return
                        }
                    }
                    al = an.item.data("ui-autocomplete-item");
                    if (false !== this._trigger("focus", am, {
                            item: al
                        })) {
                        if (am.originalEvent && /^key/.test(am.originalEvent.type)) {
                            this._value(al.value)
                        }
                    }
                    ak = an.item.attr("aria-label") || al.value;
                    if (ak && I.trim(ak).length) {
                        this.liveRegion.children().hide();
                        I("<div>").text(ak).appendTo(this.liveRegion)
                    }
                },
                menuselect: function (am, an) {
                    var al = an.item.data("ui-autocomplete-item"),
                        ak = this.previous;
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = ak;
                        this._delay(function () {
                            this.previous = ak;
                            this.selectedItem = al
                        })
                    }
                    if (false !== this._trigger("select", am, {
                            item: al
                        })) {
                        this._value(al.value)
                    }
                    this.term = this._value();
                    this.close(am);
                    this.selectedItem = al
                }
            });
            this.liveRegion = I("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function (ae, af) {
            this._super(ae, af);
            if (ae === "source") {
                this._initSource()
            }
            if (ae === "appendTo") {
                this.menu.element.appendTo(this._appendTo())
            }
            if (ae === "disabled" && af && this.xhr) {
                this.xhr.abort()
            }
        },
        _appendTo: function () {
            var ae = this.options.appendTo;
            if (ae) {
                ae = ae.jquery || ae.nodeType ? I(ae) : this.document.find(ae).eq(0)
            }
            if (!ae || !ae[0]) {
                ae = this.element.closest(".ui-front")
            }
            if (!ae.length) {
                ae = this.document[0].body
            }
            return ae
        },
        _initSource: function () {
            var ag, ae, af = this;
            if (I.isArray(this.options.source)) {
                ag = this.options.source;
                this.source = function (ai, ah) {
                    ah(I.ui.autocomplete.filter(ag, ai.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    ae = this.options.source;
                    this.source = function (ai, ah) {
                        if (af.xhr) {
                            af.xhr.abort()
                        }
                        af.xhr = I.ajax({
                            url: ae,
                            data: ai,
                            dataType: "json",
                            success: function (aj) {
                                ah(aj)
                            },
                            error: function () {
                                ah([])
                            }
                        })
                    }
                } else {
                    this.source = this.options.source
                }
            }
        },
        _searchTimeout: function (ae) {
            clearTimeout(this.searching);
            this.searching = this._delay(function () {
                var ag = this.term === this._value(),
                    af = this.menu.element.is(":visible"),
                    ah = ae.altKey || ae.ctrlKey || ae.metaKey || ae.shiftKey;
                if (!ag || (ag && !af && !ah)) {
                    this.selectedItem = null;
                    this.search(null, ae)
                }
            }, this.options.delay)
        },
        search: function (af, ae) {
            af = af != null ? af : this._value();
            this.term = this._value();
            if (af.length < this.options.minLength) {
                return this.close(ae)
            }
            if (this._trigger("search", ae) === false) {
                return
            }
            return this._search(af)
        },
        _search: function (ae) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = false;
            this.source({
                term: ae
            }, this._response())
        },
        _response: function () {
            var ae = ++this.requestIndex;
            return I.proxy(function (af) {
                if (ae === this.requestIndex) {
                    this.__response(af)
                }
                this.pending--;
                if (!this.pending) {
                    this.element.removeClass("ui-autocomplete-loading")
                }
            }, this)
        },
        __response: function (ae) {
            if (ae) {
                ae = this._normalize(ae)
            }
            this._trigger("response", null, {
                content: ae
            });
            if (!this.options.disabled && ae && ae.length && !this.cancelSearch) {
                this._suggest(ae);
                this._trigger("open")
            } else {
                this._close()
            }
        },
        close: function (ae) {
            this.cancelSearch = true;
            this._close(ae)
        },
        _close: function (ae) {
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.blur();
                this.isNewMenu = true;
                this._trigger("close", ae)
            }
        },
        _change: function (ae) {
            if (this.previous !== this._value()) {
                this._trigger("change", ae, {
                    item: this.selectedItem
                })
            }
        },
        _normalize: function (ae) {
            if (ae.length && ae[0].label && ae[0].value) {
                return ae
            }
            return I.map(ae, function (af) {
                if (typeof af === "string") {
                    return {
                        label: af,
                        value: af
                    }
                }
                return I.extend({}, af, {
                    label: af.label || af.value,
                    value: af.value || af.label
                })
            })
        },
        _suggest: function (ae) {
            var af = this.menu.element.empty();
            this._renderMenu(af, ae);
            this.isNewMenu = true;
            this.menu.refresh();
            af.show();
            this._resizeMenu();
            af.position(I.extend({
                of: this.element
            }, this.options.position));
            if (this.options.autoFocus) {
                this.menu.next()
            }
        },
        _resizeMenu: function () {
            var ae = this.menu.element;
            ae.outerWidth(Math.max(ae.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (af, ae) {
            var ag = this;
            I.each(ae, function (ah, ai) {
                ag._renderItemData(af, ai)
            })
        },
        _renderItemData: function (ae, af) {
            return this._renderItem(ae, af).data("ui-autocomplete-item", af)
        },
        _renderItem: function (ae, af) {
            return I("<li>").text(af.label).appendTo(ae)
        },
        _move: function (af, ae) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, ae);
                return
            }
            if (this.menu.isFirstItem() && /^previous/.test(af) || this.menu.isLastItem() && /^next/.test(af)) {
                if (!this.isMultiLine) {
                    this._value(this.term)
                }
                this.menu.blur();
                return
            }
            this.menu[af](ae)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (af, ae) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
                this._move(af, ae);
                ae.preventDefault()
            }
        }
    });
    I.extend(I.ui.autocomplete, {
        escapeRegex: function (ae) {
            return ae.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function (ag, ae) {
            var af = new RegExp(I.ui.autocomplete.escapeRegex(ae), "i");
            return I.grep(ag, function (ah) {
                return af.test(ah.label || ah.value || ah)
            })
        }
    });
    I.widget("ui.autocomplete", I.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (ae) {
                    return ae + (ae > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function (af) {
            var ae;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) {
                return
            }
            if (af && af.length) {
                ae = this.options.messages.results(af.length)
            } else {
                ae = this.options.messages.noResults
            }
            this.liveRegion.children().hide();
            I("<div>").text(ae).appendTo(this.liveRegion)
        }
    });
    var c = I.ui.autocomplete;
    /*!
     * jQuery UI Button 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/button/
     */
    var r, Y = "ui-button ui-widget ui-state-default ui-corner-all",
        y = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        n = function () {
            var ae = I(this);
            setTimeout(function () {
                ae.find(":ui-button").button("refresh")
            }, 1)
        },
        z = function (af) {
            var ae = af.name,
                ag = af.form,
                ah = I([]);
            if (ae) {
                ae = ae.replace(/'/g, "\\'");
                if (ag) {
                    ah = I(ag).find("[name='" + ae + "'][type=radio]")
                } else {
                    ah = I("[name='" + ae + "'][type=radio]", af.ownerDocument).filter(function () {
                        return !this.form
                    })
                }
            }
            return ah
        };
    I.widget("ui.button", {
        version: "1.11.1",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, n);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = !!this.element.prop("disabled")
            } else {
                this.element.prop("disabled", this.options.disabled)
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var ag = this,
                ae = this.options,
                ah = this.type === "checkbox" || this.type === "radio",
                af = !ah ? "ui-state-active" : "";
            if (ae.label === null) {
                ae.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html())
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(Y).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                if (ae.disabled) {
                    return
                }
                if (this === r) {
                    I(this).addClass("ui-state-active")
                }
            }).bind("mouseleave" + this.eventNamespace, function () {
                if (ae.disabled) {
                    return
                }
                I(this).removeClass(af)
            }).bind("click" + this.eventNamespace, function (ai) {
                if (ae.disabled) {
                    ai.preventDefault();
                    ai.stopImmediatePropagation()
                }
            });
            this._on({
                focus: function () {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function () {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            });
            if (ah) {
                this.element.bind("change" + this.eventNamespace, function () {
                    ag.refresh()
                })
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace, function () {
                    if (ae.disabled) {
                        return false
                    }
                })
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click" + this.eventNamespace, function () {
                        if (ae.disabled) {
                            return false
                        }
                        I(this).addClass("ui-state-active");
                        ag.buttonElement.attr("aria-pressed", "true");
                        var ai = ag.element[0];
                        z(ai).not(ai).map(function () {
                            return I(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", "false")
                    })
                } else {
                    this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                        if (ae.disabled) {
                            return false
                        }
                        I(this).addClass("ui-state-active");
                        r = this;
                        ag.document.one("mouseup", function () {
                            r = null
                        })
                    }).bind("mouseup" + this.eventNamespace, function () {
                        if (ae.disabled) {
                            return false
                        }
                        I(this).removeClass("ui-state-active")
                    }).bind("keydown" + this.eventNamespace, function (ai) {
                        if (ae.disabled) {
                            return false
                        }
                        if (ai.keyCode === I.ui.keyCode.SPACE || ai.keyCode === I.ui.keyCode.ENTER) {
                            I(this).addClass("ui-state-active")
                        }
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                        I(this).removeClass("ui-state-active")
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function (ai) {
                            if (ai.keyCode === I.ui.keyCode.SPACE) {
                                I(this).click()
                            }
                        })
                    }
                }
            }
            this._setOption("disabled", ae.disabled);
            this._resetButton()
        },
        _determineButtonType: function () {
            var ae, ag, af;
            if (this.element.is("[type=checkbox]")) {
                this.type = "checkbox"
            } else {
                if (this.element.is("[type=radio]")) {
                    this.type = "radio"
                } else {
                    if (this.element.is("input")) {
                        this.type = "input"
                    } else {
                        this.type = "button"
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                ae = this.element.parents().last();
                ag = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = ae.find(ag);
                if (!this.buttonElement.length) {
                    ae = ae.length ? ae.siblings() : this.element.siblings();
                    this.buttonElement = ae.filter(ag);
                    if (!this.buttonElement.length) {
                        this.buttonElement = ae.find(ag)
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                af = this.element.is(":checked");
                if (af) {
                    this.buttonElement.addClass("ui-state-active")
                }
                this.buttonElement.prop("aria-pressed", af)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(Y + " ui-state-active " + y).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title")
            }
        },
        _setOption: function (ae, af) {
            this._super(ae, af);
            if (ae === "disabled") {
                this.widget().toggleClass("ui-state-disabled", !!af);
                this.element.prop("disabled", !!af);
                if (af) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        this.buttonElement.removeClass("ui-state-focus")
                    } else {
                        this.buttonElement.removeClass("ui-state-focus ui-state-active")
                    }
                }
                return
            }
            this._resetButton()
        },
        refresh: function () {
            var ae = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (ae !== this.options.disabled) {
                this._setOption("disabled", ae)
            }
            if (this.type === "radio") {
                z(this.element[0]).each(function () {
                    if (I(this).is(":checked")) {
                        I(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        I(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                })
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                }
            }
        },
        _resetButton: function () {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label)
                }
                return
            }
            var ai = this.buttonElement.removeClass(y),
                ag = I("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(ai.empty()).text(),
                af = this.options.icons,
                ae = af.primary && af.secondary,
                ah = [];
            if (af.primary || af.secondary) {
                if (this.options.text) {
                    ah.push("ui-button-text-icon" + (ae ? "s" : (af.primary ? "-primary" : "-secondary")))
                }
                if (af.primary) {
                    ai.prepend("<span class='ui-button-icon-primary ui-icon " + af.primary + "'></span>")
                }
                if (af.secondary) {
                    ai.append("<span class='ui-button-icon-secondary ui-icon " + af.secondary + "'></span>")
                }
                if (!this.options.text) {
                    ah.push(ae ? "ui-button-icons-only" : "ui-button-icon-only");
                    if (!this.hasTitle) {
                        ai.attr("title", I.trim(ag))
                    }
                }
            } else {
                ah.push("ui-button-text-only")
            }
            ai.addClass(ah.join(" "))
        }
    });
    I.widget("ui.buttonset", {
        version: "1.11.1",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (ae, af) {
            if (ae === "disabled") {
                this.buttons.button("option", ae, af)
            }
            this._super(ae, af)
        },
        refresh: function () {
            var af = this.element.css("direction") === "rtl",
                ae = this.element.find(this.options.items),
                ag = ae.filter(":ui-button");
            ae.not(":ui-button").button();
            ag.button("refresh");
            this.buttons = ae.map(function () {
                return I(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(af ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(af ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return I(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    });
    var q = I.ui.button;
    /*!
     * jQuery UI Datepicker 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/datepicker/
     */
    I.extend(I.ui, {
        datepicker: {
            version: "1.11.1"
        }
    });
    var l;

    function t(af) {
        var ae, ag;
        while (af.length && af[0] !== document) {
            ae = af.css("position");
            if (ae === "absolute" || ae === "relative" || ae === "fixed") {
                ag = parseInt(af.css("zIndex"), 10);
                if (!isNaN(ag) && ag !== 0) {
                    return ag
                }
            }
            af = af.parent()
        }
        return 0
    }

    function ac() {
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        I.extend(this._defaults, this.regional[""]);
        this.regional.en = I.extend(true, {}, this.regional[""]);
        this.regional["en-US"] = I.extend(true, {}, this.regional.en);
        this.dpDiv = h(I("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    I.extend(ac.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (ae) {
            x(this._defaults, ae || {});
            return this
        },
        _attachDatepicker: function (ah, ae) {
            var ai, ag, af;
            ai = ah.nodeName.toLowerCase();
            ag = (ai === "div" || ai === "span");
            if (!ah.id) {
                this.uuid += 1;
                ah.id = "dp" + this.uuid
            }
            af = this._newInst(I(ah), ag);
            af.settings = I.extend({}, ae || {});
            if (ai === "input") {
                this._connectDatepicker(ah, af)
            } else {
                if (ag) {
                    this._inlineDatepicker(ah, af)
                }
            }
        },
        _newInst: function (af, ae) {
            var ag = af[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: ag,
                input: af,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: ae,
                dpDiv: (!ae ? this.dpDiv : h(I("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            }
        },
        _connectDatepicker: function (ag, af) {
            var ae = I(ag);
            af.append = I([]);
            af.trigger = I([]);
            if (ae.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(ae, af);
            ae.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(af);
            I.data(ag, "datepicker", af);
            if (af.settings.disabled) {
                this._disableDatepicker(ag)
            }
        },
        _attachments: function (ag, aj) {
            var af, ai, ae, ak = this._get(aj, "appendText"),
                ah = this._get(aj, "isRTL");
            if (aj.append) {
                aj.append.remove()
            }
            if (ak) {
                aj.append = I("<span class='" + this._appendClass + "'>" + ak + "</span>");
                ag[ah ? "before" : "after"](aj.append)
            }
            ag.unbind("focus", this._showDatepicker);
            if (aj.trigger) {
                aj.trigger.remove()
            }
            af = this._get(aj, "showOn");
            if (af === "focus" || af === "both") {
                ag.focus(this._showDatepicker)
            }
            if (af === "button" || af === "both") {
                ai = this._get(aj, "buttonText");
                ae = this._get(aj, "buttonImage");
                aj.trigger = I(this._get(aj, "buttonImageOnly") ? I("<img/>").addClass(this._triggerClass).attr({
                    src: ae,
                    alt: ai,
                    title: ai
                }) : I("<button type='button'></button>").addClass(this._triggerClass).html(!ae ? ai : I("<img/>").attr({
                    src: ae,
                    alt: ai,
                    title: ai
                })));
                ag[ah ? "before" : "after"](aj.trigger);
                aj.trigger.click(function () {
                    if (I.datepicker._datepickerShowing && I.datepicker._lastInput === ag[0]) {
                        I.datepicker._hideDatepicker()
                    } else {
                        if (I.datepicker._datepickerShowing && I.datepicker._lastInput !== ag[0]) {
                            I.datepicker._hideDatepicker();
                            I.datepicker._showDatepicker(ag[0])
                        } else {
                            I.datepicker._showDatepicker(ag[0])
                        }
                    }
                    return false
                })
            }
        },
        _autoSize: function (ak) {
            if (this._get(ak, "autoSize") && !ak.inline) {
                var ah, af, ag, aj, ai = new Date(2009, 12 - 1, 20),
                    ae = this._get(ak, "dateFormat");
                if (ae.match(/[DM]/)) {
                    ah = function (al) {
                        af = 0;
                        ag = 0;
                        for (aj = 0; aj < al.length; aj++) {
                            if (al[aj].length > af) {
                                af = al[aj].length;
                                ag = aj
                            }
                        }
                        return ag
                    };
                    ai.setMonth(ah(this._get(ak, (ae.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    ai.setDate(ah(this._get(ak, (ae.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - ai.getDay())
                }
                ak.input.attr("size", this._formatDate(ak, ai).length)
            }
        },
        _inlineDatepicker: function (af, ae) {
            var ag = I(af);
            if (ag.hasClass(this.markerClassName)) {
                return
            }
            ag.addClass(this.markerClassName).append(ae.dpDiv);
            I.data(af, "datepicker", ae);
            this._setDate(ae, this._getDefaultDate(ae), true);
            this._updateDatepicker(ae);
            this._updateAlternate(ae);
            if (ae.settings.disabled) {
                this._disableDatepicker(af)
            }
            ae.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function (al, af, aj, ag, ak) {
            var ae, ao, ai, an, am, ah = this._dialogInst;
            if (!ah) {
                this.uuid += 1;
                ae = "dp" + this.uuid;
                this._dialogInput = I("<input type='text' id='" + ae + "' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                I("body").append(this._dialogInput);
                ah = this._dialogInst = this._newInst(this._dialogInput, false);
                ah.settings = {};
                I.data(this._dialogInput[0], "datepicker", ah)
            }
            x(ah.settings, ag || {});
            af = (af && af.constructor === Date ? this._formatDate(ah, af) : af);
            this._dialogInput.val(af);
            this._pos = (ak ? (ak.length ? ak : [ak.pageX, ak.pageY]) : null);
            if (!this._pos) {
                ao = document.documentElement.clientWidth;
                ai = document.documentElement.clientHeight;
                an = document.documentElement.scrollLeft || document.body.scrollLeft;
                am = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(ao / 2) - 100 + an, (ai / 2) - 150 + am]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            ah.settings.onSelect = aj;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if (I.blockUI) {
                I.blockUI(this.dpDiv)
            }
            I.data(this._dialogInput[0], "datepicker", ah);
            return this
        },
        _destroyDatepicker: function (ag) {
            var ah, ae = I(ag),
                af = I.data(ag, "datepicker");
            if (!ae.hasClass(this.markerClassName)) {
                return
            }
            ah = ag.nodeName.toLowerCase();
            I.removeData(ag, "datepicker");
            if (ah === "input") {
                af.append.remove();
                af.trigger.remove();
                ae.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (ah === "div" || ah === "span") {
                    ae.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function (ah) {
            var ai, ag, ae = I(ah),
                af = I.data(ah, "datepicker");
            if (!ae.hasClass(this.markerClassName)) {
                return
            }
            ai = ah.nodeName.toLowerCase();
            if (ai === "input") {
                ah.disabled = false;
                af.trigger.filter("button").each(function () {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (ai === "div" || ai === "span") {
                    ag = ae.children("." + this._inlineClass);
                    ag.children().removeClass("ui-state-disabled");
                    ag.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
                }
            }
            this._disabledInputs = I.map(this._disabledInputs, function (aj) {
                return (aj === ah ? null : aj)
            })
        },
        _disableDatepicker: function (ah) {
            var ai, ag, ae = I(ah),
                af = I.data(ah, "datepicker");
            if (!ae.hasClass(this.markerClassName)) {
                return
            }
            ai = ah.nodeName.toLowerCase();
            if (ai === "input") {
                ah.disabled = true;
                af.trigger.filter("button").each(function () {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (ai === "div" || ai === "span") {
                    ag = ae.children("." + this._inlineClass);
                    ag.children().addClass("ui-state-disabled");
                    ag.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
                }
            }
            this._disabledInputs = I.map(this._disabledInputs, function (aj) {
                return (aj === ah ? null : aj)
            });
            this._disabledInputs[this._disabledInputs.length] = ah
        },
        _isDisabledDatepicker: function (af) {
            if (!af) {
                return false
            }
            for (var ae = 0; ae < this._disabledInputs.length; ae++) {
                if (this._disabledInputs[ae] === af) {
                    return true
                }
            }
            return false
        },
        _getInst: function (af) {
            try {
                return I.data(af, "datepicker")
            } catch (ae) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (ak, af, aj) {
            var ag, ae, ai, al, ah = this._getInst(ak);
            if (arguments.length === 2 && typeof af === "string") {
                return (af === "defaults" ? I.extend({}, I.datepicker._defaults) : (ah ? (af === "all" ? I.extend({}, ah.settings) : this._get(ah, af)) : null))
            }
            ag = af || {};
            if (typeof af === "string") {
                ag = {};
                ag[af] = aj
            }
            if (ah) {
                if (this._curInst === ah) {
                    this._hideDatepicker()
                }
                ae = this._getDateDatepicker(ak, true);
                ai = this._getMinMaxDate(ah, "min");
                al = this._getMinMaxDate(ah, "max");
                x(ah.settings, ag);
                if (ai !== null && ag.dateFormat !== undefined && ag.minDate === undefined) {
                    ah.settings.minDate = this._formatDate(ah, ai)
                }
                if (al !== null && ag.dateFormat !== undefined && ag.maxDate === undefined) {
                    ah.settings.maxDate = this._formatDate(ah, al)
                }
                if ("disabled" in ag) {
                    if (ag.disabled) {
                        this._disableDatepicker(ak)
                    } else {
                        this._enableDatepicker(ak)
                    }
                }
                this._attachments(I(ak), ah);
                this._autoSize(ah);
                this._setDate(ah, ae);
                this._updateAlternate(ah);
                this._updateDatepicker(ah)
            }
        },
        _changeDatepicker: function (ag, ae, af) {
            this._optionDatepicker(ag, ae, af)
        },
        _refreshDatepicker: function (af) {
            var ae = this._getInst(af);
            if (ae) {
                this._updateDatepicker(ae)
            }
        },
        _setDateDatepicker: function (ag, ae) {
            var af = this._getInst(ag);
            if (af) {
                this._setDate(af, ae);
                this._updateDatepicker(af);
                this._updateAlternate(af)
            }
        },
        _getDateDatepicker: function (ag, ae) {
            var af = this._getInst(ag);
            if (af && !af.inline) {
                this._setDateFromField(af, ae)
            }
            return (af ? this._getDate(af) : null)
        },
        _doKeyDown: function (ah) {
            var af, ae, aj, ai = I.datepicker._getInst(ah.target),
                ak = true,
                ag = ai.dpDiv.is(".ui-datepicker-rtl");
            ai._keyEvent = true;
            if (I.datepicker._datepickerShowing) {
                switch (ah.keyCode) {
                case 9:
                    I.datepicker._hideDatepicker();
                    ak = false;
                    break;
                case 13:
                    aj = I("td." + I.datepicker._dayOverClass + ":not(." + I.datepicker._currentClass + ")", ai.dpDiv);
                    if (aj[0]) {
                        I.datepicker._selectDay(ah.target, ai.selectedMonth, ai.selectedYear, aj[0])
                    }
                    af = I.datepicker._get(ai, "onSelect");
                    if (af) {
                        ae = I.datepicker._formatDate(ai);
                        af.apply((ai.input ? ai.input[0] : null), [ae, ai])
                    } else {
                        I.datepicker._hideDatepicker()
                    }
                    return false;
                case 27:
                    I.datepicker._hideDatepicker();
                    break;
                case 33:
                    I.datepicker._adjustDate(ah.target, (ah.ctrlKey ? -I.datepicker._get(ai, "stepBigMonths") : -I.datepicker._get(ai, "stepMonths")), "M");
                    break;
                case 34:
                    I.datepicker._adjustDate(ah.target, (ah.ctrlKey ? +I.datepicker._get(ai, "stepBigMonths") : +I.datepicker._get(ai, "stepMonths")), "M");
                    break;
                case 35:
                    if (ah.ctrlKey || ah.metaKey) {
                        I.datepicker._clearDate(ah.target)
                    }
                    ak = ah.ctrlKey || ah.metaKey;
                    break;
                case 36:
                    if (ah.ctrlKey || ah.metaKey) {
                        I.datepicker._gotoToday(ah.target)
                    }
                    ak = ah.ctrlKey || ah.metaKey;
                    break;
                case 37:
                    if (ah.ctrlKey || ah.metaKey) {
                        I.datepicker._adjustDate(ah.target, (ag ? +1 : -1), "D")
                    }
                    ak = ah.ctrlKey || ah.metaKey;
                    if (ah.originalEvent.altKey) {
                        I.datepicker._adjustDate(ah.target, (ah.ctrlKey ? -I.datepicker._get(ai, "stepBigMonths") : -I.datepicker._get(ai, "stepMonths")), "M")
                    }
                    break;
                case 38:
                    if (ah.ctrlKey || ah.metaKey) {
                        I.datepicker._adjustDate(ah.target, -7, "D")
                    }
                    ak = ah.ctrlKey || ah.metaKey;
                    break;
                case 39:
                    if (ah.ctrlKey || ah.metaKey) {
                        I.datepicker._adjustDate(ah.target, (ag ? -1 : +1), "D")
                    }
                    ak = ah.ctrlKey || ah.metaKey;
                    if (ah.originalEvent.altKey) {
                        I.datepicker._adjustDate(ah.target, (ah.ctrlKey ? +I.datepicker._get(ai, "stepBigMonths") : +I.datepicker._get(ai, "stepMonths")), "M")
                    }
                    break;
                case 40:
                    if (ah.ctrlKey || ah.metaKey) {
                        I.datepicker._adjustDate(ah.target, +7, "D")
                    }
                    ak = ah.ctrlKey || ah.metaKey;
                    break;
                default:
                    ak = false
                }
            } else {
                if (ah.keyCode === 36 && ah.ctrlKey) {
                    I.datepicker._showDatepicker(this)
                } else {
                    ak = false
                }
            }
            if (ak) {
                ah.preventDefault();
                ah.stopPropagation()
            }
        },
        _doKeyPress: function (ag) {
            var af, ae, ah = I.datepicker._getInst(ag.target);
            if (I.datepicker._get(ah, "constrainInput")) {
                af = I.datepicker._possibleChars(I.datepicker._get(ah, "dateFormat"));
                ae = String.fromCharCode(ag.charCode == null ? ag.keyCode : ag.charCode);
                return ag.ctrlKey || ag.metaKey || (ae < " " || !af || af.indexOf(ae) > -1)
            }
        },
        _doKeyUp: function (ag) {
            var ae, ah = I.datepicker._getInst(ag.target);
            if (ah.input.val() !== ah.lastVal) {
                try {
                    ae = I.datepicker.parseDate(I.datepicker._get(ah, "dateFormat"), (ah.input ? ah.input.val() : null), I.datepicker._getFormatConfig(ah));
                    if (ae) {
                        I.datepicker._setDateFromField(ah);
                        I.datepicker._updateAlternate(ah);
                        I.datepicker._updateDatepicker(ah)
                    }
                } catch (af) {}
            }
            return true
        },
        _showDatepicker: function (af) {
            af = af.target || af;
            if (af.nodeName.toLowerCase() !== "input") {
                af = I("input", af.parentNode)[0]
            }
            if (I.datepicker._isDisabledDatepicker(af) || I.datepicker._lastInput === af) {
                return
            }
            var ah, al, ag, aj, ak, ae, ai;
            ah = I.datepicker._getInst(af);
            if (I.datepicker._curInst && I.datepicker._curInst !== ah) {
                I.datepicker._curInst.dpDiv.stop(true, true);
                if (ah && I.datepicker._datepickerShowing) {
                    I.datepicker._hideDatepicker(I.datepicker._curInst.input[0])
                }
            }
            al = I.datepicker._get(ah, "beforeShow");
            ag = al ? al.apply(af, [af, ah]) : {};
            if (ag === false) {
                return
            }
            x(ah.settings, ag);
            ah.lastVal = null;
            I.datepicker._lastInput = af;
            I.datepicker._setDateFromField(ah);
            if (I.datepicker._inDialog) {
                af.value = ""
            }
            if (!I.datepicker._pos) {
                I.datepicker._pos = I.datepicker._findPos(af);
                I.datepicker._pos[1] += af.offsetHeight
            }
            aj = false;
            I(af).parents().each(function () {
                aj |= I(this).css("position") === "fixed";
                return !aj
            });
            ak = {
                left: I.datepicker._pos[0],
                top: I.datepicker._pos[1]
            };
            I.datepicker._pos = null;
            ah.dpDiv.empty();
            ah.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            I.datepicker._updateDatepicker(ah);
            ak = I.datepicker._checkOffset(ah, ak, aj);
            ah.dpDiv.css({
                position: (I.datepicker._inDialog && I.blockUI ? "static" : (aj ? "fixed" : "absolute")),
                display: "none",
                left: ak.left + "px",
                top: ak.top + "px"
            });
            if (!ah.inline) {
                ae = I.datepicker._get(ah, "showAnim");
                ai = I.datepicker._get(ah, "duration");
                ah.dpDiv.css("z-index", t(I(af)) + 1);
                I.datepicker._datepickerShowing = true;
                if (I.effects && I.effects.effect[ae]) {
                    ah.dpDiv.show(ae, I.datepicker._get(ah, "showOptions"), ai)
                } else {
                    ah.dpDiv[ae || "show"](ae ? ai : null)
                }
                if (I.datepicker._shouldFocusInput(ah)) {
                    ah.input.focus()
                }
                I.datepicker._curInst = ah
            }
        },
        _updateDatepicker: function (ah) {
            this.maxRows = 4;
            l = ah;
            ah.dpDiv.empty().append(this._generateHTML(ah));
            this._attachHandlers(ah);
            var aj, ae = this._getNumberOfMonths(ah),
                ai = ae[1],
                ag = 17,
                af = ah.dpDiv.find("." + this._dayOverClass + " a");
            if (af.length > 0) {
                p.apply(af.get(0))
            }
            ah.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (ai > 1) {
                ah.dpDiv.addClass("ui-datepicker-multi-" + ai).css("width", (ag * ai) + "em")
            }
            ah.dpDiv[(ae[0] !== 1 || ae[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            ah.dpDiv[(this._get(ah, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (ah === I.datepicker._curInst && I.datepicker._datepickerShowing && I.datepicker._shouldFocusInput(ah)) {
                ah.input.focus()
            }
            if (ah.yearshtml) {
                aj = ah.yearshtml;
                setTimeout(function () {
                    if (aj === ah.yearshtml && ah.yearshtml) {
                        ah.dpDiv.find("select.ui-datepicker-year:first").replaceWith(ah.yearshtml)
                    }
                    aj = ah.yearshtml = null
                }, 0)
            }
        },
        _shouldFocusInput: function (ae) {
            return ae.input && ae.input.is(":visible") && !ae.input.is(":disabled") && !ae.input.is(":focus")
        },
        _checkOffset: function (aj, ah, ag) {
            var ai = aj.dpDiv.outerWidth(),
                am = aj.dpDiv.outerHeight(),
                al = aj.input ? aj.input.outerWidth() : 0,
                ae = aj.input ? aj.input.outerHeight() : 0,
                ak = document.documentElement.clientWidth + (ag ? 0 : I(document).scrollLeft()),
                af = document.documentElement.clientHeight + (ag ? 0 : I(document).scrollTop());
            ah.left -= (this._get(aj, "isRTL") ? (ai - al) : 0);
            ah.left -= (ag && ah.left === aj.input.offset().left) ? I(document).scrollLeft() : 0;
            ah.top -= (ag && ah.top === (aj.input.offset().top + ae)) ? I(document).scrollTop() : 0;
            ah.left -= Math.min(ah.left, (ah.left + ai > ak && ak > ai) ? Math.abs(ah.left + ai - ak) : 0);
            ah.top -= Math.min(ah.top, (ah.top + am > af && af > am) ? Math.abs(am + ae) : 0);
            return ah
        },
        _findPos: function (ah) {
            var ae, ag = this._getInst(ah),
                af = this._get(ag, "isRTL");
            while (ah && (ah.type === "hidden" || ah.nodeType !== 1 || I.expr.filters.hidden(ah))) {
                ah = ah[af ? "previousSibling" : "nextSibling"]
            }
            ae = I(ah).offset();
            return [ae.left, ae.top]
        },
        _hideDatepicker: function (ag) {
            var af, aj, ai, ae, ah = this._curInst;
            if (!ah || (ag && ah !== I.data(ag, "datepicker"))) {
                return
            }
            if (this._datepickerShowing) {
                af = this._get(ah, "showAnim");
                aj = this._get(ah, "duration");
                ai = function () {
                    I.datepicker._tidyDialog(ah)
                };
                if (I.effects && (I.effects.effect[af] || I.effects[af])) {
                    ah.dpDiv.hide(af, I.datepicker._get(ah, "showOptions"), aj, ai)
                } else {
                    ah.dpDiv[(af === "slideDown" ? "slideUp" : (af === "fadeIn" ? "fadeOut" : "hide"))]((af ? aj : null), ai)
                }
                if (!af) {
                    ai()
                }
                this._datepickerShowing = false;
                ae = this._get(ah, "onClose");
                if (ae) {
                    ae.apply((ah.input ? ah.input[0] : null), [(ah.input ? ah.input.val() : ""), ah])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (I.blockUI) {
                        I.unblockUI();
                        I("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (ae) {
            ae.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (af) {
            if (!I.datepicker._curInst) {
                return
            }
            var ae = I(af.target),
                ag = I.datepicker._getInst(ae[0]);
            if (((ae[0].id !== I.datepicker._mainDivId && ae.parents("#" + I.datepicker._mainDivId).length === 0 && !ae.hasClass(I.datepicker.markerClassName) && !ae.closest("." + I.datepicker._triggerClass).length && I.datepicker._datepickerShowing && !(I.datepicker._inDialog && I.blockUI))) || (ae.hasClass(I.datepicker.markerClassName) && I.datepicker._curInst !== ag)) {
                I.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (ai, ah, ag) {
            var af = I(ai),
                ae = this._getInst(af[0]);
            if (this._isDisabledDatepicker(af[0])) {
                return
            }
            this._adjustInstDate(ae, ah + (ag === "M" ? this._get(ae, "showCurrentAtPos") : 0), ag);
            this._updateDatepicker(ae)
        },
        _gotoToday: function (ah) {
            var ae, ag = I(ah),
                af = this._getInst(ag[0]);
            if (this._get(af, "gotoCurrent") && af.currentDay) {
                af.selectedDay = af.currentDay;
                af.drawMonth = af.selectedMonth = af.currentMonth;
                af.drawYear = af.selectedYear = af.currentYear
            } else {
                ae = new Date();
                af.selectedDay = ae.getDate();
                af.drawMonth = af.selectedMonth = ae.getMonth();
                af.drawYear = af.selectedYear = ae.getFullYear()
            }
            this._notifyChange(af);
            this._adjustDate(ag)
        },
        _selectMonthYear: function (ai, ae, ah) {
            var ag = I(ai),
                af = this._getInst(ag[0]);
            af["selected" + (ah === "M" ? "Month" : "Year")] = af["draw" + (ah === "M" ? "Month" : "Year")] = parseInt(ae.options[ae.selectedIndex].value, 10);
            this._notifyChange(af);
            this._adjustDate(ag)
        },
        _selectDay: function (aj, ah, ae, ai) {
            var af, ag = I(aj);
            if (I(ai).hasClass(this._unselectableClass) || this._isDisabledDatepicker(ag[0])) {
                return
            }
            af = this._getInst(ag[0]);
            af.selectedDay = af.currentDay = I("a", ai).html();
            af.selectedMonth = af.currentMonth = ah;
            af.selectedYear = af.currentYear = ae;
            this._selectDate(aj, this._formatDate(af, af.currentDay, af.currentMonth, af.currentYear))
        },
        _clearDate: function (af) {
            var ae = I(af);
            this._selectDate(ae, "")
        },
        _selectDate: function (ai, ae) {
            var af, ah = I(ai),
                ag = this._getInst(ah[0]);
            ae = (ae != null ? ae : this._formatDate(ag));
            if (ag.input) {
                ag.input.val(ae)
            }
            this._updateAlternate(ag);
            af = this._get(ag, "onSelect");
            if (af) {
                af.apply((ag.input ? ag.input[0] : null), [ae, ag])
            } else {
                if (ag.input) {
                    ag.input.trigger("change")
                }
            }
            if (ag.inline) {
                this._updateDatepicker(ag)
            } else {
                this._hideDatepicker();
                this._lastInput = ag.input[0];
                if (typeof (ag.input[0]) !== "object") {
                    ag.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function (ai) {
            var ah, ag, ae, af = this._get(ai, "altField");
            if (af) {
                ah = this._get(ai, "altFormat") || this._get(ai, "dateFormat");
                ag = this._getDate(ai);
                ae = this.formatDate(ah, ag, this._getFormatConfig(ai));
                I(af).each(function () {
                    I(this).val(ae)
                })
            }
        },
        noWeekends: function (af) {
            var ae = af.getDay();
            return [(ae > 0 && ae < 6), ""]
        },
        iso8601Week: function (ae) {
            var af, ag = new Date(ae.getTime());
            ag.setDate(ag.getDate() + 4 - (ag.getDay() || 7));
            af = ag.getTime();
            ag.setMonth(0);
            ag.setDate(1);
            return Math.floor(Math.round((af - ag) / 86400000) / 7) + 1
        },
        parseDate: function (av, ap, ax) {
            if (av == null || ap == null) {
                throw "Invalid arguments"
            }
            ap = (typeof ap === "object" ? ap.toString() : ap + "");
            if (ap === "") {
                return null
            }
            var ah, ar, af, aw = 0,
                ak = (ax ? ax.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                ag = (typeof ak !== "string" ? ak : new Date().getFullYear() % 100 + parseInt(ak, 10)),
                an = (ax ? ax.dayNamesShort : null) || this._defaults.dayNamesShort,
                az = (ax ? ax.dayNames : null) || this._defaults.dayNames,
                ae = (ax ? ax.monthNamesShort : null) || this._defaults.monthNamesShort,
                ai = (ax ? ax.monthNames : null) || this._defaults.monthNames,
                aj = -1,
                aA = -1,
                au = -1,
                am = -1,
                at = false,
                ay, ao = function (aC) {
                    var aD = (ah + 1 < av.length && av.charAt(ah + 1) === aC);
                    if (aD) {
                        ah++
                    }
                    return aD
                },
                aB = function (aE) {
                    var aC = ao(aE),
                        aF = (aE === "@" ? 14 : (aE === "!" ? 20 : (aE === "y" && aC ? 4 : (aE === "o" ? 3 : 2)))),
                        aH = (aE === "y" ? aF : 1),
                        aG = new RegExp("^\\d{" + aH + "," + aF + "}"),
                        aD = ap.substring(aw).match(aG);
                    if (!aD) {
                        throw "Missing number at position " + aw
                    }
                    aw += aD[0].length;
                    return parseInt(aD[0], 10)
                },
                al = function (aD, aE, aG) {
                    var aC = -1,
                        aF = I.map(ao(aD) ? aG : aE, function (aI, aH) {
                            return [[aH, aI]]
                        }).sort(function (aI, aH) {
                            return -(aI[1].length - aH[1].length)
                        });
                    I.each(aF, function (aI, aJ) {
                        var aH = aJ[1];
                        if (ap.substr(aw, aH.length).toLowerCase() === aH.toLowerCase()) {
                            aC = aJ[0];
                            aw += aH.length;
                            return false
                        }
                    });
                    if (aC !== -1) {
                        return aC + 1
                    } else {
                        throw "Unknown name at position " + aw
                    }
                },
                aq = function () {
                    if (ap.charAt(aw) !== av.charAt(ah)) {
                        throw "Unexpected literal at position " + aw
                    }
                    aw++
                };
            for (ah = 0; ah < av.length; ah++) {
                if (at) {
                    if (av.charAt(ah) === "'" && !ao("'")) {
                        at = false
                    } else {
                        aq()
                    }
                } else {
                    switch (av.charAt(ah)) {
                    case "d":
                        au = aB("d");
                        break;
                    case "D":
                        al("D", an, az);
                        break;
                    case "o":
                        am = aB("o");
                        break;
                    case "m":
                        aA = aB("m");
                        break;
                    case "M":
                        aA = al("M", ae, ai);
                        break;
                    case "y":
                        aj = aB("y");
                        break;
                    case "@":
                        ay = new Date(aB("@"));
                        aj = ay.getFullYear();
                        aA = ay.getMonth() + 1;
                        au = ay.getDate();
                        break;
                    case "!":
                        ay = new Date((aB("!") - this._ticksTo1970) / 10000);
                        aj = ay.getFullYear();
                        aA = ay.getMonth() + 1;
                        au = ay.getDate();
                        break;
                    case "'":
                        if (ao("'")) {
                            aq()
                        } else {
                            at = true
                        }
                        break;
                    default:
                        aq()
                    }
                }
            }
            if (aw < ap.length) {
                af = ap.substr(aw);
                if (!/^\s+/.test(af)) {
                    throw "Extra/unparsed characters found in date: " + af
                }
            }
            if (aj === -1) {
                aj = new Date().getFullYear()
            } else {
                if (aj < 100) {
                    aj += new Date().getFullYear() - new Date().getFullYear() % 100 + (aj <= ag ? 0 : -100)
                }
            }
            if (am > -1) {
                aA = 1;
                au = am;
                do {
                    ar = this._getDaysInMonth(aj, aA - 1);
                    if (au <= ar) {
                        break
                    }
                    aA++;
                    au -= ar
                } while (true)
            }
            ay = this._daylightSavingAdjust(new Date(aj, aA - 1, au));
            if (ay.getFullYear() !== aj || ay.getMonth() + 1 !== aA || ay.getDate() !== au) {
                throw "Invalid date"
            }
            return ay
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (an, ah, ai) {
            if (!ah) {
                return ""
            }
            var ap, aq = (ai ? ai.dayNamesShort : null) || this._defaults.dayNamesShort,
                af = (ai ? ai.dayNames : null) || this._defaults.dayNames,
                al = (ai ? ai.monthNamesShort : null) || this._defaults.monthNamesShort,
                aj = (ai ? ai.monthNames : null) || this._defaults.monthNames,
                ao = function (ar) {
                    var at = (ap + 1 < an.length && an.charAt(ap + 1) === ar);
                    if (at) {
                        ap++
                    }
                    return at
                },
                ae = function (au, av, ar) {
                    var at = "" + av;
                    if (ao(au)) {
                        while (at.length < ar) {
                            at = "0" + at
                        }
                    }
                    return at
                },
                ak = function (ar, au, at, av) {
                    return (ao(ar) ? av[au] : at[au])
                },
                ag = "",
                am = false;
            if (ah) {
                for (ap = 0; ap < an.length; ap++) {
                    if (am) {
                        if (an.charAt(ap) === "'" && !ao("'")) {
                            am = false
                        } else {
                            ag += an.charAt(ap)
                        }
                    } else {
                        switch (an.charAt(ap)) {
                        case "d":
                            ag += ae("d", ah.getDate(), 2);
                            break;
                        case "D":
                            ag += ak("D", ah.getDay(), aq, af);
                            break;
                        case "o":
                            ag += ae("o", Math.round((new Date(ah.getFullYear(), ah.getMonth(), ah.getDate()).getTime() - new Date(ah.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            ag += ae("m", ah.getMonth() + 1, 2);
                            break;
                        case "M":
                            ag += ak("M", ah.getMonth(), al, aj);
                            break;
                        case "y":
                            ag += (ao("y") ? ah.getFullYear() : (ah.getYear() % 100 < 10 ? "0" : "") + ah.getYear() % 100);
                            break;
                        case "@":
                            ag += ah.getTime();
                            break;
                        case "!":
                            ag += ah.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (ao("'")) {
                                ag += "'"
                            } else {
                                am = true
                            }
                            break;
                        default:
                            ag += an.charAt(ap)
                        }
                    }
                }
            }
            return ag
        },
        _possibleChars: function (ai) {
            var ah, ag = "",
                af = false,
                ae = function (aj) {
                    var ak = (ah + 1 < ai.length && ai.charAt(ah + 1) === aj);
                    if (ak) {
                        ah++
                    }
                    return ak
                };
            for (ah = 0; ah < ai.length; ah++) {
                if (af) {
                    if (ai.charAt(ah) === "'" && !ae("'")) {
                        af = false
                    } else {
                        ag += ai.charAt(ah)
                    }
                } else {
                    switch (ai.charAt(ah)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        ag += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        if (ae("'")) {
                            ag += "'"
                        } else {
                            af = true
                        }
                        break;
                    default:
                        ag += ai.charAt(ah)
                    }
                }
            }
            return ag
        },
        _get: function (af, ae) {
            return af.settings[ae] !== undefined ? af.settings[ae] : this._defaults[ae]
        },
        _setDateFromField: function (aj, ag) {
            if (aj.input.val() === aj.lastVal) {
                return
            }
            var ae = this._get(aj, "dateFormat"),
                al = aj.lastVal = aj.input ? aj.input.val() : null,
                ak = this._getDefaultDate(aj),
                af = ak,
                ah = this._getFormatConfig(aj);
            try {
                af = this.parseDate(ae, al, ah) || ak
            } catch (ai) {
                al = (ag ? "" : al)
            }
            aj.selectedDay = af.getDate();
            aj.drawMonth = aj.selectedMonth = af.getMonth();
            aj.drawYear = aj.selectedYear = af.getFullYear();
            aj.currentDay = (al ? af.getDate() : 0);
            aj.currentMonth = (al ? af.getMonth() : 0);
            aj.currentYear = (al ? af.getFullYear() : 0);
            this._adjustInstDate(aj)
        },
        _getDefaultDate: function (ae) {
            return this._restrictMinMax(ae, this._determineDate(ae, this._get(ae, "defaultDate"), new Date()))
        },
        _determineDate: function (ai, af, aj) {
            var ah = function (al) {
                    var ak = new Date();
                    ak.setDate(ak.getDate() + al);
                    return ak
                },
                ag = function (ar) {
                    try {
                        return I.datepicker.parseDate(I.datepicker._get(ai, "dateFormat"), ar, I.datepicker._getFormatConfig(ai))
                    } catch (aq) {}
                    var al = (ar.toLowerCase().match(/^c/) ? I.datepicker._getDate(ai) : null) || new Date(),
                        am = al.getFullYear(),
                        ap = al.getMonth(),
                        ak = al.getDate(),
                        ao = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                        an = ao.exec(ar);
                    while (an) {
                        switch (an[2] || "d") {
                        case "d":
                        case "D":
                            ak += parseInt(an[1], 10);
                            break;
                        case "w":
                        case "W":
                            ak += parseInt(an[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            ap += parseInt(an[1], 10);
                            ak = Math.min(ak, I.datepicker._getDaysInMonth(am, ap));
                            break;
                        case "y":
                        case "Y":
                            am += parseInt(an[1], 10);
                            ak = Math.min(ak, I.datepicker._getDaysInMonth(am, ap));
                            break
                        }
                        an = ao.exec(ar)
                    }
                    return new Date(am, ap, ak)
                },
                ae = (af == null || af === "" ? aj : (typeof af === "string" ? ag(af) : (typeof af === "number" ? (isNaN(af) ? aj : ah(af)) : new Date(af.getTime()))));
            ae = (ae && ae.toString() === "Invalid Date" ? aj : ae);
            if (ae) {
                ae.setHours(0);
                ae.setMinutes(0);
                ae.setSeconds(0);
                ae.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(ae)
        },
        _daylightSavingAdjust: function (ae) {
            if (!ae) {
                return null
            }
            ae.setHours(ae.getHours() > 12 ? ae.getHours() + 2 : 0);
            return ae
        },
        _setDate: function (ak, ah, aj) {
            var ae = !ah,
                ag = ak.selectedMonth,
                ai = ak.selectedYear,
                af = this._restrictMinMax(ak, this._determineDate(ak, ah, new Date()));
            ak.selectedDay = ak.currentDay = af.getDate();
            ak.drawMonth = ak.selectedMonth = ak.currentMonth = af.getMonth();
            ak.drawYear = ak.selectedYear = ak.currentYear = af.getFullYear();
            if ((ag !== ak.selectedMonth || ai !== ak.selectedYear) && !aj) {
                this._notifyChange(ak)
            }
            this._adjustInstDate(ak);
            if (ak.input) {
                ak.input.val(ae ? "" : this._formatDate(ak))
            }
        },
        _getDate: function (af) {
            var ae = (!af.currentYear || (af.input && af.input.val() === "") ? null : this._daylightSavingAdjust(new Date(af.currentYear, af.currentMonth, af.currentDay)));
            return ae
        },
        _attachHandlers: function (af) {
            var ae = this._get(af, "stepMonths"),
                ag = "#" + af.id.replace(/\\\\/g, "\\");
            af.dpDiv.find("[data-handler]").map(function () {
                var ah = {
                    prev: function () {
                        I.datepicker._adjustDate(ag, -ae, "M")
                    },
                    next: function () {
                        I.datepicker._adjustDate(ag, +ae, "M")
                    },
                    hide: function () {
                        I.datepicker._hideDatepicker()
                    },
                    today: function () {
                        I.datepicker._gotoToday(ag)
                    },
                    selectDay: function () {
                        I.datepicker._selectDay(ag, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function () {
                        I.datepicker._selectMonthYear(ag, this, "M");
                        return false
                    },
                    selectYear: function () {
                        I.datepicker._selectMonthYear(ag, this, "Y");
                        return false
                    }
                };
                I(this).bind(this.getAttribute("data-event"), ah[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (aV) {
            var ay, ax, aQ, aI, ai, aZ, aT, aM, a2, aG, a6, ap, ar, aq, af, aY, an, aB, a1, aO, a7, aA, aF, ao, aj, aR, aK, aN, aL, am, aD, at, aU, aX, ah, a0, a4, aJ, au, aW = new Date(),
                az = this._daylightSavingAdjust(new Date(aW.getFullYear(), aW.getMonth(), aW.getDate())),
                a3 = this._get(aV, "isRTL"),
                a5 = this._get(aV, "showButtonPanel"),
                aP = this._get(aV, "hideIfNoPrevNext"),
                aE = this._get(aV, "navigationAsDateFormat"),
                av = this._getNumberOfMonths(aV),
                al = this._get(aV, "showCurrentAtPos"),
                aH = this._get(aV, "stepMonths"),
                aC = (av[0] !== 1 || av[1] !== 1),
                ag = this._daylightSavingAdjust((!aV.currentDay ? new Date(9999, 9, 9) : new Date(aV.currentYear, aV.currentMonth, aV.currentDay))),
                ak = this._getMinMaxDate(aV, "min"),
                aw = this._getMinMaxDate(aV, "max"),
                ae = aV.drawMonth - al,
                aS = aV.drawYear;
            if (ae < 0) {
                ae += 12;
                aS--
            }
            if (aw) {
                ay = this._daylightSavingAdjust(new Date(aw.getFullYear(), aw.getMonth() - (av[0] * av[1]) + 1, aw.getDate()));
                ay = (ak && ay < ak ? ak : ay);
                while (this._daylightSavingAdjust(new Date(aS, ae, 1)) > ay) {
                    ae--;
                    if (ae < 0) {
                        ae = 11;
                        aS--
                    }
                }
            }
            aV.drawMonth = ae;
            aV.drawYear = aS;
            ax = this._get(aV, "prevText");
            ax = (!aE ? ax : this.formatDate(ax, this._daylightSavingAdjust(new Date(aS, ae - aH, 1)), this._getFormatConfig(aV)));
            aQ = (this._canAdjustMonth(aV, -1, aS, ae) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + ax + "'><span class='ui-icon ui-icon-circle-triangle-" + (a3 ? "e" : "w") + "'>" + ax + "</span></a>" : (aP ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + ax + "'><span class='ui-icon ui-icon-circle-triangle-" + (a3 ? "e" : "w") + "'>" + ax + "</span></a>"));
            aI = this._get(aV, "nextText");
            aI = (!aE ? aI : this.formatDate(aI, this._daylightSavingAdjust(new Date(aS, ae + aH, 1)), this._getFormatConfig(aV)));
            ai = (this._canAdjustMonth(aV, +1, aS, ae) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + aI + "'><span class='ui-icon ui-icon-circle-triangle-" + (a3 ? "w" : "e") + "'>" + aI + "</span></a>" : (aP ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + aI + "'><span class='ui-icon ui-icon-circle-triangle-" + (a3 ? "w" : "e") + "'>" + aI + "</span></a>"));
            aZ = this._get(aV, "currentText");
            aT = (this._get(aV, "gotoCurrent") && aV.currentDay ? ag : az);
            aZ = (!aE ? aZ : this.formatDate(aZ, aT, this._getFormatConfig(aV)));
            aM = (!aV.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(aV, "closeText") + "</button>" : "");
            a2 = (a5) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (a3 ? aM : "") + (this._isInRange(aV, aT) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + aZ + "</button>" : "") + (a3 ? "" : aM) + "</div>" : "";
            aG = parseInt(this._get(aV, "firstDay"), 10);
            aG = (isNaN(aG) ? 0 : aG);
            a6 = this._get(aV, "showWeek");
            ap = this._get(aV, "dayNames");
            ar = this._get(aV, "dayNamesMin");
            aq = this._get(aV, "monthNames");
            af = this._get(aV, "monthNamesShort");
            aY = this._get(aV, "beforeShowDay");
            an = this._get(aV, "showOtherMonths");
            aB = this._get(aV, "selectOtherMonths");
            a1 = this._getDefaultDate(aV);
            aO = "";
            a7;
            for (aA = 0; aA < av[0]; aA++) {
                aF = "";
                this.maxRows = 4;
                for (ao = 0; ao < av[1]; ao++) {
                    aj = this._daylightSavingAdjust(new Date(aS, ae, aV.selectedDay));
                    aR = " ui-corner-all";
                    aK = "";
                    if (aC) {
                        aK += "<div class='ui-datepicker-group";
                        if (av[1] > 1) {
                            switch (ao) {
                            case 0:
                                aK += " ui-datepicker-group-first";
                                aR = " ui-corner-" + (a3 ? "right" : "left");
                                break;
                            case av[1] - 1:
                                aK += " ui-datepicker-group-last";
                                aR = " ui-corner-" + (a3 ? "left" : "right");
                                break;
                            default:
                                aK += " ui-datepicker-group-middle";
                                aR = "";
                                break
                            }
                        }
                        aK += "'>"
                    }
                    aK += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + aR + "'>" + (/all|left/.test(aR) && aA === 0 ? (a3 ? ai : aQ) : "") + (/all|right/.test(aR) && aA === 0 ? (a3 ? aQ : ai) : "") + this._generateMonthYearHeader(aV, ae, aS, ak, aw, aA > 0 || ao > 0, aq, af) + "</div><table class='ui-datepicker-calendar'><thead><tr>";
                    aN = (a6 ? "<th class='ui-datepicker-week-col'>" + this._get(aV, "weekHeader") + "</th>" : "");
                    for (a7 = 0; a7 < 7; a7++) {
                        aL = (a7 + aG) % 7;
                        aN += "<th scope='col'" + ((a7 + aG + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ap[aL] + "'>" + ar[aL] + "</span></th>"
                    }
                    aK += aN + "</tr></thead><tbody>";
                    am = this._getDaysInMonth(aS, ae);
                    if (aS === aV.selectedYear && ae === aV.selectedMonth) {
                        aV.selectedDay = Math.min(aV.selectedDay, am)
                    }
                    aD = (this._getFirstDayOfMonth(aS, ae) - aG + 7) % 7;
                    at = Math.ceil((aD + am) / 7);
                    aU = (aC ? this.maxRows > at ? this.maxRows : at : at);
                    this.maxRows = aU;
                    aX = this._daylightSavingAdjust(new Date(aS, ae, 1 - aD));
                    for (ah = 0; ah < aU; ah++) {
                        aK += "<tr>";
                        a0 = (!a6 ? "" : "<td class='ui-datepicker-week-col'>" + this._get(aV, "calculateWeek")(aX) + "</td>");
                        for (a7 = 0; a7 < 7; a7++) {
                            a4 = (aY ? aY.apply((aV.input ? aV.input[0] : null), [aX]) : [true, ""]);
                            aJ = (aX.getMonth() !== ae);
                            au = (aJ && !aB) || !a4[0] || (ak && aX < ak) || (aw && aX > aw);
                            a0 += "<td class='" + ((a7 + aG + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (aJ ? " ui-datepicker-other-month" : "") + ((aX.getTime() === aj.getTime() && ae === aV.selectedMonth && aV._keyEvent) || (a1.getTime() === aX.getTime() && a1.getTime() === aj.getTime()) ? " " + this._dayOverClass : "") + (au ? " " + this._unselectableClass + " ui-state-disabled" : "") + (aJ && !an ? "" : " " + a4[1] + (aX.getTime() === ag.getTime() ? " " + this._currentClass : "") + (aX.getTime() === az.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!aJ || an) && a4[2] ? " title='" + a4[2].replace(/'/g, "&#39;") + "'" : "") + (au ? "" : " data-handler='selectDay' data-event='click' data-month='" + aX.getMonth() + "' data-year='" + aX.getFullYear() + "'") + ">" + (aJ && !an ? "&#xa0;" : (au ? "<span class='ui-state-default'>" + aX.getDate() + "</span>" : "<a class='ui-state-default" + (aX.getTime() === az.getTime() ? " ui-state-highlight" : "") + (aX.getTime() === ag.getTime() ? " ui-state-active" : "") + (aJ ? " ui-priority-secondary" : "") + "' href='#'>" + aX.getDate() + "</a>")) + "</td>";
                            aX.setDate(aX.getDate() + 1);
                            aX = this._daylightSavingAdjust(aX)
                        }
                        aK += a0 + "</tr>"
                    }
                    ae++;
                    if (ae > 11) {
                        ae = 0;
                        aS++
                    }
                    aK += "</tbody></table>" + (aC ? "</div>" + ((av[0] > 0 && ao === av[1] - 1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                    aF += aK
                }
                aO += aF
            }
            aO += a2;
            aV._keyEvent = false;
            return aO
        },
        _generateMonthYearHeader: function (ai, ag, aq, ak, ao, ar, am, ae) {
            var aw, af, ax, au, aj, at, ap, al, ah = this._get(ai, "changeMonth"),
                ay = this._get(ai, "changeYear"),
                az = this._get(ai, "showMonthAfterYear"),
                an = "<div class='ui-datepicker-title'>",
                av = "";
            if (ar || !ah) {
                av += "<span class='ui-datepicker-month'>" + am[ag] + "</span>"
            } else {
                aw = (ak && ak.getFullYear() === aq);
                af = (ao && ao.getFullYear() === aq);
                av += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (ax = 0; ax < 12; ax++) {
                    if ((!aw || ax >= ak.getMonth()) && (!af || ax <= ao.getMonth())) {
                        av += "<option value='" + ax + "'" + (ax === ag ? " selected='selected'" : "") + ">" + ae[ax] + "</option>"
                    }
                }
                av += "</select>"
            }
            if (!az) {
                an += av + (ar || !(ah && ay) ? "&#xa0;" : "")
            }
            if (!ai.yearshtml) {
                ai.yearshtml = "";
                if (ar || !ay) {
                    an += "<span class='ui-datepicker-year'>" + aq + "</span>"
                } else {
                    au = this._get(ai, "yearRange").split(":");
                    aj = new Date().getFullYear();
                    at = function (aB) {
                        var aA = (aB.match(/c[+\-].*/) ? aq + parseInt(aB.substring(1), 10) : (aB.match(/[+\-].*/) ? aj + parseInt(aB, 10) : parseInt(aB, 10)));
                        return (isNaN(aA) ? aj : aA)
                    };
                    ap = at(au[0]);
                    al = Math.max(ap, at(au[1] || ""));
                    ap = (ak ? Math.max(ap, ak.getFullYear()) : ap);
                    al = (ao ? Math.min(al, ao.getFullYear()) : al);
                    ai.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; ap <= al; ap++) {
                        ai.yearshtml += "<option value='" + ap + "'" + (ap === aq ? " selected='selected'" : "") + ">" + ap + "</option>"
                    }
                    ai.yearshtml += "</select>";
                    an += ai.yearshtml;
                    ai.yearshtml = null
                }
            }
            an += this._get(ai, "yearSuffix");
            if (az) {
                an += (ar || !(ah && ay) ? "&#xa0;" : "") + av
            }
            an += "</div>";
            return an
        },
        _adjustInstDate: function (ah, ak, aj) {
            var ag = ah.drawYear + (aj === "Y" ? ak : 0),
                ai = ah.drawMonth + (aj === "M" ? ak : 0),
                ae = Math.min(ah.selectedDay, this._getDaysInMonth(ag, ai)) + (aj === "D" ? ak : 0),
                af = this._restrictMinMax(ah, this._daylightSavingAdjust(new Date(ag, ai, ae)));
            ah.selectedDay = af.getDate();
            ah.drawMonth = ah.selectedMonth = af.getMonth();
            ah.drawYear = ah.selectedYear = af.getFullYear();
            if (aj === "M" || aj === "Y") {
                this._notifyChange(ah)
            }
        },
        _restrictMinMax: function (ah, af) {
            var ag = this._getMinMaxDate(ah, "min"),
                ai = this._getMinMaxDate(ah, "max"),
                ae = (ag && af < ag ? ag : af);
            return (ai && ae > ai ? ai : ae)
        },
        _notifyChange: function (af) {
            var ae = this._get(af, "onChangeMonthYear");
            if (ae) {
                ae.apply((af.input ? af.input[0] : null), [af.selectedYear, af.selectedMonth + 1, af])
            }
        },
        _getNumberOfMonths: function (af) {
            var ae = this._get(af, "numberOfMonths");
            return (ae == null ? [1, 1] : (typeof ae === "number" ? [1, ae] : ae))
        },
        _getMinMaxDate: function (af, ae) {
            return this._determineDate(af, this._get(af, ae + "Date"), null)
        },
        _getDaysInMonth: function (ae, af) {
            return 32 - this._daylightSavingAdjust(new Date(ae, af, 32)).getDate()
        },
        _getFirstDayOfMonth: function (ae, af) {
            return new Date(ae, af, 1).getDay()
        },
        _canAdjustMonth: function (ah, aj, ag, ai) {
            var ae = this._getNumberOfMonths(ah),
                af = this._daylightSavingAdjust(new Date(ag, ai + (aj < 0 ? aj : ae[0] * ae[1]), 1));
            if (aj < 0) {
                af.setDate(this._getDaysInMonth(af.getFullYear(), af.getMonth()))
            }
            return this._isInRange(ah, af)
        },
        _isInRange: function (ai, ag) {
            var af, al, ah = this._getMinMaxDate(ai, "min"),
                ae = this._getMinMaxDate(ai, "max"),
                am = null,
                aj = null,
                ak = this._get(ai, "yearRange");
            if (ak) {
                af = ak.split(":");
                al = new Date().getFullYear();
                am = parseInt(af[0], 10);
                aj = parseInt(af[1], 10);
                if (af[0].match(/[+\-].*/)) {
                    am += al
                }
                if (af[1].match(/[+\-].*/)) {
                    aj += al
                }
            }
            return ((!ah || ag.getTime() >= ah.getTime()) && (!ae || ag.getTime() <= ae.getTime()) && (!am || ag.getFullYear() >= am) && (!aj || ag.getFullYear() <= aj))
        },
        _getFormatConfig: function (ae) {
            var af = this._get(ae, "shortYearCutoff");
            af = (typeof af !== "string" ? af : new Date().getFullYear() % 100 + parseInt(af, 10));
            return {
                shortYearCutoff: af,
                dayNamesShort: this._get(ae, "dayNamesShort"),
                dayNames: this._get(ae, "dayNames"),
                monthNamesShort: this._get(ae, "monthNamesShort"),
                monthNames: this._get(ae, "monthNames")
            }
        },
        _formatDate: function (ah, ae, ai, ag) {
            if (!ae) {
                ah.currentDay = ah.selectedDay;
                ah.currentMonth = ah.selectedMonth;
                ah.currentYear = ah.selectedYear
            }
            var af = (ae ? (typeof ae === "object" ? ae : this._daylightSavingAdjust(new Date(ag, ai, ae))) : this._daylightSavingAdjust(new Date(ah.currentYear, ah.currentMonth, ah.currentDay)));
            return this.formatDate(this._get(ah, "dateFormat"), af, this._getFormatConfig(ah))
        }
    });

    function h(af) {
        var ae = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return af.delegate(ae, "mouseout", function () {
            I(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                I(this).removeClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                I(this).removeClass("ui-datepicker-next-hover")
            }
        }).delegate(ae, "mouseover", p)
    }

    function p() {
        if (!I.datepicker._isDisabledDatepicker(l.inline ? l.dpDiv.parent()[0] : l.input[0])) {
            I(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
            I(this).addClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                I(this).addClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                I(this).addClass("ui-datepicker-next-hover")
            }
        }
    }

    function x(ag, af) {
        I.extend(ag, af);
        for (var ae in af) {
            if (af[ae] == null) {
                ag[ae] = af[ae]
            }
        }
        return ag
    }
    I.fn.datepicker = function (af) {
        if (!this.length) {
            return this
        }
        if (!I.datepicker.initialized) {
            I(document).mousedown(I.datepicker._checkExternalClick);
            I.datepicker.initialized = true
        }
        if (I("#" + I.datepicker._mainDivId).length === 0) {
            I("body").append(I.datepicker.dpDiv)
        }
        var ae = Array.prototype.slice.call(arguments, 1);
        if (typeof af === "string" && (af === "isDisabled" || af === "getDate" || af === "widget")) {
            return I.datepicker["_" + af + "Datepicker"].apply(I.datepicker, [this[0]].concat(ae))
        }
        if (af === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return I.datepicker["_" + af + "Datepicker"].apply(I.datepicker, [this[0]].concat(ae))
        }
        return this.each(function () {
            typeof af === "string" ? I.datepicker["_" + af + "Datepicker"].apply(I.datepicker, [this].concat(ae)) : I.datepicker._attachDatepicker(this, af)
        })
    };
    I.datepicker = new ac();
    I.datepicker.initialized = false;
    I.datepicker.uuid = new Date().getTime();
    I.datepicker.version = "1.11.1";
    var E = I.datepicker;
    /*!
     * jQuery UI Draggable 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/draggable/
     */
    I.widget("ui.draggable", I.ui.mouse, {
        version: "1.11.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable")
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled")
            }
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function (ae, af) {
            this._super(ae, af);
            if (ae === "handle") {
                this._removeHandleClassName();
                this._setHandleClassName()
            }
        },
        _destroy: function () {
            if ((this.helper || this.element).is(".ui-draggable-dragging")) {
                this.destroyOnClear = true;
                return
            }
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._removeHandleClassName();
            this._mouseDestroy()
        },
        _mouseCapture: function (ag) {
            var ae = this.document[0],
                ah = this.options;
            try {
                if (ae.activeElement && ae.activeElement.nodeName.toLowerCase() !== "body") {
                    I(ae.activeElement).blur()
                }
            } catch (af) {}
            if (this.helper || ah.disabled || I(ag.target).closest(".ui-resizable-handle").length > 0) {
                return false
            }
            this.handle = this._getHandle(ag);
            if (!this.handle) {
                return false
            }
            I(ah.iframeFix === true ? "iframe" : ah.iframeFix).each(function () {
                I("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(I(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function (ae) {
            var af = this.options;
            this.helper = this._createHelper(ae);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if (I.ui.ddmanager) {
                I.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent(true);
            this.offsetParent = this.helper.offsetParent();
            this.offsetParentCssPosition = this.offsetParent.css("position");
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.offset.scroll = false;
            I.extend(this.offset, {
                click: {
                    left: ae.pageX - this.offset.left,
                    top: ae.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(ae, false);
            this.originalPageX = ae.pageX;
            this.originalPageY = ae.pageY;
            (af.cursorAt && this._adjustOffsetFromHelper(af.cursorAt));
            this._setContainment();
            if (this._trigger("start", ae) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (I.ui.ddmanager && !af.dropBehaviour) {
                I.ui.ddmanager.prepareOffsets(this, ae)
            }
            this._mouseDrag(ae, true);
            if (I.ui.ddmanager) {
                I.ui.ddmanager.dragStart(this, ae)
            }
            return true
        },
        _mouseDrag: function (ae, ag) {
            if (this.offsetParentCssPosition === "fixed") {
                this.offset.parent = this._getParentOffset()
            }
            this.position = this._generatePosition(ae, true);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!ag) {
                var af = this._uiHash();
                if (this._trigger("drag", ae, af) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = af.position
            }
            this.helper[0].style.left = this.position.left + "px";
            this.helper[0].style.top = this.position.top + "px";
            if (I.ui.ddmanager) {
                I.ui.ddmanager.drag(this, ae)
            }
            return false
        },
        _mouseStop: function (af) {
            var ae = this,
                ag = false;
            if (I.ui.ddmanager && !this.options.dropBehaviour) {
                ag = I.ui.ddmanager.drop(this, af)
            }
            if (this.dropped) {
                ag = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert === "invalid" && !ag) || (this.options.revert === "valid" && ag) || this.options.revert === true || (I.isFunction(this.options.revert) && this.options.revert.call(this.element, ag))) {
                I(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    if (ae._trigger("stop", af) !== false) {
                        ae._clear()
                    }
                })
            } else {
                if (this._trigger("stop", af) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function (ae) {
            I("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            });
            if (I.ui.ddmanager) {
                I.ui.ddmanager.dragStop(this, ae)
            }
            this.element.focus();
            return I.ui.mouse.prototype._mouseUp.call(this, ae)
        },
        cancel: function () {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function (ae) {
            return this.options.handle ? !!I(ae.target).closest(this.element.find(this.options.handle)).length : true
        },
        _setHandleClassName: function () {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
            this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function () {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function (af) {
            var ag = this.options,
                ae = I.isFunction(ag.helper) ? I(ag.helper.apply(this.element[0], [af])) : (ag.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!ae.parents("body").length) {
                ae.appendTo((ag.appendTo === "parent" ? this.element[0].parentNode : ag.appendTo))
            }
            if (ae[0] !== this.element[0] && !(/(fixed|absolute)/).test(ae.css("position"))) {
                ae.css("position", "absolute")
            }
            return ae
        },
        _adjustOffsetFromHelper: function (ae) {
            if (typeof ae === "string") {
                ae = ae.split(" ")
            }
            if (I.isArray(ae)) {
                ae = {
                    left: +ae[0],
                    top: +ae[1] || 0
                }
            }
            if ("left" in ae) {
                this.offset.click.left = ae.left + this.margins.left
            }
            if ("right" in ae) {
                this.offset.click.left = this.helperProportions.width - ae.right + this.margins.left
            }
            if ("top" in ae) {
                this.offset.click.top = ae.top + this.margins.top
            }
            if ("bottom" in ae) {
                this.offset.click.top = this.helperProportions.height - ae.bottom + this.margins.top
            }
        },
        _isRootNode: function (ae) {
            return (/(html|body)/i).test(ae.tagName) || ae === this.document[0]
        },
        _getParentOffset: function () {
            var af = this.offsetParent.offset(),
                ae = this.document[0];
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== ae && I.contains(this.scrollParent[0], this.offsetParent[0])) {
                af.left += this.scrollParent.scrollLeft();
                af.top += this.scrollParent.scrollTop()
            }
            if (this._isRootNode(this.offsetParent[0])) {
                af = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: af.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: af.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition !== "relative") {
                return {
                    top: 0,
                    left: 0
                }
            }
            var ae = this.element.position(),
                af = this._isRootNode(this.scrollParent[0]);
            return {
                top: ae.top - (parseInt(this.helper.css("top"), 10) || 0) + (!af ? this.scrollParent.scrollTop() : 0),
                left: ae.left - (parseInt(this.helper.css("left"), 10) || 0) + (!af ? this.scrollParent.scrollLeft() : 0)
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var ag, ai, af, ah = this.options,
                ae = this.document[0];
            this.relativeContainer = null;
            if (!ah.containment) {
                this.containment = null;
                return
            }
            if (ah.containment === "window") {
                this.containment = [I(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, I(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, I(window).scrollLeft() + I(window).width() - this.helperProportions.width - this.margins.left, I(window).scrollTop() + (I(window).height() || ae.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (ah.containment === "document") {
                this.containment = [0, 0, I(ae).width() - this.helperProportions.width - this.margins.left, (I(ae).height() || ae.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (ah.containment.constructor === Array) {
                this.containment = ah.containment;
                return
            }
            if (ah.containment === "parent") {
                ah.containment = this.helper[0].parentNode
            }
            ai = I(ah.containment);
            af = ai[0];
            if (!af) {
                return
            }
            ag = ai.css("overflow") !== "hidden";
            this.containment = [(parseInt(ai.css("borderLeftWidth"), 10) || 0) + (parseInt(ai.css("paddingLeft"), 10) || 0), (parseInt(ai.css("borderTopWidth"), 10) || 0) + (parseInt(ai.css("paddingTop"), 10) || 0), (ag ? Math.max(af.scrollWidth, af.offsetWidth) : af.offsetWidth) - (parseInt(ai.css("borderRightWidth"), 10) || 0) - (parseInt(ai.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (ag ? Math.max(af.scrollHeight, af.offsetHeight) : af.offsetHeight) - (parseInt(ai.css("borderBottomWidth"), 10) || 0) - (parseInt(ai.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
            this.relativeContainer = ai
        },
        _convertPositionTo: function (af, ah) {
            if (!ah) {
                ah = this.position
            }
            var ae = af === "absolute" ? 1 : -1,
                ag = this._isRootNode(this.scrollParent[0]);
            return {
                top: (ah.top + this.offset.relative.top * ae + this.offset.parent.top * ae - ((this.cssPosition === "fixed" ? -this.offset.scroll.top : (ag ? 0 : this.offset.scroll.top)) * ae)),
                left: (ah.left + this.offset.relative.left * ae + this.offset.parent.left * ae - ((this.cssPosition === "fixed" ? -this.offset.scroll.left : (ag ? 0 : this.offset.scroll.left)) * ae))
            }
        },
        _generatePosition: function (af, al) {
            var ae, am, an, ah, ag = this.options,
                ak = this._isRootNode(this.scrollParent[0]),
                aj = af.pageX,
                ai = af.pageY;
            if (!ak || !this.offset.scroll) {
                this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }
            }
            if (al) {
                if (this.containment) {
                    if (this.relativeContainer) {
                        am = this.relativeContainer.offset();
                        ae = [this.containment[0] + am.left, this.containment[1] + am.top, this.containment[2] + am.left, this.containment[3] + am.top]
                    } else {
                        ae = this.containment
                    }
                    if (af.pageX - this.offset.click.left < ae[0]) {
                        aj = ae[0] + this.offset.click.left
                    }
                    if (af.pageY - this.offset.click.top < ae[1]) {
                        ai = ae[1] + this.offset.click.top
                    }
                    if (af.pageX - this.offset.click.left > ae[2]) {
                        aj = ae[2] + this.offset.click.left
                    }
                    if (af.pageY - this.offset.click.top > ae[3]) {
                        ai = ae[3] + this.offset.click.top
                    }
                }
                if (ag.grid) {
                    an = ag.grid[1] ? this.originalPageY + Math.round((ai - this.originalPageY) / ag.grid[1]) * ag.grid[1] : this.originalPageY;
                    ai = ae ? ((an - this.offset.click.top >= ae[1] || an - this.offset.click.top > ae[3]) ? an : ((an - this.offset.click.top >= ae[1]) ? an - ag.grid[1] : an + ag.grid[1])) : an;
                    ah = ag.grid[0] ? this.originalPageX + Math.round((aj - this.originalPageX) / ag.grid[0]) * ag.grid[0] : this.originalPageX;
                    aj = ae ? ((ah - this.offset.click.left >= ae[0] || ah - this.offset.click.left > ae[2]) ? ah : ((ah - this.offset.click.left >= ae[0]) ? ah - ag.grid[0] : ah + ag.grid[0])) : ah
                }
                if (ag.axis === "y") {
                    aj = this.originalPageX
                }
                if (ag.axis === "x") {
                    ai = this.originalPageY
                }
            }
            return {
                top: (ai - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : (ak ? 0 : this.offset.scroll.top))),
                left: (aj - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : (ak ? 0 : this.offset.scroll.left)))
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false;
            if (this.destroyOnClear) {
                this.destroy()
            }
        },
        _trigger: function (ae, af, ag) {
            ag = ag || this._uiHash();
            I.ui.plugin.call(this, ae, [af, ag, this], true);
            if (ae === "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return I.Widget.prototype._trigger.call(this, ae, af, ag)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    I.ui.plugin.add("draggable", "connectToSortable", {
        start: function (af, ah, ag) {
            var ai = ag.options,
                ae = I.extend({}, ah, {
                    item: ag.element
                });
            ag.sortables = [];
            I(ai.connectToSortable).each(function () {
                var aj = I(this).sortable("instance");
                if (aj && !aj.options.disabled) {
                    ag.sortables.push({
                        instance: aj,
                        shouldRevert: aj.options.revert
                    });
                    aj.refreshPositions();
                    aj._trigger("activate", af, ae)
                }
            })
        },
        stop: function (af, ah, ag) {
            var ae = I.extend({}, ah, {
                item: ag.element
            });
            I.each(ag.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    ag.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = this.shouldRevert
                    }
                    this.instance._mouseStop(af);
                    this.instance.options.helper = this.instance.options._helper;
                    if (ag.options.helper === "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", af, ae)
                }
            })
        },
        drag: function (af, ah, ag) {
            var ae = this;
            I.each(ag.sortables, function () {
                var ai = false,
                    aj = this;
                this.instance.positionAbs = ag.positionAbs;
                this.instance.helperProportions = ag.helperProportions;
                this.instance.offset.click = ag.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    ai = true;
                    I.each(ag.sortables, function () {
                        this.instance.positionAbs = ag.positionAbs;
                        this.instance.helperProportions = ag.helperProportions;
                        this.instance.offset.click = ag.offset.click;
                        if (this !== aj && this.instance._intersectsWith(this.instance.containerCache) && I.contains(aj.instance.element[0], this.instance.element[0])) {
                            ai = false
                        }
                        return ai
                    })
                }
                if (ai) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = I(ae).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return ah.helper[0]
                        };
                        af.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(af, true);
                        this.instance._mouseStart(af, true, true);
                        this.instance.offset.click.top = ag.offset.click.top;
                        this.instance.offset.click.left = ag.offset.click.left;
                        this.instance.offset.parent.left -= ag.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= ag.offset.parent.top - this.instance.offset.parent.top;
                        ag._trigger("toSortable", af);
                        ag.dropped = this.instance.element;
                        ag.currentItem = ag.element;
                        this.instance.fromOutside = ag
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(af)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", af, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(af, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        ag._trigger("fromSortable", af);
                        ag.dropped = false
                    }
                }
            })
        }
    });
    I.ui.plugin.add("draggable", "cursor", {
        start: function (ag, ah, ae) {
            var af = I("body"),
                ai = ae.options;
            if (af.css("cursor")) {
                ai._cursor = af.css("cursor")
            }
            af.css("cursor", ai.cursor)
        },
        stop: function (af, ag, ae) {
            var ah = ae.options;
            if (ah._cursor) {
                I("body").css("cursor", ah._cursor)
            }
        }
    });
    I.ui.plugin.add("draggable", "opacity", {
        start: function (ag, ah, ae) {
            var af = I(ah.helper),
                ai = ae.options;
            if (af.css("opacity")) {
                ai._opacity = af.css("opacity")
            }
            af.css("opacity", ai.opacity)
        },
        stop: function (af, ag, ae) {
            var ah = ae.options;
            if (ah._opacity) {
                I(ag.helper).css("opacity", ah._opacity)
            }
        }
    });
    I.ui.plugin.add("draggable", "scroll", {
        start: function (af, ag, ae) {
            if (!ae.scrollParentNotHidden) {
                ae.scrollParentNotHidden = ae.helper.scrollParent(false)
            }
            if (ae.scrollParentNotHidden[0] !== ae.document[0] && ae.scrollParentNotHidden[0].tagName !== "HTML") {
                ae.overflowOffset = ae.scrollParentNotHidden.offset()
            }
        },
        drag: function (ah, ai, ag) {
            var aj = ag.options,
                af = false,
                ak = ag.scrollParentNotHidden[0],
                ae = ag.document[0];
            if (ak !== ae && ak.tagName !== "HTML") {
                if (!aj.axis || aj.axis !== "x") {
                    if ((ag.overflowOffset.top + ak.offsetHeight) - ah.pageY < aj.scrollSensitivity) {
                        ak.scrollTop = af = ak.scrollTop + aj.scrollSpeed
                    } else {
                        if (ah.pageY - ag.overflowOffset.top < aj.scrollSensitivity) {
                            ak.scrollTop = af = ak.scrollTop - aj.scrollSpeed
                        }
                    }
                }
                if (!aj.axis || aj.axis !== "y") {
                    if ((ag.overflowOffset.left + ak.offsetWidth) - ah.pageX < aj.scrollSensitivity) {
                        ak.scrollLeft = af = ak.scrollLeft + aj.scrollSpeed
                    } else {
                        if (ah.pageX - ag.overflowOffset.left < aj.scrollSensitivity) {
                            ak.scrollLeft = af = ak.scrollLeft - aj.scrollSpeed
                        }
                    }
                }
            } else {
                if (!aj.axis || aj.axis !== "x") {
                    if (ah.pageY - I(ae).scrollTop() < aj.scrollSensitivity) {
                        af = I(ae).scrollTop(I(ae).scrollTop() - aj.scrollSpeed)
                    } else {
                        if (I(window).height() - (ah.pageY - I(ae).scrollTop()) < aj.scrollSensitivity) {
                            af = I(ae).scrollTop(I(ae).scrollTop() + aj.scrollSpeed)
                        }
                    }
                }
                if (!aj.axis || aj.axis !== "y") {
                    if (ah.pageX - I(ae).scrollLeft() < aj.scrollSensitivity) {
                        af = I(ae).scrollLeft(I(ae).scrollLeft() - aj.scrollSpeed)
                    } else {
                        if (I(window).width() - (ah.pageX - I(ae).scrollLeft()) < aj.scrollSensitivity) {
                            af = I(ae).scrollLeft(I(ae).scrollLeft() + aj.scrollSpeed)
                        }
                    }
                }
            }
            if (af !== false && I.ui.ddmanager && !aj.dropBehaviour) {
                I.ui.ddmanager.prepareOffsets(ag, ah)
            }
        }
    });
    I.ui.plugin.add("draggable", "snap", {
        start: function (af, ag, ae) {
            var ah = ae.options;
            ae.snapElements = [];
            I(ah.snap.constructor !== String ? (ah.snap.items || ":data(ui-draggable)") : ah.snap).each(function () {
                var aj = I(this),
                    ai = aj.offset();
                if (this !== ae.element[0]) {
                    ae.snapElements.push({
                        item: this,
                        width: aj.outerWidth(),
                        height: aj.outerHeight(),
                        top: ai.top,
                        left: ai.left
                    })
                }
            })
        },
        drag: function (aq, an, ah) {
            var ae, aw, aj, ak, ap, am, al, ax, ar, ai, ao = ah.options,
                av = ao.snapTolerance,
                au = an.offset.left,
                at = au + ah.helperProportions.width,
                ag = an.offset.top,
                af = ag + ah.helperProportions.height;
            for (ar = ah.snapElements.length - 1; ar >= 0; ar--) {
                ap = ah.snapElements[ar].left;
                am = ap + ah.snapElements[ar].width;
                al = ah.snapElements[ar].top;
                ax = al + ah.snapElements[ar].height;
                if (at < ap - av || au > am + av || af < al - av || ag > ax + av || !I.contains(ah.snapElements[ar].item.ownerDocument, ah.snapElements[ar].item)) {
                    if (ah.snapElements[ar].snapping) {
                        (ah.options.snap.release && ah.options.snap.release.call(ah.element, aq, I.extend(ah._uiHash(), {
                            snapItem: ah.snapElements[ar].item
                        })))
                    }
                    ah.snapElements[ar].snapping = false;
                    continue
                }
                if (ao.snapMode !== "inner") {
                    ae = Math.abs(al - af) <= av;
                    aw = Math.abs(ax - ag) <= av;
                    aj = Math.abs(ap - at) <= av;
                    ak = Math.abs(am - au) <= av;
                    if (ae) {
                        an.position.top = ah._convertPositionTo("relative", {
                            top: al - ah.helperProportions.height,
                            left: 0
                        }).top - ah.margins.top
                    }
                    if (aw) {
                        an.position.top = ah._convertPositionTo("relative", {
                            top: ax,
                            left: 0
                        }).top - ah.margins.top
                    }
                    if (aj) {
                        an.position.left = ah._convertPositionTo("relative", {
                            top: 0,
                            left: ap - ah.helperProportions.width
                        }).left - ah.margins.left
                    }
                    if (ak) {
                        an.position.left = ah._convertPositionTo("relative", {
                            top: 0,
                            left: am
                        }).left - ah.margins.left
                    }
                }
                ai = (ae || aw || aj || ak);
                if (ao.snapMode !== "outer") {
                    ae = Math.abs(al - ag) <= av;
                    aw = Math.abs(ax - af) <= av;
                    aj = Math.abs(ap - au) <= av;
                    ak = Math.abs(am - at) <= av;
                    if (ae) {
                        an.position.top = ah._convertPositionTo("relative", {
                            top: al,
                            left: 0
                        }).top - ah.margins.top
                    }
                    if (aw) {
                        an.position.top = ah._convertPositionTo("relative", {
                            top: ax - ah.helperProportions.height,
                            left: 0
                        }).top - ah.margins.top
                    }
                    if (aj) {
                        an.position.left = ah._convertPositionTo("relative", {
                            top: 0,
                            left: ap
                        }).left - ah.margins.left
                    }
                    if (ak) {
                        an.position.left = ah._convertPositionTo("relative", {
                            top: 0,
                            left: am - ah.helperProportions.width
                        }).left - ah.margins.left
                    }
                }
                if (!ah.snapElements[ar].snapping && (ae || aw || aj || ak || ai)) {
                    (ah.options.snap.snap && ah.options.snap.snap.call(ah.element, aq, I.extend(ah._uiHash(), {
                        snapItem: ah.snapElements[ar].item
                    })))
                }
                ah.snapElements[ar].snapping = (ae || aw || aj || ak || ai)
            }
        }
    });
    I.ui.plugin.add("draggable", "stack", {
        start: function (ag, ah, ae) {
            var af, aj = ae.options,
                ai = I.makeArray(I(aj.stack)).sort(function (al, ak) {
                    return (parseInt(I(al).css("zIndex"), 10) || 0) - (parseInt(I(ak).css("zIndex"), 10) || 0)
                });
            if (!ai.length) {
                return
            }
            af = parseInt(I(ai[0]).css("zIndex"), 10) || 0;
            I(ai).each(function (ak) {
                I(this).css("zIndex", af + ak)
            });
            this.css("zIndex", (af + ai.length))
        }
    });
    I.ui.plugin.add("draggable", "zIndex", {
        start: function (ag, ah, ae) {
            var af = I(ah.helper),
                ai = ae.options;
            if (af.css("zIndex")) {
                ai._zIndex = af.css("zIndex")
            }
            af.css("zIndex", ai.zIndex)
        },
        stop: function (af, ag, ae) {
            var ah = ae.options;
            if (ah._zIndex) {
                I(ag.helper).css("zIndex", ah._zIndex)
            }
        }
    });
    var X = I.ui.draggable;
    /*!
     * jQuery UI Resizable 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/resizable/
     */
    I.widget("ui.resizable", I.ui.mouse, {
        version: "1.11.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function (ae) {
            return parseInt(ae, 10) || 0
        },
        _isNumber: function (ae) {
            return !isNaN(parseInt(ae, 10))
        },
        _hasScroll: function (ah, af) {
            if (I(ah).css("overflow") === "hidden") {
                return false
            }
            var ae = (af && af === "left") ? "scrollLeft" : "scrollTop",
                ag = false;
            if (ah[ae] > 0) {
                return true
            }
            ah[ae] = 1;
            ag = (ah[ae] > 0);
            ah[ae] = 0;
            return ag
        },
        _create: function () {
            var ak, af, ai, ag, ae, ah = this,
                aj = this.options;
            this.element.addClass("ui-resizable");
            I.extend(this, {
                _aspectRatio: !!(aj.aspectRatio),
                aspectRatio: aj.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: aj.helper || aj.ghost || aj.animate ? aj.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap(I("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = aj.handles || (!I(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                ak = this.handles.split(",");
                this.handles = {};
                for (af = 0; af < ak.length; af++) {
                    ai = I.trim(ak[af]);
                    ae = "ui-resizable-" + ai;
                    ag = I("<div class='ui-resizable-handle " + ae + "'></div>");
                    ag.css({
                        zIndex: aj.zIndex
                    });
                    if ("se" === ai) {
                        ag.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[ai] = ".ui-resizable-" + ai;
                    this.element.append(ag)
                }
            }
            this._renderAxis = function (ap) {
                var am, an, al, ao;
                ap = ap || this.element;
                for (am in this.handles) {
                    if (this.handles[am].constructor === String) {
                        this.handles[am] = this.element.children(this.handles[am]).first().show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        an = I(this.handles[am], this.element);
                        ao = /sw|ne|nw|se|n|s/.test(am) ? an.outerHeight() : an.outerWidth();
                        al = ["padding", /ne|nw|n/.test(am) ? "Top" : /se|sw|s/.test(am) ? "Bottom" : /^e$/.test(am) ? "Right" : "Left"].join("");
                        ap.css(al, ao);
                        this._proportionallyResize()
                    }
                    if (!I(this.handles[am]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = I(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!ah.resizing) {
                    if (this.className) {
                        ag = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    ah.axis = ag && ag[1] ? ag[1] : "se"
                }
            });
            if (aj.autoHide) {
                this._handles.hide();
                I(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                    if (aj.disabled) {
                        return
                    }
                    I(this).removeClass("ui-resizable-autohide");
                    ah._handles.show()
                }).mouseleave(function () {
                    if (aj.disabled) {
                        return
                    }
                    if (!ah.resizing) {
                        I(this).addClass("ui-resizable-autohide");
                        ah._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var af, ae = function (ag) {
                I(ag).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                ae(this.element);
                af = this.element;
                this.originalElement.css({
                    position: af.css("position"),
                    width: af.outerWidth(),
                    height: af.outerHeight(),
                    top: af.css("top"),
                    left: af.css("left")
                }).insertAfter(af);
                af.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            ae(this.originalElement);
            return this
        },
        _mouseCapture: function (ag) {
            var af, ah, ae = false;
            for (af in this.handles) {
                ah = I(this.handles[af])[0];
                if (ah === ag.target || I.contains(ah, ag.target)) {
                    ae = true
                }
            }
            return !this.options.disabled && ae
        },
        _mouseStart: function (af) {
            var aj, ag, ai, ah = this.options,
                ae = this.element;
            this.resizing = true;
            this._renderProxy();
            aj = this._num(this.helper.css("left"));
            ag = this._num(this.helper.css("top"));
            if (ah.containment) {
                aj += I(ah.containment).scrollLeft() || 0;
                ag += I(ah.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: aj,
                top: ag
            };
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: ae.width(),
                height: ae.height()
            };
            this.originalSize = this._helper ? {
                width: ae.outerWidth(),
                height: ae.outerHeight()
            } : {
                width: ae.width(),
                height: ae.height()
            };
            this.sizeDiff = {
                width: ae.outerWidth() - ae.width(),
                height: ae.outerHeight() - ae.height()
            };
            this.originalPosition = {
                left: aj,
                top: ag
            };
            this.originalMousePosition = {
                left: af.pageX,
                top: af.pageY
            };
            this.aspectRatio = (typeof ah.aspectRatio === "number") ? ah.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            ai = I(".ui-resizable-" + this.axis).css("cursor");
            I("body").css("cursor", ai === "auto" ? this.axis + "-resize" : ai);
            ae.addClass("ui-resizable-resizing");
            this._propagate("start", af);
            return true
        },
        _mouseDrag: function (aj) {
            var ak, ai, al = this.originalMousePosition,
                af = this.axis,
                ag = (aj.pageX - al.left) || 0,
                ae = (aj.pageY - al.top) || 0,
                ah = this._change[af];
            this._updatePrevProperties();
            if (!ah) {
                return false
            }
            ak = ah.apply(this, [aj, ag, ae]);
            this._updateVirtualBoundaries(aj.shiftKey);
            if (this._aspectRatio || aj.shiftKey) {
                ak = this._updateRatio(ak, aj)
            }
            ak = this._respectSize(ak, aj);
            this._updateCache(ak);
            this._propagate("resize", aj);
            ai = this._applyChanges();
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!I.isEmptyObject(ai)) {
                this._updatePrevProperties();
                this._trigger("resize", aj, this.ui());
                this._applyChanges()
            }
            return false
        },
        _mouseStop: function (ah) {
            this.resizing = false;
            var ag, ae, af, ak, an, aj, am, ai = this.options,
                al = this;
            if (this._helper) {
                ag = this._proportionallyResizeElements;
                ae = ag.length && (/textarea/i).test(ag[0].nodeName);
                af = ae && this._hasScroll(ag[0], "left") ? 0 : al.sizeDiff.height;
                ak = ae ? 0 : al.sizeDiff.width;
                an = {
                    width: (al.helper.width() - ak),
                    height: (al.helper.height() - af)
                };
                aj = (parseInt(al.element.css("left"), 10) + (al.position.left - al.originalPosition.left)) || null;
                am = (parseInt(al.element.css("top"), 10) + (al.position.top - al.originalPosition.top)) || null;
                if (!ai.animate) {
                    this.element.css(I.extend(an, {
                        top: am,
                        left: aj
                    }))
                }
                al.helper.height(al.size.height);
                al.helper.width(al.size.width);
                if (this._helper && !ai.animate) {
                    this._proportionallyResize()
                }
            }
            I("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", ah);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updatePrevProperties: function () {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function () {
            var ae = {};
            if (this.position.top !== this.prevPosition.top) {
                ae.top = this.position.top + "px"
            }
            if (this.position.left !== this.prevPosition.left) {
                ae.left = this.position.left + "px"
            }
            if (this.size.width !== this.prevSize.width) {
                ae.width = this.size.width + "px"
            }
            if (this.size.height !== this.prevSize.height) {
                ae.height = this.size.height + "px"
            }
            this.helper.css(ae);
            return ae
        },
        _updateVirtualBoundaries: function (ag) {
            var ai, ah, af, ak, ae, aj = this.options;
            ae = {
                minWidth: this._isNumber(aj.minWidth) ? aj.minWidth : 0,
                maxWidth: this._isNumber(aj.maxWidth) ? aj.maxWidth : Infinity,
                minHeight: this._isNumber(aj.minHeight) ? aj.minHeight : 0,
                maxHeight: this._isNumber(aj.maxHeight) ? aj.maxHeight : Infinity
            };
            if (this._aspectRatio || ag) {
                ai = ae.minHeight * this.aspectRatio;
                af = ae.minWidth / this.aspectRatio;
                ah = ae.maxHeight * this.aspectRatio;
                ak = ae.maxWidth / this.aspectRatio;
                if (ai > ae.minWidth) {
                    ae.minWidth = ai
                }
                if (af > ae.minHeight) {
                    ae.minHeight = af
                }
                if (ah < ae.maxWidth) {
                    ae.maxWidth = ah
                }
                if (ak < ae.maxHeight) {
                    ae.maxHeight = ak
                }
            }
            this._vBoundaries = ae
        },
        _updateCache: function (ae) {
            this.offset = this.helper.offset();
            if (this._isNumber(ae.left)) {
                this.position.left = ae.left
            }
            if (this._isNumber(ae.top)) {
                this.position.top = ae.top
            }
            if (this._isNumber(ae.height)) {
                this.size.height = ae.height
            }
            if (this._isNumber(ae.width)) {
                this.size.width = ae.width
            }
        },
        _updateRatio: function (ag) {
            var ah = this.position,
                af = this.size,
                ae = this.axis;
            if (this._isNumber(ag.height)) {
                ag.width = (ag.height * this.aspectRatio)
            } else {
                if (this._isNumber(ag.width)) {
                    ag.height = (ag.width / this.aspectRatio)
                }
            }
            if (ae === "sw") {
                ag.left = ah.left + (af.width - ag.width);
                ag.top = null
            }
            if (ae === "nw") {
                ag.top = ah.top + (af.height - ag.height);
                ag.left = ah.left + (af.width - ag.width)
            }
            return ag
        },
        _respectSize: function (aj) {
            var ag = this._vBoundaries,
                am = this.axis,
                ao = this._isNumber(aj.width) && ag.maxWidth && (ag.maxWidth < aj.width),
                ak = this._isNumber(aj.height) && ag.maxHeight && (ag.maxHeight < aj.height),
                ah = this._isNumber(aj.width) && ag.minWidth && (ag.minWidth > aj.width),
                an = this._isNumber(aj.height) && ag.minHeight && (ag.minHeight > aj.height),
                af = this.originalPosition.left + this.originalSize.width,
                al = this.position.top + this.size.height,
                ai = /sw|nw|w/.test(am),
                ae = /nw|ne|n/.test(am);
            if (ah) {
                aj.width = ag.minWidth
            }
            if (an) {
                aj.height = ag.minHeight
            }
            if (ao) {
                aj.width = ag.maxWidth
            }
            if (ak) {
                aj.height = ag.maxHeight
            }
            if (ah && ai) {
                aj.left = af - ag.minWidth
            }
            if (ao && ai) {
                aj.left = af - ag.maxWidth
            }
            if (an && ae) {
                aj.top = al - ag.minHeight
            }
            if (ak && ae) {
                aj.top = al - ag.maxHeight
            }
            if (!aj.width && !aj.height && !aj.left && aj.top) {
                aj.top = null
            } else {
                if (!aj.width && !aj.height && !aj.top && aj.left) {
                    aj.left = null
                }
            }
            return aj
        },
        _getPaddingPlusBorderDimensions: function (ag) {
            var af = 0,
                ah = [],
                ai = [ag.css("borderTopWidth"), ag.css("borderRightWidth"), ag.css("borderBottomWidth"), ag.css("borderLeftWidth")],
                ae = [ag.css("paddingTop"), ag.css("paddingRight"), ag.css("paddingBottom"), ag.css("paddingLeft")];
            for (; af < 4; af++) {
                ah[af] = (parseInt(ai[af], 10) || 0);
                ah[af] += (parseInt(ae[af], 10) || 0)
            }
            return {
                height: ah[0] + ah[2],
                width: ah[1] + ah[3]
            }
        },
        _proportionallyResize: function () {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var ag, af = 0,
                ae = this.helper || this.element;
            for (; af < this._proportionallyResizeElements.length; af++) {
                ag = this._proportionallyResizeElements[af];
                if (!this.outerDimensions) {
                    this.outerDimensions = this._getPaddingPlusBorderDimensions(ag)
                }
                ag.css({
                    height: (ae.height() - this.outerDimensions.height) || 0,
                    width: (ae.width() - this.outerDimensions.width) || 0
                })
            }
        },
        _renderProxy: function () {
            var ae = this.element,
                af = this.options;
            this.elementOffset = ae.offset();
            if (this._helper) {
                this.helper = this.helper || I("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++af.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function (af, ae) {
                return {
                    width: this.originalSize.width + ae
                }
            },
            w: function (ag, ae) {
                var af = this.originalSize,
                    ah = this.originalPosition;
                return {
                    left: ah.left + ae,
                    width: af.width - ae
                }
            },
            n: function (ah, af, ae) {
                var ag = this.originalSize,
                    ai = this.originalPosition;
                return {
                    top: ai.top + ae,
                    height: ag.height - ae
                }
            },
            s: function (ag, af, ae) {
                return {
                    height: this.originalSize.height + ae
                }
            },
            se: function (ag, af, ae) {
                return I.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ag, af, ae]))
            },
            sw: function (ag, af, ae) {
                return I.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ag, af, ae]))
            },
            ne: function (ag, af, ae) {
                return I.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ag, af, ae]))
            },
            nw: function (ag, af, ae) {
                return I.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ag, af, ae]))
            }
        },
        _propagate: function (af, ae) {
            I.ui.plugin.call(this, af, [ae, this.ui()]);
            (af !== "resize" && this._trigger(af, ae, this.ui()))
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    I.ui.plugin.add("resizable", "animate", {
        stop: function (ah) {
            var am = I(this).resizable("instance"),
                aj = am.options,
                ag = am._proportionallyResizeElements,
                ae = ag.length && (/textarea/i).test(ag[0].nodeName),
                af = ae && am._hasScroll(ag[0], "left") ? 0 : am.sizeDiff.height,
                al = ae ? 0 : am.sizeDiff.width,
                ai = {
                    width: (am.size.width - al),
                    height: (am.size.height - af)
                },
                ak = (parseInt(am.element.css("left"), 10) + (am.position.left - am.originalPosition.left)) || null,
                an = (parseInt(am.element.css("top"), 10) + (am.position.top - am.originalPosition.top)) || null;
            am.element.animate(I.extend(ai, an && ak ? {
                top: an,
                left: ak
            } : {}), {
                duration: aj.animateDuration,
                easing: aj.animateEasing,
                step: function () {
                    var ao = {
                        width: parseInt(am.element.css("width"), 10),
                        height: parseInt(am.element.css("height"), 10),
                        top: parseInt(am.element.css("top"), 10),
                        left: parseInt(am.element.css("left"), 10)
                    };
                    if (ag && ag.length) {
                        I(ag[0]).css({
                            width: ao.width,
                            height: ao.height
                        })
                    }
                    am._updateCache(ao);
                    am._propagate("resize", ah)
                }
            })
        }
    });
    I.ui.plugin.add("resizable", "containment", {
        start: function () {
            var am, ag, ao, ae, al, ah, ap, an = I(this).resizable("instance"),
                ak = an.options,
                aj = an.element,
                af = ak.containment,
                ai = (af instanceof I) ? af.get(0) : (/parent/.test(af)) ? aj.parent().get(0) : af;
            if (!ai) {
                return
            }
            an.containerElement = I(ai);
            if (/document/.test(af) || af === document) {
                an.containerOffset = {
                    left: 0,
                    top: 0
                };
                an.containerPosition = {
                    left: 0,
                    top: 0
                };
                an.parentData = {
                    element: I(document),
                    left: 0,
                    top: 0,
                    width: I(document).width(),
                    height: I(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                am = I(ai);
                ag = [];
                I(["Top", "Right", "Left", "Bottom"]).each(function (ar, aq) {
                    ag[ar] = an._num(am.css("padding" + aq))
                });
                an.containerOffset = am.offset();
                an.containerPosition = am.position();
                an.containerSize = {
                    height: (am.innerHeight() - ag[3]),
                    width: (am.innerWidth() - ag[1])
                };
                ao = an.containerOffset;
                ae = an.containerSize.height;
                al = an.containerSize.width;
                ah = (an._hasScroll(ai, "left") ? ai.scrollWidth : al);
                ap = (an._hasScroll(ai) ? ai.scrollHeight : ae);
                an.parentData = {
                    element: ai,
                    left: ao.left,
                    top: ao.top,
                    width: ah,
                    height: ap
                }
            }
        },
        resize: function (af) {
            var al, aq, ak, ai, am = I(this).resizable("instance"),
                ah = am.options,
                ao = am.containerOffset,
                an = am.position,
                ap = am._aspectRatio || af.shiftKey,
                ae = {
                    top: 0,
                    left: 0
                },
                ag = am.containerElement,
                aj = true;
            if (ag[0] !== document && (/static/).test(ag.css("position"))) {
                ae = ao
            }
            if (an.left < (am._helper ? ao.left : 0)) {
                am.size.width = am.size.width + (am._helper ? (am.position.left - ao.left) : (am.position.left - ae.left));
                if (ap) {
                    am.size.height = am.size.width / am.aspectRatio;
                    aj = false
                }
                am.position.left = ah.helper ? ao.left : 0
            }
            if (an.top < (am._helper ? ao.top : 0)) {
                am.size.height = am.size.height + (am._helper ? (am.position.top - ao.top) : am.position.top);
                if (ap) {
                    am.size.width = am.size.height * am.aspectRatio;
                    aj = false
                }
                am.position.top = am._helper ? ao.top : 0
            }
            ak = am.containerElement.get(0) === am.element.parent().get(0);
            ai = /relative|absolute/.test(am.containerElement.css("position"));
            if (ak && ai) {
                am.offset.left = am.parentData.left + am.position.left;
                am.offset.top = am.parentData.top + am.position.top
            } else {
                am.offset.left = am.element.offset().left;
                am.offset.top = am.element.offset().top
            }
            al = Math.abs(am.sizeDiff.width + (am._helper ? am.offset.left - ae.left : (am.offset.left - ao.left)));
            aq = Math.abs(am.sizeDiff.height + (am._helper ? am.offset.top - ae.top : (am.offset.top - ao.top)));
            if (al + am.size.width >= am.parentData.width) {
                am.size.width = am.parentData.width - al;
                if (ap) {
                    am.size.height = am.size.width / am.aspectRatio;
                    aj = false
                }
            }
            if (aq + am.size.height >= am.parentData.height) {
                am.size.height = am.parentData.height - aq;
                if (ap) {
                    am.size.width = am.size.height * am.aspectRatio;
                    aj = false
                }
            }
            if (!aj) {
                am.position.left = am.prevPosition.left;
                am.position.top = am.prevPosition.top;
                am.size.width = am.prevSize.width;
                am.size.height = am.prevSize.height
            }
        },
        stop: function () {
            var aj = I(this).resizable("instance"),
                af = aj.options,
                ak = aj.containerOffset,
                ae = aj.containerPosition,
                ag = aj.containerElement,
                ah = I(aj.helper),
                am = ah.offset(),
                al = ah.outerWidth() - aj.sizeDiff.width,
                ai = ah.outerHeight() - aj.sizeDiff.height;
            if (aj._helper && !af.animate && (/relative/).test(ag.css("position"))) {
                I(this).css({
                    left: am.left - ae.left - ak.left,
                    width: al,
                    height: ai
                })
            }
            if (aj._helper && !af.animate && (/static/).test(ag.css("position"))) {
                I(this).css({
                    left: am.left - ae.left - ak.left,
                    width: al,
                    height: ai
                })
            }
        }
    });
    I.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var ae = I(this).resizable("instance"),
                ag = ae.options,
                af = function (ah) {
                    I(ah).each(function () {
                        var ai = I(this);
                        ai.data("ui-resizable-alsoresize", {
                            width: parseInt(ai.width(), 10),
                            height: parseInt(ai.height(), 10),
                            left: parseInt(ai.css("left"), 10),
                            top: parseInt(ai.css("top"), 10)
                        })
                    })
                };
            if (typeof (ag.alsoResize) === "object" && !ag.alsoResize.parentNode) {
                if (ag.alsoResize.length) {
                    ag.alsoResize = ag.alsoResize[0];
                    af(ag.alsoResize)
                } else {
                    I.each(ag.alsoResize, function (ah) {
                        af(ah)
                    })
                }
            } else {
                af(ag.alsoResize)
            }
        },
        resize: function (ag, ai) {
            var af = I(this).resizable("instance"),
                aj = af.options,
                ah = af.originalSize,
                al = af.originalPosition,
                ak = {
                    height: (af.size.height - ah.height) || 0,
                    width: (af.size.width - ah.width) || 0,
                    top: (af.position.top - al.top) || 0,
                    left: (af.position.left - al.left) || 0
                },
                ae = function (am, an) {
                    I(am).each(function () {
                        var aq = I(this),
                            ar = I(this).data("ui-resizable-alsoresize"),
                            ap = {},
                            ao = an && an.length ? an : aq.parents(ai.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        I.each(ao, function (at, av) {
                            var au = (ar[av] || 0) + (ak[av] || 0);
                            if (au && au >= 0) {
                                ap[av] = au || null
                            }
                        });
                        aq.css(ap)
                    })
                };
            if (typeof (aj.alsoResize) === "object" && !aj.alsoResize.nodeType) {
                I.each(aj.alsoResize, function (am, an) {
                    ae(am, an)
                })
            } else {
                ae(aj.alsoResize)
            }
        },
        stop: function () {
            I(this).removeData("resizable-alsoresize")
        }
    });
    I.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var af = I(this).resizable("instance"),
                ag = af.options,
                ae = af.size;
            af.ghost = af.originalElement.clone();
            af.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: ae.height,
                width: ae.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof ag.ghost === "string" ? ag.ghost : "");
            af.ghost.appendTo(af.helper)
        },
        resize: function () {
            var ae = I(this).resizable("instance");
            if (ae.ghost) {
                ae.ghost.css({
                    position: "relative",
                    height: ae.size.height,
                    width: ae.size.width
                })
            }
        },
        stop: function () {
            var ae = I(this).resizable("instance");
            if (ae.ghost && ae.helper) {
                ae.helper.get(0).removeChild(ae.ghost.get(0))
            }
        }
    });
    I.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var ah, am = I(this).resizable("instance"),
                aq = am.options,
                ak = am.size,
                al = am.originalSize,
                an = am.originalPosition,
                aw = am.axis,
                ae = typeof aq.grid === "number" ? [aq.grid, aq.grid] : aq.grid,
                au = (ae[0] || 1),
                at = (ae[1] || 1),
                aj = Math.round((ak.width - al.width) / au) * au,
                ai = Math.round((ak.height - al.height) / at) * at,
                ao = al.width + aj,
                ar = al.height + ai,
                ag = aq.maxWidth && (aq.maxWidth < ao),
                ap = aq.maxHeight && (aq.maxHeight < ar),
                av = aq.minWidth && (aq.minWidth > ao),
                af = aq.minHeight && (aq.minHeight > ar);
            aq.grid = ae;
            if (av) {
                ao += au
            }
            if (af) {
                ar += at
            }
            if (ag) {
                ao -= au
            }
            if (ap) {
                ar -= at
            }
            if (/^(se|s|e)$/.test(aw)) {
                am.size.width = ao;
                am.size.height = ar
            } else {
                if (/^(ne)$/.test(aw)) {
                    am.size.width = ao;
                    am.size.height = ar;
                    am.position.top = an.top - ai
                } else {
                    if (/^(sw)$/.test(aw)) {
                        am.size.width = ao;
                        am.size.height = ar;
                        am.position.left = an.left - aj
                    } else {
                        if (ar - at <= 0 || ao - au <= 0) {
                            ah = am._getPaddingPlusBorderDimensions(this)
                        }
                        if (ar - at > 0) {
                            am.size.height = ar;
                            am.position.top = an.top - ai
                        } else {
                            ar = at - ah.height;
                            am.size.height = ar;
                            am.position.top = an.top + al.height - ar
                        }
                        if (ao - au > 0) {
                            am.size.width = ao;
                            am.position.left = an.left - aj
                        } else {
                            ao = at - ah.height;
                            am.size.width = ao;
                            am.position.left = an.left + al.width - ao
                        }
                    }
                }
            }
        }
    });
    var N = I.ui.resizable;
    /*!
     * jQuery UI Dialog 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/dialog/
     */
    var V = I.widget("ui.dialog", {
        version: "1.11.1",
        options: {
            appendTo: "body",
            autoOpen: true,
            buttons: [],
            closeOnEscape: true,
            closeText: "Close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function (af) {
                    var ae = I(this).css(af).offset().top;
                    if (ae < 0) {
                        I(this).css("top", af.top - ae)
                    }
                }
            },
            resizable: true,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: true,
            height: true,
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true,
            width: true
        },
        resizableRelatedOptions: {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        },
        _create: function () {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            if (this.options.draggable && I.fn.draggable) {
                this._makeDraggable()
            }
            if (this.options.resizable && I.fn.resizable) {
                this._makeResizable()
            }
            this._isOpen = false;
            this._trackFocus()
        },
        _init: function () {
            if (this.options.autoOpen) {
                this.open()
            }
        },
        _appendTo: function () {
            var ae = this.options.appendTo;
            if (ae && (ae.jquery || ae.nodeType)) {
                return I(ae)
            }
            return this.document.find(ae || "body").eq(0)
        },
        _destroy: function () {
            var af, ae = this.originalPosition;
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(true, true).remove();
            if (this.originalTitle) {
                this.element.attr("title", this.originalTitle)
            }
            af = ae.parent.children().eq(ae.index);
            if (af.length && af[0] !== this.element[0]) {
                af.before(this.element)
            } else {
                ae.parent.append(this.element)
            }
        },
        widget: function () {
            return this.uiDialog
        },
        disable: I.noop,
        enable: I.noop,
        close: function (ah) {
            var ag, af = this;
            if (!this._isOpen || this._trigger("beforeClose", ah) === false) {
                return
            }
            this._isOpen = false;
            this._focusedElement = null;
            this._destroyOverlay();
            this._untrackInstance();
            if (!this.opener.filter(":focusable").focus().length) {
                try {
                    ag = this.document[0].activeElement;
                    if (ag && ag.nodeName.toLowerCase() !== "body") {
                        I(ag).blur()
                    }
                } catch (ae) {}
            }
            this._hide(this.uiDialog, this.options.hide, function () {
                af._trigger("close", ah)
            })
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function () {
            this._moveToTop()
        },
        _moveToTop: function (ai, af) {
            var ah = false,
                ae = this.uiDialog.siblings(".ui-front:visible").map(function () {
                    return +I(this).css("z-index")
                }).get(),
                ag = Math.max.apply(null, ae);
            if (ag >= +this.uiDialog.css("z-index")) {
                this.uiDialog.css("z-index", ag + 1);
                ah = true
            }
            if (ah && !af) {
                this._trigger("focus", ai)
            }
            return ah
        },
        open: function () {
            var ae = this;
            if (this._isOpen) {
                if (this._moveToTop()) {
                    this._focusTabbable()
                }
                return
            }
            this._isOpen = true;
            this.opener = I(this.document[0].activeElement);
            this._size();
            this._position();
            this._createOverlay();
            this._moveToTop(null, true);
            if (this.overlay) {
                this.overlay.css("z-index", this.uiDialog.css("z-index") - 1)
            }
            this._show(this.uiDialog, this.options.show, function () {
                ae._focusTabbable();
                ae._trigger("focus")
            });
            this._makeFocusTarget();
            this._trigger("open")
        },
        _focusTabbable: function () {
            var ae = this._focusedElement;
            if (!ae) {
                ae = this.element.find("[autofocus]")
            }
            if (!ae.length) {
                ae = this.element.find(":tabbable")
            }
            if (!ae.length) {
                ae = this.uiDialogButtonPane.find(":tabbable")
            }
            if (!ae.length) {
                ae = this.uiDialogTitlebarClose.filter(":tabbable")
            }
            if (!ae.length) {
                ae = this.uiDialog
            }
            ae.eq(0).focus()
        },
        _keepFocus: function (ae) {
            function af() {
                var ah = this.document[0].activeElement,
                    ag = this.uiDialog[0] === ah || I.contains(this.uiDialog[0], ah);
                if (!ag) {
                    this._focusTabbable()
                }
            }
            ae.preventDefault();
            af.call(this);
            this._delay(af)
        },
        _createWrapper: function () {
            this.uiDialog = I("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                keydown: function (ag) {
                    if (this.options.closeOnEscape && !ag.isDefaultPrevented() && ag.keyCode && ag.keyCode === I.ui.keyCode.ESCAPE) {
                        ag.preventDefault();
                        this.close(ag);
                        return
                    }
                    if (ag.keyCode !== I.ui.keyCode.TAB || ag.isDefaultPrevented()) {
                        return
                    }
                    var af = this.uiDialog.find(":tabbable"),
                        ah = af.filter(":first"),
                        ae = af.filter(":last");
                    if ((ag.target === ae[0] || ag.target === this.uiDialog[0]) && !ag.shiftKey) {
                        this._delay(function () {
                            ah.focus()
                        });
                        ag.preventDefault()
                    } else {
                        if ((ag.target === ah[0] || ag.target === this.uiDialog[0]) && ag.shiftKey) {
                            this._delay(function () {
                                ae.focus()
                            });
                            ag.preventDefault()
                        }
                    }
                },
                mousedown: function (ae) {
                    if (this._moveToTop(ae)) {
                        this._focusTabbable()
                    }
                }
            });
            if (!this.element.find("[aria-describedby]").length) {
                this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            }
        },
        _createTitlebar: function () {
            var ae;
            this.uiDialogTitlebar = I("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                mousedown: function (af) {
                    if (!I(af.target).closest(".ui-dialog-titlebar-close")) {
                        this.uiDialog.focus()
                    }
                }
            });
            this.uiDialogTitlebarClose = I("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: false
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
            this._on(this.uiDialogTitlebarClose, {
                click: function (af) {
                    af.preventDefault();
                    this.close(af)
                }
            });
            ae = I("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(ae);
            this.uiDialog.attr({
                "aria-labelledby": ae.attr("id")
            })
        },
        _title: function (ae) {
            if (!this.options.title) {
                ae.html("&#160;")
            }
            ae.text(this.options.title)
        },
        _createButtonPane: function () {
            this.uiDialogButtonPane = I("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = I("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons()
        },
        _createButtons: function () {
            var af = this,
                ae = this.options.buttons;
            this.uiDialogButtonPane.remove();
            this.uiButtonSet.empty();
            if (I.isEmptyObject(ae) || (I.isArray(ae) && !ae.length)) {
                this.uiDialog.removeClass("ui-dialog-buttons");
                return
            }
            I.each(ae, function (ag, ah) {
                var ai, aj;
                ah = I.isFunction(ah) ? {
                    click: ah,
                    text: ag
                } : ah;
                ah = I.extend({
                    type: "button"
                }, ah);
                ai = ah.click;
                ah.click = function () {
                    ai.apply(af.element[0], arguments)
                };
                aj = {
                    icons: ah.icons,
                    text: ah.showText
                };
                delete ah.icons;
                delete ah.showText;
                I("<button></button>", ah).button(aj).appendTo(af.uiButtonSet)
            });
            this.uiDialog.addClass("ui-dialog-buttons");
            this.uiDialogButtonPane.appendTo(this.uiDialog)
        },
        _makeDraggable: function () {
            var ag = this,
                af = this.options;

            function ae(ah) {
                return {
                    position: ah.position,
                    offset: ah.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (ah, ai) {
                    I(this).addClass("ui-dialog-dragging");
                    ag._blockFrames();
                    ag._trigger("dragStart", ah, ae(ai))
                },
                drag: function (ah, ai) {
                    ag._trigger("drag", ah, ae(ai))
                },
                stop: function (ah, ai) {
                    var ak = ai.offset.left - ag.document.scrollLeft(),
                        aj = ai.offset.top - ag.document.scrollTop();
                    af.position = {
                        my: "left top",
                        at: "left" + (ak >= 0 ? "+" : "") + ak + " top" + (aj >= 0 ? "+" : "") + aj,
                        of: ag.window
                    };
                    I(this).removeClass("ui-dialog-dragging");
                    ag._unblockFrames();
                    ag._trigger("dragStop", ah, ae(ai))
                }
            })
        },
        _makeResizable: function () {
            var aj = this,
                ah = this.options,
                ai = ah.resizable,
                ae = this.uiDialog.css("position"),
                ag = typeof ai === "string" ? ai : "n,e,s,w,se,sw,ne,nw";

            function af(ak) {
                return {
                    originalPosition: ak.originalPosition,
                    originalSize: ak.originalSize,
                    position: ak.position,
                    size: ak.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: ah.maxWidth,
                maxHeight: ah.maxHeight,
                minWidth: ah.minWidth,
                minHeight: this._minHeight(),
                handles: ag,
                start: function (ak, al) {
                    I(this).addClass("ui-dialog-resizing");
                    aj._blockFrames();
                    aj._trigger("resizeStart", ak, af(al))
                },
                resize: function (ak, al) {
                    aj._trigger("resize", ak, af(al))
                },
                stop: function (ak, al) {
                    var ao = aj.uiDialog.offset(),
                        an = ao.left - aj.document.scrollLeft(),
                        am = ao.top - aj.document.scrollTop();
                    ah.height = aj.uiDialog.height();
                    ah.width = aj.uiDialog.width();
                    ah.position = {
                        my: "left top",
                        at: "left" + (an >= 0 ? "+" : "") + an + " top" + (am >= 0 ? "+" : "") + am,
                        of: aj.window
                    };
                    I(this).removeClass("ui-dialog-resizing");
                    aj._unblockFrames();
                    aj._trigger("resizeStop", ak, af(al))
                }
            }).css("position", ae)
        },
        _trackFocus: function () {
            this._on(this.widget(), {
                focusin: function (ae) {
                    this._makeFocusTarget();
                    this._focusedElement = I(ae.target)
                }
            })
        },
        _makeFocusTarget: function () {
            this._untrackInstance();
            this._trackingInstances().unshift(this)
        },
        _untrackInstance: function () {
            var af = this._trackingInstances(),
                ae = I.inArray(this, af);
            if (ae !== -1) {
                af.splice(ae, 1)
            }
        },
        _trackingInstances: function () {
            var ae = this.document.data("ui-dialog-instances");
            if (!ae) {
                ae = [];
                this.document.data("ui-dialog-instances", ae)
            }
            return ae
        },
        _minHeight: function () {
            var ae = this.options;
            return ae.height === "auto" ? ae.minHeight : Math.min(ae.minHeight, ae.height)
        },
        _position: function () {
            var ae = this.uiDialog.is(":visible");
            if (!ae) {
                this.uiDialog.show()
            }
            this.uiDialog.position(this.options.position);
            if (!ae) {
                this.uiDialog.hide()
            }
        },
        _setOptions: function (ag) {
            var ah = this,
                af = false,
                ae = {};
            I.each(ag, function (ai, aj) {
                ah._setOption(ai, aj);
                if (ai in ah.sizeRelatedOptions) {
                    af = true
                }
                if (ai in ah.resizableRelatedOptions) {
                    ae[ai] = aj
                }
            });
            if (af) {
                this._size();
                this._position()
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", ae)
            }
        },
        _setOption: function (ag, ah) {
            var af, ai, ae = this.uiDialog;
            if (ag === "dialogClass") {
                ae.removeClass(this.options.dialogClass).addClass(ah)
            }
            if (ag === "disabled") {
                return
            }
            this._super(ag, ah);
            if (ag === "appendTo") {
                this.uiDialog.appendTo(this._appendTo())
            }
            if (ag === "buttons") {
                this._createButtons()
            }
            if (ag === "closeText") {
                this.uiDialogTitlebarClose.button({
                    label: "" + ah
                })
            }
            if (ag === "draggable") {
                af = ae.is(":data(ui-draggable)");
                if (af && !ah) {
                    ae.draggable("destroy")
                }
                if (!af && ah) {
                    this._makeDraggable()
                }
            }
            if (ag === "position") {
                this._position()
            }
            if (ag === "resizable") {
                ai = ae.is(":data(ui-resizable)");
                if (ai && !ah) {
                    ae.resizable("destroy")
                }
                if (ai && typeof ah === "string") {
                    ae.resizable("option", "handles", ah)
                }
                if (!ai && ah !== false) {
                    this._makeResizable()
                }
            }
            if (ag === "title") {
                this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))
            }
        },
        _size: function () {
            var ae, ag, ah, af = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            if (af.minWidth > af.width) {
                af.width = af.minWidth
            }
            ae = this.uiDialog.css({
                height: "auto",
                width: af.width
            }).outerHeight();
            ag = Math.max(0, af.minHeight - ae);
            ah = typeof af.maxHeight === "number" ? Math.max(0, af.maxHeight - ae) : "none";
            if (af.height === "auto") {
                this.element.css({
                    minHeight: ag,
                    maxHeight: ah,
                    height: "auto"
                })
            } else {
                this.element.height(Math.max(0, af.height - ae))
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        },
        _blockFrames: function () {
            this.iframeBlocks = this.document.find("iframe").map(function () {
                var ae = I(this);
                return I("<div>").css({
                    position: "absolute",
                    width: ae.outerWidth(),
                    height: ae.outerHeight()
                }).appendTo(ae.parent()).offset(ae.offset())[0]
            })
        },
        _unblockFrames: function () {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks
            }
        },
        _allowInteraction: function (ae) {
            if (I(ae.target).closest(".ui-dialog").length) {
                return true
            }
            return !!I(ae.target).closest(".ui-datepicker").length
        },
        _createOverlay: function () {
            if (!this.options.modal) {
                return
            }
            var ae = true;
            this._delay(function () {
                ae = false
            });
            if (!this.document.data("ui-dialog-overlays")) {
                this._on(this.document, {
                    focusin: function (af) {
                        if (ae) {
                            return
                        }
                        if (!this._allowInteraction(af)) {
                            af.preventDefault();
                            this._trackingInstances()[0]._focusTabbable()
                        }
                    }
                })
            }
            this.overlay = I("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            });
            this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
        },
        _destroyOverlay: function () {
            if (!this.options.modal) {
                return
            }
            if (this.overlay) {
                var ae = this.document.data("ui-dialog-overlays") - 1;
                if (!ae) {
                    this.document.unbind("focusin").removeData("ui-dialog-overlays")
                } else {
                    this.document.data("ui-dialog-overlays", ae)
                }
                this.overlay.remove();
                this.overlay = null
            }
        }
    });
    /*!
     * jQuery UI Droppable 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/droppable/
     */
    I.widget("ui.droppable", {
        version: "1.11.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var af, ag = this.options,
                ae = ag.accept;
            this.isover = false;
            this.isout = true;
            this.accept = I.isFunction(ae) ? ae : function (ah) {
                return ah.is(ae)
            };
            this.proportions = function () {
                if (arguments.length) {
                    af = arguments[0]
                } else {
                    return af ? af : af = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }
            };
            this._addToManager(ag.scope);
            ag.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function (ae) {
            I.ui.ddmanager.droppables[ae] = I.ui.ddmanager.droppables[ae] || [];
            I.ui.ddmanager.droppables[ae].push(this)
        },
        _splice: function (ae) {
            var af = 0;
            for (; af < ae.length; af++) {
                if (ae[af] === this) {
                    ae.splice(af, 1)
                }
            }
        },
        _destroy: function () {
            var ae = I.ui.ddmanager.droppables[this.options.scope];
            this._splice(ae);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (af, ag) {
            if (af === "accept") {
                this.accept = I.isFunction(ag) ? ag : function (ah) {
                    return ah.is(ag)
                }
            } else {
                if (af === "scope") {
                    var ae = I.ui.ddmanager.droppables[this.options.scope];
                    this._splice(ae);
                    this._addToManager(ag)
                }
            }
            this._super(af, ag)
        },
        _activate: function (af) {
            var ae = I.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            if (ae) {
                this._trigger("activate", af, this.ui(ae))
            }
        },
        _deactivate: function (af) {
            var ae = I.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            if (ae) {
                this._trigger("deactivate", af, this.ui(ae))
            }
        },
        _over: function (af) {
            var ae = I.ui.ddmanager.current;
            if (!ae || (ae.currentItem || ae.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (ae.currentItem || ae.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", af, this.ui(ae))
            }
        },
        _out: function (af) {
            var ae = I.ui.ddmanager.current;
            if (!ae || (ae.currentItem || ae.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (ae.currentItem || ae.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", af, this.ui(ae))
            }
        },
        _drop: function (af, ag) {
            var ae = ag || I.ui.ddmanager.current,
                ah = false;
            if (!ae || (ae.currentItem || ae.element)[0] === this.element[0]) {
                return false
            }
            this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var ai = I(this).droppable("instance");
                if (ai.options.greedy && !ai.options.disabled && ai.options.scope === ae.options.scope && ai.accept.call(ai.element[0], (ae.currentItem || ae.element)) && I.ui.intersect(ae, I.extend(ai, {
                        offset: ai.element.offset()
                    }), ai.options.tolerance, af)) {
                    ah = true;
                    return false
                }
            });
            if (ah) {
                return false
            }
            if (this.accept.call(this.element[0], (ae.currentItem || ae.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", af, this.ui(ae));
                return this.element
            }
            return false
        },
        ui: function (ae) {
            return {
                draggable: (ae.currentItem || ae.element),
                helper: ae.helper,
                position: ae.position,
                offset: ae.positionAbs
            }
        }
    });
    I.ui.intersect = (function () {
        function ae(ag, af, ah) {
            return (ag >= af) && (ag < (af + ah))
        }
        return function (aq, ak, ao, ag) {
            if (!ak.offset) {
                return false
            }
            var ai = (aq.positionAbs || aq.position.absolute).left,
                an = (aq.positionAbs || aq.position.absolute).top,
                ah = ai + aq.helperProportions.width,
                am = an + aq.helperProportions.height,
                aj = ak.offset.left,
                ap = ak.offset.top,
                af = aj + ak.proportions().width,
                al = ap + ak.proportions().height;
            switch (ao) {
            case "fit":
                return (aj <= ai && ah <= af && ap <= an && am <= al);
            case "intersect":
                return (aj < ai + (aq.helperProportions.width / 2) && ah - (aq.helperProportions.width / 2) < af && ap < an + (aq.helperProportions.height / 2) && am - (aq.helperProportions.height / 2) < al);
            case "pointer":
                return ae(ag.pageY, ap, ak.proportions().height) && ae(ag.pageX, aj, ak.proportions().width);
            case "touch":
                return ((an >= ap && an <= al) || (am >= ap && am <= al) || (an < ap && am > al)) && ((ai >= aj && ai <= af) || (ah >= aj && ah <= af) || (ai < aj && ah > af));
            default:
                return false
            }
        }
    })();
    I.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (ah, aj) {
            var ag, af, ae = I.ui.ddmanager.droppables[ah.options.scope] || [],
                ai = aj ? aj.type : null,
                ak = (ah.currentItem || ah.element).find(":data(ui-droppable)").addBack();
            droppablesLoop: for (ag = 0; ag < ae.length; ag++) {
                if (ae[ag].options.disabled || (ah && !ae[ag].accept.call(ae[ag].element[0], (ah.currentItem || ah.element)))) {
                    continue
                }
                for (af = 0; af < ak.length; af++) {
                    if (ak[af] === ae[ag].element[0]) {
                        ae[ag].proportions().height = 0;
                        continue droppablesLoop
                    }
                }
                ae[ag].visible = ae[ag].element.css("display") !== "none";
                if (!ae[ag].visible) {
                    continue
                }
                if (ai === "mousedown") {
                    ae[ag]._activate.call(ae[ag], aj)
                }
                ae[ag].offset = ae[ag].element.offset();
                ae[ag].proportions({
                    width: ae[ag].element[0].offsetWidth,
                    height: ae[ag].element[0].offsetHeight
                })
            }
        },
        drop: function (ae, af) {
            var ag = false;
            I.each((I.ui.ddmanager.droppables[ae.options.scope] || []).slice(), function () {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && I.ui.intersect(ae, this, this.options.tolerance, af)) {
                    ag = this._drop.call(this, af) || ag
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (ae.currentItem || ae.element))) {
                    this.isout = true;
                    this.isover = false;
                    this._deactivate.call(this, af)
                }
            });
            return ag
        },
        dragStart: function (ae, af) {
            ae.element.parentsUntil("body").bind("scroll.droppable", function () {
                if (!ae.options.refreshPositions) {
                    I.ui.ddmanager.prepareOffsets(ae, af)
                }
            })
        },
        drag: function (ae, af) {
            if (ae.options.refreshPositions) {
                I.ui.ddmanager.prepareOffsets(ae, af)
            }
            I.each(I.ui.ddmanager.droppables[ae.options.scope] || [], function () {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var aj, ah, ag, ai = I.ui.intersect(ae, this, this.options.tolerance, af),
                    ak = !ai && this.isover ? "isout" : (ai && !this.isover ? "isover" : null);
                if (!ak) {
                    return
                }
                if (this.options.greedy) {
                    ah = this.options.scope;
                    ag = this.element.parents(":data(ui-droppable)").filter(function () {
                        return I(this).droppable("instance").options.scope === ah
                    });
                    if (ag.length) {
                        aj = I(ag[0]).droppable("instance");
                        aj.greedyChild = (ak === "isover")
                    }
                }
                if (aj && ak === "isover") {
                    aj.isover = false;
                    aj.isout = true;
                    aj._out.call(aj, af)
                }
                this[ak] = true;
                this[ak === "isout" ? "isover" : "isout"] = false;
                this[ak === "isover" ? "_over" : "_out"].call(this, af);
                if (aj && ak === "isout") {
                    aj.isout = false;
                    aj.isover = true;
                    aj._over.call(aj, af)
                }
            })
        },
        dragStop: function (ae, af) {
            ae.element.parentsUntil("body").unbind("scroll.droppable");
            if (!ae.options.refreshPositions) {
                I.ui.ddmanager.prepareOffsets(ae, af)
            }
        }
    };
    var d = I.ui.droppable;
    /*!
     * jQuery UI Effects 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/effects-core/
     */
    var k = "ui-effects-",
        s = I;
    I.effects = {
        effect: {}
    };
    /*!
     * jQuery Color Animations v2.1.2
     * https://github.com/jquery/jquery-color
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * Date: Wed Jan 16 08:47:09 2013 -0600
     */
    (function (at, ah) {
        var ao = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            al = /^([\-+])=\s*(\d+\.?\d*)/,
            ak = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (au) {
                    return [au[1], au[2], au[3], au[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (au) {
                    return [au[1] * 2.55, au[2] * 2.55, au[3] * 2.55, au[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function (au) {
                    return [parseInt(au[1], 16), parseInt(au[2], 16), parseInt(au[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function (au) {
                    return [parseInt(au[1] + au[1], 16), parseInt(au[2] + au[2], 16), parseInt(au[3] + au[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (au) {
                    return [au[1], au[2] / 100, au[3] / 100, au[4]]
                }
            }],
            ai = at.Color = function (av, aw, au, ax) {
                return new at.Color.fn.parse(av, aw, au, ax)
            },
            an = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            ar = {
                "byte": {
                    floor: true,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: true
                }
            },
            aq = ai.support = {},
            af = at("<p>")[0],
            ae, ap = at.each;
        af.style.cssText = "background-color:rgba(1,1,1,.5)";
        aq.rgba = af.style.backgroundColor.indexOf("rgba") > -1;
        ap(an, function (au, av) {
            av.cache = "_" + au;
            av.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });

        function am(av, ax, aw) {
            var au = ar[ax.type] || {};
            if (av == null) {
                return (aw || !ax.def) ? null : ax.def
            }
            av = au.floor ? ~~av : parseFloat(av);
            if (isNaN(av)) {
                return ax.def
            }
            if (au.mod) {
                return (av + au.mod) % au.mod
            }
            return 0 > av ? 0 : au.max < av ? au.max : av
        }

        function aj(au) {
            var aw = ai(),
                av = aw._rgba = [];
            au = au.toLowerCase();
            ap(ak, function (aB, aC) {
                var az, aA = aC.re.exec(au),
                    ay = aA && aC.parse(aA),
                    ax = aC.space || "rgba";
                if (ay) {
                    az = aw[ax](ay);
                    aw[an[ax].cache] = az[an[ax].cache];
                    av = aw._rgba = az._rgba;
                    return false
                }
            });
            if (av.length) {
                if (av.join() === "0,0,0,0") {
                    at.extend(av, ae.transparent)
                }
                return aw
            }
            return ae[au]
        }
        ai.fn = at.extend(ai.prototype, {
            parse: function (aA, ay, au, az) {
                if (aA === ah) {
                    this._rgba = [null, null, null, null];
                    return this
                }
                if (aA.jquery || aA.nodeType) {
                    aA = at(aA).css(ay);
                    ay = ah
                }
                var ax = this,
                    aw = at.type(aA),
                    av = this._rgba = [];
                if (ay !== ah) {
                    aA = [aA, ay, au, az];
                    aw = "array"
                }
                if (aw === "string") {
                    return this.parse(aj(aA) || ae._default)
                }
                if (aw === "array") {
                    ap(an.rgba.props, function (aB, aC) {
                        av[aC.idx] = am(aA[aC.idx], aC)
                    });
                    return this
                }
                if (aw === "object") {
                    if (aA instanceof ai) {
                        ap(an, function (aB, aC) {
                            if (aA[aC.cache]) {
                                ax[aC.cache] = aA[aC.cache].slice()
                            }
                        })
                    } else {
                        ap(an, function (aC, aD) {
                            var aB = aD.cache;
                            ap(aD.props, function (aE, aF) {
                                if (!ax[aB] && aD.to) {
                                    if (aE === "alpha" || aA[aE] == null) {
                                        return
                                    }
                                    ax[aB] = aD.to(ax._rgba)
                                }
                                ax[aB][aF.idx] = am(aA[aE], aF, true)
                            });
                            if (ax[aB] && at.inArray(null, ax[aB].slice(0, 3)) < 0) {
                                ax[aB][3] = 1;
                                if (aD.from) {
                                    ax._rgba = aD.from(ax[aB])
                                }
                            }
                        })
                    }
                    return this
                }
            },
            is: function (aw) {
                var au = ai(aw),
                    ax = true,
                    av = this;
                ap(an, function (ay, aA) {
                    var aB, az = au[aA.cache];
                    if (az) {
                        aB = av[aA.cache] || aA.to && aA.to(av._rgba) || [];
                        ap(aA.props, function (aC, aD) {
                            if (az[aD.idx] != null) {
                                ax = (az[aD.idx] === aB[aD.idx]);
                                return ax
                            }
                        })
                    }
                    return ax
                });
                return ax
            },
            _space: function () {
                var au = [],
                    av = this;
                ap(an, function (aw, ax) {
                    if (av[ax.cache]) {
                        au.push(aw)
                    }
                });
                return au.pop()
            },
            transition: function (av, aB) {
                var aw = ai(av),
                    ax = aw._space(),
                    ay = an[ax],
                    az = this.alpha() === 0 ? ai("transparent") : this,
                    aA = az[ay.cache] || ay.to(az._rgba),
                    au = aA.slice();
                aw = aw[ay.cache];
                ap(ay.props, function (aF, aH) {
                    var aE = aH.idx,
                        aD = aA[aE],
                        aC = aw[aE],
                        aG = ar[aH.type] || {};
                    if (aC === null) {
                        return
                    }
                    if (aD === null) {
                        au[aE] = aC
                    } else {
                        if (aG.mod) {
                            if (aC - aD > aG.mod / 2) {
                                aD += aG.mod
                            } else {
                                if (aD - aC > aG.mod / 2) {
                                    aD -= aG.mod
                                }
                            }
                        }
                        au[aE] = am((aC - aD) * aB + aD, aH)
                    }
                });
                return this[ax](au)
            },
            blend: function (ax) {
                if (this._rgba[3] === 1) {
                    return this
                }
                var aw = this._rgba.slice(),
                    av = aw.pop(),
                    au = ai(ax)._rgba;
                return ai(at.map(aw, function (ay, az) {
                    return (1 - av) * au[az] + av * ay
                }))
            },
            toRgbaString: function () {
                var av = "rgba(",
                    au = at.map(this._rgba, function (aw, ax) {
                        return aw == null ? (ax > 2 ? 1 : 0) : aw
                    });
                if (au[3] === 1) {
                    au.pop();
                    av = "rgb("
                }
                return av + au.join() + ")"
            },
            toHslaString: function () {
                var av = "hsla(",
                    au = at.map(this.hsla(), function (aw, ax) {
                        if (aw == null) {
                            aw = ax > 2 ? 1 : 0
                        }
                        if (ax && ax < 3) {
                            aw = Math.round(aw * 100) + "%"
                        }
                        return aw
                    });
                if (au[3] === 1) {
                    au.pop();
                    av = "hsl("
                }
                return av + au.join() + ")"
            },
            toHexString: function (au) {
                var av = this._rgba.slice(),
                    aw = av.pop();
                if (au) {
                    av.push(~~(aw * 255))
                }
                return "#" + at.map(av, function (ax) {
                    ax = (ax || 0).toString(16);
                    return ax.length === 1 ? "0" + ax : ax
                }).join("")
            },
            toString: function () {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        });
        ai.fn.parse.prototype = ai.fn;

        function ag(aw, av, au) {
            au = (au + 1) % 1;
            if (au * 6 < 1) {
                return aw + (av - aw) * au * 6
            }
            if (au * 2 < 1) {
                return av
            }
            if (au * 3 < 2) {
                return aw + (av - aw) * ((2 / 3) - au) * 6
            }
            return aw
        }
        an.hsla.to = function (aw) {
            if (aw[0] == null || aw[1] == null || aw[2] == null) {
                return [null, null, null, aw[3]]
            }
            var au = aw[0] / 255,
                az = aw[1] / 255,
                aA = aw[2] / 255,
                aC = aw[3],
                aB = Math.max(au, az, aA),
                ax = Math.min(au, az, aA),
                aD = aB - ax,
                aE = aB + ax,
                av = aE * 0.5,
                ay, aF;
            if (ax === aB) {
                ay = 0
            } else {
                if (au === aB) {
                    ay = (60 * (az - aA) / aD) + 360
                } else {
                    if (az === aB) {
                        ay = (60 * (aA - au) / aD) + 120
                    } else {
                        ay = (60 * (au - az) / aD) + 240
                    }
                }
            }
            if (aD === 0) {
                aF = 0
            } else {
                if (av <= 0.5) {
                    aF = aD / aE
                } else {
                    aF = aD / (2 - aE)
                }
            }
            return [Math.round(ay) % 360, aF, av, aC == null ? 1 : aC]
        };
        an.hsla.from = function (ay) {
            if (ay[0] == null || ay[1] == null || ay[2] == null) {
                return [null, null, null, ay[3]]
            }
            var ax = ay[0] / 360,
                aw = ay[1],
                av = ay[2],
                au = ay[3],
                az = av <= 0.5 ? av * (1 + aw) : av + aw - av * aw,
                aA = 2 * av - az;
            return [Math.round(ag(aA, az, ax + (1 / 3)) * 255), Math.round(ag(aA, az, ax) * 255), Math.round(ag(aA, az, ax - (1 / 3)) * 255), au]
        };
        ap(an, function (av, ax) {
            var aw = ax.props,
                au = ax.cache,
                az = ax.to,
                ay = ax.from;
            ai.fn[av] = function (aE) {
                if (az && !this[au]) {
                    this[au] = az(this._rgba)
                }
                if (aE === ah) {
                    return this[au].slice()
                }
                var aB, aD = at.type(aE),
                    aA = (aD === "array" || aD === "object") ? aE : arguments,
                    aC = this[au].slice();
                ap(aw, function (aF, aH) {
                    var aG = aA[aD === "object" ? aF : aH.idx];
                    if (aG == null) {
                        aG = aC[aH.idx]
                    }
                    aC[aH.idx] = am(aG, aH)
                });
                if (ay) {
                    aB = ai(ay(aC));
                    aB[au] = aC;
                    return aB
                } else {
                    return ai(aC)
                }
            };
            ap(aw, function (aA, aB) {
                if (ai.fn[aA]) {
                    return
                }
                ai.fn[aA] = function (aF) {
                    var aH = at.type(aF),
                        aE = (aA === "alpha" ? (this._hsla ? "hsla" : "rgba") : av),
                        aD = this[aE](),
                        aG = aD[aB.idx],
                        aC;
                    if (aH === "undefined") {
                        return aG
                    }
                    if (aH === "function") {
                        aF = aF.call(this, aG);
                        aH = at.type(aF)
                    }
                    if (aF == null && aB.empty) {
                        return this
                    }
                    if (aH === "string") {
                        aC = al.exec(aF);
                        if (aC) {
                            aF = aG + parseFloat(aC[2]) * (aC[1] === "+" ? 1 : -1)
                        }
                    }
                    aD[aB.idx] = aF;
                    return this[aE](aD)
                }
            })
        });
        ai.hook = function (av) {
            var au = av.split(" ");
            ap(au, function (aw, ax) {
                at.cssHooks[ax] = {
                    set: function (aB, aC) {
                        var az, aA, ay = "";
                        if (aC !== "transparent" && (at.type(aC) !== "string" || (az = aj(aC)))) {
                            aC = ai(az || aC);
                            if (!aq.rgba && aC._rgba[3] !== 1) {
                                aA = ax === "backgroundColor" ? aB.parentNode : aB;
                                while ((ay === "" || ay === "transparent") && aA && aA.style) {
                                    try {
                                        ay = at.css(aA, "backgroundColor");
                                        aA = aA.parentNode
                                    } catch (aD) {}
                                }
                                aC = aC.blend(ay && ay !== "transparent" ? ay : "_default")
                            }
                            aC = aC.toRgbaString()
                        }
                        try {
                            aB.style[ax] = aC
                        } catch (aD) {}
                    }
                };
                at.fx.step[ax] = function (ay) {
                    if (!ay.colorInit) {
                        ay.start = ai(ay.elem, ax);
                        ay.end = ai(ay.end);
                        ay.colorInit = true
                    }
                    at.cssHooks[ax].set(ay.elem, ay.start.transition(ay.end, ay.pos))
                }
            })
        };
        ai.hook(ao);
        at.cssHooks.borderColor = {
            expand: function (av) {
                var au = {};
                ap(["Top", "Right", "Bottom", "Left"], function (ax, aw) {
                    au["border" + aw + "Color"] = av
                });
                return au
            }
        };
        ae = at.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    })(s);
    (function () {
        var af = ["add", "remove", "toggle"],
            ag = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        I.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (ai, aj) {
            I.fx.step[aj] = function (ak) {
                if (ak.end !== "none" && !ak.setAttr || ak.pos === 1 && !ak.setAttr) {
                    s.style(ak.elem, aj, ak.end);
                    ak.setAttr = true
                }
            }
        });

        function ah(am) {
            var aj, ai, ak = am.ownerDocument.defaultView ? am.ownerDocument.defaultView.getComputedStyle(am, null) : am.currentStyle,
                al = {};
            if (ak && ak.length && ak[0] && ak[ak[0]]) {
                ai = ak.length;
                while (ai--) {
                    aj = ak[ai];
                    if (typeof ak[aj] === "string") {
                        al[I.camelCase(aj)] = ak[aj]
                    }
                }
            } else {
                for (aj in ak) {
                    if (typeof ak[aj] === "string") {
                        al[aj] = ak[aj]
                    }
                }
            }
            return al
        }

        function ae(ai, ak) {
            var am = {},
                aj, al;
            for (aj in ak) {
                al = ak[aj];
                if (ai[aj] !== al) {
                    if (!ag[aj]) {
                        if (I.fx.step[aj] || !isNaN(parseFloat(al))) {
                            am[aj] = al
                        }
                    }
                }
            }
            return am
        }
        if (!I.fn.addBack) {
            I.fn.addBack = function (ai) {
                return this.add(ai == null ? this.prevObject : this.prevObject.filter(ai))
            }
        }
        I.effects.animateClass = function (ai, aj, am, al) {
            var ak = I.speed(aj, am, al);
            return this.queue(function () {
                var ap = I(this),
                    an = ap.attr("class") || "",
                    ao, aq = ak.children ? ap.find("*").addBack() : ap;
                aq = aq.map(function () {
                    var ar = I(this);
                    return {
                        el: ar,
                        start: ah(this)
                    }
                });
                ao = function () {
                    I.each(af, function (ar, at) {
                        if (ai[at]) {
                            ap[at + "Class"](ai[at])
                        }
                    })
                };
                ao();
                aq = aq.map(function () {
                    this.end = ah(this.el[0]);
                    this.diff = ae(this.start, this.end);
                    return this
                });
                ap.attr("class", an);
                aq = aq.map(function () {
                    var au = this,
                        ar = I.Deferred(),
                        at = I.extend({}, ak, {
                            queue: false,
                            complete: function () {
                                ar.resolve(au)
                            }
                        });
                    this.el.animate(this.diff, at);
                    return ar.promise()
                });
                I.when.apply(I, aq.get()).done(function () {
                    ao();
                    I.each(arguments, function () {
                        var ar = this.el;
                        I.each(this.diff, function (at) {
                            ar.css(at, "")
                        })
                    });
                    ak.complete.call(ap[0])
                })
            })
        };
        I.fn.extend({
            addClass: (function (ai) {
                return function (ak, aj, am, al) {
                    return aj ? I.effects.animateClass.call(this, {
                        add: ak
                    }, aj, am, al) : ai.apply(this, arguments)
                }
            })(I.fn.addClass),
            removeClass: (function (ai) {
                return function (ak, aj, am, al) {
                    return arguments.length > 1 ? I.effects.animateClass.call(this, {
                        remove: ak
                    }, aj, am, al) : ai.apply(this, arguments)
                }
            })(I.fn.removeClass),
            toggleClass: (function (ai) {
                return function (al, ak, aj, an, am) {
                    if (typeof ak === "boolean" || ak === undefined) {
                        if (!aj) {
                            return ai.apply(this, arguments)
                        } else {
                            return I.effects.animateClass.call(this, (ak ? {
                                add: al
                            } : {
                                remove: al
                            }), aj, an, am)
                        }
                    } else {
                        return I.effects.animateClass.call(this, {
                            toggle: al
                        }, ak, aj, an)
                    }
                }
            })(I.fn.toggleClass),
            switchClass: function (ai, ak, aj, am, al) {
                return I.effects.animateClass.call(this, {
                    add: ak,
                    remove: ai
                }, aj, am, al)
            }
        })
    })();
    (function () {
        I.extend(I.effects, {
            version: "1.11.1",
            save: function (ah, ai) {
                for (var ag = 0; ag < ai.length; ag++) {
                    if (ai[ag] !== null) {
                        ah.data(k + ai[ag], ah[0].style[ai[ag]])
                    }
                }
            },
            restore: function (ah, aj) {
                var ai, ag;
                for (ag = 0; ag < aj.length; ag++) {
                    if (aj[ag] !== null) {
                        ai = ah.data(k + aj[ag]);
                        if (ai === undefined) {
                            ai = ""
                        }
                        ah.css(aj[ag], ai)
                    }
                }
            },
            setMode: function (ag, ah) {
                if (ah === "toggle") {
                    ah = ag.is(":hidden") ? "show" : "hide"
                }
                return ah
            },
            getBaseline: function (ah, ai) {
                var aj, ag;
                switch (ah[0]) {
                case "top":
                    aj = 0;
                    break;
                case "middle":
                    aj = 0.5;
                    break;
                case "bottom":
                    aj = 1;
                    break;
                default:
                    aj = ah[0] / ai.height
                }
                switch (ah[1]) {
                case "left":
                    ag = 0;
                    break;
                case "center":
                    ag = 0.5;
                    break;
                case "right":
                    ag = 1;
                    break;
                default:
                    ag = ah[1] / ai.width
                }
                return {
                    x: ag,
                    y: aj
                }
            },
            createWrapper: function (ah) {
                if (ah.parent().is(".ui-effects-wrapper")) {
                    return ah.parent()
                }
                var ai = {
                        width: ah.outerWidth(true),
                        height: ah.outerHeight(true),
                        "float": ah.css("float")
                    },
                    al = I("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    ag = {
                        width: ah.width(),
                        height: ah.height()
                    },
                    ak = document.activeElement;
                try {
                    ak.id
                } catch (aj) {
                    ak = document.body
                }
                ah.wrap(al);
                if (ah[0] === ak || I.contains(ah[0], ak)) {
                    I(ak).focus()
                }
                al = ah.parent();
                if (ah.css("position") === "static") {
                    al.css({
                        position: "relative"
                    });
                    ah.css({
                        position: "relative"
                    })
                } else {
                    I.extend(ai, {
                        position: ah.css("position"),
                        zIndex: ah.css("z-index")
                    });
                    I.each(["top", "left", "bottom", "right"], function (am, an) {
                        ai[an] = ah.css(an);
                        if (isNaN(parseInt(ai[an], 10))) {
                            ai[an] = "auto"
                        }
                    });
                    ah.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })
                }
                ah.css(ag);
                return al.css(ai).show()
            },
            removeWrapper: function (ag) {
                var ah = document.activeElement;
                if (ag.parent().is(".ui-effects-wrapper")) {
                    ag.parent().replaceWith(ag);
                    if (ag[0] === ah || I.contains(ag[0], ah)) {
                        I(ah).focus()
                    }
                }
                return ag
            },
            setTransition: function (ah, aj, ag, ai) {
                ai = ai || {};
                I.each(aj, function (al, ak) {
                    var am = ah.cssUnit(ak);
                    if (am[0] > 0) {
                        ai[ak] = am[0] * ag + am[1]
                    }
                });
                return ai
            }
        });

        function ae(ah, ag, ai, aj) {
            if (I.isPlainObject(ah)) {
                ag = ah;
                ah = ah.effect
            }
            ah = {
                effect: ah
            };
            if (ag == null) {
                ag = {}
            }
            if (I.isFunction(ag)) {
                aj = ag;
                ai = null;
                ag = {}
            }
            if (typeof ag === "number" || I.fx.speeds[ag]) {
                aj = ai;
                ai = ag;
                ag = {}
            }
            if (I.isFunction(ai)) {
                aj = ai;
                ai = null
            }
            if (ag) {
                I.extend(ah, ag)
            }
            ai = ai || ag.duration;
            ah.duration = I.fx.off ? 0 : typeof ai === "number" ? ai : ai in I.fx.speeds ? I.fx.speeds[ai] : I.fx.speeds._default;
            ah.complete = aj || ag.complete;
            return ah
        }

        function af(ag) {
            if (!ag || typeof ag === "number" || I.fx.speeds[ag]) {
                return true
            }
            if (typeof ag === "string" && !I.effects.effect[ag]) {
                return true
            }
            if (I.isFunction(ag)) {
                return true
            }
            if (typeof ag === "object" && !ag.effect) {
                return true
            }
            return false
        }
        I.fn.extend({
            effect: function () {
                var ai = ae.apply(this, arguments),
                    ak = ai.mode,
                    ag = ai.queue,
                    ah = I.effects.effect[ai.effect];
                if (I.fx.off || !ah) {
                    if (ak) {
                        return this[ak](ai.duration, ai.complete)
                    } else {
                        return this.each(function () {
                            if (ai.complete) {
                                ai.complete.call(this)
                            }
                        })
                    }
                }

                function aj(an) {
                    var ao = I(this),
                        am = ai.complete,
                        ap = ai.mode;

                    function al() {
                        if (I.isFunction(am)) {
                            am.call(ao[0])
                        }
                        if (I.isFunction(an)) {
                            an()
                        }
                    }
                    if (ao.is(":hidden") ? ap === "hide" : ap === "show") {
                        ao[ap]();
                        al()
                    } else {
                        ah.call(ao[0], ai, al)
                    }
                }
                return ag === false ? this.each(aj) : this.queue(ag || "fx", aj)
            },
            show: (function (ag) {
                return function (ai) {
                    if (af(ai)) {
                        return ag.apply(this, arguments)
                    } else {
                        var ah = ae.apply(this, arguments);
                        ah.mode = "show";
                        return this.effect.call(this, ah)
                    }
                }
            })(I.fn.show),
            hide: (function (ag) {
                return function (ai) {
                    if (af(ai)) {
                        return ag.apply(this, arguments)
                    } else {
                        var ah = ae.apply(this, arguments);
                        ah.mode = "hide";
                        return this.effect.call(this, ah)
                    }
                }
            })(I.fn.hide),
            toggle: (function (ag) {
                return function (ai) {
                    if (af(ai) || typeof ai === "boolean") {
                        return ag.apply(this, arguments)
                    } else {
                        var ah = ae.apply(this, arguments);
                        ah.mode = "toggle";
                        return this.effect.call(this, ah)
                    }
                }
            })(I.fn.toggle),
            cssUnit: function (ag) {
                var ah = this.css(ag),
                    ai = [];
                I.each(["em", "px", "%", "pt"], function (aj, ak) {
                    if (ah.indexOf(ak) > 0) {
                        ai = [parseFloat(ah), ak]
                    }
                });
                return ai
            }
        })
    })();
    (function () {
        var ae = {};
        I.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (ag, af) {
            ae[af] = function (ah) {
                return Math.pow(ah, ag + 2)
            }
        });
        I.extend(ae, {
            Sine: function (af) {
                return 1 - Math.cos(af * Math.PI / 2)
            },
            Circ: function (af) {
                return 1 - Math.sqrt(1 - af * af)
            },
            Elastic: function (af) {
                return af === 0 || af === 1 ? af : -Math.pow(2, 8 * (af - 1)) * Math.sin(((af - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function (af) {
                return af * af * (3 * af - 2)
            },
            Bounce: function (ah) {
                var af, ag = 4;
                while (ah < ((af = Math.pow(2, --ag)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - ag) - 7.5625 * Math.pow((af * 3 - 2) / 22 - ah, 2)
            }
        });
        I.each(ae, function (ag, af) {
            I.easing["easeIn" + ag] = af;
            I.easing["easeOut" + ag] = function (ah) {
                return 1 - af(1 - ah)
            };
            I.easing["easeInOut" + ag] = function (ah) {
                return ah < 0.5 ? af(ah * 2) / 2 : 1 - af(ah * -2 + 2) / 2
            }
        })
    })();
    var T = I.effects;
    /*!
     * jQuery UI Effects Blind 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/blind-effect/
     */
    var Z = I.effects.effect.blind = function (ag, am) {
        var ah = I(this),
            aq = /up|down|vertical/,
            ap = /up|left|vertical|horizontal/,
            ar = ["position", "top", "bottom", "left", "right", "height", "width"],
            an = I.effects.setMode(ah, ag.mode || "hide"),
            at = ag.direction || "up",
            aj = aq.test(at),
            ai = aj ? "height" : "width",
            ao = aj ? "top" : "left",
            av = ap.test(at),
            al = {},
            au = an === "show",
            af, ae, ak;
        if (ah.parent().is(".ui-effects-wrapper")) {
            I.effects.save(ah.parent(), ar)
        } else {
            I.effects.save(ah, ar)
        }
        ah.show();
        af = I.effects.createWrapper(ah).css({
            overflow: "hidden"
        });
        ae = af[ai]();
        ak = parseFloat(af.css(ao)) || 0;
        al[ai] = au ? ae : 0;
        if (!av) {
            ah.css(aj ? "bottom" : "right", 0).css(aj ? "top" : "left", "auto").css({
                position: "absolute"
            });
            al[ao] = au ? ak : ae + ak
        }
        if (au) {
            af.css(ai, 0);
            if (!av) {
                af.css(ao, ak + ae)
            }
        }
        af.animate(al, {
            duration: ag.duration,
            easing: ag.easing,
            queue: false,
            complete: function () {
                if (an === "hide") {
                    ah.hide()
                }
                I.effects.restore(ah, ar);
                I.effects.removeWrapper(ah);
                am()
            }
        })
    };
    /*!
     * jQuery UI Effects Bounce 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/bounce-effect/
     */
    var S = I.effects.effect.bounce = function (an, am) {
        var ae = I(this),
            af = ["position", "top", "bottom", "left", "right", "height", "width"],
            al = I.effects.setMode(ae, an.mode || "effect"),
            ak = al === "hide",
            aw = al === "show",
            ax = an.direction || "up",
            ag = an.distance,
            aj = an.times || 5,
            ay = aj * 2 + (aw || ak ? 1 : 0),
            av = an.duration / ay,
            ap = an.easing,
            ah = (ax === "up" || ax === "down") ? "top" : "left",
            ao = (ax === "up" || ax === "left"),
            au, ai, at, aq = ae.queue(),
            ar = aq.length;
        if (aw || ak) {
            af.push("opacity")
        }
        I.effects.save(ae, af);
        ae.show();
        I.effects.createWrapper(ae);
        if (!ag) {
            ag = ae[ah === "top" ? "outerHeight" : "outerWidth"]() / 3
        }
        if (aw) {
            at = {
                opacity: 1
            };
            at[ah] = 0;
            ae.css("opacity", 0).css(ah, ao ? -ag * 2 : ag * 2).animate(at, av, ap)
        }
        if (ak) {
            ag = ag / Math.pow(2, aj - 1)
        }
        at = {};
        at[ah] = 0;
        for (au = 0; au < aj; au++) {
            ai = {};
            ai[ah] = (ao ? "-=" : "+=") + ag;
            ae.animate(ai, av, ap).animate(at, av, ap);
            ag = ak ? ag * 2 : ag / 2
        }
        if (ak) {
            ai = {
                opacity: 0
            };
            ai[ah] = (ao ? "-=" : "+=") + ag;
            ae.animate(ai, av, ap)
        }
        ae.queue(function () {
            if (ak) {
                ae.hide()
            }
            I.effects.restore(ae, af);
            I.effects.removeWrapper(ae);
            am()
        });
        if (ar > 1) {
            aq.splice.apply(aq, [1, 0].concat(aq.splice(ar, ay + 1)))
        }
        ae.dequeue()
    };
    /*!
     * jQuery UI Effects Clip 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/clip-effect/
     */
    var D = I.effects.effect.clip = function (ah, ak) {
        var ai = I(this),
            ao = ["position", "top", "bottom", "left", "right", "height", "width"],
            an = I.effects.setMode(ai, ah.mode || "hide"),
            aq = an === "show",
            ap = ah.direction || "vertical",
            am = ap === "vertical",
            ar = am ? "height" : "width",
            al = am ? "top" : "left",
            aj = {},
            af, ag, ae;
        I.effects.save(ai, ao);
        ai.show();
        af = I.effects.createWrapper(ai).css({
            overflow: "hidden"
        });
        ag = (ai[0].tagName === "IMG") ? af : ai;
        ae = ag[ar]();
        if (aq) {
            ag.css(ar, 0);
            ag.css(al, ae / 2)
        }
        aj[ar] = aq ? ae : 0;
        aj[al] = aq ? 0 : ae / 2;
        ag.animate(aj, {
            queue: false,
            duration: ah.duration,
            easing: ah.easing,
            complete: function () {
                if (!aq) {
                    ai.hide()
                }
                I.effects.restore(ai, ao);
                I.effects.removeWrapper(ai);
                ak()
            }
        })
    };
    /*!
     * jQuery UI Effects Drop 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/drop-effect/
     */
    var o = I.effects.effect.drop = function (af, aj) {
        var ag = I(this),
            al = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            ak = I.effects.setMode(ag, af.mode || "hide"),
            an = ak === "show",
            am = af.direction || "left",
            ah = (am === "up" || am === "down") ? "top" : "left",
            ao = (am === "up" || am === "left") ? "pos" : "neg",
            ai = {
                opacity: an ? 1 : 0
            },
            ae;
        I.effects.save(ag, al);
        ag.show();
        I.effects.createWrapper(ag);
        ae = af.distance || ag[ah === "top" ? "outerHeight" : "outerWidth"](true) / 2;
        if (an) {
            ag.css("opacity", 0).css(ah, ao === "pos" ? -ae : ae)
        }
        ai[ah] = (an ? (ao === "pos" ? "+=" : "-=") : (ao === "pos" ? "-=" : "+=")) + ae;
        ag.animate(ai, {
            queue: false,
            duration: af.duration,
            easing: af.easing,
            complete: function () {
                if (ak === "hide") {
                    ag.hide()
                }
                I.effects.restore(ag, al);
                I.effects.removeWrapper(ag);
                aj()
            }
        })
    };
    /*!
     * jQuery UI Effects Explode 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/explode-effect/
     */
    var Q = I.effects.effect.explode = function (ar, aq) {
        var ak = ar.pieces ? Math.round(Math.sqrt(ar.pieces)) : 3,
            af = ak,
            ae = I(this),
            am = I.effects.setMode(ae, ar.mode || "hide"),
            aw = am === "show",
            ai = ae.show().css("visibility", "hidden").offset(),
            at = Math.ceil(ae.outerWidth() / af),
            ap = Math.ceil(ae.outerHeight() / ak),
            aj = [],
            av, au, ag, ao, an, al;

        function ax() {
            aj.push(this);
            if (aj.length === ak * af) {
                ah()
            }
        }
        for (av = 0; av < ak; av++) {
            ao = ai.top + av * ap;
            al = av - (ak - 1) / 2;
            for (au = 0; au < af; au++) {
                ag = ai.left + au * at;
                an = au - (af - 1) / 2;
                ae.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -au * at,
                    top: -av * ap
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: at,
                    height: ap,
                    left: ag + (aw ? an * at : 0),
                    top: ao + (aw ? al * ap : 0),
                    opacity: aw ? 0 : 1
                }).animate({
                    left: ag + (aw ? 0 : an * at),
                    top: ao + (aw ? 0 : al * ap),
                    opacity: aw ? 1 : 0
                }, ar.duration || 500, ar.easing, ax)
            }
        }

        function ah() {
            ae.css({
                visibility: "visible"
            });
            I(aj).remove();
            if (!aw) {
                ae.hide()
            }
            aq()
        }
    };
    /*!
     * jQuery UI Effects Fade 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/fade-effect/
     */
    var R = I.effects.effect.fade = function (ah, ae) {
        var af = I(this),
            ag = I.effects.setMode(af, ah.mode || "toggle");
        af.animate({
            opacity: ag
        }, {
            queue: false,
            duration: ah.duration,
            easing: ah.easing,
            complete: ae
        })
    };
    /*!
     * jQuery UI Effects Fold 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/fold-effect/
     */
    var F = I.effects.effect.fold = function (ag, ak) {
        var ah = I(this),
            ap = ["position", "top", "bottom", "left", "right", "height", "width"],
            am = I.effects.setMode(ah, ag.mode || "hide"),
            at = am === "show",
            an = am === "hide",
            av = ag.size || 15,
            ao = /([0-9]+)%/.exec(av),
            au = !!ag.horizFirst,
            al = at !== au,
            ai = al ? ["width", "height"] : ["height", "width"],
            aj = ag.duration / 2,
            af, ae, ar = {},
            aq = {};
        I.effects.save(ah, ap);
        ah.show();
        af = I.effects.createWrapper(ah).css({
            overflow: "hidden"
        });
        ae = al ? [af.width(), af.height()] : [af.height(), af.width()];
        if (ao) {
            av = parseInt(ao[1], 10) / 100 * ae[an ? 0 : 1]
        }
        if (at) {
            af.css(au ? {
                height: 0,
                width: av
            } : {
                height: av,
                width: 0
            })
        }
        ar[ai[0]] = at ? ae[0] : av;
        aq[ai[1]] = at ? ae[1] : 0;
        af.animate(ar, aj, ag.easing).animate(aq, aj, ag.easing, function () {
            if (an) {
                ah.hide()
            }
            I.effects.restore(ah, ap);
            I.effects.removeWrapper(ah);
            ak()
        })
    };
    /*!
     * jQuery UI Effects Highlight 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/highlight-effect/
     */
    var M = I.effects.effect.highlight = function (aj, ae) {
        var ag = I(this),
            af = ["backgroundImage", "backgroundColor", "opacity"],
            ai = I.effects.setMode(ag, aj.mode || "show"),
            ah = {
                backgroundColor: ag.css("backgroundColor")
            };
        if (ai === "hide") {
            ah.opacity = 0
        }
        I.effects.save(ag, af);
        ag.show().css({
            backgroundImage: "none",
            backgroundColor: aj.color || "#ffff99"
        }).animate(ah, {
            queue: false,
            duration: aj.duration,
            easing: aj.easing,
            complete: function () {
                if (ai === "hide") {
                    ag.hide()
                }
                I.effects.restore(ag, af);
                ae()
            }
        })
    };
    /*!
     * jQuery UI Effects Size 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/size-effect/
     */
    var a = I.effects.effect.size = function (an, am) {
        var ar, ak, al, ae = I(this),
            aq = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            ap = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            ao = ["width", "height", "overflow"],
            ai = ["fontSize"],
            au = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            af = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            aj = I.effects.setMode(ae, an.mode || "effect"),
            at = an.restore || aj !== "effect",
            ax = an.scale || "both",
            av = an.origin || ["middle", "center"],
            aw = ae.css("position"),
            ag = at ? aq : ap,
            ah = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        if (aj === "show") {
            ae.show()
        }
        ar = {
            height: ae.height(),
            width: ae.width(),
            outerHeight: ae.outerHeight(),
            outerWidth: ae.outerWidth()
        };
        if (an.mode === "toggle" && aj === "show") {
            ae.from = an.to || ah;
            ae.to = an.from || ar
        } else {
            ae.from = an.from || (aj === "show" ? ah : ar);
            ae.to = an.to || (aj === "hide" ? ah : ar)
        }
        al = {
            from: {
                y: ae.from.height / ar.height,
                x: ae.from.width / ar.width
            },
            to: {
                y: ae.to.height / ar.height,
                x: ae.to.width / ar.width
            }
        };
        if (ax === "box" || ax === "both") {
            if (al.from.y !== al.to.y) {
                ag = ag.concat(au);
                ae.from = I.effects.setTransition(ae, au, al.from.y, ae.from);
                ae.to = I.effects.setTransition(ae, au, al.to.y, ae.to)
            }
            if (al.from.x !== al.to.x) {
                ag = ag.concat(af);
                ae.from = I.effects.setTransition(ae, af, al.from.x, ae.from);
                ae.to = I.effects.setTransition(ae, af, al.to.x, ae.to)
            }
        }
        if (ax === "content" || ax === "both") {
            if (al.from.y !== al.to.y) {
                ag = ag.concat(ai).concat(ao);
                ae.from = I.effects.setTransition(ae, ai, al.from.y, ae.from);
                ae.to = I.effects.setTransition(ae, ai, al.to.y, ae.to)
            }
        }
        I.effects.save(ae, ag);
        ae.show();
        I.effects.createWrapper(ae);
        ae.css("overflow", "hidden").css(ae.from);
        if (av) {
            ak = I.effects.getBaseline(av, ar);
            ae.from.top = (ar.outerHeight - ae.outerHeight()) * ak.y;
            ae.from.left = (ar.outerWidth - ae.outerWidth()) * ak.x;
            ae.to.top = (ar.outerHeight - ae.to.outerHeight) * ak.y;
            ae.to.left = (ar.outerWidth - ae.to.outerWidth) * ak.x
        }
        ae.css(ae.from);
        if (ax === "content" || ax === "both") {
            au = au.concat(["marginTop", "marginBottom"]).concat(ai);
            af = af.concat(["marginLeft", "marginRight"]);
            ao = aq.concat(au).concat(af);
            ae.find("*[width]").each(function () {
                var az = I(this),
                    ay = {
                        height: az.height(),
                        width: az.width(),
                        outerHeight: az.outerHeight(),
                        outerWidth: az.outerWidth()
                    };
                if (at) {
                    I.effects.save(az, ao)
                }
                az.from = {
                    height: ay.height * al.from.y,
                    width: ay.width * al.from.x,
                    outerHeight: ay.outerHeight * al.from.y,
                    outerWidth: ay.outerWidth * al.from.x
                };
                az.to = {
                    height: ay.height * al.to.y,
                    width: ay.width * al.to.x,
                    outerHeight: ay.height * al.to.y,
                    outerWidth: ay.width * al.to.x
                };
                if (al.from.y !== al.to.y) {
                    az.from = I.effects.setTransition(az, au, al.from.y, az.from);
                    az.to = I.effects.setTransition(az, au, al.to.y, az.to)
                }
                if (al.from.x !== al.to.x) {
                    az.from = I.effects.setTransition(az, af, al.from.x, az.from);
                    az.to = I.effects.setTransition(az, af, al.to.x, az.to)
                }
                az.css(az.from);
                az.animate(az.to, an.duration, an.easing, function () {
                    if (at) {
                        I.effects.restore(az, ao)
                    }
                })
            })
        }
        ae.animate(ae.to, {
            queue: false,
            duration: an.duration,
            easing: an.easing,
            complete: function () {
                if (ae.to.opacity === 0) {
                    ae.css("opacity", ae.from.opacity)
                }
                if (aj === "hide") {
                    ae.hide()
                }
                I.effects.restore(ae, ag);
                if (!at) {
                    if (aw === "static") {
                        ae.css({
                            position: "relative",
                            top: ae.to.top,
                            left: ae.to.left
                        })
                    } else {
                        I.each(["top", "left"], function (ay, az) {
                            ae.css(az, function (aB, aD) {
                                var aC = parseInt(aD, 10),
                                    aA = ay ? ae.to.left : ae.to.top;
                                if (aD === "auto") {
                                    return aA + "px"
                                }
                                return aC + aA + "px"
                            })
                        })
                    }
                }
                I.effects.removeWrapper(ae);
                am()
            }
        })
    };
    /*!
     * jQuery UI Effects Scale 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/scale-effect/
     */
    var f = I.effects.effect.scale = function (ae, ah) {
        var af = I(this),
            an = I.extend(true, {}, ae),
            ai = I.effects.setMode(af, ae.mode || "effect"),
            aj = parseInt(ae.percent, 10) || (parseInt(ae.percent, 10) === 0 ? 0 : (ai === "hide" ? 0 : 100)),
            al = ae.direction || "both",
            am = ae.origin,
            ag = {
                height: af.height(),
                width: af.width(),
                outerHeight: af.outerHeight(),
                outerWidth: af.outerWidth()
            },
            ak = {
                y: al !== "horizontal" ? (aj / 100) : 1,
                x: al !== "vertical" ? (aj / 100) : 1
            };
        an.effect = "size";
        an.queue = false;
        an.complete = ah;
        if (ai !== "effect") {
            an.origin = am || ["middle", "center"];
            an.restore = true
        }
        an.from = ae.from || (ai === "show" ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : ag);
        an.to = {
            height: ag.height * ak.y,
            width: ag.width * ak.x,
            outerHeight: ag.outerHeight * ak.y,
            outerWidth: ag.outerWidth * ak.x
        };
        if (an.fade) {
            if (ai === "show") {
                an.from.opacity = 0;
                an.to.opacity = 1
            }
            if (ai === "hide") {
                an.from.opacity = 1;
                an.to.opacity = 0
            }
        }
        af.effect(an)
    };
    /*!
     * jQuery UI Effects Puff 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/puff-effect/
     */
    var ab = I.effects.effect.puff = function (al, ae) {
        var aj = I(this),
            ak = I.effects.setMode(aj, al.mode || "hide"),
            ah = ak === "hide",
            ai = parseInt(al.percent, 10) || 150,
            ag = ai / 100,
            af = {
                height: aj.height(),
                width: aj.width(),
                outerHeight: aj.outerHeight(),
                outerWidth: aj.outerWidth()
            };
        I.extend(al, {
            effect: "scale",
            queue: false,
            fade: true,
            mode: ak,
            complete: ae,
            percent: ah ? ai : 100,
            from: ah ? af : {
                height: af.height * ag,
                width: af.width * ag,
                outerHeight: af.outerHeight * ag,
                outerWidth: af.outerWidth * ag
            }
        });
        aj.effect(al)
    };
    /*!
     * jQuery UI Effects Pulsate 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/pulsate-effect/
     */
    var H = I.effects.effect.pulsate = function (ae, ai) {
        var ag = I(this),
            al = I.effects.setMode(ag, ae.mode || "show"),
            ap = al === "show",
            am = al === "hide",
            aq = (ap || al === "hide"),
            an = ((ae.times || 5) * 2) + (aq ? 1 : 0),
            ah = ae.duration / an,
            ao = 0,
            ak = ag.queue(),
            af = ak.length,
            aj;
        if (ap || !ag.is(":visible")) {
            ag.css("opacity", 0).show();
            ao = 1
        }
        for (aj = 1; aj < an; aj++) {
            ag.animate({
                opacity: ao
            }, ah, ae.easing);
            ao = 1 - ao
        }
        ag.animate({
            opacity: ao
        }, ah, ae.easing);
        ag.queue(function () {
            if (am) {
                ag.hide()
            }
            ai()
        });
        if (af > 1) {
            ak.splice.apply(ak, [1, 0].concat(ak.splice(af, an + 1)))
        }
        ag.dequeue()
    };
    /*!
     * jQuery UI Effects Shake 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/shake-effect/
     */
    var C = I.effects.effect.shake = function (am, al) {
        var ae = I(this),
            af = ["position", "top", "bottom", "left", "right", "height", "width"],
            ak = I.effects.setMode(ae, am.mode || "effect"),
            av = am.direction || "left",
            ag = am.distance || 20,
            aj = am.times || 3,
            aw = aj * 2 + 1,
            aq = Math.round(am.duration / aw),
            ai = (av === "up" || av === "down") ? "top" : "left",
            ah = (av === "up" || av === "left"),
            au = {},
            at = {},
            ar = {},
            ap, an = ae.queue(),
            ao = an.length;
        I.effects.save(ae, af);
        ae.show();
        I.effects.createWrapper(ae);
        au[ai] = (ah ? "-=" : "+=") + ag;
        at[ai] = (ah ? "+=" : "-=") + ag * 2;
        ar[ai] = (ah ? "-=" : "+=") + ag * 2;
        ae.animate(au, aq, am.easing);
        for (ap = 1; ap < aj; ap++) {
            ae.animate(at, aq, am.easing).animate(ar, aq, am.easing)
        }
        ae.animate(at, aq, am.easing).animate(au, aq / 2, am.easing).queue(function () {
            if (ak === "hide") {
                ae.hide()
            }
            I.effects.restore(ae, af);
            I.effects.removeWrapper(ae);
            al()
        });
        if (ao > 1) {
            an.splice.apply(an, [1, 0].concat(an.splice(ao, aw + 1)))
        }
        ae.dequeue()
    };
    /*!
     * jQuery UI Effects Slide 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/slide-effect/
     */
    var B = I.effects.effect.slide = function (ag, ak) {
        var ah = I(this),
            am = ["position", "top", "bottom", "left", "right", "width", "height"],
            al = I.effects.setMode(ah, ag.mode || "show"),
            ao = al === "show",
            an = ag.direction || "left",
            ai = (an === "up" || an === "down") ? "top" : "left",
            af = (an === "up" || an === "left"),
            ae, aj = {};
        I.effects.save(ah, am);
        ah.show();
        ae = ag.distance || ah[ai === "top" ? "outerHeight" : "outerWidth"](true);
        I.effects.createWrapper(ah).css({
            overflow: "hidden"
        });
        if (ao) {
            ah.css(ai, af ? (isNaN(ae) ? "-" + ae : -ae) : ae)
        }
        aj[ai] = (ao ? (af ? "+=" : "-=") : (af ? "-=" : "+=")) + ae;
        ah.animate(aj, {
            queue: false,
            duration: ag.duration,
            easing: ag.easing,
            complete: function () {
                if (al === "hide") {
                    ah.hide()
                }
                I.effects.restore(ah, am);
                I.effects.removeWrapper(ah);
                ak()
            }
        })
    };
    /*!
     * jQuery UI Effects Transfer 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/transfer-effect/
     */
    var m = I.effects.effect.transfer = function (af, aj) {
        var ah = I(this),
            am = I(af.to),
            ap = am.css("position") === "fixed",
            al = I("body"),
            an = ap ? al.scrollTop() : 0,
            ao = ap ? al.scrollLeft() : 0,
            ae = am.offset(),
            ai = {
                top: ae.top - an,
                left: ae.left - ao,
                height: am.innerHeight(),
                width: am.innerWidth()
            },
            ak = ah.offset(),
            ag = I("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(af.className).css({
                top: ak.top - an,
                left: ak.left - ao,
                height: ah.innerHeight(),
                width: ah.innerWidth(),
                position: ap ? "fixed" : "absolute"
            }).animate(ai, af.duration, af.easing, function () {
                ag.remove();
                aj()
            })
    };
    /*!
     * jQuery UI Progressbar 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/progressbar/
     */
    var U = I.widget("ui.progressbar", {
        version: "1.11.1",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function () {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this.valueDiv = I("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this._refreshValue()
        },
        _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove()
        },
        value: function (ae) {
            if (ae === undefined) {
                return this.options.value
            }
            this.options.value = this._constrainedValue(ae);
            this._refreshValue()
        },
        _constrainedValue: function (ae) {
            if (ae === undefined) {
                ae = this.options.value
            }
            this.indeterminate = ae === false;
            if (typeof ae !== "number") {
                ae = 0
            }
            return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, ae))
        },
        _setOptions: function (ae) {
            var af = ae.value;
            delete ae.value;
            this._super(ae);
            this.options.value = this._constrainedValue(af);
            this._refreshValue()
        },
        _setOption: function (ae, af) {
            if (ae === "max") {
                af = Math.max(this.min, af)
            }
            if (ae === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!af).attr("aria-disabled", af)
            }
            this._super(ae, af)
        },
        _percentage: function () {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function () {
            var af = this.options.value,
                ae = this._percentage();
            this.valueDiv.toggle(this.indeterminate || af > this.min).toggleClass("ui-corner-right", af === this.options.max).width(ae.toFixed(0) + "%");
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
            if (this.indeterminate) {
                this.element.removeAttr("aria-valuenow");
                if (!this.overlayDiv) {
                    this.overlayDiv = I("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv)
                }
            } else {
                this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": af
                });
                if (this.overlayDiv) {
                    this.overlayDiv.remove();
                    this.overlayDiv = null
                }
            }
            if (this.oldValue !== af) {
                this.oldValue = af;
                this._trigger("change")
            }
            if (af === this.options.max) {
                this._trigger("complete")
            }
        }
    });
    /*!
     * jQuery UI Selectable 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/selectable/
     */
    var e = I.widget("ui.selectable", I.ui.mouse, {
        version: "1.11.1",
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function () {
            var af, ae = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            this.refresh = function () {
                af = I(ae.options.filter, ae.element[0]);
                af.addClass("ui-selectee");
                af.each(function () {
                    var ag = I(this),
                        ah = ag.offset();
                    I.data(this, "selectable-item", {
                        element: this,
                        $element: ag,
                        left: ah.left,
                        top: ah.top,
                        right: ah.left + ag.outerWidth(),
                        bottom: ah.top + ag.outerHeight(),
                        startselected: false,
                        selected: ag.hasClass("ui-selected"),
                        selecting: ag.hasClass("ui-selecting"),
                        unselecting: ag.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = af.addClass("ui-selectee");
            this._mouseInit();
            this.helper = I("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled");
            this._mouseDestroy()
        },
        _mouseStart: function (ag) {
            var af = this,
                ae = this.options;
            this.opos = [ag.pageX, ag.pageY];
            if (this.options.disabled) {
                return
            }
            this.selectees = I(ae.filter, this.element[0]);
            this._trigger("start", ag);
            I(ae.appendTo).append(this.helper);
            this.helper.css({
                left: ag.pageX,
                top: ag.pageY,
                width: 0,
                height: 0
            });
            if (ae.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function () {
                var ah = I.data(this, "selectable-item");
                ah.startselected = true;
                if (!ag.metaKey && !ag.ctrlKey) {
                    ah.$element.removeClass("ui-selected");
                    ah.selected = false;
                    ah.$element.addClass("ui-unselecting");
                    ah.unselecting = true;
                    af._trigger("unselecting", ag, {
                        unselecting: ah.element
                    })
                }
            });
            I(ag.target).parents().addBack().each(function () {
                var ah, ai = I.data(this, "selectable-item");
                if (ai) {
                    ah = (!ag.metaKey && !ag.ctrlKey) || !ai.$element.hasClass("ui-selected");
                    ai.$element.removeClass(ah ? "ui-unselecting" : "ui-selected").addClass(ah ? "ui-selecting" : "ui-unselecting");
                    ai.unselecting = !ah;
                    ai.selecting = ah;
                    ai.selected = ah;
                    if (ah) {
                        af._trigger("selecting", ag, {
                            selecting: ai.element
                        })
                    } else {
                        af._trigger("unselecting", ag, {
                            unselecting: ai.element
                        })
                    }
                    return false
                }
            })
        },
        _mouseDrag: function (al) {
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var ai, ak = this,
                ag = this.options,
                af = this.opos[0],
                aj = this.opos[1],
                ae = al.pageX,
                ah = al.pageY;
            if (af > ae) {
                ai = ae;
                ae = af;
                af = ai
            }
            if (aj > ah) {
                ai = ah;
                ah = aj;
                aj = ai
            }
            this.helper.css({
                left: af,
                top: aj,
                width: ae - af,
                height: ah - aj
            });
            this.selectees.each(function () {
                var am = I.data(this, "selectable-item"),
                    an = false;
                if (!am || am.element === ak.element[0]) {
                    return
                }
                if (ag.tolerance === "touch") {
                    an = (!(am.left > ae || am.right < af || am.top > ah || am.bottom < aj))
                } else {
                    if (ag.tolerance === "fit") {
                        an = (am.left > af && am.right < ae && am.top > aj && am.bottom < ah)
                    }
                }
                if (an) {
                    if (am.selected) {
                        am.$element.removeClass("ui-selected");
                        am.selected = false
                    }
                    if (am.unselecting) {
                        am.$element.removeClass("ui-unselecting");
                        am.unselecting = false
                    }
                    if (!am.selecting) {
                        am.$element.addClass("ui-selecting");
                        am.selecting = true;
                        ak._trigger("selecting", al, {
                            selecting: am.element
                        })
                    }
                } else {
                    if (am.selecting) {
                        if ((al.metaKey || al.ctrlKey) && am.startselected) {
                            am.$element.removeClass("ui-selecting");
                            am.selecting = false;
                            am.$element.addClass("ui-selected");
                            am.selected = true
                        } else {
                            am.$element.removeClass("ui-selecting");
                            am.selecting = false;
                            if (am.startselected) {
                                am.$element.addClass("ui-unselecting");
                                am.unselecting = true
                            }
                            ak._trigger("unselecting", al, {
                                unselecting: am.element
                            })
                        }
                    }
                    if (am.selected) {
                        if (!al.metaKey && !al.ctrlKey && !am.startselected) {
                            am.$element.removeClass("ui-selected");
                            am.selected = false;
                            am.$element.addClass("ui-unselecting");
                            am.unselecting = true;
                            ak._trigger("unselecting", al, {
                                unselecting: am.element
                            })
                        }
                    }
                }
            });
            return false
        },
        _mouseStop: function (af) {
            var ae = this;
            this.dragged = false;
            I(".ui-unselecting", this.element[0]).each(function () {
                var ag = I.data(this, "selectable-item");
                ag.$element.removeClass("ui-unselecting");
                ag.unselecting = false;
                ag.startselected = false;
                ae._trigger("unselected", af, {
                    unselected: ag.element
                })
            });
            I(".ui-selecting", this.element[0]).each(function () {
                var ag = I.data(this, "selectable-item");
                ag.$element.removeClass("ui-selecting").addClass("ui-selected");
                ag.selecting = false;
                ag.selected = true;
                ag.startselected = true;
                ae._trigger("selected", af, {
                    selected: ag.element
                })
            });
            this._trigger("stop", af);
            this.helper.remove();
            return false
        }
    });
    /*!
     * jQuery UI Selectmenu 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/selectmenu
     */
    var W = I.widget("ui.selectmenu", {
        version: "1.11.1",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            disabled: null,
            icons: {
                button: "ui-icon-triangle-1-s"
            },
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            width: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function () {
            var ae = this.element.uniqueId().attr("id");
            this.ids = {
                element: ae,
                button: ae + "-button",
                menu: ae + "-menu"
            };
            this._drawButton();
            this._drawMenu();
            if (this.options.disabled) {
                this.disable()
            }
        },
        _drawButton: function () {
            var af = this,
                ae = this.element.attr("tabindex");
            this.label = I("label[for='" + this.ids.element + "']").attr("for", this.ids.button);
            this._on(this.label, {
                click: function (ag) {
                    this.button.focus();
                    ag.preventDefault()
                }
            });
            this.element.hide();
            this.button = I("<span>", {
                "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                tabindex: ae || this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true"
            }).insertAfter(this.element);
            I("<span>", {
                "class": "ui-icon " + this.options.icons.button
            }).prependTo(this.button);
            this.buttonText = I("<span>", {
                "class": "ui-selectmenu-text"
            }).appendTo(this.button);
            this._setText(this.buttonText, this.element.find("option:selected").text());
            this._resizeButton();
            this._on(this.button, this._buttonEvents);
            this.button.one("focusin", function () {
                if (!af.menuItems) {
                    af._refreshMenu()
                }
            });
            this._hoverable(this.button);
            this._focusable(this.button)
        },
        _drawMenu: function () {
            var ae = this;
            this.menu = I("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            });
            this.menuWrap = I("<div>", {
                "class": "ui-selectmenu-menu ui-front"
            }).append(this.menu).appendTo(this._appendTo());
            this.menuInstance = this.menu.menu({
                role: "listbox",
                select: function (af, ag) {
                    af.preventDefault();
                    ae._select(ag.item.data("ui-selectmenu-item"), af)
                },
                focus: function (ag, ah) {
                    var af = ah.item.data("ui-selectmenu-item");
                    if (ae.focusIndex != null && af.index !== ae.focusIndex) {
                        ae._trigger("focus", ag, {
                            item: af
                        });
                        if (!ae.isOpen) {
                            ae._select(af, ag)
                        }
                    }
                    ae.focusIndex = af.index;
                    ae.button.attr("aria-activedescendant", ae.menuItems.eq(af.index).attr("id"))
                }
            }).menu("instance");
            this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all");
            this.menuInstance._off(this.menu, "mouseleave");
            this.menuInstance._closeOnDocumentClick = function () {
                return false
            };
            this.menuInstance._isDivider = function () {
                return false
            }
        },
        refresh: function () {
            this._refreshMenu();
            this._setText(this.buttonText, this._getSelectedItem().text());
            if (!this.options.width) {
                this._resizeButton()
            }
        },
        _refreshMenu: function () {
            this.menu.empty();
            var af, ae = this.element.find("option");
            if (!ae.length) {
                return
            }
            this._parseOptions(ae);
            this._renderMenu(this.menu, this.items);
            this.menuInstance.refresh();
            this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup");
            af = this._getSelectedItem();
            this.menuInstance.focus(null, af);
            this._setAria(af.data("ui-selectmenu-item"));
            this._setOption("disabled", this.element.prop("disabled"))
        },
        open: function (ae) {
            if (this.options.disabled) {
                return
            }
            if (!this.menuItems) {
                this._refreshMenu()
            } else {
                this.menu.find(".ui-state-focus").removeClass("ui-state-focus");
                this.menuInstance.focus(null, this._getSelectedItem())
            }
            this.isOpen = true;
            this._toggleAttr();
            this._resizeMenu();
            this._position();
            this._on(this.document, this._documentClick);
            this._trigger("open", ae)
        },
        _position: function () {
            this.menuWrap.position(I.extend({
                of: this.button
            }, this.options.position))
        },
        close: function (ae) {
            if (!this.isOpen) {
                return
            }
            this.isOpen = false;
            this._toggleAttr();
            this._off(this.document);
            this._trigger("close", ae)
        },
        widget: function () {
            return this.button
        },
        menuWidget: function () {
            return this.menu
        },
        _renderMenu: function (ag, af) {
            var ah = this,
                ae = "";
            I.each(af, function (ai, aj) {
                if (aj.optgroup !== ae) {
                    I("<li>", {
                        "class": "ui-selectmenu-optgroup ui-menu-divider" + (aj.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                        text: aj.optgroup
                    }).appendTo(ag);
                    ae = aj.optgroup
                }
                ah._renderItemData(ag, aj)
            })
        },
        _renderItemData: function (ae, af) {
            return this._renderItem(ae, af).data("ui-selectmenu-item", af)
        },
        _renderItem: function (af, ag) {
            var ae = I("<li>");
            if (ag.disabled) {
                ae.addClass("ui-state-disabled")
            }
            this._setText(ae, ag.label);
            return ae.appendTo(af)
        },
        _setText: function (ae, af) {
            if (af) {
                ae.text(af)
            } else {
                ae.html("&#160;")
            }
        },
        _move: function (ai, ah) {
            var ag, af, ae = ".ui-menu-item";
            if (this.isOpen) {
                ag = this.menuItems.eq(this.focusIndex)
            } else {
                ag = this.menuItems.eq(this.element[0].selectedIndex);
                ae += ":not(.ui-state-disabled)"
            }
            if (ai === "first" || ai === "last") {
                af = ag[ai === "first" ? "prevAll" : "nextAll"](ae).eq(-1)
            } else {
                af = ag[ai + "All"](ae).eq(0)
            }
            if (af.length) {
                this.menuInstance.focus(ah, af)
            }
        },
        _getSelectedItem: function () {
            return this.menuItems.eq(this.element[0].selectedIndex)
        },
        _toggle: function (ae) {
            this[this.isOpen ? "close" : "open"](ae)
        },
        _documentClick: {
            mousedown: function (ae) {
                if (!this.isOpen) {
                    return
                }
                if (!I(ae.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length) {
                    this.close(ae)
                }
            }
        },
        _buttonEvents: {
            mousedown: function (ae) {
                ae.preventDefault()
            },
            click: "_toggle",
            keydown: function (af) {
                var ae = true;
                switch (af.keyCode) {
                case I.ui.keyCode.TAB:
                case I.ui.keyCode.ESCAPE:
                    this.close(af);
                    ae = false;
                    break;
                case I.ui.keyCode.ENTER:
                    if (this.isOpen) {
                        this._selectFocusedItem(af)
                    }
                    break;
                case I.ui.keyCode.UP:
                    if (af.altKey) {
                        this._toggle(af)
                    } else {
                        this._move("prev", af)
                    }
                    break;
                case I.ui.keyCode.DOWN:
                    if (af.altKey) {
                        this._toggle(af)
                    } else {
                        this._move("next", af)
                    }
                    break;
                case I.ui.keyCode.SPACE:
                    if (this.isOpen) {
                        this._selectFocusedItem(af)
                    } else {
                        this._toggle(af)
                    }
                    break;
                case I.ui.keyCode.LEFT:
                    this._move("prev", af);
                    break;
                case I.ui.keyCode.RIGHT:
                    this._move("next", af);
                    break;
                case I.ui.keyCode.HOME:
                case I.ui.keyCode.PAGE_UP:
                    this._move("first", af);
                    break;
                case I.ui.keyCode.END:
                case I.ui.keyCode.PAGE_DOWN:
                    this._move("last", af);
                    break;
                default:
                    this.menu.trigger(af);
                    ae = false
                }
                if (ae) {
                    af.preventDefault()
                }
            }
        },
        _selectFocusedItem: function (af) {
            var ae = this.menuItems.eq(this.focusIndex);
            if (!ae.hasClass("ui-state-disabled")) {
                this._select(ae.data("ui-selectmenu-item"), af)
            }
        },
        _select: function (af, ae) {
            var ag = this.element[0].selectedIndex;
            this.element[0].selectedIndex = af.index;
            this._setText(this.buttonText, af.label);
            this._setAria(af);
            this._trigger("select", ae, {
                item: af
            });
            if (af.index !== ag) {
                this._trigger("change", ae, {
                    item: af
                })
            }
            this.close(ae)
        },
        _setAria: function (ae) {
            var af = this.menuItems.eq(ae.index).attr("id");
            this.button.attr({
                "aria-labelledby": af,
                "aria-activedescendant": af
            });
            this.menu.attr("aria-activedescendant", af)
        },
        _setOption: function (ae, af) {
            if (ae === "icons") {
                this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(af.button)
            }
            this._super(ae, af);
            if (ae === "appendTo") {
                this.menuWrap.appendTo(this._appendTo())
            }
            if (ae === "disabled") {
                this.menuInstance.option("disabled", af);
                this.button.toggleClass("ui-state-disabled", af).attr("aria-disabled", af);
                this.element.prop("disabled", af);
                if (af) {
                    this.button.attr("tabindex", -1);
                    this.close()
                } else {
                    this.button.attr("tabindex", 0)
                }
            }
            if (ae === "width") {
                this._resizeButton()
            }
        },
        _appendTo: function () {
            var ae = this.options.appendTo;
            if (ae) {
                ae = ae.jquery || ae.nodeType ? I(ae) : this.document.find(ae).eq(0)
            }
            if (!ae || !ae[0]) {
                ae = this.element.closest(".ui-front")
            }
            if (!ae.length) {
                ae = this.document[0].body
            }
            return ae
        },
        _toggleAttr: function () {
            this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen);
            this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen);
            this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function () {
            var ae = this.options.width;
            if (!ae) {
                ae = this.element.show().outerWidth();
                this.element.hide()
            }
            this.button.outerWidth(ae)
        },
        _resizeMenu: function () {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function () {
            return {
                disabled: this.element.prop("disabled")
            }
        },
        _parseOptions: function (ae) {
            var af = [];
            ae.each(function (ah, aj) {
                var ai = I(aj),
                    ag = ai.parent("optgroup");
                af.push({
                    element: ai,
                    index: ah,
                    value: ai.attr("value"),
                    label: ai.text(),
                    optgroup: ag.attr("label") || "",
                    disabled: ag.prop("disabled") || ai.prop("disabled")
                })
            });
            this.items = af
        },
        _destroy: function () {
            this.menuWrap.remove();
            this.button.remove();
            this.element.show();
            this.element.removeUniqueId();
            this.label.attr("for", this.ids.element)
        }
    });
    /*!
     * jQuery UI Slider 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/slider/
     */
    var g = I.widget("ui.slider", I.ui.mouse, {
        version: "1.11.1",
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this._refresh();
            this._setOption("disabled", this.options.disabled);
            this._animateOff = false
        },
        _refresh: function () {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function () {
            var ah, ae, af = this.options,
                aj = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                ai = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                ag = [];
            ae = (af.values && af.values.length) || 1;
            if (aj.length > ae) {
                aj.slice(ae).remove();
                aj = aj.slice(0, ae)
            }
            for (ah = aj.length; ah < ae; ah++) {
                ag.push(ai)
            }
            this.handles = aj.add(I(ag.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.each(function (ak) {
                I(this).data("ui-slider-handle-index", ak)
            })
        },
        _createRange: function () {
            var ae = this.options,
                af = "";
            if (ae.range) {
                if (ae.range === true) {
                    if (!ae.values) {
                        ae.values = [this._valueMin(), this._valueMin()]
                    } else {
                        if (ae.values.length && ae.values.length !== 2) {
                            ae.values = [ae.values[0], ae.values[0]]
                        } else {
                            if (I.isArray(ae.values)) {
                                ae.values = ae.values.slice(0)
                            }
                        }
                    }
                }
                if (!this.range || !this.range.length) {
                    this.range = I("<div></div>").appendTo(this.element);
                    af = "ui-slider-range ui-widget-header ui-corner-all"
                } else {
                    this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                        left: "",
                        bottom: ""
                    })
                }
                this.range.addClass(af + ((ae.range === "min" || ae.range === "max") ? " ui-slider-range-" + ae.range : ""))
            } else {
                if (this.range) {
                    this.range.remove()
                }
                this.range = null
            }
        },
        _setupEvents: function () {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles)
        },
        _destroy: function () {
            this.handles.remove();
            if (this.range) {
                this.range.remove()
            }
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
            this._mouseDestroy()
        },
        _mouseCapture: function (ag) {
            var ak, an, af, ai, am, ao, aj, ae, al = this,
                ah = this.options;
            if (ah.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            ak = {
                x: ag.pageX,
                y: ag.pageY
            };
            an = this._normValueFromMouse(ak);
            af = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function (ap) {
                var aq = Math.abs(an - al.values(ap));
                if ((af > aq) || (af === aq && (ap === al._lastChangedValue || al.values(ap) === ah.min))) {
                    af = aq;
                    ai = I(this);
                    am = ap
                }
            });
            ao = this._start(ag, am);
            if (ao === false) {
                return false
            }
            this._mouseSliding = true;
            this._handleIndex = am;
            ai.addClass("ui-state-active").focus();
            aj = ai.offset();
            ae = !I(ag.target).parents().addBack().is(".ui-slider-handle");
            this._clickOffset = ae ? {
                left: 0,
                top: 0
            } : {
                left: ag.pageX - aj.left - (ai.width() / 2),
                top: ag.pageY - aj.top - (ai.height() / 2) - (parseInt(ai.css("borderTopWidth"), 10) || 0) - (parseInt(ai.css("borderBottomWidth"), 10) || 0) + (parseInt(ai.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(ag, am, an)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (ag) {
            var ae = {
                    x: ag.pageX,
                    y: ag.pageY
                },
                af = this._normValueFromMouse(ae);
            this._slide(ag, this._handleIndex, af);
            return false
        },
        _mouseStop: function (ae) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(ae, this._handleIndex);
            this._change(ae, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function () {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (af) {
            var ae, ai, ah, ag, aj;
            if (this.orientation === "horizontal") {
                ae = this.elementSize.width;
                ai = af.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                ae = this.elementSize.height;
                ai = af.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            ah = (ai / ae);
            if (ah > 1) {
                ah = 1
            }
            if (ah < 0) {
                ah = 0
            }
            if (this.orientation === "vertical") {
                ah = 1 - ah
            }
            ag = this._valueMax() - this._valueMin();
            aj = this._valueMin() + ah * ag;
            return this._trimAlignValue(aj)
        },
        _start: function (ag, af) {
            var ae = {
                handle: this.handles[af],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                ae.value = this.values(af);
                ae.values = this.values()
            }
            return this._trigger("start", ag, ae)
        },
        _slide: function (ai, ah, ag) {
            var ae, af, aj;
            if (this.options.values && this.options.values.length) {
                ae = this.values(ah ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((ah === 0 && ag > ae) || (ah === 1 && ag < ae))) {
                    ag = ae
                }
                if (ag !== this.values(ah)) {
                    af = this.values();
                    af[ah] = ag;
                    aj = this._trigger("slide", ai, {
                        handle: this.handles[ah],
                        value: ag,
                        values: af
                    });
                    ae = this.values(ah ? 0 : 1);
                    if (aj !== false) {
                        this.values(ah, ag)
                    }
                }
            } else {
                if (ag !== this.value()) {
                    aj = this._trigger("slide", ai, {
                        handle: this.handles[ah],
                        value: ag
                    });
                    if (aj !== false) {
                        this.value(ag)
                    }
                }
            }
        },
        _stop: function (ag, af) {
            var ae = {
                handle: this.handles[af],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                ae.value = this.values(af);
                ae.values = this.values()
            }
            this._trigger("stop", ag, ae)
        },
        _change: function (ag, af) {
            if (!this._keySliding && !this._mouseSliding) {
                var ae = {
                    handle: this.handles[af],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    ae.value = this.values(af);
                    ae.values = this.values()
                }
                this._lastChangedValue = af;
                this._trigger("change", ag, ae)
            }
        },
        value: function (ae) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(ae);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function (af, ai) {
            var ah, ae, ag;
            if (arguments.length > 1) {
                this.options.values[af] = this._trimAlignValue(ai);
                this._refreshValue();
                this._change(null, af);
                return
            }
            if (arguments.length) {
                if (I.isArray(arguments[0])) {
                    ah = this.options.values;
                    ae = arguments[0];
                    for (ag = 0; ag < ah.length; ag += 1) {
                        ah[ag] = this._trimAlignValue(ae[ag]);
                        this._change(null, ag)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(af)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function (af, ag) {
            var ae, ah = 0;
            if (af === "range" && this.options.range === true) {
                if (ag === "min") {
                    this.options.value = this._values(0);
                    this.options.values = null
                } else {
                    if (ag === "max") {
                        this.options.value = this._values(this.options.values.length - 1);
                        this.options.values = null
                    }
                }
            }
            if (I.isArray(this.options.values)) {
                ah = this.options.values.length
            }
            if (af === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!ag)
            }
            this._super(af, ag);
            switch (af) {
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                this.handles.css(ag === "horizontal" ? "bottom" : "left", "");
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (ae = 0; ae < ah; ae += 1) {
                    this._change(null, ae)
                }
                this._animateOff = false;
                break;
            case "min":
            case "max":
                this._animateOff = true;
                this._refreshValue();
                this._animateOff = false;
                break;
            case "range":
                this._animateOff = true;
                this._refresh();
                this._animateOff = false;
                break
            }
        },
        _value: function () {
            var ae = this.options.value;
            ae = this._trimAlignValue(ae);
            return ae
        },
        _values: function (ae) {
            var ah, ag, af;
            if (arguments.length) {
                ah = this.options.values[ae];
                ah = this._trimAlignValue(ah);
                return ah
            } else {
                if (this.options.values && this.options.values.length) {
                    ag = this.options.values.slice();
                    for (af = 0; af < ag.length; af += 1) {
                        ag[af] = this._trimAlignValue(ag[af])
                    }
                    return ag
                } else {
                    return []
                }
            }
        },
        _trimAlignValue: function (ah) {
            if (ah <= this._valueMin()) {
                return this._valueMin()
            }
            if (ah >= this._valueMax()) {
                return this._valueMax()
            }
            var ae = (this.options.step > 0) ? this.options.step : 1,
                ag = (ah - this._valueMin()) % ae,
                af = ah - ag;
            if (Math.abs(ag) * 2 >= ae) {
                af += (ag > 0) ? ae : (-ae)
            }
            return parseFloat(af.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var aj, ai, am, ak, an, ah = this.options.range,
                ag = this.options,
                al = this,
                af = (!this._animateOff) ? ag.animate : false,
                ae = {};
            if (this.options.values && this.options.values.length) {
                this.handles.each(function (ao) {
                    ai = (al.values(ao) - al._valueMin()) / (al._valueMax() - al._valueMin()) * 100;
                    ae[al.orientation === "horizontal" ? "left" : "bottom"] = ai + "%";
                    I(this).stop(1, 1)[af ? "animate" : "css"](ae, ag.animate);
                    if (al.options.range === true) {
                        if (al.orientation === "horizontal") {
                            if (ao === 0) {
                                al.range.stop(1, 1)[af ? "animate" : "css"]({
                                    left: ai + "%"
                                }, ag.animate)
                            }
                            if (ao === 1) {
                                al.range[af ? "animate" : "css"]({
                                    width: (ai - aj) + "%"
                                }, {
                                    queue: false,
                                    duration: ag.animate
                                })
                            }
                        } else {
                            if (ao === 0) {
                                al.range.stop(1, 1)[af ? "animate" : "css"]({
                                    bottom: (ai) + "%"
                                }, ag.animate)
                            }
                            if (ao === 1) {
                                al.range[af ? "animate" : "css"]({
                                    height: (ai - aj) + "%"
                                }, {
                                    queue: false,
                                    duration: ag.animate
                                })
                            }
                        }
                    }
                    aj = ai
                })
            } else {
                am = this.value();
                ak = this._valueMin();
                an = this._valueMax();
                ai = (an !== ak) ? (am - ak) / (an - ak) * 100 : 0;
                ae[this.orientation === "horizontal" ? "left" : "bottom"] = ai + "%";
                this.handle.stop(1, 1)[af ? "animate" : "css"](ae, ag.animate);
                if (ah === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[af ? "animate" : "css"]({
                        width: ai + "%"
                    }, ag.animate)
                }
                if (ah === "max" && this.orientation === "horizontal") {
                    this.range[af ? "animate" : "css"]({
                        width: (100 - ai) + "%"
                    }, {
                        queue: false,
                        duration: ag.animate
                    })
                }
                if (ah === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[af ? "animate" : "css"]({
                        height: ai + "%"
                    }, ag.animate)
                }
                if (ah === "max" && this.orientation === "vertical") {
                    this.range[af ? "animate" : "css"]({
                        height: (100 - ai) + "%"
                    }, {
                        queue: false,
                        duration: ag.animate
                    })
                }
            }
        },
        _handleEvents: {
            keydown: function (ai) {
                var aj, ag, af, ah, ae = I(ai.target).data("ui-slider-handle-index");
                switch (ai.keyCode) {
                case I.ui.keyCode.HOME:
                case I.ui.keyCode.END:
                case I.ui.keyCode.PAGE_UP:
                case I.ui.keyCode.PAGE_DOWN:
                case I.ui.keyCode.UP:
                case I.ui.keyCode.RIGHT:
                case I.ui.keyCode.DOWN:
                case I.ui.keyCode.LEFT:
                    ai.preventDefault();
                    if (!this._keySliding) {
                        this._keySliding = true;
                        I(ai.target).addClass("ui-state-active");
                        aj = this._start(ai, ae);
                        if (aj === false) {
                            return
                        }
                    }
                    break
                }
                ah = this.options.step;
                if (this.options.values && this.options.values.length) {
                    ag = af = this.values(ae)
                } else {
                    ag = af = this.value()
                }
                switch (ai.keyCode) {
                case I.ui.keyCode.HOME:
                    af = this._valueMin();
                    break;
                case I.ui.keyCode.END:
                    af = this._valueMax();
                    break;
                case I.ui.keyCode.PAGE_UP:
                    af = this._trimAlignValue(ag + ((this._valueMax() - this._valueMin()) / this.numPages));
                    break;
                case I.ui.keyCode.PAGE_DOWN:
                    af = this._trimAlignValue(ag - ((this._valueMax() - this._valueMin()) / this.numPages));
                    break;
                case I.ui.keyCode.UP:
                case I.ui.keyCode.RIGHT:
                    if (ag === this._valueMax()) {
                        return
                    }
                    af = this._trimAlignValue(ag + ah);
                    break;
                case I.ui.keyCode.DOWN:
                case I.ui.keyCode.LEFT:
                    if (ag === this._valueMin()) {
                        return
                    }
                    af = this._trimAlignValue(ag - ah);
                    break
                }
                this._slide(ai, ae, af)
            },
            keyup: function (af) {
                var ae = I(af.target).data("ui-slider-handle-index");
                if (this._keySliding) {
                    this._keySliding = false;
                    this._stop(af, ae);
                    this._change(af, ae);
                    I(af.target).removeClass("ui-state-active")
                }
            }
        }
    });
    /*!
     * jQuery UI Sortable 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/sortable/
     */
    var A = I.widget("ui.sortable", I.ui.mouse, {
        version: "1.11.1",
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function (af, ae, ag) {
            return (af >= ae) && (af < (ae + ag))
        },
        _isFloating: function (ae) {
            return (/left|right/).test(ae.css("float")) || (/inline|table-cell/).test(ae.css("display"))
        },
        _create: function () {
            var ae = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? ae.axis === "x" || this._isFloating(this.items[0].item) : false;
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = true
        },
        _setOption: function (ae, af) {
            this._super(ae, af);
            if (ae === "handle") {
                this._setHandleClassName()
            }
        },
        _setHandleClassName: function () {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            I.each(this.items, function () {
                (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            this._mouseDestroy();
            for (var ae = this.items.length - 1; ae >= 0; ae--) {
                this.items[ae].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _mouseCapture: function (ag, ah) {
            var ae = null,
                ai = false,
                af = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type === "static") {
                return false
            }
            this._refreshItems(ag);
            I(ag.target).parents().each(function () {
                if (I.data(this, af.widgetName + "-item") === af) {
                    ae = I(this);
                    return false
                }
            });
            if (I.data(ag.target, af.widgetName + "-item") === af) {
                ae = I(ag.target)
            }
            if (!ae) {
                return false
            }
            if (this.options.handle && !ah) {
                I(this.options.handle, ae).find("*").addBack().each(function () {
                    if (this === ag.target) {
                        ai = true
                    }
                });
                if (!ai) {
                    return false
                }
            }
            this.currentItem = ae;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (ah, ai, af) {
            var ag, ae, aj = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(ah);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            I.extend(this.offset, {
                click: {
                    left: ah.pageX - this.offset.left,
                    top: ah.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(ah);
            this.originalPageX = ah.pageX;
            this.originalPageY = ah.pageY;
            (aj.cursorAt && this._adjustOffsetFromHelper(aj.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] !== this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (aj.containment) {
                this._setContainment()
            }
            if (aj.cursor && aj.cursor !== "auto") {
                ae = this.document.find("body");
                this.storedCursor = ae.css("cursor");
                ae.css("cursor", aj.cursor);
                this.storedStylesheet = I("<style>*{ cursor: " + aj.cursor + " !important; }</style>").appendTo(ae)
            }
            if (aj.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", aj.opacity)
            }
            if (aj.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", aj.zIndex)
            }
            if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", ah, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!af) {
                for (ag = this.containers.length - 1; ag >= 0; ag--) {
                    this.containers[ag]._trigger("activate", ah, this._uiHash(this))
                }
            }
            if (I.ui.ddmanager) {
                I.ui.ddmanager.current = this
            }
            if (I.ui.ddmanager && !aj.dropBehaviour) {
                I.ui.ddmanager.prepareOffsets(this, ah)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(ah);
            return true
        },
        _mouseDrag: function (ai) {
            var ag, ah, af, ak, aj = this.options,
                ae = false;
            this.position = this._generatePosition(ai);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - ai.pageY < aj.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = ae = this.scrollParent[0].scrollTop + aj.scrollSpeed
                    } else {
                        if (ai.pageY - this.overflowOffset.top < aj.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = ae = this.scrollParent[0].scrollTop - aj.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - ai.pageX < aj.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = ae = this.scrollParent[0].scrollLeft + aj.scrollSpeed
                    } else {
                        if (ai.pageX - this.overflowOffset.left < aj.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = ae = this.scrollParent[0].scrollLeft - aj.scrollSpeed
                        }
                    }
                } else {
                    if (ai.pageY - I(document).scrollTop() < aj.scrollSensitivity) {
                        ae = I(document).scrollTop(I(document).scrollTop() - aj.scrollSpeed)
                    } else {
                        if (I(window).height() - (ai.pageY - I(document).scrollTop()) < aj.scrollSensitivity) {
                            ae = I(document).scrollTop(I(document).scrollTop() + aj.scrollSpeed)
                        }
                    }
                    if (ai.pageX - I(document).scrollLeft() < aj.scrollSensitivity) {
                        ae = I(document).scrollLeft(I(document).scrollLeft() - aj.scrollSpeed)
                    } else {
                        if (I(window).width() - (ai.pageX - I(document).scrollLeft()) < aj.scrollSensitivity) {
                            ae = I(document).scrollLeft(I(document).scrollLeft() + aj.scrollSpeed)
                        }
                    }
                }
                if (ae !== false && I.ui.ddmanager && !aj.dropBehaviour) {
                    I.ui.ddmanager.prepareOffsets(this, ai)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (ag = this.items.length - 1; ag >= 0; ag--) {
                ah = this.items[ag];
                af = ah.item[0];
                ak = this._intersectsWithPointer(ah);
                if (!ak) {
                    continue
                }
                if (ah.instance !== this.currentContainer) {
                    continue
                }
                if (af !== this.currentItem[0] && this.placeholder[ak === 1 ? "next" : "prev"]()[0] !== af && !I.contains(this.placeholder[0], af) && (this.options.type === "semi-dynamic" ? !I.contains(this.element[0], af) : true)) {
                    this.direction = ak === 1 ? "down" : "up";
                    if (this.options.tolerance === "pointer" || this._intersectsWithSides(ah)) {
                        this._rearrange(ai, ah)
                    } else {
                        break
                    }
                    this._trigger("change", ai, this._uiHash());
                    break
                }
            }
            this._contactContainers(ai);
            if (I.ui.ddmanager) {
                I.ui.ddmanager.drag(this, ai)
            }
            this._trigger("sort", ai, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (ag, ai) {
            if (!ag) {
                return
            }
            if (I.ui.ddmanager && !this.options.dropBehaviour) {
                I.ui.ddmanager.drop(this, ag)
            }
            if (this.options.revert) {
                var af = this,
                    aj = this.placeholder.offset(),
                    ae = this.options.axis,
                    ah = {};
                if (!ae || ae === "x") {
                    ah.left = aj.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)
                }
                if (!ae || ae === "y") {
                    ah.top = aj.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)
                }
                this.reverting = true;
                I(this.helper).animate(ah, parseInt(this.options.revert, 10) || 500, function () {
                    af._clear(ag)
                })
            } else {
                this._clear(ag, ai)
            }
            return false
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper === "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var ae = this.containers.length - 1; ae >= 0; ae--) {
                    this.containers[ae]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[ae].containerCache.over) {
                        this.containers[ae]._trigger("out", null, this._uiHash(this));
                        this.containers[ae].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                I.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    I(this.domPosition.prev).after(this.currentItem)
                } else {
                    I(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function (ag) {
            var ae = this._getItemsAsjQuery(ag && ag.connected),
                af = [];
            ag = ag || {};
            I(ae).each(function () {
                var ah = (I(ag.item || this).attr(ag.attribute || "id") || "").match(ag.expression || (/(.+)[\-=_](.+)/));
                if (ah) {
                    af.push((ag.key || ah[1] + "[]") + "=" + (ag.key && ag.expression ? ah[1] : ah[2]))
                }
            });
            if (!af.length && ag.key) {
                af.push(ag.key + "=")
            }
            return af.join("&")
        },
        toArray: function (ag) {
            var ae = this._getItemsAsjQuery(ag && ag.connected),
                af = [];
            ag = ag || {};
            ae.each(function () {
                af.push(I(ag.item || this).attr(ag.attribute || "id") || "")
            });
            return af
        },
        _intersectsWith: function (ap) {
            var ag = this.positionAbs.left,
                af = ag + this.helperProportions.width,
                an = this.positionAbs.top,
                am = an + this.helperProportions.height,
                ah = ap.left,
                ae = ah + ap.width,
                aq = ap.top,
                al = aq + ap.height,
                ar = this.offset.click.top,
                ak = this.offset.click.left,
                aj = (this.options.axis === "x") || ((an + ar) > aq && (an + ar) < al),
                ao = (this.options.axis === "y") || ((ag + ak) > ah && (ag + ak) < ae),
                ai = aj && ao;
            if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || (this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > ap[this.floating ? "width" : "height"])) {
                return ai
            } else {
                return (ah < ag + (this.helperProportions.width / 2) && af - (this.helperProportions.width / 2) < ae && aq < an + (this.helperProportions.height / 2) && am - (this.helperProportions.height / 2) < al)
            }
        },
        _intersectsWithPointer: function (ag) {
            var ah = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, ag.top, ag.height),
                af = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, ag.left, ag.width),
                aj = ah && af,
                ae = this._getDragVerticalDirection(),
                ai = this._getDragHorizontalDirection();
            if (!aj) {
                return false
            }
            return this.floating ? (((ai && ai === "right") || ae === "down") ? 2 : 1) : (ae && (ae === "down" ? 2 : 1))
        },
        _intersectsWithSides: function (ah) {
            var af = this._isOverAxis(this.positionAbs.top + this.offset.click.top, ah.top + (ah.height / 2), ah.height),
                ag = this._isOverAxis(this.positionAbs.left + this.offset.click.left, ah.left + (ah.width / 2), ah.width),
                ae = this._getDragVerticalDirection(),
                ai = this._getDragHorizontalDirection();
            if (this.floating && ai) {
                return ((ai === "right" && ag) || (ai === "left" && !ag))
            } else {
                return ae && ((ae === "down" && af) || (ae === "up" && !af))
            }
        },
        _getDragVerticalDirection: function () {
            var ae = this.positionAbs.top - this.lastPositionAbs.top;
            return ae !== 0 && (ae > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var ae = this.positionAbs.left - this.lastPositionAbs.left;
            return ae !== 0 && (ae > 0 ? "right" : "left")
        },
        refresh: function (ae) {
            this._refreshItems(ae);
            this._setHandleClassName();
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var ae = this.options;
            return ae.connectWith.constructor === String ? [ae.connectWith] : ae.connectWith
        },
        _getItemsAsjQuery: function (ae) {
            var ag, af, al, ai, aj = [],
                ah = [],
                ak = this._connectWith();
            if (ak && ae) {
                for (ag = ak.length - 1; ag >= 0; ag--) {
                    al = I(ak[ag]);
                    for (af = al.length - 1; af >= 0; af--) {
                        ai = I.data(al[af], this.widgetFullName);
                        if (ai && ai !== this && !ai.options.disabled) {
                            ah.push([I.isFunction(ai.options.items) ? ai.options.items.call(ai.element) : I(ai.options.items, ai.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), ai])
                        }
                    }
                }
            }
            ah.push([I.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : I(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

            function am() {
                aj.push(this)
            }
            for (ag = ah.length - 1; ag >= 0; ag--) {
                ah[ag][0].each(am)
            }
            return I(aj)
        },
        _removeCurrentsFromItems: function () {
            var ae = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = I.grep(this.items, function (ag) {
                for (var af = 0; af < ae.length; af++) {
                    if (ae[af] === ag.item[0]) {
                        return false
                    }
                }
                return true
            })
        },
        _refreshItems: function (ae) {
            this.items = [];
            this.containers = [this];
            var ai, ag, an, aj, am, af, ap, ao, ak = this.items,
                ah = [[I.isFunction(this.options.items) ? this.options.items.call(this.element[0], ae, {
                    item: this.currentItem
                }) : I(this.options.items, this.element), this]],
                al = this._connectWith();
            if (al && this.ready) {
                for (ai = al.length - 1; ai >= 0; ai--) {
                    an = I(al[ai]);
                    for (ag = an.length - 1; ag >= 0; ag--) {
                        aj = I.data(an[ag], this.widgetFullName);
                        if (aj && aj !== this && !aj.options.disabled) {
                            ah.push([I.isFunction(aj.options.items) ? aj.options.items.call(aj.element[0], ae, {
                                item: this.currentItem
                            }) : I(aj.options.items, aj.element), aj]);
                            this.containers.push(aj)
                        }
                    }
                }
            }
            for (ai = ah.length - 1; ai >= 0; ai--) {
                am = ah[ai][1];
                af = ah[ai][0];
                for (ag = 0, ao = af.length; ag < ao; ag++) {
                    ap = I(af[ag]);
                    ap.data(this.widgetName + "-item", am);
                    ak.push({
                        item: ap,
                        instance: am,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (ae) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            var ag, ah, af, ai;
            for (ag = this.items.length - 1; ag >= 0; ag--) {
                ah = this.items[ag];
                if (ah.instance !== this.currentContainer && this.currentContainer && ah.item[0] !== this.currentItem[0]) {
                    continue
                }
                af = this.options.toleranceElement ? I(this.options.toleranceElement, ah.item) : ah.item;
                if (!ae) {
                    ah.width = af.outerWidth();
                    ah.height = af.outerHeight()
                }
                ai = af.offset();
                ah.left = ai.left;
                ah.top = ai.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (ag = this.containers.length - 1; ag >= 0; ag--) {
                    ai = this.containers[ag].element.offset();
                    this.containers[ag].containerCache.left = ai.left;
                    this.containers[ag].containerCache.top = ai.top;
                    this.containers[ag].containerCache.width = this.containers[ag].element.outerWidth();
                    this.containers[ag].containerCache.height = this.containers[ag].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function (af) {
            af = af || this;
            var ae, ag = af.options;
            if (!ag.placeholder || ag.placeholder.constructor === String) {
                ae = ag.placeholder;
                ag.placeholder = {
                    element: function () {
                        var ai = af.currentItem[0].nodeName.toLowerCase(),
                            ah = I("<" + ai + ">", af.document[0]).addClass(ae || af.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        if (ai === "tr") {
                            af.currentItem.children().each(function () {
                                I("<td>&#160;</td>", af.document[0]).attr("colspan", I(this).attr("colspan") || 1).appendTo(ah)
                            })
                        } else {
                            if (ai === "img") {
                                ah.attr("src", af.currentItem.attr("src"))
                            }
                        }
                        if (!ae) {
                            ah.css("visibility", "hidden")
                        }
                        return ah
                    },
                    update: function (ah, ai) {
                        if (ae && !ag.forcePlaceholderSize) {
                            return
                        }
                        if (!ai.height()) {
                            ai.height(af.currentItem.innerHeight() - parseInt(af.currentItem.css("paddingTop") || 0, 10) - parseInt(af.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!ai.width()) {
                            ai.width(af.currentItem.innerWidth() - parseInt(af.currentItem.css("paddingLeft") || 0, 10) - parseInt(af.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            af.placeholder = I(ag.placeholder.element.call(af.element, af.currentItem));
            af.currentItem.after(af.placeholder);
            ag.placeholder.update(af, af.placeholder)
        },
        _contactContainers: function (ae) {
            var aj, ah, an, ak, al, ap, aq, ai, am, ag, af = null,
                ao = null;
            for (aj = this.containers.length - 1; aj >= 0; aj--) {
                if (I.contains(this.currentItem[0], this.containers[aj].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[aj].containerCache)) {
                    if (af && I.contains(this.containers[aj].element[0], af.element[0])) {
                        continue
                    }
                    af = this.containers[aj];
                    ao = aj
                } else {
                    if (this.containers[aj].containerCache.over) {
                        this.containers[aj]._trigger("out", ae, this._uiHash(this));
                        this.containers[aj].containerCache.over = 0
                    }
                }
            }
            if (!af) {
                return
            }
            if (this.containers.length === 1) {
                if (!this.containers[ao].containerCache.over) {
                    this.containers[ao]._trigger("over", ae, this._uiHash(this));
                    this.containers[ao].containerCache.over = 1
                }
            } else {
                an = 10000;
                ak = null;
                am = af.floating || this._isFloating(this.currentItem);
                al = am ? "left" : "top";
                ap = am ? "width" : "height";
                ag = am ? "clientX" : "clientY";
                for (ah = this.items.length - 1; ah >= 0; ah--) {
                    if (!I.contains(this.containers[ao].element[0], this.items[ah].item[0])) {
                        continue
                    }
                    if (this.items[ah].item[0] === this.currentItem[0]) {
                        continue
                    }
                    aq = this.items[ah].item.offset()[al];
                    ai = false;
                    if (ae[ag] - aq > this.items[ah][ap] / 2) {
                        ai = true
                    }
                    if (Math.abs(ae[ag] - aq) < an) {
                        an = Math.abs(ae[ag] - aq);
                        ak = this.items[ah];
                        this.direction = ai ? "up" : "down"
                    }
                }
                if (!ak && !this.options.dropOnEmpty) {
                    return
                }
                if (this.currentContainer === this.containers[ao]) {
                    return
                }
                ak ? this._rearrange(ae, ak, null, true) : this._rearrange(ae, null, this.containers[ao].element, true);
                this._trigger("change", ae, this._uiHash());
                this.containers[ao]._trigger("change", ae, this._uiHash(this));
                this.currentContainer = this.containers[ao];
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[ao]._trigger("over", ae, this._uiHash(this));
                this.containers[ao].containerCache.over = 1
            }
        },
        _createHelper: function (af) {
            var ag = this.options,
                ae = I.isFunction(ag.helper) ? I(ag.helper.apply(this.element[0], [af, this.currentItem])) : (ag.helper === "clone" ? this.currentItem.clone() : this.currentItem);
            if (!ae.parents("body").length) {
                I(ag.appendTo !== "parent" ? ag.appendTo : this.currentItem[0].parentNode)[0].appendChild(ae[0])
            }
            if (ae[0] === this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (!ae[0].style.width || ag.forceHelperSize) {
                ae.width(this.currentItem.width())
            }
            if (!ae[0].style.height || ag.forceHelperSize) {
                ae.height(this.currentItem.height())
            }
            return ae
        },
        _adjustOffsetFromHelper: function (ae) {
            if (typeof ae === "string") {
                ae = ae.split(" ")
            }
            if (I.isArray(ae)) {
                ae = {
                    left: +ae[0],
                    top: +ae[1] || 0
                }
            }
            if ("left" in ae) {
                this.offset.click.left = ae.left + this.margins.left
            }
            if ("right" in ae) {
                this.offset.click.left = this.helperProportions.width - ae.right + this.margins.left
            }
            if ("top" in ae) {
                this.offset.click.top = ae.top + this.margins.top
            }
            if ("bottom" in ae) {
                this.offset.click.top = this.helperProportions.height - ae.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var ae = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && I.contains(this.scrollParent[0], this.offsetParent[0])) {
                ae.left += this.scrollParent.scrollLeft();
                ae.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && I.ui.ie)) {
                ae = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: ae.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: ae.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition === "relative") {
                var ae = this.currentItem.position();
                return {
                    top: ae.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: ae.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var af, ah, ae, ag = this.options;
            if (ag.containment === "parent") {
                ag.containment = this.helper[0].parentNode
            }
            if (ag.containment === "document" || ag.containment === "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, I(ag.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (I(ag.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(ag.containment)) {
                af = I(ag.containment)[0];
                ah = I(ag.containment).offset();
                ae = (I(af).css("overflow") !== "hidden");
                this.containment = [ah.left + (parseInt(I(af).css("borderLeftWidth"), 10) || 0) + (parseInt(I(af).css("paddingLeft"), 10) || 0) - this.margins.left, ah.top + (parseInt(I(af).css("borderTopWidth"), 10) || 0) + (parseInt(I(af).css("paddingTop"), 10) || 0) - this.margins.top, ah.left + (ae ? Math.max(af.scrollWidth, af.offsetWidth) : af.offsetWidth) - (parseInt(I(af).css("borderLeftWidth"), 10) || 0) - (parseInt(I(af).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, ah.top + (ae ? Math.max(af.scrollHeight, af.offsetHeight) : af.offsetHeight) - (parseInt(I(af).css("borderTopWidth"), 10) || 0) - (parseInt(I(af).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (ag, ai) {
            if (!ai) {
                ai = this.position
            }
            var af = ag === "absolute" ? 1 : -1,
                ae = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && I.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                ah = (/(html|body)/i).test(ae[0].tagName);
            return {
                top: (ai.top + this.offset.relative.top * af + this.offset.parent.top * af - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (ah ? 0 : ae.scrollTop())) * af)),
                left: (ai.left + this.offset.relative.left * af + this.offset.parent.left * af - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : ah ? 0 : ae.scrollLeft()) * af))
            }
        },
        _generatePosition: function (ah) {
            var aj, ai, ak = this.options,
                ag = ah.pageX,
                af = ah.pageY,
                ae = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && I.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                al = (/(html|body)/i).test(ae[0].tagName);
            if (this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            if (this.originalPosition) {
                if (this.containment) {
                    if (ah.pageX - this.offset.click.left < this.containment[0]) {
                        ag = this.containment[0] + this.offset.click.left
                    }
                    if (ah.pageY - this.offset.click.top < this.containment[1]) {
                        af = this.containment[1] + this.offset.click.top
                    }
                    if (ah.pageX - this.offset.click.left > this.containment[2]) {
                        ag = this.containment[2] + this.offset.click.left
                    }
                    if (ah.pageY - this.offset.click.top > this.containment[3]) {
                        af = this.containment[3] + this.offset.click.top
                    }
                }
                if (ak.grid) {
                    aj = this.originalPageY + Math.round((af - this.originalPageY) / ak.grid[1]) * ak.grid[1];
                    af = this.containment ? ((aj - this.offset.click.top >= this.containment[1] && aj - this.offset.click.top <= this.containment[3]) ? aj : ((aj - this.offset.click.top >= this.containment[1]) ? aj - ak.grid[1] : aj + ak.grid[1])) : aj;
                    ai = this.originalPageX + Math.round((ag - this.originalPageX) / ak.grid[0]) * ak.grid[0];
                    ag = this.containment ? ((ai - this.offset.click.left >= this.containment[0] && ai - this.offset.click.left <= this.containment[2]) ? ai : ((ai - this.offset.click.left >= this.containment[0]) ? ai - ak.grid[0] : ai + ak.grid[0])) : ai
                }
            }
            return {
                top: (af - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (al ? 0 : ae.scrollTop())))),
                left: (ag - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : al ? 0 : ae.scrollLeft())))
            }
        },
        _rearrange: function (ai, ah, af, ag) {
            af ? af[0].appendChild(this.placeholder[0]) : ah.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? ah.item[0] : ah.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var ae = this.counter;
            this._delay(function () {
                if (ae === this.counter) {
                    this.refreshPositions(!ag)
                }
            })
        },
        _clear: function (af, ah) {
            this.reverting = false;
            var ae, ai = [];
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (ae in this._storedCSS) {
                    if (this._storedCSS[ae] === "auto" || this._storedCSS[ae] === "static") {
                        this._storedCSS[ae] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !ah) {
                ai.push(function (aj) {
                    this._trigger("receive", aj, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !ah) {
                ai.push(function (aj) {
                    this._trigger("update", aj, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!ah) {
                    ai.push(function (aj) {
                        this._trigger("remove", aj, this._uiHash())
                    });
                    ai.push((function (aj) {
                        return function (ak) {
                            aj._trigger("receive", ak, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer));
                    ai.push((function (aj) {
                        return function (ak) {
                            aj._trigger("update", ak, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer))
                }
            }

            function ag(al, aj, ak) {
                return function (am) {
                    ak._trigger(al, am, aj._uiHash(aj))
                }
            }
            for (ae = this.containers.length - 1; ae >= 0; ae--) {
                if (!ah) {
                    ai.push(ag("deactivate", this, this.containers[ae]))
                }
                if (this.containers[ae].containerCache.over) {
                    ai.push(ag("out", this, this.containers[ae]));
                    this.containers[ae].containerCache.over = 0
                }
            }
            if (this.storedCursor) {
                this.document.find("body").css("cursor", this.storedCursor);
                this.storedStylesheet.remove()
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!ah) {
                    this._trigger("beforeStop", af, this._uiHash());
                    for (ae = 0; ae < ai.length; ae++) {
                        ai[ae].call(this, af)
                    }
                    this._trigger("stop", af, this._uiHash())
                }
                this.fromOutside = false;
                return false
            }
            if (!ah) {
                this._trigger("beforeStop", af, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] !== this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!ah) {
                for (ae = 0; ae < ai.length; ae++) {
                    ai[ae].call(this, af)
                }
                this._trigger("stop", af, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            if (I.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function (ae) {
            var af = ae || this;
            return {
                helper: af.helper,
                placeholder: af.placeholder || I([]),
                position: af.position,
                originalPosition: af.originalPosition,
                offset: af.positionAbs,
                item: af.currentItem,
                sender: ae ? ae.element : null
            }
        }
    });
    /*!
     * jQuery UI Spinner 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/spinner/
     */
    function u(ae) {
        return function () {
            var af = this.element.val();
            ae.apply(this, arguments);
            this._refresh();
            if (af !== this.element.val()) {
                this._trigger("change")
            }
        }
    }
    var K = I.widget("ui.spinner", {
        version: "1.11.1",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: true,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step", this.options.step);
            if (this.value() !== "") {
                this._value(this.element.val(), true)
            }
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var ae = {},
                af = this.element;
            I.each(["min", "max", "step"], function (ag, ah) {
                var ai = af.attr(ah);
                if (ai !== undefined && ai.length) {
                    ae[ah] = ai
                }
            });
            return ae
        },
        _events: {
            keydown: function (ae) {
                if (this._start(ae) && this._keydown(ae)) {
                    ae.preventDefault()
                }
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val()
            },
            blur: function (ae) {
                if (this.cancelBlur) {
                    delete this.cancelBlur;
                    return
                }
                this._stop();
                this._refresh();
                if (this.previous !== this.element.val()) {
                    this._trigger("change", ae)
                }
            },
            mousewheel: function (ae, af) {
                if (!af) {
                    return
                }
                if (!this.spinning && !this._start(ae)) {
                    return false
                }
                this._spin((af > 0 ? 1 : -1) * this.options.step, ae);
                clearTimeout(this.mousewheelTimer);
                this.mousewheelTimer = this._delay(function () {
                    if (this.spinning) {
                        this._stop(ae)
                    }
                }, 100);
                ae.preventDefault()
            },
            "mousedown .ui-spinner-button": function (af) {
                var ae;
                ae = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();

                function ag() {
                    var ah = this.element[0] === this.document[0].activeElement;
                    if (!ah) {
                        this.element.focus();
                        this.previous = ae;
                        this._delay(function () {
                            this.previous = ae
                        })
                    }
                }
                af.preventDefault();
                ag.call(this);
                this.cancelBlur = true;
                this._delay(function () {
                    delete this.cancelBlur;
                    ag.call(this)
                });
                if (this._start(af) === false) {
                    return
                }
                this._repeat(null, I(af.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, af)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function (ae) {
                if (!I(ae.currentTarget).hasClass("ui-state-active")) {
                    return
                }
                if (this._start(ae) === false) {
                    return false
                }
                this._repeat(null, I(ae.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, ae)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var ae = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton");
            this.buttons = ae.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
            if (this.buttons.height() > Math.ceil(ae.height() * 0.5) && ae.height() > 0) {
                ae.height(ae.height())
            }
            if (this.options.disabled) {
                this.disable()
            }
        },
        _keydown: function (af) {
            var ae = this.options,
                ag = I.ui.keyCode;
            switch (af.keyCode) {
            case ag.UP:
                this._repeat(null, 1, af);
                return true;
            case ag.DOWN:
                this._repeat(null, -1, af);
                return true;
            case ag.PAGE_UP:
                this._repeat(null, ae.page, af);
                return true;
            case ag.PAGE_DOWN:
                this._repeat(null, -ae.page, af);
                return true
            }
            return false
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function (ae) {
            if (!this.spinning && this._trigger("start", ae) === false) {
                return false
            }
            if (!this.counter) {
                this.counter = 1
            }
            this.spinning = true;
            return true
        },
        _repeat: function (af, ae, ag) {
            af = af || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                this._repeat(40, ae, ag)
            }, af);
            this._spin(ae * this.options.step, ag)
        },
        _spin: function (af, ae) {
            var ag = this.value() || 0;
            if (!this.counter) {
                this.counter = 1
            }
            ag = this._adjustValue(ag + af * this._increment(this.counter));
            if (!this.spinning || this._trigger("spin", ae, {
                    value: ag
                }) !== false) {
                this._value(ag);
                this.counter++
            }
        },
        _increment: function (ae) {
            var af = this.options.incremental;
            if (af) {
                return I.isFunction(af) ? af(ae) : Math.floor(ae * ae * ae / 50000 - ae * ae / 500 + 17 * ae / 200 + 1)
            }
            return 1
        },
        _precision: function () {
            var ae = this._precisionOf(this.options.step);
            if (this.options.min !== null) {
                ae = Math.max(ae, this._precisionOf(this.options.min))
            }
            return ae
        },
        _precisionOf: function (af) {
            var ag = af.toString(),
                ae = ag.indexOf(".");
            return ae === -1 ? 0 : ag.length - ae - 1
        },
        _adjustValue: function (ag) {
            var af, ah, ae = this.options;
            af = ae.min !== null ? ae.min : 0;
            ah = ag - af;
            ah = Math.round(ah / ae.step) * ae.step;
            ag = af + ah;
            ag = parseFloat(ag.toFixed(this._precision()));
            if (ae.max !== null && ag > ae.max) {
                return ae.max
            }
            if (ae.min !== null && ag < ae.min) {
                return ae.min
            }
            return ag
        },
        _stop: function (ae) {
            if (!this.spinning) {
                return
            }
            clearTimeout(this.timer);
            clearTimeout(this.mousewheelTimer);
            this.counter = 0;
            this.spinning = false;
            this._trigger("stop", ae)
        },
        _setOption: function (ae, af) {
            if (ae === "culture" || ae === "numberFormat") {
                var ag = this._parse(this.element.val());
                this.options[ae] = af;
                this.element.val(this._format(ag));
                return
            }
            if (ae === "max" || ae === "min" || ae === "step") {
                if (typeof af === "string") {
                    af = this._parse(af)
                }
            }
            if (ae === "icons") {
                this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(af.up);
                this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(af.down)
            }
            this._super(ae, af);
            if (ae === "disabled") {
                this.widget().toggleClass("ui-state-disabled", !!af);
                this.element.prop("disabled", !!af);
                this.buttons.button(af ? "disable" : "enable")
            }
        },
        _setOptions: u(function (ae) {
            this._super(ae)
        }),
        _parse: function (ae) {
            if (typeof ae === "string" && ae !== "") {
                ae = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(ae, 10, this.options.culture) : +ae
            }
            return ae === "" || isNaN(ae) ? null : ae
        },
        _format: function (ae) {
            if (ae === "") {
                return ""
            }
            return window.Globalize && this.options.numberFormat ? Globalize.format(ae, this.options.numberFormat, this.options.culture) : ae
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function () {
            var ae = this.value();
            if (ae === null) {
                return false
            }
            return ae === this._adjustValue(ae)
        },
        _value: function (ag, ae) {
            var af;
            if (ag !== "") {
                af = this._parse(ag);
                if (af !== null) {
                    if (!ae) {
                        af = this._adjustValue(af)
                    }
                    ag = this._format(af)
                }
            }
            this.element.val(ag);
            this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: u(function (ae) {
            this._stepUp(ae)
        }),
        _stepUp: function (ae) {
            if (this._start()) {
                this._spin((ae || 1) * this.options.step);
                this._stop()
            }
        },
        stepDown: u(function (ae) {
            this._stepDown(ae)
        }),
        _stepDown: function (ae) {
            if (this._start()) {
                this._spin((ae || 1) * -this.options.step);
                this._stop()
            }
        },
        pageUp: u(function (ae) {
            this._stepUp((ae || 1) * this.options.page)
        }),
        pageDown: u(function (ae) {
            this._stepDown((ae || 1) * this.options.page)
        }),
        value: function (ae) {
            if (!arguments.length) {
                return this._parse(this.element.val())
            }
            u(this._value).call(this, ae)
        },
        widget: function () {
            return this.uiSpinner
        }
    });
    /*!
     * jQuery UI Tabs 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/tabs/
     */
    var j = I.widget("ui.tabs", {
        version: "1.11.1",
        delay: 300,
        options: {
            active: null,
            collapsible: false,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: (function () {
            var ae = /#.*$/;
            return function (ag) {
                var ai, ah;
                ag = ag.cloneNode(false);
                ai = ag.href.replace(ae, "");
                ah = location.href.replace(ae, "");
                try {
                    ai = decodeURIComponent(ai)
                } catch (af) {}
                try {
                    ah = decodeURIComponent(ah)
                } catch (af) {}
                return ag.hash.length > 1 && ai === ah
            }
        })(),
        _create: function () {
            var af = this,
                ae = this.options;
            this.running = false;
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", ae.collapsible);
            this._processTabs();
            ae.active = this._initialActive();
            if (I.isArray(ae.disabled)) {
                ae.disabled = I.unique(ae.disabled.concat(I.map(this.tabs.filter(".ui-state-disabled"), function (ag) {
                    return af.tabs.index(ag)
                }))).sort()
            }
            if (this.options.active !== false && this.anchors.length) {
                this.active = this._findActive(ae.active)
            } else {
                this.active = I()
            }
            this._refresh();
            if (this.active.length) {
                this.load(ae.active)
            }
        },
        _initialActive: function () {
            var af = this.options.active,
                ae = this.options.collapsible,
                ag = location.hash.substring(1);
            if (af === null) {
                if (ag) {
                    this.tabs.each(function (ah, ai) {
                        if (I(ai).attr("aria-controls") === ag) {
                            af = ah;
                            return false
                        }
                    })
                }
                if (af === null) {
                    af = this.tabs.index(this.tabs.filter(".ui-tabs-active"))
                }
                if (af === null || af === -1) {
                    af = this.tabs.length ? 0 : false
                }
            }
            if (af !== false) {
                af = this.tabs.index(this.tabs.eq(af));
                if (af === -1) {
                    af = ae ? false : 0
                }
            }
            if (!ae && af === false && this.anchors.length) {
                af = 0
            }
            return af
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: !this.active.length ? I() : this._getPanelForTab(this.active)
            }
        },
        _tabKeydown: function (ag) {
            var af = I(this.document[0].activeElement).closest("li"),
                ae = this.tabs.index(af),
                ah = true;
            if (this._handlePageNav(ag)) {
                return
            }
            switch (ag.keyCode) {
            case I.ui.keyCode.RIGHT:
            case I.ui.keyCode.DOWN:
                ae++;
                break;
            case I.ui.keyCode.UP:
            case I.ui.keyCode.LEFT:
                ah = false;
                ae--;
                break;
            case I.ui.keyCode.END:
                ae = this.anchors.length - 1;
                break;
            case I.ui.keyCode.HOME:
                ae = 0;
                break;
            case I.ui.keyCode.SPACE:
                ag.preventDefault();
                clearTimeout(this.activating);
                this._activate(ae);
                return;
            case I.ui.keyCode.ENTER:
                ag.preventDefault();
                clearTimeout(this.activating);
                this._activate(ae === this.options.active ? false : ae);
                return;
            default:
                return
            }
            ag.preventDefault();
            clearTimeout(this.activating);
            ae = this._focusNextTab(ae, ah);
            if (!ag.ctrlKey) {
                af.attr("aria-selected", "false");
                this.tabs.eq(ae).attr("aria-selected", "true");
                this.activating = this._delay(function () {
                    this.option("active", ae)
                }, this.delay)
            }
        },
        _panelKeydown: function (ae) {
            if (this._handlePageNav(ae)) {
                return
            }
            if (ae.ctrlKey && ae.keyCode === I.ui.keyCode.UP) {
                ae.preventDefault();
                this.active.focus()
            }
        },
        _handlePageNav: function (ae) {
            if (ae.altKey && ae.keyCode === I.ui.keyCode.PAGE_UP) {
                this._activate(this._focusNextTab(this.options.active - 1, false));
                return true
            }
            if (ae.altKey && ae.keyCode === I.ui.keyCode.PAGE_DOWN) {
                this._activate(this._focusNextTab(this.options.active + 1, true));
                return true
            }
        },
        _findNextTab: function (af, ag) {
            var ae = this.tabs.length - 1;

            function ah() {
                if (af > ae) {
                    af = 0
                }
                if (af < 0) {
                    af = ae
                }
                return af
            }
            while (I.inArray(ah(), this.options.disabled) !== -1) {
                af = ag ? af + 1 : af - 1
            }
            return af
        },
        _focusNextTab: function (ae, af) {
            ae = this._findNextTab(ae, af);
            this.tabs.eq(ae).focus();
            return ae
        },
        _setOption: function (ae, af) {
            if (ae === "active") {
                this._activate(af);
                return
            }
            if (ae === "disabled") {
                this._setupDisabled(af);
                return
            }
            this._super(ae, af);
            if (ae === "collapsible") {
                this.element.toggleClass("ui-tabs-collapsible", af);
                if (!af && this.options.active === false) {
                    this._activate(0)
                }
            }
            if (ae === "event") {
                this._setupEvents(af)
            }
            if (ae === "heightStyle") {
                this._setupHeightStyle(af)
            }
        },
        _sanitizeSelector: function (ae) {
            return ae ? ae.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var af = this.options,
                ae = this.tablist.children(":has(a[href])");
            af.disabled = I.map(ae.filter(".ui-state-disabled"), function (ag) {
                return ae.index(ag)
            });
            this._processTabs();
            if (af.active === false || !this.anchors.length) {
                af.active = false;
                this.active = I()
            } else {
                if (this.active.length && !I.contains(this.tablist[0], this.active[0])) {
                    if (this.tabs.length === af.disabled.length) {
                        af.active = false;
                        this.active = I()
                    } else {
                        this._activate(this._findNextTab(Math.max(0, af.active - 1), false))
                    }
                } else {
                    af.active = this.tabs.index(this.active)
                }
            }
            this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            });
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            });
            if (!this.active.length) {
                this.tabs.eq(0).attr("tabIndex", 0)
            } else {
                this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                });
                this._getPanelForTab(this.active).show().attr({
                    "aria-hidden": "false"
                })
            }
        },
        _processTabs: function () {
            var ae = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function (af) {
                if (I(this).is(".ui-state-disabled")) {
                    af.preventDefault()
                }
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                if (I(this).closest("li").is(".ui-state-disabled")) {
                    this.blur()
                }
            });
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            });
            this.anchors = this.tabs.map(function () {
                return I("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            });
            this.panels = I();
            this.anchors.each(function (ak, ai) {
                var af, ag, aj, ah = I(ai).uniqueId().attr("id"),
                    al = I(ai).closest("li"),
                    am = al.attr("aria-controls");
                if (ae._isLocal(ai)) {
                    af = ai.hash;
                    aj = af.substring(1);
                    ag = ae.element.find(ae._sanitizeSelector(af))
                } else {
                    aj = al.attr("aria-controls") || I({}).uniqueId()[0].id;
                    af = "#" + aj;
                    ag = ae.element.find(af);
                    if (!ag.length) {
                        ag = ae._createPanel(aj);
                        ag.insertAfter(ae.panels[ak - 1] || ae.tablist)
                    }
                    ag.attr("aria-live", "polite")
                }
                if (ag.length) {
                    ae.panels = ae.panels.add(ag)
                }
                if (am) {
                    al.data("ui-tabs-aria-controls", am)
                }
                al.attr({
                    "aria-controls": aj,
                    "aria-labelledby": ah
                });
                ag.attr("aria-labelledby", ah)
            });
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function () {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (ae) {
            return I("<div>").attr("id", ae).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", true)
        },
        _setupDisabled: function (ag) {
            if (I.isArray(ag)) {
                if (!ag.length) {
                    ag = false
                } else {
                    if (ag.length === this.anchors.length) {
                        ag = true
                    }
                }
            }
            for (var af = 0, ae;
                (ae = this.tabs[af]); af++) {
                if (ag === true || I.inArray(af, ag) !== -1) {
                    I(ae).addClass("ui-state-disabled").attr("aria-disabled", "true")
                } else {
                    I(ae).removeClass("ui-state-disabled").removeAttr("aria-disabled")
                }
            }
            this.options.disabled = ag
        },
        _setupEvents: function (af) {
            var ae = {};
            if (af) {
                I.each(af.split(" "), function (ah, ag) {
                    ae[ag] = "_eventHandler"
                })
            }
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(true, this.anchors, {
                click: function (ag) {
                    ag.preventDefault()
                }
            });
            this._on(this.anchors, ae);
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            });
            this._on(this.panels, {
                keydown: "_panelKeydown"
            });
            this._focusable(this.tabs);
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (ae) {
            var ag, af = this.element.parent();
            if (ae === "fill") {
                ag = af.height();
                ag -= this.element.outerHeight() - this.element.height();
                this.element.siblings(":visible").each(function () {
                    var ai = I(this),
                        ah = ai.css("position");
                    if (ah === "absolute" || ah === "fixed") {
                        return
                    }
                    ag -= ai.outerHeight(true)
                });
                this.element.children().not(this.panels).each(function () {
                    ag -= I(this).outerHeight(true)
                });
                this.panels.each(function () {
                    I(this).height(Math.max(0, ag - I(this).innerHeight() + I(this).height()))
                }).css("overflow", "auto")
            } else {
                if (ae === "auto") {
                    ag = 0;
                    this.panels.each(function () {
                        ag = Math.max(ag, I(this).height("").height())
                    }).height(ag)
                }
            }
        },
        _eventHandler: function (ae) {
            var an = this.options,
                ai = this.active,
                aj = I(ae.currentTarget),
                ah = aj.closest("li"),
                al = ah[0] === ai[0],
                af = al && an.collapsible,
                ag = af ? I() : this._getPanelForTab(ah),
                ak = !ai.length ? I() : this._getPanelForTab(ai),
                am = {
                    oldTab: ai,
                    oldPanel: ak,
                    newTab: af ? I() : ah,
                    newPanel: ag
                };
            ae.preventDefault();
            if (ah.hasClass("ui-state-disabled") || ah.hasClass("ui-tabs-loading") || this.running || (al && !an.collapsible) || (this._trigger("beforeActivate", ae, am) === false)) {
                return
            }
            an.active = af ? false : this.tabs.index(ah);
            this.active = al ? I() : ah;
            if (this.xhr) {
                this.xhr.abort()
            }
            if (!ak.length && !ag.length) {
                I.error("jQuery UI Tabs: Mismatching fragment identifier.")
            }
            if (ag.length) {
                this.load(this.tabs.index(ah), ae)
            }
            this._toggle(ae, am)
        },
        _toggle: function (ak, aj) {
            var ai = this,
                ae = aj.newPanel,
                ah = aj.oldPanel;
            this.running = true;

            function ag() {
                ai.running = false;
                ai._trigger("activate", ak, aj)
            }

            function af() {
                aj.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                if (ae.length && ai.options.show) {
                    ai._show(ae, ai.options.show, ag)
                } else {
                    ae.show();
                    ag()
                }
            }
            if (ah.length && this.options.hide) {
                this._hide(ah, this.options.hide, function () {
                    aj.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                    af()
                })
            } else {
                aj.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                ah.hide();
                af()
            }
            ah.attr("aria-hidden", "true");
            aj.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            });
            if (ae.length && ah.length) {
                aj.oldTab.attr("tabIndex", -1)
            } else {
                if (ae.length) {
                    this.tabs.filter(function () {
                        return I(this).attr("tabIndex") === 0
                    }).attr("tabIndex", -1)
                }
            }
            ae.attr("aria-hidden", "false");
            aj.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function (af) {
            var ae, ag = this._findActive(af);
            if (ag[0] === this.active[0]) {
                return
            }
            if (!ag.length) {
                ag = this.active
            }
            ae = ag.find(".ui-tabs-anchor")[0];
            this._eventHandler({
                target: ae,
                currentTarget: ae,
                preventDefault: I.noop
            })
        },
        _findActive: function (ae) {
            return ae === false ? I() : this.tabs.eq(ae)
        },
        _getIndex: function (ae) {
            if (typeof ae === "string") {
                ae = this.anchors.index(this.anchors.filter("[href$='" + ae + "']"))
            }
            return ae
        },
        _destroy: function () {
            if (this.xhr) {
                this.xhr.abort()
            }
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
            this.tablist.unbind(this.eventNamespace);
            this.tabs.add(this.panels).each(function () {
                if (I.data(this, "ui-tabs-destroy")) {
                    I(this).remove()
                } else {
                    I(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }
            });
            this.tabs.each(function () {
                var ae = I(this),
                    af = ae.data("ui-tabs-aria-controls");
                if (af) {
                    ae.attr("aria-controls", af).removeData("ui-tabs-aria-controls")
                } else {
                    ae.removeAttr("aria-controls")
                }
            });
            this.panels.show();
            if (this.options.heightStyle !== "content") {
                this.panels.css("height", "")
            }
        },
        enable: function (ae) {
            var af = this.options.disabled;
            if (af === false) {
                return
            }
            if (ae === undefined) {
                af = false
            } else {
                ae = this._getIndex(ae);
                if (I.isArray(af)) {
                    af = I.map(af, function (ag) {
                        return ag !== ae ? ag : null
                    })
                } else {
                    af = I.map(this.tabs, function (ag, ah) {
                        return ah !== ae ? ah : null
                    })
                }
            }
            this._setupDisabled(af)
        },
        disable: function (ae) {
            var af = this.options.disabled;
            if (af === true) {
                return
            }
            if (ae === undefined) {
                af = true
            } else {
                ae = this._getIndex(ae);
                if (I.inArray(ae, af) !== -1) {
                    return
                }
                if (I.isArray(af)) {
                    af = I.merge([ae], af).sort()
                } else {
                    af = [ae]
                }
            }
            this._setupDisabled(af)
        },
        load: function (ag, ak) {
            ag = this._getIndex(ag);
            var aj = this,
                ah = this.tabs.eq(ag),
                af = ah.find(".ui-tabs-anchor"),
                ae = this._getPanelForTab(ah),
                ai = {
                    tab: ah,
                    panel: ae
                };
            if (this._isLocal(af[0])) {
                return
            }
            this.xhr = I.ajax(this._ajaxSettings(af, ak, ai));
            if (this.xhr && this.xhr.statusText !== "canceled") {
                ah.addClass("ui-tabs-loading");
                ae.attr("aria-busy", "true");
                this.xhr.success(function (al) {
                    setTimeout(function () {
                        ae.html(al);
                        aj._trigger("load", ak, ai)
                    }, 1)
                }).complete(function (am, al) {
                    setTimeout(function () {
                        if (al === "abort") {
                            aj.panels.stop(false, true)
                        }
                        ah.removeClass("ui-tabs-loading");
                        ae.removeAttr("aria-busy");
                        if (am === aj.xhr) {
                            delete aj.xhr
                        }
                    }, 1)
                })
            }
        },
        _ajaxSettings: function (ae, ah, ag) {
            var af = this;
            return {
                url: ae.attr("href"),
                beforeSend: function (aj, ai) {
                    return af._trigger("beforeLoad", ah, I.extend({
                        jqXHR: aj,
                        ajaxSettings: ai
                    }, ag))
                }
            }
        },
        _getPanelForTab: function (ae) {
            var af = I(ae).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + af))
        }
    });
    /*!
     * jQuery UI Tooltip 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/tooltip/
     */
    var L = I.widget("ui.tooltip", {
        version: "1.11.1",
        options: {
            content: function () {
                var ae = I(this).attr("title") || "";
                return I("<a>").text(ae).html()
            },
            hide: true,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: true,
            tooltipClass: null,
            track: false,
            close: null,
            open: null
        },
        _addDescribedBy: function (af, ag) {
            var ae = (af.attr("aria-describedby") || "").split(/\s+/);
            ae.push(ag);
            af.data("ui-tooltip-id", ag).attr("aria-describedby", I.trim(ae.join(" ")))
        },
        _removeDescribedBy: function (ag) {
            var ah = ag.data("ui-tooltip-id"),
                af = (ag.attr("aria-describedby") || "").split(/\s+/),
                ae = I.inArray(ah, af);
            if (ae !== -1) {
                af.splice(ae, 1)
            }
            ag.removeData("ui-tooltip-id");
            af = I.trim(af.join(" "));
            if (af) {
                ag.attr("aria-describedby", af)
            } else {
                ag.removeAttr("aria-describedby")
            }
        },
        _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.tooltips = {};
            this.parents = {};
            if (this.options.disabled) {
                this._disable()
            }
            this.liveRegion = I("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
        },
        _setOption: function (ae, ag) {
            var af = this;
            if (ae === "disabled") {
                this[ag ? "_disable" : "_enable"]();
                this.options[ae] = ag;
                return
            }
            this._super(ae, ag);
            if (ae === "content") {
                I.each(this.tooltips, function (ai, ah) {
                    af._updateContent(ah)
                })
            }
        },
        _disable: function () {
            var ae = this;
            I.each(this.tooltips, function (ah, af) {
                var ag = I.Event("blur");
                ag.target = ag.currentTarget = af[0];
                ae.close(ag, true)
            });
            this.element.find(this.options.items).addBack().each(function () {
                var af = I(this);
                if (af.is("[title]")) {
                    af.data("ui-tooltip-title", af.attr("title")).removeAttr("title")
                }
            })
        },
        _enable: function () {
            this.element.find(this.options.items).addBack().each(function () {
                var ae = I(this);
                if (ae.data("ui-tooltip-title")) {
                    ae.attr("title", ae.data("ui-tooltip-title"))
                }
            })
        },
        open: function (af) {
            var ae = this,
                ag = I(af ? af.target : this.element).closest(this.options.items);
            if (!ag.length || ag.data("ui-tooltip-id")) {
                return
            }
            if (ag.attr("title")) {
                ag.data("ui-tooltip-title", ag.attr("title"))
            }
            ag.data("ui-tooltip-open", true);
            if (af && af.type === "mouseover") {
                ag.parents().each(function () {
                    var ai = I(this),
                        ah;
                    if (ai.data("ui-tooltip-open")) {
                        ah = I.Event("blur");
                        ah.target = ah.currentTarget = this;
                        ae.close(ah, true)
                    }
                    if (ai.attr("title")) {
                        ai.uniqueId();
                        ae.parents[this.id] = {
                            element: this,
                            title: ai.attr("title")
                        };
                        ai.attr("title", "")
                    }
                })
            }
            this._updateContent(ag, af)
        },
        _updateContent: function (aj, ai) {
            var ah, ae = this.options.content,
                ag = this,
                af = ai ? ai.type : null;
            if (typeof ae === "string") {
                return this._open(ai, aj, ae)
            }
            ah = ae.call(aj[0], function (ak) {
                if (!aj.data("ui-tooltip-open")) {
                    return
                }
                ag._delay(function () {
                    if (ai) {
                        ai.type = af
                    }
                    this._open(ai, aj, ak)
                })
            });
            if (ah) {
                this._open(ai, aj, ah)
            }
        },
        _open: function (ae, ah, ai) {
            var am, al, ak, af, aj = I.extend({}, this.options.position);
            if (!ai) {
                return
            }
            am = this._find(ah);
            if (am.length) {
                am.find(".ui-tooltip-content").html(ai);
                return
            }
            if (ah.is("[title]")) {
                if (ae && ae.type === "mouseover") {
                    ah.attr("title", "")
                } else {
                    ah.removeAttr("title")
                }
            }
            am = this._tooltip(ah);
            this._addDescribedBy(ah, am.attr("id"));
            am.find(".ui-tooltip-content").html(ai);
            this.liveRegion.children().hide();
            if (ai.clone) {
                af = ai.clone();
                af.removeAttr("id").find("[id]").removeAttr("id")
            } else {
                af = ai
            }
            I("<div>").html(af).appendTo(this.liveRegion);

            function ag(an) {
                aj.of = an;
                if (am.is(":hidden")) {
                    return
                }
                am.position(aj)
            }
            if (this.options.track && ae && /^mouse/.test(ae.type)) {
                this._on(this.document, {
                    mousemove: ag
                });
                ag(ae)
            } else {
                am.position(I.extend({
                    of: ah
                }, this.options.position))
            }
            this.hiding = false;
            this.closing = false;
            am.hide();
            this._show(am, this.options.show);
            if (this.options.show && this.options.show.delay) {
                ak = this.delayedShow = setInterval(function () {
                    if (am.is(":visible")) {
                        ag(aj.of);
                        clearInterval(ak)
                    }
                }, I.fx.interval)
            }
            this._trigger("open", ae, {
                tooltip: am
            });
            al = {
                keyup: function (an) {
                    if (an.keyCode === I.ui.keyCode.ESCAPE) {
                        var ao = I.Event(an);
                        ao.currentTarget = ah[0];
                        this.close(ao, true)
                    }
                }
            };
            if (ah[0] !== this.element[0]) {
                al.remove = function () {
                    this._removeTooltip(am)
                }
            }
            if (!ae || ae.type === "mouseover") {
                al.mouseleave = "close"
            }
            if (!ae || ae.type === "focusin") {
                al.focusout = "close"
            }
            this._on(true, ah, al)
        },
        close: function (af) {
            var ae = this,
                ah = I(af ? af.currentTarget : this.element),
                ag = this._find(ah);
            if (this.closing) {
                return
            }
            clearInterval(this.delayedShow);
            if (ah.data("ui-tooltip-title") && !ah.attr("title")) {
                ah.attr("title", ah.data("ui-tooltip-title"))
            }
            this._removeDescribedBy(ah);
            this.hiding = true;
            ag.stop(true);
            this._hide(ag, this.options.hide, function () {
                ae._removeTooltip(I(this));
                this.hiding = false;
                this.closing = false
            });
            ah.removeData("ui-tooltip-open");
            this._off(ah, "mouseleave focusout keyup");
            if (ah[0] !== this.element[0]) {
                this._off(ah, "remove")
            }
            this._off(this.document, "mousemove");
            if (af && af.type === "mouseleave") {
                I.each(this.parents, function (aj, ai) {
                    I(ai.element).attr("title", ai.title);
                    delete ae.parents[aj]
                })
            }
            this.closing = true;
            this._trigger("close", af, {
                tooltip: ag
            });
            if (!this.hiding) {
                this.closing = false
            }
        },
        _tooltip: function (ae) {
            var af = I("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
                ag = af.uniqueId().attr("id");
            I("<div>").addClass("ui-tooltip-content").appendTo(af);
            af.appendTo(this.document[0].body);
            this.tooltips[ag] = ae;
            return af
        },
        _find: function (ae) {
            var af = ae.data("ui-tooltip-id");
            return af ? I("#" + af) : I()
        },
        _removeTooltip: function (ae) {
            ae.remove();
            delete this.tooltips[ae.attr("id")]
        },
        _destroy: function () {
            var ae = this;
            I.each(this.tooltips, function (ah, af) {
                var ag = I.Event("blur");
                ag.target = ag.currentTarget = af[0];
                ae.close(ag, true);
                I("#" + ah).remove();
                if (af.data("ui-tooltip-title")) {
                    if (!af.attr("title")) {
                        af.attr("title", af.data("ui-tooltip-title"))
                    }
                    af.removeData("ui-tooltip-title")
                }
            });
            this.liveRegion.remove()
        }
    })
}));

function isCheckBoxSelected(a) {
    return $(a).is(":checked")
}

function makeCheckboxChecked(a) {
    $(a).prop("checked", true)
}

function isEmptyObject(b) {
    var a;
    for (a in b) {
        return false
    }
    return true
}

function scrollIntoView(c, b) {
    var d = b.scrollTop();
    var e = c.offset();
    if (e === undefined) {
        return
    }
    var a = e.top;
    b.animate({
        scrollTop: d + a - b.height() / 2
    }, 1000)
}

function isPositiveNumber(b) {
    var a = !isNaN(b) && 0 < b;
    return a
}

function isPositiveInteger(b) {
    var a = !isNaN(b) && parseInt(b) == b && 0 < b;
    return a
}

function convertDistanceFromMetersToMiles(b) {
    var a = NaN;
    if (false === isNaN(b)) {
        a = Math.round(b / 1609.34)
    }
    return a
}
var samhsa = {
    locator: {}
};
samhsa.locator.ClusterIconOverlay = function (f, d, c, b, a, e) {
    this.clusterModel = f;
    this.center_ = new google.maps.LatLng(d, c);
    this.clusterCount = b;
    this.latlngBound = a;
    this.latlngBound0 = e
};
samhsa.locator.ClusterIconOverlay.prototype = new google.maps.OverlayView();
samhsa.locator.ClusterIconOverlay.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null
};
samhsa.locator.ClusterIconOverlay.prototype.onAdd = function () {
    this.div_ = document.createElement("DIV");
    if (this.clusterCount > 999) {
        $(this.div_).addClass("cluster-icon4")
    } else {
        if (this.clusterCount > 1) {
            $(this.div_).addClass("cluster-icon3")
        } else {
            $(this.div_).addClass("facility-icon")
        }
    }
    var c = this.getPosFromLatLng_(this.center_);
    $(this.div_).css("top", c.y).css("left", c.x);
    $(this.div_).text(this.clusterCount);
    var a = this;
    $(this.div_).click(function () {
        a.clusterModel.parentMapModel.map.fitBounds(a.latlngBound)
    });
    var b = this.getPanes();
    b.overlayImage.appendChild(this.div_)
};
samhsa.locator.ClusterIconOverlay.prototype.getPosFromLatLng_ = function (b) {
    this.width_ = $(this.div_).width();
    this.height_ = $(this.div_).height();
    var a = this.getProjection().fromLatLngToContainerPixel(b);
    a.x -= parseInt(this.width_ / 2, 10);
    a.y -= parseInt(this.height_ / 2, 10);
    return a
};
samhsa.locator.ClusterIconOverlay.prototype.draw = function () {
    var a = this.getPosFromLatLng_(this.center_);
    this.div_.style.top = a.y + "px";
    this.div_.style.left = a.x + "px"
};
samhsa.locator.ClusterModel = function (a) {
    this.parentLayerModel = a;
    this.parentMapModel = a.parentModel;
    this.fetchClusterDataAndShow()
};
samhsa.locator.ClusterModel.prototype.fetchClusterDataAndShow = function () {
    var c = false;
    var j = this.parentMapModel.pLocatorServiceSelectModel.getAllServiceCriteriaString();
    var a = "/locator/clusters";
    if (j !== undefined && j !== "") {
        a = a + "?filters=" + encodeURIComponent(j);
        c = true
    }
    var n = $("#map-canvas").height();
    var f = $("#map-canvas").width();
    var i = this.parentMapModel.map.getBounds();
    if (i !== undefined && i !== null) {
        var g = i.getNorthEast();
        var k = i.getSouthWest();
        var m = Math.min(g.lat(), k.lat());
        var e = Math.max(g.lat(), k.lat());
        var b = Math.min(g.lng(), k.lng());
        var h = Math.max(g.lng(), k.lng());
        var l = b + "," + m + "," + h + "," + e;
        if (!c) {
            a = a + "?bound=" + encodeURIComponent(l)
        } else {
            a = a + "&bound=" + encodeURIComponent(l)
        }
        c = true
    }
    var d = (n + 100 * 2) * (f + 100 * 2) / 40000;
    var o = Math.floor(d);
    if (!c) {
        a = a + "?ncluster=" + o
    } else {
        a = a + "&ncluster=" + o
    }
    $.ajax({
        url: a,
        type: "GET",
        context: this,
        dataType: "json",
        success: function (p) {
            this.createClusterIcons(p)
        },
        complete: function (p) {},
        timeout: function (p) {},
        error: function (q, r, p) {}
    })
};
samhsa.locator.ClusterModel.prototype.currentlyHasClusterCreated = function (a) {
    return (this.clusterIcons_ !== undefined && this.clusterIcons_ !== null && this.clusterIcons_.length > 0)
};
samhsa.locator.ClusterModel.prototype.createClusterIcons = function (e) {
    if (e === undefined) {
        return
    }
    if (this.currentlyHasClusterCreated()) {
        this.remove()
    } else {}
    var d = e.rows;
    var h = d.length;
    this.clusterIcons_ = [];
    for (var b = 0; b < h; b++) {
        var f = d[b];
        var c = f.count;
        if (c > 1) {
            var a = this.createLatlngBound(f.lat_min, f.lng_min, f.lat_max, f.lng_max);
            var g = new samhsa.locator.ClusterIconOverlay(this, f.lat, f.lng, f.count, a);
            g.setMap(this.parentMapModel.map);
            this.clusterIcons_[b] = g
        } else {
            this.createMarker(b, f)
        }
    }
};
samhsa.locator.ClusterModel.prototype.createMarker = function (c, f) {
    var b = this;
    var e = this.parentMapModel.map;
    var g = new google.maps.LatLng(f.lat, f.lng);
    var d;
    d = "Default";
    if (f.sa === "1") {
        d = "sa"
    }
    if (f.mh === "1") {
        d = "mh"
    }
    var a = new google.maps.Marker({
        position: g,
        map: e,
        icon: this.getIcon(d)
    });
    google.maps.event.addListener(a, "click", function () {
        var h = b.createLatlngBound(f.lat_min, f.lng_min, f.lat_max, f.lng_max);
        var j = new samhsa.locator.ClusterIconOverlay(b, f.lat, f.lng, f.count, h);
        j.setMap(b.parentMapModel.map);
        var i = j.getPosFromLatLng_(g);
        b.showMarkerInfoWindow(a, f.frid, i)
    });
    this.clusterIcons_[c] = a
};
samhsa.locator.ClusterModel.prototype.showMarkerInfoWindow = function (d, c, e) {
    var b = this;
    var a = {
        facilityInfo: []
    };
    $.ajax({
        context: this,
        url: "/locator/frid/" + c,
        async: false,
        type: "GET",
        success: function (g) {
            var f = g.table.rows[0];
            a.facilityInfo.push({
                name1: f[0],
                name2: f[1],
                street1: f[2],
                city: f[3],
                state: f[4],
                zip: f[5],
                phone: f[6],
                sa: f[7],
                mh: f[8]
            });
            b.generateMarkerInfoWindow(d, a.facilityInfo[0], e)
        },
        complete: function (f) {},
        timeout: function (f) {},
        error: function (g, h, f) {}
    })
};
samhsa.locator.ClusterModel.prototype.generateMarkerInfoWindow = function (i, e, h) {
    var a = this.parentMapModel.map;
    var f = this;
    var j = $("#marker-faclility-info-template");
    var j = j.html();
    var d = Mustache.to_html(j, e);
    $("#tmpDiv").html(d);
    var g = $("#tmpDiv").width();
    var b = $("#tmpDiv").height();
    var c = new google.maps.InfoWindow({
        content: d,
        disableAutoPan: true,
        pixelOffset: f.getInfowindowOffset(a, i, h)
    });
    c.open(a, i)
};
samhsa.locator.ClusterModel.prototype.getInfowindowOffset = function (c, g, j) {
    var e;
    var i = $("#map-canvas").height();
    var k = $("#map-canvas").width();
    var b = j.x;
    var a = j.y;
    var h = 0;
    var f = 0;
    var d = 150;
    if (b < d) {
        h = d - b
    }
    if (b > (k - d)) {
        h = k - d - b
    }
    if (a < d) {
        f = 180
    }
    e = new google.maps.Size(h, f);
    e.x = h;
    e.y = f;
    return e
};
samhsa.locator.ClusterModel.prototype.getIcon = function (b) {
    var a;
    a = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    if (b === "sa") {
        a = "http://www.google.com/mapfiles/markerS.png"
    }
    if (b === "mh") {
        a = "http://www.google.com/mapfiles/markerM.png"
    }
    return a
};
samhsa.locator.ClusterModel.prototype.createLatlngBound = function (e, c, b, g) {
    var d = new google.maps.LatLngBounds();
    var a = new google.maps.LatLng(e, c);
    var f = new google.maps.LatLng(b, g);
    d.extend(a);
    d.extend(f);
    return d
};
samhsa.locator.ClusterModel.prototype.hide = function () {
    if (this.clusterIcons_ === undefined || this.clusterIcons_ === null || this.clusterIcons_.length <= 0) {
        return
    }
    for (var a = 0; a < this.clusterIcons_.length; a++) {
        this.clusterIcons_[a].setMap(null)
    }
};
samhsa.locator.ClusterModel.prototype.remove = function () {
    this.hide();
    this.clusterIcons_ = null
};
samhsa.locator.ClusterModel.prototype.show = function () {
    if (this.clusterIcons_ === undefined || this.clusterIcons_ === null || this.clusterIcons_.length <= 0) {
        return
    }
    for (var a = 0; a < this.clusterIcons_.length; a++) {
        this.clusterIcons_[a].setMap(this.parentMapModel.map)
    }
};
samhsa.locator.ClusterModel.prototype.refresh = function () {
    this.fetchClusterDataAndShow()
};
samhsa.locator.FacilityListingDataModel = function (a) {
    this.parentModel = a;
    this.recordPageSize = 100;
    this.recordCurrentPage = 1;
    this.totalPages = 1;
    this.recordCount = 0;
    this.sequence = 1;
    this.map = new Object();
    this.captchaRandomId = 0;
    this.shareUrlParameters = " "
};
samhsa.locator.FacilityListingDataModel.prototype.addListingDataChangeListener = function (a) {
    if (this.listenerArrayListingDataChanged === undefined) {
        this.listenerArrayListingDataChanged = new Array()
    }
    this.listenerArrayListingDataChanged.push(a)
};
samhsa.locator.FacilityListingDataModel.prototype.fireListingDataChangeEvent = function (b) {
    if (this.listenerArrayListingDataChanged === undefined) {
        return
    }
    for (var a = 0; a < this.listenerArrayListingDataChanged.length; a++) {
        this.listenerArrayListingDataChanged[a](b)
    }
};
samhsa.locator.FacilityListingDataModel.prototype.setListingData = function (a) {
    this.data = a;
    this.fireListingDataChangeEvent(a)
};
samhsa.locator.FacilityListingDataModel.prototype.getPageSize = function () {
    return this.recordPageSize
};
samhsa.locator.FacilityListingDataModel.prototype.getRecordCount = function () {
    return this.recordCount
};
samhsa.locator.FacilityListingDataModel.prototype.getCurentPage = function () {
    return this.recordCurrentPage
};
samhsa.locator.FacilityListingDataModel.prototype.isOnFirstPage = function () {
    return (this.recordCurrentPage == 1)
};
samhsa.locator.FacilityListingDataModel.prototype.isOnLastPage = function () {
    return (this.recordCurrentPage == this.totalPages)
};
samhsa.locator.FacilityListingDataModel.prototype.fetchFirstPage = function () {
    return this.fetchPage(1)
};
samhsa.locator.FacilityListingDataModel.prototype.fetchPreviousPage = function () {
    return this.fetchPage(this.recordCurrentPage - 1)
};
samhsa.locator.FacilityListingDataModel.prototype.fetchNextPage = function () {
    if (this.recordCurrentPage + 1 <= this.totalPages) {
        return this.fetchPage(this.recordCurrentPage + 1)
    }
};
samhsa.locator.FacilityListingDataModel.prototype.fetchLastPage = function () {
    return this.fetchPage(this.totalPages)
};
samhsa.locator.FacilityListingDataModel.prototype.fetchPage = function (a) {
    this.recordCurrentPage = a;
    this.fetchAndRenderFacilityTable();
    return this
};
samhsa.locator.FacilityListingDataModel.prototype.changeFetchPageSizeAndRefresh = function (a) {
    this.recordPageSize = a;
    this.recordCurrentPage = 1;
    this.fetchAndRenderFacilityTable()
};
samhsa.locator.FacilityListingDataModel.prototype.initializeVariableMap = function () {
    this.map.previousSenderEmail = " ";
    this.map.previousRecipientEmailsStr = " ";
    this.map.previousComments = " ";
    this.map.previousCaptchaCode = " ";
    this.map["previous-recipient-email-0"] = " "
};
samhsa.locator.FacilityListingDataModel.prototype.generateUrlParamtersForDataQuery = function () {
    var b = "pageSize=" + this.recordPageSize;
    if (this.recordCurrentPage > 1) {
        b = b + "&page=" + this.recordCurrentPage
    }
    var o = this.parentModel.pStartLocationSearchModel.createStartLngLatQueryString();
    if (o !== undefined && o !== "") {
        b = b + "&sLnglat=" + encodeURIComponent(o)
    }
    var a = this.parentModel.pStartLocationSearchModel.createLimitQueryString();
    if (a !== undefined && a !== "") {
        b = b + "&" + a
    }
    var n = this.parentModel.pFacilityLayerModel.mode;
    var p = this.parentModel.pOptionSettingModel.getOption("hide.facilities.not.in.map.view");
    if (n === "cluster" || p) {
        var g = this.parentModel.map.getBounds();
        if (g !== undefined && g !== null) {
            var e = g.getNorthEast();
            var j = g.getSouthWest();
            var m = Math.min(e.lat(), j.lat());
            var d = Math.max(e.lat(), j.lat());
            var c = Math.min(e.lng(), j.lng());
            var f = Math.max(e.lng(), j.lng());
            var l = c + "," + m + "," + f + "," + d;
            b = b + "&bound=" + encodeURIComponent(l)
        }
    }
    var h = this.parentModel.pLocatorServiceSelectModel.getAllServiceCriteriaString();
    if (h !== undefined && h !== "") {
        b = b + "&filters=" + encodeURIComponent(h)
    }
    var i = this.parentModel.pFilterSortModel;
    if (i !== undefined) {
        var k = i.generatePartialUrl();
        if (k !== undefined && k !== "") {
            b = b + "&" + k
        }
    }
    return b
};
samhsa.locator.FacilityListingDataModel.prototype.fetchAndRenderFacilityTable = function () {
    var a = "/locator/listing";
    var b = this.generateUrlParamtersForDataQuery();
    if (b !== undefined && b !== null && $.trim(b) !== "") {
        a = a + "?" + b
    }
    $.ajax({
        url: a,
        type: "GET",
        context: this,
        dataType: "json",
        success: function (c) {
            this.setListingData(c)
        },
        complete: function (c) {},
        timeout: function (c) {
            this.parentModel.pFilterSortModel.clearFilterSortInProcessUi()
        },
        error: function (d, e, c) {
            this.parentModel.pFilterSortModel.clearFilterSortInProcessUi()
        }
    })
};
samhsa.locator.FacilityListingDataModel.prototype.validateEmailAddress = function (b) {
    var a = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return a.test(b)
};
samhsa.locator.FacilityListingDataModel.prototype.initializeCaptcha = function () {
    this.captchaRandomId = Math.floor((Math.random() * 100000) + 1);
    $("#captcha-img").attr("src", "/locator/captcha/" + this.captchaRandomId);
    $("#captcha-code").empty()
};
samhsa.locator.FilterSortModel = function (a) {
    this.parentModel = a;
    this.sort = 0;
    this.filterFacilityName = "";
    this.filterFacilityAddress = "";
    this.filterFacilityPhone = "";
    this.setUiFromModel();
    this.bindFitlerSortEvent()
};
samhsa.locator.FilterSortModel.prototype.setUiFromModel = function () {
    if (this.sort === undefined || this.sort === null) {
        this.sort = 0
    }
    $("#sort-by-select").val(this.sort);
    $("#filter-facility-name").val(this.filterFacilityName);
    $("#filter-facility-address").val(this.filterFacilityAddress);
    $("#filter-facility-phone").val(this.filterFacilityPhone);
    this.updateFilterSortIcons()
};
samhsa.locator.FilterSortModel.prototype.setModelFromUi = function () {
    this.sort = $("#sort-by-select").val();
    this.filterFacilityName = $.trim($("#filter-facility-name").val());
    this.filterFacilityAddress = $.trim($("#filter-facility-address").val());
    this.filterFacilityPhone = $.trim($("#filter-facility-phone").val())
};
samhsa.locator.FilterSortModel.prototype.bindFitlerSortEvent = function () {
    var a = this;
    $("#facility-list-filter-sort").click(function () {
        if (!$("#facility-list-filter-sort-menu").is(":visible")) {
            a.parentModel.closeAllOpenedDialog();
            a.openSortFilterDialog();
            $("#apply-filter-sort").prop("disabled", false);
            $("#sort-by-select").focus()
        } else {
            a.closeSortFilterDialog()
        }
        return false
    });
    $("#facility-list-filter-sort-menu").click(function () {
        return false
    });
    $("#filter-sort-menu-close").click(function () {
        a.closeSortFilterDialog();
        return false
    });
    $("#apply-filter-sort").click(function () {
        a.setModelFromUi();
        a.updateFilterSortIcons();
        $("#filter-sort-in-process-icon").show();
        $("#apply-filter-sort").prop("disabled", true);
        a.parentModel.pLocatorServiceSelectModel.fireChangedEvent()
    });
    $("#cancel-filter-sort").click(function () {
        a.setUiFromModel();
        a.parentModel.closeAllOpenedDialog();
        return false
    });
    $("#clear-filter-sort").click(function () {
        $("#sort-by-select").val("0");
        $("#filter-facility-name").val("");
        $("#filter-facility-address").val("");
        $("#filter-facility-phone").val("");
        $("#sort-by-select").focus()
    })
};
samhsa.locator.FilterSortModel.prototype.hasSortSpecified = function () {
    if (this.sort != 0) {
        return true
    } else {
        return false
    }
};
samhsa.locator.FilterSortModel.prototype.hasFilterArgsEntered = function () {
    if (this.filterFacilityName !== undefined && this.filterFacilityName.length > 0) {
        return true
    } else {
        if (this.filterFacilityAddress !== undefined && this.filterFacilityAddress.length > 0) {
            return true
        } else {
            if (this.filterFacilityPhone !== undefined && this.filterFacilityPhone.length > 0) {
                return true
            }
        }
    }
    return false
};
samhsa.locator.FilterSortModel.prototype.updateFilterSortIcons = function () {
    var a = 0;
    if (this.hasSortSpecified()) {
        a += 1;
        $("#facility-list-sort").hide();
        $("#facility-list-sort-changed").show()
    } else {
        $("#facility-list-sort").show();
        $("#facility-list-sort-changed").hide()
    }
    if (this.hasFilterArgsEntered()) {
        a += 2;
        $("#facility-list-filter").hide();
        $("#facility-list-filter-changed").show()
    } else {
        $("#facility-list-filter").show();
        $("#facility-list-filter-changed").hide()
    }
    var b = "Display Filtering and Sorting Options";
    switch (a) {
    case 1:
        b += "\n(Sort is not the default)";
        break;
    case 2:
        b += "\n(Facilities are being filtered)";
        break;
    case 3:
        b += "\n(Sort and Filtering are not the default)";
        break
    }
    $("#facility-list-filter-sort").prop("title", b)
};
samhsa.locator.FilterSortModel.prototype.clearFilterSortInProcessUi = function () {
    $("#filter-sort-in-process-icon").hide();
    $("#apply-filter-sort").prop("disabled", false)
};
samhsa.locator.FilterSortModel.prototype.closeSortFilterDialog = function () {
    $("#facility-list-filter-sort-menu").hide()
};
samhsa.locator.FilterSortModel.prototype.openSortFilterDialog = function () {
    $("#facility-list-filter-sort-menu").show()
};
samhsa.locator.FilterSortModel.prototype.generatePartialUrl = function () {
    var b = false;
    var a = "";
    if (this.sort !== undefined && this.sort !== 0) {
        if (b) {
            a = a + "&"
        }
        a = a + "sort=" + this.sort;
        b = true
    }
    if (this.filterFacilityName !== undefined && this.filterFacilityName !== "") {
        if (b) {
            a = a + "&"
        }
        a = a + "filterFName=" + encodeURIComponent(this.filterFacilityName);
        b = true
    }
    if (this.filterFacilityAddress !== undefined && this.filterFacilityAddress !== "") {
        if (b) {
            a = a + "&"
        }
        a = a + "filterFAddress=" + encodeURIComponent(this.filterFacilityAddress);
        b = true
    }
    if (this.filterFacilityPhone !== undefined && this.filterFacilityPhone !== "") {
        if (b) {
            a = a + "&"
        }
        a = a + "filterFPhone=" + encodeURIComponent(this.filterFacilityPhone);
        b = true
    }
    return a
};
samhsa.locator.HashTable = function (b) {
    this.length = 0;
    this.items = {};
    for (var a in b) {
        if (b.hasOwnProperty(a)) {
            this.items[a] = b[a];
            this.length++
        }
    }
};
samhsa.locator.HashTable.prototype.setItem = function (a, c) {
    var b = undefined;
    if (this.hasItem(a)) {
        b = this.items[a]
    } else {
        this.length++
    }
    this.items[a] = c;
    return b
};
samhsa.locator.HashTable.prototype.getItem = function (a) {
    return this.hasItem(a) ? this.items[a] : undefined
};
samhsa.locator.HashTable.prototype.hasItem = function (a) {
    return this.items.hasOwnProperty(a)
};
samhsa.locator.HashTable.prototype.removeItem = function (a) {
    if (this.hasItem(a)) {
        var b = this.items[a];
        this.length--;
        delete this.items[a];
        return b
    } else {
        return undefined
    }
};
samhsa.locator.HashTable.prototype.keys = function () {
    var b = [];
    for (var a in this.items) {
        if (this.hasItem(a)) {
            b.push(a)
        }
    }
    return b
};
samhsa.locator.HashTable.prototype.values = function () {
    var b = [];
    for (var a in this.items) {
        if (this.hasItem(a)) {
            b.push(this.items[a])
        }
    }
    return b
};
samhsa.locator.HashTable.prototype.each = function (b) {
    for (var a in this.items) {
        if (this.hasItem(a)) {
            b(a, this.items[a])
        }
    }
};
samhsa.locator.HashTable.prototype.clear = function () {
    this.items = {};
    this.length = 0
};
samhsa.locator.MapContextMenu = function (a) {
    this.parentModel = a;
    this.bindEvents()
};
samhsa.locator.MapContextMenu.prototype.showSidePanel = function () {
    this.setSidePanelDisplay(true)
};
samhsa.locator.MapContextMenu.prototype.hideSidePanel = function () {
    this.setSidePanelDisplay(false)
};
samhsa.locator.MapContextMenu.prototype.setSidePanelDisplay = function (b) {
    var e = ["#side-container-fp", "#hide-side-panel", "#show-side-panel"];
    var a = true;
    for (var c = 0; c < e.length; c += 1) {
        var d = $(e[c]);
        if (undefined === d || null === d) {
            a = false;
            break
        }
    }
    if (a) {
        if (b) {
            $("#side-container-fp").css("display", "inline-block");
            $("#hide-side-panel").show();
            $("#show-side-panel").hide()
        } else {
            $("#side-container-fp").hide();
            $("#hide-side-panel").hide();
            $("#show-side-panel").show()
        }
        if (this.parentModel && this.parentModel.adjustMapCanvasWidth) {
            this.parentModel.adjustMapCanvasWidth()
        }
    }
};
samhsa.locator.MapContextMenu.prototype.bindEvents = function () {
    var a = this.parentModel;
    var c = a.map;
    var b = this;
    $("#hide-side-panel").bind("click", function () {
        b.hideSidePanel();
        b.hideAllContextMenu()
    });
    $("#show-side-panel").bind("click", function () {
        b.showSidePanel();
        b.hideAllContextMenu()
    });
    $("#start-location-here").bind("click", function () {
        var d = a.getLastRightClickedLatLng();
        a.pStartLocationSearchModel.startLocation = d;
        a.pStartLocationSearchModel.fireStartMarkerChangeEvent(d);
        $("#nav_context").hide();
        b.hideAllContextMenu()
    });
    $("#show-zoom-in").bind("click", function () {
        var d = c.getZoom();
        c.setCenter(a.getLastRightClickedLatLng());
        c.setZoom(d + 1);
        b.hideAllContextMenu()
    });
    $("#show-zoom-out").bind("click", function () {
        var d = c.getZoom();
        c.setCenter(a.getLastRightClickedLatLng());
        c.setZoom(d - 1);
        $("#nav_context").hide();
        b.hideAllContextMenu()
    });
    $("#show-map-center").bind("click", function () {
        c.setCenter(a.getLastRightClickedLatLng());
        $("#nav_context").hide();
        b.hideAllContextMenu()
    });
    $("#drop-pin").bind("click", function (d) {
        $("#nav_context").hide();
        a.pPinMarkerModel.createMarkerWrapper(a.getLastRightClickedLatLng());
        a.hideAllContextMenu()
    });
    $("#drop-pin-by-latlng").bind("click", function (d) {
        a.hideAllContextMenu();
        $("#dialog-drop-pin-by-latlng").css("left", "0px").css("top", "100px").show()
    });
    $("#refresh-map").bind("click", function () {
        a.pFacilityLayerModel.refresh();
        $("img[src*='googleapis']").each(function () {
            $(this).attr("src", $(this).attr("src") + "&" + (new Date()).getTime())
        })
    });
    $("#hide-drawing").bind("click", function () {
        $("#nav_context").hide();
        a.pDrawingManagerModel.RemoveAll();
        a.pDrawingManagerModel.drawingManager.setMap(null);
        $("#show-drawing").show();
        $("#hide-drawing").hide()
    });
    $("#show-drawing").bind("click", function () {
        $("#nav_context").hide();
        a.pDrawingManagerModel.drawingManager.setMap(a.map);
        $("#show-drawing").hide();
        $("#hide-drawing").show()
    })
};
samhsa.locator.MapContextMenu.prototype.hideAllContextMenu = function () {
    $("#nav_context").hide();
    $("#nav_context_marker").hide();
    $("#nav_context_drawing").hide()
};
samhsa.locator.MarkerWrapper = function (a, b) {
    this.marker = a;
    this.parentModel = b;
    this.flagAnchor = false
};
samhsa.locator.MarkerWrapper.prototype.setAnchor = function (a) {
    this.flagAnchor = a;
    if (a === true) {
        this.marker.setDraggable(false)
    } else {
        this.marker.setDraggable(true)
    }
};
samhsa.locator.MarkerWrapper.prototype.toggleAnchorFlag = function () {
    this.setAnchor(!this.flagAnchor)
};
samhsa.locator.MarkerWrapper.prototype.isAnchor = function () {
    return this.flagAnchor
};
samhsa.locator.MarkerWrapper.prototype.setShow = function () {
    this.flagRemove = false;
    this.marker.setMap(this.parentModel.map)
};
samhsa.locator.MarkerWrapper.prototype.panTo = function () {
    var a = this.marker.getPosition();
    this.parentModel.map.panTo(a)
};
samhsa.locator.MarkerWrapper.prototype.setRemove = function () {
    this.flagRemove = true;
    this.marker.setMap(null)
};
samhsa.locator.MarkerWrapper.prototype.isRemove = function () {
    return this.flagRemove
};
samhsa.locator.MarkerWrapper.prototype.setLatlng = function (a) {
    this.marker.setPosition(a)
};
samhsa.locator.MarkerWrapper.prototype.getPixelLocation = function (a) {
    if (this.marker === undefined) {
        throw "Error!! MarkerWrapper.getPixelLocation() failed because marker is undefined!"
    }
    var b = this.marker.getPosition();
    if (b === undefined) {
        throw "Error!! MarkerWrapper.getPixelLocation() failed because poistionLatLng is undefined!"
    }
    var c = a.fromLatLngToContainerPixel(b);
    return c
};
samhsa.locator.MarkerWrapper.prototype.getLatlngString = function (a) {
    if (this.marker === undefined) {
        throw "Error!! MarkerWrapper.getLatLngString() failed because marker is undefined!"
    }
    var b = this.marker.getPosition();
    return b.lat() + "," + b.lng()
};
samhsa.locator.MarkerWrapper.prototype.setLocationData = function (a) {
    this.locationData = a
};
samhsa.locator.MarkerWrapper.prototype.getLocationData = function () {
    return this.locationData
};
samhsa.locator.MarkerWrapper.prototype.populateValueInPinDataPanel = function () {
    if (this.locationData === undefined) {
        return
    }
    var a = this.locationData;
    $("#pin-val-tract-fips").html(a.fips_tract_code);
    $("#pin-val-state-name").html(a.name);
    $("#pin-val-county-name").html(a.county_name);
    $("#pin-val-tot-pop").html(a.total_population);
    $("#pin-val-aian-pop").html(a.aian_population);
    $("#pin-val-aian-mpop").html(a.aian_male);
    $("#pin-val-aian-area").html(a.aian_area_name);
    $("#pin-val-aian-id").html(a.aian_id);
    $("#pin-val-county-pop-65").html(a.county_age775212);
    $("#pin-val-county-pop-aian").html(a.county_rhi325212);
    $("#pin-val-county-education-high-school").html(a.county_edu635211);
    $("#pin-val-county-education-bachelors").html(a.county_edu685211);
    $("#pin-val-county-per-capita-income").html(a.county_inc910211);
    $("#pin-val-county-household-income").html(a.county_inc110211);
    $("#pin-val-county-poverty").html(a.county_pvy020211);
    $("#pin-val-county-land-area").html(a.county_lnd110210);
    $("#pin-val-county-population-per-mile").html(a.county_pop060210);
    $("#pin-val-state-pop-65").html(a.state_age775212);
    $("#pin-val-state-pop-aian").html(a.state_rhi325212);
    $("#pin-val-state-education-high-school").html(a.state_edu635211);
    $("#pin-val-state-education-bachelors").html(a.state_edu685211);
    $("#pin-val-state-per-capita-income").html(a.state_inc910211);
    $("#pin-val-state-household-income").html(a.state_inc110211);
    $("#pin-val-state-poverty").html(a.state_pvy020211);
    $("#pin-val-state-land-area").html(a.state_lnd110210);
    $("#pin-val-state-population-per-mile").html(a.state_pop060210)
};
samhsa.locator.MarkerWrapper.prototype.toString = function () {
    return this.marker.position.lat() + ", " + this.marker.position.lng()
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper = function (b, a) {
    this.parentLayerModel = b;
    this.config = a;
    this.key = a.key;
    this.hideLayerFlag = false
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.showMapLegend = function () {
    $("#map-legend-facility").show()
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.hideMapLegend = function () {
    $("#map-legend-facility").hide()
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.showLayerOnMap = function (a) {
    this.parentLayerModel.parentModel.fireShowLayerOnMapEvent(a)
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.createAndShowLayer = function () {
    if (this.hideLayerFlag) {
        return
    }
    var a = this.createLayer();
    if (this.layer !== undefined && this.layer !== null) {
        this.layer.setMap(null);
        this.hideMapLegend()
    }
    this.layer = a;
    if (this.layer !== undefined && this.layer !== null) {
        this.showLayerOnMap(this.layer);
        this.showMapLegend();
        var b = this.config.onLayerCreatedFunc;
        if (b !== undefined && b !== null && b !== "") {
            b(this.layer)
        }
    }
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.createLayer = function () {
    var b = this;
    var a = this.config;
    var f = this.parentLayerModel.parentModel.getFusionQueryCriteriaString();
    saved_where_string = f;
    var c = a.options;
    var e = {
        select: a.select,
        from: a.tableid,
        where: f
    };
    var d = new google.maps.FusionTablesLayer({
        query: e,
        options: c
    });
    google.maps.event.addListener(d, "click", function (i) {
        var h = i.row.frid.value;
        if (h === undefined) {
            return
        }
        $("#faclility-listing-panel .click-triggered").removeClass("click-triggered");
        var g = $("#faclility-listing-panel").find("#" + h);
        if (g === undefined || g.length <= 0) {
            b.generateDotsInfoWindow(h);
            return
        }
        g.find("td.listing-index").addClass("click-triggered");
        $("#side-show-data").hide();
        scrollIntoView(g, $("#faclility-listing-panel"))
    });
    return d
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.generateDotsInfoWindow = function (b) {
    var a = $("#dots-faclility-info-template");
    var a = a.html();
    var c = Mustache.to_html(a, b);
    $("#side-show-data").html(c);
    $("#side-show-data").show().fadeOut(30000)
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.hideLayer = function () {
    if (this.layer !== undefined && this.layer !== null) {
        this.layer.setMap(null)
    }
    this.hideLayerFlag = true
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.showLayer = function () {
    this.hideLayerFlag = false;
    if (this.layer === undefined || this.layer === null) {
        this.layer = this.createLayer()
    }
    if (this.layer !== undefined && this.layer !== null) {
        this.showLayerOnMap(this.layer);
        this.showMapLegend()
    }
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.setRequireRefresh = function () {
    this.requireRefresh = true
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.isRequireRefresh = function () {
    return this.requireRefresh
};
samhsa.locator.MultiCriteriaFusionMapLayerWrapper.prototype.refreshLayerIfMarkedRequired = function () {
    if (this.requireRefresh !== undefined && this.requireRefresh === false) {
        return
    }
    this.createAndShowLayer();
    this.setRequireRefresh(false)
};
samhsa.locator.OptionSettingModel = function (a) {
    this.parentModel = a;
    this.initialize()
};
samhsa.locator.OptionSettingModel.prototype.initialize = function () {
    this.options = new samhsa.locator.HashTable();
    var a = this;
    $(".option-checkbox").bind("change", function () {
        var c = isCheckBoxSelected(this);
        var b = $(this).val();
        a.setOption(b, c)
    });
    $(".option-default-button").click(function () {
        $("#AdvSet").find("input[type=checkbox]:checked").removeAttr("checked")
    })
};
samhsa.locator.OptionSettingModel.prototype.setOptionArray = function (a) {
    for (var b in a) {
        var c = a[b];
        this.setOption(c, true)
    }
};
samhsa.locator.OptionSettingModel.prototype.setOption = function (a, b) {
    this.options.setItem(a, b);
    if (a === "mode.cluster") {
        this.setClusterMode(b)
    } else {
        if (a === "hide.facilities.not.in.map.view") {
            this.parentModel.pFacilityListingDataModel.fetchAndRenderFacilityTable()
        } else {
            if (a === "hide.facilities.at.start") {
                this.setShowFacilityAtStart(b)
            } else {
                if (a === "show.facility.panel.at.start") {
                    this.setShowSidePanelAtStart(b)
                } else {
                    if (a === "show.service.menu.in.share.url") {
                        this.setShowServiceSelectionMenu(b)
                    }
                }
            }
        }
    }
};
samhsa.locator.OptionSettingModel.prototype.getOption = function (a) {
    return this.options.getItem(a)
};
samhsa.locator.OptionSettingModel.prototype.setClusterMode = function (a) {
    if (a === undefined) {
        this.parentModel.pFacilityLayerModel.setModeFusion();
        return
    }
    if (a) {
        this.parentModel.pFacilityLayerModel.setModeCluster();
        return
    }
    this.parentModel.pFacilityLayerModel.setModeFusion()
};
samhsa.locator.OptionSettingModel.prototype.setShowFacilityAtStart = function (a) {
    if (a === undefined) {
        a = false
    }
    this.parentModel.pFacilityListingDataModel.showFacilitiesAtStart = a;
    this.parentModel.pFacilityListingDataModel.fetchAndRenderFacilityTable();
    this.parentModel.pFacilityLayerModel.refresh()
};
samhsa.locator.OptionSettingModel.prototype.setShowSidePanelAtStart = function (a) {
    if (a === undefined || this.parentModel === undefined) {
        return
    }
    if (a && this.parentModel.showSidePanelFacilityListing) {
        this.parentModel.showSidePanelFacilityListing()
    } else {
        if (!a && this.parentModel.hideSidePanelFacilityListing) {
            this.parentModel.hideSidePanelFacilityListing()
        }
    }
};
samhsa.locator.OptionSettingModel.prototype.setShowServiceSelectionMenu = function (a) {
    if (a === undefined) {
        return
    }
    if (a) {
        this.parentModel.pLocatorServiceSelectModel.openServiceSelectionDialog();
        $("#show-services-li").trigger("click");
        $($("#nav_layers .nav1")[4]).trigger("mouseover")
    } else {
        this.parentModel.pLocatorServiceSelectModel.closeServiceSelectionDialog()
    }
};
samhsa.locator.OptionSettingModel.prototype.generatePartialUrl = function (b) {
    var c = b + "=[";
    var a = false;
    var f = this.options.keys();
    for (var e in f) {
        var d = f[e];
        var g = this.options.getItem(d);
        if (g === undefined || g === null || g === false || g === "") {
            continue
        }
        if (a) {
            c = c.concat("," + d)
        } else {
            c = c.concat(d);
            a = true
        }
    }
    if (a) {
        c = c.concat("]");
        return c
    }
    return ""
};
samhsa.locator.OptionSettingModel.prototype.closeAdvanceOptionDialog = function () {
    $("#advanced-options").hide()
};
samhsa.locator.OptionSettingModel.prototype.openAdvanceOptionDialog = function () {
    this.parentModel.closeAllOpenedDialog();
    $("#advanced-options").show()
};
samhsa.locator.OptionSettingModel.prototype.toggleAdvanceOptionDialog = function () {
    if ($("#advanced-options").is(":visible")) {
        this.closeAdvanceOptionDialog()
    } else {
        this.openAdvanceOptionDialog()
    }
};
samhsa.locator.PinMarkerModel = function (a) {
    this.parentModel = a;
    this.selectedFacilityMarker = null;
    this.infowindow = null;
    this.markerWrapperArray = new Array();
    if (a !== undefined && a !== null) {
        this.map = a.map
    }
    this.bindContextMenuEvents();
    this.bindDropBylatlngEvent();
    this.overlay = new google.maps.OverlayView();
    this.overlay.draw = function () {};
    this.overlay.setMap(this.map)
};
samhsa.locator.PinMarkerModel.prototype.getOverlayProjection = function () {
    return this.overlay.getProjection()
};
samhsa.locator.PinMarkerModel.prototype.setSelectedMarkerWrapper = function (a) {
    this.selectedMarkerWrapper = a
};
samhsa.locator.PinMarkerModel.prototype.getSelectedMarkerWrapper = function () {
    return this.selectedMarkerWrapper
};
samhsa.locator.PinMarkerModel.prototype.getMarkerByIndex = function (a) {
    return this.markerWrapperArray[a]
};
samhsa.locator.PinMarkerModel.prototype.showContextMenuForMarker = function (b, a) {
    this.updateContextMenuItems();
    $("#nav_context_marker").css("left", b).css("top", a).show()
};
samhsa.locator.PinMarkerModel.prototype.hideContextMenuForMarker = function () {
    $("#nav_context_marker").hide();
    this.hidePinLocationData()
};
samhsa.locator.PinMarkerModel.prototype.setSelectedFacilityMarkerLatLng = function (d, c) {
    var b = this;
    if (this.selectedFacilityMarker === undefined || this.selectedFacilityMarker === null) {
        var a = new google.maps.Marker({
            position: d,
            animation: google.maps.Animation.DROP,
            draggable: false,
            frid: c,
            map: this.map
        });
        a.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
        this.selectedFacilityMarker = new samhsa.locator.MarkerWrapper(a, this.parentModel);
        google.maps.event.addListener(a, "click", function () {
            b.showMarkerInfoWindow(a);
            $("#side-show-data").hide()
        });
        google.maps.event.addListener(a, "rightclick", function (g) {
            b.parentModel.hideAllContextMenu();
            b.setSelectedMarkerWrapper(b.selectedFacilityMarker);
            var f = b.selectedFacilityMarker.getPixelLocation(b.getOverlayProjection());
            b.showContextMenuForMarker(f.x, f.y);
            $("#pin-lat-lng").html(a.getPosition().toUrlValue());
            var e = new google.maps.places.PlacesService(b.map);
            e.nearbySearch({
                location: a.getPosition(),
                radius: 1000
            }, function (i, h) {
                if (google.maps.places.PlacesServiceStatus.OK === h && 0 < i.length) {
                    $("#pin-place-info").html(i[0].name)
                } else {
                    $("#pin-place-info").html("Unidentified Place")
                }
            });
            $.ajax({
                url: "/countyinfo/" + a.getPosition().toUrlValue().replace(",", ";"),
                async: false,
                type: "POST",
                dataType: "json",
                success: function (i) {
                    var h = i.table.rows[0][2];
                    $("#pin-county").html(h)
                },
                error: function (h, j, i) {
                    $("#pin-county").html("Unidentified County")
                }
            })
        })
    }
    if (b.infowindow) {
        b.infowindow.close()
    }
    this.selectedFacilityMarker.setShow();
    this.selectedFacilityMarker.frid = c;
    this.selectedFacilityMarker.setLatlng(d);
    this.selectedFacilityMarker.panTo()
};
samhsa.locator.PinMarkerModel.prototype.showMarkerInfoWindow = function (e) {
    var c = this;
    var a = this.selectedFacilityMarker;
    var d = a.frid;
    var b = {
        facilityInfo: []
    };
    $.ajax({
        context: this,
        url: "/locator/frid/" + d,
        async: false,
        type: "GET",
        success: function (g) {
            var f = g.table.rows[0];
            b.facilityInfo.push({
                name1: f[0],
                name2: f[1],
                street1: f[2],
                city: f[3],
                state: f[4],
                zip: f[5],
                phone: f[6],
                sa: f[7],
                mh: f[8],
                street2: f[9]
            });
            c.generateMarkerInfoWindow(e, b.facilityInfo[0])
        }
    })
};
samhsa.locator.PinMarkerModel.prototype.generateMarkerInfoWindow = function (d, b) {
    var c = this.parentModel.map;
    var a = $("#pin-faclility-info-template");
    var a = a.html();
    var e = Mustache.to_html(a, b);
    if (this.infowindow === null) {
        this.infowindow = new google.maps.InfoWindow({
            content: e,
            disableAutoPan: true
        })
    }
    this.infowindow.setContent(e);
    this.infowindow.open(c, d)
};
samhsa.locator.PinMarkerModel.prototype.createMarkerWrapper = function (e) {
    var c = this.markerWrapperArray.length;
    var b = this;
    var a = new google.maps.Marker({
        position: e,
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: this.map
    });
    a.set("id", c);
    a.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
    var d = new samhsa.locator.MarkerWrapper(a, this.parentModel);
    this.markerWrapperArray[c] = d;
    google.maps.event.addListener(a, "rightclick", function (h) {
        b.parentModel.hideAllContextMenu();
        b.setSelectedMarkerWrapper(d);
        var g = d.getPixelLocation(b.getOverlayProjection());
        b.showContextMenuForMarker(g.x, g.y);
        $("#pin-lat-lng").html(a.getPosition().toUrlValue());
        var f = new google.maps.places.PlacesService(this.map);
        f.nearbySearch({
            location: a.getPosition(),
            radius: 1000
        }, function (j, i) {
            if (google.maps.places.PlacesServiceStatus.OK === i && 0 < j.length) {
                $("#pin-place-info").html(j[0].name)
            } else {
                $("#pin-place-info").html("Unidentified Place")
            }
        });
        $.ajax({
            url: "/countyinfo/" + a.getPosition().toUrlValue().replace(",", ";"),
            async: false,
            type: "POST",
            dataType: "json",
            success: function (j) {
                var i = j.table.rows[0][2];
                $("#pin-county").html(i)
            },
            error: function (i, k, j) {
                $("#pin-county").html("Unidentified County")
            }
        })
    });
    google.maps.event.addListener(a, "dragstart", function (f) {
        b.parentModel.hideAllContextMenu()
    });
    return c
};
samhsa.locator.PinMarkerModel.prototype.removeAllMarkers = function () {
    if (this.markerWrapperArray === undefined) {
        return
    }
    for (var a = 0; a < this.markerWrapperArray.length; a++) {
        this.markerWrapperArray[a].setRemove()
    }
};
samhsa.locator.PinMarkerModel.prototype.updateContextMenuItems = function () {
    if (this.selectedMarkerWrapper.isAnchor()) {
        $("#anchor-pin a").text("Undo Pin Anchor to Make it moveable");
        $("#show-pin-data").show();
        this.hidePinLocationData()
    } else {
        $("#anchor-pin a").text("Anchor Pin & Get location data");
        $("#show-pin-data").hide()
    }
};
samhsa.locator.PinMarkerModel.prototype.bindContextMenuEvents = function () {
    var a = this;
    $("#remove-all-pins").bind("click", function () {
        a.removeAllMarkers(a.parentModel.getLastRightClickedLatLng());
        a.parentModel.hideAllContextMenu()
    });
    $("#remove-pin").bind("click", function (b) {
        var c = a.getSelectedMarkerWrapper();
        c.setRemove();
        a.parentModel.hideAllContextMenu()
    })
};
samhsa.locator.PinMarkerModel.prototype.bindDropBylatlngEvent = function () {
    var a = this;
    $("#button-drop-pin").bind("click", function () {
        var c = $("#input-latlng").val();
        var b = $.trim(c).split(new RegExp("[\\s,]+"));
        var d = new google.maps.LatLng(b[0], b[1]);
        a.parentModel.map.panTo(d);
        a.createMarkerWrapper(d)
    })
};
samhsa.locator.PinMarkerModel.prototype.fetchLayerInfo = function (b) {
    var a = b.getLatlngString();
    $.ajax({
        url: "/layerinfo/" + a,
        async: false,
        type: "POST",
        dataType: "json",
        success: function (c) {
            b.setLocationData(c)
        },
        complete: function (c) {},
        timeout: function (c) {},
        error: function (d, e, c) {}
    })
};
samhsa.locator.ServiceSelectionMenu = function (a) {
    this.parentModel = a;
    this.bindNav2SelectAllNoneLinks()
};
samhsa.locator.ServiceSelectionMenu.prototype.parentModel = "";
samhsa.locator.ServiceSelectionMenu.prototype.bindNav2SelectAllNoneLinks = function () {
    $(".select_all").bind("click", function (a) {
        $(this).parent().parent().find("input").each(function () {
            var b = $(this).is(":checked");
            if (!b) {
                $(this).trigger("click")
            }
        });
        a.stopPropagation()
    });
    $(".select_none").bind("click", function (a) {
        $(this).parent().parent().find("input").each(function () {
            var b = $(this).is(":checked");
            if (b) {
                $(this).trigger("click")
            }
        });
        a.stopPropagation()
    });
    $(".select_reverse").bind("click", function (a) {
        $(this).parent().parent().find("input").trigger("click");
        a.stopPropagation()
    })
};
samhsa.locator.ServiceSelectionMenu.prototype.updateServiceCheckboxFromServiceSelectedModel = function () {
    var b = this.parentModel.pLocatorServiceSelectModel.serviceSelectionDataMode.serviceCategories;
    for (var i in b) {
        var g = b[i];
        var e = g.services;
        for (var f in g.services) {
            var a = e[f];
            if (a.code === undefined) {
                continue
            }
            var h = this.findServiceCheckboxElementByService(a);
            var d = a.selected;
            h.prop("checked", d)
        }
    }
};
samhsa.locator.FacilityLayerModel = function (a) {
    this.parentModel = a;
    this.map = a.map;
    this.config = a.modelOptions.multiCriteriaLayerOption;
    this.initializeFusionLayer();
    this.setModeFusion()
};
samhsa.locator.FacilityLayerModel.prototype.setRequireRefresh = function () {
    this.requireRefresh = true
};
samhsa.locator.FacilityLayerModel.prototype.refreshIfMarkAsRequired = function () {
    if (this.requireRefresh) {
        this.refresh()
    }
};
samhsa.locator.FacilityLayerModel.prototype.setModeFusion = function () {
    if (this.mode === "cluster") {
        this.pClusterModel.hide()
    }
    this.mode = "fusion";
    this.multiCriteriaFusionMapLayerWrapper.showLayer();
    this.multiCriteriaFusionMapLayerWrapper.refreshLayerIfMarkedRequired()
};
samhsa.locator.FacilityLayerModel.prototype.setModeCluster = function () {
    this.mode = "cluster";
    this.initializeClusterModel();
    this.multiCriteriaFusionMapLayerWrapper.hideLayer();
    this.pClusterModel.show()
};
samhsa.locator.FacilityLayerModel.prototype.setModeBoth = function () {
    this.mode = "both";
    this.multiCriteriaFusionMapLayerWrapper.showLayer();
    this.multiCriteriaFusionMapLayerWrapper.refreshLayerIfMarkedRequired();
    this.pClusterModel.show()
};
samhsa.locator.FacilityLayerModel.prototype.refresh = function () {
    if (this.mode === "fusion") {
        this.multiCriteriaFusionMapLayerWrapper.showLayer();
        this.multiCriteriaFusionMapLayerWrapper.refreshLayerIfMarkedRequired()
    } else {
        if (this.mode === "cluster") {
            this.pClusterModel.hide();
            this.pClusterModel.fetchClusterDataAndShow()
        } else {
            this.multiCriteriaFusionMapLayerWrapper.refreshLayerIfMarkedRequired()
        }
    }
};
samhsa.locator.FacilityLayerModel.prototype.initializeClusterModel = function () {
    this.pClusterModel = new samhsa.locator.ClusterModel(this)
};
samhsa.locator.FacilityLayerModel.prototype.initializeFusionLayer = function () {
    var a = this.parentModel.modelOptions.multiCriteriaLayerOption;
    if (a !== null || a !== undefined) {
        this.multiCriteriaFusionMapLayerWrapper = new samhsa.locator.MultiCriteriaFusionMapLayerWrapper(this, a, this.map);
        this.multiCriteriaFusionMapLayerWrapper.createAndShowLayer();
        this.parentModel.triggerMapTileRefreshTimer()
    }
};
samhsa.locator.FacilityLayerModel.prototype.hideFacilityFusionLayer = function () {
    if (this.multiCriteriaFusionMapLayerWrapper !== undefined) {
        this.multiCriteriaFusionMapLayerWrapper.hideLayer()
    }
};
samhsa.locator.FacilityLayerModel.prototype.showFacilityFusionLayer = function () {
    if (this.multiCriteriaFusionMapLayerWrapper !== undefined) {
        this.multiCriteriaFusionMapLayerWrapper.showLayer()
    }
};
samhsa.locator.StartLocationSearchModel = function (a) {
    this.parentModel = a;
    this.initializeInputAutoCompleteHeader();
    this.address = ""
};
samhsa.locator.StartLocationSearchModel.prototype.LIMIT_TYPE_VAL_STATE = 0;
samhsa.locator.StartLocationSearchModel.prototype.LIMIT_TYPE_VAL_COUNTY = 1;
samhsa.locator.StartLocationSearchModel.prototype.LIMIT_TYPE_VAL_DISTANCE = 2;
samhsa.locator.StartLocationSearchModel.prototype.isLimitTypeState = function () {
    var a = (this.limitType == this.LIMIT_TYPE_VAL_STATE);
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.isLimitTypeCounty = function () {
    var a = (this.limitType == this.LIMIT_TYPE_VAL_COUNTY);
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.isLimitTypeDistance = function () {
    var a = (this.limitType == this.LIMIT_TYPE_VAL_DISTANCE);
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.addAddressChangeListener = function (a) {
    if (this.listenerArrayAddressChange === undefined) {
        this.listenerArrayAddressChange = new Array()
    }
    this.listenerArrayAddressChange.push(a)
};
samhsa.locator.StartLocationSearchModel.prototype.fireAddressChangedEvent = function () {
    if (this.listenerArrayAddressChange === undefined) {
        return
    }
    for (var a = 0; a < this.listenerArrayAddressChange.length; a++) {
        this.listenerArrayAddressChange[a]()
    }
};
samhsa.locator.StartLocationSearchModel.prototype.addLimitChangeListener = function (a) {
    if (this.listenerArrayLimitChange === undefined) {
        this.listenerArrayLimitChange = new Array()
    }
    this.listenerArrayLimitChange.push(a)
};
samhsa.locator.StartLocationSearchModel.prototype.fireLimitChangedEvent = function () {
    if (this.listenerArrayLimitChange === undefined) {
        return
    }
    for (var a = 0; a < this.listenerArrayLimitChange.length; a++) {
        this.listenerArrayLimitChange[a]()
    }
};
samhsa.locator.StartLocationSearchModel.prototype.addInputErrorListener = function (a) {
    if (this.inputErrorlistenerArray === undefined) {
        this.inputErrorlistenerArray = new Array()
    }
    this.inputErrorlistenerArray.push(a)
};
samhsa.locator.StartLocationSearchModel.prototype.fireInputErrorChangeEvent = function () {
    if (this.inputErrorlistenerArray === undefined) {
        return
    }
    for (var a = 0; a < this.inputErrorlistenerArray.length; a++) {
        this.inputErrorlistenerArray[a]()
    }
};
samhsa.locator.StartLocationSearchModel.prototype.addStartMarkerChangeListener = function (a) {
    if (this.listenerArrayStartMarkerChange === undefined) {
        this.listenerArrayStartMarkerChange = new Array()
    }
    this.listenerArrayStartMarkerChange.push(a)
};
samhsa.locator.StartLocationSearchModel.prototype.fireStartMarkerChangeEvent = function (b) {
    if (this.listenerArrayStartMarkerChange === undefined) {
        return
    }
    for (var a = 0; a < this.listenerArrayStartMarkerChange.length; a++) {
        this.listenerArrayStartMarkerChange[a](b)
    }
};
samhsa.locator.StartLocationSearchModel.prototype.getCountryShortNameFromGeocodedResults = function (c) {
    for (var b in c[0].address_components) {
        var a = c[0].address_components[b];
        for (typeIndex in a.types) {
            if (a.types[typeIndex] === "country") {
                return a.short_name
            }
        }
    }
};
samhsa.locator.StartLocationSearchModel.prototype.isGeocodedResultBelongsToUSA = function (a) {
    var b = this.getCountryShortNameFromGeocodedResults(a);
    if (b === undefined) {
        return true
    }
    if (b === "US" || b === "PR" || b === "VI" || b === "AS" || b === "GU") {
        return true
    }
    return false
};
samhsa.locator.StartLocationSearchModel.prototype.startingLocationChanged = function (a) {
    var c = this;
    this.setHasError(false);
    if (a === undefined || $.trim(a) === "") {
        if (this.hasStartPosition()) {
            this.setStartLocation(null);
            this.setAddress(null)
        }
        return
    }
    var b = new google.maps.Geocoder();
    b.geocode({
        address: a
    }, function (e, d) {
        if (d === google.maps.GeocoderStatus.OK) {
            if (!c.isGeocodedResultBelongsToUSA(e)) {
                c.setHasError(true);
                return
            }
            c.setAddress(e[0].formatted_address);
            c.setStartLocation(e[0].geometry.location)
        } else {
            c.setHasError(true);
            return
        }
    })
};
samhsa.locator.StartLocationSearchModel.prototype.setStartLocation = function (a) {
    this.startLocation = a;
    this.fireStartMarkerChangeEvent(a)
};
samhsa.locator.StartLocationSearchModel.prototype.setAddress = function (a) {
    this.address = a;
    this.parentModel.pLocatorServiceSelectModel.triggerDelayedDataFetching();
    this.fireAddressChangedEvent()
};
samhsa.locator.StartLocationSearchModel.prototype.setLimitType = function (b, a, e) {
    var d = false;
    if (this.LIMIT_TYPE_VAL_STATE == b && isPositiveInteger(a)) {
        this.limitType = b;
        this.limitValue = a;
        this.stateId = a;
        d = true
    } else {
        if (this.LIMIT_TYPE_VAL_COUNTY == b && isPositiveInteger(a)) {
            this.limitType = b;
            this.limitValue = a;
            this.countyId = a;
            d = true
        } else {
            if (this.LIMIT_TYPE_VAL_DISTANCE == b && isPositiveNumber(a)) {
                this.limitType = b;
                this.limitValue = a;
                this.distance = a;
                d = true
            } else {
                this.limitType = null;
                this.limitValue = null;
                this.stateId = null;
                this.countyId = null;
                this.distance = null
            }
        }
    }
    if (d) {
        var c = true;
        if (undefined !== e) {
            c = e
        }
        if (c) {
            this.parentModel.pLocatorServiceSelectModel.triggerDelayedDataFetching();
            this.fireLimitChangedEvent()
        }
    } else {
        this.parentModel.pLocatorServiceSelectModel.triggerDelayedDataFetching();
        this.fireLimitChangedEvent()
    }
};
samhsa.locator.StartLocationSearchModel.prototype.setHasError = function (a) {
    this.hasError = a;
    this.fireInputErrorChangeEvent()
};
samhsa.locator.StartLocationSearchModel.prototype.initializeInputAutoCompleteHeader = function () {
    var a = document.getElementById(this.parentModel.modelOptions.startLocSearchInputTxtId);
    if (undefined !== a) {
        var b = new google.maps.places.Autocomplete(a);
        b.setComponentRestrictions({
            country: "us"
        });
        var c = this.parentModel.map;
        b.bindTo("bounds", c);
        this.marker = new google.maps.Marker({
            map: c
        })
    }
};
samhsa.locator.StartLocationSearchModel.prototype.hasLimit = function () {
    var a = true;
    if (this.limitType === undefined || this.limitType === null) {
        a = false
    }
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.hasStartPosition = function () {
    var a = true;
    if (this.startLocation === null || this.startLocation === undefined) {
        a = false
    }
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.createStartLngLatQueryString = function () {
    if (!this.hasStartPosition()) {
        return ""
    }
    return this.getStartLng() + " " + this.getStartLat()
};
samhsa.locator.StartLocationSearchModel.prototype.getStartPosition = function () {
    return this.startLocation
};
samhsa.locator.StartLocationSearchModel.prototype.getStartLat = function () {
    return this.startLocation.lat()
};
samhsa.locator.StartLocationSearchModel.prototype.getStartLng = function () {
    return this.startLocation.lng()
};
samhsa.locator.StartLocationSearchModel.prototype.getLatLngForLocatorSpatialQuery = function () {
    var a = null;
    if (this.hasStartPosition()) {
        a = this.startLocation.lat() + ";" + this.startLocation.lng()
    }
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.getDistanceInMeters = function () {
    return this.distance
};
samhsa.locator.StartLocationSearchModel.prototype.getDistanceInMiles = function () {
    var a = (this.distance) ? convertDistanceFromMetersToMiles(this.distance) : undefined;
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.setSearchAreaBounds = function (a) {
    if (a instanceof google.maps.LatLngBounds) {
        this.searchAreaBounds = a;
        this.parentModel.map.fitBounds(this.searchAreaBounds)
    }
};
samhsa.locator.StartLocationSearchModel.prototype.getSearchAreaBounds = function () {
    if (undefined === this.searchAreaBounds) {
        this.searchAreaBounds = null
    }
    return this.searchAreaBounds
};
samhsa.locator.StartLocationSearchModel.prototype.createLimitQueryString = function () {
    var b = "limitType={0}&limitValue={1}",
        a = "";
    if (this.hasLimit() && this.hasStartPosition()) {
        a = b.replace("{0}", this.limitType).replace("{1}", this.limitValue)
    }
    return a
};
samhsa.locator.StartLocationSearchModel.prototype.generatePartialUrl = function (b, a) {
    if (!this.hasStartPosition()) {
        return ""
    }
    var c = "";
    var d = 0;
    if (this.address !== undefined && this.address !== null && $.trim(this.address) !== "") {
        c = c + b + "=" + encodeURIComponent(this.address);
        d += 1
    } else {
        if (this.getStartPosition()) {
            c = c + a + "=" + (this.getStartPosition().lat() + "," + this.getStartPosition().lng());
            d += 1
        }
    }
    if (this.hasLimit()) {
        if (0 < d) {
            c = c + "&"
        }
        c = c + this.createLimitQueryString();
        d += 1
    }
    return c
};
samhsa.locator.StartLocationSearchModel.prototype.generateFusionQueryCriteriaString = function () {
    if (!this.hasLimit()) {
        return ""
    }
    var a = "";
    if (this.limitType == "0") {
        a = "boundary_state_id=" + this.stateId
    } else {
        if (this.limitType == "1") {
            a = "boundary_county_id=" + this.countyId
        } else {
            if (this.limitType == "2") {
                a = "ST_INTERSECTS(latitude, CIRCLE(LATLNG (" + this.getStartLat() + ", " + this.getStartLng() + ")," + this.distance + "))"
            }
        }
    }
    return a
};
samhsa.locator.LocatorServiceSelectModel = function (a) {
    this.parentModel = a;
    this.serviceSelectionDataMode = this.parentModel.modelOptions.serviceSelectionDataMode;
    this.serviceType = "both";
    this.hrsaHcc = false;
    this.serviceVA = this.findServiceByServiceCode("VAMC");
    this.categoryVA = this.findCategoryByServiceCode("VAMC")
};
samhsa.locator.LocatorServiceSelectModel.prototype.addChangeListener = function (a) {
    if (this.listenerArray === undefined) {
        this.listenerArray = new Array()
    }
    this.listenerArray.push(a)
};
samhsa.locator.LocatorServiceSelectModel.prototype.fireChangedEvent = function () {
    if (this.listenerArray === undefined) {
        return
    }
    for (var a = 0; a < this.listenerArray.length; a++) {
        this.listenerArray[a]()
    }
};
samhsa.locator.LocatorServiceSelectModel.prototype.addServiceTypeChangeListener = function (a) {
    if (this.listenerArrayServiceType === undefined) {
        this.listenerArrayServiceType = new Array()
    }
    this.listenerArrayServiceType.push(a)
};
samhsa.locator.LocatorServiceSelectModel.prototype.fireServiceTypeChangedEvent = function () {
    if (this.listenerArrayServiceType === undefined) {
        return
    }
    for (var a = 0; a < this.listenerArrayServiceType.length; a++) {
        this.listenerArrayServiceType[a]()
    }
};
samhsa.locator.LocatorServiceSelectModel.prototype.setServiceType = function (a) {
    this.serviceType = a;
    this.fireServiceTypeChangedEvent();
    this.triggerDelayedDataFetching()
};
samhsa.locator.LocatorServiceSelectModel.prototype.updateSelectedService = function (b, d, e) {
    var c = this.serviceSelectionDataMode.serviceCategories[b];
    var a = c.services[d];
    a.selected = e;
    this.checkCategoryChildrenSelected(c);
    this.fireChangedEvent();
    this.triggerDelayedDataFetching()
};
samhsa.locator.LocatorServiceSelectModel.prototype.findServiceByServiceCode = function (f) {
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var g in a) {
        var e = a[g];
        var b = e.services;
        for (var d in b) {
            service = b[d];
            if (service.code === f) {
                return service
            }
        }
    }
    return null
};
samhsa.locator.LocatorServiceSelectModel.prototype.findCategoryByServiceCode = function (f) {
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var g in a) {
        var e = a[g];
        var b = e.services;
        for (var d in b) {
            service = b[d];
            if (service.code === f) {
                return e
            }
        }
    }
    return null
};
samhsa.locator.LocatorServiceSelectModel.prototype.checkCategoryChildrenSelected = function (d) {
    var c = d.services;
    d.hasSelectedChild = false;
    for (var b = 0; b < c.length; b++) {
        var a = c[b];
        if (a.selected) {
            d.hasSelectedChild = true;
            return
        }
    }
};
samhsa.locator.LocatorServiceSelectModel.prototype.setSelectedCodeArray = function (b) {
    if (b === undefined || b === null) {
        return
    }
    for (var a in b) {
        this.selectServiceByCode(b[a])
    }
    return null
};
samhsa.locator.LocatorServiceSelectModel.prototype.selectServiceByCode = function (f) {
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var g in a) {
        var e = a[g];
        var b = e.services;
        for (var d in b) {
            service = b[d];
            if (service.code === f) {
                service.selected = true;
                e.hasSelectedChild = true;
                return
            }
        }
    }
};
samhsa.locator.LocatorServiceSelectModel.prototype.getSelectedServiceCodeArray = function () {
    var a = this.serviceType;
    if (a === "sa") {
        return this.getSelectedSaCodeArray()
    } else {
        if (a === "mh") {
            return this.getSelectedMhCodeArray()
        } else {
            if (a === "both") {
                return this.getSelectedBothCodeArray()
            }
        }
    }
    return null
};
samhsa.locator.LocatorServiceSelectModel.prototype.getSelectedSaCodeArray = function () {
    if (this.serviceSelectionDataMode === undefined || this.serviceSelectionDataMode === null) {
        return null
    }
    var b = new Array();
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var g in a) {
        var f = a[g];
        if (!f.saCode) {
            continue
        }
        if (f.hasSelectedChild === false) {
            continue
        }
        var d = f.services;
        for (var e in d) {
            service = d[e];
            if (service.saCode && service.selected) {
                b.push(service.code)
            }
        }
    }
    return b
};
samhsa.locator.LocatorServiceSelectModel.prototype.getSelectedMhCodeArray = function () {
    if (this.serviceSelectionDataMode === undefined || this.serviceSelectionDataMode === null) {
        return null
    }
    var b = new Array();
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var g in a) {
        var f = a[g];
        if (!f.mhCode) {
            continue
        }
        if (f.hasSelectedChild === false) {
            continue
        }
        var d = f.services;
        for (var e in d) {
            service = d[e];
            if (service.mhCode && service.selected) {
                b.push(service.code)
            }
        }
    }
    return b
};
samhsa.locator.LocatorServiceSelectModel.prototype.getSelectedBothCodeArray = function () {
    if (this.serviceSelectionDataMode === undefined || this.serviceSelectionDataMode === null) {
        return null
    }
    var b = new Array();
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var g in a) {
        if (g === "gaAddons") {
            continue
        }
        var f = a[g];
        if (!f.bothCode) {
            continue
        }
        if (f.hasSelectedChild === false) {
            continue
        }
        var d = f.services;
        for (var e in f.services) {
            if (e === "gaAddons") {
                continue
            }
            service = f.services[e];
            if (service.bothCode && service.selected) {
                b.push(service.code)
            }
        }
    }
    return b
};
samhsa.locator.LocatorServiceSelectModel.prototype.anyServiceSelected = function () {
    var a = this.serviceType;
    if (a === "sa") {
        return this.anySaServiceSelected()
    } else {
        if (a === "mh") {
            return this.anyMhServiceSelected()
        } else {
            if (a === "both") {
                return this.anyBothServiceSelected()
            }
        }
    }
    return null
};
samhsa.locator.LocatorServiceSelectModel.prototype.anySaServiceSelected = function () {
    if (this.serviceSelectionDataMode === undefined || this.serviceSelectionDataMode === null) {
        return false
    }
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var f in a) {
        var e = a[f];
        if (!e.saCode) {
            continue
        }
        if (e.hasSelectedChild === false) {
            continue
        }
        var b = e.services;
        for (var d in b) {
            service = b[d];
            if (service.saCode && service.selected) {
                return true
            }
        }
    }
    return false
};
samhsa.locator.LocatorServiceSelectModel.prototype.anyMhServiceSelected = function () {
    if (this.serviceSelectionDataMode === undefined || this.serviceSelectionDataMode === null) {
        return false
    }
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var f in a) {
        var e = a[f];
        if (!e.mhCode) {
            continue
        }
        if (e.hasSelectedChild === false) {
            continue
        }
        var b = e.services;
        for (var d in b) {
            service = b[d];
            if (service.mhCode && service.selected) {
                return true
            }
        }
    }
    return false
};
samhsa.locator.LocatorServiceSelectModel.prototype.anyBothServiceSelected = function () {
    if (this.serviceSelectionDataMode === undefined || this.serviceSelectionDataMode === null) {
        return false
    }
    var a = this.serviceSelectionDataMode.serviceCategories;
    for (var f in a) {
        var e = a[f];
        if (!e.bothCode) {
            continue
        }
        if (e.hasSelectedChild === false) {
            continue
        }
        var b = e.services;
        for (var d in b) {
            service = b[d];
            if (service.bothCode && service.selected) {
                return true
            }
        }
    }
    return false
};
samhsa.locator.LocatorServiceSelectModel.prototype.includeHRSA = function () {
    if (this.hrsaHcc === undefined || this.hrsaHcc === false) {
        return false
    }
    return true
};
samhsa.locator.LocatorServiceSelectModel.prototype.setHRSA = function (a) {
    this.hrsaHcc = a ? true : false
};
samhsa.locator.LocatorServiceSelectModel.prototype.generatePartialUrl = function (a, d) {
    var c = a + "=" + this.serviceType;
    if (this.includeHRSA()) {
        c = c + "&includeHRSA=1"
    }
    var b = this.getSelectedServiceCodeArray();
    if (b !== undefined && b !== null && b.length > 0) {
        c = c + "&" + d + "=" + encodeURIComponent(JSON.stringify(b))
    }
    return c
};
samhsa.locator.LocatorServiceSelectModel.prototype.createServiceAjaxQueryCriteriaString = function (c, a) {
    var b = "";
    if (a) {
        if (c === "sa") {
            b = "type_facility_code IN (1,3)"
        } else {
            if (c === "mh") {
                b = "type_facility_code IN (2,3)"
            } else {
                b = "type_facility_code IN (1,2,3)"
            }
        }
    } else {
        if (c === "sa") {
            b = "type_facility_code=1"
        } else {
            if (c === "mh") {
                b = "type_facility_code=2"
            } else {
                b = "type_facility_code IN (1,2)"
            }
        }
    }
    return b
};
samhsa.locator.LocatorServiceSelectModel.prototype.getAllServiceCriteriaString = function () {
    this.parentModel.determineIfForceNotShowFacility();
    if (this.parentModel.forceNotShowIfNoServiceSelected === true) {
        return "frid='not-existed'"
    }
    var e = this.getSelectedServiceCodeArray();
    var d = this.serviceType;
    var a = this.includeHRSA();
    var b = this.createServiceAjaxQueryCriteriaString(d, a);
    for (var c in e) {
        if (c != "gaAddons") {
            var f = e[c];
            if (c == "0" && b.length <= 0) {
                b += (f.toLowerCase() + "=1")
            } else {
                b += (" and " + f.toLowerCase() + "=1")
            }
        }
    }
    return b
};
samhsa.locator.LocatorServiceSelectModel.SUBLAYER_SELECTION_TIMER_DELAY_IN_MS = 1000;
samhsa.locator.LocatorServiceSelectModel.prototype.triggerDelayedDataFetching = function () {
    var a = this;
    if (this.timer !== null && this.timer !== undefined) {
        clearTimeout(this.timer)
    }
    this.timer = setTimeout(function () {
        a.parentModel.pFacilityListingDataModel.recordCurrentPage = 1;
        a.parentModel.pFacilityListingDataModel.fetchAndRenderFacilityTable();
        a.parentModel.pFacilityLayerModel.refresh()
    }, samhsa.locator.LocatorServiceSelectModel.SUBLAYER_SELECTION_TIMER_DELAY_IN_MS)
};
samhsa.locator.MapSelectableModelMobile = function (a) {
    this.forceNotShowIfNoServiceSelected = true;
    if (undefined === a || null === a) {
        throw new Error("modelOptions is undefined or null!")
    } else {
        this.modelOptions = a;
        if (undefined === a.mapCanvasElementId) {
            throw new Error("mapCanvasElementId is undefined in modelOptions!")
        } else {
            this.mapCanvasElementId = a.mapCanvasElementId
        }
        if (undefined === a.fusionTableIdStateBoundary) {
            throw new Error("fusionTableIdStateBoundary is undefined in modelOptions!")
        } else {
            this.fusionTableIdStateBoundary = a.fusionTableIdStateBoundary
        }
        if (undefined === a.fusionTableIdCountyBoundary) {
            throw new Error("fusionTableIdCountyBoundary is undefined in modelOptions!")
        } else {
            this.fusionTableIdCountyBoundary = a.fusionTableIdCountyBoundary
        }
    }
    this.initializeGoogleMapApi();
    this.pOptionSettingModel = new samhsa.locator.OptionSettingModel(this);
    this.pLocatorServiceSelectModel = new samhsa.locator.LocatorServiceSelectModel(this);
    this.pLocatorServiceSelectMobileView = new samhsa.locator.LocatorServiceSelectMobileView(this);
    this.pFacilityLayerModel = new samhsa.locator.FacilityLayerModel(this);
    this.pServiceSelectionMenuMobileView = new samhsa.locator.ServiceSelectionMenuMobileView(this);
    this.pPinMarkerModel = new samhsa.locator.PinMarkerModel(this);
    this.pMapContextMenu = new samhsa.locator.MapContextMenu(this);
    this.pStartLocationSearchModel = new samhsa.locator.StartLocationSearchModel(this);
    this.pStartLocationSearchMobileView = new samhsa.locator.StartLocationSearchMobileView(this);
    this.pFacilityListingDataModel = new samhsa.locator.FacilityListingDataModel(this);
    this.pFacilityListingMobileView = new samhsa.locator.FacilityListingMobileView(this);
    this.pFacilityListingDataModel.recordPageSize = 30;
    this.pFilterSortModel = new samhsa.locator.FilterSortModel(this);
    this.handleWindowResize();
    this.toolbarToggle()
};
samhsa.locator.MapSelectableModelMobile.prototype.toolbarToggle = function () {
    $(".s800-toolbar").on("click", "button", function () {
        $(this).toggleClass("selected").siblings(".selected").removeClass("selected")
    })
};
samhsa.locator.MapSelectableModelMobile.prototype.handleWindowResize = function () {
    $(window).resize(function () {
        if (window.innerWidth > 800) {
            var a = "/locator_nv" + location.search;
            location.replace(a)
        }
    });
    $(window).trigger("resize")
};
samhsa.locator.MapSelectableModelMobile.prototype.addShowLayerOnMapListener = function (a) {
    if (this.listenerArrayShowLayerOnMap === undefined) {
        this.listenerArrayShowLayerOnMap = new Array()
    }
    this.listenerArrayShowLayerOnMap.push(a)
};
samhsa.locator.MapSelectableModelMobile.prototype.fireShowLayerOnMapEvent = function (b) {
    if (this.listenerArrayShowLayerOnMap === undefined) {
        return
    }
    for (var a = 0; a < this.listenerArrayShowLayerOnMap.length; a++) {
        this.listenerArrayShowLayerOnMap[a](b)
    }
};
samhsa.locator.MapSelectableModelMobile.prototype.determineIfForceNotShowFacility = function () {
    var e = true;
    if (this.pStartLocationSearchModel === undefined || this.pLocatorServiceSelectModel === undefined || this.pFacilityListingDataModel === undefined) {
        this.forceNotShowIfNoServiceSelected = true;
        return
    }
    var c = this.pStartLocationSearchModel.hasStartPosition();
    var b = this.pLocatorServiceSelectModel.anyServiceSelected();
    var a = (this.pFacilityLayerModel.mode === "cluster");
    var d = this.pFacilityListingDataModel.showFacilitiesAtStart;
    if (c || b || a || d) {
        e = false
    }
    this.forceNotShowIfNoServiceSelected = e
};
samhsa.locator.MapSelectableModelMobile.prototype.registerMapdleEvent = function () {
    var a = this;
    google.maps.event.addListener(this.map, "idle", function () {
        if (a.pFacilityLayerModel.mode === "fusion") {
            return
        }
        a.pFacilityLayerModel.refresh()
    })
};
samhsa.locator.MapSelectableModelMobile.prototype.getLayerInfoArrayForDbQuery = function () {
    var a = this.layerArray;
    var b = a.length;
    var e = new Array();
    for (var c = b - 1; c >= 0; c--) {
        var d = a[c].getLayerInfoForDbQuery();
        if (d !== null) {
            e.push(d)
        }
    }
    return e
};
samhsa.locator.MapSelectableModelMobile.prototype.bindNav1ClickForHideShowLayer = function () {
    var a = this.layerArray;
    var b = a.length;
    for (var c = b - 1; c >= 0; c--) {
        var d = a[c].getLevel1NavigationElementSelector();
        if (d === undefined || d === "") {
            continue
        }
        $(d).data("iLayer", c);
        $(d).click(function (j, g) {
            var f = $(this).is(":checked");
            var h = $(this).data("iLayer");
            a[h].setShowLayer(f);
            return false
        })
    }
};
samhsa.locator.MapSelectableModelMobile.prototype.initializeGoogleMapApi = function () {
    var b = new google.maps.LatLng(38.648911, -94.921875);
    var a = {
        center: b,
        zoom: 4,
        minZoom: 3,
        disableDoubleClickZoom: true,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("s800-map-canvas"), a)
};
samhsa.locator.MapSelectableModelMobile.prototype.setLastRightClickedLatLng = function (a) {
    this.lastRightClickedLatLng = a
};
samhsa.locator.MapSelectableModelMobile.prototype.getLastRightClickedLatLng = function () {
    return this.lastRightClickedLatLng
};
samhsa.locator.MapSelectableModelMobile.prototype.redrawMap = function () {
    google.maps.event.trigger(this.map, "resize")
};
samhsa.locator.MapSelectableModelMobile.prototype.bindMapCanvasRightClickEvent = function () {
    var a = this;
    google.maps.event.addListener(this.map, "rightclick", function (b) {
        a.hideAllContextMenu();
        a.setLastRightClickedLatLng(b.latLng);
        $("#nav_context").css("left", b.pixel.x).css("top", b.pixel.y).show();
        return false
    })
};
samhsa.locator.MapSelectableModelMobile.prototype.hideAllContextMenu = function () {
    this.pMapContextMenu.hideAllContextMenu()
};
samhsa.locator.MapSelectableModelMobile.prototype.generateDownloadExcelUrl = function () {
    var b = "locatorExcel";
    var a = this.generateUrlParameters();
    return b + a
};
samhsa.locator.MapSelectableModelMobile.prototype.generatePrintUrl = function () {
    var b = "locatorPrint";
    var a = this.generateUrlParameters();
    return b + a
};
samhsa.locator.MapSelectableModelMobile.prototype.generateUrl = function () {
    var b = window.location.protocol + "//" + window.location.host;
    var d = window.location.pathname;
    b = b + d;
    var a = this.generateUrlParameters();
    b = b + a;
    var c = "This email's sender wishes to share the following link to a selection of substance abuse or mental health treatment facilities found on the SAMHSA Behavioral Health Treatment Services Locator:\n\n" + b;
    this.pFacilityListingDataModel.shareUrlParameters = a;
    $("#message").val(c)
};
samhsa.locator.MapSelectableModelMobile.prototype.generateUrlParameters = function () {
    var d = "";
    var e = false;
    var b = this.pOptionSettingModel.generatePartialUrl("option");
    if (b !== undefined && b !== "") {
        d = d.concat(this.addDelimiter(b, e));
        e = true
    }
    var c = this.pStartLocationSearchModel.generatePartialUrl("sAddr", "sLatlng");
    if (c !== undefined && c !== "") {
        d = d.concat(this.addDelimiter(c, e));
        e = true
    }
    var a = this.pLocatorServiceSelectModel.generatePartialUrl("sType", "sCodes");
    if (a !== undefined && a !== "") {
        d = d.concat(this.addDelimiter(a, e));
        e = true
    }
    var f = this.pFilterSortModel.generatePartialUrl();
    if (f !== undefined && f !== "") {
        d = d.concat(this.addDelimiter(f, e));
        e = true
    }
    return d
};
samhsa.locator.MapSelectableModelMobile.prototype.addDelimiter = function (b, a) {
    if (a) {
        return "&" + b
    }
    return "?" + b
};
samhsa.locator.MapSelectableModelMobile.prototype.applyModelDataChange = function (a) {
    if (a === undefined || a === null || isEmptyObject(a)) {
        return
    }
    var c = a.option;
    if (c !== undefined && c !== null) {
        this.pOptionSettingModel.setOptionArray(c)
    }
    var d = a.sType;
    if (d !== undefined) {
        if (d === "both" || d === "sa" || d === "mh") {
            this.pLocatorServiceSelectModel.setServiceType(d)
        }
    }
    var b = a.includeHRSA;
    if (undefined !== b && null !== b) {
        var e = false;
        if ("true" === b.toLowerCase().trim() || true === b) {
            e = true
        }
        this.pLocatorServiceSelectModel.setHRSA(e)
    }
    var f = a.sCodes;
    if (f !== undefined && f !== null) {
        this.pLocatorServiceSelectModel.setSelectedCodeArray(f)
    }
    this.pLocatorServiceSelectModel.triggerDelayedDataFetching();
    this.pFilterSortModel.sort = a.sort;
    this.pFilterSortModel.filterFacilityName = a.filterFName;
    this.pFilterSortModel.filterFacilityAddress = a.filterFAddress;
    this.pFilterSortModel.filterFacilityPhone = a.filterFPhone;
    this.pFilterSortModel.setUiFromModel();
    this.pStartLocationSearchModel.setLimitType(a.limitType, a.limitValue, true);
    if (undefined !== a.lat && null !== a.lat && undefined !== a.lng && null !== a.lng) {
        this.pStartLocationSearchModel.setStartLocation(new google.maps.LatLng(a.lat, a.lng))
    } else {
        if (undefined !== a.sAddr && null !== a.sAddr) {
            this.pStartLocationSearchModel.startingLocationChanged(a.sAddr)
        }
    }
};
samhsa.locator.MapSelectableModelMobile.prototype.closeAllOpenedDialog = function () {
    this.pMapContextMenu.hideAllContextMenu();
    this.pFilterSortModel.closeSortFilterDialog()
};
samhsa.locator.MapSelectableModelMobile.prototype.createServiceFusionQueryCriteriaString = function (c, a) {
    var b = "";
    if (a) {
        if (c === "sa") {
            b = "type_facility_code not equal to 2 "
        } else {
            if (c === "mh") {
                b = "type_facility_code not equal to  1"
            } else {
                if (c === "hcc") {
                    b = "type_facility_code=3"
                } else {}
            }
        }
    } else {
        if (c === "sa") {
            b = "type_facility_code=1"
        } else {
            if (c === "mh") {
                b = "type_facility_code=2"
            } else {
                b = "type_facility_code not equal to 3"
            }
        }
    }
    return b
};
samhsa.locator.MapSelectableModelMobile.prototype.getFusionQueryCriteriaString = function () {
    this.determineIfForceNotShowFacility();
    if (this.forceNotShowIfNoServiceSelected === true) {
        return "frid='not-existed'"
    }
    var f = this.pLocatorServiceSelectModel.getSelectedServiceCodeArray();
    var e = this.pLocatorServiceSelectModel.serviceType;
    var a = this.pLocatorServiceSelectModel.includeHRSA();
    var c = this.createServiceFusionQueryCriteriaString(e, a);
    for (var d in f) {
        if (d != "gaAddons") {
            var g = f[d];
            if (d == "0" && c.length <= 0) {
                c += (g.toLowerCase() + "=1")
            } else {
                c += (" and " + g.toLowerCase() + "=1")
            }
        }
    }
    var b = this.pStartLocationSearchModel.generateFusionQueryCriteriaString();
    if (b !== undefined && b !== null && b !== "") {
        if (c.length > 0) {
            c = c + " and " + b
        } else {
            c = b
        }
    }
    return c
};
samhsa.locator.MapSelectableModelMobile.prototype.triggerMapTileRefreshTimer = function (a) {
    if (this.timerReloadMapTile !== undefined || this.timerReloadMapTile !== null) {
        clearTimeout(this.timerReloadMapTile)
    }
    if (a === undefined) {
        a = 15000
    }
    this.timerReloadMapTile = setTimeout(function () {
        $("img[src*='googleapis']").each(function () {
            $(this).attr("src", $(this).attr("src") + "&" + (new Date()).getTime())
        });
        setTimeout(function () {
            $(this).attr("src", $(this).attr("src") + "&" + (new Date()).getTime())
        }, 3000)
    }, a)
};
samhsa.locator.MapSelectableModelMobile.prototype.updateUiElemsFromModel = function () {
    this.pStartLocationSearchMobileView.updateUiElemsForGeoParamsFromModel();
    this.pLocatorServiceSelectMobileView.updateUiFromModel()
};
samhsa.locator.FacilityListingMobileView = function (a) {
    this.parentModel = a;
    this.model = a.pFacilityListingDataModel;
    this.subscribeListingDataChangeEvent();
    this.bindMoreInfoEvents()
};
samhsa.locator.FacilityListingMobileView.prototype.subscribeListingDataChangeEvent = function () {
    var a = this;
    var b = function (c) {
        a.renderFacilityListing(c)
    };
    this.model.addListingDataChangeListener(b)
};
samhsa.locator.FacilityListingMobileView.prototype.renderFacilityListing = function (f) {
    if (f === undefined || f === null) {
        this.model.recordCurrentPage = 1;
        this.model.totalPages = 1;
        this.model.recordCount = 0
    } else {
        this.model.recordCurrentPage = f.page;
        this.model.totalPages = f.totalPages;
        this.model.recordCount = f.recordCount
    }
    var d = $("#s800-faclility-listing-template").html();
    var b = $("#s800-faclility-listing-data-div");
    for (var c = 0; c < f.rows.length; c += 1) {
        var a = f.rows[c].website;
        if (a && -1 === a.indexOf("://")) {
            f.rows[c].website = "http://" + a
        }
    }
    var e = Mustache.to_html(d, f);
    b.html(e);
    this.bindMoreInfoEvents();
    this.bindListingDirectionsEvent();
    if (f.totalPages !== 0) {
        $("#s800-pagination-div").show()
    }
    this.bindListingPaginationEvent();
    this.deactivatePaginationControlsSelectively()
};
samhsa.locator.FacilityListingMobileView.prototype.bindMoreInfoEvents = function () {
    $(".s800-more-information").click(function () {
        var c = $(this).parents(".s800-main-row").find(".nameFormoreinfo").text();
        var h = $(this).parents(".s800-main-row").find(".addressFormoreinfo").text();
        var d = $(this).parents(".s800-main-row").find(".phoneFormoreinfo").text();
        var b = $(this).parents(".s800-main-row").find(".intake1Formoreinfo");
        var g = $(this).parents(".s800-main-row").find(".intake2Formoreinfo");
        var a = $(this).parents(".s800-main-row").find(".webFormoreinfo p");
        var f = null;
        if (a.length > 0) {
            f = $(a[0]).html()
        }
        var e = $(this).parents(".s800-main-row").attr("id");
        $.ajax({
            context: this,
            url: "/locator/facilityServiceInfo/" + e,
            async: false,
            type: "POST",
            dataType: "json",
            success: function (o) {
                if (o.length <= 0) {
                    return
                }
                var n = {};
                for (var l = 0; l < o.length; l++) {
                    var j = o[l];
                    n[j.f2] = j.f3
                }
                var m = $("#s800-facility-more-info-template");
                var m = m.html();
                var k = Mustache.to_html(m, n);
                $("#s800-2-facility-list-panel").hide();
                $("#s800-facility-more-info-body").html(k);
                $("#s800moreInfoName").html(c);
                $("#s800moreInfoAddress").html(h);
                $("#s800moreInfoPhone").html(d);
                if (b.length > 0) {
                    $("#s800moreInfoIntake1").html($(b[0]).html())
                }
                if (g.length > 0) {
                    $("#s800moreInfoIntake2").html($(g[0]).html())
                }
                if (null !== f) {
                    $("#s800moreInfoWeb").html(f)
                }
                $("#s800-facility-more-info-div").show("slide", {
                    direction: "right"
                }, 500)
            },
            complete: function (i) {},
            timeout: function (i) {},
            error: function (j, k, i) {}
        })
    });
    $("#s800-facility-more-info-back").click(function () {
        $("#s800-facility-more-info-div").hide();
        $("#s800-2-facility-list-panel").show("slide", {
            direction: "left"
        }, 500)
    })
};
samhsa.locator.FacilityListingMobileView.prototype.bindListingPaginationEvent = function () {
    var a = this;
    var b = function () {
        a.deactivatePaginationControlsSelectively()
    };
    $("#s800-list-prev-page > a").click(function () {
        a.model.fetchPreviousPage();
        setTimeout(b, 300)
    });
    $("#s800-list-next-page > a").click(function () {
        a.model.fetchNextPage();
        setTimeout(b, 300)
    });
    $("#s800-list-first-page > a").click(function () {
        a.model.fetchFirstPage();
        setTimeout(b, 300)
    });
    $("#s800-list-last-page > a").click(function () {
        a.model.fetchLastPage();
        setTimeout(b, 300)
    })
};
samhsa.locator.FacilityListingMobileView.prototype.deactivatePaginationControlsSelectively = function () {
    var a = this;
    if (a.model.isOnFirstPage()) {
        $("#s800-list-first-page > a").hide();
        $("#s800-list-first-page > span").show();
        $("#s800-list-prev-page > a").hide();
        $("#s800-list-prev-page > span").show()
    }
    if (a.model.isOnLastPage()) {
        $("#s800-list-last-page > a").hide();
        $("#s800-list-last-page > span").show();
        $("#s800-list-next-page > a").hide();
        $("#s800-list-next-page > span").show()
    }
};
samhsa.locator.FacilityListingMobileView.prototype.bindListingDirectionsEvent = function () {
    var a = this;
    $(".s800-get-directions").click(function () {
        var d = a.parentModel.pStartLocationSearchModel.address;
        if (d === undefined || d === null) {
            return
        }
        var c = $(this).attr("id").split(",");
        var b = $("#s800-address-" + c[3]).text();
        a.directionServiceCall(d, b)
    })
};
samhsa.locator.FacilityListingMobileView.prototype.directionServiceCall = function (f, a) {
    var e = this;
    var d = e.parentModel.map;
    var c = new google.maps.DirectionsService();
    e.directionsDisplay = new google.maps.DirectionsRenderer();
    e.directionsDisplay.setMap(d);
    var b = {
        origin: f,
        destination: a,
        travelMode: google.maps.TravelMode.DRIVING
    };
    c.route(b, function (h, g) {
        if (g === google.maps.DirectionsStatus.OK) {
            e.directionsDisplay.setDirections(h);
            var k = h.routes[0].legs[0].distance.text + "  <b>Duration:</b> " + h.routes[0].legs[0].duration.text + "<br><br><b>Directions:</b><br><br>Start: <b>" + h.routes[0].legs[0].start_address + "</b><br><br>";
            for (var j = 0; j < h.routes[0].legs[0].steps.length; j++) {
                k += j + 1 + ". " + h.routes[0].legs[0].steps[j].instructions + "<br>"
            }
            k += "<br>Destination: <b>" + h.routes[0].legs[0].end_address + "</b><br><a title='Map View' style='float:right; margin-right: 20px;' href='https://www.google.com/maps/dir/" + encodeURIComponent(f) + "/" + encodeURIComponent(a) + "'; target='_blank'>Show On Google Map</a>";
            $("#s800-2-facility-list-panel").hide();
            $("#s800-facility-direction-body").html(k);
            $("#s800-facility-direction-div").show("slide", {
                direction: "right"
            }, 500)
        }
    });
    $("#s800-facility-direction-back").click(function () {
        $("#s800-facility-direction-div").hide();
        $("#s800-2-facility-list-panel").show("slide", {
            direction: "left"
        }, 500)
    })
};
samhsa.locator.LocatorServiceSelectMobileView = function (a) {
    this.parentModel = a;
    this.model = a.pLocatorServiceSelectModel;
    this.hccSelected = false;
    this.vaSelected = false;
    this.bindServiceSelections();
    this.subscribeChangeListener();
    this.bindVeteransAffairsQuickSelection();
    this.bindAllNoneReverseEvent();
    this.bindServiceTypeChangeEvent();
    this.subscribeServiceTypeChangeListener();
    this.subscribeShowLayerOnMapListener();
    $(".both-N").hide();
    $(".both-Y").show()
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.applyActiveStylingToInputListElement = function (a) {
    $(a).css("background-color", "#597986");
    $(a).css("color", "#FFF")
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.applyInactiveStylingToInputListElement = function (a) {
    $(a).css("background-color", "transparent");
    $(a).css("color", "#000")
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.updateUiFromModel = function () {
    var d = "li.s800-srchRBLbl[data-service-type='{0}']";
    var c = d.replace("{0}", "sa"),
        e = d.replace("{0}", "mh"),
        a = d.replace("{0}", "both");
    if ("sa" === this.model.serviceType) {
        this.applyActiveStylingToInputListElement(c);
        this.applyInactiveStylingToInputListElement(e);
        this.applyInactiveStylingToInputListElement(a)
    } else {
        if ("mh" === this.model.serviceType) {
            this.applyInactiveStylingToInputListElement(c);
            this.applyActiveStylingToInputListElement(e);
            this.applyInactiveStylingToInputListElement(a)
        } else {
            if ("both" === this.model.serviceType) {
                this.applyInactiveStylingToInputListElement(c);
                this.applyInactiveStylingToInputListElement(e);
                this.applyActiveStylingToInputListElement(a)
            }
        }
    }
    var b = this.model.includeHRSA();
    if (b) {
        this.applyActiveStylingToInputListElement("#s800-healthCare")
    } else {
        this.applyInactiveStylingToInputListElement("#s800-healthCare")
    }
    b = this.model.serviceVA.selected ? true : false;
    if (b) {
        this.applyActiveStylingToInputListElement("#s800-vetAffairs")
    } else {
        this.applyInactiveStylingToInputListElement("#s800-vetAffairs")
    }
    this.parentModel.pServiceSelectionMenuMobileView.updateServiceCheckboxFromServiceSelectedModel();
    this.populateSelectionsFromModel()
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.populateSelectionsFromModel = function () {
    var f = this;
    var e = this.model.getSelectedServiceCodeArray();
    if (e !== undefined && e !== null) {
        cntSelected = e.length
    }
    var d = "";
    if (cntSelected === 0) {
        d = "No service selected. Please select under CHOOSE menu."
    }
    if (this.model.serviceSelectionDataMode !== undefined) {
        this.model.serviceSelectionDataMode.lblMessage = d
    }
    var b = $("#s800-selectedServicesTemplate").html();
    var a = $("#s800-selected-service-div");
    var c = Mustache.to_html(b, this.model.serviceSelectionDataMode);
    a.html(c);
    $(".s800-icon-gradient-remove").click(function () {
        var k = false;
        var j = $(this).parents(".s800-service-category-ul").attr("id");
        var h = j.split("-");
        var g = h[3] - 1;
        var i = $(this).parent().val() - 1;
        f.model.updateSelectedService(g, i, k);
        if (f.parentModel.pPinMarkerModel.selectedFacilityMarker != null) {
            f.parentModel.pPinMarkerModel.selectedFacilityMarker.setRemove()
        }
        f.parentModel.pServiceSelectionMenuMobileView.updateServiceCheckboxFromServiceSelectedModel()
    })
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.subscribeChangeListener = function () {
    var b = this;
    var c = function () {
        b.populateSelectionsFromModel()
    };
    this.model.addChangeListener(c);
    var a = function () {
        console.log("testing this function");
        if (b.model.serviceVA.selected) {
            $("#s800-vetAffairs").css("background-color", "#597986");
            $("#s800-vetAffairs").css("color", "#fff");
            $("input[type='checkbox'][value='VAMC']").prop("checked", true)
        } else {
            $("#s800-vetAffairs").css("background-color", "transparent");
            $("#s800-vetAffairs").css("color", "#000");
            $("input[type='checkbox'][value='VAMC']").prop("checked", false)
        }
    };
    this.model.addChangeListener(a)
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.subscribeServiceTypeChangeListener = function () {
    var a = function () {};
    this.model.addServiceTypeChangeListener(a)
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.subscribeShowLayerOnMapListener = function () {
    var a = this;
    var b = function (c) {
        c.setMap(a.parentModel.map)
    };
    this.parentModel.addShowLayerOnMapListener(b)
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.bindServiceTypeChangeEvent = function () {
    var a = this;
    $(".s800-srchRBLbl").click(function () {
        var c = $("#s800-service-option-div").css("display");
        var b = $(this).attr("data-service-type");
        $(".s800-srchRBLbl").each(function () {
            $(this).css("background-color", "transparent");
            $(this).css("color", "#000")
        });
        $(this).css("background-color", "#597986");
        $(this).css("color", "#fff");
        if (b === "sa") {
            $("#s800-selected-service-type-text").html("Substance Abuse");
            $(".s800-service-code-div").hide();
            $("#s800-service-categories-ul").show();
            $(".sa-N").hide();
            $(".sa-Y").show();
            $("#s800-service-categories-ul li:visible").css("border-top", "0");
            $("#s800-service-categories-ul li:visible").first().css("border-top", "1px solid #000")
        } else {
            if (b === "mh") {
                $("#s800-selected-service-type-text").html("Mental Health");
                $(".s800-service-code-div").hide();
                $("#s800-service-categories-ul").show();
                $(".mh-N").hide();
                $(".mh-Y").show();
                $("#s800-service-categories-ul li:visible").css("border-top", "0");
                $("#s800-service-categories-ul li:visible").first().css("border-top", "1px solid #000")
            } else {
                if (b === "both") {
                    $("#s800-selected-service-type-text").html("Substance Abuse & Mental Health");
                    $(".s800-service-code-div").hide();
                    $("#s800-service-categories-ul").show();
                    $(".both-N").hide();
                    $(".both-Y").show();
                    $("#s800-service-categories-ul li:visible").css("border-top", "0");
                    $("#s800-service-categories-ul li:visible").first().css("border-top", "1px solid #000")
                }
            }
        }
        a.setServiceTypeInModelBasedOnUi()
    });
    $("#s800-healthCare").click(function () {
        if (!a.hccSelected) {
            $(this).css("background-color", "#597986");
            $(this).css("color", "#fff");
            a.hccSelected = true
        } else {
            $(this).css("background-color", "transparent");
            $(this).css("color", "#000");
            a.hccSelected = false
        }
        a.setServiceTypeInModelBasedOnUi()
    })
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.bindVeteransAffairsQuickSelection = function () {
    var a = this;
    $("#s800-vetAffairs").bind("click", function (b) {
        if (a.model.serviceVA.selected) {
            $(this).css("background-color", "transparent");
            $(this).css("color", "#000");
            a.model.serviceVA.selected = false
        } else {
            $(this).css("background-color", "#597986");
            $(this).css("color", "#fff");
            a.model.serviceVA.selected = true
        }
        a.model.checkCategoryChildrenSelected(a.model.categoryVA);
        a.model.fireChangedEvent();
        a.model.triggerDelayedDataFetching()
    })
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.setServiceTypeInModelBasedOnUi = function () {
    var c = this;
    var a;
    var b;
    $(".s800-srchRBLbl").each(function () {
        a = $(this).css("background-color");
        if (a === "rgb(89, 121, 134)") {
            b = $(this).attr("data-service-type");
            return false
        }
    });
    c.model.hrsaHcc = c.hccSelected;
    this.model.setServiceType(b)
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.bindServiceSelections = function () {
    var a = this;
    $("#s800-service-option-div .nav2 input").bind("click", function (c) {
        var e = isCheckBoxSelected(this);
        var b = $(this).closest("div.nav1").attr("data-category-index") - 1;
        var d = $(this).closest("li.nav2").val() - 1;
        a.model.updateSelectedService(b, d, e);
        c.stopPropagation()
    });
    $("#s800-service-option-div .nav2").bind("click", function (b) {
        b.stopPropagation()
    })
};
samhsa.locator.LocatorServiceSelectMobileView.prototype.bindAllNoneReverseEvent = function () {
    $(".s800-select_all").bind("click", function (a) {
        $(this).parent().parent().find("input").each(function () {
            var b = $(this).is(":checked");
            if (!b) {
                $(this).trigger("click")
            }
        });
        a.stopPropagation()
    });
    $(".s800-select_none").bind("click", function (a) {
        $(this).parent().parent().find("input").each(function () {
            var b = $(this).is(":checked");
            if (b) {
                $(this).trigger("click")
            }
        });
        a.stopPropagation()
    });
    $(".s800-select_reverse").bind("click", function (a) {
        $(this).parent().parent().find("input").trigger("click");
        a.stopPropagation()
    })
};
samhsa.locator.StartLocationSearchMobileView = function (a) {
    this.parentModel = a;
    this.model = a.pStartLocationSearchModel;
    this.subscribeInputErrorListener();
    this.subscribeAddressChangeListener();
    this.subscribeLimitChangeListener();
    this.subscribeStartMarkerChangeListener();
    this.bindUiEventsForLimit();
    this.bindSearchClickEvent()
};
samhsa.locator.StartLocationSearchMobileView.prototype.subscribeInputErrorListener = function () {
    var a = this;
    var b = function () {
        var c = a.parentModel.pStartLocationSearchModel.hasError;
        if (c) {
            $("#s800-search-field").css("border", "2px solid red")
        } else {
            $("#s800-search-field").css("border", "")
        }
    };
    this.parentModel.pStartLocationSearchModel.addInputErrorListener(b)
};
samhsa.locator.StartLocationSearchMobileView.prototype.subscribeAddressChangeListener = function () {
    var a = this;
    var b = function () {
        a.updateSearchTextField();
        a.redrawLimitOnMap()
    };
    this.parentModel.pStartLocationSearchModel.addAddressChangeListener(b)
};
samhsa.locator.StartLocationSearchMobileView.prototype.subscribeLimitChangeListener = function () {
    var a = this;
    var b = function () {
        a.redrawLimitOnMap()
    };
    this.parentModel.pStartLocationSearchModel.addLimitChangeListener(b)
};
samhsa.locator.StartLocationSearchMobileView.prototype.updateSearchTextField = function () {
    var a = this.parentModel.pStartLocationSearchModel.address;
    $("#s800-search-field").val(a)
};
samhsa.locator.StartLocationSearchMobileView.prototype.drawSearchLimitArea = function () {
    if (this.model.hasStartPosition() && this.model.hasLimit()) {
        if (this.model.LIMIT_TYPE_VAL_STATE == this.model.limitType) {
            this.drawLimitState()
        } else {
            if (this.model.LIMIT_TYPE_VAL_COUNTY == this.model.limitType) {
                this.drawLimitCounty()
            } else {
                if (this.model.LIMIT_TYPE_VAL_DISTANCE == this.model.limitType) {
                    this.drawLimitDistance()
                }
            }
        }
    }
};
samhsa.locator.StartLocationSearchMobileView.prototype.redrawLimitOnMap = function () {
    this.clearStartLocationRelatedDisplay();
    this.drawSearchLimitArea()
};
samhsa.locator.StartLocationSearchMobileView.prototype.clearStartLocationRelatedDisplay = function () {
    if (this.limitLayer !== undefined && this.limitLayer !== null) {
        this.limitLayer.setMap(null)
    }
};
samhsa.locator.StartLocationSearchMobileView.prototype.drawLimitState = function () {
    var a = "state_id in (" + this.model.stateId + ")";
    this.limitLayer = new google.maps.FusionTablesLayer({
        query: {
            select: "kml",
            from: "1My9ktYKz6ay8DgxqSOBMgDQRSEM-yL6NeJApPzE",
            where: a
        },
        suppressInfoWindows: true,
        styles: [{
            polygonOptions: {
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: "",
                fillOpacity: -100
            }
        }]
    });
    this.limitLayer.setMap(this.parentModel.map);
    this.parentModel.map.setZoom(6);
    this.parentModel.map.setCenter(new google.maps.LatLng(this.model.getStartLat(), this.model.getStartLng()))
};
samhsa.locator.StartLocationSearchMobileView.prototype.drawLimitCounty = function () {
    var a = "gid in (" + this.model.countyId + ")";
    this.limitLayer = new google.maps.FusionTablesLayer({
        query: {
            select: "kml",
            from: "1cRGDlaFoi_gXVfhDl4PRDEWPyieTQ2zPGJck2mc",
            where: a
        },
        suppressInfoWindows: true,
        styles: [{
            polygonOptions: {
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: "",
                fillOpacity: -100
            }
        }]
    });
    this.limitLayer.setMap(this.parentModel.map);
    this.parentModel.map.setZoom(9);
    this.parentModel.map.setCenter(new google.maps.LatLng(this.model.getStartLat(), this.model.getStartLng()));
    this.parentModel.triggerMapTileRefreshTimer()
};
samhsa.locator.StartLocationSearchMobileView.prototype.drawLimitDistance = function () {
    var d = this;
    var a = this.model.distance / 1;
    var e = "#FF0000";
    this.limitLayer = new google.maps.Circle({
        clickable: false,
        center: d.model.getStartPosition(),
        radius: a,
        strokeColor: e,
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0
    });
    var b = d.limitLayer;
    var c = d.parentModel.map;
    b.setMap(c);
    c.fitBounds(b.getBounds())
};
samhsa.locator.StartLocationSearchMobileView.prototype.subscribeStartMarkerChangeListener = function () {
    var a = this;
    var b = function (e) {
        if (e === undefined || e === null) {
            a.clearMarker();
            return
        }
        var d = e.lat();
        var c = e.lng();
        a.setStartMarkerPosition(d, c);
        a.model.address = d + ", " + c;
        a.redrawLimitOnMap()
    };
    this.model.addStartMarkerChangeListener(b)
};
samhsa.locator.StartLocationSearchMobileView.prototype.setStartMarkerPosition = function (d, a) {
    var b = this.parentModel.map;
    var c = {
        url: "../locator/public/images/green_start_arrow.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
    };
    this.clearMarker();
    if (d === undefined || a === undefined) {
        return
    }
    this.marker = new google.maps.Marker({
        map: b
    });
    this.marker.setPosition(new google.maps.LatLng(d, a));
    this.marker.setIcon(c);
    this.marker.setVisible(true);
    b.setCenter(this.marker.getPosition());
    b.setZoom(9)
};
samhsa.locator.StartLocationSearchMobileView.prototype.clearMarker = function () {
    if (this.marker === undefined || this.marker === null) {
        return
    }
    this.marker.setMap(null);
    this.marker = undefined
};
samhsa.locator.StartLocationSearchMobileView.prototype.bindUiEventsForLimit = function () {
    var c = this;
    var d = ["5", "10", "15", "25", "50", "100"];
    var b = 0;
    var a = 0;
    $("#s800-decrease-icon").click(function () {
        a = b - 1;
        $("#s800-rbCounty").prop("checked", false);
        $("#s800-rbState").prop("checked", false);
        $("#s800-rbDistance").prop("checked", true);
        if (a >= 0) {
            $("#s800-mile-limit-field").val(d[a]);
            b = a;
            c.parentModel.closeAllOpenedDialog();
            c.setLimitDataFromUI()
        }
    });
    $("#s800-increase-icon").click(function () {
        a = b + 1;
        $("#s800-rbCounty").prop("checked", false);
        $("#s800-rbState").prop("checked", false);
        $("#s800-rbDistance").prop("checked", true);
        if (a < d.length) {
            $("#s800-mile-limit-field").val(d[a]);
            b = a;
            c.parentModel.closeAllOpenedDialog();
            c.setLimitDataFromUI()
        }
    });
    $("#s800-mile-limit-field").keydown(function (f) {
        if (f.keyCode === 13) {
            f.preventDefault();
            setTimeout(function () {
                c.parentModel.closeAllOpenedDialog();
                c.setLimitDataFromUI()
            }, 500)
        }
    });
    $("#s800-mile-limit-field").focusin(function () {
        $("#s800-rbCounty").prop("checked", false);
        $("#s800-rbState").prop("checked", false);
        $("#s800-rbDistance").prop("checked", true)
    });
    $("#s800-mile-limit-field").focusout(function () {
        setTimeout(function () {
            c.parentModel.closeAllOpenedDialog();
            c.setLimitDataFromUI()
        }, 500)
    });
    $("#s800-rbState").click(function () {
        c.parentModel.closeAllOpenedDialog();
        $("#s800-rbCounty").prop("checked", false);
        $("#s800-rbDistance").prop("checked", false);
        c.setLimitDataFromUI()
    });
    $("#s800-rbCounty").click(function () {
        c.parentModel.closeAllOpenedDialog();
        $("#s800-rbState").prop("checked", false);
        $("#s800-rbDistance").prop("checked", false);
        c.setLimitDataFromUI()
    });
    $("#s800-rbDistance").click(function () {
        c.parentModel.closeAllOpenedDialog();
        $("#s800-rbCounty").prop("checked", false);
        $("#s800-rbState").prop("checked", false);
        if ($("#s800-mile-limit-field").val().length == 0) {
            $("#s800-mile-limit-field").val(5)
        }
        c.setLimitDataFromUI()
    })
};
samhsa.locator.StartLocationSearchMobileView.prototype.setLimitDataFromUI = function () {
    var d = this;
    var b = "";
    var c = $("#s800-search-div input[name=limit]:checked").val();
    if (c == d.model.LIMIT_TYPE_VAL_DISTANCE) {
        b = ($("#s800-mile-limit-field").val()) * 1609.34
    } else {
        if (c == d.model.LIMIT_TYPE_VAL_COUNTY) {
            var a = d.model.getLatLngForLocatorSpatialQuery();
            if (null !== a) {
                $.ajax({
                    url: "/countyinfo/" + a,
                    async: false,
                    type: "POST",
                    dataType: "json",
                    success: function (e) {
                        b = e.table.rows[0][0]
                    }
                })
            }
        } else {
            if (c == d.model.LIMIT_TYPE_VAL_STATE) {
                var a = d.model.getLatLngForLocatorSpatialQuery();
                if (null !== a) {
                    $.ajax({
                        url: "/stateinfo/" + a,
                        async: false,
                        type: "POST",
                        dataType: "json",
                        success: function (e) {
                            b = e.table.rows[0][0]
                        }
                    })
                }
            }
        }
    }
    this.model.setLimitType(c, b, true)
};
samhsa.locator.StartLocationSearchMobileView.prototype.bindSearchClickEvent = function () {
    var a = this;
    $("#s800-search-field").keydown(function (c) {
        if (c.keyCode === 13) {
            c.preventDefault();
            a.parentModel.closeAllOpenedDialog();
            var b = $("#s800-search-field").val();
            a.model.startingLocationChanged(b)
        }
    });
    $("#s800-apply-address-btn").click(function () {
        setTimeout(function () {
            var b = $("#s800-search-field").val();
            a.model.startingLocationChanged(b)
        }, 500)
    });
    $("#s800-current-location-btn").click(function () {
        $("#s800-search-div").slideDown();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (b) {
                var c = b.coords.latitude + "," + b.coords.longitude;
                a.model.startingLocationChanged(c)
            })
        } else {}
    })
};
samhsa.locator.StartLocationSearchMobileView.prototype.updateUiElemsForGeoParamsFromModel = function () {
    if (this.model.isLimitTypeState()) {
        $("#s800-rbState").prop("checked", true);
        $("#s800-rbCounty").prop("checked", false);
        $("#s800-rbDistance").prop("checked", false)
    } else {
        if (this.model.isLimitTypeCounty()) {
            $("#s800-rbState").prop("checked", false);
            $("#s800-rbCounty").prop("checked", true);
            $("#s800-rbDistance").prop("checked", false)
        } else {
            if (this.model.isLimitTypeDistance()) {
                $("#s800-rbState").prop("checked", false);
                $("#s800-rbCounty").prop("checked", false);
                $("#s800-rbDistance").prop("checked", true);
                var a = this.model.getDistanceInMiles();
                if (a) {
                    $("#s800-mile-limit-field").val(a)
                }
            }
        }
    }
};
samhsa.locator.ServiceSelectionMenuMobileView = function (a) {
    this.parentModel = a;
    this.bindNav2SelectAllNoneLinks()
};
samhsa.locator.ServiceSelectionMenuMobileView.prototype = new samhsa.locator.ServiceSelectionMenu;
samhsa.locator.ServiceSelectionMenuMobileView.prototype.findServiceCheckboxElementByService = function (b) {
    var d = b.code;
    var a = "#s800-service-option-div .nav2 input[value='" + d + "']";
    var c = $(a);
    return c
};