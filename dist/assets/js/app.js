/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(18);

__webpack_require__(17);

__webpack_require__(16);

__webpack_require__(20);

__webpack_require__(19);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=68d02cd186fd90b52d62)
 * Config saved to config.json and https://gist.github.com/68d02cd186fd90b52d62
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}
+function ($) {
  'use strict';

  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher');
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function Carousel(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };

  Carousel.VERSION = '3.3.5';

  Carousel.TRANSITION_DURATION = 600;

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  };

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    switch (e.which) {
      case 37:
        this.prev();break;
      case 39:
        this.next();break;
      default:
        return;
    }

    e.preventDefault();
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);

    this.interval && clearInterval(this.interval);

    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));

    return this;
  };

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item');
    return this.$items.index(item || this.$active);
  };

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == 'prev' ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));

    if (pos > this.$items.length - 1 || pos < 0) return;

    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);
    }); // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle();

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);

    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide('next');
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide('prev');
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var that = this;

    if ($next.hasClass('active')) return this.sliding = false;

    var relatedTarget = $next[0];
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;

    this.sliding = true;

    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }); // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type);
      $next[0].offsetWidth; // force reflow
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one('bsTransitionEnd', function () {
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    isCycling && this.cycle();

    return this;
  };

  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;

      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });
  }

  var old = $.fn.carousel;

  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel;

  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };

  // CAROUSEL DATA-API
  // =================

  var clickHandler = function clickHandler(e) {
    var href;
    var $this = $(this);
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    if (!$target.hasClass('carousel')) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex) options.interval = false;

    Plugin.call($target, options);

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex);
    }

    e.preventDefault();
  };

  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this);

    this.$body = $('body');
    this.$scrollElement = $(element).is('body') ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || '') + ' .nav li > a';
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;

    this.$scrollElement.on('scroll.bs.scrollspy', process);
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION = '3.3.1';

  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset';
    var offsetBase = 0;

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase = this.$scrollElement.scrollTop();
    }

    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();

    var self = this;

    this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data('target') || $el.attr('href');
      var $href = /^#./.test(href) && $(href);

      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      self.offsets.push(this[0]);
      self.targets.push(this[1]);
    });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;

    this.clear();

    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

    var active = $(selector).parents('li').addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function () {
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  };

  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;

  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;

  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };

  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {
  $(document).ready(function () {
    $.fn.countdown = function (options, callback) {
      var thisEl = $(this);var settings = { "date": null, "format": null };if (options) $.extend(settings, options);function countdown_proc() {
        var eventDate = Date.parse(settings["date"]) / 1E3;var currentDate = Math.floor($.now() / 1E3);if (eventDate <= currentDate) {
          callback.call(this);clearInterval(interval);
        }var seconds = eventDate - currentDate;var days = Math.floor(seconds / (60 * 60 * 24));seconds -= days * 60 * 60 * 24;var hours = Math.floor(seconds / (60 * 60));
        seconds -= hours * 60 * 60;var minutes = Math.floor(seconds / 60);seconds -= minutes * 60;if (days == 1) thisEl.find(".timeRefDays").text("day");else thisEl.find(".timeRefDays").text("days");if (hours == 1) thisEl.find(".timeRefHours").text("hour");else thisEl.find(".timeRefHours").text("hours");if (minutes == 1) thisEl.find(".timeRefMinutes").text("min");else thisEl.find(".timeRefMinutes").text("min");if (seconds == 1) thisEl.find(".timeRefSeconds").text("sec");else thisEl.find(".timeRefSeconds").text("sec");if (settings["format"] == "on") {
          days = String(days).length >= 2 ? days : "0" + days;hours = String(hours).length >= 2 ? hours : "0" + hours;minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;seconds = String(seconds).length >= 2 ? seconds : "0" + seconds;
        }if (!isNaN(eventDate)) {
          thisEl.find(".days").text(days);thisEl.find(".hours").text(hours);thisEl.find(".minutes").text(minutes);thisEl.find(".seconds").text(seconds);
        } else {
          alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");clearInterval(interval);
        }
      }countdown_proc();var interval = setInterval(countdown_proc, 1E3);
    };
  });
})(jQuery);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Generated by CoffeeScript 1.4.0
(function () {
  var e, t;e = function () {
    function e(e, t) {
      var n, r;this.options = { target: "instafeed", get: "popular", resolution: "thumbnail", sortBy: "none", links: !0, mock: !1, useHttp: !1 };if ((typeof e === "undefined" ? "undefined" : _typeof(e)) == "object") for (n in e) {
        r = e[n], this.options[n] = r;
      }this.context = t != null ? t : this, this.unique = this._genKey();
    }return e.prototype.hasNext = function () {
      return typeof this.context.nextUrl == "string" && this.context.nextUrl.length > 0;
    }, e.prototype.next = function () {
      return this.hasNext() ? this.run(this.context.nextUrl) : !1;
    }, e.prototype.run = function (t) {
      var n, r, i;if (typeof this.options.clientId != "string" && typeof this.options.accessToken != "string") throw new Error("Missing clientId or accessToken.");if (typeof this.options.accessToken != "string" && typeof this.options.clientId != "string") throw new Error("Missing clientId or accessToken.");return this.options.before != null && typeof this.options.before == "function" && this.options.before.call(this), typeof document != "undefined" && document !== null && (i = document.createElement("script"), i.id = "instafeed-fetcher", i.src = t || this._buildUrl(), n = document.getElementsByTagName("head"), n[0].appendChild(i), r = "instafeedCache" + this.unique, window[r] = new e(this.options, this), window[r].unique = this.unique), !0;
    }, e.prototype.parse = function (e) {
      var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S;if ((typeof e === "undefined" ? "undefined" : _typeof(e)) != "object") {
        if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "Invalid JSON data"), !1;throw new Error("Invalid JSON response");
      }if (e.meta.code !== 200) {
        if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, e.meta.error_message), !1;throw new Error("Error from Instagram: " + e.meta.error_message);
      }if (e.data.length === 0) {
        if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "No images were returned from Instagram"), !1;throw new Error("No images were returned from Instagram");
      }this.options.success != null && typeof this.options.success == "function" && this.options.success.call(this, e), this.context.nextUrl = "", e.pagination != null && (this.context.nextUrl = e.pagination.next_url);if (this.options.sortBy !== "none") {
        this.options.sortBy === "random" ? d = ["", "random"] : d = this.options.sortBy.split("-"), p = d[0] === "least" ? !0 : !1;switch (d[1]) {case "random":
            e.data.sort(function () {
              return .5 - Math.random();
            });break;case "recent":
            e.data = this._sortBy(e.data, "created_time", p);break;case "liked":
            e.data = this._sortBy(e.data, "likes.count", p);break;case "commented":
            e.data = this._sortBy(e.data, "comments.count", p);break;default:
            throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");}
      }if (typeof document != "undefined" && document !== null && this.options.mock === !1) {
        a = e.data, this.options.limit != null && a.length > this.options.limit && (a = a.slice(0, +this.options.limit + 1 || 9e9)), n = document.createDocumentFragment(), this.options.filter != null && typeof this.options.filter == "function" && (a = this._filter(a, this.options.filter));if (this.options.template != null && typeof this.options.template == "string") {
          i = "", o = "", l = "", v = document.createElement("div");for (m = 0, b = a.length; m < b; m++) {
            s = a[m], u = s.images[this.options.resolution].url, this.options.useHttp || (u = u.replace("http://", "//")), o = this._makeTemplate(this.options.template, { model: s, id: s.id, link: s.link, image: u, caption: this._getObjectProperty(s, "caption.text"), likes: s.likes.count, comments: s.comments.count, location: this._getObjectProperty(s, "location.name") }), i += o;
          }v.innerHTML = i, S = [].slice.call(v.childNodes);for (g = 0, w = S.length; g < w; g++) {
            h = S[g], n.appendChild(h);
          }
        } else for (y = 0, E = a.length; y < E; y++) {
          s = a[y], f = document.createElement("img"), u = s.images[this.options.resolution].url, this.options.useHttp || (u = u.replace("http://", "//")), f.src = u, this.options.links === !0 ? (t = document.createElement("a"), t.href = s.link, t.appendChild(f), n.appendChild(t)) : n.appendChild(f);
        }document.getElementById(this.options.target).appendChild(n), r = document.getElementsByTagName("head")[0], r.removeChild(document.getElementById("instafeed-fetcher")), c = "instafeedCache" + this.unique, window[c] = void 0;try {
          delete window[c];
        } catch (x) {}
      }return this.options.after != null && typeof this.options.after == "function" && this.options.after.call(this), !0;
    }, e.prototype._buildUrl = function () {
      var e, t, n;e = "https://api.instagram.com/v1";switch (this.options.get) {case "popular":
          t = "media/popular";break;case "tagged":
          if (typeof this.options.tagName != "string") throw new Error("No tag name specified. Use the 'tagName' option.");t = "tags/" + this.options.tagName + "/media/recent";break;case "location":
          if (typeof this.options.locationId != "number") throw new Error("No location specified. Use the 'locationId' option.");t = "locations/" + this.options.locationId + "/media/recent";break;case "user":
          if (typeof this.options.userId != "number") throw new Error("No user specified. Use the 'userId' option.");t = "users/" + this.options.userId + "/media/recent";break;default:
          throw new Error("Invalid option for get: '" + this.options.get + "'.");}return n = "" + e + "/" + t, this.options.accessToken != null ? n += "?access_token=" + this.options.accessToken : n += "?client_id=" + this.options.clientId, this.options.limit != null && (n += "&count=" + this.options.limit), n += "&callback=instafeedCache" + this.unique + ".parse", n;
    }, e.prototype._genKey = function () {
      var e;return e = function e() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }, "" + e() + e() + e() + e();
    }, e.prototype._makeTemplate = function (e, t) {
      var n, r, i, s, o;r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, n = e;while (r.test(n)) {
        i = n.match(r)[1], s = (o = this._getObjectProperty(t, i)) != null ? o : "", n = n.replace(r, "" + s);
      }return n;
    }, e.prototype._getObjectProperty = function (e, t) {
      var n, r;t = t.replace(/\[(\w+)\]/g, ".$1"), r = t.split(".");while (r.length) {
        n = r.shift();if (!(e != null && n in e)) return null;e = e[n];
      }return e;
    }, e.prototype._sortBy = function (e, t, n) {
      var r;return r = function r(e, _r) {
        var i, s;return i = this._getObjectProperty(e, t), s = this._getObjectProperty(_r, t), n ? i > s ? 1 : -1 : i < s ? 1 : -1;
      }, e.sort(r.bind(this)), e;
    }, e.prototype._filter = function (e, t) {
      var n, r, i, s, o;n = [], i = function i(e) {
        if (t(e)) return n.push(e);
      };for (s = 0, o = e.length; s < o; s++) {
        r = e[s], i(r);
      }return n;
    }, e;
  }(),  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return e;
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (t = typeof exports != "undefined" && exports !== null ? exports : window, t.Instafeed = e);
}).call(undefined);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function ($) {

  'use strict';

  $.fn.fitVids = function (options) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if (!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if (options) {
      $.extend(settings, options);
    }

    return this.each(function () {
      var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', 'object', 'embed'];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if (settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function (count) {
        var $this = $(this);
        if ($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
          return;
        }
        if (!$this.css('height') && !$this.css('width') && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = this.tagName.toLowerCase() === 'object' || $this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if (!$this.attr('id')) {
          var videoID = 'fitvid' + count;
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', aspectRatio * 100 + '%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
  // Works with either jQuery or Zepto
})(window.jQuery || window.Zepto);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * jQuery Validation Plugin 1.8.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function (c) {
  c.extend(c.fn, { validate: function validate(a) {
      if (this.length) {
        var b = c.data(this[0], "validator");if (b) return b;b = new c.validator(a, this[0]);c.data(this[0], "validator", b);if (b.settings.onsubmit) {
          this.find("input, button").filter(".cancel").click(function () {
            b.cancelSubmit = true;
          });b.settings.submitHandler && this.find("input, button").filter(":submit").click(function () {
            b.submitButton = this;
          });this.submit(function (d) {
            function e() {
              if (b.settings.submitHandler) {
                if (b.submitButton) var f = c("<input type='hidden'/>").attr("name", b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b, b.currentForm);b.submitButton && f.remove();return false;
              }return true;
            }b.settings.debug && d.preventDefault();if (b.cancelSubmit) {
              b.cancelSubmit = false;return e();
            }if (b.form()) {
              if (b.pendingRequest) {
                b.formSubmitted = true;return false;
              }return e();
            } else {
              b.focusInvalid();return false;
            }
          });
        }return b;
      } else a && a.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
    }, valid: function valid() {
      if (c(this[0]).is("form")) return this.validate().form();else {
        var a = true,
            b = c(this[0].form).validate();this.each(function () {
          a &= b.element(this);
        });return a;
      }
    }, removeAttrs: function removeAttrs(a) {
      var b = {},
          d = this;c.each(a.split(/\s/), function (e, f) {
        b[f] = d.attr(f);d.removeAttr(f);
      });return b;
    }, rules: function rules(a, b) {
      var d = this[0];if (a) {
        var e = c.data(d.form, "validator").settings,
            f = e.rules,
            g = c.validator.staticRules(d);switch (a) {case "add":
            c.extend(g, c.validator.normalizeRule(b));f[d.name] = g;if (b.messages) e.messages[d.name] = c.extend(e.messages[d.name], b.messages);break;case "remove":
            if (!b) {
              delete f[d.name];
              return g;
            }var h = {};c.each(b.split(/\s/), function (j, i) {
              h[i] = g[i];delete g[i];
            });return h;}
      }d = c.validator.normalizeRules(c.extend({}, c.validator.metadataRules(d), c.validator.classRules(d), c.validator.attributeRules(d), c.validator.staticRules(d)), d);if (d.required) {
        e = d.required;delete d.required;d = c.extend({ required: e }, d);
      }return d;
    } });c.extend(c.expr[":"], { blank: function blank(a) {
      return !c.trim("" + a.value);
    }, filled: function filled(a) {
      return !!c.trim("" + a.value);
    }, unchecked: function unchecked(a) {
      return !a.checked;
    } });c.validator = function (a, b) {
    this.settings = c.extend(true, {}, c.validator.defaults, a);this.currentForm = b;this.init();
  };c.validator.format = function (a, b) {
    if (arguments.length == 1) return function () {
      var d = c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this, d);
    };if (arguments.length > 2 && b.constructor != Array) b = c.makeArray(arguments).slice(1);if (b.constructor != Array) b = [b];c.each(b, function (d, e) {
      a = a.replace(RegExp("\\{" + d + "\\}", "g"), e);
    });return a;
  };c.extend(c.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error",
      validClass: "valid", errorElement: "label", focusInvalid: true, errorContainer: c([]), errorLabelContainer: c([]), onsubmit: true, ignore: [], ignoreTitle: false, onfocusin: function onfocusin(a) {
        this.lastActive = a;if (this.settings.focusCleanup && !this.blockFocusCleanup) {
          this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide();
        }
      }, onfocusout: function onfocusout(a) {
        if (!this.checkable(a) && (a.name in this.submitted || !this.optional(a))) this.element(a);
      },
      onkeyup: function onkeyup(a) {
        if (a.name in this.submitted || a == this.lastElement) this.element(a);
      }, onclick: function onclick(a) {
        if (a.name in this.submitted) this.element(a);else a.parentNode.name in this.submitted && this.element(a.parentNode);
      }, highlight: function highlight(a, b, d) {
        a.type === "radio" ? this.findByName(a.name).addClass(b).removeClass(d) : c(a).addClass(b).removeClass(d);
      }, unhighlight: function unhighlight(a, b, d) {
        a.type === "radio" ? this.findByName(a.name).removeClass(b).addClass(d) : c(a).removeClass(b).addClass(d);
      } }, setDefaults: function setDefaults(a) {
      c.extend(c.validator.defaults, a);
    }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", accept: "Please enter a value with a valid extension.", maxlength: c.validator.format("Please enter no more than {0} characters."),
      minlength: c.validator.format("Please enter at least {0} characters."), rangelength: c.validator.format("Please enter a value between {0} and {1} characters long."), range: c.validator.format("Please enter a value between {0} and {1}."), max: c.validator.format("Please enter a value less than or equal to {0}."), min: c.validator.format("Please enter a value greater than or equal to {0}.") }, autoCreateRanges: false, prototype: { init: function init() {
        function a(e) {
          var f = c.data(this[0].form, "validator");e = "on" + e.type.replace(/^validate/, "");f.settings[e] && f.settings[e].call(f, this[0]);
        }this.labelContainer = c(this.settings.errorLabelContainer);this.errorContext = this.labelContainer.length && this.labelContainer || c(this.currentForm);this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted = {};this.valueCache = {};this.pendingRequest = 0;this.pending = {};this.invalid = {};this.reset();var b = this.groups = {};c.each(this.settings.groups, function (e, f) {
          c.each(f.split(/\s/), function (g, h) {
            b[h] = e;
          });
        });var d = this.settings.rules;
        c.each(d, function (e, f) {
          d[e] = c.validator.normalizeRule(f);
        });c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", a).validateDelegate(":radio, :checkbox, select, option", "click", a);this.settings.invalidHandler && c(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
      }, form: function form() {
        this.checkForm();c.extend(this.submitted, this.errorMap);this.invalid = c.extend({}, this.errorMap);this.valid() || c(this.currentForm).triggerHandler("invalid-form", [this]);this.showErrors();return this.valid();
      }, checkForm: function checkForm() {
        this.prepareForm();for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) {
          this.check(b[a]);
        }return this.valid();
      }, element: function element(a) {
        this.lastElement = a = this.clean(a);this.prepareElement(a);this.currentElements = c(a);var b = this.check(a);if (b) delete this.invalid[a.name];else this.invalid[a.name] = true;if (!this.numberOfInvalids()) this.toHide = this.toHide.add(this.containers);this.showErrors();return b;
      }, showErrors: function showErrors(a) {
        if (a) {
          c.extend(this.errorMap, a);this.errorList = [];for (var b in a) {
            this.errorList.push({ message: a[b], element: this.findByName(b)[0] });
          }this.successList = c.grep(this.successList, function (d) {
            return !(d.name in a);
          });
        }this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
      }, resetForm: function resetForm() {
        c.fn.resetForm && c(this.currentForm).resetForm();this.submitted = {};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);
      }, numberOfInvalids: function numberOfInvalids() {
        return this.objectLength(this.invalid);
      },
      objectLength: function objectLength(a) {
        var b = 0,
            d;for (d in a) {
          b++;
        }return b;
      }, hideErrors: function hideErrors() {
        this.addWrapper(this.toHide).hide();
      }, valid: function valid() {
        return this.size() == 0;
      }, size: function size() {
        return this.errorList.length;
      }, focusInvalid: function focusInvalid() {
        if (this.settings.focusInvalid) try {
          c(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
        } catch (a) {}
      }, findLastActive: function findLastActive() {
        var a = this.lastActive;return a && c.grep(this.errorList, function (b) {
          return b.element.name == a.name;
        }).length == 1 && a;
      }, elements: function elements() {
        var a = this,
            b = {};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
          !this.name && a.settings.debug && window.console && console.error("%o has no name assigned", this);if (this.name in b || !a.objectLength(c(this).rules())) return false;return b[this.name] = true;
        });
      }, clean: function clean(a) {
        return c(a)[0];
      }, errors: function errors() {
        return c(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext);
      }, reset: function reset() {
        this.successList = [];this.errorList = [];this.errorMap = {};this.toShow = c([]);this.toHide = c([]);this.currentElements = c([]);
      }, prepareForm: function prepareForm() {
        this.reset();this.toHide = this.errors().add(this.containers);
      }, prepareElement: function prepareElement(a) {
        this.reset();this.toHide = this.errorsFor(a);
      }, check: function check(a) {
        a = this.clean(a);if (this.checkable(a)) a = this.findByName(a.name).not(this.settings.ignore)[0];var b = c(a).rules(),
            d = false,
            e;for (e in b) {
          var f = { method: e, parameters: b[e] };try {
            var g = c.validator.methods[e].call(this, a.value.replace(/\r/g, ""), a, f.parameters);if (g == "dependency-mismatch") d = true;else {
              d = false;if (g == "pending") {
                this.toHide = this.toHide.not(this.errorsFor(a));return;
              }if (!g) {
                this.formatAndAdd(a, f);return false;
              }
            }
          } catch (h) {
            this.settings.debug && window.console && console.log("exception occured when checking element " + a.id + ", check the '" + f.method + "' method", h);throw h;
          }
        }if (!d) {
          this.objectLength(b) && this.successList.push(a);return true;
        }
      }, customMetaMessage: function customMetaMessage(a, b) {
        if (c.metadata) {
          var d = this.settings.meta ? c(a).metadata()[this.settings.meta] : c(a).metadata();return d && d.messages && d.messages[b];
        }
      }, customMessage: function customMessage(a, b) {
        var d = this.settings.messages[a];return d && (d.constructor == String ? d : d[b]);
      }, findDefined: function findDefined() {
        for (var a = 0; a < arguments.length; a++) {
          if (arguments[a] !== undefined) return arguments[a];
        }
      }, defaultMessage: function defaultMessage(a, b) {
        return this.findDefined(this.customMessage(a.name, b), this.customMetaMessage(a, b), !this.settings.ignoreTitle && a.title || undefined, c.validator.messages[b], "<strong>Warning: No message defined for " + a.name + "</strong>");
      }, formatAndAdd: function formatAndAdd(a, b) {
        var d = this.defaultMessage(a, b.method),
            e = /\$?\{(\d+)\}/g;if (typeof d == "function") d = d.call(this, b.parameters, a);else if (e.test(d)) d = jQuery.format(d.replace(e, "{$1}"), b.parameters);this.errorList.push({ message: d, element: a });this.errorMap[a.name] = d;this.submitted[a.name] = d;
      }, addWrapper: function addWrapper(a) {
        if (this.settings.wrapper) a = a.add(a.parent(this.settings.wrapper));return a;
      }, defaultShowErrors: function defaultShowErrors() {
        for (var a = 0; this.errorList[a]; a++) {
          var b = this.errorList[a];
          this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass);this.showLabel(b.element, b.message);
        }if (this.errorList.length) this.toShow = this.toShow.add(this.containers);if (this.settings.success) for (a = 0; this.successList[a]; a++) {
          this.showLabel(this.successList[a]);
        }if (this.settings.unhighlight) {
          a = 0;for (b = this.validElements(); b[a]; a++) {
            this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
          }
        }this.toHide = this.toHide.not(this.toShow);
        this.hideErrors();this.addWrapper(this.toShow).show();
      }, validElements: function validElements() {
        return this.currentElements.not(this.invalidElements());
      }, invalidElements: function invalidElements() {
        return c(this.errorList).map(function () {
          return this.element;
        });
      }, showLabel: function showLabel(a, b) {
        var d = this.errorsFor(a);if (d.length) {
          d.removeClass().addClass(this.settings.errorClass);d.attr("generated") && d.html(b);
        } else {
          d = c("<" + this.settings.errorElement + "/>").attr({ "for": this.idOrName(a), generated: true }).addClass(this.settings.errorClass).html(b || "");if (this.settings.wrapper) d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, c(a)) : d.insertAfter(a));
        }if (!b && this.settings.success) {
          d.text("");typeof this.settings.success == "string" ? d.addClass(this.settings.success) : this.settings.success(d);
        }this.toShow = this.toShow.add(d);
      }, errorsFor: function errorsFor(a) {
        var b = this.idOrName(a);return this.errors().filter(function () {
          return c(this).attr("for") == b;
        });
      },
      idOrName: function idOrName(a) {
        return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
      }, checkable: function checkable(a) {
        return (/radio|checkbox/i.test(a.type)
        );
      }, findByName: function findByName(a) {
        var b = this.currentForm;return c(document.getElementsByName(a)).map(function (d, e) {
          return e.form == b && e.name == a && e || null;
        });
      }, getLength: function getLength(a, b) {
        switch (b.nodeName.toLowerCase()) {case "select":
            return c("option:selected", b).length;case "input":
            if (this.checkable(b)) return this.findByName(b.name).filter(":checked").length;}return a.length;
      },
      depend: function depend(a, b) {
        return this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)] ? this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)](a, b) : true;
      }, dependTypes: { "boolean": function boolean(a) {
          return a;
        }, string: function string(a, b) {
          return !!c(a, b.form).length;
        }, "function": function _function(a, b) {
          return a(b);
        } }, optional: function optional(a) {
        return !c.validator.methods.required.call(this, c.trim(a.value), a) && "dependency-mismatch";
      }, startRequest: function startRequest(a) {
        if (!this.pending[a.name]) {
          this.pendingRequest++;this.pending[a.name] = true;
        }
      }, stopRequest: function stopRequest(a, b) {
        this.pendingRequest--;if (this.pendingRequest < 0) this.pendingRequest = 0;delete this.pending[a.name];if (b && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
          c(this.currentForm).submit();this.formSubmitted = false;
        } else if (!b && this.pendingRequest == 0 && this.formSubmitted) {
          c(this.currentForm).triggerHandler("invalid-form", [this]);this.formSubmitted = false;
        }
      }, previousValue: function previousValue(a) {
        return c.data(a, "previousValue") || c.data(a, "previousValue", { old: null, valid: true, message: this.defaultMessage(a, "remote") });
      } }, classRuleSettings: { required: { required: true },
      email: { email: true }, url: { url: true }, date: { date: true }, dateISO: { dateISO: true }, dateDE: { dateDE: true }, number: { number: true }, numberDE: { numberDE: true }, digits: { digits: true }, creditcard: { creditcard: true } }, addClassRules: function addClassRules(a, b) {
      a.constructor == String ? this.classRuleSettings[a] = b : c.extend(this.classRuleSettings, a);
    }, classRules: function classRules(a) {
      var b = {};(a = c(a).attr("class")) && c.each(a.split(" "), function () {
        this in c.validator.classRuleSettings && c.extend(b, c.validator.classRuleSettings[this]);
      });return b;
    }, attributeRules: function attributeRules(a) {
      var b = {};a = c(a);for (var d in c.validator.methods) {
        var e = a.attr(d);if (e) b[d] = e;
      }b.maxlength && /-1|2147483647|524288/.test(b.maxlength) && delete b.maxlength;return b;
    }, metadataRules: function metadataRules(a) {
      if (!c.metadata) return {};var b = c.data(a.form, "validator").settings.meta;return b ? c(a).metadata()[b] : c(a).metadata();
    }, staticRules: function staticRules(a) {
      var b = {},
          d = c.data(a.form, "validator");if (d.settings.rules) b = c.validator.normalizeRule(d.settings.rules[a.name]) || {};return b;
    }, normalizeRules: function normalizeRules(a, b) {
      c.each(a, function (d, e) {
        if (e === false) delete a[d];else if (e.param || e.depends) {
          var f = true;switch (_typeof(e.depends)) {case "string":
              f = !!c(e.depends, b.form).length;break;case "function":
              f = e.depends.call(b, b);}if (f) a[d] = e.param !== undefined ? e.param : true;else delete a[d];
        }
      });c.each(a, function (d, e) {
        a[d] = c.isFunction(e) ? e(b) : e;
      });c.each(["minlength", "maxlength", "min", "max"], function () {
        if (a[this]) a[this] = Number(a[this]);
      });c.each(["rangelength", "range"], function () {
        if (a[this]) a[this] = [Number(a[this][0]), Number(a[this][1])];
      });if (c.validator.autoCreateRanges) {
        if (a.min && a.max) {
          a.range = [a.min, a.max];delete a.min;delete a.max;
        }if (a.minlength && a.maxlength) {
          a.rangelength = [a.minlength, a.maxlength];delete a.minlength;delete a.maxlength;
        }
      }a.messages && delete a.messages;return a;
    }, normalizeRule: function normalizeRule(a) {
      if (typeof a == "string") {
        var b = {};c.each(a.split(/\s/), function () {
          b[this] = true;
        });a = b;
      }return a;
    }, addMethod: function addMethod(a, b, d) {
      c.validator.methods[a] = b;c.validator.messages[a] = d != undefined ? d : c.validator.messages[a];b.length < 3 && c.validator.addClassRules(a, c.validator.normalizeRule(a));
    },
    methods: { required: function required(a, b, d) {
        if (!this.depend(d, b)) return "dependency-mismatch";switch (b.nodeName.toLowerCase()) {case "select":
            return (a = c(b).val()) && a.length > 0;case "input":
            if (this.checkable(b)) return this.getLength(a, b) > 0;default:
            return c.trim(a).length > 0;}
      }, remote: function remote(a, b, d) {
        if (this.optional(b)) return "dependency-mismatch";var e = this.previousValue(b);this.settings.messages[b.name] || (this.settings.messages[b.name] = {});e.originalMessage = this.settings.messages[b.name].remote;this.settings.messages[b.name].remote = e.message;d = typeof d == "string" && { url: d } || d;if (this.pending[b.name]) return "pending";if (e.old === a) return e.valid;e.old = a;var f = this;this.startRequest(b);var g = {};g[b.name] = a;c.ajax(c.extend(true, { url: d, mode: "abort", port: "validate" + b.name, dataType: "json", data: g, success: function success(h) {
            f.settings.messages[b.name].remote = e.originalMessage;var j = h === true;if (j) {
              var i = f.formSubmitted;f.prepareElement(b);f.formSubmitted = i;f.successList.push(b);f.showErrors();
            } else {
              i = {};h = h || f.defaultMessage(b, "remote");i[b.name] = e.message = c.isFunction(h) ? h(a) : h;f.showErrors(i);
            }e.valid = j;f.stopRequest(b, j);
          } }, d));return "pending";
      }, minlength: function minlength(a, b, d) {
        return this.optional(b) || this.getLength(c.trim(a), b) >= d;
      }, maxlength: function maxlength(a, b, d) {
        return this.optional(b) || this.getLength(c.trim(a), b) <= d;
      }, rangelength: function rangelength(a, b, d) {
        a = this.getLength(c.trim(a), b);return this.optional(b) || a >= d[0] && a <= d[1];
      }, min: function min(a, b, d) {
        return this.optional(b) || a >= d;
      }, max: function max(a, b, d) {
        return this.optional(b) || a <= d;
      }, range: function range(a, b, d) {
        return this.optional(b) || a >= d[0] && a <= d[1];
      }, email: function email(a, b) {
        return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a);
      },
      url: function url(a, b) {
        return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a);
      },
      date: function date(a, b) {
        return this.optional(b) || !/Invalid|NaN/.test(new Date(a));
      }, dateISO: function dateISO(a, b) {
        return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a);
      }, number: function number(a, b) {
        return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a);
      }, digits: function digits(a, b) {
        return this.optional(b) || /^\d+$/.test(a);
      }, creditcard: function creditcard(a, b) {
        if (this.optional(b)) return "dependency-mismatch";if (/[^0-9-]+/.test(a)) return false;var d = 0,
            e = 0,
            f = false;a = a.replace(/\D/g, "");for (var g = a.length - 1; g >= 0; g--) {
          e = a.charAt(g);e = parseInt(e, 10);if (f) if ((e *= 2) > 9) e -= 9;d += e;f = !f;
        }return d % 10 == 0;
      }, accept: function accept(a, b, d) {
        d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";return this.optional(b) || a.match(RegExp(".(" + d + ")$", "i"));
      }, equalTo: function equalTo(a, b, d) {
        d = c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
          c(b).valid();
        });return a == d.val();
      } } });c.format = c.validator.format;
})(jQuery);
(function (c) {
  var a = {};if (c.ajaxPrefilter) c.ajaxPrefilter(function (d, e, f) {
    e = d.port;if (d.mode == "abort") {
      a[e] && a[e].abort();a[e] = f;
    }
  });else {
    var b = c.ajax;c.ajax = function (d) {
      var e = ("port" in d ? d : c.ajaxSettings).port;if (("mode" in d ? d : c.ajaxSettings).mode == "abort") {
        a[e] && a[e].abort();return a[e] = b.apply(this, arguments);
      }return b.apply(this, arguments);
    };
  }
})(jQuery);
(function (c) {
  !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && c.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
    function d(e) {
      e = c.event.fix(e);e.type = b;return c.event.handle.call(this, e);
    }c.event.special[b] = { setup: function setup() {
        this.addEventListener(a, d, true);
      }, teardown: function teardown() {
        this.removeEventListener(a, d, true);
      }, handler: function handler(e) {
        arguments[0] = c.event.fix(e);arguments[0].type = b;return c.event.handle.apply(this, arguments);
      } };
  });c.extend(c.fn, { validateDelegate: function validateDelegate(a, b, d) {
      return this.bind(b, function (e) {
        var f = c(e.target);if (f.is(a)) return d.apply(f, arguments);
      });
    } });
})(jQuery);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
	Zoom 1.7.20
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function (o) {
	var t = { url: !1, callback: !1, target: !1, duration: 120, on: "mouseover", touch: !0, onZoomIn: !1, onZoomOut: !1, magnify: 1 };o.zoom = function (t, n, e, i) {
		var u,
		    c,
		    r,
		    a,
		    m,
		    l,
		    s,
		    f = o(t),
		    h = f.css("position"),
		    d = o(n);return t.style.position = /(absolute|fixed)/.test(h) ? h : "relative", t.style.overflow = "hidden", e.style.width = e.style.height = "", o(e).addClass("zoomImg").css({ position: "absolute", top: 0, left: 0, opacity: 0, width: e.width * i, height: e.height * i, border: "none", maxWidth: "none", maxHeight: "none" }).appendTo(t), { init: function init() {
				c = f.outerWidth(), u = f.outerHeight(), n === t ? (a = c, r = u) : (a = d.outerWidth(), r = d.outerHeight()), m = (e.width - c) / a, l = (e.height - u) / r, s = d.offset();
			}, move: function move(o) {
				var t = o.pageX - s.left,
				    n = o.pageY - s.top;n = Math.max(Math.min(n, r), 0), t = Math.max(Math.min(t, a), 0), e.style.left = t * -m + "px", e.style.top = n * -l + "px";
			} };
	}, o.fn.zoom = function (n) {
		return this.each(function () {
			var e = o.extend({}, t, n || {}),
			    i = e.target && o(e.target)[0] || this,
			    u = this,
			    c = o(u),
			    r = document.createElement("img"),
			    a = o(r),
			    m = "mousemove.zoom",
			    l = !1,
			    s = !1;if (!e.url) {
				var f = u.querySelector("img");if (f && (e.url = f.getAttribute("data-src") || f.currentSrc || f.src), !e.url) return;
			}c.one("zoom.destroy", function (o, t) {
				c.off(".zoom"), i.style.position = o, i.style.overflow = t, r.onload = null, a.remove();
			}.bind(this, i.style.position, i.style.overflow)), r.onload = function () {
				function t(t) {
					f.init(), f.move(t), a.stop().fadeTo(o.support.opacity ? e.duration : 0, 1, o.isFunction(e.onZoomIn) ? e.onZoomIn.call(r) : !1);
				}function n() {
					a.stop().fadeTo(e.duration, 0, o.isFunction(e.onZoomOut) ? e.onZoomOut.call(r) : !1);
				}var f = o.zoom(i, u, r, e.magnify);"grab" === e.on ? c.on("mousedown.zoom", function (e) {
					1 === e.which && (o(document).one("mouseup.zoom", function () {
						n(), o(document).off(m, f.move);
					}), t(e), o(document).on(m, f.move), e.preventDefault());
				}) : "click" === e.on ? c.on("click.zoom", function (e) {
					return l ? void 0 : (l = !0, t(e), o(document).on(m, f.move), o(document).one("click.zoom", function () {
						n(), l = !1, o(document).off(m, f.move);
					}), !1);
				}) : "toggle" === e.on ? c.on("click.zoom", function (o) {
					l ? n() : t(o), l = !l;
				}) : "mouseover" === e.on && (f.init(), c.on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(m, f.move)), e.touch && c.on("touchstart.zoom", function (o) {
					o.preventDefault(), s ? (s = !1, n()) : (s = !0, t(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]));
				}).on("touchmove.zoom", function (o) {
					o.preventDefault(), f.move(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]);
				}).on("touchend.zoom", function (o) {
					o.preventDefault(), s && (s = !1, n());
				}), o.isFunction(e.callback) && e.callback.call(r);
			}, r.setAttribute("role", "presentation"), r.src = e.url;
		});
	}, o.fn.zoom.defaults = t;
})(window.jQuery);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is the custom javascript file 
var z = 0;
window.pmwoodwindsZoomCount = function () {
    z++;
    if (z > 0) {
        jQuery("span#lg-zoom-in").hide();
    }
};
window.pmwoodwindsZoomCountMin = function () {
    z--;
    if (z < 1) {
        jQuery("span#lg-zoom-in").show();
    }
};

window.pmwoodwindsFirstview = function () {
    //jQuery("#pmwoodwind_product_images img.zoomImg").click();
};

jQuery(document).on("click", ".lg-actions .lg-icon", function () {
    z = 0;
    jQuery("span#lg-zoom-in").show();
});
jQuery(document).ready(function ($) {
    "use strict";

    var _$$not$slick;

    $(document).on('click', '.single-product .zoomImg', function () {

        var href = $(this).attr('src').replace(/-\d+x\d+/, '');

        $('.slick-track a[href="' + href + '"]').click();
    });

    $('.lg-actions .lg-icon').hide();
    $('#trd-testimonial').not('.slick-initialized').slick((_$$not$slick = {
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 5000
    }, _defineProperty(_$$not$slick, "speed", 1000), _defineProperty(_$$not$slick, "slidesToShow", 3), _defineProperty(_$$not$slick, "centerMode", true), _defineProperty(_$$not$slick, "centerPadding", '12px'), _defineProperty(_$$not$slick, "responsive", [{
        breakpoint: 1023,
        settings: {
            slidesToShow: 3
        }

    }, {

        breakpoint: 767,
        settings: {
            slidesToShow: 3,
            centerPadding: '10px'
        }

    }]), _$$not$slick));

    $("#instruments .category").mouseover(function () {
        $("#instruments .category").removeClass('main');
        $(this).addClass('main');
    });
    // === Header Menu Button ===
    $('#menu-button').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('close-icon');
        $('#main-nav').toggleClass('fade');
    });

    $('#main-nav').on('click', function () {
        $('#menu-button').removeClass('close-icon');
        $('#main-nav').removeClass('fade');
    });

    // === LightGallery Home ===
    if ($('#gallery').length > 0) {
        // $("#gallery").lightGallery();
    }
    if ($('#pmwoodwind_product_images').length > 0) {
        $("#pmwoodwind_product_images").lightGallery();
    }

    // === Countdown index.html config ===
    if ($('#countdown-home-1').length > 0) {
        $("#countdown-home-1").countdown({
            date: "30 march 2016 12:00:00", // Edit this line
            format: "on"
        }, function () {
            // This will run when the countdown ends
        });
    }

    // === Countdown track.html config ===
    if ($('#countdown-1').length > 0) {
        $("#countdown-1").countdown({
            date: "30 march 2016 12:00:00", // Edit this line
            format: "on"
        }, function () {
            // This will run when the countdown ends
        });
    }
    if ($('#countdown-2').length > 0) {
        $("#countdown-2").countdown({
            date: "12 march 2016 12:00:00", // Edit this line
            format: "on"
        }, function () {
            // This will run when the countdown ends
        });
    }

    // === Form Validation ===
    // Contact Page Form
    if ($('#contact-form').length > 0) {
        $('#contact-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            }, //end rules
            messages: {
                email: {
                    required: "Please type a e-mail address.",
                    email: "This is not a valid email address."
                }
            }
        }); // end validate 
    }
    //
    // === Revolution Slider config ===
    if ($('.slider').length > 0) {
        jQuery('.slider').revolution({
            delay: 9000,
            startwidth: 1920,
            startheight: 780,
            //
            fullScreenAlignForce: "off",
            autoHeight: "off",
            minHeight: "off",
            //
            fullWidth: "off",
            forceFullWidth: "off",
            fullScreen: "off",
            fullScreenOffset: "0px",
            //
            onHoverStop: "on",
            //
            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 3,
            //
            hideThumbsOnMobile: "on",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "on",
            hideArrowsOnMobile: "on",
            hideThumbsUnderResoluition: 0,
            //
            hideThumbs: 1,
            hideTimerBar: "on",
            //
            keyboardNavigation: "on",
            //
            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",
            //
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 30,
            navigationVOffset: 105
        });
    }
    var wh = $(window).height() * 0.8;
    $(".slider-container").height(wh);

    $("#eventsbg").css('border-bottom', wh + 'px solid');
    // === Responsive Videos ===
    if ($('.embed-video').length > 0) {
        $('.embed-video').fitVids();
    }

    // === ScrollTo annimation ===
    $('.scrollTo').on('click', function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if ($(target).length > 0) {
            $('body, html').stop().animate({
                'scrollTop': $(target).offset().top - 0
            }, 1000, 'swing', function () {
                window.location.hash = target;
            });
        }
    }); // End Click  

    // === Go to top ===
    $('.go-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });

    // === Header Nav BG ===
    $(window).scroll(function () {
        if ($(document).scrollTop() > 150) {
            $('.navigation-bar').addClass('scroll-BG');
        } else {
            $('.navigation-bar').removeClass('scroll-BG');
        }
    });

    // === Header Parallax Image Style ===
    $(window).on('scroll', function () {
        var curPos = $(window).scrollTop();
        $('.header-parallax-image').css('background-position', 'right bottom -' + curPos * .8 + 'px');
        //fadePanels(curPos);
    }).scroll();
}); // END READY

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
Jssor Slider (MIT license)
*/
/* eslint-disable */
!function (j, h, n, g, d, k, e) {
  new function () {}();var c = { C: n.PI, k: n.max, j: n.min, I: n.ceil, P: n.floor, m: n.abs, rb: n.sin, Kb: n.cos, xd: n.tan, Af: n.atan, Mb: n.sqrt, q: n.pow, td: n.random, $Round: n.round },
      f = j.$Jease$ = { $Swing: function $Swing(a) {
      return -c.Kb(a * c.C) / 2 + .5;
    }, $Linear: function $Linear(a) {
      return a;
    }, $InQuad: function $InQuad(a) {
      return a * a;
    }, $OutQuad: function $OutQuad(a) {
      return -a * (a - 2);
    }, $InOutQuad: function $InOutQuad(a) {
      return (a *= 2) < 1 ? 1 / 2 * a * a : -1 / 2 * (--a * (a - 2) - 1);
    }, $InCubic: function $InCubic(a) {
      return a * a * a;
    }, $OutCubic: function $OutCubic(a) {
      return (a -= 1) * a * a + 1;
    }, $InOutCubic: function $InOutCubic(a) {
      return (a *= 2) < 1 ? 1 / 2 * a * a * a : 1 / 2 * ((a -= 2) * a * a + 2);
    }, $InQuart: function $InQuart(a) {
      return a * a * a * a;
    }, $OutQuart: function $OutQuart(a) {
      return -((a -= 1) * a * a * a - 1);
    }, $InOutQuart: function $InOutQuart(a) {
      return (a *= 2) < 1 ? 1 / 2 * a * a * a * a : -1 / 2 * ((a -= 2) * a * a * a - 2);
    }, $InQuint: function $InQuint(a) {
      return a * a * a * a * a;
    }, $OutQuint: function $OutQuint(a) {
      return (a -= 1) * a * a * a * a + 1;
    }, $InOutQuint: function $InOutQuint(a) {
      return (a *= 2) < 1 ? 1 / 2 * a * a * a * a * a : 1 / 2 * ((a -= 2) * a * a * a * a + 2);
    }, $InSine: function $InSine(a) {
      return 1 - c.Kb(c.C / 2 * a);
    }, $OutSine: function $OutSine(a) {
      return c.rb(c.C / 2 * a);
    }, $InOutSine: function $InOutSine(a) {
      return -1 / 2 * (c.Kb(c.C * a) - 1);
    }, $InExpo: function $InExpo(a) {
      return a == 0 ? 0 : c.q(2, 10 * (a - 1));
    }, $OutExpo: function $OutExpo(a) {
      return a == 1 ? 1 : -c.q(2, -10 * a) + 1;
    }, $InOutExpo: function $InOutExpo(a) {
      return a == 0 || a == 1 ? a : (a *= 2) < 1 ? 1 / 2 * c.q(2, 10 * (a - 1)) : 1 / 2 * (-c.q(2, -10 * --a) + 2);
    }, $InCirc: function $InCirc(a) {
      return -(c.Mb(1 - a * a) - 1);
    }, $OutCirc: function $OutCirc(a) {
      return c.Mb(1 - (a -= 1) * a);
    }, $InOutCirc: function $InOutCirc(a) {
      return (a *= 2) < 1 ? -1 / 2 * (c.Mb(1 - a * a) - 1) : 1 / 2 * (c.Mb(1 - (a -= 2) * a) + 1);
    }, $InElastic: function $InElastic(a) {
      if (!a || a == 1) return a;var b = .3,
          d = .075;return -(c.q(2, 10 * (a -= 1)) * c.rb((a - d) * 2 * c.C / b));
    }, $OutElastic: function $OutElastic(a) {
      if (!a || a == 1) return a;var b = .3,
          d = .075;return c.q(2, -10 * a) * c.rb((a - d) * 2 * c.C / b) + 1;
    }, $InOutElastic: function $InOutElastic(a) {
      if (!a || a == 1) return a;var b = .45,
          d = .1125;return (a *= 2) < 1 ? -.5 * c.q(2, 10 * (a -= 1)) * c.rb((a - d) * 2 * c.C / b) : c.q(2, -10 * (a -= 1)) * c.rb((a - d) * 2 * c.C / b) * .5 + 1;
    }, $InBack: function $InBack(a) {
      var b = 1.70158;return a * a * ((b + 1) * a - b);
    }, $OutBack: function $OutBack(a) {
      var b = 1.70158;return (a -= 1) * a * ((b + 1) * a + b) + 1;
    }, $InOutBack: function $InOutBack(a) {
      var b = 1.70158;return (a *= 2) < 1 ? 1 / 2 * a * a * (((b *= 1.525) + 1) * a - b) : 1 / 2 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2);
    }, $InBounce: function $InBounce(a) {
      return 1 - f.$OutBounce(1 - a);
    }, $OutBounce: function $OutBounce(a) {
      return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
    }, $InOutBounce: function $InOutBounce(a) {
      return a < 1 / 2 ? f.$InBounce(a * 2) * .5 : f.$OutBounce(a * 2 - 1) * .5 + .5;
    }, $GoBack: function $GoBack(a) {
      return 1 - c.m(2 - 1);
    }, $InWave: function $InWave(a) {
      return 1 - c.Kb(a * c.C * 2);
    }, $OutWave: function $OutWave(a) {
      return c.rb(a * c.C * 2);
    }, $OutJump: function $OutJump(a) {
      return 1 - ((a *= 2) < 1 ? (a = 1 - a) * a * a : (a -= 1) * a * a);
    }, $InJump: function $InJump(a) {
      return (a *= 2) < 1 ? a * a * a : (a = 2 - a) * a * a;
    }, $Early: c.I, $Late: c.P };var b = j.$Jssor$ = new function () {
    var i = this,
        Ab = /\S+/g,
        N = 1,
        jb = 2,
        mb = 3,
        lb = 4,
        pb = 5,
        O,
        t = 0,
        l = 0,
        u = 0,
        A = 0,
        B = 0,
        E = navigator,
        ub = E.appName,
        o = E.userAgent,
        z = h.documentElement,
        q = parseFloat;function Ib() {
      if (!O) {
        O = { Mg: "ontouchstart" in j || "createTouch" in h };var a;if (E.pointerEnabled || (a = E.msPointerEnabled)) O.Zd = a ? "msTouchAction" : "touchAction";
      }return O;
    }function w(g) {
      if (!t) {
        t = -1;if (ub == "Microsoft Internet Explorer" && !!j.attachEvent && !!j.ActiveXObject) {
          var e = o.indexOf("MSIE");t = N;u = q(o.substring(e + 5, o.indexOf(";", e))); /*@cc_on A=@_jscript_version@*/;l = h.documentMode || u;
        } else if (ub == "Netscape" && !!j.addEventListener) {
          var d = o.indexOf("Firefox"),
              b = o.indexOf("Safari"),
              f = o.indexOf("Chrome"),
              c = o.indexOf("AppleWebKit");if (d >= 0) {
            t = jb;l = q(o.substring(d + 8));
          } else if (b >= 0) {
            var i = o.substring(0, b).lastIndexOf("/");t = f >= 0 ? lb : mb;l = q(o.substring(i + 1, b));
          } else {
            var a = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(o);if (a) {
              t = N;l = u = q(a[1]);
            }
          }if (c >= 0) B = q(o.substring(c + 12));
        } else {
          var a = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(o);if (a) {
            t = pb;l = q(a[2]);
          }
        }
      }return g == t;
    }function r() {
      return w(N);
    }function ib() {
      return r() && (l < 6 || h.compatMode == "BackCompat");
    }function Bb() {
      return w(jb);
    }function kb() {
      return w(mb);
    }function Eb() {
      return w(lb);
    }function ob() {
      return w(pb);
    }function eb() {
      return kb() && B > 534 && B < 535;
    }function I() {
      w();return B > 537 || l > 42 || t == N && l >= 11;
    }function gb() {
      return r() && l < 9;
    }function fb(a) {
      var b, c;return function (g) {
        if (!b) {
          b = d;var f = a.substr(0, 1).toUpperCase() + a.substr(1);n([a].concat(["WebKit", "ms", "Moz", "O", "webkit"]), function (h, d) {
            var b = a;if (d) b = h + f;if (g.style[b] != e) return c = b;
          });
        }return c;
      };
    }function db(b) {
      var a;return function (c) {
        a = a || fb(b)(c) || b;return a;
      };
    }var P = db("transform");function tb(a) {
      return {}.toString.call(a);
    }var qb = {};n(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function (a) {
      qb["[object " + a + "]"] = a.toLowerCase();
    });function n(b, d) {
      var a, c;if (tb(b) == "[object Array]") {
        for (a = 0; a < b.length; a++) {
          if (c = d(b[a], a, b)) return c;
        }
      } else for (a in b) {
        if (c = d(b[a], a, b)) return c;
      }
    }function H(a) {
      return a == g ? String(a) : qb[tb(a)] || "object";
    }function rb(a) {
      for (var b in a) {
        return d;
      }
    }function C(a) {
      try {
        return H(a) == "object" && !a.nodeType && a != a.window && (!a.constructor || {}.hasOwnProperty.call(a.constructor.prototype, "isPrototypeOf"));
      } catch (b) {}
    }function p(a, b) {
      return { x: a, y: b };
    }function yb(b, a) {
      setTimeout(b, a || 0);
    }function D(b, d, c) {
      var a = !b || b == "inherit" ? "" : b;n(d, function (c) {
        var b = c.exec(a);if (b) {
          var d = a.substr(0, b.index),
              e = a.substr(b.index + b[0].length + 1, a.length - 1);a = d + e;
        }
      });a && (c += (!a.indexOf(" ") ? "" : " ") + a);return c;
    }function U(b, a) {
      if (l < 9) b.style.filter = a;
    }function vb(a, b) {
      if (a === e) a = b;return a;
    }i.$Device = Ib;i.$IsBrowserIE = r;i.$IsBrowserIeQuirks = ib;i.$IsBrowserFireFox = Bb;i.$IsBrowserSafari = kb;i.$IsBrowserChrome = Eb;i.$IsBrowserOpera = ob;i.yg = I;fb("transform");i.$BrowserVersion = function () {
      return l;
    };i.$BrowserEngineVersion = function () {
      return u || l;
    };i.$WebKitVersion = function () {
      w();return B;
    };i.$Delay = yb;i.Y = vb;i.Gg = function (a, b) {
      b.call(a);return G({}, a);
    };function Z(a) {
      a.constructor === Z.caller && a.jc && a.jc.apply(a, Z.caller.arguments);
    }i.jc = Z;i.$GetElement = function (a) {
      if (i.Fg(a)) a = h.getElementById(a);return a;
    };function v(a) {
      return a || j.event;
    }i.$EvtSrc = function (b) {
      b = v(b);var a = b.target || b.srcElement || h;if (a.nodeType == 3) a = i.Cc(a);return a;
    };i.de = function (a) {
      a = v(a);return { x: a.pageX || a.clientX || 0, y: a.pageY || a.clientY || 0 };
    };i.$WindowSize = function () {
      var a = h.body;return { x: a.clientWidth || z.clientWidth, y: a.clientHeight || z.clientHeight };
    };function x(c, d, a) {
      if (a !== e) c.style[d] = a == e ? "" : a;else {
        var b = c.currentStyle || c.style;a = b[d];if (a == "" && j.getComputedStyle) {
          b = c.ownerDocument.defaultView.getComputedStyle(c, g);b && (a = b.getPropertyValue(d) || b[d]);
        }return a;
      }
    }function bb(b, c, a, d) {
      if (a === e) {
        a = q(x(b, c));isNaN(a) && (a = g);return a;
      }if (a == g) a = "";else d && (a += "px");x(b, c, a);
    }function m(c, a) {
      var d = a ? bb : x,
          b;if (a & 4) b = db(c);return function (e, f) {
        return d(e, b ? b(e) : c, f, a & 2);
      };
    }function Db(b) {
      if (r() && u < 9) {
        var a = /opacity=([^)]*)/.exec(b.style.filter || "");return a ? q(a[1]) / 100 : 1;
      } else return q(b.style.opacity || "1");
    }function Fb(b, a, f) {
      if (r() && u < 9) {
        var h = b.style.filter || "",
            i = new RegExp(/[\s]*alpha\([^\)]*\)/g),
            e = c.$Round(100 * a),
            d = "";if (e < 100 || f) d = "alpha(opacity=" + e + ") ";var g = D(h, [i], d);U(b, g);
      } else b.style.opacity = a == 1 ? "" : c.$Round(a * 100) / 100;
    }var Q = { $Rotate: ["rotate"], $RotateX: ["rotateX"], $RotateY: ["rotateY"], $SkewX: ["skewX"], $SkewY: ["skewY"] };if (!I()) Q = G(Q, { $ScaleX: ["scaleX", 2], $ScaleY: ["scaleY", 2], $TranslateZ: ["translateZ", 1] });function R(d, a) {
      var c = "";if (a) {
        if (r() && l && l < 10) {
          delete a.$RotateX;delete a.$RotateY;delete a.$TranslateZ;
        }b.$Each(a, function (d, b) {
          var a = Q[b];if (a) {
            var e = a[1] || 0;if (S[b] != d) c += " " + a[0] + "(" + d + ["deg", "px", ""][e] + ")";
          }
        });if (I()) {
          if (a.$TranslateX || a.$TranslateY || a.$TranslateZ != e) c += " translate3d(" + (a.$TranslateX || 0) + "px," + (a.$TranslateY || 0) + "px," + (a.$TranslateZ || 0) + "px)";if (a.$ScaleX == e) a.$ScaleX = 1;if (a.$ScaleY == e) a.$ScaleY = 1;if (a.$ScaleX != 1 || a.$ScaleY != 1) c += " scale3d(" + a.$ScaleX + ", " + a.$ScaleY + ", 1)";
        }
      }d.style[P(d)] = c;
    }i.dg = m("transformOrigin", 4);i.gg = m("backfaceVisibility", 4);i.jg = m("transformStyle", 4);i.ig = m("perspective", 6);i.hg = m("perspectiveOrigin", 4);i.cg = function (b, a) {
      if (r() && u < 9 || u < 10 && ib()) b.style.zoom = a == 1 ? "" : a;else {
        var c = P(b),
            f = a == 1 ? "" : "scale(" + a + ")",
            e = b.style[c],
            g = new RegExp(/[\s]*scale\(.*?\)/g),
            d = D(e, [g], f);b.style[c] = d;
      }
    };i.$AddEvent = function (a, c, d, b) {
      a = i.$GetElement(a);if (a.addEventListener) {
        c == "mousewheel" && a.addEventListener("DOMMouseScroll", d, b);a.addEventListener(c, d, b);
      } else if (a.attachEvent) {
        a.attachEvent("on" + c, d);b && a.setCapture && a.setCapture();
      }
    };i.fb = function (a, c, d, b) {
      a = i.$GetElement(a);if (a.removeEventListener) {
        c == "mousewheel" && a.removeEventListener("DOMMouseScroll", d, b);a.removeEventListener(c, d, b);
      } else if (a.detachEvent) {
        a.detachEvent("on" + c, d);b && a.releaseCapture && a.releaseCapture();
      }
    };i.$FireEvent = function (c, b) {
      var a;if (h.createEvent) {
        a = h.createEvent("HTMLEvents");a.initEvent(b, k, k);c.dispatchEvent(a);
      } else {
        var d = "on" + b;a = h.createEventObject();c.fireEvent(d, a);
      }
    };i.$CancelEvent = function (a) {
      a = v(a);a.preventDefault && a.preventDefault();a.cancel = d;a.returnValue = k;
    };i.$StopEvent = function (a) {
      a = v(a);a.stopPropagation && a.stopPropagation();a.cancelBubble = d;
    };i.$CreateCallback = function (d, c) {
      var a = [].slice.call(arguments, 2),
          b = function b() {
        var b = a.concat([].slice.call(arguments, 0));return c.apply(d, b);
      };return b;
    };i.$InnerText = function (a, b) {
      if (b == e) return a.textContent || a.innerText;var c = h.createTextNode(b);i.Dc(a);a.appendChild(c);
    };i.$InnerHtml = function (a, b) {
      if (b == e) return a.innerHTML;a.innerHTML = b;
    };i.$ClearInnerHtml = function (a) {
      a.innerHTML = "";
    };i.$Children = function (d, c) {
      for (var b = [], a = d.firstChild; a; a = a.nextSibling) {
        (c || a.nodeType == 1) && b.push(a);
      }return b;
    };function sb(a, c, e, b) {
      b = b || "u";for (a = a ? a.firstChild : g; a; a = a.nextSibling) {
        if (a.nodeType == 1) {
          if (M(a, b) == c) return a;if (!e) {
            var d = sb(a, c, e, b);if (d) return d;
          }
        }
      }
    }i.$FindChild = sb;function X(a, d, f, b) {
      b = b || "u";var c = [];for (a = a ? a.firstChild : g; a; a = a.nextSibling) {
        if (a.nodeType == 1) {
          M(a, b) == d && c.push(a);if (!f) {
            var e = X(a, d, f, b);if (e.length) c = c.concat(e);
          }
        }
      }return c;
    }function nb(a, c, d) {
      for (a = a ? a.firstChild : g; a; a = a.nextSibling) {
        if (a.nodeType == 1) {
          if (a.tagName == c) return a;if (!d) {
            var b = nb(a, c, d);if (b) return b;
          }
        }
      }
    }i.sg = nb;i.ug = function (b, a) {
      return b.getElementsByTagName(a);
    };i.Wb = function (a, f, d) {
      d = d || "u";var e;do {
        if (a.nodeType == 1) {
          var c = b.$AttributeEx(a, d);if (c && c == vb(f, c)) {
            e = a;break;
          }
        }a = b.Cc(a);
      } while (a && a != h.body);return e;
    };function G() {
      var f = arguments,
          d,
          c,
          b,
          a,
          h = 1 & f[0],
          g = 1 + h;d = f[g - 1] || {};for (; g < f.length; g++) {
        if (c = f[g]) for (b in c) {
          a = c[b];if (a !== e) {
            a = c[b];var i = d[b];d[b] = h && (C(i) || C(a)) ? G(h, {}, i, a) : a;
          }
        }
      }return d;
    }i.B = G;function ab(f, g) {
      var d = {},
          c,
          a,
          b;for (c in f) {
        a = f[c];b = g[c];if (a !== b) {
          var e;if (C(a) && C(b)) {
            a = ab(a, b);e = !rb(a);
          }!e && (d[c] = a);
        }
      }return d;
    }i.kd = function (a) {
      return H(a) == "function";
    };i.Fg = function (a) {
      return H(a) == "string";
    };i.mc = function (a) {
      return !isNaN(q(a)) && isFinite(a);
    };i.$Each = n;i.sd = C;function V(a) {
      return h.createElement(a);
    }i.$CreateElement = V;i.$CreateDiv = function () {
      return V("DIV");
    };i.wg = function () {
      return V("SPAN");
    };i.ed = function () {};function F(b, c, a) {
      if (a == e) return b.getAttribute(c);b.setAttribute(c, a);
    }function M(a, b) {
      return F(a, b) || F(a, "data-" + b);
    }i.$Attribute = F;i.$AttributeEx = M;i.db = function (d, b, c) {
      var a = i.vg(M(d, b));if (isNaN(a)) a = c;return a;
    };function y(b, a) {
      return F(b, "class", a) || "";
    }function xb(b) {
      var a = {};n(b, function (b) {
        if (b != e) a[b] = b;
      });return a;
    }function zb(b, a) {
      return b.match(a || Ab);
    }function T(b, a) {
      return xb(zb(b || "", a));
    }i.dd = xb;i.qg = zb;function cb(b, c) {
      var a = "";n(c, function (c) {
        a && (a += b);a += c;
      });return a;
    }function K(a, c, b) {
      y(a, cb(" ", G(ab(T(y(a)), T(c)), T(b))));
    }i.Cc = function (a) {
      return a.parentNode;
    };i.eb = function (a) {
      i.ac(a, "none");
    };i.J = function (a, b) {
      i.ac(a, b ? "none" : "");
    };i.kg = function (b, a) {
      b.removeAttribute(a);
    };i.pg = function (d, a) {
      if (a) d.style.clip = "rect(" + c.$Round(a.$Top || a.F || 0) + "px " + c.$Round(a.$Right) + "px " + c.$Round(a.$Bottom) + "px " + c.$Round(a.$Left || a.G || 0) + "px)";else if (a !== e) {
        var h = d.style.cssText,
            g = [new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i), new RegExp(/[\s]*cliptop: .*?[;]?/i), new RegExp(/[\s]*clipright: .*?[;]?/i), new RegExp(/[\s]*clipbottom: .*?[;]?/i), new RegExp(/[\s]*clipleft: .*?[;]?/i)],
            f = D(h, g, "");b.$CssCssText(d, f);
      }
    };i.cb = function () {
      return +new Date();
    };i.$AppendChild = function (b, a) {
      b.appendChild(a);
    };i.Nb = function (b, a, c) {
      (c || a.parentNode).insertBefore(b, a);
    };i.fc = function (b, a) {
      a = a || b.parentNode;a && a.removeChild(b);
    };i.og = function (a, b) {
      n(a, function (a) {
        i.fc(a, b);
      });
    };i.Dc = function (a) {
      i.og(i.$Children(a, d), a);
    };i.Bc = function (a, b) {
      var c = i.Cc(a);b & 1 && i.R(a, (i.$CssWidth(c) - i.$CssWidth(a)) / 2);b & 2 && i.U(a, (i.$CssHeight(c) - i.$CssHeight(a)) / 2);
    };var W = { $Top: g, $Right: g, $Bottom: g, $Left: g, D: g, E: g };i.ng = function (a) {
      var b = i.$CreateDiv();s(b, { bc: "block", sb: i.tb(a), $Top: 0, $Left: 0, D: 0, E: 0 });var d = i.nd(a, W);i.Nb(b, a);i.$AppendChild(b, a);var e = i.nd(a, W),
          c = {};n(d, function (b, a) {
        if (b == e[a]) c[a] = b;
      });s(b, W);s(b, c);s(a, { $Top: 0, $Left: 0 });return c;
    };i.vg = q;function Y(d, c, b) {
      var a = d.cloneNode(!c);!b && i.kg(a, "id");return a;
    }i.$CloneNode = Y;i.Pb = function (e, f) {
      var a = new Image();function b(e, d) {
        i.fb(a, "load", b);i.fb(a, "abort", c);i.fb(a, "error", c);f && f(a, d);
      }function c(a) {
        b(a, d);
      }if (ob() && l < 11.6 || !e) b(!e);else {
        i.$AddEvent(a, "load", b);i.$AddEvent(a, "abort", c);i.$AddEvent(a, "error", c);a.src = e;
      }
    };i.qe = function (d, a, e) {
      var c = d.length + 1;function b(b) {
        c--;if (a && b && b.src == a.src) a = b;!c && e && e(a);
      }n(d, function (a) {
        i.Pb(a.src, b);
      });b();
    };i.Id = function (a, g, i, h) {
      if (h) a = Y(a);var c = X(a, g);if (!c.length) c = b.ug(a, g);for (var f = c.length - 1; f > -1; f--) {
        var d = c[f],
            e = Y(i);y(e, y(d));b.$CssCssText(e, d.style.cssText);b.Nb(e, d);b.fc(d);
      }return a;
    };function Gb(a) {
      var d = this,
          p = "",
          r = ["av", "pv", "ds", "dn"],
          f = [],
          q,
          m = 0,
          k = 0,
          g = 0;function l() {
        K(a, q, (f[g || k & 2 || k] || "") + " " + (f[m] || ""));b.$Css(a, "pointer-events", g ? "none" : "");
      }function c() {
        m = 0;l();i.fb(h, "mouseup", c);i.fb(h, "touchend", c);i.fb(h, "touchcancel", c);
      }function j(a) {
        if (g) i.$CancelEvent(a);else {
          m = 4;l();i.$AddEvent(h, "mouseup", c);i.$AddEvent(h, "touchend", c);i.$AddEvent(h, "touchcancel", c);
        }
      }d.zd = function (a) {
        if (a === e) return k;k = a & 2 || a & 1;l();
      };d.$Enable = function (a) {
        if (a === e) return !g;g = a ? 0 : 3;l();
      };d.$Elmt = a = i.$GetElement(a);F(a, "data-jssor-button", "1");var o = b.qg(y(a));if (o) p = o.shift();n(r, function (a) {
        f.push(p + a);
      });q = cb(" ", f);f.unshift("");i.$AddEvent(a, "mousedown", j);i.$AddEvent(a, "touchstart", j);
    }i.lc = function (a) {
      return new Gb(a);
    };i.$Css = x;i.Zb = m("overflow");i.U = m("top", 2);i.xg = m("right", 2);i.Je = m("bottom", 2);i.R = m("left", 2);i.$CssWidth = m("width", 2);i.$CssHeight = m("height", 2);i.Bg = m("marginLeft", 2);i.Ag = m("marginTop", 2);i.tb = m("position");i.ac = m("display");i.H = m("zIndex", 1);i.Fc = function (b, a, c) {
      if (a != e) Fb(b, a, c);else return Db(b);
    };i.$CssCssText = function (a, b) {
      if (b != e) a.style.cssText = b;else return a.style.cssText;
    };i.pe = function (b, a) {
      if (a === e) {
        a = x(b, "backgroundImage") || "";var c = /\burl\s*\(\s*["']?([^"'\r\n,]+)["']?\s*\)/gi.exec(a) || [];return c[1];
      }x(b, "backgroundImage", a ? "url('" + a + "')" : "");
    };var L;i.ze = L = { $Opacity: i.Fc, $Top: i.U, $Right: i.xg, $Bottom: i.Je, $Left: i.R, D: i.$CssWidth, E: i.$CssHeight, sb: i.tb, bc: i.ac, $ZIndex: i.H };i.nd = function (c, b) {
      var a = {};n(b, function (d, b) {
        if (L[b]) a[b] = L[b](c);
      });return a;
    };function s(h, l) {
      var f = gb(),
          b = I(),
          d = eb(),
          j = P(h);function k(b, d, a) {
        var e = b.zb(p(-d / 2, -a / 2)),
            f = b.zb(p(d / 2, -a / 2)),
            g = b.zb(p(d / 2, a / 2)),
            h = b.zb(p(-d / 2, a / 2));b.zb(p(300, 300));return p(c.j(e.x, f.x, g.x, h.x) + d / 2, c.j(e.y, f.y, g.y, h.y) + a / 2);
      }function a(d, a) {
        a = a || {};var n = a.$TranslateZ || 0,
            p = (a.$RotateX || 0) % 360,
            q = (a.$RotateY || 0) % 360,
            u = (a.$Rotate || 0) % 360,
            l = a.$ScaleX,
            m = a.$ScaleY,
            g = a.th;if (l == e) l = 1;if (m == e) m = 1;if (g == e) g = 1;if (f) {
          n = 0;p = 0;q = 0;g = 0;
        }var c = new Cb(a.$TranslateX, a.$TranslateY, n);c.$Scale(l, m, g);c.Ne(a.$SkewX, a.$SkewY);c.$RotateX(p);c.$RotateY(q);c.Pe(u);if (b) {
          c.$Move(a.G, a.F);d.style[j] = c.Ge();
        } else if (!A || A < 9) {
          var o = "",
              h = { x: 0, y: 0 };if (a.$OriginalWidth) h = k(c, a.$OriginalWidth, a.$OriginalHeight);i.Ag(d, h.y);i.Bg(d, h.x);o = c.Be();var s = d.style.filter,
              t = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),
              r = D(s, [t], o);U(d, r);
        }
      }s = function s(f, c) {
        c = c || {};var j = c.G,
            k = c.F,
            h;n(L, function (a, b) {
          h = c[b];h !== e && a(f, h);
        });i.pg(f, c.$Clip);if (!b) {
          j != e && i.R(f, (c.Kd || 0) + j);k != e && i.U(f, (c.Jd || 0) + k);
        }if (c.Oe) if (d) yb(i.$CreateCallback(g, R, f, c));else a(f, c);
      };i.ic = R;if (d) i.ic = s;if (f) i.ic = a;else if (!b) a = R;i.N = s;s(h, l);
    }i.ic = s;i.N = s;function Cb(j, k, o) {
      var d = this,
          b = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, j || 0, k || 0, o || 0, 1],
          i = c.rb,
          h = c.Kb,
          l = c.xd;function f(a) {
        return a * c.C / 180;
      }function n(a, b) {
        return { x: a, y: b };
      }function m(b, c, f, g, i, l, n, o, q, t, u, w, y, A, C, F, a, d, e, h, j, k, m, p, r, s, v, x, z, B, D, E) {
        return [b * a + c * j + f * r + g * z, b * d + c * k + f * s + g * B, b * e + c * m + f * v + g * D, b * h + c * p + f * x + g * E, i * a + l * j + n * r + o * z, i * d + l * k + n * s + o * B, i * e + l * m + n * v + o * D, i * h + l * p + n * x + o * E, q * a + t * j + u * r + w * z, q * d + t * k + u * s + w * B, q * e + t * m + u * v + w * D, q * h + t * p + u * x + w * E, y * a + A * j + C * r + F * z, y * d + A * k + C * s + F * B, y * e + A * m + C * v + F * D, y * h + A * p + C * x + F * E];
      }function e(c, a) {
        return m.apply(g, (a || b).concat(c));
      }d.$Scale = function (a, c, d) {
        if (a != 1 || c != 1 || d != 1) b = e([a, 0, 0, 0, 0, c, 0, 0, 0, 0, d, 0, 0, 0, 0, 1]);
      };d.$Move = function (a, c, d) {
        b[12] += a || 0;b[13] += c || 0;b[14] += d || 0;
      };d.$RotateX = function (c) {
        if (c) {
          a = f(c);var d = h(a),
              g = i(a);b = e([1, 0, 0, 0, 0, d, g, 0, 0, -g, d, 0, 0, 0, 0, 1]);
        }
      };d.$RotateY = function (c) {
        if (c) {
          a = f(c);var d = h(a),
              g = i(a);b = e([d, 0, -g, 0, 0, 1, 0, 0, g, 0, d, 0, 0, 0, 0, 1]);
        }
      };d.Pe = function (c) {
        if (c) {
          a = f(c);var d = h(a),
              g = i(a);b = e([d, g, 0, 0, -g, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
      };d.Ne = function (a, c) {
        if (a || c) {
          j = f(a);k = f(c);b = e([1, l(k), 0, 0, l(j), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
      };d.zb = function (c) {
        var a = e(b, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c.x, c.y, 0, 1]);return n(a[12], a[13]);
      };d.Ge = function () {
        return "matrix3d(" + b.join(",") + ")";
      };d.Be = function () {
        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + b[0] + ", M12=" + b[4] + ", M21=" + b[1] + ", M22=" + b[5] + ", SizingMethod='auto expand')";
      };
    }new function () {
      var a = this;function b(d, g) {
        for (var j = d[0].length, i = d.length, h = g[0].length, f = [], c = 0; c < i; c++) {
          for (var k = f[c] = [], b = 0; b < h; b++) {
            for (var e = 0, a = 0; a < j; a++) {
              e += d[c][a] * g[a][b];
            }k[b] = e;
          }
        }return f;
      }a.$ScaleX = function (b, c) {
        return a.ce(b, c, 0);
      };a.$ScaleY = function (b, c) {
        return a.ce(b, 0, c);
      };a.ce = function (a, c, d) {
        return b(a, [[c, 0], [0, d]]);
      };a.zb = function (d, c) {
        var a = b(d, [[c.x], [c.y]]);return p(a[0][0], a[1][0]);
      };
    }();var S = { Kd: 0, Jd: 0, G: 0, F: 0, $Zoom: 1, $ScaleX: 1, $ScaleY: 1, $Rotate: 0, $RotateX: 0, $RotateY: 0, $TranslateX: 0, $TranslateY: 0, $TranslateZ: 0, $SkewX: 0, $SkewY: 0 };i.Gc = function (c, d) {
      var a = c || {};if (c) if (b.kd(c)) a = { Y: a };else if (b.kd(c.$Clip)) a.$Clip = { Y: c.$Clip };a.Y = a.Y || d;if (a.$Clip) a.$Clip.Y = a.$Clip.Y || d;return a;
    };function wb(c, a) {
      var b = {};n(c, function (c, d) {
        var f = c;if (a[d] != e) if (i.mc(c)) f = c + a[d];else f = wb(c, a[d]);b[d] = f;
      });return b;
    }i.ve = wb;i.Rd = function (n, j, s, t, B, C, o) {
      var a = j;if (n) {
        a = {};for (var i in j) {
          var D = C[i] || 1,
              z = B[i] || [0, 1],
              h = (s - z[0]) / z[1];h = c.j(c.k(h, 0), 1);h = h * D;var x = c.P(h);if (h != x) h -= x;var k = t.Y || f.$Linear,
              m,
              E = n[i],
              q = j[i];if (b.mc(q)) {
            k = t[i] || k;var A = k(h);m = E + q * A;
          } else {
            m = b.B({ hc: {} }, n[i]);var y = t[i] || {};b.$Each(q.hc || q, function (d, a) {
              k = y[a] || y.Y || k;var c = k(h),
                  b = d * c;m.hc[a] = b;m[a] += b;
            });
          }a[i] = m;
        }var w = b.$Each(j, function (b, a) {
          return S[a] != e;
        });w && b.$Each(S, function (c, b) {
          if (a[b] == e && n[b] !== e) a[b] = n[b];
        });if (w) {
          if (a.$Zoom) a.$ScaleX = a.$ScaleY = a.$Zoom;a.$OriginalWidth = o.$OriginalWidth;a.$OriginalHeight = o.$OriginalHeight;if (r() && l >= 11 && (j.G || j.F) && s != 0 && s != 1) a.$Rotate = a.$Rotate || 1e-8;a.Oe = d;
        }
      }if (j.$Clip && o.$Move) {
        var p = a.$Clip.hc,
            v = (p.$Top || 0) + (p.$Bottom || 0),
            u = (p.$Left || 0) + (p.$Right || 0);a.$Left = (a.$Left || 0) + u;a.$Top = (a.$Top || 0) + v;a.$Clip.$Left -= u;a.$Clip.$Right -= u;a.$Clip.$Top -= v;a.$Clip.$Bottom -= v;
      }if (a.$Clip && !a.$Clip.$Top && !a.$Clip.$Left && !a.$Clip.F && !a.$Clip.G && a.$Clip.$Right == o.$OriginalWidth && a.$Clip.$Bottom == o.$OriginalHeight) a.$Clip = g;return a;
    };
  }();function p() {
    var a = this,
        e = [];function k(a, b) {
      e.push({ ad: a, Vc: b });
    }function i(a, c) {
      b.$Each(e, function (b, d) {
        b.ad == a && b.Vc === c && e.splice(d, 1);
      });
    }a.$On = a.addEventListener = k;a.$Off = a.removeEventListener = i;a.l = function (a) {
      var c = [].slice.call(arguments, 1);b.$Each(e, function (b) {
        b.ad == a && b.Vc.apply(j, c);
      });
    };
  }var l = function l(A, D, g, L, O, J) {
    A = A || 0;var a = this,
        p,
        m,
        n,
        t,
        B = 0,
        H,
        I,
        G,
        C,
        z = 0,
        h = 0,
        l = 0,
        y,
        i,
        e,
        f,
        o,
        x,
        v = [],
        w;function P(a) {
      e += a;f += a;i += a;h += a;l += a;z += a;
    }function s(p) {
      var j = p;if (o) if (!x && (j >= f || j < e) || x && j >= e) j = ((j - e) % o + o) % o + e;if (!y || t || h != j) {
        var k = c.j(j, f);k = c.k(k, e);if (!y || t || k != l) {
          if (J) {
            var m = (k - i) / (D || 1);if (g.$Reverse) m = 1 - m;var n = b.Rd(O, J, m, H, G, I, g);if (w) b.$Each(n, function (b, a) {
              w[a] && w[a](L, b);
            });else b.N(L, n);
          }a.Lc(l - i, k - i);var r = l,
              q = l = k;b.$Each(v, function (b, c) {
            var a = !y && x || j <= h ? v[v.length - c - 1] : b;a.L(l - z);
          });h = j;y = d;a.Ac(r, q);
        }
      }
    }function E(a, b, d) {
      b && a.$Shift(f);if (!d) {
        e = c.j(e, a.pc() + z);f = c.k(f, a.yb() + z);
      }v.push(a);
    }var u = j.requestAnimationFrame || j.webkitRequestAnimationFrame || j.mozRequestAnimationFrame || j.msRequestAnimationFrame;if (b.$IsBrowserSafari() && b.$BrowserVersion() < 7 || !u) u = function u(a) {
      b.$Delay(a, g.$Interval);
    };function K() {
      if (p) {
        var d = b.cb(),
            e = c.j(d - B, g.Ld),
            a = h + e * n;B = d;if (a * n >= m * n) a = m;s(a);if (!t && a * n >= m * n) M(C);else u(K);
      }
    }function r(g, i, j) {
      if (!p) {
        p = d;t = j;C = i;g = c.k(g, e);g = c.j(g, f);m = g;n = m < h ? -1 : 1;a.Sd();B = b.cb();u(K);
      }
    }function M(b) {
      if (p) {
        t = p = C = k;a.Od();b && b();
      }
    }a.$Play = function (a, b, c) {
      r(a ? h + a : f, b, c);
    };a.ie = r;a.Db = M;a.Fe = function (a) {
      r(a);
    };a.jb = function () {
      return h;
    };a.he = function () {
      return m;
    };a.ob = function () {
      return l;
    };a.L = s;a.Ae = function () {
      s(f, d);
    };a.$Move = function (a) {
      s(h + a);
    };a.$IsPlaying = function () {
      return p;
    };a.le = function (a) {
      o = a;
    };a.$Shift = P;a.W = function (a, b) {
      E(a, 0, b);
    };a.Pc = function (a) {
      E(a, 1);
    };a.ke = function (a) {
      f += a;
    };a.pc = function () {
      return e;
    };a.yb = function () {
      return f;
    };a.Ac = a.Sd = a.Od = a.Lc = b.ed;a.Hc = b.cb();g = b.B({ $Interval: 16, Ld: 50 }, g);o = g.Qc;x = g.se;w = g.ye;e = i = A;f = A + D;I = g.$Round || {};G = g.$During || {};H = b.Gc(g.$Easing);
  };var m = { Sb: "data-scale", Ic: "data-scale-ratio", Hb: "data-autocenter" },
      o = new function () {
    var a = this;a.Z = function (c, a, e, d) {
      (d || !b.$Attribute(c, a)) && b.$Attribute(c, a, e);
    };a.kc = function (a) {
      var c = b.db(a, m.Hb);b.Bc(a, c);
    };
  }(),
      r = j.$JssorSlideshowFormations$ = new function () {
    var h = this,
        b = 0,
        a = 1,
        f = 2,
        e = 3,
        s = 1,
        r = 2,
        t = 4,
        q = 8,
        w = 256,
        x = 512,
        v = 1024,
        u = 2048,
        j = u + s,
        i = u + r,
        o = x + s,
        m = x + r,
        n = w + t,
        k = w + q,
        l = v + t,
        p = v + q;function y(a) {
      return (a & r) == r;
    }function z(a) {
      return (a & t) == t;
    }function g(b, a, c) {
      c.push(a);b[a] = b[a] || [];b[a].push(c);
    }h.$FormationStraight = function (f) {
      for (var d = f.$Cols, e = f.$Rows, s = f.$Assembly, t = f.oc, r = [], a = 0, b = 0, p = d - 1, q = e - 1, h = t - 1, c, b = 0; b < e; b++) {
        for (a = 0; a < d; a++) {
          switch (s) {case j:
              c = h - (a * e + (q - b));break;case l:
              c = h - (b * d + (p - a));break;case o:
              c = h - (a * e + b);case n:
              c = h - (b * d + a);break;case i:
              c = a * e + b;break;case k:
              c = b * d + (p - a);break;case m:
              c = a * e + (q - b);break;default:
              c = b * d + a;}g(r, c, [b, a]);
        }
      }return r;
    };h.$FormationSwirl = function (q) {
      var x = q.$Cols,
          y = q.$Rows,
          B = q.$Assembly,
          w = q.oc,
          A = [],
          z = [],
          u = 0,
          c = 0,
          h = 0,
          r = x - 1,
          s = y - 1,
          t,
          p,
          v = 0;switch (B) {case j:
          c = r;h = 0;p = [f, a, e, b];break;case l:
          c = 0;h = s;p = [b, e, a, f];break;case o:
          c = r;h = s;p = [e, a, f, b];break;case n:
          c = r;h = s;p = [a, e, b, f];break;case i:
          c = 0;h = 0;p = [f, b, e, a];break;case k:
          c = r;h = 0;p = [a, f, b, e];break;case m:
          c = 0;h = s;p = [e, b, f, a];break;default:
          c = 0;h = 0;p = [b, f, a, e];}u = 0;while (u < w) {
        t = h + "," + c;if (c >= 0 && c < x && h >= 0 && h < y && !z[t]) {
          z[t] = d;g(A, u++, [h, c]);
        } else switch (p[v++ % p.length]) {case b:
            c--;break;case f:
            h--;break;case a:
            c++;break;case e:
            h++;}switch (p[v % p.length]) {case b:
            c++;break;case f:
            h++;break;case a:
            c--;break;case e:
            h--;}
      }return A;
    };h.$FormationZigZag = function (p) {
      var w = p.$Cols,
          x = p.$Rows,
          z = p.$Assembly,
          v = p.oc,
          t = [],
          u = 0,
          c = 0,
          d = 0,
          q = w - 1,
          r = x - 1,
          y,
          h,
          s = 0;switch (z) {case j:
          c = q;d = 0;h = [f, a, e, a];break;case l:
          c = 0;d = r;h = [b, e, a, e];break;case o:
          c = q;d = r;h = [e, a, f, a];break;case n:
          c = q;d = r;h = [a, e, b, e];break;case i:
          c = 0;d = 0;h = [f, b, e, b];break;case k:
          c = q;d = 0;h = [a, f, b, f];break;case m:
          c = 0;d = r;h = [e, b, f, b];break;default:
          c = 0;d = 0;h = [b, f, a, f];}u = 0;while (u < v) {
        y = d + "," + c;if (c >= 0 && c < w && d >= 0 && d < x && typeof t[y] == "undefined") {
          g(t, u++, [d, c]);switch (h[s % h.length]) {case b:
              c++;break;case f:
              d++;break;case a:
              c--;break;case e:
              d--;}
        } else {
          switch (h[s++ % h.length]) {case b:
              c--;break;case f:
              d--;break;case a:
              c++;break;case e:
              d++;}switch (h[s++ % h.length]) {case b:
              c++;break;case f:
              d++;break;case a:
              c--;break;case e:
              d--;}
        }
      }return t;
    };h.$FormationStraightStairs = function (q) {
      var u = q.$Cols,
          v = q.$Rows,
          e = q.$Assembly,
          t = q.oc,
          r = [],
          s = 0,
          c = 0,
          d = 0,
          f = u - 1,
          h = v - 1,
          x = t - 1;switch (e) {case j:case m:case o:case i:
          var a = 0,
              b = 0;break;case k:case l:case n:case p:
          var a = f,
              b = 0;break;default:
          e = p;var a = f,
              b = 0;}c = a;d = b;while (s < t) {
        if (z(e) || y(e)) g(r, x - s++, [d, c]);else g(r, s++, [d, c]);switch (e) {case j:case m:
            c--;d++;break;case o:case i:
            c++;d--;break;case k:case l:
            c--;d--;break;case p:case n:default:
            c++;d++;}if (c < 0 || d < 0 || c > f || d > h) {
          switch (e) {case j:case m:
              a++;break;case k:case l:case o:case i:
              b++;break;case p:case n:default:
              a--;}if (a < 0 || b < 0 || a > f || b > h) {
            switch (e) {case j:case m:
                a = f;b++;break;case o:case i:
                b = h;a++;break;case k:case l:
                b = h;a--;break;case p:case n:default:
                a = 0;b++;}if (b > h) b = h;else if (b < 0) b = 0;else if (a > f) a = f;else if (a < 0) a = 0;
          }d = b;c = a;
        }
      }return r;
    };h.$FormationRectangle = function (f) {
      var d = f.$Cols || 1,
          e = f.$Rows || 1,
          h = [],
          a,
          b,
          i;i = c.$Round(c.j(d / 2, e / 2)) + 1;for (a = 0; a < d; a++) {
        for (b = 0; b < e; b++) {
          g(h, i - c.j(a + 1, b + 1, d - a, e - b), [b, a]);
        }
      }return h;
    };h.$FormationRandom = function (d) {
      for (var e = [], a, b = 0; b < d.$Rows; b++) {
        for (a = 0; a < d.$Cols; a++) {
          g(e, c.I(1e5 * c.td()) % 13, [b, a]);
        }
      }return e;
    };h.$FormationCircle = function (d) {
      for (var e = d.$Cols || 1, f = d.$Rows || 1, h = [], a, i = e / 2 - .5, j = f / 2 - .5, b = 0; b < e; b++) {
        for (a = 0; a < f; a++) {
          g(h, c.$Round(c.Mb(c.q(b - i, 2) + c.q(a - j, 2))), [a, b]);
        }
      }return h;
    };h.$FormationCross = function (d) {
      for (var e = d.$Cols || 1, f = d.$Rows || 1, h = [], a, i = e / 2 - .5, j = f / 2 - .5, b = 0; b < e; b++) {
        for (a = 0; a < f; a++) {
          g(h, c.$Round(c.j(c.m(b - i), c.m(a - j))), [a, b]);
        }
      }return h;
    };h.$FormationRectangleCross = function (f) {
      for (var h = f.$Cols || 1, i = f.$Rows || 1, j = [], a, d = h / 2 - .5, e = i / 2 - .5, k = c.k(d, e) + 1, b = 0; b < h; b++) {
        for (a = 0; a < i; a++) {
          g(j, c.$Round(k - c.k(d - c.m(b - d), e - c.m(a - e))) - 1, [a, b]);
        }
      }return j;
    };
  }();j.$JssorSlideshowRunner$ = function (m, s, o, u, z, A) {
    var a = this,
        v,
        h,
        e,
        y = 0,
        x = u.$TransitionsOrder,
        q,
        i = 8;function t(a) {
      if (a.$Top) a.F = a.$Top;if (a.$Left) a.G = a.$Left;b.$Each(a, function (a) {
        b.sd(a) && t(a);
      });
    }function j(h, e, g) {
      var a = { $Interval: e, $Duration: 1, $Delay: 0, $Cols: 1, $Rows: 1, $Opacity: 0, $Zoom: 0, $Clip: 0, $Move: k, $SlideOut: k, $Reverse: k, $Formation: r.$FormationRandom, $Assembly: 1032, $ChessMode: { $Column: 0, $Row: 0 }, $Easing: f.$Linear, $Round: {}, dc: [], $During: {} };b.B(a, h);if (a.$Rows == 0) a.$Rows = c.$Round(a.$Cols * g);t(a);a.oc = a.$Cols * a.$Rows;a.$Easing = b.Gc(a.$Easing, f.$Linear);a.me = c.I(a.$Duration / a.$Interval);a.re = function (c, b) {
        c /= a.$Cols;b /= a.$Rows;var f = c + "x" + b;if (!a.dc[f]) {
          a.dc[f] = { D: c, E: b };for (var d = 0; d < a.$Cols; d++) {
            for (var e = 0; e < a.$Rows; e++) {
              a.dc[f][e + "," + d] = { $Top: e * b, $Right: d * c + c, $Bottom: e * b + b, $Left: d * c };
            }
          }
        }return a.dc[f];
      };if (a.$Brother) {
        a.$Brother = j(a.$Brother, e, g);a.$SlideOut = d;
      }return a;
    }function n(z, i, a, v, n, l) {
      var y = this,
          t,
          u = {},
          h = {},
          m = [],
          f,
          e,
          r,
          p = a.$ChessMode.$Column || 0,
          q = a.$ChessMode.$Row || 0,
          g = a.re(n, l),
          o = B(a),
          C = o.length - 1,
          s = a.$Duration + a.$Delay * C,
          w = v + s,
          j = a.$SlideOut,
          x;w += 50;function B(a) {
        var b = a.$Formation(a);return a.$Reverse ? b.reverse() : b;
      }y.rd = w;y.cc = function (d) {
        d -= v;var e = d < s;if (e || x) {
          x = e;if (!j) d = s - d;var f = c.I(d / a.$Interval);b.$Each(h, function (a, e) {
            var d = c.k(f, a.j);d = c.j(d, a.length - 1);if (a.Ed != d) {
              if (!a.Ed && !j) b.J(m[e]);else d == a.k && j && b.eb(m[e]);a.Ed = d;b.N(m[e], a[d]);
            }
          });
        }
      };i = b.$CloneNode(i);A(i, 0, 0);b.$Each(o, function (i, m) {
        b.$Each(i, function (G) {
          var I = G[0],
              H = G[1],
              v = I + "," + H,
              o = k,
              s = k,
              x = k;if (p && H % 2) {
            if (p & 3) o = !o;if (p & 12) s = !s;if (p & 16) x = !x;
          }if (q && I % 2) {
            if (q & 3) o = !o;if (q & 12) s = !s;if (q & 16) x = !x;
          }a.$Top = a.$Top || a.$Clip & 4;a.$Bottom = a.$Bottom || a.$Clip & 8;a.$Left = a.$Left || a.$Clip & 1;a.$Right = a.$Right || a.$Clip & 2;var C = s ? a.$Bottom : a.$Top,
              z = s ? a.$Top : a.$Bottom,
              B = o ? a.$Right : a.$Left,
              A = o ? a.$Left : a.$Right;a.$Clip = C || z || B || A;r = {};e = { F: 0, G: 0, $Opacity: 1, D: n, E: l };f = b.B({}, e);t = b.B({}, g[v]);if (a.$Opacity) e.$Opacity = 2 - a.$Opacity;if (a.$ZIndex) {
            e.$ZIndex = a.$ZIndex;f.$ZIndex = 0;
          }var K = a.$Cols * a.$Rows > 1 || a.$Clip;if (a.$Zoom || a.$Rotate) {
            var J = d;if (J) {
              e.$Zoom = a.$Zoom ? a.$Zoom - 1 : 1;f.$Zoom = 1;var N = a.$Rotate || 0;e.$Rotate = N * 360 * (x ? -1 : 1);f.$Rotate = 0;
            }
          }if (K) {
            var i = t.hc = {};if (a.$Clip) {
              var w = a.$ScaleClip || 1;if (C && z) {
                i.$Top = g.E / 2 * w;i.$Bottom = -i.$Top;
              } else if (C) i.$Bottom = -g.E * w;else if (z) i.$Top = g.E * w;if (B && A) {
                i.$Left = g.D / 2 * w;i.$Right = -i.$Left;
              } else if (B) i.$Right = -g.D * w;else if (A) i.$Left = g.D * w;
            }r.$Clip = t;f.$Clip = g[v];
          }var L = o ? 1 : -1,
              M = s ? 1 : -1;if (a.x) e.G += n * a.x * L;if (a.y) e.F += l * a.y * M;b.$Each(e, function (a, c) {
            if (b.mc(a)) if (a != f[c]) r[c] = a - f[c];
          });u[v] = j ? f : e;var D = a.me,
              y = c.$Round(m * a.$Delay / a.$Interval);h[v] = new Array(y);h[v].j = y;h[v].k = y + D - 1;for (var F = 0; F <= D; F++) {
            var E = b.Rd(f, r, F / D, a.$Easing, a.$During, a.$Round, { $Move: a.$Move, $OriginalWidth: n, $OriginalHeight: l });E.$ZIndex = E.$ZIndex || 1;h[v].push(E);
          }
        });
      });o.reverse();b.$Each(o, function (a) {
        b.$Each(a, function (c) {
          var f = c[0],
              e = c[1],
              d = f + "," + e,
              a = i;if (e || f) a = b.$CloneNode(i);b.N(a, u[d]);b.Zb(a, "hidden");b.tb(a, "absolute");z.te(a);m[d] = a;b.J(a, !j);
        });
      });
    }function w() {
      var a = this,
          b = 0;l.call(a, 0, v);a.Ac = function (c, a) {
        if (a - b > i) {
          b = a;e && e.cc(a);h && h.cc(a);
        }
      };a.Xc = q;
    }a.ue = function () {
      var a = 0,
          b = u.$Transitions,
          d = b.length;if (x) a = y++ % d;else a = c.P(c.td() * d);b[a] && (b[a].Cb = a);return b[a];
    };a.Ce = function (x, y, k, l, b, t) {
      a.Bb();q = b;b = j(b, i, t);var g = l.Cd,
          f = k.Cd;g["no-image"] = !l.qc;f["no-image"] = !k.qc;var p = g,
          r = f,
          w = b,
          d = b.$Brother || j({}, i, t);if (!b.$SlideOut) {
        p = f;r = g;
      }var u = d.$Shift || 0;h = new n(m, r, d, c.k(u - d.$Interval, 0), s, o);e = new n(m, p, w, c.k(d.$Interval - u, 0), s, o);h.cc(0);e.cc(0);v = c.k(h.rd, e.rd);a.Cb = x;
    };a.Bb = function () {
      m.Bb();h = g;e = g;
    };a.Ie = function () {
      var a = g;if (e) a = new w();return a;
    };if (z && b.$WebKitVersion() < 537) i = 16;p.call(a);l.call(a, -1e7, 1e7);
  };var q = { tc: 1 };j.$JssorBulletNavigator$ = function (a, E) {
    var f = this;p.call(f);a = b.$GetElement(a);var u,
        C,
        B,
        t,
        l = 0,
        e,
        n,
        j,
        y,
        z,
        i,
        h,
        s,
        r,
        D = [],
        A = [];function x(a) {
      a != -1 && A[a].zd(a == l);
    }function v(a) {
      f.l(q.tc, a * n);
    }f.$Elmt = a;f.Jc = function (a) {
      if (a != t) {
        var d = l,
            b = c.P(a / n);l = b;t = a;x(d);x(b);
      }
    };f.Sc = function (c) {
      b.J(a, c);
    };var w;f.Tc = function (x) {
      if (!w) {
        u = c.I(x / n);l = 0;var o = s + y,
            p = r + z,
            m = c.I(u / j) - 1;C = s + o * (!i ? m : j - 1);B = r + p * (i ? m : j - 1);b.$CssWidth(a, C);b.$CssHeight(a, B);for (var f = 0; f < u; f++) {
          var t = b.wg();b.$InnerText(t, f + 1);var k = b.Id(h, "numbertemplate", t, d);b.tb(k, "absolute");var q = f % (m + 1);b.R(k, !i ? o * q : f % j * o);b.U(k, i ? p * q : c.P(f / (m + 1)) * p);b.$AppendChild(a, k);D[f] = k;e.$ActionMode & 1 && b.$AddEvent(k, "click", b.$CreateCallback(g, v, f));e.$ActionMode & 2 && b.$AddEvent(k, "mouseenter", b.$CreateCallback(g, v, f));A[f] = b.lc(k);
        }w = d;
      }
    };f.zc = e = b.B({ $SpacingX: 10, $SpacingY: 10, $Orientation: 1, $ActionMode: 1 }, E);h = b.$FindChild(a, "prototype");s = b.$CssWidth(h);r = b.$CssHeight(h);b.fc(h, a);n = e.$Steps || 1;j = e.$Rows || 1;y = e.$SpacingX;z = e.$SpacingY;i = e.$Orientation - 1;e.$Scale == k && o.Z(a, m.Sb, 1);e.$AutoCenter && o.Z(a, m.Hb, e.$AutoCenter);o.kc(a);
  };j.$JssorArrowNavigator$ = function (a, e, i, A, z, x) {
    var c = this;p.call(c);var j, h, f, l;b.$CssWidth(a);b.$CssHeight(a);var s, r;function n(a) {
      c.l(q.tc, a, d);
    }function v(c) {
      b.J(a, c);b.J(e, c);
    }function u() {
      s.$Enable(i.$Loop || !j.Le(h));r.$Enable(i.$Loop || !j.xe(h));
    }c.Jc = function (c, a, b) {
      h = a;!b && u();
    };c.Sc = v;var t;c.Tc = function (c) {
      h = 0;if (!t) {
        b.$AddEvent(a, "click", b.$CreateCallback(g, n, -l));b.$AddEvent(e, "click", b.$CreateCallback(g, n, l));s = b.lc(a);r = b.lc(e);t = d;
      }
    };c.zc = f = b.B({ $Steps: 1 }, i);l = f.$Steps;j = x;if (f.$Scale == k) {
      o.Z(a, m.Sb, 1);o.Z(e, m.Sb, 1);
    }if (f.$AutoCenter) {
      o.Z(a, m.Hb, f.$AutoCenter);o.Z(e, m.Hb, f.$AutoCenter);
    }o.kc(a);o.kc(e);
  };j.$JssorThumbnailNavigator$ = function (f, E) {
    var j = this,
        x,
        A,
        s,
        a,
        y = [],
        B,
        z,
        e,
        l,
        n,
        w,
        v,
        r,
        t,
        h,
        u;p.call(j);f = b.$GetElement(f);function D(n, f) {
      var h = this,
          c,
          m,
          l;function o() {
        m.zd(s == f);
      }function i(g) {
        if (g || !t.we()) {
          var c = e - f % e,
              a = t.Ud((f + c) / e - 1),
              b = a * e + e - c;if (a < 0) b += x % e;if (a >= A) b -= x % e;j.l(q.tc, b, k, d);
        }
      }h.Cb = f;h.md = o;l = n.oe || n.qc || b.$CreateDiv();h.ec = c = b.Id(u, "thumbnailtemplate", l, d);m = b.lc(c);a.$ActionMode & 1 && b.$AddEvent(c, "click", b.$CreateCallback(g, i, 0));a.$ActionMode & 2 && b.$AddEvent(c, "mouseenter", b.$CreateCallback(g, i, 1));
    }j.Jc = function (a, f, d) {
      if (a != s) {
        var b = s;s = a;b != -1 && y[b].md();y[a].md();
      }!d && t.$PlayTo(t.Ud(c.P(a / e)));
    };j.Sc = function (a) {
      b.J(f, a);
    };var C;j.Tc = function (H, I) {
      if (!C) {
        x = H;A = c.I(x / e);s = -1;var g = a.$Orientation & 1,
            p = w + (w + l) * (e - 1) * (1 - g),
            o = v + (v + n) * (e - 1) * g,
            u = (g ? c.k : c.j)(B, p),
            q = (g ? c.j : c.k)(z, o);r = c.I((B - l) / (w + l) * g + (z - n) / (v + n) * (1 - g));r = c.j(r, A);var F = p + (p + l) * (r - 1) * g,
            E = o + (o + n) * (r - 1) * (1 - g);u = c.j(u, F);q = c.j(q, E);b.tb(h, "absolute");b.Zb(h, "hidden");b.$CssWidth(h, u);b.$CssHeight(h, q);b.Bc(h, 3);var m = [];b.$Each(I, function (k, f) {
          var i = new D(k, f),
              d = i.ec,
              a = c.P(f / e),
              j = f % e;b.R(d, (w + l) * j * (1 - g));b.U(d, (v + n) * j * g);if (!m[a]) {
            m[a] = b.$CreateDiv();b.$AppendChild(h, m[a]);
          }b.$AppendChild(m[a], d);y.push(i);
        });var G = b.B({ $AutoPlay: 0, $NaviQuitDrag: k, $SlideWidth: p, $SlideHeight: o, $SlideSpacing: l * g + n * (1 - g), $MinDragOffsetToSlide: 12, $SlideDuration: 200, $PauseOnHover: 1, $Cols: r, $PlayOrientation: a.$Orientation, $DragOrientation: a.$NoDrag || a.$DisableDrag ? 0 : a.$Orientation }, a);t = new i(f, G);j.lg = t.lg;C = d;
      }
    };j.zc = a = b.B({ $SpacingX: 0, $SpacingY: 0, $Orientation: 1, $ActionMode: 1 }, E);B = b.$CssWidth(f);z = b.$CssHeight(f);h = b.$FindChild(f, "slides", d);u = b.$FindChild(h, "prototype");w = b.$CssWidth(u);v = b.$CssHeight(u);b.fc(u, h);e = a.$Rows || 1;l = a.$SpacingX;n = a.$SpacingY;a.$Scale == k && o.Z(f, m.Sb, 1);a.$AutoCenter &= a.$Orientation;a.$AutoCenter && o.Z(f, m.Hb, a.$AutoCenter);o.kc(f);
  };function s(e, d, c) {
    var a = this;l.call(a, 0, c);a.Bd = b.ed;a.od = 0;a.fd = c;
  }j.$JssorCaptionSlideo$ = function (t, k, B, E) {
    var a = this,
        u,
        o = {},
        v = k.$Transitions,
        r = k.$Controls,
        m = new l(0, 0),
        p = [],
        h = [],
        D = E,
        e = D ? 1e8 : 0;l.call(a, 0, 0);function q(d, c) {
      var a = {};b.$Each(d, function (d, f) {
        var e = o[f];if (e) {
          if (b.sd(d)) d = q(d, c || f == "e");else if (c) if (b.mc(d)) d = u[d];a[e] = d;
        }
      });return a;
    }function s(d, e) {
      var a = [],
          c = b.$Children(d);b.$Each(c, function (c) {
        var d = v[b.db(c, "t")];d && a.push({ $Elmt: c, Xc: d });a = a.concat(s(c, e + 1));
      });return a;
    }function n(c, e) {
      var a = p[c];if (a == g) {
        a = p[c] = { hb: c, bd: [], id: [] };var d = 0;!b.$Each(h, function (a, b) {
          d = b;return a.hb > c;
        }) && d++;h.splice(d, 0, a);
      }return a;
    }function y(s, t, h) {
      var a, f;if (r) {
        var m = r[b.db(s, "c")];if (m) {
          a = n(m.r, 0);a.rg = m.e || 0;
        }
      }b.$Each(t, function (i) {
        var g = b.B(d, {}, q(i)),
            j = b.Gc(g.$Easing);delete g.$Easing;if (g.$Left) {
          g.G = g.$Left;j.G = j.$Left;delete g.$Left;
        }if (g.$Top) {
          g.F = g.$Top;j.F = j.$Top;delete g.$Top;
        }var o = { $Easing: j, $OriginalWidth: h.D, $OriginalHeight: h.E },
            k = new l(i.b, i.d, o, s, h, g);e = c.k(e, i.b + i.d);if (a) {
          if (!f) f = new l(i.b, 0);f.W(k);
        } else {
          var m = n(i.b, i.b + i.d);m.bd.push(k);
        }h = b.ve(h, g);
      });if (a && f) {
        f.Ae();var i = f,
            k,
            j = f.pc(),
            o = f.yb(),
            p = c.k(o, a.rg);if (a.hb < o) {
          if (a.hb > j) {
            i = new l(j, a.hb - j);i.W(f, d);
          } else i = g;k = new l(a.hb, p - j, { Qc: p - a.hb, se: d });k.W(f, d);
        }i && a.bd.push(i);k && a.id.push(k);
      }return h;
    }function x(a) {
      b.$Each(a, function (f) {
        var a = f.$Elmt,
            e = b.$CssWidth(a),
            d = b.$CssHeight(a),
            c = { $Left: b.R(a), $Top: b.U(a), G: 0, F: 0, $Opacity: 1, $ZIndex: b.H(a) || 0, $Rotate: 0, $RotateX: 0, $RotateY: 0, $ScaleX: 1, $ScaleY: 1, $TranslateX: 0, $TranslateY: 0, $TranslateZ: 0, $SkewX: 0, $SkewY: 0, D: e, E: d, $Clip: { $Top: 0, $Right: e, $Bottom: d, $Left: 0 } };c.Kd = c.$Left;c.Jd = c.$Top;y(a, f.Xc, c);
      });
    }function A(f, e, g) {
      var c = f.b - e;if (c) {
        var b = new l(e, c);b.W(m, d);b.$Shift(g);a.W(b);
      }a.ke(f.d);return c;
    }function z(e) {
      var c = m.pc(),
          d = 0;b.$Each(e, function (e, f) {
        e = b.B({ d: 3e3 }, e);A(e, c, d);c = e.b;d += e.d;if (!f || e.t == 2) {
          a.od = c;a.fd = c + e.d;
        }
      });
    }function j(k, d, f) {
      var g = d.length;if (g > 4) for (var m = c.I(g / 4), a = 0; a < m; a++) {
        var h = d.slice(a * 4, c.j(a * 4 + 4, g)),
            i = new l(h[0].hb, 0);j(i, h, f);k.W(i);
      } else b.$Each(d, function (a) {
        b.$Each(f ? a.id : a.bd, function (a) {
          f && a.ke(e - a.yb());k.W(a);
        });
      });
    }a.Bd = function () {
      a.L(-1, d);
    };u = [f.$Linear, f.$Swing, f.$InQuad, f.$OutQuad, f.$InOutQuad, f.$InCubic, f.$OutCubic, f.$InOutCubic, f.$InQuart, f.$OutQuart, f.$InOutQuart, f.$InQuint, f.$OutQuint, f.$InOutQuint, f.$InSine, f.$OutSine, f.$InOutSine, f.$InExpo, f.$OutExpo, f.$InOutExpo, f.$InCirc, f.$OutCirc, f.$InOutCirc, f.$InElastic, f.$OutElastic, f.$InOutElastic, f.$InBack, f.$OutBack, f.$InOutBack, f.$InBounce, f.$OutBounce, f.$InOutBounce, f.$Early, f.$Late];var C = { $Top: "y", $Left: "x", $Bottom: "m", $Right: "t", $Rotate: "r", $RotateX: "rX", $RotateY: "rY", $ScaleX: "sX", $ScaleY: "sY", $TranslateX: "tX", $TranslateY: "tY", $TranslateZ: "tZ", $SkewX: "kX", $SkewY: "kY", $Opacity: "o", $Easing: "e", $ZIndex: "i", $Clip: "c" };b.$Each(C, function (b, a) {
      o[b] = a;
    });x(s(t, 1));j(m, h);var w = k.$Breaks || [],
        i = w[b.db(t, "b")] || [];i = i.concat({ b: e, d: i.length ? 0 : B });z(i);e = c.k(e, a.yb());j(a, h, d);a.L(-1);
  };var i = j.$JssorSlider$ = (j.module || {}).exports = function () {
    var a = this;b.Gg(a, p);var Gb = "data-jssor-slider",
        Wb = "data-jssor-thumb",
        v,
        n,
        ab,
        lb,
        eb,
        qb,
        db,
        U,
        O,
        M,
        Qb,
        lc,
        pc = 1,
        kc = 1,
        Yb = 1,
        bc = {},
        z,
        Z,
        Eb,
        Sb,
        Pb,
        pb,
        sb,
        rb,
        kb,
        r = -1,
        Jb,
        o,
        S,
        Q,
        G,
        yb,
        zb,
        w,
        N,
        P,
        bb,
        y,
        X,
        xb,
        gb = [],
        gc,
        ic,
        cc,
        qc,
        Lc,
        u,
        mb,
        J,
        ec,
        wb,
        Hb,
        fc,
        L,
        Cb = 0,
        E = 0,
        K = Number.MAX_VALUE,
        H = Number.MIN_VALUE,
        hc,
        D,
        nb,
        V,
        R = 1,
        cb,
        B,
        fb,
        Kb = 0,
        Lb = 0,
        T,
        tb,
        ub,
        ob,
        x,
        ib,
        A,
        Mb,
        hb = [],
        Tb = b.$Device(),
        vb = Tb.Mg,
        C = [],
        F,
        W,
        I,
        Fb,
        Vb,
        Y;function xc(e, k, o) {
      var l = this,
          h = { $Top: 2, $Right: 1, $Bottom: 2, $Left: 1 },
          n = { $Top: "top", $Right: "right", $Bottom: "bottom", $Left: "left" },
          g,
          a,
          f,
          i,
          j = {};l.$Elmt = e;l.$ScaleSize = function (q, p, t) {
        var l,
            s = q,
            r = p;if (!f) {
          f = b.ng(e);g = e.parentNode;i = { $Scale: b.db(e, m.Sb, 1), $AutoCenter: b.db(e, m.Hb) };b.$Each(n, function (c, a) {
            j[a] = b.db(e, "data-scale-" + c, 1);
          });a = e;if (k) {
            a = b.$CloneNode(g, d);b.N(a, { $Top: 0, $Left: 0 });b.$AppendChild(a, e);b.$AppendChild(g, a);
          }
        }if (o) {
          l = c.k(q, p);if (k) if (t > 0 && t < 1) {
            var v = c.j(q, p);l = c.j(l / v, 1 / (1 - t)) * v;
          }
        } else s = r = l = c.q(O < M ? p : q, i.$Scale);b.cg(a, l);b.$Attribute(a, m.Ic, l);b.$CssWidth(g, f.D * s);b.$CssHeight(g, f.E * r);var u = b.$IsBrowserIE() && b.$BrowserEngineVersion() < 9 || b.$BrowserEngineVersion() < 10 && b.$IsBrowserIeQuirks() ? l : 1,
            w = (s - u) * f.D / 2,
            x = (r - u) * f.E / 2;b.R(a, w);b.U(a, x);b.$Each(f, function (d, a) {
          if (h[a] && d) {
            var e = (h[a] & 1) * c.q(q, j[a]) * d + (h[a] & 2) * c.q(p, j[a]) * d / 2;b.ze[a](g, e);
          }
        });b.Bc(g, i.$AutoCenter);
      };
    }function Kc() {
      var b = this;l.call(b, -1e8, 2e8);b.tg = function () {
        var a = b.ob();a = t(a);var d = c.$Round(a),
            g = d,
            f = a - c.P(a),
            e = Xb(a);return { Cb: g, Zf: d, sb: f, bc: a, ag: e };
      };b.Ac = function (e, b) {
        var g = t(b);if (c.m(b - e) > 1e-5) {
          var f = c.P(b);if (f != b && b > e && (D & 1 || b > E)) f++;jc(f, g, d);
        }a.l(i.$EVT_POSITION_CHANGE, g, t(e), b, e);
      };
    }function Jc() {
      var a = this;l.call(a, 0, 0, { Qc: o });b.$Each(C, function (b) {
        D & 1 && b.le(o);a.Pc(b);b.$Shift(L / w);
      });
    }function Ic() {
      var a = this,
          b = Mb.$Elmt;l.call(a, -1, 2, { $Easing: f.$Linear, ye: { sb: oc }, Qc: o }, b, { sb: 1 }, { sb: -2 });a.ec = b;
    }function Ac(o, m) {
      var b = this,
          e,
          f,
          h,
          j,
          c;l.call(b, -1e8, 2e8, { Ld: 100 });b.Sd = function () {
        cb = d;fb = g;a.l(i.$EVT_SWIPE_START, t(x.jb()), x.jb());
      };b.Od = function () {
        cb = k;j = k;var b = x.tg();a.l(i.$EVT_SWIPE_END, t(x.jb()), x.jb());if (!B) {
          Mc(b.Zf, r);(!b.sb || b.ag) && jc(r, b.bc);
        }
      };b.Ac = function (g, d) {
        var a;if (j) a = c;else {
          a = f;if (h) {
            var b = d / h;a = n.$SlideEasing(b) * (f - e) + e;
          }
        }x.L(a);
      };b.uc = function (a, d, c, g) {
        e = a;f = d;h = c;x.L(a);b.L(0);b.ie(c, g);
      };b.eg = function (a) {
        j = d;c = a;b.$Play(a, g, d);
      };b.fg = function (a) {
        c = a;
      };x = new Kc();x.W(o);x.W(m);
    }function Bc() {
      var c = this,
          a = mc();b.H(a, 0);b.$Css(a, "pointerEvents", "none");c.$Elmt = a;c.te = function (c) {
        b.$AppendChild(a, c);b.J(a);
      };c.Bb = function () {
        b.eb(a);b.Dc(a);
      };
    }function Hc(m, f) {
      var e = this,
          s,
          I,
          w,
          j,
          x = [],
          E,
          y,
          P,
          G,
          M,
          B,
          H,
          h,
          v,
          q;l.call(e, -N, N + 1, {});function z(a) {
        s && s.Bd();O(m, a, 0);B = d;s = new eb.$Class(m, eb, b.db(m, "idle", ec), !u);s.L(0);
      }function T() {
        s.Hc < eb.Hc && z();
      }function K(p, r, o) {
        if (!G) {
          G = d;if (j && o) {
            var g = o.width,
                c = o.height,
                m = g,
                l = c;if (g && c && n.$FillMode) {
              if (n.$FillMode & 3 && (!(n.$FillMode & 4) || g > S || c > Q)) {
                var h = k,
                    q = S / Q * c / g;if (n.$FillMode & 1) h = q > 1;else if (n.$FillMode & 2) h = q < 1;m = h ? g * Q / c : S;l = h ? Q : c * S / g;
              }b.$CssWidth(j, m);b.$CssHeight(j, l);b.U(j, (Q - l) / 2);b.R(j, (S - m) / 2);
            }b.tb(j, "absolute");a.l(i.$EVT_LOAD_END, f);
          }
        }b.eb(r);p && p(e);
      }function R(g, b, c, d) {
        if (d == fb && r == f && u) if (!Lc) {
          var a = t(g);F.Ce(a, f, b, e, c, Q / S);b.Hg();ib.$Shift(a - ib.pc() - 1);ib.L(a);A.uc(a, a, 0);
        }
      }function W(b) {
        if (b == fb && r == f) {
          if (!h) {
            var a = g;if (F) if (F.Cb == f) a = F.Ie();else F.Bb();T();h = new Gc(m, f, a, s);h.Wd(q);
          }!h.$IsPlaying() && h.Yc();
        }
      }function D(a, d, k) {
        if (a == f) {
          if (a != d) C[d] && C[d].be();else !k && h && h.Lg();q && q.$Enable();var l = fb = b.cb();e.Pb(b.$CreateCallback(g, W, l));
        } else {
          var j = c.j(f, a),
              i = c.k(f, a),
              p = c.j(i - j, j + o - i),
              m = N + n.$LazyLoading - 1;(!M || p <= m) && e.Pb();
        }
      }function X() {
        if (r == f && h) {
          h.Db();q && q.$Quit();q && q.$Disable();h.Td();
        }
      }function Y() {
        r == f && h && h.Db();
      }function U(b) {
        !V && a.l(i.$EVT_CLICK, f, b);
      }function L() {
        q = v.pInstance;h && h.Wd(q);
      }e.Pb = function (e, c) {
        c = c || w;if (x.length && !G) {
          b.J(c);if (!P) {
            P = d;a.l(i.$EVT_LOAD_START, f);b.$Each(x, function (a) {
              if (!b.$Attribute(a, "src")) {
                a.src = b.$AttributeEx(a, "src2") || "";b.ac(a, a["display-origin"]);
              }
            });
          }b.qe(x, j, b.$CreateCallback(g, K, e, c));
        } else K(e, c);
      };e.hf = function () {
        if (o == 1) {
          e.be();D(f, f);
        } else {
          var a;if (F) a = F.ue(o);if (a) {
            var h = fb = b.cb(),
                c = f + mb,
                d = C[t(c)];return d.Pb(b.$CreateCallback(g, R, c, d, a, h), w);
          } else Ob(mb);
        }
      };e.Nc = function () {
        D(f, f, d);
      };e.be = function () {
        q && q.$Quit();q && q.$Disable();e.Md();h && h.jf();h = g;z();
      };e.Hg = function () {
        b.eb(m);
      };e.Md = function () {
        b.J(m);
      };e.nf = function () {
        q && q.$Enable();
      };function O(a, f, c, h) {
        if (b.$Attribute(a, Gb)) return;if (!B) {
          if (a.tagName == "IMG") {
            x.push(a);if (!b.$Attribute(a, "src")) {
              M = d;a["display-origin"] = b.ac(a);b.eb(a);
            }
          }var e = b.pe(a);if (e) {
            var g = new Image();b.$AttributeEx(g, "src2", e);x.push(g);
          }c && b.H(a, (b.H(a) || 0) + 1);
        }var i = b.$Children(a);b.$Each(i, function (a) {
          var e = a.tagName,
              g = b.$AttributeEx(a, "u");if (g == "player" && !v) {
            v = a;if (v.pInstance) L();else b.$AddEvent(v, "dataavailable", L);
          }if (g == "caption") {
            if (f) {
              b.dg(a, b.$AttributeEx(a, "to"));b.gg(a, b.$AttributeEx(a, "bf"));H && b.$AttributeEx(a, "3d") && b.jg(a, "preserve-3d");
            }
          } else if (!B && !c && !j) {
            if (e == "A") {
              if (b.$AttributeEx(a, "u") == "image") j = b.sg(a, "IMG");else j = b.$FindChild(a, "image", d);if (j) {
                E = a;b.N(E, kb);y = b.$CloneNode(E, d);b.Fc(y, 0);b.$Css(y, "backgroundColor", "#000");
              }
            } else if (e == "IMG" && b.$AttributeEx(a, "u") == "image") j = a;if (j) {
              j.border = 0;b.N(j, kb);
            }
          }O(a, f, c + 1, h);
        });
      }e.Lc = function (c, b) {
        var a = N - b;oc(I, a);
      };e.Cb = f;p.call(e);H = b.$AttributeEx(m, "p");b.ig(m, H);b.hg(m, b.$AttributeEx(m, "po"));var J = b.$FindChild(m, "thumb", d);if (J) {
        e.oe = b.$CloneNode(J);b.eb(J);
      }b.J(m);w = b.$CloneNode(Z);b.H(w, 1e3);b.$AddEvent(m, "click", U);z(d);e.qc = j;e.Nd = y;e.Cd = m;e.ec = I = m;b.$AppendChild(I, w);a.$On(203, D);a.$On(28, Y);a.$On(24, X);
    }function Gc(z, g, p, q) {
      var c = this,
          n = 0,
          v = 0,
          h,
          j,
          f,
          e,
          m,
          t,
          s,
          o = C[g];l.call(c, 0, 0);function w() {
        b.Dc(W);qc && m && o.Nd && b.$AppendChild(W, o.Nd);b.J(W, !m && o.qc);
      }function x() {
        c.Yc();
      }function y(a) {
        s = a;c.Db();c.Yc();
      }c.Yc = function () {
        var b = c.ob();if (!B && !cb && !s && r == g) {
          if (!b) {
            if (h && !m) {
              m = d;c.Td(d);a.l(i.$EVT_SLIDESHOW_START, g, n, v, h, e);
            }w();
          }var k,
              p = i.$EVT_STATE_CHANGE;if (b != e) if (b == f) k = e;else if (b == j) k = f;else if (!b) k = j;else k = c.he();a.l(p, g, b, n, j, f, e);var l = u && (!J || R);if (b == e) (f != e && !(J & 12) || l) && o.hf();else (l || b != f) && c.ie(k, x);
        }
      };c.Lg = function () {
        f == e && f == c.ob() && c.L(j);
      };c.jf = function () {
        F && F.Cb == g && F.Bb();var b = c.ob();b < e && a.l(i.$EVT_STATE_CHANGE, g, -b - 1, n, j, f, e);
      };c.Td = function (a) {
        p && b.Zb(bb, a && p.Xc.$Outside ? "" : "hidden");
      };c.Lc = function (c, b) {
        if (m && b >= h) {
          m = k;w();o.Md();F.Bb();a.l(i.$EVT_SLIDESHOW_END, g, n, v, h, e);
        }a.l(i.$EVT_PROGRESS_CHANGE, g, b, n, j, f, e);
      };c.Wd = function (a) {
        if (a && !t) {
          t = a;a.$On($JssorPlayer$.Re, y);
        }
      };p && c.Pc(p);h = c.yb();c.Pc(q);j = h + q.od;e = c.yb();f = u ? h + q.fd : e;
    }function Ib(a, c, d) {
      b.R(a, c);b.U(a, d);
    }function oc(c, b) {
      var a = y > 0 ? y : ab,
          d = (yb * b + Cb) * (a & 1),
          e = (zb * b + Cb) * (a >> 1 & 1);Ib(c, d, e);
    }function Db(a) {
      if (!(D & 1)) a = c.j(K, c.k(a, H));return a;
    }function Xb(a) {
      return !(D & 1) && (a - H < .0001 || K - a < .0001);
    }function dc() {
      Fb = cb;Vb = A.he();I = x.jb();
    }function sc() {
      dc();if (B || !R && J & 12) {
        A.Db();a.l(i.of);
      }
    }function rc(g) {
      if (!B && (R || !(J & 12)) && !A.$IsPlaying()) {
        var b = x.jb(),
            a = I,
            e = 0;if (g && c.m(T) >= n.$MinDragOffsetToSlide) {
          a = b;e = ub;
        }if (Xb(b)) {
          if (!g || V) a = c.$Round(a);
        } else a = c.I(a);a = Db(a + e);if (!(D & 1)) {
          if (K - a < .5) a = K;if (a - H < .5) a = H;
        }var d = c.m(a - b);if (d < 1 && n.$SlideEasing != f.$Linear) d = 1 - c.q(1 - d, 5);if (!V && Fb) A.Fe(Vb);else if (b == a) {
          Jb.nf();Jb.Nc();
        } else A.uc(b, a, d * wb);
      }
    }function Ub(a) {
      !b.Wb(b.$EvtSrc(a), "nodrag") && b.$CancelEvent(a);
    }function Ec(a) {
      nc(a, 1);
    }function nc(c, j) {
      var f = b.$EvtSrc(c);xb = k;var l = b.Wb(f, "1", Wb);if ((!l || l === v) && !X && (!j || c.touches.length == 1)) {
        xb = b.Wb(f, "nodrag") || !nb || !Fc();var n = b.Wb(f, e, m.Ic);if (n) Yb = b.$Attribute(n, m.Ic);if (j) {
          var p = c.touches[0];Kb = p.clientX;Lb = p.clientY;
        } else {
          var o = b.de(c);Kb = o.x;Lb = o.y;
        }B = d;fb = g;b.$AddEvent(h, j ? "touchmove" : "mousemove", Rb);b.cb();V = 0;sc();if (!Fb) y = 0;T = 0;tb = 0;ub = 0;a.l(i.$EVT_DRAG_START, t(I), I, c);
      }
    }function Rb(g) {
      if (B) {
        var a;if (g.type != "mousemove") {
          if (g.touches.length == 1) {
            var p = g.touches[0];a = { x: p.clientX, y: p.clientY };
          } else jb();
        } else a = b.de(g);if (a) {
          var e = a.x - Kb,
              f = a.y - Lb;if (y || c.m(e) > 1.5 || c.m(f) > 1.5) {
            if (c.P(I) != I) y = y || ab & X;if ((e || f) && !y) {
              if (X == 3) {
                if (c.m(f) > c.m(e)) y = 2;else y = 1;
              } else y = X;if (vb && y == 1 && c.m(f) > c.m(e) * 2.4) xb = d;
            }var n = f,
                i = zb;if (y == 1) {
              n = e;i = yb;
            }if (T - tb < -1.5) ub = 0;else if (T - tb > 1.5) ub = -1;tb = T;T = n;Y = I - T / i / Yb;if (!(D & 1)) {
              var l = 0,
                  j = [-I + E, 0, I - o + P - G / w - E];b.$Each(j, function (b, d) {
                if (b > 0) {
                  var a = c.q(b, 1 / 1.6);a = c.xd(a * c.C / 2);l = (a - b) * (d - 1);
                }
              });var h = l + Y,
                  m = k;j = [-h + E, 0, h - o + P + G / w - E];b.$Each(j, function (a, b) {
                if (a > 0) {
                  a = c.j(a, i);a = c.Af(a) * 2 / c.C;a = c.q(a, 1.6);Y = a * (b - 1) + E;if (b) Y += o - P - G / w;m = d;
                }
              });if (!m) Y = h;
            }if (T && y && !xb) {
              b.$CancelEvent(g);if (!cb) A.eg(Y);else A.fg(Y);
            }
          }
        }
      }
    }function jb() {
      Cc();if (B) {
        V = T;b.cb();b.fb(h, "mousemove", Rb);b.fb(h, "touchmove", Rb);V && u & 8 && (u = 0);A.Db();B = k;var c = x.jb();a.l(i.$EVT_DRAG_END, t(c), c, t(I), I);J & 12 && dc();rc(d);
      }
    }function wc(c) {
      var a = b.$EvtSrc(c),
          d = b.Wb(a, "1", Gb);if (v === d) if (V) {
        b.$StopEvent(c);while (a && v !== a) {
          (a.tagName == "A" || b.$Attribute(a, "data-jssor-button")) && b.$CancelEvent(c);a = a.parentNode;
        }
      } else u & 4 && (u = 0);
    }function Nc(d) {
      if (d != r) {
        var b = ob.ob(),
            a = Db(d),
            e = c.$Round(t(a));if (b - a < .5) a = b;C[r];r = e;Jb = C[r];x.L(a);
      }
    }function Mc(b, c) {
      y = 0;Nc(b);if (u & 2 && (mb > 0 && r == o - 1 || mb < 0 && !r)) u = 0;a.l(i.$EVT_PARK, r, c);
    }function jc(a, d, e) {
      if (!(D & 1)) {
        a = c.k(0, a);a = c.j(a, o - P + E);a = c.$Round(a);
      }a = t(a);b.$Each(gb, function (b) {
        b.Jc(a, d, e);
      });
    }function Fc() {
      var b = i.fe || 0,
          a = nb;i.fe |= a;return X = a & ~b;
    }function Cc() {
      if (X) {
        i.fe &= ~nb;X = 0;
      }
    }function mc() {
      var a = b.$CreateDiv();b.N(a, kb);return a;
    }function t(b, a) {
      a = a || o || 1;return (b % a + a) % a;
    }function Bb(c, a, b) {
      u & 8 && (u = 0);Ab(c, wb, a, b);
    }function Nb() {
      b.$Each(gb, function (a) {
        a.Sc(a.zc.$ChanceToShow <= R);
      });
    }function uc() {
      if (!R) {
        R = 1;Nb();if (!B) {
          J & 12 && rc();J & 3 && C[r] && C[r].Nc();
        }
      }a.l(i.$EVT_MOUSE_LEAVE);
    }function tc() {
      if (R) {
        R = 0;Nb();B || !(J & 12) || sc();
      }a.l(i.$EVT_MOUSE_ENTER);
    }function vc() {
      b.$Each(hb, function (a) {
        b.N(a, kb);b.Zb(a, "hidden");b.eb(a);
      });b.N(Z, kb);
    }function Ob(b, a) {
      Ab(b, a, d);
    }function Ab(l, g, m, p) {
      if (!B && (R || !(J & 12)) || n.$NaviQuitDrag) {
        cb = d;B = k;A.Db();if (g == e) g = wb;var b = t(ob.ob()),
            f = l;if (m) {
          f = b + l;f = c.$Round(f);
        }var a = f;if (!(D & 1)) {
          if (p) a = t(a);else if (D & 2 && (a < 0 && c.m(b - H) < .0001 || a > o - P && c.m(b - K) < .0001)) a = a < 0 ? K : H;a = Db(a);if (K - a < .5) a = K;if (a - H < .5) a = H;
        }var j = (a - b) % o;a = b + j;var h = b == a ? 0 : g * c.m(j),
            i = 1;if (N > 1) i = (ab & 1 ? sb : rb) / w;h = c.j(h, g * i * 1.5);A.uc(b, a, h || 1);
      }
    }a.$SlidesCount = function () {
      return hb.length;
    };a.$CurrentIndex = function () {
      return r;
    };a.$AutoPlay = function (a) {
      if (a == e) return u;if (a != u) {
        u = a;u && C[r] && C[r].Nc();
      }
    };a.$IsDragging = function () {
      return B;
    };a.$IsSliding = function () {
      return cb;
    };a.$IsMouseOver = function () {
      return !R;
    };a.we = function () {
      return V;
    };a.$OriginalWidth = function () {
      return O;
    };a.$OriginalHeight = function () {
      return M;
    };a.$ScaleHeight = function (b) {
      if (b == e) return lc || M;a.$ScaleSize(b / M * O, b);
    };a.$ScaleWidth = function (b) {
      if (b == e) return Qb || O;a.$ScaleSize(b, b / O * M);
    };a.$ScaleSize = function (c, a, d) {
      b.$CssWidth(v, c);b.$CssHeight(v, a);pc = c / O;kc = a / M;b.$Each(bc, function (a) {
        a.$ScaleSize(pc, kc, d);
      });if (!Qb) {
        b.Nb(bb, z);b.U(bb, 0);b.R(bb, 0);
      }Qb = c;lc = a;
    };a.Le = function (a) {
      return c.m(a - H) < .0001;
    };a.xe = function (a) {
      return c.m(a - K) < .0001;
    };a.$PlayTo = Ab;a.$GoTo = function (a) {
      A.uc(a, a, 0);
    };a.$Next = function () {
      Ob(1);
    };a.$Prev = function () {
      Ob(-1);
    };a.$Pause = function () {
      u = 0;
    };a.$Play = function () {
      a.$AutoPlay(u || 1);
    };a.$SetSlideshowTransitions = function (a) {
      n.$SlideshowOptions.$Transitions = a;
    };a.$SetCaptionTransitions = function (a) {
      eb.$Transitions = a;eb.Hc = b.cb();
    };a.Ud = function (a) {
      a = t(a);if (D & 1) {
        var d = L / w,
            b = t(ob.ob()),
            e = t(a - b + d),
            f = t(c.m(a - b));if (e >= N) {
          if (f > o / 2) if (a > b) a -= o;else a += o;
        } else if (a > b && e < d) a -= o;else if (a < b && e > d) a += o;
      }return a;
    };a.jc = function (I, m) {
      a.$Elmt = v = b.$GetElement(I);O = b.$CssWidth(v);M = b.$CssHeight(v);n = b.B({ $FillMode: 0, $LazyLoading: 1, $ArrowKeyNavigation: 1, $StartIndex: 0, $AutoPlay: 0, $Loop: 1, $HWA: d, $NaviQuitDrag: d, $AutoPlaySteps: 1, $AutoPlayInterval: 3e3, $PauseOnHover: 1, $SlideDuration: 500, $SlideEasing: f.$OutQuad, $MinDragOffsetToSlide: 20, $SlideSpacing: 0, $UISearchMode: 1, $PlayOrientation: 1, $DragOrientation: 1 }, m);n.$HWA = n.$HWA && b.yg();if (n.$Idle != e) n.$AutoPlayInterval = n.$Idle;if (n.$DisplayPieces != e) n.$Cols = n.$DisplayPieces;if (n.$ParkingPosition != e) n.$Align = n.$ParkingPosition;ab = n.$PlayOrientation & 3;lb = n.$SlideshowOptions;eb = b.B({ $Class: s }, n.$CaptionSliderOptions);qb = n.$BulletNavigatorOptions;db = n.$ArrowNavigatorOptions;U = n.$ThumbnailNavigatorOptions;!n.$UISearchMode;var p = b.$Children(v);b.$Each(p, function (a, d) {
        var c = b.$AttributeEx(a, "u");if (c == "loading") Z = a;else {
          if (c == "slides") z = a;if (c == "navigator") Eb = a;if (c == "arrowleft") Sb = a;if (c == "arrowright") Pb = a;if (c == "thumbnavigator") pb = a;if (a.tagName != "STYLE" && a.tagName != "SCRIPT") bc[c || d] = new xc(a, c == "slides", b.dd(["slides", "thumbnavigator"])[c]);
        }
      });Z = Z || b.$CreateDiv(h);sb = b.$CssWidth(z);rb = b.$CssHeight(z);S = n.$SlideWidth || sb;Q = n.$SlideHeight || rb;kb = { D: S, E: Q, $Top: 0, $Left: 0, bc: "block", sb: "absolute" };G = n.$SlideSpacing;yb = S + G;zb = Q + G;w = ab & 1 ? yb : zb;var i = ab & 1 ? sb : rb;mb = n.$AutoPlaySteps;J = n.$PauseOnHover;ec = n.$AutoPlayInterval;wb = n.$SlideDuration;Mb = new Bc();if (n.$HWA && (!b.$IsBrowserFireFox() || vb)) Ib = function Ib(a, c, d) {
        b.ic(a, { $TranslateX: c, $TranslateY: d });
      };u = n.$AutoPlay & 63;a.zc = m;b.$Attribute(v, Gb, "1");b.H(z, b.H(z) || 0);b.tb(z, "absolute");bb = b.$CloneNode(z, d);b.Nb(bb, z);ib = new Ic();b.$AppendChild(bb, ib.ec);b.Zb(z, "hidden");J &= vb ? 10 : 5;var r = b.$Children(z),
          B = b.dd(["DIV", "A", "LI"]);b.$Each(r, function (a) {
        B[a.tagName.toUpperCase()] && !b.$AttributeEx(a, "u") && hb.push(a);b.H(a, (b.H(a) || 0) + 1);
      });W = mc();b.$Css(W, "backgroundColor", "#000");b.Fc(W, 0);b.H(W, 0);b.Nb(W, z.firstChild, z);o = hb.length;if (o) {
        vc();L = n.$Align;if (L == e) L = (i - w + G) / 2;P = i / w;N = c.j(o, n.$Cols || o, c.I(P));hc = N < o;D = hc ? n.$Loop : 0;if (o * w - G <= i) {
          P = o - G / w;L = (i - w + G) / 2;Cb = (i - w * o + G) / 2;
        }if (lb) {
          qc = lb.$ShowLink;Hb = lb.$Class;fc = !L && N == 1 && o > 1 && Hb && (!b.$IsBrowserIE() || b.$BrowserVersion() >= 9);
        }if (!(D & 1)) {
          E = L / w;if (E > o - 1) {
            E = o - 1;L = E * w;
          }H = E;K = H + o - P - G / w;
        }nb = (N > 1 || L ? ab : -1) & n.$DragOrientation;Tb.Zd && b.$Css(z, Tb.Zd, [g, "pan-y", "pan-x", "none"][nb] || "");if (fc) F = new Hb(Mb, S, Q, lb, vb, Ib);for (var k = 0; k < hb.length; k++) {
          var x = hb[k],
              y = new Hc(x, k);C.push(y);
        }b.eb(Z);ob = new Jc();A = new Ac(ob, ib);b.$AddEvent(v, "click", wc, d);b.$AddEvent(v, "mouseleave", uc);b.$AddEvent(v, "mouseenter", tc);b.$AddEvent(v, "mousedown", nc);b.$AddEvent(v, "touchstart", Ec);b.$AddEvent(v, "dragstart", Ub);b.$AddEvent(v, "selectstart", Ub);b.$AddEvent(j, "mouseup", jb);b.$AddEvent(h, "mouseup", jb);b.$AddEvent(h, "touchend", jb);b.$AddEvent(h, "touchcancel", jb);b.$AddEvent(j, "blur", jb);if (Eb && qb) {
          gc = new qb.$Class(Eb, qb, O, M);gb.push(gc);
        }if (db && Sb && Pb) {
          db.$Loop = D;ic = new db.$Class(Sb, Pb, db, O, M, a);gb.push(ic);
        }if (pb && U) {
          U.$StartIndex = n.$StartIndex;U.$ArrowKeyNavigation = U.$ArrowKeyNavigation || 0;cc = new U.$Class(pb, U);!U.$NoDrag && b.$Attribute(pb, Wb, "1");gb.push(cc);
        }b.$Each(gb, function (a) {
          a.Tc(o, C, Z);a.$On(q.tc, Bb);
        });b.$Css(v, "visibility", "visible");a.$ScaleSize(O, M);Nb();n.$ArrowKeyNavigation && b.$AddEvent(h, "keydown", function (a) {
          if (a.keyCode == 37) Bb(-n.$ArrowKeyNavigation, d);else a.keyCode == 39 && Bb(n.$ArrowKeyNavigation, d);
        });var l = n.$StartIndex;l = t(l);Ab(l, 0);
      }
    };b.jc(a);
  };i.$EVT_CLICK = 21;i.$EVT_DRAG_START = 22;i.$EVT_DRAG_END = 23;i.$EVT_SWIPE_START = 24;i.$EVT_SWIPE_END = 25;i.$EVT_LOAD_START = 26;i.$EVT_LOAD_END = 27;i.of = 28;i.$EVT_MOUSE_ENTER = 31;i.$EVT_MOUSE_LEAVE = 32;i.$EVT_POSITION_CHANGE = 202;i.$EVT_PARK = 203;i.$EVT_SLIDESHOW_START = 206;i.$EVT_SLIDESHOW_END = 207;i.$EVT_PROGRESS_CHANGE = 208;i.$EVT_STATE_CHANGE = 209;
}(window, document, Math, null, true, false);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {

    'use strict';

    var getUseLeft = function getUseLeft() {
        var useLeft = false;
        var isChrome = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (isChrome && parseInt(isChrome[2], 10) < 54) {
            useLeft = true;
        }

        return useLeft;
    };

    var defaults = {
        scale: 1,
        zoom: true,
        actualSize: true,
        enableZoomAfter: 300,
        useLeftForZoom: getUseLeft()
    };

    var Zoom = function Zoom(element) {

        this.core = $(element).data('lightGallery');

        this.core.s = $.extend({}, defaults, this.core.s);

        if (this.core.s.zoom && this.core.doCss()) {
            this.init();

            // Store the zoomable timeout value just to clear it while closing
            this.zoomabletimeout = false;

            // Set the initial value center
            this.pageX = $(window).width() / 2;
            this.pageY = $(window).height() / 2 + $(window).scrollTop();
        }

        return this;
    };

    Zoom.prototype.init = function () {

        var _this = this;
        var zoomIcons = '<span id="lg-zoom-in" onclick="pmwoodwindsZoomCount();" class="lg-icon"></span><span onclick="pmwoodwindsZoomCountMin();" id="lg-zoom-out" class="lg-icon"></span>';

        if (_this.core.s.actualSize) {
            // zoomIcons += '<span id="lg-actual-size" class="lg-icon"></span>';
        }

        if (_this.core.s.useLeftForZoom) {
            _this.core.$outer.addClass('lg-use-left-for-zoom');
        } else {
            _this.core.$outer.addClass('lg-use-transition-for-zoom');
        }

        this.core.$outer.find('.lg-toolbar').append(zoomIcons);

        // Add zoomable class
        _this.core.$el.on('onSlideItemLoad.lg.tm.zoom', function (event, index, delay) {

            // delay will be 0 except first time
            var _speed = _this.core.s.enableZoomAfter + delay;

            // set _speed value 0 if gallery opened from direct url and if it is first slide
            if ($('body').hasClass('lg-from-hash') && delay) {

                // will execute only once
                _speed = 0;
            } else {

                // Remove lg-from-hash to enable starting animation.
                $('body').removeClass('lg-from-hash');
            }

            _this.zoomabletimeout = setTimeout(function () {
                _this.core.$slide.eq(index).addClass('lg-zoomable');
            }, _speed + 30);
        });

        var scale = 1;
        /**
         * @desc Image zoom
         * Translate the wrap and scale the image to get better user experience
         *
         * @param {String} scaleVal - Zoom decrement/increment value
         */
        var zoom = function zoom(scaleVal) {

            var $image = _this.core.$outer.find('.lg-current .lg-image');
            var _x;
            var _y;

            // Find offset manually to avoid issue after zoom
            var offsetX = ($(window).width() - $image.prop('offsetWidth')) / 2;
            var offsetY = ($(window).height() - $image.prop('offsetHeight')) / 2 + $(window).scrollTop();

            _x = _this.pageX - offsetX;
            _y = _this.pageY - offsetY;

            var x = (scaleVal - 1) * _x;
            var y = (scaleVal - 1) * _y;

            $image.css('transform', 'scale3d(' + scaleVal + ', ' + scaleVal + ', 1)').attr('data-scale', scaleVal);

            if (_this.core.s.useLeftForZoom) {
                $image.parent().css({
                    left: -x + 'px',
                    top: -y + 'px'
                }).attr('data-x', x).attr('data-y', y);
            } else {
                $image.parent().css('transform', 'translate3d(-' + x + 'px, -' + y + 'px, 0)').attr('data-x', x).attr('data-y', y);
            }
        };

        var callScale = function callScale() {
            if (scale > 1) {
                _this.core.$outer.addClass('lg-zoomed');
            } else {
                _this.resetZoom();
            }

            if (scale < 1) {
                scale = 1;
            }

            zoom(scale);
        };

        var actualSize = function actualSize(event, $image, index, fromIcon) {
            var w = $image.prop('offsetWidth');
            var nw;
            if (_this.core.s.dynamic) {
                nw = _this.core.s.dynamicEl[index].width || $image[0].naturalWidth || w;
            } else {
                nw = _this.core.$items.eq(index).attr('data-width') || $image[0].naturalWidth || w;
            }

            var _scale;

            if (_this.core.$outer.hasClass('lg-zoomed')) {
                scale = 1;
            } else {
                if (nw > w) {
                    _scale = nw / w;
                    scale = _scale || 2;
                }
            }

            if (fromIcon) {
                _this.pageX = $(window).width() / 2;
                _this.pageY = $(window).height() / 2 + $(window).scrollTop();
            } else {
                _this.pageX = event.pageX || event.originalEvent.targetTouches[0].pageX;
                _this.pageY = event.pageY || event.originalEvent.targetTouches[0].pageY;
            }

            callScale();
            setTimeout(function () {
                _this.core.$outer.removeClass('lg-grabbing').addClass('lg-grab');
            }, 10);
        };

        var tapped = false;

        // event triggered after appending slide content
        _this.core.$el.on('onAferAppendSlide.lg.tm.zoom', function (event, index) {

            // Get the current element
            var $image = _this.core.$slide.eq(index).find('.lg-image');

            $image.on('dblclick', function (event) {
                actualSize(event, $image, index);
            });

            $image.on('touchstart', function (event) {
                if (!tapped) {
                    tapped = setTimeout(function () {
                        tapped = null;
                    }, 300);
                } else {
                    clearTimeout(tapped);
                    tapped = null;
                    actualSize(event, $image, index);
                }

                event.preventDefault();
            });
        });

        // Update zoom on resize and orientationchange
        $(window).on('resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom', function () {
            _this.pageX = $(window).width() / 2;
            _this.pageY = $(window).height() / 2 + $(window).scrollTop();
            zoom(scale);
        });

        $('#lg-zoom-out').on('click.lg', function () {
            if (_this.core.$outer.find('.lg-current .lg-image').length) {
                scale -= _this.core.s.scale;
                callScale();
            }
        });

        $('#lg-zoom-in').on('click.lg', function () {
            if (_this.core.$outer.find('.lg-current .lg-image').length) {
                scale += _this.core.s.scale;
                callScale();
            }
        });

        $('#lg-actual-size').on('click.lg', function (event) {
            actualSize(event, _this.core.$slide.eq(_this.core.index).find('.lg-image'), _this.core.index, true);
        });

        // Reset zoom on slide change
        _this.core.$el.on('onBeforeSlide.lg.tm', function () {
            scale = 1;
            _this.resetZoom();
        });

        // Drag option after zoom
        if (!_this.core.isTouch) {
            _this.zoomDrag();
        }

        if (_this.core.isTouch) {
            _this.zoomSwipe();
        }
    };

    // Reset zoom effect
    Zoom.prototype.resetZoom = function () {
        this.core.$outer.removeClass('lg-zoomed');
        this.core.$slide.find('.lg-img-wrap').removeAttr('style data-x data-y');
        this.core.$slide.find('.lg-image').removeAttr('style data-scale');

        // Reset pagx pagy values to center
        this.pageX = $(window).width() / 2;
        this.pageY = $(window).height() / 2 + $(window).scrollTop();
    };

    Zoom.prototype.zoomSwipe = function () {
        var _this = this;
        var startCoords = {};
        var endCoords = {};
        var isMoved = false;

        // Allow x direction drag
        var allowX = false;

        // Allow Y direction drag
        var allowY = false;

        _this.core.$slide.on('touchstart.lg', function (e) {

            if (_this.core.$outer.hasClass('lg-zoomed')) {
                var $image = _this.core.$slide.eq(_this.core.index).find('.lg-object');

                allowY = $image.prop('offsetHeight') * $image.attr('data-scale') > _this.core.$outer.find('.lg').height();
                allowX = $image.prop('offsetWidth') * $image.attr('data-scale') > _this.core.$outer.find('.lg').width();
                if (allowX || allowY) {
                    e.preventDefault();
                    startCoords = {
                        x: e.originalEvent.targetTouches[0].pageX,
                        y: e.originalEvent.targetTouches[0].pageY
                    };
                }
            }
        });

        _this.core.$slide.on('touchmove.lg', function (e) {

            if (_this.core.$outer.hasClass('lg-zoomed')) {

                var _$el = _this.core.$slide.eq(_this.core.index).find('.lg-img-wrap');
                var distanceX;
                var distanceY;

                e.preventDefault();
                isMoved = true;

                endCoords = {
                    x: e.originalEvent.targetTouches[0].pageX,
                    y: e.originalEvent.targetTouches[0].pageY
                };

                // reset opacity and transition duration
                _this.core.$outer.addClass('lg-zoom-dragging');

                if (allowY) {
                    distanceY = -Math.abs(_$el.attr('data-y')) + (endCoords.y - startCoords.y);
                } else {
                    distanceY = -Math.abs(_$el.attr('data-y'));
                }

                if (allowX) {
                    distanceX = -Math.abs(_$el.attr('data-x')) + (endCoords.x - startCoords.x);
                } else {
                    distanceX = -Math.abs(_$el.attr('data-x'));
                }

                if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {

                    if (_this.core.s.useLeftForZoom) {
                        _$el.css({
                            left: distanceX + 'px',
                            top: distanceY + 'px'
                        });
                    } else {
                        _$el.css('transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                    }
                }
            }
        });

        _this.core.$slide.on('touchend.lg', function () {
            if (_this.core.$outer.hasClass('lg-zoomed')) {
                if (isMoved) {
                    isMoved = false;
                    _this.core.$outer.removeClass('lg-zoom-dragging');
                    _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                }
            }
        });
    };

    Zoom.prototype.zoomDrag = function () {

        var _this = this;
        var startCoords = {};
        var endCoords = {};
        var isDraging = false;
        var isMoved = false;

        // Allow x direction drag
        var allowX = false;

        // Allow Y direction drag
        var allowY = false;

        _this.core.$slide.on('mousedown.lg.zoom', function (e) {

            // execute only on .lg-object
            var $image = _this.core.$slide.eq(_this.core.index).find('.lg-object');

            allowY = $image.prop('offsetHeight') * $image.attr('data-scale') > _this.core.$outer.find('.lg').height();
            allowX = $image.prop('offsetWidth') * $image.attr('data-scale') > _this.core.$outer.find('.lg').width();

            if (_this.core.$outer.hasClass('lg-zoomed')) {
                if ($(e.target).hasClass('lg-object') && (allowX || allowY)) {
                    e.preventDefault();
                    startCoords = {
                        x: e.pageX,
                        y: e.pageY
                    };

                    isDraging = true;

                    // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                    _this.core.$outer.scrollLeft += 1;
                    _this.core.$outer.scrollLeft -= 1;

                    _this.core.$outer.removeClass('lg-grab').addClass('lg-grabbing');
                }
            }
        });

        $(window).on('mousemove.lg.zoom', function (e) {
            if (isDraging) {
                var _$el = _this.core.$slide.eq(_this.core.index).find('.lg-img-wrap');
                var distanceX;
                var distanceY;

                isMoved = true;
                endCoords = {
                    x: e.pageX,
                    y: e.pageY
                };

                // reset opacity and transition duration
                _this.core.$outer.addClass('lg-zoom-dragging');

                if (allowY) {
                    distanceY = -Math.abs(_$el.attr('data-y')) + (endCoords.y - startCoords.y);
                } else {
                    distanceY = -Math.abs(_$el.attr('data-y'));
                }

                if (allowX) {
                    distanceX = -Math.abs(_$el.attr('data-x')) + (endCoords.x - startCoords.x);
                } else {
                    distanceX = -Math.abs(_$el.attr('data-x'));
                }

                if (_this.core.s.useLeftForZoom) {
                    _$el.css({
                        left: distanceX + 'px',
                        top: distanceY + 'px'
                    });
                } else {
                    _$el.css('transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                }
            }
        });

        $(window).on('mouseup.lg.zoom', function (e) {

            if (isDraging) {
                isDraging = false;
                _this.core.$outer.removeClass('lg-zoom-dragging');

                // Fix for chrome mouse move on click
                if (isMoved && (startCoords.x !== endCoords.x || startCoords.y !== endCoords.y)) {
                    endCoords = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                }

                isMoved = false;
            }

            _this.core.$outer.removeClass('lg-grabbing').addClass('lg-grab');
        });
    };

    Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY) {

        var _this = this;
        var _$el = _this.core.$slide.eq(_this.core.index).find('.lg-img-wrap');
        var $image = _this.core.$slide.eq(_this.core.index).find('.lg-object');
        var distanceX = -Math.abs(_$el.attr('data-x')) + (endCoords.x - startCoords.x);
        var distanceY = -Math.abs(_$el.attr('data-y')) + (endCoords.y - startCoords.y);
        var minY = (_this.core.$outer.find('.lg').height() - $image.prop('offsetHeight')) / 2;
        var maxY = Math.abs($image.prop('offsetHeight') * Math.abs($image.attr('data-scale')) - _this.core.$outer.find('.lg').height() + minY);
        var minX = (_this.core.$outer.find('.lg').width() - $image.prop('offsetWidth')) / 2;
        var maxX = Math.abs($image.prop('offsetWidth') * Math.abs($image.attr('data-scale')) - _this.core.$outer.find('.lg').width() + minX);

        if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
            if (allowY) {
                if (distanceY <= -maxY) {
                    distanceY = -maxY;
                } else if (distanceY >= -minY) {
                    distanceY = -minY;
                }
            }

            if (allowX) {
                if (distanceX <= -maxX) {
                    distanceX = -maxX;
                } else if (distanceX >= -minX) {
                    distanceX = -minX;
                }
            }

            if (allowY) {
                _$el.attr('data-y', Math.abs(distanceY));
            } else {
                distanceY = -Math.abs(_$el.attr('data-y'));
            }

            if (allowX) {
                _$el.attr('data-x', Math.abs(distanceX));
            } else {
                distanceX = -Math.abs(_$el.attr('data-x'));
            }

            if (_this.core.s.useLeftForZoom) {
                _$el.css({
                    left: distanceX + 'px',
                    top: distanceY + 'px'
                });
            } else {
                _$el.css('transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
            }
        }
    };

    Zoom.prototype.destroy = function () {

        var _this = this;

        // Unbind all events added by lightGallery zoom plugin
        _this.core.$el.off('.lg.zoom');
        $(window).off('.lg.zoom');
        _this.core.$slide.off('.lg.zoom');
        _this.core.$el.off('.lg.tm.zoom');
        _this.resetZoom();
        clearTimeout(_this.zoomabletimeout);
        _this.zoomabletimeout = false;
    };

    $.fn.lightGallery.modules.zoom = Zoom;
})(jQuery);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.pmwoodwindsCloseSearch = function () {
	jQuery('#search').slideUp(200);
};
window.pmwoodwindsOpenSearch = function () {
	jQuery('#search').slideDown(400);
};
jQuery(document).ready(function ($) {
	var _$$not$slick;

	$('form.dgwt-wcas-search-form').submit(function (event) {
		event.preventDefault();
	});
	$('#pmwoodwind_product_images').not('.slick-initialized').slick((_$$not$slick = {
		infinite: true,
		speed: 300,
		autoplay: true,
		autoplaySpeed: 5000
	}, _defineProperty(_$$not$slick, 'speed', 1000), _defineProperty(_$$not$slick, 'slidesToShow', 5), _defineProperty(_$$not$slick, 'centerMode', true), _defineProperty(_$$not$slick, 'centerPadding', '3px'), _$$not$slick));
	var mainslides = $(".tp-revslider-mainul li").length;

	switchslides(0, mainslides);
	function switchslides(p, mainslides) {

		p++;
		if (p == mainslides) {
			p = 0;
		}
		setTimeout(function () {
			$(".tp-revslider-mainul li").removeClass('active');
			$(".tp-revslider-mainul li.slide" + p).addClass('active');
			switchslides(p, mainslides);
		}, 7000);
	}
	$('img.zoom').wrap('<span style="display:inline-block;top: 5px;"></span>').css('display', 'block').parent().zoom();
	//open/close lateral filter
	$('.cd-filter-trigger').on('click', function () {
		triggerFilter(true);
	});
	$('.cd-filter .cd-close').on('click', function () {
		triggerFilter(false);
	});

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
		elementsToTrigger.each(function () {
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
	    filter_tab_placeholder_default_value = 'Select',
	    filter_tab_placeholder_text = filter_tab_placeholder.text();

	$('.cd-tab-filter li').on('click', function (event) {
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');

		//check if user has clicked the placeholder item
		if ($(event.target).is(filter_tab_placeholder)) {
			filter_tab_placeholder_default_value == filter_tab_placeholder.text() ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value);
			$('.cd-tab-filter').toggleClass('is-open');

			//check if user has clicked a filter already selected 
		} else if (filter_tab_placeholder.data('type') == selected_filter) {
			filter_tab_placeholder.text($(event.target).text());
			$('.cd-tab-filter').removeClass('is-open');
		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();

			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});

	//close filter dropdown inside lateral .cd-filter 
	$('.cd-filter-block h4').on('click touch', function (event) {
		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	});

	var inputText;
	var $matching = $();

	var delay = function () {
		var timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	}();
	var filters = [];
	var catfilters = [];
	var brandsfilters = [];
	var combinations = [];
	var f = 0;

	$(".cd-filters.list li input.filter").on('click', function () {
		$(".cd-filter form").addClass("active");
		var $combatching = $();

		if ($(this).parent().parent().hasClass('levels')) {
			//var filterstohide = ["categories", "brands"];
			var filterstohide = [];
		}
		if ($(this).parent().parent().hasClass('categories')) {
			var filterstohide = ["levels", "brands"];
			catfilters.push($(this).attr('id').toLowerCase());

			if ($(this).prop('checked')) {
				catfilters.push($(this).attr('id').toLowerCase());
			} else {

				var index = catfilters.indexOf($(this).attr('id').toLowerCase());
				if (index > -1) {
					catfilters.splice(index, 1);
				}
			}
		}
		if ($(this).parent().parent().parent().parent().hasClass('categories')) {
			var filterstohide = ["levels", "brands"];

			if ($(this).prop('checked')) {
				catfilters.push($(this).attr('id').toLowerCase());
			} else {

				var index = catfilters.indexOf($(this).attr('id').toLowerCase());
				if (index > -1) {
					catfilters.splice(index, 1);
				}
			}
		}
		if ($(this).parent().parent().hasClass('brands')) {
			//var filterstohide = ["levels", "categories"];
			var filterstohide = [];

			if ($(this).prop('checked')) {
				brandsfilters.push($(this).attr('id').toLowerCase());
			} else {

				var index = brandsfilters.indexOf($(this).attr('id').toLowerCase());
				if (index > -1) {
					brandsfilters.splice(index, 1);
				}
			}
		}

		if (catfilters.length > 0 && brandsfilters.length > 0) {
			combinations = pmwoodwindsAllPossibleCases([catfilters, brandsfilters]);
			filters = [];
		}
		if (catfilters.length > 0 && brandsfilters.length === 0) {
			filters = catfilters;
		}
		if (catfilters.length === 0 && brandsfilters.length > 0) {
			filters = brandsfilters;
		}

		console.log(filters);
		console.log(combinations);
		//here

		if (filters.length > 0 || combinations.length > 0) {

			if (filters.length > 0) {
				$('.mix').each(function () {

					var match = $(this).attr('class').split(' ');

					var matchexists = $(match).filter(filters);

					if (matchexists.length > 0) {
						$matching = $matching.add(this);
					} else {
						$matching = $matching.not(this);
					}
				});
				$('.cd-gallery ul').mixItUp('filter', $matching);
				setTimeout(function () {
					$(".cd-filter form").removeClass("active");
				}, 300);
			}
			if (combinations.length > 0) {

				$(combinations).each(function (i, comb) {
					$('.mix').each(function () {
						var match = $(this).attr('class');
						var m = match.indexOf(comb);
						console.log(comb);
						console.log(match);
						if (m >= 0) {
							$combatching = $combatching.add(this);
						}
					});
				});
				$('.cd-gallery ul').mixItUp('filter', $combatching);
				setTimeout(function () {
					$(".cd-filter form").removeClass("active");
				}, 300);
			}

			var matchingIds = [];
			$('.cd-gallery ul').on('mixEnd', function () {
				setTimeout(function () {
					$("ul.productsfilter li:visible").each(function () {
						if ($(this).attr('id')) {
							matchingIds.push($(this).attr('id'));
						}
					});
					$(filterstohide).each(function (i, filtertohide) {
						$('.cd-filter-block.' + filtertohide).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
						$('.cd-filters.' + filtertohide + ' li').each(function () {
							var ids = $(this).attr('class').split(' ');
							var exists = $(matchingIds).filter(ids);
							if (exists.length > 0) {
								$(this).show();
							} else {
								$(this).hide();
							}
						});
					});
				}, 300);
			});
		} else {

			$('.cd-gallery ul').mixItUp('filter', 'all');
			$(filterstohide).each(function (i, filtertohide) {
				$('.cd-filters.' + filtertohide + ' li').show();
			});
			$(".cd-filter form").removeClass("active");
			$('.cd-gallery li').show();
		}
	});

	$(".cd-filter-content input[type='search']").keyup(function () {
		// Delay function invoked to make sure user stopped typing
		delay(function () {
			inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
			// Check to see if input field is empty
			if (inputText.length > 0) {
				$('.mix').each(function () {
					var $this = $(this);

					// add item to be filtered out if input text matches items inside the title   
					if ($this.attr('class').toLowerCase().match(inputText)) {
						$matching = $matching.add(this);
					} else {
						// removes any previously matched item
						$matching = $matching.not(this);
					}
				});
				$('.cd-gallery ul').mixItUp('filter', $matching);
			} else {
				// resets the filter to show all item if input is empty
				$('.cd-gallery ul').mixItUp('filter', 'all');
			}
		}, 200);
	});
});
window.pmwoodwindsAllPossibleCases = function (arr) {
	if (arr.length == 1) {
		return arr[0];
	} else {
		var result = [];
		var allCasesOfRest = pmwoodwindsAllPossibleCases(arr.slice(1)); // recur with the rest of array
		for (var i = 0; i < allCasesOfRest.length; i++) {
			for (var j = 0; j < arr[0].length; j++) {
				result.push(arr[0][j] + ' ' + allCasesOfRest[i]);
			}
		}
		return result;
	}
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function (e) {
    "use strict";
     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e("undefined" != typeof jQuery ? jQuery : window.Zepto);
}(function (e) {
    "use strict";
    function t(t) {
        var r = t.data;t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r));
    }function r(t) {
        var r = t.target,
            a = e(r);if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");if (0 === n.length) return;r = n[0];
        }var i = this;if (i.clk = r, "image" == r.type) if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;else if ("function" == typeof e.fn.offset) {
            var o = a.offset();i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top;
        } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;setTimeout(function () {
            i.clk = i.clk_x = i.clk_y = null;
        }, 100);
    }function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t);
        }
    }var n = {};n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;var i = !!e.fn.prop;e.fn.attr2 = function () {
        if (!i) return this.attr.apply(this, arguments);var e = this.prop.apply(this, arguments);return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments);
    }, e.fn.ajaxSubmit = function (t) {
        function r(r) {
            var a,
                n,
                i = e.param(r, t.traditional).split("&"),
                o = i.length,
                s = [];for (a = 0; o > a; a++) {
                i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
            }return s;
        }function o(a) {
            for (var n = new FormData(), i = 0; i < a.length; i++) {
                n.append(a[i].name, a[i].value);
            }if (t.extraData) {
                var o = r(t.extraData);for (i = 0; i < o.length; i++) {
                    o[i] && n.append(o[i][0], o[i][1]);
                }
            }t.data = null;var s = e.extend(!0, {}, e.ajaxSettings, t, { contentType: !1, processData: !1, cache: !1, type: u || "POST" });t.uploadProgress && (s.xhr = function () {
                var r = e.ajaxSettings.xhr();return r.upload && r.upload.addEventListener("progress", function (e) {
                    var r = 0,
                        a = e.loaded || e.position,
                        n = e.total;e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r);
                }, !1), r;
            }), s.data = null;var c = s.beforeSend;return s.beforeSend = function (e, r) {
                r.data = t.formData ? t.formData : n, c && c.call(this, e, r);
            }, e.ajax(s);
        }function s(r) {
            function n(e) {
                var t = null;try {
                    e.contentWindow && (t = e.contentWindow.document);
                } catch (r) {
                    a("cannot get iframe.contentWindow document: " + r);
                }if (t) return t;try {
                    t = e.contentDocument ? e.contentDocument : e.document;
                } catch (r) {
                    a("cannot get iframe.contentDocument: " + r), t = e.document;
                }return t;
            }function o() {
                function t() {
                    try {
                        var e = n(g).readyState;a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50);
                    } catch (r) {
                        a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0;
                    }
                }var r = f.attr2("target"),
                    i = f.attr2("action"),
                    o = "multipart/form-data",
                    c = f.attr("enctype") || f.attr("encoding") || o;w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" }), m.timeout && (j = setTimeout(function () {
                    T = !0, s(D);
                }, m.timeout));var l = [];try {
                    if (m.extraData) for (var d in m.extraData) {
                        m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0]);
                    }m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);try {
                        w.submit();
                    } catch (h) {
                        var x = document.createElement("form").submit;x.apply(w);
                    }
                } finally {
                    w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove();
                }
            }function s(t) {
                if (!x.aborted && !F) {
                    if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), void S.reject(x, "timeout");if (t == k && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");if (M && M.location.href != m.iframeSrc || T) {
                        g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);var r,
                            i = "success";try {
                            if (T) throw "timeout";var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);var u = M.body ? M.body : M.documentElement;x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function (e) {
                                var t = { "content-type": m.dataType };return t[e.toLowerCase()];
                            }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);var c = (m.dataType || "").toLowerCase(),
                                l = /(json|script|text)/.test(c);if (l || m.textarea) {
                                var f = M.getElementsByTagName("textarea")[0];if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;else if (l) {
                                    var p = M.getElementsByTagName("pre")[0],
                                        h = M.getElementsByTagName("body")[0];p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText);
                                }
                            } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));try {
                                E = _(x, c, m);
                            } catch (y) {
                                i = "parsererror", x.error = r = y || i;
                            }
                        } catch (y) {
                            a("error caught: ", y), i = "error", x.error = r = y || i;
                        }x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && ! --e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function () {
                            m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null;
                        }, 100);
                    }
                }
            }var c,
                l,
                m,
                d,
                p,
                v,
                g,
                x,
                y,
                b,
                T,
                j,
                w = f[0],
                S = e.Deferred();if (S.abort = function (e) {
                x.abort(e);
            }, r) for (l = 0; l < h.length; l++) {
                c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
            }if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + new Date().getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({ position: "absolute", top: "-1000px", left: "-1000px" })), g = v[0], x = { aborted: 0, responseText: null, responseXML: null, status: 0, statusText: "n/a", getAllResponseHeaders: function getAllResponseHeaders() {}, getResponseHeader: function getResponseHeader() {}, setRequestHeader: function setRequestHeader() {}, abort: function abort(t) {
                    var r = "timeout" === t ? "timeout" : "aborted";a("aborting upload... " + r), this.aborted = 1;try {
                        g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop");
                    } catch (n) {}v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r);
                } }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;if (x.aborted) return S.reject(), S;y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));var D = 1,
                k = 2,
                A = e("meta[name=csrf-token]").attr("content"),
                L = e("meta[name=csrf-param]").attr("content");L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);var E,
                M,
                F,
                O = 50,
                X = e.parseXML || function (e, t) {
                return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null;
            },
                C = e.parseJSON || function (e) {
                return window.eval("(" + e + ")");
            },
                _ = function _(t, r, a) {
                var n = t.getResponseHeader("content-type") || "",
                    i = "xml" === r || !r && n.indexOf("xml") >= 0,
                    o = i ? t.responseXML : t.responseText;return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o;
            };return S;
        }if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;var u,
            c,
            l,
            f = this;"function" == typeof t ? t = { success: t } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, { url: l, success: e.ajaxSettings.success, type: u || e.ajaxSettings.type, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank" }, t);var m = {};if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;var d = t.traditional;void 0 === d && (d = e.ajaxSettings.traditional);var p,
            h = [],
            v = this.formToArray(t.semantic, h);if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;var g = e.param(v, d);p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;var x = [];if (t.resetForm && x.push(function () {
            f.resetForm();
        }), t.clearForm && x.push(function () {
            f.clearForm(t.includeHidden);
        }), !t.dataType && t.target) {
            var y = t.success || function () {};x.push(function (r) {
                var a = t.replaceTarget ? "replaceWith" : "html";e(t.target)[a](r).each(y, arguments);
            });
        } else t.success && x.push(t.success);if (t.success = function (e, r, a) {
            for (var n = t.context || this, i = 0, o = x.length; o > i; i++) {
                x[i].apply(n, [e, r, a || f, f]);
            }
        }, t.error) {
            var b = t.error;t.error = function (e, r, a) {
                var n = t.context || this;b.apply(n, [e, r, a, f]);
            };
        }if (t.complete) {
            var T = t.complete;t.complete = function (e, r) {
                var a = t.context || this;T.apply(a, [e, r, f]);
            };
        }var j = e("input[type=file]:enabled", this).filter(function () {
            return "" !== e(this).val();
        }),
            w = j.length > 0,
            S = "multipart/form-data",
            D = f.attr("enctype") == S || f.attr("encoding") == S,
            k = n.fileapi && n.formdata;a("fileAPI :" + k);var A,
            L = (w || D) && !k;t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function () {
            A = s(v);
        }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);for (var E = 0; E < h.length; E++) {
            h[E] = null;
        }return this.trigger("form-submit-notify", [this, t]), this;
    }, e.fn.ajaxForm = function (n) {
        if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
            var i = { s: this.selector, c: this.context };return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function () {
                e(i.s, i.c).ajaxForm(n);
            }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this);
        }return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r);
    }, e.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin");
    }, e.fn.formToArray = function (t, r) {
        var a = [];if (0 === this.length) return a;var i,
            o = this[0],
            s = this.attr("id"),
            u = t ? o.getElementsByTagName("*") : o.elements;if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) return a;var c, l, f, m, d, p, h;for (c = 0, p = u.length; p > c; c++) {
            if (d = u[c], f = d.name, f && !d.disabled) if (t && o.clk && "image" == d.type) o.clk == d && (a.push({ name: f, value: e(d).val(), type: d.type }), a.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }));else if (m = e.fieldValue(d, !0), m && m.constructor == Array) for (r && r.push(d), l = 0, h = m.length; h > l; l++) {
                a.push({ name: f, value: m[l] });
            } else if (n.fileapi && "file" == d.type) {
                r && r.push(d);var v = d.files;if (v.length) for (l = 0; l < v.length; l++) {
                    a.push({ name: f, value: v[l], type: d.type });
                } else a.push({ name: f, value: "", type: d.type });
            } else null !== m && "undefined" != typeof m && (r && r.push(d), a.push({ name: f, value: m, type: d.type, required: d.required }));
        }if (!t && o.clk) {
            var g = e(o.clk),
                x = g[0];f = x.name, f && !x.disabled && "image" == x.type && (a.push({ name: f, value: g.val() }), a.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }));
        }return a;
    }, e.fn.formSerialize = function (t) {
        return e.param(this.formToArray(t));
    }, e.fn.fieldSerialize = function (t) {
        var r = [];return this.each(function () {
            var a = this.name;if (a) {
                var n = e.fieldValue(this, t);if (n && n.constructor == Array) for (var i = 0, o = n.length; o > i; i++) {
                    r.push({ name: a, value: n[i] });
                } else null !== n && "undefined" != typeof n && r.push({ name: this.name, value: n });
            }
        }), e.param(r);
    }, e.fn.fieldValue = function (t) {
        for (var r = [], a = 0, n = this.length; n > a; a++) {
            var i = this[a],
                o = e.fieldValue(i, t);null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o));
        }return r;
    }, e.fieldValue = function (t, r) {
        var a = t.name,
            n = t.type,
            i = t.tagName.toLowerCase();if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;if ("select" == i) {
            var o = t.selectedIndex;if (0 > o) return null;for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                var m = u[f];if (m.selected) {
                    var d = m.value;if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;s.push(d);
                }
            }return s;
        }return e(t).val();
    }, e.fn.clearForm = function (t) {
        return this.each(function () {
            e("input,select,textarea", this).clearFields(t);
        });
    }, e.fn.clearFields = e.fn.clearInputs = function (t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function () {
            var a = this.type,
                n = this.tagName.toLowerCase();r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "");
        });
    }, e.fn.resetForm = function () {
        return this.each(function () {
            ("function" == typeof this.reset || "object" == _typeof(this.reset) && !this.reset.nodeType) && this.reset();
        });
    }, e.fn.enable = function (e) {
        return void 0 === e && (e = !0), this.each(function () {
            this.disabled = !e;
        });
    }, e.fn.selected = function (t) {
        return void 0 === t && (t = !0), this.each(function () {
            var r = this.type;if ("checkbox" == r || "radio" == r) this.checked = t;else if ("option" == this.tagName.toLowerCase()) {
                var a = e(this).parent("select");t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t;
            }
        });
    }, e.fn.ajaxSubmit.debug = !1;
});

/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 JĂÂśrn Zaefferer; Licensed MIT */
!function (a) {
    a.extend(a.fn, { validate: function validate(b) {
            if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));var c = a.data(this[0], "validator");return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function (b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0);
            }), this.submit(function (b) {
                function d() {
                    var d;return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0;
                }return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1);
            })), c);
        }, valid: function valid() {
            var b, c;return a(this[0]).is("form") ? b = this.validate().form() : (b = !0, c = a(this[0].form).validate(), this.each(function () {
                b = c.element(this) && b;
            })), b;
        }, removeAttrs: function removeAttrs(b) {
            var c = {},
                d = this;return a.each(b.split(/\s/), function (a, b) {
                c[b] = d.attr(b), d.removeAttr(b);
            }), c;
        }, rules: function rules(b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j = this[0];if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {case "add":
                    a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));break;case "remove":
                    return c ? (i = {}, a.each(c.split(/\s/), function (b, c) {
                        i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required");
                    }), i) : (delete e[j.name], f);}return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g;
        } }), a.extend(a.expr[":"], { blank: function blank(b) {
            return !a.trim("" + a(b).val());
        }, filled: function filled(b) {
            return !!a.trim("" + a(b).val());
        }, unchecked: function unchecked(b) {
            return !a(b).prop("checked");
        } }), a.validator = function (b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init();
    }, a.validator.format = function (b, c) {
        return 1 === arguments.length ? function () {
            var c = a.makeArray(arguments);return c.unshift(b), a.validator.format.apply(this, c);
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
                return c;
            });
        }), b);
    }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", validClass: "valid", errorElement: "label", focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function onfocusin(a) {
                this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(a)).hide());
            }, onfocusout: function onfocusout(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a);
            }, onkeyup: function onkeyup(a, b) {
                (9 !== b.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a);
            }, onclick: function onclick(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
            }, highlight: function highlight(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
            }, unhighlight: function unhighlight(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
            } }, setDefaults: function setDefaults(b) {
            a.extend(a.validator.defaults, b);
        }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}.") }, autoCreateRanges: !1, prototype: { init: function init() {
                function b(b) {
                    var c = a.data(this[0].form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b);
                }this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();var c,
                    d = this.groups = {};a.each(this.settings.groups, function (b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
                        d[c] = b;
                    });
                }), c = this.settings.rules, a.each(c, function (b, d) {
                    c[b] = a.validator.normalizeRule(d);
                }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", b).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", b), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            }, form: function form() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
            }, checkForm: function checkForm() {
                this.prepareForm();for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) {
                    this.check(b[a]);
                }return this.valid();
            }, element: function element(b) {
                var c = this.clean(b),
                    d = this.validationTargetFor(c),
                    e = !0;return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e;
            }, showErrors: function showErrors(b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];for (var c in b) {
                        this.errorList.push({ message: b[c], element: this.findByName(c)[0] });
                    }this.successList = a.grep(this.successList, function (a) {
                        return !(a.name in b);
                    });
                }this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
            }, resetForm: function resetForm() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid");
            }, numberOfInvalids: function numberOfInvalids() {
                return this.objectLength(this.invalid);
            }, objectLength: function objectLength(a) {
                var b,
                    c = 0;for (b in a) {
                    c++;
                }return c;
            }, hideErrors: function hideErrors() {
                this.addWrapper(this.toHide).hide();
            }, valid: function valid() {
                return 0 === this.size();
            }, size: function size() {
                return this.errorList.length;
            }, focusInvalid: function focusInvalid() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                } catch (b) {}
            }, findLastActive: function findLastActive() {
                var b = this.lastActive;return b && 1 === a.grep(this.errorList, function (a) {
                    return a.element.name === b.name;
                }).length && b;
            }, elements: function elements() {
                var b = this,
                    c = {};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0);
                });
            }, clean: function clean(b) {
                return a(b)[0];
            }, errors: function errors() {
                var b = this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement + "." + b, this.errorContext);
            }, reset: function reset() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([]);
            }, prepareForm: function prepareForm() {
                this.reset(), this.toHide = this.errors().add(this.containers);
            }, prepareElement: function prepareElement(a) {
                this.reset(), this.toHide = this.errorsFor(a);
            }, elementValue: function elementValue(b) {
                var c,
                    d = a(b),
                    e = d.attr("type");return "radio" === e || "checkbox" === e ? a("input[name='" + d.attr("name") + "']:checked").val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c);
            }, check: function check(b) {
                b = this.validationTargetFor(this.clean(b));var c,
                    d,
                    e,
                    f = a(b).rules(),
                    g = a.map(f, function (a, b) {
                    return b;
                }).length,
                    h = !1,
                    i = this.elementValue(b);for (d in f) {
                    e = { method: d, parameters: f[d] };try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;continue;
                        }if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b)));if (!c) return this.formatAndAdd(b, e), !1;
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j;
                    }
                }if (!h) return this.objectLength(f) && this.successList.push(b), !0;
            }, customDataMessage: function customDataMessage(b, c) {
                return a(b).data("msg" + c[0].toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
            }, customMessage: function customMessage(a, b) {
                var c = this.settings.messages[a];return c && (c.constructor === String ? c : c[b]);
            }, findDefined: function findDefined() {
                for (var a = 0; a < arguments.length; a++) {
                    if (void 0 !== arguments[a]) return arguments[a];
                }return void 0;
            }, defaultMessage: function defaultMessage(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>");
            }, formatAndAdd: function formatAndAdd(b, c) {
                var d = this.defaultMessage(b, c.method),
                    e = /\$?\{(\d+)\}/g;"function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({ message: d, element: b, method: c.method }), this.errorMap[b.name] = d, this.submitted[b.name] = d;
            }, addWrapper: function addWrapper(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
            }, defaultShowErrors: function defaultShowErrors() {
                var a, b, c;for (a = 0; this.errorList[a]; a++) {
                    c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                }if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) {
                    this.showLabel(this.successList[a]);
                }if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) {
                    this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                }this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
            }, validElements: function validElements() {
                return this.currentElements.not(this.invalidElements());
            }, invalidElements: function invalidElements() {
                return a(this.errorList).map(function () {
                    return this.element;
                });
            }, showLabel: function showLabel(b, c) {
                var d = this.errorsFor(b);d.length ? (d.removeClass(this.settings.validClass).addClass(this.settings.errorClass), d.html(c)) : (d = a("<" + this.settings.errorElement + ">").attr("for", this.idOrName(b)).addClass(this.settings.errorClass).html(c || ""), this.settings.wrapper && (d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b))), !c && this.settings.success && (d.text(""), "string" == typeof this.settings.success ? d.addClass(this.settings.success) : this.settings.success(d, b)), this.toShow = this.toShow.add(d);
            }, errorsFor: function errorsFor(b) {
                var c = this.idOrName(b);return this.errors().filter(function () {
                    return a(this).attr("for") === c;
                });
            }, idOrName: function idOrName(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
            }, validationTargetFor: function validationTargetFor(a) {
                return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a;
            }, checkable: function checkable(a) {
                return (/radio|checkbox/i.test(a.type)
                );
            }, findByName: function findByName(b) {
                return a(this.currentForm).find("[name='" + b + "']");
            }, getLength: function getLength(b, c) {
                switch (c.nodeName.toLowerCase()) {case "select":
                        return a("option:selected", c).length;case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;}return b.length;
            }, depend: function depend(a, b) {
                return this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)] ? this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)](a, b) : !0;
            }, dependTypes: { "boolean": function boolean(a) {
                    return a;
                }, string: function string(b, c) {
                    return !!a(b, c.form).length;
                }, "function": function _function(a, b) {
                    return a(b);
                } }, optional: function optional(b) {
                var c = this.elementValue(b);return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
            }, startRequest: function startRequest(a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0);
            }, stopRequest: function stopRequest(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
            }, previousValue: function previousValue(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, "remote") });
            } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function addClassRules(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b);
        }, classRules: function classRules(b) {
            var c = {},
                d = a(b).attr("class");return d && a.each(d.split(" "), function () {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
            }), c;
        }, attributeRules: function attributeRules(b) {
            var c,
                d,
                e = {},
                f = a(b),
                g = b.getAttribute("type");for (c in a.validator.methods) {
                "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), /min|max/.test(c) && (null === g || /number|range|text/.test(g)) && (d = Number(d)), d || 0 === d ? e[c] = d : g === c && "range" !== g && (e[c] = !0);
            }return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
        }, dataRules: function dataRules(b) {
            var c,
                d,
                e = {},
                f = a(b);for (c in a.validator.methods) {
                d = f.data("rule" + c[0].toUpperCase() + c.substring(1).toLowerCase()), void 0 !== d && (e[c] = d);
            }return e;
        }, staticRules: function staticRules(b) {
            var c = {},
                d = a.data(b.form, "validator");return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
        }, normalizeRules: function normalizeRules(b, c) {
            return a.each(b, function (d, e) {
                if (e === !1) return void delete b[d];if (e.param || e.depends) {
                    var f = !0;switch (_typeof(e.depends)) {case "string":
                            f = !!a(e.depends, c.form).length;break;case "function":
                            f = e.depends.call(c, c);}f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d];
                }
            }), a.each(b, function (d, e) {
                b[d] = a.isFunction(e) ? e(c) : e;
            }), a.each(["minlength", "maxlength"], function () {
                b[this] && (b[this] = Number(b[this]));
            }), a.each(["rangelength", "range"], function () {
                var c;b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]));
            }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b;
        }, normalizeRule: function normalizeRule(b) {
            if ("string" == typeof b) {
                var c = {};a.each(b.split(/\s/), function () {
                    c[this] = !0;
                }), b = c;
            }return b;
        }, addMethod: function addMethod(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
        }, methods: { required: function required(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();return e && e.length > 0;
                }return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0;
            }, email: function email(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
            }, url: function url(a, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a);
            }, date: function date(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString());
            }, dateISO: function dateISO(a, b) {
                return this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a);
            }, number: function number(a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
            }, digits: function digits(a, b) {
                return this.optional(b) || /^\d+$/.test(a);
            }, creditcard: function creditcard(a, b) {
                if (this.optional(b)) return "dependency-mismatch";if (/[^0-9 \-]+/.test(a)) return !1;var c,
                    d,
                    e = 0,
                    f = 0,
                    g = !1;if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;for (c = a.length - 1; c >= 0; c--) {
                    d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                }return e % 10 === 0;
            }, minlength: function minlength(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);return this.optional(c) || e >= d;
            }, maxlength: function maxlength(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);return this.optional(c) || d >= e;
            }, rangelength: function rangelength(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);return this.optional(c) || e >= d[0] && e <= d[1];
            }, min: function min(a, b, c) {
                return this.optional(b) || a >= c;
            }, max: function max(a, b, c) {
                return this.optional(b) || c >= a;
            }, range: function range(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1];
            }, equalTo: function equalTo(b, c, d) {
                var e = a(d);return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    a(c).valid();
                }), b === e.val();
            }, remote: function remote(b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";var e,
                    f,
                    g = this.previousValue(c);return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && { url: d } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, { url: d, mode: "abort", port: "validate" + c.name, dataType: "json", data: f, context: e.currentForm, success: function success(d) {
                        var f,
                            h,
                            i,
                            j = d === !0 || "true" === d;e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j);
                    } }, d)), "pending");
            } } }), a.format = function () {
        throw "$.format has been deprecated. Please use $.validator.format instead.";
    };
}(jQuery), function (a) {
    var b,
        c = {};a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
        var e = a.port;"abort" === a.mode && (c[e] && c[e].abort(), c[e] = d);
    }) : (b = a.ajax, a.ajax = function (d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments);
    });
}(jQuery), function (a) {
    a.extend(a.fn, { validateDelegate: function validateDelegate(b, c, d) {
            return this.bind(c, function (c) {
                var e = a(c.target);return e.is(b) ? d.apply(e, arguments) : void 0;
            });
        } });
}(jQuery);

// ADDITIONAL JQUERY VALIDATE METHODS
(function ($) {
    // Validate a multifield birthday
    $.validator.addMethod("mc_birthday", function (date, element, grouping_class) {
        var isValid = false;
        var $fields = $('input:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.filter(':filled').length == 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error   
        } else {
            var dateArray = new Array();
            dateArray['month'] = $fields.filter("input[name*='[month]']").val();
            dateArray['day'] = $fields.filter("input[name*='[day]']").val();

            // correct month value
            dateArray['month'] = dateArray['month'] - 1;

            var testDate = new Date(1970, dateArray['month'], dateArray['day']);
            if (testDate.getDate() != dateArray['day'] || testDate.getMonth() != dateArray['month']) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, "Please enter a valid month and day.");
    // Validate a multifield date
    $.validator.addMethod("mc_date", function (date, element, grouping_class) {
        var isValid = false;
        var $fields = $('input:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.filter(':filled').length == 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error   
        } else {
            var dateArray = new Array();
            dateArray['month'] = $fields.filter("input[name*='[month]']").val();
            dateArray['day'] = $fields.filter("input[name*='[day]']").val();
            dateArray['year'] = $fields.filter("input[name*='[year]']").val();

            // correct month value
            dateArray['month'] = dateArray['month'] - 1;

            // correct year value
            if (dateArray['year'].length < 4) {
                dateArray['year'] = parseInt(dateArray['year']) < 50 ? 2000 + parseInt(dateArray['year']) : 1900 + parseInt(dateArray['year']);
            }

            var testDate = new Date(dateArray['year'], dateArray['month'], dateArray['day']);
            if (testDate.getDate() != dateArray['day'] || testDate.getMonth() != dateArray['month'] || testDate.getFullYear() != dateArray['year']) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, "Please enter a valid date");

    // Validate a multifield phone number
    $.validator.addMethod("mc_phone", function (phone_number, element, grouping_class) {
        var isValid = false;
        var $fields = $('input:filled:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.length == 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error   
        } else {
            phone_number = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
            isValid = phone_number.length == 10 && phone_number.match(/[0-9]{9}/);
        }
        return isValid;
    }, "Please specify a valid phone number");

    $.validator.addMethod("skip_or_complete_group", function (value, element, grouping_class) {
        var $fields = $('input:not(:hidden)', $(element).closest(grouping_class)),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
            numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length,
            isValid = numberFilled === 0 || numberFilled === $fields.length;

        // Store the cloned validator for future validation
        $fieldsFirst.data("valid_skip", validator);

        // If element isn't being validated, run each field's validation rules
        if (!$(element).data("being_validated")) {
            $fields.data("being_validated", true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data("being_validated", false);
        }
        return isValid;
    }, $.validator.format("Please supply missing fields."));

    $.validator.addMethod("skip_or_fill_minimum", function (value, element, options) {
        var $fields = $(options[1], element.form),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
            numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length,
            isValid = numberFilled === 0 || numberFilled >= options[0];
        console.log($fields.eq(0));
        // Store the cloned validator for future validation
        $fieldsFirst.data("valid_skip", validator);

        // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
        if (!$(element).data("being_validated")) {
            $fields.data("being_validated", true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data("being_validated", false);
        }
        return isValid;
    }, $.validator.format("Please either skip these fields or fill at least {0} of them."));

    $.validator.addMethod("zipcodeUS", function (value, element) {
        return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
    }, "The specified US ZIP Code is invalid");
})(jQuery);

// MC
(function ($) {

    // TODO: Do we actually allow custom error styles or is this legacy code?
    var err_style = '';
    try {
        err_style = mc_custom_error_style;
    } catch (e) {
        err_style = '#mc_embed_signup input.mce_inline_error { border-color:#6B0505; } #mc_embed_signup div.mce_inline_error { margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff; }';
    }
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = err_style;
    } else {
        style.appendChild(document.createTextNode(err_style));
    }
    head.appendChild(style);

    // Expose extra mc form methods in global var
    window.mc = {

        /**
         *  Open the evil popup     
         */
        openPopup: function openPopup() {
            $('#mc_embed_signup a.mc_embed_close').show();
            setTimeout(function () {
                $('#mc_embed_signup').fadeIn();
            }, mc.delayPopup);
        },
        /**
         *  Close the evil popup
         */
        closePopup: function closePopup() {
            $('#mc_embed_signup').hide();
            var now = new Date();
            var expires_date = new Date(now.getTime() + 31536000000);
            document.cookie = 'MCEvilPopupClosed=yes;expires=' + expires_date.toGMTString() + ';path=/';
        },
        /**
         *  Figure out if we should show the evil popup (if they've closed it before, don't show it.)
         */
        evalPopup: function evalPopup() {
            $('#mc_embed_signup').hide();
            cks = document.cookie.split(';');
            for (i = 0; i < cks.length; i++) {
                parts = cks[i].split('=');
                if (parts[0].indexOf('MCEvilPopupClosed') != -1) mc.showPopup = false;
            }
            if (mc.showPopup) mc.openPopup();
        },
        /**
         *  Grab the list subscribe url from the form action and make it work for an ajax post.
         */
        getAjaxSubmitUrl: function getAjaxSubmitUrl() {
            var url = $("form#mc-embedded-subscribe-form").attr("action");
            url = url.replace("/post?u=", "/post-json?u=");
            url += "&c=?";
            return url;
        },
        /**
         *  Classify text inputs in the same field group as group for validation purposes.
         *  All this does is tell jQueryValidation to create one error div for the group, rather
         *  than one for each input. Primary use case is birthday and date fields, where we want 
         *  to display errors about the inputs collectively, not individually.
         *
         *  NOTE: Grouping inputs will give you one error div, but you still need to specify where
         *  that div should be displayed. By default, it's inserted after the first input with a
         *  validation error, which can break up a set of inputs. Use the errorPlacement setting in
         *  the validator to control error div placement.
         */
        getGroups: function getGroups() {
            var groups = {};
            $(".mc-field-group").each(function (index) {
                var inputs = $(this).find("input:text:not(:hidden)"); // TODO: What about non-text inputs like number?
                if (inputs.length > 1) {
                    var mergeName = inputs.first().attr("name");
                    var fieldNames = $.map(inputs, function (f) {
                        return f.name;
                    });
                    groups[mergeName.substring(0, mergeName.indexOf("["))] = fieldNames.join(" ");
                }
            });
            return groups;
        },
        /**
         *  Chick if a field is part of a multipart field
         *  (e.g., A date merge field is composed of individual inputs for month, day and year)
         *  Used in jQuery validation onkeyup method to ensure that we don't evaluate a field
         *  if a user hasn't reached the last input in a multipart field yet.
         */
        isMultiPartField: function isMultiPartField(element) {
            return $('input:not(:hidden)', $(element).closest(".mc-field-group")).length > 1;
        },
        /**
         *  Checks if the element is the last input in its fieldgroup. 
         *  If the field is not the last in a set of inputs we don't want to validate it on certain events (onfocusout, onblur)
         *  because the user might not be finished yet.
         */
        isTooEarly: function isTooEarly(element) {
            var fields = $('input:not(:hidden)', $(element).closest(".mc-field-group"));
            return $(fields).eq(-1).attr('id') != $(element).attr('id');
        },
        /**
         *  Handle the error/success message after successful form submission.
         *  Success messages are appended to #mce-success-response
         *  Error messages are displayed with the invalid input when possible, or appended to #mce-error-response
         */
        mce_success_cb: function mce_success_cb(resp) {

            $('#mce-success-response').hide();
            $('#mce-error-response').hide();

            // On successful form submission, display a success message and reset the form
            if (resp.result == "success") {
                $('#mce-' + resp.result + '-response').show();
                $('#mce-' + resp.result + '-response').html(resp.msg);
                $('#mc-embedded-subscribe-form').each(function () {
                    this.reset();
                });

                // If the form has errors, display them, inline if possible, or appended to #mce-error-response
            } else {

                // Example errors - Note: You only get one back at a time even if you submit several that are bad. 
                // Error structure - number indicates the index of the merge field that was invalid, then details
                // Object {result: "error", msg: "6 - Please enter the date"} 
                // Object {result: "error", msg: "4 - Please enter a value"} 
                // Object {result: "error", msg: "9 - Please enter a complete address"} 

                // Try to parse the error into a field index and a message.
                // On failure, just put the dump thing into in the msg variable.
                var index = -1;
                var msg;
                try {
                    var parts = resp.msg.split(' - ', 2);
                    if (parts[1] == undefined) {
                        msg = resp.msg;
                    } else {
                        i = parseInt(parts[0]);
                        if (i.toString() == parts[0]) {
                            index = parts[0];
                            msg = parts[1];
                        } else {
                            index = -1;
                            msg = resp.msg;
                        }
                    }
                } catch (e) {
                    index = -1;
                    msg = resp.msg;
                }

                try {
                    // If index is -1 if means we don't have data on specifically which field was invalid.
                    // Just lump the error message into the generic response div.
                    if (index == -1) {
                        $('#mce-' + resp.result + '-response').show();
                        $('#mce-' + resp.result + '-response').html(msg);
                    } else {
                        var fieldName = $("input[name*='" + fnames[index] + "']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
                        var data = {};
                        data[fieldName] = msg;
                        mc.mce_validator.showErrors(data);
                    }
                } catch (e) {
                    $('#mce-' + resp.result + '-response').show();
                    $('#mce-' + resp.result + '-response').html(msg);
                }
            }
        }
    };

    window.mc.mce_validator = $("#mc-embedded-subscribe-form").validate({

        // Set error HTML: <div class="mce_inline_error"></div>
        errorClass: "mce_inline_error",
        errorElement: "div",

        // Validate fields on keyup, focusout and blur. 
        onkeyup: false,
        onfocusout: function onfocusout(element) {
            if (!mc.isTooEarly(element)) {
                $(element).valid();
            }
        },
        onblur: function onblur(element) {
            if (!mc.isTooEarly(element)) {
                $(element).valid();
            }
        },
        // Grouping fields makes jQuery Validation display one error for all the fields in the group
        // It doesn't have anything to do with how the fields are validated (together or separately), 
        // it's strictly for visual display of errors
        groups: mc.getGroups(),
        // Place a field's inline error HTML just before the div.mc-field-group closing tag 
        errorPlacement: function errorPlacement(error, element) {
            element.closest('.mc-field-group').append(error);
        },
        // Submit the form via ajax (see: jQuery Form plugin)
        submitHandler: function submitHandler(form) {
            $(form).ajaxSubmit(mc.ajaxOptions);
        }
    });

    window.mc.ajaxOptions = {
        url: mc.getAjaxSubmitUrl(),
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: mc.mce_success_cb
    };

    // Custom validation methods for fields with certain css classes
    $.validator.addClassRules("birthday", { digits: true, mc_birthday: ".datefield" });
    $.validator.addClassRules("datepart", { digits: true, mc_date: ".datefield" });
    $.validator.addClassRules("phonepart", { digits: true, mc_phone: ".phonefield" });

    // Evil Popup
    $('#mc_embed_signup a.mc_embed_close').click(function () {
        mc.closePopup();
    });
    $(document).keydown(function (e) {
        var keycode = e == null ? event.keyCode : e.which;
        if (keycode == 27 && typeof mc.showPopup != 'undefined') mc.closePopup();
    });
})(jQuery);

(function ($) {
    window.fnames = new Array();
    window.ftypes = new Array();
    fnames[0] = 'EMAIL';
    ftypes[0] = 'email';
    fnames[1] = 'FNAME';
    ftypes[1] = 'text';
    fnames[2] = 'LNAME';
    ftypes[2] = 'text';
})(jQuery);
//var $mcj = jQuery.noConflict(true);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {

    $(document).ready(function () {
        // ========= jPlayer config 1 ==========
        // Home player, Track player, Single post top player
        var myPlaylist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_N",
            cssSelectorAncestor: "#jp_container_N"
        }, [{
            artist: "Kyle Hall", // the artist name
            title: "Kyle Hall Live At Monsterland", // track title
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3", // mp3 path
            oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg", // oga path
            poster: "assets/img/albums/poster-2.jpg", // poster image path
            duration: '03:29' // duration time in playlist
        }, {
            artist: "Beverly James",
            title: "We are the legend",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
            poster: "assets/img/albums/poster-1.jpg",
            duration: '05:41'
        }, {
            artist: "Grace Hopkins",
            title: "Feeling The Hum Music",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            poster: "assets/img/albums/poster-3.jpg",
            duration: '04:05'
        }, {
            artist: "Skollax",
            title: "Consectetur adipisicing elit",
            mp3: "http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
            oga: "http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
            poster: "assets/img/albums/poster-4.jpg",
            duration: '04:27'
        }], {
            swfPath: "assets/jplayer/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            size: { width: "80px", height: "80px" }
        });
        // Show The Current Track !!
        $("#jquery_jplayer_N").on($.jPlayer.event.ready, function (event) {
            var current = myPlaylist.current;
            var playlist = myPlaylist.playlist;
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlaying").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });
        $("#jquery_jplayer_N").on($.jPlayer.event.play, function (event) {
            var current = myPlaylist.current;
            var playlist = myPlaylist.playlist;
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlaying").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });

        // ========= jPlayer config 2 ==========
        // Sidebar player
        var myPlaylist_2 = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_W",
            cssSelectorAncestor: "#jp_container_W"
        }, [{
            artist: "Beverly James",
            title: "We are the legend",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
            poster: "assets/img/albums/poster-1.jpg",
            duration: '05:41'
        }, {
            artist: "Kyle Hall",
            title: "Kyle Hall Live At Monsterland",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg",
            poster: "assets/img/albums/poster-2.jpg",
            duration: '03:29'
        }, {
            artist: "Grace Hopkins",
            title: "Feeling The Hum Music",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            poster: "assets/img/albums/poster-3.jpg",
            duration: '04:05'
        }, {
            artist: "Skollax",
            title: "Consectetur adipisicing elit",
            mp3: "http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
            oga: "http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
            poster: "assets/img/albums/poster-4.jpg",
            duration: '04:27'
        }], {
            swfPath: "assets/jplayer/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            size: { width: "80px", height: "80px" }
        });

        // Show The Current Track !!
        $("#jquery_jplayer_W").on($.jPlayer.event.ready, function (event) {
            var current = myPlaylist_2.current;
            var playlist = myPlaylist_2.playlist;
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlayingSidebar").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });
        $("#jquery_jplayer_W").on($.jPlayer.event.play, function (event) {
            var current = myPlaylist_2.current;
            var playlist = myPlaylist_2.playlist;
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlayingSidebar").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });
    });
})(jQuery);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {

  /**
   * ### HOW TO CREATE A VALID ID TO USE: ###
   * Go to www.twitter.com and sign in as normal, go to your settings page.
   * Go to "Widgets" on the left hand side.
   * Create a new widget for what you need eg "user time line" or "search" etc.
   * Feel free to check "exclude replies" if you don't want replies in results.
   * Now go back to settings page, and then go back to widgets page and
   * you should see the widget you just created. Click edit.
   * Look at the URL in your web browser, you will see a long number like this:
   * 345735908357048478
   * Use this as your ID below instead!
   */

  /**
   * How to use TwitterFetcher's fetch function:
   * 
   * @function fetch(object) Fetches the Twitter content according to
   *     the parameters specified in object.
   * 
   * @param object {Object} An object containing case sensitive key-value pairs
   *     of properties below.
   * 
   * You may specify at minimum the following two required properties:
   * 
   * @param object.id {string} The ID of the Twitter widget you wish
   *     to grab data from (see above for how to generate this number).
   * @param object.domId {string} The ID of the DOM element you want
   *     to write results to.
   *
   * You may also specify one or more of the following optional properties
   *     if you desire:
   *
   * @param object.maxTweets [int] The maximum number of tweets you want
   *     to return. Must be a number between 1 and 20. Default value is 20.
   * @param object.enableLinks [boolean] Set false if you don't want
   *     urls and hashtags to be hyperlinked.
   * @param object.showUser [boolean] Set false if you don't want user
   *     photo / name for tweet to show.
   * @param object.showTime [boolean] Set false if you don't want time of tweet
   *     to show.
   * @param object.dateFunction [function] A function you can specify
   *     to format date/time of tweet however you like. This function takes
   *     a JavaScript date as a parameter and returns a String representation
   *     of that date.
   * @param object.showRetweet [boolean] Set false if you don't want retweets
   *     to show.
   * @param object.customCallback [function] A function you can specify
   *     to call when data are ready. It also passes data to this function
   *     to manipulate them yourself before outputting. If you specify
   *     this parameter you must output data yourself!
   * @param object.showInteraction [boolean] Set false if you don't want links
   *     for reply, retweet and favourite to show.
   * @param object.showImages [boolean] Set true if you want images from tweet
   *     to show.
   * @param object.lang [string] The abbreviation of the language you want to use
   *     for Twitter phrases like "posted on" or "time ago". Default value
   *     is "en" (English).
   */

  // ##### Simple example 1 #####
  // A simple example to get my latest tweet and write to a HTML element with
  // id "example1". Also automatically hyperlinks URLS and user mentions and
  // hashtags.
  if ($('#tweet-example-1').length > 0) {
    var config1 = {
      "id": '584036739448233986', // place your id here
      "domId": 'tweet-example-1',
      "maxTweets": 1,
      "enableLinks": true,
      "showPermalinks": true,
      "showUser": false,
      "showInteraction": false
    };
    twitterFetcher.fetch(config1);
  }

  if ($('#tweet-example-footer').length > 0) {
    var config_footer = {
      "id": '584036739448233986', // place your id here
      "domId": 'tweet-example-footer',
      "maxTweets": 3,
      "enableLinks": true,
      "showPermalinks": true,
      "showUser": false,
      "showInteraction": false
    };
    twitterFetcher.fetch(config_footer);
  }

  // ##### Simple example 2 #####
  // A simple example to get my latest 5 of my favourite tweets and write to a
  // HTML element with id "talk". Also automatically hyperlinks URLS and user
  // mentions and hashtags but does not display time of post. We also make the
  // request to Twitter specifiying we would like results where possible in
  // English language.
  // var config2 = {
  //   "id": '347099293930377217',
  //   "domId": 'example2',
  //   "maxTweets": 5,
  //   "enableLinks": true, 
  //   "showUser": true,
  //   "showTime": true,
  //   "lang": 'en'
  // };
  // twitterFetcher.fetch(config2);


  // // ##### Simple example 3 #####
  // // A simple example to get latest 5 tweets for #API tag and shows any images
  // // attached to tweets.
  // var config3 = {
  //   "id": '502160051226681344',
  //   "domId": 'example3',
  //   "maxTweets": 5,
  //   "enableLinks": true,
  //   "showImages": true
  // };
  // twitterFetcher.fetch(config3);


  // // ##### Advanced example #####
  // // An advance example to get latest 5 posts using hashtag #API and write to a
  // // HTML element with id "tweets2" without showing user details and using a
  // // custom format to display the date/time of the post, and does not show
  // // retweets.
  // var config4 = {
  //   "id": '345690956013633536',
  //   "domId": 'example4',
  //   "maxTweets": 3,
  //   "enableLinks": true,
  //   "showUser": false,
  //   "showTime": true,
  //   "dateFunction": dateFormatter,
  //   "showRetweet": false
  // };

  // // For advanced example which allows you to customize how tweet time is
  // // formatted you simply define a function which takes a JavaScript date as a
  // // parameter and returns a string!
  // // See http://www.w3schools.com/jsref/jsref_obj_date.asp for properties
  // // of a Date object.
  // function dateFormatter(date) {
  //   return date.toTimeString();
  // }

  // twitterFetcher.fetch(config4);


  // // ##### Advanced example 2 #####
  // // Similar as previous, except this time we pass a custom function to render the
  // // tweets ourself! Useful if you need to know exactly when data has returned or
  // // if you need full control over the output.

  // var config5 = {
  //   "id": '345690956013633536',
  //   "domId": '',
  //   "maxTweets": 3,
  //   "enableLinks": true,
  //   "showUser": true,
  //   "showTime": true,
  //   "dateFunction": '',
  //   "showRetweet": false,
  //   "customCallback": handleTweets,
  //   "showInteraction": false
  // };

  // function handleTweets(tweets) {
  //     var x = tweets.length;
  //     var n = 0;
  //     var element = document.getElementById('example5');
  //     var html = '<ul>';
  //     while(n < x) {
  //       html += '<li>' + tweets[n] + '</li>';
  //       n++;
  //     }
  //     html += '</ul>';
  //     element.innerHTML = html;
  // }

  // twitterFetcher.fetch(config5);
})(jQuery);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*
 * Playlist Object for the jPlayer Plugin
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2014 Happyworm Ltd
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.4.1
 * Date: 19th November 2014
 *
 * Requires:
 *  - jQuery 1.7.0+
 *  - jPlayer 2.8.2+
 */

/*global jPlayerPlaylist:true */

(function($, undefined) {

	jPlayerPlaylist = function(cssSelector, playlist, options) {
		var self = this;

		this.current = 0;
		this.loop = false; // Flag used with the jPlayer repeat event
		this.shuffled = false;
		this.removing = false; // Flag is true during remove animation, disabling the remove() method until complete.

		this.cssSelector = $.extend({}, this._cssSelector, cssSelector); // Object: Containing the css selectors for jPlayer and its cssSelectorAncestor
		this.options = $.extend(true, {
			keyBindings: {
				next: {
					key: 221, // ]
					fn: function() {
						self.next();
					}
				},
				previous: {
					key: 219, // [
					fn: function() {
						self.previous();
					}
				},
				shuffle: {
					key: 83, // s
					fn: function() {
						self.shuffle();
					}
				}
			},
			stateClass: {
				shuffled: "jp-state-shuffled"
			}
		}, this._options, options); // Object: The jPlayer constructor options for this playlist and the playlist options

		this.playlist = []; // Array of Objects: The current playlist displayed (Un-shuffled or Shuffled)
		this.original = []; // Array of Objects: The original playlist

		this._initPlaylist(playlist); // Copies playlist to this.original. Then mirrors this.original to this.playlist. Creating two arrays, where the element pointers match. (Enables pointer comparison.)

		// Setup the css selectors for the extra interface items used by the playlist.
		this.cssSelector.details = this.cssSelector.cssSelectorAncestor + " .jp-details"; // Note that jPlayer controls the text in the title element.
		this.cssSelector.playlist = this.cssSelector.cssSelectorAncestor + " .jp-playlist";
		this.cssSelector.next = this.cssSelector.cssSelectorAncestor + " .jp-next";
		this.cssSelector.previous = this.cssSelector.cssSelectorAncestor + " .jp-previous";
		this.cssSelector.shuffle = this.cssSelector.cssSelectorAncestor + " .jp-shuffle";
		this.cssSelector.shuffleOff = this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off";

		// Override the cssSelectorAncestor given in options
		this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor;

		// Override the default repeat event handler
		this.options.repeat = function(event) {
			self.loop = event.jPlayer.options.loop;
		};

		// Create a ready event handler to initialize the playlist
		$(this.cssSelector.jPlayer).bind($.jPlayer.event.ready, function() {
			self._init();
		});

		// Create an ended event handler to move to the next item
		$(this.cssSelector.jPlayer).bind($.jPlayer.event.ended, function() {
			self.next();
		});

		// Create a play event handler to pause other instances
		$(this.cssSelector.jPlayer).bind($.jPlayer.event.play, function() {
			$(this).jPlayer("pauseOthers");
		});

		// Create a resize event handler to show the title in full screen mode.
		$(this.cssSelector.jPlayer).bind($.jPlayer.event.resize, function(event) {
			if(event.jPlayer.options.fullScreen) {
				$(self.cssSelector.details).show();
			} else {
				$(self.cssSelector.details).hide();
			}
		});

		// Create click handlers for the extra buttons that do playlist functions.
		$(this.cssSelector.previous).click(function(e) {
			e.preventDefault();
			self.previous();
			self.blur(this);
		});

		$(this.cssSelector.next).click(function(e) {
			e.preventDefault();
			self.next();
			self.blur(this);
		});

		$(this.cssSelector.shuffle).click(function(e) {
			e.preventDefault();
			if(self.shuffled && $(self.cssSelector.jPlayer).jPlayer("option", "useStateClassSkin")) {
				self.shuffle(false);
			} else {
				self.shuffle(true);
			}
			self.blur(this);
		});
		$(this.cssSelector.shuffleOff).click(function(e) {
			e.preventDefault();
			self.shuffle(false);
			self.blur(this);
		}).hide();

		// Put the title in its initial display state
		if(!this.options.fullScreen) {
			$(this.cssSelector.details).hide();
		}

		// Remove the empty <li> from the page HTML. Allows page to be valid HTML, while not interfereing with display animations
		$(this.cssSelector.playlist + " ul").empty();

		// Create .on() handlers for the playlist items along with the free media and remove controls.
		this._createItemHandlers();

		// Instance jPlayer
		$(this.cssSelector.jPlayer).jPlayer(this.options);
	};

	jPlayerPlaylist.prototype = {
		_cssSelector: { // static object, instanced in constructor
			jPlayer: "#jquery_jplayer_1",
			cssSelectorAncestor: "#jp_container_1"
		},
		_options: { // static object, instanced in constructor
			playlistOptions: {
				autoPlay: false,
				loopOnPrevious: false,
				shuffleOnLoop: true,
				enableRemoveControls: false,
				displayTime: 'slow',
				addTime: 'fast',
				removeTime: 'fast',
				shuffleTime: 'slow',
				itemClass: "jp-playlist-item",
				freeGroupClass: "jp-free-media",
				freeItemClass: "jp-playlist-item-free",
				removeItemClass: "jp-playlist-item-remove"
			}
		},
		option: function(option, value) { // For changing playlist options only
			if(value === undefined) {
				return this.options.playlistOptions[option];
			}

			this.options.playlistOptions[option] = value;

			switch(option) {
				case "enableRemoveControls":
					this._updateControls();
					break;
				case "itemClass":
				case "freeGroupClass":
				case "freeItemClass":
				case "removeItemClass":
					this._refresh(true); // Instant
					this._createItemHandlers();
					break;
			}
			return this;
		},
		_init: function() {
			var self = this;
			this._refresh(function() {
				if(self.options.playlistOptions.autoPlay) {
					self.play(self.current);
				} else {
					self.select(self.current);
				}
			});
		},
		_initPlaylist: function(playlist) {
			this.current = 0;
			this.shuffled = false;
			this.removing = false;
			this.original = $.extend(true, [], playlist); // Copy the Array of Objects
			this._originalPlaylist();
		},
		_originalPlaylist: function() {
			var self = this;
			this.playlist = [];
			// Make both arrays point to the same object elements. Gives us 2 different arrays, each pointing to the same actual object. ie., Not copies of the object.
			$.each(this.original, function(i) {
				self.playlist[i] = self.original[i];
			});
		},
		_refresh: function(instant) {
			/* instant: Can be undefined, true or a function.
			 *	undefined -> use animation timings
			 *	true -> no animation
			 *	function -> use animation timings and excute function at half way point.
			 */
			var self = this;

			if(instant && !$.isFunction(instant)) {
				$(this.cssSelector.playlist + " ul").empty();
				$.each(this.playlist, function(i) {
					$(self.cssSelector.playlist + " ul").append(self._createListItem(self.playlist[i]));
				});
				this._updateControls();
			} else {
				var displayTime = $(this.cssSelector.playlist + " ul").children().length ? this.options.playlistOptions.displayTime : 0;

				$(this.cssSelector.playlist + " ul").slideUp(displayTime, function() {
					var $this = $(this);
					$(this).empty();
					
					$.each(self.playlist, function(i) {
						$this.append(self._createListItem(self.playlist[i]));
					});
					self._updateControls();
					if($.isFunction(instant)) {
						instant();
					}
					if(self.playlist.length) {
						$(this).slideDown(self.options.playlistOptions.displayTime);
					} else {
						$(this).show();
					}
				});
			}
		},
		_createListItem: function(media) {
			var self = this;

			// Wrap the <li> contents in a <div>
			var listItem = "<li><div>";

			// Create remove control
			listItem += "<a href='javascript:;' class='" + this.options.playlistOptions.removeItemClass + "'>&times;</a>";

			// Create links to free media
			if(media.free) {
				var first = true;
				listItem += "<span class='" + this.options.playlistOptions.freeGroupClass + "'>(";
				$.each(media, function(property,value) {
					if($.jPlayer.prototype.format[property]) { // Check property is a media format.
						if(first) {
							first = false;
						} else {
							listItem += " | ";
						}
						listItem += "<a class='" + self.options.playlistOptions.freeItemClass + "' href='" + value + "' tabindex='-1'>" + property + "</a>";
					}
				});
				listItem += ")</span>";
			}

			// The title is given next in the HTML otherwise the float:right on the free media corrupts in IE6/7
			listItem += "<a href='javascript:;' class='" + this.options.playlistOptions.itemClass + "' tabindex='0'>" + media.title + (media.artist ? " <span class='jp-artist'>by " + media.artist + "</span>" : "") + "</a>";
			listItem += "</div></li>";

			return listItem;
		},
		_createItemHandlers: function() {
			var self = this;
			// Create live handlers for the playlist items
			$(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemClass).on("click", "a." + this.options.playlistOptions.itemClass, function(e) {
				e.preventDefault();
				var index = $(this).parent().parent().index();
				if(self.current !== index) {
					self.play(index);
				} else {
					$(self.cssSelector.jPlayer).jPlayer("play");
				}
				self.blur(this);
			});

			// Create live handlers that disable free media links to force access via right click
			$(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.freeItemClass).on("click", "a." + this.options.playlistOptions.freeItemClass, function(e) {
				e.preventDefault();
				$(this).parent().parent().find("." + self.options.playlistOptions.itemClass).click();
				self.blur(this);
			});

			// Create live handlers for the remove controls
			$(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.removeItemClass).on("click", "a." + this.options.playlistOptions.removeItemClass, function(e) {
				e.preventDefault();
				var index = $(this).parent().parent().index();
				self.remove(index);
				self.blur(this);
			});
		},
		_updateControls: function() {
			if(this.options.playlistOptions.enableRemoveControls) {
				$(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).show();
			} else {
				$(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).hide();
			}

			if(this.shuffled) {
				$(this.cssSelector.jPlayer).jPlayer("addStateClass", "shuffled");
			} else {
				$(this.cssSelector.jPlayer).jPlayer("removeStateClass", "shuffled");
			}
			if($(this.cssSelector.shuffle).length && $(this.cssSelector.shuffleOff).length) {
				if(this.shuffled) {
					$(this.cssSelector.shuffleOff).show();
					$(this.cssSelector.shuffle).hide();
				} else {
					$(this.cssSelector.shuffleOff).hide();
					$(this.cssSelector.shuffle).show();
				}
			}
		},
		_highlight: function(index) {
			if(this.playlist.length && index !== undefined) {
				$(this.cssSelector.playlist + " .jp-playlist-current").removeClass("jp-playlist-current");
				$(this.cssSelector.playlist + " li:nth-child(" + (index + 1) + ")").addClass("jp-playlist-current").find(".jp-playlist-item").addClass("jp-playlist-current");
				// $(this.cssSelector.details + " li").html("<span class='jp-title'>" + this.playlist[index].title + "</span>" + (this.playlist[index].artist ? " <span class='jp-artist'>by " + this.playlist[index].artist + "</span>" : ""));
			}
		},
		setPlaylist: function(playlist) {
			this._initPlaylist(playlist);
			this._init();
		},
		add: function(media, playNow) {
			$(this.cssSelector.playlist + " ul").append(this._createListItem(media)).find("li:last-child").hide().slideDown(this.options.playlistOptions.addTime);
			this._updateControls();
			this.original.push(media);
			this.playlist.push(media); // Both array elements share the same object pointer. Comforms with _initPlaylist(p) system.

			if(playNow) {
				this.play(this.playlist.length - 1);
			} else {
				if(this.original.length === 1) {
					this.select(0);
				}
			}
		},
		remove: function(index) {
			var self = this;

			if(index === undefined) {
				this._initPlaylist([]);
				this._refresh(function() {
					$(self.cssSelector.jPlayer).jPlayer("clearMedia");
				});
				return true;
			} else {

				if(this.removing) {
					return false;
				} else {
					index = (index < 0) ? self.original.length + index : index; // Negative index relates to end of array.
					if(0 <= index && index < this.playlist.length) {
						this.removing = true;

						$(this.cssSelector.playlist + " li:nth-child(" + (index + 1) + ")").slideUp(this.options.playlistOptions.removeTime, function() {
							$(this).remove();

							if(self.shuffled) {
								var item = self.playlist[index];
								$.each(self.original, function(i) {
									if(self.original[i] === item) {
										self.original.splice(i, 1);
										return false; // Exit $.each
									}
								});
								self.playlist.splice(index, 1);
							} else {
								self.original.splice(index, 1);
								self.playlist.splice(index, 1);
							}

							if(self.original.length) {
								if(index === self.current) {
									self.current = (index < self.original.length) ? self.current : self.original.length - 1; // To cope when last element being selected when it was removed
									self.select(self.current);
								} else if(index < self.current) {
									self.current--;
								}
							} else {
								$(self.cssSelector.jPlayer).jPlayer("clearMedia");
								self.current = 0;
								self.shuffled = false;
								self._updateControls();
							}

							self.removing = false;
						});
					}
					return true;
				}
			}
		},
		select: function(index) {
			index = (index < 0) ? this.original.length + index : index; // Negative index relates to end of array.
			if(0 <= index && index < this.playlist.length) {
				this.current = index;
				this._highlight(index);
				$(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current]);
			} else {
				this.current = 0;
			}
		},
		play: function(index) {
			index = (index < 0) ? this.original.length + index : index; // Negative index relates to end of array.
			if(0 <= index && index < this.playlist.length) {
				if(this.playlist.length) {
					this.select(index);
					$(this.cssSelector.jPlayer).jPlayer("play");
				}
			} else if(index === undefined) {
				$(this.cssSelector.jPlayer).jPlayer("play");
			}
		},
		pause: function() {
			$(this.cssSelector.jPlayer).jPlayer("pause");
		},
		next: function() {
			var index = (this.current + 1 < this.playlist.length) ? this.current + 1 : 0;

			if(this.loop) {
				// See if we need to shuffle before looping to start, and only shuffle if more than 1 item.
				if(index === 0 && this.shuffled && this.options.playlistOptions.shuffleOnLoop && this.playlist.length > 1) {
					this.shuffle(true, true); // playNow
				} else {
					this.play(index);
				}
			} else {
				// The index will be zero if it just looped round
				if(index > 0) {
					this.play(index);
				}
			}
		},
		previous: function() {
			var index = (this.current - 1 >= 0) ? this.current - 1 : this.playlist.length - 1;

			if(this.loop && this.options.playlistOptions.loopOnPrevious || index < this.playlist.length - 1) {
				this.play(index);
			}
		},
		shuffle: function(shuffled, playNow) {
			var self = this;

			if(shuffled === undefined) {
				shuffled = !this.shuffled;
			}

			if(shuffled || shuffled !== this.shuffled) {

				$(this.cssSelector.playlist + " ul").slideUp(this.options.playlistOptions.shuffleTime, function() {
					self.shuffled = shuffled;
					if(shuffled) {
						self.playlist.sort(function() {
							return 0.5 - Math.random();
						});
					} else {
						self._originalPlaylist();
					}
					self._refresh(true); // Instant

					if(playNow || !$(self.cssSelector.jPlayer).data("jPlayer").status.paused) {
						self.play(0);
					} else {
						self.select(0);
					}

					$(this).slideDown(self.options.playlistOptions.shuffleTime);
				});
			}
		},
		blur: function(that) {
			if($(this.cssSelector.jPlayer).jPlayer("option", "autoBlur")) {
				$(that).blur();
			}
		}
	};
})(jQuery);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2014 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.9.2
 * Date: 14th December 2014
 */

/* Support for Zepto 1.0 compiled with optional data module.
 * For AMD or NODE/CommonJS support, you will need to manually switch the related 2 lines in the code below.
 * Search terms: "jQuery Switch" and "Zepto Switch"
 */

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // jQuery Switch
		// define(['zepto'], factory); // Zepto Switch
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery')); // jQuery Switch
		//factory(require('zepto')); // Zepto Switch
	} else {
		// Browser globals
		if(root.jQuery) { // Use jQuery if available
			factory(root.jQuery);
		} else { // Otherwise, use Zepto
			factory(root.Zepto);
		}
	}
}(this, function ($, undefined) {

	// Adapted from jquery.ui.widget.js (1.8.7): $.widget.bridge - Tweaked $.data(this,XYZ) to $(this).data(XYZ) for Zepto
	$.fn.jPlayer = function( options ) {
		var name = "jPlayer";
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $(this).data( name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $(this).data( name );
				if ( instance ) {
					// instance.option( options || {} )._init(); // Orig jquery.ui.widget.js code: Not recommend for jPlayer. ie., Applying new options to an existing instance (via the jPlayer constructor) and performing the _init(). The _init() is what concerns me. It would leave a lot of event handlers acting on jPlayer instance and the interface.
					instance.option( options || {} ); // The new constructor only changes the options. Changing options only has basic support atm.
				} else {
					$(this).data( name, new $.jPlayer( options, this ) );
				}
			});
		}

		return returnValue;
	};

	$.jPlayer = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this.element = $(element);
			this.options = $.extend(true, {},
				this.options,
				options
			);
			var self = this;
			this.element.bind( "remove.jPlayer", function() {
				self.destroy();
			});
			this._init();
		}
	};
	// End of: (Adapted from jquery.ui.widget.js (1.8.7))

	// Zepto is missing one of the animation methods.
	if(typeof $.fn.stop !== 'function') {
		$.fn.stop = function() {};
	}

	// Emulated HTML5 methods and properties
	$.jPlayer.emulateMethods = "load play pause";
	$.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
	$.jPlayer.emulateOptions = "muted volume";

	// Reserved event names generated by jPlayer that are not part of the HTML5 Media element spec
	$.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";

	// Events generated by jPlayer
	$.jPlayer.event = {};
	$.each(
		[
			'ready',
			'setmedia', // Fires when the media is set
			'flashreset', // Similar to the ready event if the Flash solution is set to display:none and then shown again or if it's reloaded for another reason by the browser. For example, using CSS position:fixed on Firefox for the full screen feature.
			'resize', // Occurs when the size changes through a full/restore screen operation or if the size/sizeFull options are changed.
			'repeat', // Occurs when the repeat status changes. Usually through clicks on the repeat button of the interface.
			'click', // Occurs when the user clicks on one of the following: poster image, html video, flash video.
			'error', // Event error code in event.jPlayer.error.type. See $.jPlayer.error
			'warning', // Event warning code in event.jPlayer.warning.type. See $.jPlayer.warning

			// Other events match HTML5 spec.
			'loadstart',
			'progress',
			'suspend',
			'abort',
			'emptied',
			'stalled',
			'play',
			'pause',
			'loadedmetadata',
			'loadeddata',
			'waiting',
			'playing',
			'canplay',
			'canplaythrough',
			'seeking',
			'seeked',
			'timeupdate',
			'ended',
			'ratechange',
			'durationchange',
			'volumechange'
		],
		function() {
			$.jPlayer.event[ this ] = 'jPlayer_' + this;
		}
	);

	$.jPlayer.htmlEvent = [ // These HTML events are bubbled through to the jPlayer event, without any internal action.
		"loadstart",
		// "progress", // jPlayer uses internally before bubbling.
		// "suspend", // jPlayer uses internally before bubbling.
		"abort",
		// "error", // jPlayer uses internally before bubbling.
		"emptied",
		"stalled",
		// "play", // jPlayer uses internally before bubbling.
		// "pause", // jPlayer uses internally before bubbling.
		"loadedmetadata",
		// "loadeddata", // jPlayer uses internally before bubbling.
		// "waiting", // jPlayer uses internally before bubbling.
		// "playing", // jPlayer uses internally before bubbling.
		"canplay",
		"canplaythrough"
		// "seeking", // jPlayer uses internally before bubbling.
		// "seeked", // jPlayer uses internally before bubbling.
		// "timeupdate", // jPlayer uses internally before bubbling.
		// "ended", // jPlayer uses internally before bubbling.
		// "ratechange" // jPlayer uses internally before bubbling.
		// "durationchange" // jPlayer uses internally before bubbling.
		// "volumechange" // jPlayer uses internally before bubbling.
	];

	$.jPlayer.pause = function() {
		$.jPlayer.prototype.destroyRemoved();
		$.each($.jPlayer.prototype.instances, function(i, element) {
			if(element.data("jPlayer").status.srcSet) { // Check that media is set otherwise would cause error event.
				element.jPlayer("pause");
			}
		});
	};

	// Default for jPlayer option.timeFormat
	$.jPlayer.timeFormat = {
		showHour: false,
		showMin: true,
		showSec: true,
		padHour: false,
		padMin: true,
		padSec: true,
		sepHour: ":",
		sepMin: ":",
		sepSec: ""
	};
	var ConvertTime = function() {
		this.init();
	};
	ConvertTime.prototype = {
		init: function() {
			this.options = {
				timeFormat: $.jPlayer.timeFormat
			};
		},
		time: function(s) { // function used on jPlayer.prototype._convertTime to enable per instance options.
			s = (s && typeof s === 'number') ? s : 0;

			var myTime = new Date(s * 1000),
				hour = myTime.getUTCHours(),
				min = this.options.timeFormat.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + hour * 60,
				sec = this.options.timeFormat.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + min * 60,
				strHour = (this.options.timeFormat.padHour && hour < 10) ? "0" + hour : hour,
				strMin = (this.options.timeFormat.padMin && min < 10) ? "0" + min : min,
				strSec = (this.options.timeFormat.padSec && sec < 10) ? "0" + sec : sec,
				strTime = "";

			strTime += this.options.timeFormat.showHour ? strHour + this.options.timeFormat.sepHour : "";
			strTime += this.options.timeFormat.showMin ? strMin + this.options.timeFormat.sepMin : "";
			strTime += this.options.timeFormat.showSec ? strSec + this.options.timeFormat.sepSec : "";

			return strTime;
		}
	};
	var myConvertTime = new ConvertTime();
	$.jPlayer.convertTime = function(s) {
		return myConvertTime.time(s);
	};

	// Adapting jQuery 1.4.4 code for jQuery.browser. Required since jQuery 1.3.2 does not detect Chrome as webkit.
	$.jPlayer.uaBrowser = function( userAgent ) {
		var ua = userAgent.toLowerCase();

		// Useragent RegExp
		var rwebkit = /(webkit)[ \/]([\w.]+)/;
		var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
		var rmsie = /(msie) ([\w.]+)/;
		var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	};

	// Platform sniffer for detecting mobile devices
	$.jPlayer.uaPlatform = function( userAgent ) {
		var ua = userAgent.toLowerCase();

		// Useragent RegExp
		var rplatform = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/;
		var rtablet = /(ipad|playbook)/;
		var randroid = /(android)/;
		var rmobile = /(mobile)/;

		var platform = rplatform.exec( ua ) || [];
		var tablet = rtablet.exec( ua ) ||
			!rmobile.exec( ua ) && randroid.exec( ua ) ||
			[];

		if(platform[1]) {
			platform[1] = platform[1].replace(/\s/g, "_"); // Change whitespace to underscore. Enables dot notation.
		}

		return { platform: platform[1] || "", tablet: tablet[1] || "" };
	};

	$.jPlayer.browser = {
	};
	$.jPlayer.platform = {
	};

	var browserMatch = $.jPlayer.uaBrowser(navigator.userAgent);
	if ( browserMatch.browser ) {
		$.jPlayer.browser[ browserMatch.browser ] = true;
		$.jPlayer.browser.version = browserMatch.version;
	}
	var platformMatch = $.jPlayer.uaPlatform(navigator.userAgent);
	if ( platformMatch.platform ) {
		$.jPlayer.platform[ platformMatch.platform ] = true;
		$.jPlayer.platform.mobile = !platformMatch.tablet;
		$.jPlayer.platform.tablet = !!platformMatch.tablet;
	}

	// Internet Explorer (IE) Browser Document Mode Sniffer. Based on code at:
	// http://msdn.microsoft.com/en-us/library/cc288325%28v=vs.85%29.aspx#GetMode
	$.jPlayer.getDocMode = function() {
		var docMode;
		if ($.jPlayer.browser.msie) {
			if (document.documentMode) { // IE8 or later
				docMode = document.documentMode;
			} else { // IE 5-7
				docMode = 5; // Assume quirks mode unless proven otherwise
				if (document.compatMode) {
					if (document.compatMode === "CSS1Compat") {
						docMode = 7; // standards mode
					}
				}
			}
		}
		return docMode;
	};
	$.jPlayer.browser.documentMode = $.jPlayer.getDocMode();

	$.jPlayer.nativeFeatures = {
		init: function() {

			/* Fullscreen function naming influenced by W3C naming.
			 * No support for: Mozilla Proposal: https://wiki.mozilla.org/Gecko:FullScreenAPI
			 */

			var d = document,
				v = d.createElement('video'),
				spec = {
					// http://www.w3.org/TR/fullscreen/
					w3c: [
						'fullscreenEnabled',
						'fullscreenElement',
						'requestFullscreen',
						'exitFullscreen',
						'fullscreenchange',
						'fullscreenerror'
					],
					// https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
					moz: [
						'mozFullScreenEnabled',
						'mozFullScreenElement',
						'mozRequestFullScreen',
						'mozCancelFullScreen',
						'mozfullscreenchange',
						'mozfullscreenerror'
					],
					// http://developer.apple.com/library/safari/#documentation/WebKit/Reference/ElementClassRef/Element/Element.html
					// http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/DocumentAdditionsReference/DocumentAdditions/DocumentAdditions.html
					webkit: [
						'',
						'webkitCurrentFullScreenElement',
						'webkitRequestFullScreen',
						'webkitCancelFullScreen',
						'webkitfullscreenchange',
						''
					],
					// http://developer.apple.com/library/safari/#documentation/AudioVideo/Reference/HTMLVideoElementClassReference/HTMLVideoElement/HTMLVideoElement.html
					// https://developer.apple.com/library/safari/samplecode/HTML5VideoEventFlow/Listings/events_js.html#//apple_ref/doc/uid/DTS40010085-events_js-DontLinkElementID_5
					// Events: 'webkitbeginfullscreen' and 'webkitendfullscreen'
					webkitVideo: [
						'webkitSupportsFullscreen',
						'webkitDisplayingFullscreen',
						'webkitEnterFullscreen',
						'webkitExitFullscreen',
						'',
						''
					],
					ms: [
						'',
						'msFullscreenElement',
						'msRequestFullscreen',
						'msExitFullscreen',
						'MSFullscreenChange',
						'MSFullscreenError'
					]
				},
				specOrder = [
					'w3c',
					'moz',
					'webkit',
					'webkitVideo',
					'ms'
				],
				fs, i, il;

			this.fullscreen = fs = {
				support: {
					w3c: !!d[spec.w3c[0]],
					moz: !!d[spec.moz[0]],
					webkit: typeof d[spec.webkit[3]] === 'function',
					webkitVideo: typeof v[spec.webkitVideo[2]] === 'function',
					ms: typeof v[spec.ms[2]] === 'function'
				},
				used: {}
			};

			// Store the name of the spec being used and as a handy boolean.
			for(i = 0, il = specOrder.length; i < il; i++) {
				var n = specOrder[i];
				if(fs.support[n]) {
					fs.spec = n;
					fs.used[n] = true;
					break;
				}
			}

			if(fs.spec) {
				var s = spec[fs.spec];
				fs.api = {
					fullscreenEnabled: true,
					fullscreenElement: function(elem) {
						elem = elem ? elem : d; // Video element required for webkitVideo
						return elem[s[1]];
					},
					requestFullscreen: function(elem) {
						return elem[s[2]](); // Chrome and Opera want parameter (Element.ALLOW_KEYBOARD_INPUT) but Safari fails if flag used.
					},
					exitFullscreen: function(elem) {
						elem = elem ? elem : d; // Video element required for webkitVideo
						return elem[s[3]]();
					}
				};
				fs.event = {
					fullscreenchange: s[4],
					fullscreenerror: s[5]
				};
			} else {
				fs.api = {
					fullscreenEnabled: false,
					fullscreenElement: function() {
						return null;
					},
					requestFullscreen: function() {},
					exitFullscreen: function() {}
				};
				fs.event = {};
			}
		}
	};
	$.jPlayer.nativeFeatures.init();

	// The keyboard control system.

	// The current jPlayer instance in focus.
	$.jPlayer.focus = null;

	// The list of element node names to ignore with key controls.
	$.jPlayer.keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";

	// The function that deals with key presses.
	var keyBindings = function(event) {
		var f = $.jPlayer.focus,
			ignoreKey;

		// A jPlayer instance must be in focus. ie., keyEnabled and the last one played.
		if(f) {
			// What generated the key press?
			$.each( $.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(i, name) {
				// The strings should already be uppercase.
				if(event.target.nodeName.toUpperCase() === name.toUpperCase()) {
					ignoreKey = true;
					return false; // exit each.
				}
			});
			if(!ignoreKey) {
				// See if the key pressed matches any of the bindings.
				$.each(f.options.keyBindings, function(action, binding) {
					// The binding could be a null when the default has been disabled. ie., 1st clause in if()
					if(
						(binding && $.isFunction(binding.fn)) &&
						((typeof binding.key === 'number' && event.which === binding.key) ||
						(typeof binding.key === 'string' && event.key === binding.key))
					) {
						event.preventDefault(); // Key being used by jPlayer, so prevent default operation.
						binding.fn(f);
						return false; // exit each.
					}
				});
			}
		}
	};

	$.jPlayer.keys = function(en) {
		var event = "keydown.jPlayer";
		// Remove any binding, just in case enabled more than once.
		$(document.documentElement).unbind(event);
		if(en) {
			$(document.documentElement).bind(event, keyBindings);
		}
	};

	// Enable the global key control handler ready for any jPlayer instance with the keyEnabled option enabled.
	$.jPlayer.keys(true);

	$.jPlayer.prototype = {
		count: 0, // Static Variable: Change it via prototype.
		version: { // Static Object
			script: "2.9.2",
			needFlash: "2.9.0",
			flash: "unknown"
		},
		options: { // Instanced in $.jPlayer() constructor
			swfPath: "js", // Path to jquery.jplayer.swf. Can be relative, absolute or server root relative.
			solution: "html, flash", // Valid solutions: html, flash, aurora. Order defines priority. 1st is highest,
			supplied: "mp3", // Defines which formats jPlayer will try and support and the priority by the order. 1st is highest,
			auroraFormats: "wav", // List the aurora.js codecs being loaded externally. Its core supports "wav". Specify format in jPlayer context. EG., The aac.js codec gives the "m4a" format.
			preload: 'metadata',  // HTML5 Spec values: none, metadata, auto.
			volume: 0.8, // The volume. Number 0 to 1.
			muted: false,
			remainingDuration: false, // When true, the remaining time is shown in the duration GUI element.
			toggleDuration: false, // When true, clicks on the duration toggle between the duration and remaining display.
			captureDuration: true, // When true, clicks on the duration are captured and no longer propagate up the DOM.
			playbackRate: 1,
			defaultPlaybackRate: 1,
			minPlaybackRate: 0.5,
			maxPlaybackRate: 4,
			wmode: "opaque", // Valid wmode: window, transparent, opaque, direct, gpu. 
			backgroundColor: "#000000", // To define the jPlayer div and Flash background color.
			cssSelectorAncestor: "#jp_container_1",
			cssSelector: { // * denotes properties that should only be required when video media type required. _cssSelector() would require changes to enable splitting these into Audio and Video defaults.
				videoPlay: ".jp-video-play", // *
				play: ".jp-play",
				pause: ".jp-pause",
				stop: ".jp-stop",
				seekBar: ".jp-seek-bar",
				playBar: ".jp-play-bar",
				mute: ".jp-mute",
				unmute: ".jp-unmute",
				volumeBar: ".jp-volume-bar",
				volumeBarValue: ".jp-volume-bar-value",
				volumeMax: ".jp-volume-max",
				playbackRateBar: ".jp-playback-rate-bar",
				playbackRateBarValue: ".jp-playback-rate-bar-value",
				currentTime: ".jp-current-time",
				duration: ".jp-duration",
				title: ".jp-title",
				fullScreen: ".jp-full-screen", // *
				restoreScreen: ".jp-restore-screen", // *
				repeat: ".jp-repeat",
				repeatOff: ".jp-repeat-off",
				gui: ".jp-gui", // The interface used with autohide feature.
				noSolution: ".jp-no-solution" // For error feedback when jPlayer cannot find a solution.
			},
			stateClass: { // Classes added to the cssSelectorAncestor to indicate the state.
				playing: "jp-state-playing",
				seeking: "jp-state-seeking",
				muted: "jp-state-muted",
				looped: "jp-state-looped",
				fullScreen: "jp-state-full-screen",
				noVolume: "jp-state-no-volume"
			},
			useStateClassSkin: false, // A state class skin relies on the state classes to change the visual appearance. The single control toggles the effect, for example: play then pause, mute then unmute.
			autoBlur: true, // GUI control handlers will drop focus after clicks.
			smoothPlayBar: false, // Smooths the play bar transitions, which affects clicks and short media with big changes per second.
			fullScreen: false, // Native Full Screen
			fullWindow: false,
			autohide: {
				restored: false, // Controls the interface autohide feature.
				full: true, // Controls the interface autohide feature.
				fadeIn: 200, // Milliseconds. The period of the fadeIn anim.
				fadeOut: 600, // Milliseconds. The period of the fadeOut anim.
				hold: 1000 // Milliseconds. The period of the pause before autohide beings.
			},
			loop: false,
			repeat: function(event) { // The default jPlayer repeat event handler
				if(event.jPlayer.options.loop) {
					$(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
						$(this).jPlayer("play");
					});
				} else {
					$(this).unbind(".jPlayerRepeat");
				}
			},
			nativeVideoControls: {
				// Works well on standard browsers.
				// Phone and tablet browsers can have problems with the controls disappearing.
			},
			noFullWindow: {
				msie: /msie [0-6]\./,
				ipad: /ipad.*?os [0-4]\./,
				iphone: /iphone/,
				ipod: /ipod/,
				android_pad: /android [0-3]\.(?!.*?mobile)/,
				android_phone: /(?=.*android)(?!.*chrome)(?=.*mobile)/,
				blackberry: /blackberry/,
				windows_ce: /windows ce/,
				iemobile: /iemobile/,
				webos: /webos/
			},
			noVolume: {
				ipad: /ipad/,
				iphone: /iphone/,
				ipod: /ipod/,
				android_pad: /android(?!.*?mobile)/,
				android_phone: /android.*?mobile/,
				blackberry: /blackberry/,
				windows_ce: /windows ce/,
				iemobile: /iemobile/,
				webos: /webos/,
				playbook: /playbook/
			},
			timeFormat: {
				// Specific time format for this instance. The supported options are defined in $.jPlayer.timeFormat
				// For the undefined options we use the default from $.jPlayer.timeFormat
			},
			keyEnabled: false, // Enables keyboard controls.
			audioFullScreen: false, // Enables keyboard controls to enter full screen with audio media.
			keyBindings: { // The key control object, defining the key codes and the functions to execute.
				// The parameter, f = $.jPlayer.focus, will be checked truethy before attempting to call any of these functions.
				// Properties may be added to this object, in key/fn pairs, to enable other key controls. EG, for the playlist add-on.
				play: {
					key: 80, // p
					fn: function(f) {
						if(f.status.paused) {
							f.play();
						} else {
							f.pause();
						}
					}
				},
				fullScreen: {
					key: 70, // f
					fn: function(f) {
						if(f.status.video || f.options.audioFullScreen) {
							f._setOption("fullScreen", !f.options.fullScreen);
						}
					}
				},
				muted: {
					key: 77, // m
					fn: function(f) {
						f._muted(!f.options.muted);
					}
				},
				volumeUp: {
					key: 190, // .
					fn: function(f) {
						f.volume(f.options.volume + 0.1);
					}
				},
				volumeDown: {
					key: 188, // ,
					fn: function(f) {
						f.volume(f.options.volume - 0.1);
					}
				},
				loop: {
					key: 76, // l
					fn: function(f) {
						f._loop(!f.options.loop);
					}
				}
			},
			verticalVolume: false, // Calculate volume from the bottom of the volume bar. Default is from the left. Also volume affects either width or height.
			verticalPlaybackRate: false,
			globalVolume: false, // Set to make volume and muted changes affect all jPlayer instances with this option enabled
			idPrefix: "jp", // Prefix for the ids of html elements created by jPlayer. For flash, this must not include characters: . - + * / \
			noConflict: "jQuery",
			emulateHtml: false, // Emulates the HTML5 Media element on the jPlayer element.
			consoleAlerts: true, // Alerts are sent to the console.log() instead of alert().
			errorAlerts: false,
			warningAlerts: false
		},
		optionsAudio: {
			size: {
				width: "0px",
				height: "0px",
				cssClass: ""
			},
			sizeFull: {
				width: "0px",
				height: "0px",
				cssClass: ""
			}
		},
		optionsVideo: {
			size: {
				width: "480px",
				height: "270px",
				cssClass: "jp-video-270p"
			},
			sizeFull: {
				width: "100%",
				height: "100%",
				cssClass: "jp-video-full"
			}
		},
		instances: {}, // Static Object
		status: { // Instanced in _init()
			src: "",
			media: {},
			paused: true,
			format: {},
			formatType: "",
			waitForPlay: true, // Same as waitForLoad except in case where preloading.
			waitForLoad: true,
			srcSet: false,
			video: false, // True if playing a video
			seekPercent: 0,
			currentPercentRelative: 0,
			currentPercentAbsolute: 0,
			currentTime: 0,
			duration: 0,
			remaining: 0,
			videoWidth: 0, // Intrinsic width of the video in pixels.
			videoHeight: 0, // Intrinsic height of the video in pixels.
			readyState: 0,
			networkState: 0,
			playbackRate: 1, // Warning - Now both an option and a status property
			ended: 0

/*		Persistant status properties created dynamically at _init():
			width
			height
			cssClass
			nativeVideoControls
			noFullWindow
			noVolume
			playbackRateEnabled // Warning - Technically, we can have both Flash and HTML, so this might not be correct if the Flash is active. That is a niche case.
*/
		},

		internal: { // Instanced in _init()
			ready: false
			// instance: undefined
			// domNode: undefined
			// htmlDlyCmdId: undefined
			// autohideId: undefined
			// mouse: undefined
			// cmdsIgnored
		},
		solution: { // Static Object: Defines the solutions built in jPlayer.
			html: true,
			aurora: true,
			flash: true
		},
		// 'MPEG-4 support' : canPlayType('video/mp4; codecs="mp4v.20.8"')
		format: { // Static Object
			mp3: {
				codec: 'audio/mpeg',
				flashCanPlay: true,
				media: 'audio'
			},
			m4a: { // AAC / MP4
				codec: 'audio/mp4; codecs="mp4a.40.2"',
				flashCanPlay: true,
				media: 'audio'
			},
			m3u8a: { // AAC / MP4 / Apple HLS
				codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
				flashCanPlay: false,
				media: 'audio'
			},
			m3ua: { // M3U
				codec: 'audio/mpegurl',
				flashCanPlay: false,
				media: 'audio'
			},
			oga: { // OGG
				codec: 'audio/ogg; codecs="vorbis, opus"',
				flashCanPlay: false,
				media: 'audio'
			},
			flac: { // FLAC
				codec: 'audio/x-flac',
				flashCanPlay: false,
				media: 'audio'
			},
			wav: { // PCM
				codec: 'audio/wav; codecs="1"',
				flashCanPlay: false,
				media: 'audio'
			},
			webma: { // WEBM
				codec: 'audio/webm; codecs="vorbis"',
				flashCanPlay: false,
				media: 'audio'
			},
			fla: { // FLV / F4A
				codec: 'audio/x-flv',
				flashCanPlay: true,
				media: 'audio'
			},
			rtmpa: { // RTMP AUDIO
				codec: 'audio/rtmp; codecs="rtmp"',
				flashCanPlay: true,
				media: 'audio'
			},
			m4v: { // H.264 / MP4
				codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				flashCanPlay: true,
				media: 'video'
			},
			m3u8v: { // H.264 / AAC / MP4 / Apple HLS
				codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
				flashCanPlay: false,
				media: 'video'
			},
			m3uv: { // M3U
				codec: 'audio/mpegurl',
				flashCanPlay: false,
				media: 'video'
			},
			ogv: { // OGG
				codec: 'video/ogg; codecs="theora, vorbis"',
				flashCanPlay: false,
				media: 'video'
			},
			webmv: { // WEBM
				codec: 'video/webm; codecs="vorbis, vp8"',
				flashCanPlay: false,
				media: 'video'
			},
			flv: { // FLV / F4V
				codec: 'video/x-flv',
				flashCanPlay: true,
				media: 'video'
			},
			rtmpv: { // RTMP VIDEO
				codec: 'video/rtmp; codecs="rtmp"',
				flashCanPlay: true,
				media: 'video'
			}
		},
		_init: function() {
			var self = this;
			
			this.element.empty();
			
			this.status = $.extend({}, this.status); // Copy static to unique instance.
			this.internal = $.extend({}, this.internal); // Copy static to unique instance.

			// Initialize the time format
			this.options.timeFormat = $.extend({}, $.jPlayer.timeFormat, this.options.timeFormat);

			// On iOS, assume commands will be ignored before user initiates them.
			this.internal.cmdsIgnored = $.jPlayer.platform.ipad || $.jPlayer.platform.iphone || $.jPlayer.platform.ipod;

			this.internal.domNode = this.element.get(0);

			// Add key bindings focus to 1st jPlayer instanced with key control enabled.
			if(this.options.keyEnabled && !$.jPlayer.focus) {
				$.jPlayer.focus = this;
			}

			// A fix for Android where older (2.3) and even some 4.x devices fail to work when changing the *audio* SRC and then playing immediately.
			this.androidFix = {
				setMedia: false, // True when media set
				play: false, // True when a progress event will instruct the media to play
				pause: false, // True when a progress event will instruct the media to pause at a time.
				time: NaN // The play(time) parameter
			};
			if($.jPlayer.platform.android) {
				this.options.preload = this.options.preload !== 'auto' ? 'metadata' : 'auto'; // Default to metadata, but allow auto.
			}

			this.formats = []; // Array based on supplied string option. Order defines priority.
			this.solutions = []; // Array based on solution string option. Order defines priority.
			this.require = {}; // Which media types are required: video, audio.
			
			this.htmlElement = {}; // DOM elements created by jPlayer
			this.html = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			this.html.audio = {};
			this.html.video = {};
			this.aurora = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			this.aurora.formats = [];
			this.aurora.properties = [];
			this.flash = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			
			this.css = {};
			this.css.cs = {}; // Holds the css selector strings
			this.css.jq = {}; // Holds jQuery selectors. ie., $(css.cs.method)

			this.ancestorJq = []; // Holds jQuery selector of cssSelectorAncestor. Init would use $() instead of [], but it is only 1.4+

			this.options.volume = this._limitValue(this.options.volume, 0, 1); // Limit volume value's bounds.

			// Create the formats array, with prority based on the order of the supplied formats string
			$.each(this.options.supplied.toLowerCase().split(","), function(index1, value1) {
				var format = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.format[format]) { // Check format is valid.
					var dupFound = false;
					$.each(self.formats, function(index2, value2) { // Check for duplicates
						if(format === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.formats.push(format);
					}
				}
			});

			// Create the solutions array, with prority based on the order of the solution string
			$.each(this.options.solution.toLowerCase().split(","), function(index1, value1) {
				var solution = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.solution[solution]) { // Check solution is valid.
					var dupFound = false;
					$.each(self.solutions, function(index2, value2) { // Check for duplicates
						if(solution === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.solutions.push(solution);
					}
				}
			});
				
			// Create Aurora.js formats array
			$.each(this.options.auroraFormats.toLowerCase().split(","), function(index1, value1) {
				var format = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.format[format]) { // Check format is valid.
					var dupFound = false;
					$.each(self.aurora.formats, function(index2, value2) { // Check for duplicates
						if(format === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.aurora.formats.push(format);
					}
				}
			});

			this.internal.instance = "jp_" + this.count;
			this.instances[this.internal.instance] = this.element;

			// Check the jPlayer div has an id and create one if required. Important for Flash to know the unique id for comms.
			if(!this.element.attr("id")) {
				this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
			}

			this.internal.self = $.extend({}, {
				id: this.element.attr("id"),
				jq: this.element
			});
			this.internal.audio = $.extend({}, {
				id: this.options.idPrefix + "_audio_" + this.count,
				jq: undefined
			});
			this.internal.video = $.extend({}, {
				id: this.options.idPrefix + "_video_" + this.count,
				jq: undefined
			});
			this.internal.flash = $.extend({}, {
				id: this.options.idPrefix + "_flash_" + this.count,
				jq: undefined,
				swf: this.options.swfPath + (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "jquery.jplayer.swf" : "")
			});
			this.internal.poster = $.extend({}, {
				id: this.options.idPrefix + "_poster_" + this.count,
				jq: undefined
			});

			// Register listeners defined in the constructor
			$.each($.jPlayer.event, function(eventName,eventType) {
				if(self.options[eventName] !== undefined) {
					self.element.bind(eventType + ".jPlayer", self.options[eventName]); // With .jPlayer namespace.
					self.options[eventName] = undefined; // Destroy the handler pointer copy on the options. Reason, events can be added/removed in other ways so this could be obsolete and misleading.
				}
			});

			// Determine if we require solutions for audio, video or both media types.
			this.require.audio = false;
			this.require.video = false;
			$.each(this.formats, function(priority, format) {
				self.require[self.format[format].media] = true;
			});

			// Now required types are known, finish the options default settings.
			if(this.require.video) {
				this.options = $.extend(true, {},
					this.optionsVideo,
					this.options
				);
			} else {
				this.options = $.extend(true, {},
					this.optionsAudio,
					this.options
				);
			}
			this._setSize(); // update status and jPlayer element size

			// Determine the status for Blocklisted options.
			this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
			this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
			this.status.noVolume = this._uaBlocklist(this.options.noVolume);

			// Create event handlers if native fullscreen is supported
			if($.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled) {
				this._fullscreenAddEventListeners();
			}

			// The native controls are only for video and are disabled when audio is also used.
			this._restrictNativeVideoControls();

			// Create the poster image.
			this.htmlElement.poster = document.createElement('img');
			this.htmlElement.poster.id = this.internal.poster.id;
			this.htmlElement.poster.onload = function() { // Note that this did not work on Firefox 3.6: poster.addEventListener("onload", function() {}, false); Did not investigate x-browser.
				if(!self.status.video || self.status.waitForPlay) {
					self.internal.poster.jq.show();
				}
			};
			this.element.append(this.htmlElement.poster);
			this.internal.poster.jq = $("#" + this.internal.poster.id);
			this.internal.poster.jq.css({'width': this.status.width, 'height': this.status.height});
			this.internal.poster.jq.hide();
			this.internal.poster.jq.bind("click.jPlayer", function() {
				self._trigger($.jPlayer.event.click);
			});
			
			// Generate the required media elements
			this.html.audio.available = false;
			if(this.require.audio) { // If a supplied format is audio
				this.htmlElement.audio = document.createElement('audio');
				this.htmlElement.audio.id = this.internal.audio.id;
				this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio); // Test is for IE9 on Win Server 2008.
			}
			this.html.video.available = false;
			if(this.require.video) { // If a supplied format is video
				this.htmlElement.video = document.createElement('video');
				this.htmlElement.video.id = this.internal.video.id;
				this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video); // Test is for IE9 on Win Server 2008.
			}

			this.flash.available = this._checkForFlash(10.1);

			this.html.canPlay = {};
			this.aurora.canPlay = {};
			this.flash.canPlay = {};
			$.each(this.formats, function(priority, format) {
				self.html.canPlay[format] = self.html[self.format[format].media].available && "" !== self.htmlElement[self.format[format].media].canPlayType(self.format[format].codec);
				self.aurora.canPlay[format] = ($.inArray(format, self.aurora.formats) > -1);
				self.flash.canPlay[format] = self.format[format].flashCanPlay && self.flash.available;
			});
			this.html.desired = false;
			this.aurora.desired = false;
			this.flash.desired = false;
			$.each(this.solutions, function(solutionPriority, solution) {
				if(solutionPriority === 0) {
					self[solution].desired = true;
				} else {
					var audioCanPlay = false;
					var videoCanPlay = false;
					$.each(self.formats, function(formatPriority, format) {
						if(self[self.solutions[0]].canPlay[format]) { // The other solution can play
							if(self.format[format].media === 'video') {
								videoCanPlay = true;
							} else {
								audioCanPlay = true;
							}
						}
					});
					self[solution].desired = (self.require.audio && !audioCanPlay) || (self.require.video && !videoCanPlay);
				}
			});
			// This is what jPlayer will support, based on solution and supplied.
			this.html.support = {};
			this.aurora.support = {};
			this.flash.support = {};
			$.each(this.formats, function(priority, format) {
				self.html.support[format] = self.html.canPlay[format] && self.html.desired;
				self.aurora.support[format] = self.aurora.canPlay[format] && self.aurora.desired;
				self.flash.support[format] = self.flash.canPlay[format] && self.flash.desired;
			});
			// If jPlayer is supporting any format in a solution, then the solution is used.
			this.html.used = false;
			this.aurora.used = false;
			this.flash.used = false;
			$.each(this.solutions, function(solutionPriority, solution) {
				$.each(self.formats, function(formatPriority, format) {
					if(self[solution].support[format]) {
						self[solution].used = true;
						return false;
					}
				});
			});

			// Init solution active state and the event gates to false.
			this._resetActive();
			this._resetGate();

			// Set up the css selectors for the control and feedback entities.
			this._cssSelectorAncestor(this.options.cssSelectorAncestor);
			
			// If neither html nor aurora nor flash are being used by this browser, then media playback is not possible. Trigger an error event.
			if(!(this.html.used || this.aurora.used || this.flash.used)) {
				this._error( {
					type: $.jPlayer.error.NO_SOLUTION, 
					context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
					message: $.jPlayer.errorMsg.NO_SOLUTION,
					hint: $.jPlayer.errorHint.NO_SOLUTION
				});
				if(this.css.jq.noSolution.length) {
					this.css.jq.noSolution.show();
				}
			} else {
				if(this.css.jq.noSolution.length) {
					this.css.jq.noSolution.hide();
				}
			}

			// Add the flash solution if it is being used.
			if(this.flash.used) {
				var htmlObj,
				flashVars = 'jQuery=' + encodeURI(this.options.noConflict) + '&id=' + encodeURI(this.internal.self.id) + '&vol=' + this.options.volume + '&muted=' + this.options.muted;

				// Code influenced by SWFObject 2.2: http://code.google.com/p/swfobject/
				// Non IE browsers have an initial Flash size of 1 by 1 otherwise the wmode affected the Flash ready event. 

				if($.jPlayer.browser.msie && (Number($.jPlayer.browser.version) < 9 || $.jPlayer.browser.documentMode < 9)) {
					var objStr = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>';

					var paramStr = [
						'<param name="movie" value="' + this.internal.flash.swf + '" />',
						'<param name="FlashVars" value="' + flashVars + '" />',
						'<param name="allowScriptAccess" value="always" />',
						'<param name="bgcolor" value="' + this.options.backgroundColor + '" />',
						'<param name="wmode" value="' + this.options.wmode + '" />'
					];

					htmlObj = document.createElement(objStr);
					for(var i=0; i < paramStr.length; i++) {
						htmlObj.appendChild(document.createElement(paramStr[i]));
					}
				} else {
					var createParam = function(el, n, v) {
						var p = document.createElement("param");
						p.setAttribute("name", n);	
						p.setAttribute("value", v);
						el.appendChild(p);
					};

					htmlObj = document.createElement("object");
					htmlObj.setAttribute("id", this.internal.flash.id);
					htmlObj.setAttribute("name", this.internal.flash.id);
					htmlObj.setAttribute("data", this.internal.flash.swf);
					htmlObj.setAttribute("type", "application/x-shockwave-flash");
					htmlObj.setAttribute("width", "1"); // Non-zero
					htmlObj.setAttribute("height", "1"); // Non-zero
					htmlObj.setAttribute("tabindex", "-1");
					createParam(htmlObj, "flashvars", flashVars);
					createParam(htmlObj, "allowscriptaccess", "always");
					createParam(htmlObj, "bgcolor", this.options.backgroundColor);
					createParam(htmlObj, "wmode", this.options.wmode);
				}

				this.element.append(htmlObj);
				this.internal.flash.jq = $(htmlObj);
			}

			// Setup playbackRate ability before using _addHtmlEventListeners()
			if(this.html.used && !this.flash.used) { // If only HTML
				// Using the audio element capabilities for playbackRate. ie., Assuming video element is the same.
				this.status.playbackRateEnabled = this._testPlaybackRate('audio');
			} else {
				this.status.playbackRateEnabled = false;
			}

			this._updatePlaybackRate();

			// Add the HTML solution if being used.
			if(this.html.used) {

				// The HTML Audio handlers
				if(this.html.audio.available) {
					this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio);
					this.element.append(this.htmlElement.audio);
					this.internal.audio.jq = $("#" + this.internal.audio.id);
				}

				// The HTML Video handlers
				if(this.html.video.available) {
					this._addHtmlEventListeners(this.htmlElement.video, this.html.video);
					this.element.append(this.htmlElement.video);
					this.internal.video.jq = $("#" + this.internal.video.id);
					if(this.status.nativeVideoControls) {
						this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
					} else {
						this.internal.video.jq.css({'width':'0px', 'height':'0px'}); // Using size 0x0 since a .hide() causes issues in iOS
					}
					this.internal.video.jq.bind("click.jPlayer", function() {
						self._trigger($.jPlayer.event.click);
					});
				}
			}
			
			// Add the Aurora.js solution if being used.
			if(this.aurora.used) {
				// Aurora.js player need to be created for each media, see setMedia function.
			}

			// Create the bridge that emulates the HTML Media element on the jPlayer DIV
			if( this.options.emulateHtml ) {
				this._emulateHtmlBridge();
			}

			if((this.html.used || this.aurora.used) && !this.flash.used) { // If only HTML, then emulate flash ready() call after 100ms.
				setTimeout( function() {
					self.internal.ready = true;
					self.version.flash = "n/a";
					self._trigger($.jPlayer.event.repeat); // Trigger the repeat event so its handler can initialize itself with the loop option.
					self._trigger($.jPlayer.event.ready);
				}, 100);
			}

			// Initialize the interface components with the options.
			this._updateNativeVideoControls();
			// The other controls are now setup in _cssSelectorAncestor()
			if(this.css.jq.videoPlay.length) {
				this.css.jq.videoPlay.hide();
			}

			$.jPlayer.prototype.count++; // Change static variable via prototype.
		},
		destroy: function() {
			// MJP: The background change remains. Would need to store the original to restore it correctly.
			// MJP: The jPlayer element's size change remains.

			// Clear the media to reset the GUI and stop any downloads. Streams on some browsers had persited. (Chrome)
			this.clearMedia();
			// Remove the size/sizeFull cssClass from the cssSelectorAncestor
			this._removeUiClass();
			// Remove the times from the GUI
			if(this.css.jq.currentTime.length) {
				this.css.jq.currentTime.text("");
			}
			if(this.css.jq.duration.length) {
				this.css.jq.duration.text("");
			}
			// Remove any bindings from the interface controls.
			$.each(this.css.jq, function(fn, jq) {
				// Check selector is valid before trying to execute method.
				if(jq.length) {
					jq.unbind(".jPlayer");
				}
			});
			// Remove the click handlers for $.jPlayer.event.click
			this.internal.poster.jq.unbind(".jPlayer");
			if(this.internal.video.jq) {
				this.internal.video.jq.unbind(".jPlayer");
			}
			// Remove the fullscreen event handlers
			this._fullscreenRemoveEventListeners();
			// Remove key bindings
			if(this === $.jPlayer.focus) {
				$.jPlayer.focus = null;
			}
			// Destroy the HTML bridge.
			if(this.options.emulateHtml) {
				this._destroyHtmlBridge();
			}
			this.element.removeData("jPlayer"); // Remove jPlayer data
			this.element.unbind(".jPlayer"); // Remove all event handlers created by the jPlayer constructor
			this.element.empty(); // Remove the inserted child elements
			
			delete this.instances[this.internal.instance]; // Clear the instance on the static instance object
		},
		destroyRemoved: function() { // Destroy any instances that have gone away.
			var self = this;
			$.each(this.instances, function(i, element) {
				if(self.element !== element) { // Do not destroy this instance.
					if(!element.data("jPlayer")) { // Check that element is a real jPlayer.
						element.jPlayer("destroy");
						delete self.instances[i];
					}
				}
			});
		},
		enable: function() { // Plan to implement
			// options.disabled = false
		},
		disable: function () { // Plan to implement
			// options.disabled = true
		},
		_testCanPlayType: function(elem) {
			// IE9 on Win Server 2008 did not implement canPlayType(), but it has the property.
			try {
				elem.canPlayType(this.format.mp3.codec); // The type is irrelevant.
				return true;
			} catch(err) {
				return false;
			}
		},
		_testPlaybackRate: function(type) {
			// type: String 'audio' or 'video'
			var el, rate = 0.5;
			type = typeof type === 'string' ? type : 'audio';
			el = document.createElement(type);
			// Wrapping in a try/catch, just in case older HTML5 browsers throw and error.
			try {
				if('playbackRate' in el) {
					el.playbackRate = rate;
					return el.playbackRate === rate;
				} else {
					return false;
				}
			} catch(err) {
				return false;
			}
		},
		_uaBlocklist: function(list) {
			// list : object with properties that are all regular expressions. Property names are irrelevant.
			// Returns true if the user agent is matched in list.
			var	ua = navigator.userAgent.toLowerCase(),
				block = false;

			$.each(list, function(p, re) {
				if(re && re.test(ua)) {
					block = true;
					return false; // exit $.each.
				}
			});
			return block;
		},
		_restrictNativeVideoControls: function() {
			// Fallback to noFullWindow when nativeVideoControls is true and audio media is being used. Affects when both media types are used.
			if(this.require.audio) {
				if(this.status.nativeVideoControls) {
					this.status.nativeVideoControls = false;
					this.status.noFullWindow = true;
				}
			}
		},
		_updateNativeVideoControls: function() {
			if(this.html.video.available && this.html.used) {
				// Turn the HTML Video controls on/off
				this.htmlElement.video.controls = this.status.nativeVideoControls;
				// Show/hide the jPlayer GUI.
				this._updateAutohide();
				// For when option changed. The poster image is not updated, as it is dealt with in setMedia(). Acceptable degradation since seriously doubt these options will change on the fly. Can again review later.
				if(this.status.nativeVideoControls && this.require.video) {
					this.internal.poster.jq.hide();
					this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
				} else if(this.status.waitForPlay && this.status.video) {
					this.internal.poster.jq.show();
					this.internal.video.jq.css({'width': '0px', 'height': '0px'});
				}
			}
		},
		_addHtmlEventListeners: function(mediaElement, entity) {
			var self = this;
			mediaElement.preload = this.options.preload;
			mediaElement.muted = this.options.muted;
			mediaElement.volume = this.options.volume;

			if(this.status.playbackRateEnabled) {
				mediaElement.defaultPlaybackRate = this.options.defaultPlaybackRate;
				mediaElement.playbackRate = this.options.playbackRate;
			}

			// Create the event listeners
			// Only want the active entity to affect jPlayer and bubble events.
			// Using entity.gate so that object is referenced and gate property always current
			
			mediaElement.addEventListener("progress", function() {
				if(entity.gate) {
					if(self.internal.cmdsIgnored && this.readyState > 0) { // Detect iOS executed the command
						self.internal.cmdsIgnored = false;
					}
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.progress);
				}
			}, false);
			mediaElement.addEventListener("loadeddata", function() {
				if(entity.gate) {
					self.androidFix.setMedia = false; // Disable the fix after the first progress event.
					if(self.androidFix.play) { // Play Android audio - performing the fix.
						self.androidFix.play = false;
						self.play(self.androidFix.time);
					}
					if(self.androidFix.pause) { // Pause Android audio at time - performing the fix.
						self.androidFix.pause = false;
						self.pause(self.androidFix.time);
					}
					self._trigger($.jPlayer.event.loadeddata);
				}
			}, false);
			mediaElement.addEventListener("timeupdate", function() {
				if(entity.gate) {
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.timeupdate);
				}
			}, false);
			mediaElement.addEventListener("durationchange", function() {
				if(entity.gate) {
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.durationchange);
				}
			}, false);
			mediaElement.addEventListener("play", function() {
				if(entity.gate) {
					self._updateButtons(true);
					self._html_checkWaitForPlay(); // So the native controls update this variable and puts the hidden interface in the correct state. Affects toggling native controls.
					self._trigger($.jPlayer.event.play);
				}
			}, false);
			mediaElement.addEventListener("playing", function() {
				if(entity.gate) {
					self._updateButtons(true);
					self._seeked();
					self._trigger($.jPlayer.event.playing);
				}
			}, false);
			mediaElement.addEventListener("pause", function() {
				if(entity.gate) {
					self._updateButtons(false);
					self._trigger($.jPlayer.event.pause);
				}
			}, false);
			mediaElement.addEventListener("waiting", function() {
				if(entity.gate) {
					self._seeking();
					self._trigger($.jPlayer.event.waiting);
				}
			}, false);
			mediaElement.addEventListener("seeking", function() {
				if(entity.gate) {
					self._seeking();
					self._trigger($.jPlayer.event.seeking);
				}
			}, false);
			mediaElement.addEventListener("seeked", function() {
				if(entity.gate) {
					self._seeked();
					self._trigger($.jPlayer.event.seeked);
				}
			}, false);
			mediaElement.addEventListener("volumechange", function() {
				if(entity.gate) {
					// Read the values back from the element as the Blackberry PlayBook shares the volume with the physical buttons master volume control.
					// However, when tested 6th July 2011, those buttons do not generate an event. The physical play/pause button does though.
					self.options.volume = mediaElement.volume;
					self.options.muted = mediaElement.muted;
					self._updateMute();
					self._updateVolume();
					self._trigger($.jPlayer.event.volumechange);
				}
			}, false);
			mediaElement.addEventListener("ratechange", function() {
				if(entity.gate) {
					self.options.defaultPlaybackRate = mediaElement.defaultPlaybackRate;
					self.options.playbackRate = mediaElement.playbackRate;
					self._updatePlaybackRate();
					self._trigger($.jPlayer.event.ratechange);
				}
			}, false);
			mediaElement.addEventListener("suspend", function() { // Seems to be the only way of capturing that the iOS4 browser did not actually play the media from the page code. ie., It needs a user gesture.
				if(entity.gate) {
					self._seeked();
					self._trigger($.jPlayer.event.suspend);
				}
			}, false);
			mediaElement.addEventListener("ended", function() {
				if(entity.gate) {
					// Order of the next few commands are important. Change the time and then pause.
					// Solves a bug in Firefox, where issuing pause 1st causes the media to play from the start. ie., The pause is ignored.
					if(!$.jPlayer.browser.webkit) { // Chrome crashes if you do this in conjunction with a setMedia command in an ended event handler. ie., The playlist demo.
						self.htmlElement.media.currentTime = 0; // Safari does not care about this command. ie., It works with or without this line. (Both Safari and Chrome are Webkit.)
					}
					self.htmlElement.media.pause(); // Pause otherwise a click on the progress bar will play from that point, when it shouldn't, since it stopped playback.
					self._updateButtons(false);
					self._getHtmlStatus(mediaElement, true); // With override true. Otherwise Chrome leaves progress at full.
					self._updateInterface();
					self._trigger($.jPlayer.event.ended);
				}
			}, false);
			mediaElement.addEventListener("error", function() {
				if(entity.gate) {
					self._updateButtons(false);
					self._seeked();
					if(self.status.srcSet) { // Deals with case of clearMedia() causing an error event.
						clearTimeout(self.internal.htmlDlyCmdId); // Clears any delayed commands used in the HTML solution.
						self.status.waitForLoad = true; // Allows the load operation to try again.
						self.status.waitForPlay = true; // Reset since a play was captured.
						if(self.status.video && !self.status.nativeVideoControls) {
							self.internal.video.jq.css({'width':'0px', 'height':'0px'});
						}
						if(self._validString(self.status.media.poster) && !self.status.nativeVideoControls) {
							self.internal.poster.jq.show();
						}
						if(self.css.jq.videoPlay.length) {
							self.css.jq.videoPlay.show();
						}
						self._error( {
							type: $.jPlayer.error.URL,
							context: self.status.src, // this.src shows absolute urls. Want context to show the url given.
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
					}
				}
			}, false);
			// Create all the other event listeners that bubble up to a jPlayer event from html, without being used by jPlayer.
			$.each($.jPlayer.htmlEvent, function(i, eventType) {
				mediaElement.addEventListener(this, function() {
					if(entity.gate) {
						self._trigger($.jPlayer.event[eventType]);
					}
				}, false);
			});
		},
		_addAuroraEventListeners : function(player, entity) {
			var self = this;
			//player.preload = this.options.preload;
			//player.muted = this.options.muted;
			player.volume = this.options.volume * 100;

			// Create the event listeners
			// Only want the active entity to affect jPlayer and bubble events.
			// Using entity.gate so that object is referenced and gate property always current
			
			player.on("progress", function() {
				if(entity.gate) {
					if(self.internal.cmdsIgnored && this.readyState > 0) { // Detect iOS executed the command
						self.internal.cmdsIgnored = false;
					}
					self._getAuroraStatus(player);
					self._updateInterface();
					self._trigger($.jPlayer.event.progress);
					// Progress with song duration, we estimate timeupdate need to be triggered too.
					if (player.duration > 0) {
						self._trigger($.jPlayer.event.timeupdate);
					}
				}
			}, false);
			player.on("ready", function() {
				if(entity.gate) {
					self._trigger($.jPlayer.event.loadeddata);
				}
			}, false);
			player.on("duration", function() {
				if(entity.gate) {
					self._getAuroraStatus(player);
					self._updateInterface();
					self._trigger($.jPlayer.event.durationchange);
				}
			}, false);
			player.on("end", function() {
				if(entity.gate) {
					// Order of the next few commands are important. Change the time and then pause.
					self._updateButtons(false);
					self._getAuroraStatus(player, true);
					self._updateInterface();
					self._trigger($.jPlayer.event.ended);
				}
			}, false);
			player.on("error", function() {
				if(entity.gate) {
					self._updateButtons(false);
					self._seeked();
					if(self.status.srcSet) { // Deals with case of clearMedia() causing an error event.
						self.status.waitForLoad = true; // Allows the load operation to try again.
						self.status.waitForPlay = true; // Reset since a play was captured.
						if(self.status.video && !self.status.nativeVideoControls) {
							self.internal.video.jq.css({'width':'0px', 'height':'0px'});
						}
						if(self._validString(self.status.media.poster) && !self.status.nativeVideoControls) {
							self.internal.poster.jq.show();
						}
						if(self.css.jq.videoPlay.length) {
							self.css.jq.videoPlay.show();
						}
						self._error( {
							type: $.jPlayer.error.URL,
							context: self.status.src, // this.src shows absolute urls. Want context to show the url given.
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
					}
				}
			}, false);
		},
		_getHtmlStatus: function(media, override) {
			var ct = 0, cpa = 0, sp = 0, cpr = 0;

			// Fixes the duration bug in iOS, where the durationchange event occurs when media.duration is not always correct.
			// Fixes the initial duration bug in BB OS7, where the media.duration is infinity and displays as NaN:NaN due to Date() using inifity.
			if(isFinite(media.duration)) {
				this.status.duration = media.duration;
			}

			ct = media.currentTime;
			cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
			if((typeof media.seekable === "object") && (media.seekable.length > 0)) {
				sp = (this.status.duration > 0) ? 100 * media.seekable.end(media.seekable.length-1) / this.status.duration : 100;
				cpr = (this.status.duration > 0) ? 100 * media.currentTime / media.seekable.end(media.seekable.length-1) : 0; // Duration conditional for iOS duration bug. ie., seekable.end is a NaN in that case.
			} else {
				sp = 100;
				cpr = cpa;
			}
			
			if(override) {
				ct = 0;
				cpr = 0;
				cpa = 0;
			}

			this.status.seekPercent = sp;
			this.status.currentPercentRelative = cpr;
			this.status.currentPercentAbsolute = cpa;
			this.status.currentTime = ct;

			this.status.remaining = this.status.duration - this.status.currentTime;

			this.status.videoWidth = media.videoWidth;
			this.status.videoHeight = media.videoHeight;

			this.status.readyState = media.readyState;
			this.status.networkState = media.networkState;
			this.status.playbackRate = media.playbackRate;
			this.status.ended = media.ended;
		},
		_getAuroraStatus: function(player, override) {
			var ct = 0, cpa = 0, sp = 0, cpr = 0;

			this.status.duration = player.duration / 1000;

			ct = player.currentTime / 1000;
			cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
			if(player.buffered > 0) {
				sp = (this.status.duration > 0) ? (player.buffered * this.status.duration) / this.status.duration : 100;
				cpr = (this.status.duration > 0) ? ct / (player.buffered * this.status.duration) : 0;
			} else {
				sp = 100;
				cpr = cpa;
			}
			
			if(override) {
				ct = 0;
				cpr = 0;
				cpa = 0;
			}

			this.status.seekPercent = sp;
			this.status.currentPercentRelative = cpr;
			this.status.currentPercentAbsolute = cpa;
			this.status.currentTime = ct;

			this.status.remaining = this.status.duration - this.status.currentTime;

			this.status.readyState = 4; // status.readyState;
			this.status.networkState = 0; // status.networkState;
			this.status.playbackRate = 1; // status.playbackRate;
			this.status.ended = false; // status.ended;
		},
		_resetStatus: function() {
			this.status = $.extend({}, this.status, $.jPlayer.prototype.status); // Maintains the status properties that persist through a reset.
		},
		_trigger: function(eventType, error, warning) { // eventType always valid as called using $.jPlayer.event.eventType
			var event = $.Event(eventType);
			event.jPlayer = {};
			event.jPlayer.version = $.extend({}, this.version);
			event.jPlayer.options = $.extend(true, {}, this.options); // Deep copy
			event.jPlayer.status = $.extend(true, {}, this.status); // Deep copy
			event.jPlayer.html = $.extend(true, {}, this.html); // Deep copy
			event.jPlayer.aurora = $.extend(true, {}, this.aurora); // Deep copy
			event.jPlayer.flash = $.extend(true, {}, this.flash); // Deep copy
			if(error) {
				event.jPlayer.error = $.extend({}, error);
			}
			if(warning) {
				event.jPlayer.warning = $.extend({}, warning);
			}
			this.element.trigger(event);
		},
		jPlayerFlashEvent: function(eventType, status) { // Called from Flash
			if(eventType === $.jPlayer.event.ready) {
				if(!this.internal.ready) {
					this.internal.ready = true;
					this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Once Flash generates the ready event, minimise to zero as it is not affected by wmode anymore.

					this.version.flash = status.version;
					if(this.version.needFlash !== this.version.flash) {
						this._error( {
							type: $.jPlayer.error.VERSION,
							context: this.version.flash,
							message: $.jPlayer.errorMsg.VERSION + this.version.flash,
							hint: $.jPlayer.errorHint.VERSION
						});
					}
					this._trigger($.jPlayer.event.repeat); // Trigger the repeat event so its handler can initialize itself with the loop option.
					this._trigger(eventType);
				} else {
					// This condition occurs if the Flash is hidden and then shown again.
					// Firefox also reloads the Flash if the CSS position changes. position:fixed is used for full screen.

					// Only do this if the Flash is the solution being used at the moment. Affects Media players where both solution may be being used.
					if(this.flash.gate) {

						// Send the current status to the Flash now that it is ready (available) again.
						if(this.status.srcSet) {

							// Need to read original status before issuing the setMedia command.
							var	currentTime = this.status.currentTime,
								paused = this.status.paused; 

							this.setMedia(this.status.media);
							this.volumeWorker(this.options.volume);
							if(currentTime > 0) {
								if(paused) {
									this.pause(currentTime);
								} else {
									this.play(currentTime);
								}
							}
						}
						this._trigger($.jPlayer.event.flashreset);
					}
				}
			}
			if(this.flash.gate) {
				switch(eventType) {
					case $.jPlayer.event.progress:
						this._getFlashStatus(status);
						this._updateInterface();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.timeupdate:
						this._getFlashStatus(status);
						this._updateInterface();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.play:
						this._seeked();
						this._updateButtons(true);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.pause:
						this._updateButtons(false);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.ended:
						this._updateButtons(false);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.click:
						this._trigger(eventType); // This could be dealt with by the default
						break;
					case $.jPlayer.event.error:
						this.status.waitForLoad = true; // Allows the load operation to try again.
						this.status.waitForPlay = true; // Reset since a play was captured.
						if(this.status.video) {
							this.internal.flash.jq.css({'width':'0px', 'height':'0px'});
						}
						if(this._validString(this.status.media.poster)) {
							this.internal.poster.jq.show();
						}
						if(this.css.jq.videoPlay.length && this.status.video) {
							this.css.jq.videoPlay.show();
						}
						if(this.status.video) { // Set up for another try. Execute before error event.
							this._flash_setVideo(this.status.media);
						} else {
							this._flash_setAudio(this.status.media);
						}
						this._updateButtons(false);
						this._error( {
							type: $.jPlayer.error.URL,
							context:status.src,
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
						break;
					case $.jPlayer.event.seeking:
						this._seeking();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.seeked:
						this._seeked();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.ready:
						// The ready event is handled outside the switch statement.
						// Captured here otherwise 2 ready events would be generated if the ready event handler used setMedia.
						break;
					default:
						this._trigger(eventType);
				}
			}
			return false;
		},
		_getFlashStatus: function(status) {
			this.status.seekPercent = status.seekPercent;
			this.status.currentPercentRelative = status.currentPercentRelative;
			this.status.currentPercentAbsolute = status.currentPercentAbsolute;
			this.status.currentTime = status.currentTime;
			this.status.duration = status.duration;
			this.status.remaining = status.duration - status.currentTime;

			this.status.videoWidth = status.videoWidth;
			this.status.videoHeight = status.videoHeight;

			// The Flash does not generate this information in this release
			this.status.readyState = 4; // status.readyState;
			this.status.networkState = 0; // status.networkState;
			this.status.playbackRate = 1; // status.playbackRate;
			this.status.ended = false; // status.ended;
		},
		_updateButtons: function(playing) {
			if(playing === undefined) {
				playing = !this.status.paused;
			} else {
				this.status.paused = !playing;
			}
			// Apply the state classes. (For the useStateClassSkin:true option)
			if(playing) {
				this.addStateClass('playing');
			} else {
				this.removeStateClass('playing');
			}
			if(!this.status.noFullWindow && this.options.fullWindow) {
				this.addStateClass('fullScreen');
			} else {
				this.removeStateClass('fullScreen');
			}
			if(this.options.loop) {
				this.addStateClass('looped');
			} else {
				this.removeStateClass('looped');
			}
			// Toggle the GUI element pairs. (For the useStateClassSkin:false option)
			if(this.css.jq.play.length && this.css.jq.pause.length) {
				if(playing) {
					this.css.jq.play.hide();
					this.css.jq.pause.show();
				} else {
					this.css.jq.play.show();
					this.css.jq.pause.hide();
				}
			}
			if(this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length) {
				if(this.status.noFullWindow) {
					this.css.jq.fullScreen.hide();
					this.css.jq.restoreScreen.hide();
				} else if(this.options.fullWindow) {
					this.css.jq.fullScreen.hide();
					this.css.jq.restoreScreen.show();
				} else {
					this.css.jq.fullScreen.show();
					this.css.jq.restoreScreen.hide();
				}
			}
			if(this.css.jq.repeat.length && this.css.jq.repeatOff.length) {
				if(this.options.loop) {
					this.css.jq.repeat.hide();
					this.css.jq.repeatOff.show();
				} else {
					this.css.jq.repeat.show();
					this.css.jq.repeatOff.hide();
				}
			}
		},
		_updateInterface: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.width(this.status.seekPercent+"%");
			}
			if(this.css.jq.playBar.length) {
				if(this.options.smoothPlayBar) {
					this.css.jq.playBar.stop().animate({
						width: this.status.currentPercentAbsolute+"%"
					}, 250, "linear");
				} else {
					this.css.jq.playBar.width(this.status.currentPercentRelative+"%");
				}
			}
			var currentTimeText = '';
			if(this.css.jq.currentTime.length) {
				currentTimeText = this._convertTime(this.status.currentTime);
				if(currentTimeText !== this.css.jq.currentTime.text()) {
					this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
				}
			}
			var durationText = '',
				duration = this.status.duration,
				remaining = this.status.remaining;
			if(this.css.jq.duration.length) {
				if(typeof this.status.media.duration === 'string') {
					durationText = this.status.media.duration;
				} else {
					if(typeof this.status.media.duration === 'number') {
						duration = this.status.media.duration;
						remaining = duration - this.status.currentTime;
					}
					if(this.options.remainingDuration) {
						durationText = (remaining > 0 ? '-' : '') + this._convertTime(remaining);
					} else {
						durationText = this._convertTime(duration);
					}
				}
				if(durationText !== this.css.jq.duration.text()) {
					this.css.jq.duration.text(durationText);
				}
			}
		},
		_convertTime: ConvertTime.prototype.time,
		_seeking: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.addClass("jp-seeking-bg");
			}
			this.addStateClass('seeking');
		},
		_seeked: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.removeClass("jp-seeking-bg");
			}
			this.removeStateClass('seeking');
		},
		_resetGate: function() {
			this.html.audio.gate = false;
			this.html.video.gate = false;
			this.aurora.gate = false;
			this.flash.gate = false;
		},
		_resetActive: function() {
			this.html.active = false;
			this.aurora.active = false;
			this.flash.active = false;
		},
		_escapeHtml: function(s) {
			return s.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
		},
		_qualifyURL: function(url) {
			var el = document.createElement('div');
			el.innerHTML= '<a href="' + this._escapeHtml(url) + '">x</a>';
			return el.firstChild.href;
		},
		_absoluteMediaUrls: function(media) {
			var self = this;
			$.each(media, function(type, url) {
				if(url && self.format[type] && url.substr(0, 5) !== "data:") {
					media[type] = self._qualifyURL(url);
				}
			});
			return media;
		},
		addStateClass: function(state) {
			if(this.ancestorJq.length) {
				this.ancestorJq.addClass(this.options.stateClass[state]);
			}
		},
		removeStateClass: function(state) {
			if(this.ancestorJq.length) {
				this.ancestorJq.removeClass(this.options.stateClass[state]);
			}
		},
		setMedia: function(media) {
		
			/*	media[format] = String: URL of format. Must contain all of the supplied option's video or audio formats.
			 *	media.poster = String: Video poster URL.
			 *	media.track = Array: Of objects defining the track element: kind, src, srclang, label, def.
			 *	media.stream = Boolean: * NOT IMPLEMENTED * Designating actual media streams. ie., "false/undefined" for files. Plan to refresh the flash every so often.
			 */

			var	self = this,
				supported = false,
				posterChanged = this.status.media.poster !== media.poster; // Compare before reset. Important for OSX Safari as this.htmlElement.poster.src is absolute, even if original poster URL was relative.

			this._resetMedia();
			this._resetGate();
			this._resetActive();

			// Clear the Android Fix.
			this.androidFix.setMedia = false;
			this.androidFix.play = false;
			this.androidFix.pause = false;

			// Convert all media URLs to absolute URLs.
			media = this._absoluteMediaUrls(media);

			$.each(this.formats, function(formatPriority, format) {
				var isVideo = self.format[format].media === 'video';
				$.each(self.solutions, function(solutionPriority, solution) {
					if(self[solution].support[format] && self._validString(media[format])) { // Format supported in solution and url given for format.
						var isHtml = solution === 'html';
						var isAurora = solution === 'aurora';

						if(isVideo) {
							if(isHtml) {
								self.html.video.gate = true;
								self._html_setVideo(media);
								self.html.active = true;
							} else {
								self.flash.gate = true;
								self._flash_setVideo(media);
								self.flash.active = true;
							}
							if(self.css.jq.videoPlay.length) {
								self.css.jq.videoPlay.show();
							}
							self.status.video = true;
						} else {
							if(isHtml) {
								self.html.audio.gate = true;
								self._html_setAudio(media);
								self.html.active = true;

								// Setup the Android Fix - Only for HTML audio.
								if($.jPlayer.platform.android) {
									self.androidFix.setMedia = true;
								}
							} else if(isAurora) {
								self.aurora.gate = true;
								self._aurora_setAudio(media);
								self.aurora.active = true;
							} else {
								self.flash.gate = true;
								self._flash_setAudio(media);
								self.flash.active = true;
							}
							if(self.css.jq.videoPlay.length) {
								self.css.jq.videoPlay.hide();
							}
							self.status.video = false;
						}
						
						supported = true;
						return false; // Exit $.each
					}
				});
				if(supported) {
					return false; // Exit $.each
				}
			});

			if(supported) {
				if(!(this.status.nativeVideoControls && this.html.video.gate)) {
					// Set poster IMG if native video controls are not being used
					// Note: With IE the IMG onload event occurs immediately when cached.
					// Note: Poster hidden by default in _resetMedia()
					if(this._validString(media.poster)) {
						if(posterChanged) { // Since some browsers do not generate img onload event.
							this.htmlElement.poster.src = media.poster;
						} else {
							this.internal.poster.jq.show();
						}
					}
				}
				if(typeof media.title === 'string') {
					if(this.css.jq.title.length) {
						this.css.jq.title.html(media.title);
					}
					if(this.htmlElement.audio) {
						this.htmlElement.audio.setAttribute('title', media.title);
					}
					if(this.htmlElement.video) {
						this.htmlElement.video.setAttribute('title', media.title);
					}
				}
				this.status.srcSet = true;
				this.status.media = $.extend({}, media);
				this._updateButtons(false);
				this._updateInterface();
				this._trigger($.jPlayer.event.setmedia);
			} else { // jPlayer cannot support any formats provided in this browser
				// Send an error event
				this._error( {
					type: $.jPlayer.error.NO_SUPPORT,
					context: "{supplied:'" + this.options.supplied + "'}",
					message: $.jPlayer.errorMsg.NO_SUPPORT,
					hint: $.jPlayer.errorHint.NO_SUPPORT
				});
			}
		},
		_resetMedia: function() {
			this._resetStatus();
			this._updateButtons(false);
			this._updateInterface();
			this._seeked();
			this.internal.poster.jq.hide();

			clearTimeout(this.internal.htmlDlyCmdId);

			if(this.html.active) {
				this._html_resetMedia();
			} else if(this.aurora.active) {
				this._aurora_resetMedia();
			} else if(this.flash.active) {
				this._flash_resetMedia();
			}
		},
		clearMedia: function() {
			this._resetMedia();

			if(this.html.active) {
				this._html_clearMedia();
			} else if(this.aurora.active) {
				this._aurora_clearMedia();
			} else if(this.flash.active) {
				this._flash_clearMedia();
			}

			this._resetGate();
			this._resetActive();
		},
		load: function() {
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_load();
				} else if(this.aurora.active) {
					this._aurora_load();
				} else if(this.flash.active) {
					this._flash_load();
				}
			} else {
				this._urlNotSetError("load");
			}
		},
		focus: function() {
			if(this.options.keyEnabled) {
				$.jPlayer.focus = this;
			}
		},
		play: function(time) {
			var guiAction = typeof time === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && !this.status.paused) {
				this.pause(time); // The time would be the click event, but passing it over so info is not lost.
			} else {
				time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
				if(this.status.srcSet) {
					this.focus();
					if(this.html.active) {
						this._html_play(time);
					} else if(this.aurora.active) {
						this._aurora_play(time);
					} else if(this.flash.active) {
						this._flash_play(time);
					}
				} else {
					this._urlNotSetError("play");
				}
			}
		},
		videoPlay: function() { // Handles clicks on the play button over the video poster
			this.play();
		},
		pause: function(time) {
			time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_pause(time);
				} else if(this.aurora.active) {
					this._aurora_pause(time);
				} else if(this.flash.active) {
					this._flash_pause(time);
				}
			} else {
				this._urlNotSetError("pause");
			}
		},
		tellOthers: function(command, conditions) {
			var self = this,
				hasConditions = typeof conditions === 'function',
				args = Array.prototype.slice.call(arguments); // Convert arguments to an Array.

			if(typeof command !== 'string') { // Ignore, since no command.
				return; // Return undefined to maintain chaining.
			}
			if(hasConditions) {
				args.splice(1, 1); // Remove the conditions from the arguments
			}

			$.jPlayer.prototype.destroyRemoved();
			$.each(this.instances, function() {
				// Remember that "this" is the instance's "element" in the $.each() loop.
				if(self.element !== this) { // Do not tell my instance.
					if(!hasConditions || conditions.call(this.data("jPlayer"), self)) {
						this.jPlayer.apply(this, args);
					}
				}
			});
		},
		pauseOthers: function(time) {
			this.tellOthers("pause", function() {
				// In the conditions function, the "this" context is the other instance's jPlayer object.
				return this.status.srcSet;
			}, time);
		},
		stop: function() {
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_pause(0);
				} else if(this.aurora.active) {
					this._aurora_pause(0);
				} else if(this.flash.active) {
					this._flash_pause(0);
				}
			} else {
				this._urlNotSetError("stop");
			}
		},
		playHead: function(p) {
			p = this._limitValue(p, 0, 100);
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_playHead(p);
				} else if(this.aurora.active) {
					this._aurora_playHead(p);
				} else if(this.flash.active) {
					this._flash_playHead(p);
				}
			} else {
				this._urlNotSetError("playHead");
			}
		},
		_muted: function(muted) {
			this.mutedWorker(muted);
			if(this.options.globalVolume) {
				this.tellOthers("mutedWorker", function() {
					// Check the other instance has global volume enabled.
					return this.options.globalVolume;
				}, muted);
			}
		},
		mutedWorker: function(muted) {
			this.options.muted = muted;
			if(this.html.used) {
				this._html_setProperty('muted', muted);
			}
			if(this.aurora.used) {
				this._aurora_mute(muted);
			}
			if(this.flash.used) {
				this._flash_mute(muted);
			}

			// The HTML solution generates this event from the media element itself.
			if(!this.html.video.gate && !this.html.audio.gate) {
				this._updateMute(muted);
				this._updateVolume(this.options.volume);
				this._trigger($.jPlayer.event.volumechange);
			}
		},
		mute: function(mute) { // mute is either: undefined (true), an event object (true) or a boolean (muted).
			var guiAction = typeof mute === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && this.options.muted) {
				this._muted(false);
			} else {
				mute = mute === undefined ? true : !!mute;
				this._muted(mute);
			}
		},
		unmute: function(unmute) { // unmute is either: undefined (true), an event object (true) or a boolean (!muted).
			unmute = unmute === undefined ? true : !!unmute;
			this._muted(!unmute);
		},
		_updateMute: function(mute) {
			if(mute === undefined) {
				mute = this.options.muted;
			}
			if(mute) {
				this.addStateClass('muted');
			} else {
				this.removeStateClass('muted');
			}
			if(this.css.jq.mute.length && this.css.jq.unmute.length) {
				if(this.status.noVolume) {
					this.css.jq.mute.hide();
					this.css.jq.unmute.hide();
				} else if(mute) {
					this.css.jq.mute.hide();
					this.css.jq.unmute.show();
				} else {
					this.css.jq.mute.show();
					this.css.jq.unmute.hide();
				}
			}
		},
		volume: function(v) {
			this.volumeWorker(v);
			if(this.options.globalVolume) {
				this.tellOthers("volumeWorker", function() {
					// Check the other instance has global volume enabled.
					return this.options.globalVolume;
				}, v);
			}
		},
		volumeWorker: function(v) {
			v = this._limitValue(v, 0, 1);
			this.options.volume = v;

			if(this.html.used) {
				this._html_setProperty('volume', v);
			}
			if(this.aurora.used) {
				this._aurora_volume(v);
			}
			if(this.flash.used) {
				this._flash_volume(v);
			}

			// The HTML solution generates this event from the media element itself.
			if(!this.html.video.gate && !this.html.audio.gate) {
				this._updateVolume(v);
				this._trigger($.jPlayer.event.volumechange);
			}
		},
		volumeBar: function(e) { // Handles clicks on the volumeBar
			if(this.css.jq.volumeBar.length) {
				// Using $(e.currentTarget) to enable multiple volume bars
				var $bar = $(e.currentTarget),
					offset = $bar.offset(),
					x = e.pageX - offset.left,
					w = $bar.width(),
					y = $bar.height() - e.pageY + offset.top,
					h = $bar.height();
				if(this.options.verticalVolume) {
					this.volume(y/h);
				} else {
					this.volume(x/w);
				}
			}
			if(this.options.muted) {
				this._muted(false);
			}
		},
		_updateVolume: function(v) {
			if(v === undefined) {
				v = this.options.volume;
			}
			v = this.options.muted ? 0 : v;

			if(this.status.noVolume) {
				this.addStateClass('noVolume');
				if(this.css.jq.volumeBar.length) {
					this.css.jq.volumeBar.hide();
				}
				if(this.css.jq.volumeBarValue.length) {
					this.css.jq.volumeBarValue.hide();
				}
				if(this.css.jq.volumeMax.length) {
					this.css.jq.volumeMax.hide();
				}
			} else {
				this.removeStateClass('noVolume');
				if(this.css.jq.volumeBar.length) {
					this.css.jq.volumeBar.show();
				}
				if(this.css.jq.volumeBarValue.length) {
					this.css.jq.volumeBarValue.show();
					this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"]((v*100)+"%");
				}
				if(this.css.jq.volumeMax.length) {
					this.css.jq.volumeMax.show();
				}
			}
		},
		volumeMax: function() { // Handles clicks on the volume max
			this.volume(1);
			if(this.options.muted) {
				this._muted(false);
			}
		},
		_cssSelectorAncestor: function(ancestor) {
			var self = this;
			this.options.cssSelectorAncestor = ancestor;
			this._removeUiClass();
			this.ancestorJq = ancestor ? $(ancestor) : []; // Would use $() instead of [], but it is only 1.4+
			if(ancestor && this.ancestorJq.length !== 1) { // So empty strings do not generate the warning.
				this._warning( {
					type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
					context: ancestor,
					message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
					hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
				});
			}
			this._addUiClass();
			$.each(this.options.cssSelector, function(fn, cssSel) {
				self._cssSelector(fn, cssSel);
			});

			// Set the GUI to the current state.
			this._updateInterface();
			this._updateButtons();
			this._updateAutohide();
			this._updateVolume();
			this._updateMute();
		},
		_cssSelector: function(fn, cssSel) {
			var self = this;
			if(typeof cssSel === 'string') {
				if($.jPlayer.prototype.options.cssSelector[fn]) {
					if(this.css.jq[fn] && this.css.jq[fn].length) {
						this.css.jq[fn].unbind(".jPlayer");
					}
					this.options.cssSelector[fn] = cssSel;
					this.css.cs[fn] = this.options.cssSelectorAncestor + " " + cssSel;

					if(cssSel) { // Checks for empty string
						this.css.jq[fn] = $(this.css.cs[fn]);
					} else {
						this.css.jq[fn] = []; // To comply with the css.jq[fn].length check before its use. As of jQuery 1.4 could have used $() for an empty set. 
					}

					if(this.css.jq[fn].length && this[fn]) {
						var handler = function(e) {
							e.preventDefault();
							self[fn](e);
							if(self.options.autoBlur) {
								$(this).blur();
							} else {
								$(this).focus(); // Force focus for ARIA.
							}
						};
						this.css.jq[fn].bind("click.jPlayer", handler); // Using jPlayer namespace
					}

					if(cssSel && this.css.jq[fn].length !== 1) { // So empty strings do not generate the warning. ie., they just remove the old one.
						this._warning( {
							type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
							context: this.css.cs[fn],
							message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[fn].length + " found for " + fn + " method.",
							hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
						});
					}
				} else {
					this._warning( {
						type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
						context: fn,
						message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
						hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
					});
				}
			} else {
				this._warning( {
					type: $.jPlayer.warning.CSS_SELECTOR_STRING,
					context: cssSel,
					message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
					hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
				});
			}
		},
		duration: function(e) {
			if(this.options.toggleDuration) {
				if(this.options.captureDuration) {
					e.stopPropagation();
				}
				this._setOption("remainingDuration", !this.options.remainingDuration);
			}
		},
		seekBar: function(e) { // Handles clicks on the seekBar
			if(this.css.jq.seekBar.length) {
				// Using $(e.currentTarget) to enable multiple seek bars
				var $bar = $(e.currentTarget),
					offset = $bar.offset(),
					x = e.pageX - offset.left,
					w = $bar.width(),
					p = 100 * x / w;
				this.playHead(p);
			}
		},
		playbackRate: function(pbr) {
			this._setOption("playbackRate", pbr);
		},
		playbackRateBar: function(e) { // Handles clicks on the playbackRateBar
			if(this.css.jq.playbackRateBar.length) {
				// Using $(e.currentTarget) to enable multiple playbackRate bars
				var $bar = $(e.currentTarget),
					offset = $bar.offset(),
					x = e.pageX - offset.left,
					w = $bar.width(),
					y = $bar.height() - e.pageY + offset.top,
					h = $bar.height(),
					ratio, pbr;
				if(this.options.verticalPlaybackRate) {
					ratio = y/h;
				} else {
					ratio = x/w;
				}
				pbr = ratio * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate;
				this.playbackRate(pbr);
			}
		},
		_updatePlaybackRate: function() {
			var pbr = this.options.playbackRate,
				ratio = (pbr - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
			if(this.status.playbackRateEnabled) {
				if(this.css.jq.playbackRateBar.length) {
					this.css.jq.playbackRateBar.show();
				}
				if(this.css.jq.playbackRateBarValue.length) {
					this.css.jq.playbackRateBarValue.show();
					this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"]((ratio*100)+"%");
				}
			} else {
				if(this.css.jq.playbackRateBar.length) {
					this.css.jq.playbackRateBar.hide();
				}
				if(this.css.jq.playbackRateBarValue.length) {
					this.css.jq.playbackRateBarValue.hide();
				}
			}
		},
		repeat: function(event) { // Handle clicks on the repeat button
			var guiAction = typeof event === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && this.options.loop) {
				this._loop(false);
			} else {
				this._loop(true);
			}
		},
		repeatOff: function() { // Handle clicks on the repeatOff button
			this._loop(false);
		},
		_loop: function(loop) {
			if(this.options.loop !== loop) {
				this.options.loop = loop;
				this._updateButtons();
				this._trigger($.jPlayer.event.repeat);
			}
		},

		// Options code adapted from ui.widget.js (1.8.7).  Made changes so the key can use dot notation. To match previous getData solution in jPlayer 1.
		option: function(key, value) {
			var options = key;

			 // Enables use: options().  Returns a copy of options object
			if ( arguments.length === 0 ) {
				return $.extend( true, {}, this.options );
			}

			if(typeof key === "string") {
				var keys = key.split(".");

				 // Enables use: options("someOption")  Returns a copy of the option. Supports dot notation.
				if(value === undefined) {

					var opt = $.extend(true, {}, this.options);
					for(var i = 0; i < keys.length; i++) {
						if(opt[keys[i]] !== undefined) {
							opt = opt[keys[i]];
						} else {
							this._warning( {
								type: $.jPlayer.warning.OPTION_KEY,
								context: key,
								message: $.jPlayer.warningMsg.OPTION_KEY,
								hint: $.jPlayer.warningHint.OPTION_KEY
							});
							return undefined;
						}
					}
					return opt;
				}

				 // Enables use: options("someOptionObject", someObject}).  Creates: {someOptionObject:someObject}
				 // Enables use: options("someOption", someValue).  Creates: {someOption:someValue}
				 // Enables use: options("someOptionObject.someOption", someValue).  Creates: {someOptionObject:{someOption:someValue}}

				options = {};
				var opts = options;

				for(var j = 0; j < keys.length; j++) {
					if(j < keys.length - 1) {
						opts[keys[j]] = {};
						opts = opts[keys[j]];
					} else {
						opts[keys[j]] = value;
					}
				}
			}

			 // Otherwise enables use: options(optionObject).  Uses original object (the key)

			this._setOptions(options);

			return this;
		},
		_setOptions: function(options) {
			var self = this;
			$.each(options, function(key, value) { // This supports the 2 level depth that the options of jPlayer has. Would review if we ever need more depth.
				self._setOption(key, value);
			});

			return this;
		},
		_setOption: function(key, value) {
			var self = this;

			// The ability to set options is limited at this time.

			switch(key) {
				case "volume" :
					this.volume(value);
					break;
				case "muted" :
					this._muted(value);
					break;
				case "globalVolume" :
					this.options[key] = value;
					break;
				case "cssSelectorAncestor" :
					this._cssSelectorAncestor(value); // Set and refresh all associations for the new ancestor.
					break;
				case "cssSelector" :
					$.each(value, function(fn, cssSel) {
						self._cssSelector(fn, cssSel); // NB: The option is set inside this function, after further validity checks.
					});
					break;
				case "playbackRate" :
					this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
					if(this.html.used) {
						this._html_setProperty('playbackRate', value);
					}
					this._updatePlaybackRate();
					break;
				case "defaultPlaybackRate" :
					this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
					if(this.html.used) {
						this._html_setProperty('defaultPlaybackRate', value);
					}
					this._updatePlaybackRate();
					break;
				case "minPlaybackRate" :
					this.options[key] = value = this._limitValue(value, 0.1, this.options.maxPlaybackRate - 0.1);
					this._updatePlaybackRate();
					break;
				case "maxPlaybackRate" :
					this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate + 0.1, 16);
					this._updatePlaybackRate();
					break;
				case "fullScreen" :
					if(this.options[key] !== value) { // if changed
						var wkv = $.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
						if(!wkv || wkv && !this.status.waitForPlay) {
							if(!wkv) { // No sensible way to unset option on these devices.
								this.options[key] = value;
							}
							if(value) {
								this._requestFullscreen();
							} else {
								this._exitFullscreen();
							}
							if(!wkv) {
								this._setOption("fullWindow", value);
							}
						}
					}
					break;
				case "fullWindow" :
					if(this.options[key] !== value) { // if changed
						this._removeUiClass();
						this.options[key] = value;
						this._refreshSize();
					}
					break;
				case "size" :
					if(!this.options.fullWindow && this.options[key].cssClass !== value.cssClass) {
						this._removeUiClass();
					}
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this._refreshSize();
					break;
				case "sizeFull" :
					if(this.options.fullWindow && this.options[key].cssClass !== value.cssClass) {
						this._removeUiClass();
					}
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this._refreshSize();
					break;
				case "autohide" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this._updateAutohide();
					break;
				case "loop" :
					this._loop(value);
					break;
				case "remainingDuration" :
					this.options[key] = value;
					this._updateInterface();
					break;
				case "toggleDuration" :
					this.options[key] = value;
					break;
				case "nativeVideoControls" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
					this._restrictNativeVideoControls();
					this._updateNativeVideoControls();
					break;
				case "noFullWindow" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls); // Need to check again as noFullWindow can depend on this flag and the restrict() can override it.
					this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
					this._restrictNativeVideoControls();
					this._updateButtons();
					break;
				case "noVolume" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this.status.noVolume = this._uaBlocklist(this.options.noVolume);
					this._updateVolume();
					this._updateMute();
					break;
				case "emulateHtml" :
					if(this.options[key] !== value) { // To avoid multiple event handlers being created, if true already.
						this.options[key] = value;
						if(value) {
							this._emulateHtmlBridge();
						} else {
							this._destroyHtmlBridge();
						}
					}
					break;
				case "timeFormat" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					break;
				case "keyEnabled" :
					this.options[key] = value;
					if(!value && this === $.jPlayer.focus) {
						$.jPlayer.focus = null;
					}
					break;
				case "keyBindings" :
					this.options[key] = $.extend(true, {}, this.options[key], value); // store a merged DEEP copy of it, incase not all properties changed.
					break;
				case "audioFullScreen" :
					this.options[key] = value;
					break;
				case "autoBlur" :
					this.options[key] = value;
					break;
			}

			return this;
		},
		// End of: (Options code adapted from ui.widget.js)

		_refreshSize: function() {
			this._setSize(); // update status and jPlayer element size
			this._addUiClass(); // update the ui class
			this._updateSize(); // update internal sizes
			this._updateButtons();
			this._updateAutohide();
			this._trigger($.jPlayer.event.resize);
		},
		_setSize: function() {
			// Determine the current size from the options
			if(this.options.fullWindow) {
				this.status.width = this.options.sizeFull.width;
				this.status.height = this.options.sizeFull.height;
				this.status.cssClass = this.options.sizeFull.cssClass;
			} else {
				this.status.width = this.options.size.width;
				this.status.height = this.options.size.height;
				this.status.cssClass = this.options.size.cssClass;
			}

			// Set the size of the jPlayer area.
			this.element.css({'width': this.status.width, 'height': this.status.height});
		},
		_addUiClass: function() {
			if(this.ancestorJq.length) {
				this.ancestorJq.addClass(this.status.cssClass);
			}
		},
		_removeUiClass: function() {
			if(this.ancestorJq.length) {
				this.ancestorJq.removeClass(this.status.cssClass);
			}
		},
		_updateSize: function() {
			// The poster uses show/hide so can simply resize it.
			this.internal.poster.jq.css({'width': this.status.width, 'height': this.status.height});

			// Video html or flash resized if necessary at this time, or if native video controls being used.
			if(!this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls) {
				this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
			}
			else if(!this.status.waitForPlay && this.flash.active && this.status.video) {
				this.internal.flash.jq.css({'width': this.status.width, 'height': this.status.height});
			}
		},
		_updateAutohide: function() {
			var	self = this,
				event = "mousemove.jPlayer",
				namespace = ".jPlayerAutohide",
				eventType = event + namespace,
				handler = function(event) {
					var moved = false,
						deltaX, deltaY;
					if(typeof self.internal.mouse !== "undefined") {
						//get the change from last position to this position
						deltaX = self.internal.mouse.x - event.pageX;
						deltaY = self.internal.mouse.y - event.pageY;
						moved = (Math.floor(deltaX) > 0) || (Math.floor(deltaY)>0); 
					} else {
						moved = true;
					}
					// store current position for next method execution
					self.internal.mouse = {
							x : event.pageX,
							y : event.pageY
					};
					// if mouse has been actually moved, do the gui fadeIn/fadeOut
					if (moved) {
						self.css.jq.gui.fadeIn(self.options.autohide.fadeIn, function() {
							clearTimeout(self.internal.autohideId);
							self.internal.autohideId = setTimeout( function() {
								self.css.jq.gui.fadeOut(self.options.autohide.fadeOut);
							}, self.options.autohide.hold);
						});
					}
				};

			if(this.css.jq.gui.length) {

				// End animations first so that its callback is executed now.
				// Otherwise an in progress fadeIn animation still has the callback to fadeOut again.
				this.css.jq.gui.stop(true, true);

				// Removes the fadeOut operation from the fadeIn callback.
				clearTimeout(this.internal.autohideId);
				// undefine mouse
				delete this.internal.mouse;

				this.element.unbind(namespace);
				this.css.jq.gui.unbind(namespace);

				if(!this.status.nativeVideoControls) {
					if(this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored) {
						this.element.bind(eventType, handler);
						this.css.jq.gui.bind(eventType, handler);
						this.css.jq.gui.hide();
					} else {
						this.css.jq.gui.show();
					}
				} else {
					this.css.jq.gui.hide();
				}
			}
		},
		fullScreen: function(event) {
			var guiAction = typeof event === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && this.options.fullScreen) {
				this._setOption("fullScreen", false);
			} else {
				this._setOption("fullScreen", true);
			}
		},
		restoreScreen: function() {
			this._setOption("fullScreen", false);
		},
		_fullscreenAddEventListeners: function() {
			var self = this,
				fs = $.jPlayer.nativeFeatures.fullscreen;

			if(fs.api.fullscreenEnabled) {
				if(fs.event.fullscreenchange) {
					// Create the event handler function and store it for removal.
					if(typeof this.internal.fullscreenchangeHandler !== 'function') {
						this.internal.fullscreenchangeHandler = function() {
							self._fullscreenchange();
						};
					}
					document.addEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
				}
				// No point creating handler for fullscreenerror.
				// Either logic avoids fullscreen occurring (w3c/moz), or their is no event on the browser (webkit).
			}
		},
		_fullscreenRemoveEventListeners: function() {
			var fs = $.jPlayer.nativeFeatures.fullscreen;
			if(this.internal.fullscreenchangeHandler) {
				document.removeEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
			}
		},
		_fullscreenchange: function() {
			// If nothing is fullscreen, then we cannot be in fullscreen mode.
			if(this.options.fullScreen && !$.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement()) {
				this._setOption("fullScreen", false);
			}
		},
		_requestFullscreen: function() {
			// Either the container or the jPlayer div
			var e = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
				fs = $.jPlayer.nativeFeatures.fullscreen;

			// This method needs the video element. For iOS and Android.
			if(fs.used.webkitVideo) {
				e = this.htmlElement.video;
			}

			if(fs.api.fullscreenEnabled) {
				fs.api.requestFullscreen(e);
			}
		},
		_exitFullscreen: function() {

			var fs = $.jPlayer.nativeFeatures.fullscreen,
				e;

			// This method needs the video element. For iOS and Android.
			if(fs.used.webkitVideo) {
				e = this.htmlElement.video;
			}

			if(fs.api.fullscreenEnabled) {
				fs.api.exitFullscreen(e);
			}
		},
		_html_initMedia: function(media) {
			// Remove any existing track elements
			var $media = $(this.htmlElement.media).empty();

			// Create any track elements given with the media, as an Array of track Objects.
			$.each(media.track || [], function(i,v) {
				var track = document.createElement('track');
				track.setAttribute("kind", v.kind ? v.kind : "");
				track.setAttribute("src", v.src ? v.src : "");
				track.setAttribute("srclang", v.srclang ? v.srclang : "");
				track.setAttribute("label", v.label ? v.label : "");
				if(v.def) {
					track.setAttribute("default", v.def);
				}
				$media.append(track);
			});

			this.htmlElement.media.src = this.status.src;

			if(this.options.preload !== 'none') {
				this._html_load(); // See function for comments
			}
			this._trigger($.jPlayer.event.timeupdate); // The flash generates this event for its solution.
		},
		_html_setFormat: function(media) {
			var self = this;
			// Always finds a format due to checks in setMedia()
			$.each(this.formats, function(priority, format) {
				if(self.html.support[format] && media[format]) {
					self.status.src = media[format];
					self.status.format[format] = true;
					self.status.formatType = format;
					return false;
				}
			});
		},
		_html_setAudio: function(media) {
			this._html_setFormat(media);
			this.htmlElement.media = this.htmlElement.audio;
			this._html_initMedia(media);
		},
		_html_setVideo: function(media) {
			this._html_setFormat(media);
			if(this.status.nativeVideoControls) {
				this.htmlElement.video.poster = this._validString(media.poster) ? media.poster : "";
			}
			this.htmlElement.media = this.htmlElement.video;
			this._html_initMedia(media);
		},
		_html_resetMedia: function() {
			if(this.htmlElement.media) {
				if(this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls) {
					this.internal.video.jq.css({'width':'0px', 'height':'0px'});
				}
				this.htmlElement.media.pause();
			}
		},
		_html_clearMedia: function() {
			if(this.htmlElement.media) {
				this.htmlElement.media.src = "about:blank";
				// The following load() is only required for Firefox 3.6 (PowerMacs).
				// Recent HTMl5 browsers only require the src change. Due to changes in W3C spec and load() effect.
				this.htmlElement.media.load(); // Stops an old, "in progress" download from continuing the download. Triggers the loadstart, error and emptied events, due to the empty src. Also an abort event if a download was in progress.
			}
		},
		_html_load: function() {
			// This function remains to allow the early HTML5 browsers to work, such as Firefox 3.6
			// A change in the W3C spec for the media.load() command means that this is no longer necessary.
			// This command should be removed and actually causes minor undesirable effects on some browsers. Such as loading the whole file and not only the metadata.
			if(this.status.waitForLoad) {
				this.status.waitForLoad = false;
				this.htmlElement.media.load();
			}
			clearTimeout(this.internal.htmlDlyCmdId);
		},
		_html_play: function(time) {
			var self = this,
				media = this.htmlElement.media;

			this.androidFix.pause = false; // Cancel the pause fix.

			this._html_load(); // Loads if required and clears any delayed commands.

			// Setup the Android Fix.
			if(this.androidFix.setMedia) {
				this.androidFix.play = true;
				this.androidFix.time = time;

			} else if(!isNaN(time)) {

				// Attempt to play it, since iOS has been ignoring commands
				if(this.internal.cmdsIgnored) {
					media.play();
				}

				try {
					// !media.seekable is for old HTML5 browsers, like Firefox 3.6.
					// Checking seekable.length is important for iOS6 to work with setMedia().play(time)
					if(!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
						media.currentTime = time;
						media.play();
					} else {
						throw 1;
					}
				} catch(err) {
					this.internal.htmlDlyCmdId = setTimeout(function() {
						self.play(time);
					}, 250);
					return; // Cancel execution and wait for the delayed command.
				}
			} else {
				media.play();
			}
			this._html_checkWaitForPlay();
		},
		_html_pause: function(time) {
			var self = this,
				media = this.htmlElement.media;

			this.androidFix.play = false; // Cancel the play fix.

			if(time > 0) { // We do not want the stop() command, which does pause(0), causing a load operation.
				this._html_load(); // Loads if required and clears any delayed commands.
			} else {
				clearTimeout(this.internal.htmlDlyCmdId);
			}

			// Order of these commands is important for Safari (Win) and IE9. Pause then change currentTime.
			media.pause();

			// Setup the Android Fix.
			if(this.androidFix.setMedia) {
				this.androidFix.pause = true;
				this.androidFix.time = time;

			} else if(!isNaN(time)) {
				try {
					if(!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
						media.currentTime = time;
					} else {
						throw 1;
					}
				} catch(err) {
					this.internal.htmlDlyCmdId = setTimeout(function() {
						self.pause(time);
					}, 250);
					return; // Cancel execution and wait for the delayed command.
				}
			}
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this._html_checkWaitForPlay();
			}
		},
		_html_playHead: function(percent) {
			var self = this,
				media = this.htmlElement.media;

			this._html_load(); // Loads if required and clears any delayed commands.

			// This playHead() method needs a refactor to apply the android fix.

			try {
				if(typeof media.seekable === "object" && media.seekable.length > 0) {
					media.currentTime = percent * media.seekable.end(media.seekable.length-1) / 100;
				} else if(media.duration > 0 && !isNaN(media.duration)) {
					media.currentTime = percent * media.duration / 100;
				} else {
					throw "e";
				}
			} catch(err) {
				this.internal.htmlDlyCmdId = setTimeout(function() {
					self.playHead(percent);
				}, 250);
				return; // Cancel execution and wait for the delayed command.
			}
			if(!this.status.waitForLoad) {
				this._html_checkWaitForPlay();
			}
		},
		_html_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
				if(this.css.jq.videoPlay.length) {
					this.css.jq.videoPlay.hide();
				}
				if(this.status.video) {
					this.internal.poster.jq.hide();
					this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
				}
			}
		},
		_html_setProperty: function(property, value) {
			if(this.html.audio.available) {
				this.htmlElement.audio[property] = value;
			}
			if(this.html.video.available) {
				this.htmlElement.video[property] = value;
			}
		},
		_aurora_setAudio: function(media) {
			var self = this;            
			
			// Always finds a format due to checks in setMedia()
			$.each(this.formats, function(priority, format) {
				if(self.aurora.support[format] && media[format]) {
					self.status.src = media[format];
					self.status.format[format] = true;
					self.status.formatType = format;
			
					return false;
				}
			});
			
			this.aurora.player = new AV.Player.fromURL(this.status.src);
			this._addAuroraEventListeners(this.aurora.player, this.aurora);

			if(this.options.preload === 'auto') {
				this._aurora_load();
				this.status.waitForLoad = false;
			}
		},
		_aurora_resetMedia: function() {
			if (this.aurora.player) {
				this.aurora.player.stop();
			}
		},
		_aurora_clearMedia: function() {
			// Nothing to clear.
		},
		_aurora_load: function() {
			if(this.status.waitForLoad) {
				this.status.waitForLoad = false;
				this.aurora.player.preload();
			}
		},
		_aurora_play: function(time) {
			if (!this.status.waitForLoad) {
				if (!isNaN(time)) {
					this.aurora.player.seek(time);
				}
			}
			if (!this.aurora.player.playing) {
				this.aurora.player.play();
			}
			this.status.waitForLoad = false;
			this._aurora_checkWaitForPlay();
			
			// No event from the player, update UI now.
			this._updateButtons(true);
			this._trigger($.jPlayer.event.play);
		},
		_aurora_pause: function(time) {
			if (!isNaN(time)) {
				this.aurora.player.seek(time * 1000);
			}
			this.aurora.player.pause();
			
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this._aurora_checkWaitForPlay();
			}
			
			// No event from the player, update UI now.
			this._updateButtons(false);
			this._trigger($.jPlayer.event.pause);
		},
		_aurora_playHead: function(percent) {
			if(this.aurora.player.duration > 0) {
				// The seek() sould be in milliseconds, but the only codec that works with seek (aac.js) uses seconds.
				this.aurora.player.seek(percent * this.aurora.player.duration / 100); // Using seconds
			}
				
			if(!this.status.waitForLoad) {
				this._aurora_checkWaitForPlay();
			}
		},
		_aurora_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
			}
		},
		_aurora_volume: function(v) {
			this.aurora.player.volume = v * 100;
		},
		_aurora_mute: function(m) {
			if (m) {
				this.aurora.properties.lastvolume = this.aurora.player.volume;
				this.aurora.player.volume = 0;
			} else {
				this.aurora.player.volume = this.aurora.properties.lastvolume;
			}
			this.aurora.properties.muted = m;
		},
		_flash_setAudio: function(media) {
			var self = this;
			try {
				// Always finds a format due to checks in setMedia()
				$.each(this.formats, function(priority, format) {
					if(self.flash.support[format] && media[format]) {
						switch (format) {
							case "m4a" :
							case "fla" :
								self._getMovie().fl_setAudio_m4a(media[format]);
								break;
							case "mp3" :
								self._getMovie().fl_setAudio_mp3(media[format]);
								break;
							case "rtmpa":
								self._getMovie().fl_setAudio_rtmp(media[format]);
								break;
						}
						self.status.src = media[format];
						self.status.format[format] = true;
						self.status.formatType = format;
						return false;
					}
				});

				if(this.options.preload === 'auto') {
					this._flash_load();
					this.status.waitForLoad = false;
				}
			} catch(err) { this._flashError(err); }
		},
		_flash_setVideo: function(media) {
			var self = this;
			try {
				// Always finds a format due to checks in setMedia()
				$.each(this.formats, function(priority, format) {
					if(self.flash.support[format] && media[format]) {
						switch (format) {
							case "m4v" :
							case "flv" :
								self._getMovie().fl_setVideo_m4v(media[format]);
								break;
							case "rtmpv":
								self._getMovie().fl_setVideo_rtmp(media[format]);
								break;		
						}
						self.status.src = media[format];
						self.status.format[format] = true;
						self.status.formatType = format;
						return false;
					}
				});

				if(this.options.preload === 'auto') {
					this._flash_load();
					this.status.waitForLoad = false;
				}
			} catch(err) { this._flashError(err); }
		},
		_flash_resetMedia: function() {
			this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Must do via CSS as setting attr() to zero causes a jQuery error in IE.
			this._flash_pause(NaN);
		},
		_flash_clearMedia: function() {
			try {
				this._getMovie().fl_clearMedia();
			} catch(err) { this._flashError(err); }
		},
		_flash_load: function() {
			try {
				this._getMovie().fl_load();
			} catch(err) { this._flashError(err); }
			this.status.waitForLoad = false;
		},
		_flash_play: function(time) {
			try {
				this._getMovie().fl_play(time);
			} catch(err) { this._flashError(err); }
			this.status.waitForLoad = false;
			this._flash_checkWaitForPlay();
		},
		_flash_pause: function(time) {
			try {
				this._getMovie().fl_pause(time);
			} catch(err) { this._flashError(err); }
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this.status.waitForLoad = false;
				this._flash_checkWaitForPlay();
			}
		},
		_flash_playHead: function(p) {
			try {
				this._getMovie().fl_play_head(p);
			} catch(err) { this._flashError(err); }
			if(!this.status.waitForLoad) {
				this._flash_checkWaitForPlay();
			}
		},
		_flash_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
				if(this.css.jq.videoPlay.length) {
					this.css.jq.videoPlay.hide();
				}
				if(this.status.video) {
					this.internal.poster.jq.hide();
					this.internal.flash.jq.css({'width': this.status.width, 'height': this.status.height});
				}
			}
		},
		_flash_volume: function(v) {
			try {
				this._getMovie().fl_volume(v);
			} catch(err) { this._flashError(err); }
		},
		_flash_mute: function(m) {
			try {
				this._getMovie().fl_mute(m);
			} catch(err) { this._flashError(err); }
		},
		_getMovie: function() {
			return document[this.internal.flash.id];
		},
		_getFlashPluginVersion: function() {

			// _getFlashPluginVersion() code influenced by:
			// - FlashReplace 1.01: http://code.google.com/p/flashreplace/
			// - SWFObject 2.2: http://code.google.com/p/swfobject/

			var version = 0,
				flash;
			if(window.ActiveXObject) {
				try {
					flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if (flash) { // flash will return null when ActiveX is disabled
						var v = flash.GetVariable("$version");
						if(v) {
							v = v.split(" ")[1].split(",");
							version = parseInt(v[0], 10) + "." + parseInt(v[1], 10);
						}
					}
				} catch(e) {}
			}
			else if(navigator.plugins && navigator.mimeTypes.length > 0) {
				flash = navigator.plugins["Shockwave Flash"];
				if(flash) {
					version = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1");
				}
			}
			return version * 1; // Converts to a number
		},
		_checkForFlash: function (version) {
			var flashOk = false;
			if(this._getFlashPluginVersion() >= version) {
				flashOk = true;
			}
			return flashOk;
		},
		_validString: function(url) {
			return (url && typeof url === "string"); // Empty strings return false
		},
		_limitValue: function(value, min, max) {
			return (value < min) ? min : ((value > max) ? max : value);
		},
		_urlNotSetError: function(context) {
			this._error( {
				type: $.jPlayer.error.URL_NOT_SET,
				context: context,
				message: $.jPlayer.errorMsg.URL_NOT_SET,
				hint: $.jPlayer.errorHint.URL_NOT_SET
			});
		},
		_flashError: function(error) {
			var errorType;
			if(!this.internal.ready) {
				errorType = "FLASH";
			} else {
				errorType = "FLASH_DISABLED";
			}
			this._error( {
				type: $.jPlayer.error[errorType],
				context: this.internal.flash.swf,
				message: $.jPlayer.errorMsg[errorType] + error.message,
				hint: $.jPlayer.errorHint[errorType]
			});
			// Allow the audio player to recover if display:none and then shown again, or with position:fixed on Firefox.
			// This really only affects audio in a media player, as an audio player could easily move the jPlayer element away from such issues.
			this.internal.flash.jq.css({'width':'1px', 'height':'1px'});
		},
		_error: function(error) {
			this._trigger($.jPlayer.event.error, error);
			if(this.options.errorAlerts) {
				this._alert("Error!" + (error.message ? "\n" + error.message : "") + (error.hint ? "\n" + error.hint : "") + "\nContext: " + error.context);
			}
		},
		_warning: function(warning) {
			this._trigger($.jPlayer.event.warning, undefined, warning);
			if(this.options.warningAlerts) {
				this._alert("Warning!" + (warning.message ? "\n" + warning.message : "") + (warning.hint ? "\n" + warning.hint : "") + "\nContext: " + warning.context);
			}
		},
		_alert: function(message) {
			var msg = "jPlayer " + this.version.script + " : id='" + this.internal.self.id +"' : " + message;
			if(!this.options.consoleAlerts) {
				alert(msg);
			} else if(window.console && window.console.log) {
				window.console.log(msg);
			}
		},
		_emulateHtmlBridge: function() {
			var self = this;

			// Emulate methods on jPlayer's DOM element.
			$.each( $.jPlayer.emulateMethods.split(/\s+/g), function(i, name) {
				self.internal.domNode[name] = function(arg) {
					self[name](arg);
				};

			});

			// Bubble jPlayer events to its DOM element.
			$.each($.jPlayer.event, function(eventName,eventType) {
				var nativeEvent = true;
				$.each( $.jPlayer.reservedEvent.split(/\s+/g), function(i, name) {
					if(name === eventName) {
						nativeEvent = false;
						return false;
					}
				});
				if(nativeEvent) {
					self.element.bind(eventType + ".jPlayer.jPlayerHtml", function() { // With .jPlayer & .jPlayerHtml namespaces.
						self._emulateHtmlUpdate();
						var domEvent = document.createEvent("Event");
						domEvent.initEvent(eventName, false, true);
						self.internal.domNode.dispatchEvent(domEvent);
					});
				}
				// The error event would require a special case
			});

			// IE9 has a readyState property on all elements. The document should have it, but all (except media) elements inherit it in IE9. This conflicts with Popcorn, which polls the readyState.
		},
		_emulateHtmlUpdate: function() {
			var self = this;

			$.each( $.jPlayer.emulateStatus.split(/\s+/g), function(i, name) {
				self.internal.domNode[name] = self.status[name];
			});
			$.each( $.jPlayer.emulateOptions.split(/\s+/g), function(i, name) {
				self.internal.domNode[name] = self.options[name];
			});
		},
		_destroyHtmlBridge: function() {
			var self = this;

			// Bridge event handlers are also removed by destroy() through .jPlayer namespace.
			this.element.unbind(".jPlayerHtml"); // Remove all event handlers created by the jPlayer bridge. So you can change the emulateHtml option.

			// Remove the methods and properties
			var emulated = $.jPlayer.emulateMethods + " " + $.jPlayer.emulateStatus + " " + $.jPlayer.emulateOptions;
			$.each( emulated.split(/\s+/g), function(i, name) {
				delete self.internal.domNode[name];
			});
		}
	};

	$.jPlayer.error = {
		FLASH: "e_flash",
		FLASH_DISABLED: "e_flash_disabled",
		NO_SOLUTION: "e_no_solution",
		NO_SUPPORT: "e_no_support",
		URL: "e_url",
		URL_NOT_SET: "e_url_not_set",
		VERSION: "e_version"
	};

	$.jPlayer.errorMsg = {
		FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ", // Used in: _flashError()
		FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ", // Used in: _flashError()
		NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.", // Used in: _init()
		NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.", // Used in: setMedia()
		URL: "Media URL could not be loaded.", // Used in: jPlayerFlashEvent() and _addHtmlEventListeners()
		URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.", // Used in: load(), play(), pause(), stop() and playHead()
		VERSION: "jPlayer " + $.jPlayer.prototype.version.script + " needs Jplayer.swf version " + $.jPlayer.prototype.version.needFlash + " but found " // Used in: jPlayerReady()
	};

	$.jPlayer.errorHint = {
		FLASH: "Check your swfPath option and that Jplayer.swf is there.",
		FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
		NO_SOLUTION: "Review the jPlayer options: support and supplied.",
		NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
		URL: "Check media URL is valid.",
		URL_NOT_SET: "Use setMedia() to set the media URL.",
		VERSION: "Update jPlayer files."
	};

	$.jPlayer.warning = {
		CSS_SELECTOR_COUNT: "e_css_selector_count",
		CSS_SELECTOR_METHOD: "e_css_selector_method",
		CSS_SELECTOR_STRING: "e_css_selector_string",
		OPTION_KEY: "e_option_key"
	};

	$.jPlayer.warningMsg = {
		CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
		CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
		CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
		OPTION_KEY: "The option requested in jPlayer('option') is undefined."
	};

	$.jPlayer.warningHint = {
		CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
		CSS_SELECTOR_METHOD: "Check your method name.",
		CSS_SELECTOR_STRING: "Check your css selector is a string.",
		OPTION_KEY: "Check your option name."
	};
}));


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*! lightgallery - v1.2.0 - 2015-08-26
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2015 Sachin N; Licensed Apache 2.0 */
(function($, window, document, undefined) {

    'use strict';

    var defaults = {

        mode: 'lg-slide',

        // Ex : 'ease'
        cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',

        //'for jquery animation'
        easing: 'linear',
        speed: 600,
        height: '100%',
        width: '100%',
        addClass: '',
        startClass: 'lg-start-zoom',
        backdropDuration: 150,
        hideBarsDelay: 6000,

        useLeft: false,

        closable: true,
        loop: true,
        escKey: true,
        keyPress: true,
        controls: true,
        slideEndAnimatoin: true,
        hideControlOnEnd: false,
        mousewheel: true,

        // .lg-item || '.lg-sub-html'
        appendSubHtmlTo: '.lg-sub-html',

        /**
         * @desc number of preload slides
         * will exicute only after the current slide is fully loaded.
         *
         * @ex you clicked on 4th image and if preload = 1 then 3rd slide and 5th
         * slide will be loaded in the background after the 4th slide is fully loaded..
         * if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
         *
         */
        preload: 1,
        showAfterLoad: true,
        selector: '',
        nextHtml: '',
        prevHtml: '',

        // 0, 1
        index: false,

        iframeMaxWidth: '100%',

        download: true,
        counter: true,
        appendCounterTo: '.lg-toolbar',

        swipeThreshold: 50,
        enableSwipe: true,
        enableDrag: true,

        dynamic: false,
        dynamicEl: [],
        galleryId: 1
    };

    function Plugin(element, options) {

        // Current lightGallery element
        this.el = element;

        // Current jquery element
        this.$el = $(element);

        // lightGallery settings
        this.s = $.extend({}, defaults, options);

        // lightGallery modules
        this.modules = {};

        // false when lightgallery complete first slide;
        this.lGalleryOn = false;

        this.lgBusy = false;

        // Timeout function for hiding controls;
        this.hideBartimeout = false;

        // To determine browser supports for touch events;
        this.isTouch = ('ontouchstart' in document.documentElement);

        // DIsable hideControlOnEnd if sildeEndAnimation is true
        if (this.s.slideEndAnimatoin) {
            this.s.hideControlOnEnd = false;
        }

        // Gallery items
        if (this.s.dynamic) {
            this.$items = this.s.dynamicEl;
        } else {
            if (this.s.selector === 'this') {
                this.$items = this.$el;
            } else if (this.s.selector !== '') {
                this.$items = this.$el.find($(this.s.selector));
            } else {
                this.$items = this.$el.children();
            }
        }

        // .lg-item
        this.$slide = '';

        // .lg-outer
        this.$outer = '';

        this.init();

        return this;
    }

    Plugin.prototype.init = function() {

        var _this = this;

        // s.preload should not be more than $item.length
        if (_this.s.preload > _this.$items.length) {
            _this.s.preload = _this.$items.length;
        }

        // if dynamic option is enabled execute immediately
        var _hash = window.location.hash;
        if (_hash.indexOf('lg=' + this.s.galleryId) > 0) {

            _this.index = parseInt(_hash.split('&slide=')[1], 10);

            $('body').addClass('lg-from-hash');
            if (!$('body').hasClass('lg-on')) {
                setTimeout(function() {
                    _this.build(_this.index);
                    $('body').addClass('lg-on');
                });
            }
        }

        if (_this.s.dynamic) {

            _this.$el.trigger('onBeforeOpen.lg');

            _this.index = _this.s.index || 0;

            // prevent accidental double execution
            if (!$('body').hasClass('lg-on')) {
                setTimeout(function() {
                    _this.build(_this.index);
                    $('body').addClass('lg-on');
                });
            }
        } else {

            // Using different namespace for click because click event should not unbind if selector is same object('this')
            _this.$items.on('click.lgcustom', function(event) {

                // For IE8
                try {
                    event.preventDefault();
                    event.preventDefault();
                } catch (er) {
                    event.returnValue = false;
                }

                _this.$el.trigger('onBeforeOpen.lg');

                _this.index = _this.s.index || _this.$items.index(this);

                // prevent accidental double execution
                if (!$('body').hasClass('lg-on')) {
                    _this.build(_this.index);
                    $('body').addClass('lg-on');
                }
            });
        }

    };

    Plugin.prototype.build = function(index) {

        var _this = this;

        _this.structure();

        // module constructor
        $.each($.fn.lightGallery.modules, function(key) {
            _this.modules[key] = new $.fn.lightGallery.modules[key](_this.el);
        });

        // initiate slide function
        _this.slide(index, false, false);

        if (_this.s.keyPress) {
            _this.keyPress();
        }

        if (_this.$items.length > 1) {

            _this.arrow();

            setTimeout(function() {
                _this.enableDrag();
                _this.enableSwipe();
            }, 50);

            if (_this.s.mousewheel) {
                _this.mousewheel();
            }
        }

        _this.counter();

        _this.closeGallery();

        // Hide controllers if mouse doesn't move for some period
        _this.$outer.on('mousemove.lg click.lg touchstart.lg', function() {

            _this.$outer.removeClass('lg-hide-items');

            clearTimeout(_this.hideBartimeout);

            // Timeout will be cleared on each slide movement also
            _this.hideBartimeout = setTimeout(function() {
                _this.$outer.addClass('lg-hide-items');
            }, _this.s.hideBarsDelay);

        });

    };

    Plugin.prototype.structure = function() {
        var list = '';
        var controls = '';
        var i = 0;
        var subHtmlCont = '';
        var template;
        var _this = this;

        $('body').append('<div class="lg-backdrop"></div>');
        $('.lg-backdrop').css('transition-duration', this.s.backdropDuration + 'ms');

        // Create gallery items
        for (i = 0; i < this.$items.length; i++) {
            list += '<div class="lg-item"></div>';
        }

        // Create controlls
        if (this.s.controls && this.$items.length > 1) {
            controls = '<div class="lg-actions">' +
                '<div class="lg-prev lg-icon">' + this.s.prevHtml + '</div>' +
                '<div class="lg-next lg-icon">' + this.s.nextHtml + '</div>' +
                '</div>';
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {
            subHtmlCont = '<div class="lg-sub-html"></div>';
        }

        template = '<div class="lg-outer ' + this.s.addClass + ' ' + this.s.startClass + '">' +
            '<div class="lg" style="width:' + this.s.width + '; height:' + this.s.height + '">' +
            '<div class="lg-inner">' + list + '</div>' +
            '<div class="lg-toolbar group">' +
            '<span class="lg-close lg-icon"></span>' +
            '</div>' +
            controls +
            subHtmlCont +
            '</div>' +
            '</div>';

        $('body').append(template);
        this.$outer = $('.lg-outer');
        this.$slide = this.$outer.find('.lg-item');

        if (this.s.useLeft) {
            this.$outer.addClass('lg-use-left');
        } else {
            this.$outer.addClass('lg-use-css3');
        }

        // For fixed height gallery
        _this.setTop();
        $(window).on('resize.lg orientationchange.lg', function() {
            setTimeout(function() {
                _this.setTop();
            }, 100);
        });

        // add class lg-current to remove initial transition
        this.$slide.eq(this.index).addClass('lg-current');

        // add Class for css support and transition mode
        if (this.doCss()) {
            this.$outer.addClass('lg-css3');
        } else {
            this.$outer.addClass('lg-css');
        }

        this.$outer.addClass(this.s.mode);

        if (this.s.enableDrag && this.$items.length > 1) {
            this.$outer.addClass('lg-grab');
        }

        if (this.s.showAfterLoad) {
            this.$outer.addClass('lg-show-after-load');
        }

        if (this.doCss()) {
            var $inner = this.$outer.find('.lg-inner');
            $inner.css('transition-timing-function', this.s.cssEasing);
            $inner.css('transition-duration', this.s.speed + 'ms');
        }

        $('.lg-backdrop').addClass('in');

        setTimeout(function() {
            _this.$outer.addClass('lg-visible');
        }, this.s.backdropDuration);

        if (this.s.download) {
            this.$outer.find('.lg-toolbar').append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>');
        }

    };

    // For fixed height gallery
    Plugin.prototype.setTop = function() {
        if (this.s.height !== '100%') {
            var wH = $(window).height();
            var top = (wH - parseInt(this.s.height, 10)) / 2;
            var $lGallery = this.$outer.find('.lg');
            if (wH >= parseInt(this.s.height, 10)) {
                $lGallery.css('top', top + 'px');
            } else {
                $lGallery.css('top', '0px');
            }
        }
    };

    // Find css3 support
    Plugin.prototype.doCss = function() {
        // check for css animation support
        var support = function() {
            var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
            var root = document.documentElement;
            var i = 0;
            for (i = 0; i < transition.length; i++) {
                if (transition[i] in root.style) {
                    return true;
                }
            }
        };

        if (support()) {
            return true;
        }

        return false;
    };

    /**
     *  @desc Check the given src is video
     *  @param {String} src
     *  @return {Object} video type
     *  Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
     */
    Plugin.prototype.isVideo = function(src, index) {

        var html;
        if (this.s.dynamic) {
            html = this.s.dynamicEl[index].html;
        } else {
            html = this.$items.eq(index).attr('data-html');
        }

        if (!src && html) {
            return {
                html5: true
            };
        }

        var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9self\-]+)/i);
        var vimeo = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_this]+)/i);

        // return  { youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
        if (youtube) {
            return {
                youtube: youtube
            };
        } else if (vimeo) {
            return {
                vimeo: vimeo
            };
        }
    };

    /**
     *  @desc Create image counter
     *  Ex: 1/10
     */
    Plugin.prototype.counter = function() {
        if (this.s.counter) {
            $(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + '</span></div>');
        }
    };

    /**
     *  @desc add sub-html into the slide
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.addHtml = function(index) {
        var subHtml = null;
        if (this.s.dynamic) {
            subHtml = this.s.dynamicEl[index].subHtml;
        } else {
            subHtml = this.$items.eq(index).attr('data-sub-html');
        }

        if (typeof subHtml !== 'undefined' && subHtml !== null) {

            // get first letter of subhtml
            // if first letter starts with . or # get the html form the jQuery object
            var fL = subHtml.substring(0, 1);
            if (fL === '.' || fL === '#') {
                subHtml = $(subHtml).html();
            } else {
                subHtml = subHtml;
            }
        } else {
            subHtml = '';
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {
            this.$outer.find(this.s.appendSubHtmlTo).html(subHtml);

            // Add lg-empty-html class if title doesn't exist
            if (subHtml === '') {
                this.$outer.find(this.s.appendSubHtmlTo).addClass('lg-empty-html');
            } else {
                this.$outer.find(this.s.appendSubHtmlTo).removeClass('lg-empty-html');
            }
        } else {
            this.$slide.eq(index).append(subHtml);
        }

        this.$el.trigger('onAfterAppendSubHtml.lg', [index]);
    };

    /**
     *  @desc Preload slides
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.preload = function(index) {
        var i = 1;
        var j = 1;
        for (i = 1; i <= this.s.preload; i++) {
            if (i >= this.$items.length - index) {
                break;
            }

            this.loadContent(index + i, false, 0);
        }

        for (j = 1; j <= this.s.preload; j++) {
            if (index - j < 0) {
                break;
            }

            this.loadContent(index - j, false, 0);
        }
    };

    /**
     *  @desc Load slide content into slide.
     *  @param {Number} index - index of the slide.
     *  @param {Boolean} rec - if true call loadcontent() function again.
     *  @param {Boolean} delay - delay for adding complete class. it is 0 except first time.
     */
    Plugin.prototype.loadContent = function(index, rec, delay) {

        var _this = this;
        var _hasPoster = false;
        var _$img;
        var _src;
        var _poster;
        var _srcset;
        var _sizes;
        var _html;
        var getResponsiveSrc = function(srcItms) {
            var rsWidth = [];
            var rsSrc = [];
            for (var i = 0; i < srcItms.length; i++) {
                var __src = srcItms[i].split(' ');

                // Manage empty space
                if (__src[0] === '') {
                    __src.splice(0, 1);
                }

                rsSrc.push(__src[0]);
                rsWidth.push(__src[1]);
            }

            var wWidth = $(window).width();
            for (var j = 0; j < rsWidth.length; j++) {
                if (parseInt(rsWidth[j], 10) > wWidth) {
                    _src = rsSrc[j];
                    break;
                }
            }
        };

        if (_this.s.dynamic) {

            if (_this.s.dynamicEl[index].poster) {
                _hasPoster = true;
                _poster = _this.s.dynamicEl[index].poster;
            }

            _html = _this.s.dynamicEl[index].html;
            _src = _this.s.dynamicEl[index].src;

            if (_this.s.dynamicEl[index].responsive) {
                var srcDyItms = _this.s.dynamicEl[index].responsive.split(',');
                getResponsiveSrc(srcDyItms);
            }

            _srcset = _this.s.dynamicEl[index].srcset;
            _sizes = _this.s.dynamicEl[index].sizes;

        } else {

            if (_this.$items.eq(index).attr('data-poster')) {
                _hasPoster = true;
                _poster = _this.$items.eq(index).attr('data-poster');
            }

            _html = _this.$items.eq(index).attr('data-html');
            _src = _this.$items.eq(index).attr('href') || _this.$items.eq(index).attr('data-src');

            if (_this.$items.eq(index).attr('data-responsive')) {
                var srcItms = _this.$items.eq(index).attr('data-responsive').split(',');
                getResponsiveSrc(srcItms);
            }

            _srcset = _this.$items.eq(index).attr('data-srcset');
            _sizes = _this.$items.eq(index).attr('data-sizes');

        }

        //if (_src || _srcset || _sizes || _poster) {

        var iframe = false;
        if (_this.s.dynamic) {
            if (_this.s.dynamicEl[index].iframe) {
                iframe = true;
            }
        } else {
            if (_this.$items.eq(index).attr('data-iframe') === 'true') {
                iframe = true;
            }
        }

        var _isVideo = _this.isVideo(_src, index);
        if (!_this.$slide.eq(index).hasClass('lg-loaded')) {
            if (iframe) {
                _this.$slide.eq(index).prepend('<div class="lg-video-cont" style="max-width:' + _this.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + _src + '"  allowfullscreen="true"></iframe></div></div>');
            } else if (_hasPoster) {
                var videoClass = '';
                if (_isVideo && _isVideo.youtube) {
                    videoClass = 'lg-has-youtube';
                } else if (_isVideo && _isVideo.vimeo) {
                    videoClass = 'lg-has-vimeo';
                } else {
                    videoClass = 'lg-has-html5';
                }

                _this.$slide.eq(index).prepend('<div class="lg-video-cont ' + videoClass + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + _poster + '" /></div></div>');

            } else if (_isVideo) {
                _this.$slide.eq(index).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>');
                _this.$el.trigger('hasVideo.lg', [index, _src, _html]);
            } else {
                _this.$slide.eq(index).prepend('<div class="lg-img-wrap"> <img class="lg-object lg-image" src="' + _src + '" /> </div>');
            }

            _this.$el.trigger('onAferAppendSlide.lg', [index]);

            _$img = _this.$slide.eq(index).find('.lg-object');
            if (_sizes) {
                _$img.attr('sizes', _sizes);
            }

            if (_srcset) {
                _$img.attr('srcset', _srcset);
                try {
                    picturefill({
                        elements: [_$img[0]]
                    });
                } catch (e) {
                    console.error('Make sure you have included Picturefill version 2');
                }
            }

            if (this.s.appendSubHtmlTo !== '.lg-sub-html') {
                _this.addHtml(index);
            }

            _this.$slide.eq(index).addClass('lg-loaded');
        }

        _this.$slide.eq(index).find('.lg-object').on('load.lg error.lg', function() {

            // For first time add some delay for displaying the start animation.
            var _speed = 0;

            // Do not change the delay value because it is required for zoom plugin.
            // If gallery opened from direct url (hash) speed value should be 0
            if (delay && !$('body').hasClass('lg-from-hash')) {
                _speed = delay;
            }

            setTimeout(function() {
                _this.$slide.eq(index).addClass('lg-complete');
                _this.$el.trigger('onSlideItemLoad.lg', [index, delay || 0]);
            }, _speed);

        });

        // @todo check load state for html5 videos
        if (_isVideo && _isVideo.html5 && !_hasPoster) {
            _this.$slide.eq(index).addClass('lg-complete');
        }

        if (rec === true) {
            if (!_this.$slide.eq(index).hasClass('lg-complete')) {
                _this.$slide.eq(index).find('.lg-object').on('load.lg error.lg', function() {
                    _this.preload(index);
                });
            } else {
                _this.preload(index);
            }
        }

        //}
    };

    /**
    *   @desc slide function for lightgallery
        ** Slide() gets call on start
        ** ** Set lg.on true once slide() function gets called.
        ** Call loadContent() on slide() function inside setTimeout
        ** ** On first slide we do not want any animation like slide of fade
        ** ** So on first slide( if lg.on if false that is first slide) loadContent() should start loading immediately
        ** ** Else loadContent() should wait for the transition to complete.
        ** ** So set timeout s.speed + 50
    <=> ** loadContent() will load slide content in to the particular slide
        ** ** It has recursion (rec) parameter. if rec === true loadContent() will call preload() function.
        ** ** preload will execute only when the previous slide is fully loaded (images iframe)
        ** ** avoid simultaneous image load
    <=> ** Preload() will check for s.preload value and call loadContent() again accoring to preload value
        ** loadContent()  <====> Preload();

    *   @param {Number} index - index of the slide
    *   @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
    *   @param {Boolean} fromThumb - true if slide function called via thumbnail click
    */
    Plugin.prototype.slide = function(index, fromTouch, fromThumb) {

        var _prevIndex = this.$outer.find('.lg-current').index();
        var _this = this;

        // Prevent if multiple call
        // Required for hsh plugin
        if (_this.lGalleryOn && (_prevIndex === index)) {
            return;
        }

        var _length = this.$slide.length;
        var _time = _this.lGalleryOn ? this.s.speed : 0;
        var _next = false;
        var _prev = false;

        if (!_this.lgBusy) {

            this.$el.trigger('onBeforeSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);

            _this.lgBusy = true;

            clearTimeout(_this.hideBartimeout);

            // Add title if this.s.appendSubHtmlTo === lg-sub-html
            if (this.s.appendSubHtmlTo === '.lg-sub-html') {

                // wait for slide animation to complete
                setTimeout(function() {
                    _this.addHtml(index);
                }, _time);
            }

            this.arrowDisable(index);

            if (!fromTouch) {

                // remove all transitions
                _this.$outer.addClass('lg-no-trans');

                this.$slide.removeClass('lg-prev-slide lg-next-slide');

                if (index < _prevIndex) {
                    _prev = true;
                    if ((index === 0) && (_prevIndex === _length - 1) && !fromThumb) {
                        _prev = false;
                        _next = true;
                    }
                } else if (index > _prevIndex) {
                    _next = true;
                    if ((index === _length - 1) && (_prevIndex === 0) && !fromThumb) {
                        _prev = true;
                        _next = false;
                    }
                }

                if (_prev) {

                    //prevslide
                    this.$slide.eq(index).addClass('lg-prev-slide');
                    this.$slide.eq(_prevIndex).addClass('lg-next-slide');
                } else if (_next) {

                    // next slide
                    this.$slide.eq(index).addClass('lg-next-slide');
                    this.$slide.eq(_prevIndex).addClass('lg-prev-slide');
                }

                // give 50 ms for browser to add/remove class
                setTimeout(function() {
                    _this.$slide.removeClass('lg-current');

                    //_this.$slide.eq(_prevIndex).removeClass('lg-current');
                    _this.$slide.eq(index).addClass('lg-current');

                    // reset all transitions
                    _this.$outer.removeClass('lg-no-trans');
                }, 50);
            } else {

                var touchPrev = index - 1;
                var touchNext = index + 1;

                if ((index === 0) && (_prevIndex === _length - 1)) {

                    // next slide
                    touchNext = 0;
                    touchPrev = _length - 1;
                } else if ((index === _length - 1) && (_prevIndex === 0)) {

                    // prev slide
                    touchNext = 0;
                    touchPrev = _length - 1;
                }

                this.$slide.removeClass('lg-prev-slide lg-current lg-next-slide');
                _this.$slide.eq(touchPrev).addClass('lg-prev-slide');
                _this.$slide.eq(touchNext).addClass('lg-next-slide');
                _this.$slide.eq(index).addClass('lg-current');
            }

            if (_this.lGalleryOn) {
                setTimeout(function() {
                    _this.loadContent(index, true, 0);
                }, this.s.speed + 50);

                setTimeout(function() {
                    _this.lgBusy = false;
                    _this.$el.trigger('onAfterSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);
                }, this.s.speed);

                // Support non css3 browser
                if (!_this.doCss()) {
                    _this.$slide.fadeOut(_this.s.speed);
                    _this.$slide.eq(index).fadeIn(_this.s.speed);
                }
            } else {
                _this.loadContent(index, true, _this.s.backdropDuration);

                _this.lgBusy = false;
                _this.$el.trigger('onAfterSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);

                // Support non css3 browser
                if (!_this.doCss()) {
                    _this.$slide.fadeOut(50);
                    _this.$slide.eq(index).fadeIn(50);
                }
            }

            if (this.s.download) {
                var _src;
                if (_this.s.dynamic) {
                    _src = _this.s.dynamicEl[index].downloadUrl || _this.s.dynamicEl[index].src;
                } else {
                    _src = _this.$items.eq(index).attr('data-download-url') || _this.$items.eq(index).attr('href') || _this.$items.eq(index).attr('data-src');

                }

                $('#lg-download').attr('href', _src);
            }

            _this.lGalleryOn = true;

            if (this.s.counter) {
                $('#lg-counter-current').text(index + 1);
            }

        }

    };

    /**
     *  @desc Go to next slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToNextSlide = function(fromTouch) {
        var _this = this;
        if (!_this.lgBusy) {
            if ((_this.index + 1) < _this.$slide.length) {
                _this.index++;
                _this.$el.trigger('onBeforeNextSlide.lg', [_this.index]);
                _this.slide(_this.index, fromTouch, false);
            } else {
                if (_this.s.loop) {
                    _this.index = 0;
                    _this.$el.trigger('onBeforeNextSlide.lg', [_this.index]);
                    _this.slide(_this.index, fromTouch, false);
                } else if (_this.s.slideEndAnimatoin) {
                    _this.$outer.addClass('lg-right-end');
                    setTimeout(function() {
                        _this.$outer.removeClass('lg-right-end');
                    }, 400);
                }
            }
        }
    };

    /**
     *  @desc Go to previous slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToPrevSlide = function(fromTouch) {
        var _this = this;
        if (!_this.lgBusy) {
            if (_this.index > 0) {
                _this.index--;
                _this.$el.trigger('onBeforePrevSlide.lg', [_this.index, fromTouch]);
                _this.slide(_this.index, fromTouch, false);
            } else {
                if (_this.s.loop) {
                    _this.index = _this.$items.length - 1;
                    _this.$el.trigger('onBeforePrevSlide.lg', [_this.index, fromTouch]);
                    _this.slide(_this.index, fromTouch, false);
                } else if (_this.s.slideEndAnimatoin) {
                    _this.$outer.addClass('lg-left-end');
                    setTimeout(function() {
                        _this.$outer.removeClass('lg-left-end');
                    }, 400);
                }
            }
        }
    };

    Plugin.prototype.keyPress = function() {
        var _this = this;
        if (this.$items.length > 1) {
            $(window).on('keyup.lg', function(e) {
                if (_this.$items.length > 1) {
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        _this.goToPrevSlide();
                    }

                    if (e.keyCode === 39) {
                        e.preventDefault();
                        _this.goToNextSlide();
                    }
                }
            });
        }

        $(window).on('keydown.lg', function(e) {
            if (_this.s.escKey === true && e.keyCode === 27 && !_this.$outer.hasClass('lg-thumb-open')) {
                e.preventDefault();
                _this.destroy();
            }
        });
    };

    Plugin.prototype.arrow = function() {
        var _this = this;
        this.$outer.find('.lg-prev').on('click.lg', function() {
            _this.goToPrevSlide();
        });

        this.$outer.find('.lg-next').on('click.lg', function() {
            _this.goToNextSlide();
        });
    };

    Plugin.prototype.arrowDisable = function(index) {

        // Disable arrows if s.hideControlOnEnd is true
        if (!this.s.loop && this.s.hideControlOnEnd) {
            if ((index + 1) < this.$slide.length) {
                this.$outer.find('.lg-next').removeAttr('disabled').removeClass('disabled');
            } else {
                this.$outer.find('.lg-next').attr('disabled', 'disabled').addClass('disabled');
            }

            if (index > 0) {
                this.$outer.find('.lg-prev').removeAttr('disabled').removeClass('disabled');
            } else {
                this.$outer.find('.lg-prev').attr('disabled', 'disabled').addClass('disabled');
            }
        }
    };

    Plugin.prototype.setTranslate = function($el, xValue, yValue) {
        // jQuery supports Automatic CSS prefixing since jQuery 1.8.0
        if (this.s.useLeft) {
            $el.css('left', xValue);
        } else {
            $el.css({
                transform: 'translate3d(' + (xValue) + 'px, ' + yValue + 'px, 0px)'
            });
        }
    };

    Plugin.prototype.touchMove = function(startCoords, endCoords) {

        var distance = endCoords - startCoords;

        // reset opacity and transition duration
        this.$outer.addClass('lg-dragging');

        // move current slide
        this.setTranslate(this.$slide.eq(this.index), distance, 0);

        // move next and prev slide with current slide
        this.setTranslate($('.lg-prev-slide'), -this.$slide.eq(this.index).width() + distance, 0);
        this.setTranslate($('.lg-next-slide'), this.$slide.eq(this.index).width() + distance, 0);
    };

    Plugin.prototype.touchEnd = function(distance) {
        var _this = this;

        // keep slide animation for any mode while dragg/swipe
        if (_this.s.mode !== 'lg-slide') {
            _this.$outer.addClass('lg-slide');
        }

        this.$slide.not('.lg-current, .lg-prev-slide, .lg-next-slide').css('opacity', '0');

        // set transition duration
        setTimeout(function() {
            _this.$outer.removeClass('lg-dragging');
            if ((distance < 0) && (Math.abs(distance) > _this.s.swipeThreshold)) {
                _this.goToNextSlide(true);
            } else if ((distance > 0) && (Math.abs(distance) > _this.s.swipeThreshold)) {
                _this.goToPrevSlide(true);
            } else if (Math.abs(distance) < 5) {

                // Trigger click if distance is less than 5 pix
                _this.$el.trigger('onSlideClick.lg');
            }

            _this.$slide.removeAttr('style');
        });

        // remove slide class once drag/swipe is completed if mode is not slide
        setTimeout(function() {
            if (!_this.$outer.hasClass('lg-dragging') && _this.s.mode !== 'lg-slide') {
                _this.$outer.removeClass('lg-slide');
            }
        }, _this.s.speed + 100);

    };

    Plugin.prototype.enableSwipe = function() {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isMoved = false;

        if (_this.s.enableSwipe && _this.isTouch && _this.doCss()) {

            _this.$slide.on('touchstart.lg', function(e) {
                if (!_this.$outer.hasClass('lg-zoomed') && !_this.lgBusy) {
                    e.preventDefault();
                    _this.manageSwipeClass();
                    startCoords = e.originalEvent.targetTouches[0].pageX;
                }
            });

            _this.$slide.on('touchmove.lg', function(e) {
                if (!_this.$outer.hasClass('lg-zoomed')) {
                    e.preventDefault();
                    endCoords = e.originalEvent.targetTouches[0].pageX;
                    _this.touchMove(startCoords, endCoords);
                    isMoved = true;
                }
            });

            _this.$slide.on('touchend.lg', function() {
                if (!_this.$outer.hasClass('lg-zoomed')) {
                    if (isMoved) {
                        isMoved = false;
                        _this.touchEnd(endCoords - startCoords);
                    } else {
                        _this.$el.trigger('onSlideClick.lg');
                    }
                }
            });
        }

    };

    Plugin.prototype.enableDrag = function() {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isDraging = false;
        var isMoved = false;
        if (_this.s.enableDrag && !_this.isTouch && _this.doCss()) {
            _this.$slide.on('mousedown.lg', function(e) {
                // execute only on .lg-object
                if (!_this.$outer.hasClass('lg-zoomed')) {
                    if ($(e.target).hasClass('lg-object') || $(e.target).hasClass('lg-video-play')) {
                        e.preventDefault();

                        if (!_this.lgBusy) {
                            _this.manageSwipeClass();
                            startCoords = e.pageX;
                            isDraging = true;

                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            _this.$outer.scrollLeft += 1;
                            _this.$outer.scrollLeft -= 1;

                            // *

                            _this.$outer.removeClass('lg-grab').addClass('lg-grabbing');

                            _this.$el.trigger('onDragstart.lg');
                        }

                    }
                }
            });

            $(window).on('mousemove.lg', function(e) {
                if (isDraging) {
                    isMoved = true;
                    endCoords = e.pageX;
                    _this.touchMove(startCoords, endCoords);
                    _this.$el.trigger('onDragmove.lg');
                }
            });

            $(window).on('mouseup.lg', function(e) {
                if (isMoved) {
                    isMoved = false;
                    _this.touchEnd(endCoords - startCoords);
                    _this.$el.trigger('onDragend.lg');
                } else if ($(e.target).hasClass('lg-object') || $(e.target).hasClass('lg-video-play')) {
                    _this.$el.trigger('onSlideClick.lg');
                }

                // Prevent execution on click
                if (isDraging) {
                    isDraging = false;
                    _this.$outer.removeClass('lg-grabbing').addClass('lg-grab');
                }
            });

        }
    };

    Plugin.prototype.manageSwipeClass = function() {
        var touchNext = this.index + 1;
        var touchPrev = this.index - 1;
        var length = this.$slide.length;
        if (this.s.loop) {
            if (this.index === 0) {
                touchPrev = length - 1;
            } else if (this.index === length - 1) {
                touchNext = 0;
            }
        }

        this.$slide.removeClass('lg-next-slide lg-prev-slide');
        if (touchPrev > -1) {
            this.$slide.eq(touchPrev).addClass('lg-prev-slide');
        }

        this.$slide.eq(touchNext).addClass('lg-next-slide');
    };

    Plugin.prototype.mousewheel = function() {
        var _this = this;
        _this.$outer.on('mousewheel.lg', function(e) {
            if (e.deltaY > 0) {
                _this.goToPrevSlide();
            } else {
                _this.goToNextSlide();
            }

            e.preventDefault();
        });

    };

    Plugin.prototype.closeGallery = function() {

        var _this = this;
        var mousedown = false;
        this.$outer.find('.lg-close').on('click.lg', function() {
            _this.destroy();
        });

        if (_this.s.closable) {

            // If you drag the slide and release outside gallery gets close on chrome
            // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
            _this.$outer.on('mousedown.lg', function(e) {

                if ($(e.target).is('.lg-outer') || $(e.target).is('.lg-item ') || $(e.target).is('.lg-img-wrap')) {
                    mousedown = true;
                } else {
                    mousedown = false;
                }

            });

            _this.$outer.on('mouseup.lg', function(e) {

                if ($(e.target).is('.lg-outer') || $(e.target).is('.lg-item ') || $(e.target).is('.lg-img-wrap') && mousedown) {
                    if (!_this.$outer.hasClass('lg-dragging')) {
                        _this.destroy();
                    }
                }

            });

        }

    };

    Plugin.prototype.destroy = function(d) {

        var _this = this;

        _this.$el.trigger('onBeforeClose.lg');

        /**
         * if d is false or undefined destroy will only close the gallery
         * plugins instance remains with the element
         
         * if d is true destroy will completely remove the plugin
         */

        if (d) {
            this.$items.off('click.lg click.lgcustom');
            $.removeData(_this.el, 'lightGallery');
        }

        // Unbind all events added by lightGallery
        this.$el.off('.lg.tm');

        // Distroy all lightGallery modules
        $.each($.fn.lightGallery.modules, function(key) {
            if (_this.modules[key]) {
                _this.modules[key].destroy();
            }
        });

        this.lGalleryOn = false;

        clearTimeout(_this.hideBartimeout);
        this.hideBartimeout = false;
        $(window).off('.lg');
        $('body').removeClass('lg-on lg-from-hash');

        if (_this.$outer) {
            _this.$outer.removeClass('lg-visible');
        }

        $('.lg-backdrop').removeClass('in');

        setTimeout(function() {
            if (_this.$outer) {
                _this.$outer.remove();
            }

            $('.lg-backdrop').remove();

            _this.$el.trigger('onCloseAfter.lg');
        }, _this.s.backdropDuration + 50);
    };

    $.fn.lightGallery = function(options) {
        return this.each(function() {
            if (!$.data(this, 'lightGallery')) {
                $.data(this, 'lightGallery', new Plugin(this, options));
            } else {
                try {
                    $(this).data('lightGallery').init();
                } catch (err) {
                    console.error('lightGallery has not initiated properly');
                }
            }
        });
    };

    $.fn.lightGallery.modules = {};

})(jQuery, window, document);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**!
 * MixItUp v2.1.7
 *
 * @copyright Copyright 2014 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */

(function($, undf){
	
	/**
	 * MixItUp Constructor Function
	 * @constructor
	 * @extends jQuery
	 */
	
	$.MixItUp = function(){
		var self = this;
		
		self._execAction('_constructor', 0);
		
		$.extend(self, {
			
			/* Public Properties
			---------------------------------------------------------------------- */
			
			selectors: {
				target: '.mix',
				filter: '.filter',
				sort: '.sort'
			},
				
			animation: {
				enable: true,
				effects: 'fade scale',
				duration: 600,
				easing: 'ease',
				perspectiveDistance: '3000',
				perspectiveOrigin: '50% 50%',
				queue: true,
				queueLimit: 1,
				animateChangeLayout: false,
				animateResizeContainer: true,
				animateResizeTargets: false,
				staggerSequence: false,
				reverseOut: false
			},
				
			callbacks: {
				onMixLoad: false,
				onMixStart: false,
				onMixBusy: false,
				onMixEnd: false,
				onMixFail: false,
				_user: false
			},
				
			controls: {
				enable: true,
				live: false,
				toggleFilterButtons: false,
				toggleLogic: 'or',
				activeClass: 'active'
			},

			layout: {
				display: 'inline-block',
				containerClass: '',
				containerClassFail: 'fail'
			},
			
			load: {
				filter: 'all',
				sort: false
			},
			
			/* Private Properties
			---------------------------------------------------------------------- */
				
			_$body: null,
			_$container: null,
			_$targets: null,
			_$parent: null,
			_$sortButtons: null,
			_$filterButtons: null,
		
			_suckMode: false,
			_mixing: false,
			_sorting: false,
			_clicking: false,
			_loading: true,
			_changingLayout: false,
			_changingClass: false,
			_changingDisplay: false,
			
			_origOrder: [],
			_startOrder: [],
			_newOrder: [],
			_activeFilter: null,
			_toggleArray: [],
			_toggleString: '',
			_activeSort: 'default:asc',
			_newSort: null,
			_startHeight: null,
			_newHeight: null,
			_incPadding: true,
			_newDisplay: null,
			_newClass: null,
			_targetsBound: 0,
			_targetsDone: 0,
			_queue: [],
				
			_$show: $(),
			_$hide: $()
		});
	
		self._execAction('_constructor', 1);
	};
	
	/**
	 * MixItUp Prototype
	 * @override
	 */
	
	$.MixItUp.prototype = {
		constructor: $.MixItUp,
		
		/* Static Properties
		---------------------------------------------------------------------- */
		
		_instances: {},
		_handled: {
			_filter: {},
			_sort: {}
		},
		_bound: {
			_filter: {},
			_sort: {}
		},
		_actions: {},
		_filters: {},
		
		/* Static Methods
		---------------------------------------------------------------------- */
		
		/**
		 * Extend
		 * @since 2.1.0
		 * @param {object} new properties/methods
		 * @extends {object} prototype
		 */
		
		extend: function(extension){
			for(var key in extension){
				$.MixItUp.prototype[key] = extension[key];
			}
		},
		
		/**
		 * Add Action
		 * @since 2.1.0
		 * @param {string} hook name
		 * @param {string} namespace
		 * @param {function} function to execute
		 * @param {number} priority
		 * @extends {object} $.MixItUp.prototype._actions
		 */
		
		addAction: function(hook, name, func, priority){
			$.MixItUp.prototype._addHook('_actions', hook, name, func, priority);
		},
		
		/**
		 * Add Filter
		 * @since 2.1.0
		 * @param {string} hook name
		 * @param {string} namespace
		 * @param {function} function to execute
		 * @param {number} priority
		 * @extends {object} $.MixItUp.prototype._filters
		 */
		
		addFilter: function(hook, name, func, priority){
			$.MixItUp.prototype._addHook('_filters', hook, name, func, priority);
		},
		
		/**
		 * Add Hook
		 * @since 2.1.0
		 * @param {string} type of hook
		 * @param {string} hook name
		 * @param {function} function to execute
		 * @param {number} priority
		 * @extends {object} $.MixItUp.prototype._filters
		 */
		
		_addHook: function(type, hook, name, func, priority){
			var collection = $.MixItUp.prototype[type],
				obj = {};
				
			priority = (priority === 1 || priority === 'post') ? 'post' : 'pre';
				
			obj[hook] = {};
			obj[hook][priority] = {};
			obj[hook][priority][name] = func;

			$.extend(true, collection, obj);
		},
		
		
		/* Private Methods
		---------------------------------------------------------------------- */
		
		/**
		 * Initialise
		 * @since 2.0.0
		 * @param {object} domNode
		 * @param {object} config
		 */
		
		_init: function(domNode, config){
			var self = this;
			
			self._execAction('_init', 0, arguments);
			
			config && $.extend(true, self, config);
			
			self._$body = $('body');
			self._domNode = domNode;
			self._$container = $(domNode);
			self._$container.addClass(self.layout.containerClass);
			self._id = domNode.id;
			
			self._platformDetect();
			
			self._brake = self._getPrefixedCSS('transition', 'none');
			
			self._refresh(true);
			
			self._$parent = self._$targets.parent().length ? self._$targets.parent() : self._$container;
			
			if(self.load.sort){
				self._newSort = self._parseSort(self.load.sort);
				self._newSortString = self.load.sort;
				self._activeSort = self.load.sort;
				self._sort();
				self._printSort();
			}
			
			self._activeFilter = self.load.filter === 'all' ? 
				self.selectors.target : 
				self.load.filter === 'none' ?
					'' :
					self.load.filter;
			
			self.controls.enable && self._bindHandlers();
			
			if(self.controls.toggleFilterButtons){
				self._buildToggleArray();
				
				for(var i = 0; i < self._toggleArray.length; i++){
					self._updateControls({filter: self._toggleArray[i], sort: self._activeSort}, true);
				};
			} else if(self.controls.enable){
				self._updateControls({filter: self._activeFilter, sort: self._activeSort});
			}
			
			self._filter();
			
			self._init = true;
			
			self._$container.data('mixItUp',self);
			
			self._execAction('_init', 1, arguments);
			
			self._buildState();
			
			self._$targets.css(self._brake);
		
			self._goMix(self.animation.enable);
		},
		
		/**
		 * Platform Detect
		 * @since 2.0.0
		 */
		
		_platformDetect: function(){
			var self = this,
				vendorsTrans = ['Webkit', 'Moz', 'O', 'ms'],
				vendorsRAF = ['webkit', 'moz'],
				chrome = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || false,
				ff = typeof InstallTrigger !== 'undefined',
				prefix = function(el){
					for (var i = 0; i < vendorsTrans.length; i++){
						if (vendorsTrans[i] + 'Transition' in el.style){
							return {
								prefix: '-'+vendorsTrans[i].toLowerCase()+'-',
								vendor: vendorsTrans[i]
							};
						};
					}; 
					return 'transition' in el.style ? '' : false;
				},
				transPrefix = prefix(self._domNode);
				
			self._execAction('_platformDetect', 0);
			
			self._chrome = chrome ? parseInt(chrome[1], 10) : false;
			self._ff = ff ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : false;
			self._prefix = transPrefix.prefix;
			self._vendor = transPrefix.vendor;
			self._suckMode = window.atob && self._prefix ? false : true;

			self._suckMode && (self.animation.enable = false);
			(self._ff && self._ff <= 4) && (self.animation.enable = false);
			
			/* Polyfills
			---------------------------------------------------------------------- */
			
			/**
			 * window.requestAnimationFrame
			 */
			
			for(var x = 0; x < vendorsRAF.length && !window.requestAnimationFrame; x++){
				window.requestAnimationFrame = window[vendorsRAF[x]+'RequestAnimationFrame'];
			}

			/**
			 * Object.getPrototypeOf
			 */

			if(typeof Object.getPrototypeOf !== 'function'){
				if(typeof 'test'.__proto__ === 'object'){
					Object.getPrototypeOf = function(object){
						return object.__proto__;
					};
				} else {
					Object.getPrototypeOf = function(object){
						return object.constructor.prototype;
					};
				}
			}

			/**
			 * Element.nextElementSibling
			 */
			
			if(self._domNode.nextElementSibling === undf){
				Object.defineProperty(Element.prototype, 'nextElementSibling',{
					get: function(){
						var el = this.nextSibling;
						
						while(el){
							if(el.nodeType ===1){
								return el;
							}
							el = el.nextSibling;
						}
						return null;
					}
				});
			}
			
			self._execAction('_platformDetect', 1);
		},
		
		/**
		 * Refresh
		 * @since 2.0.0
		 * @param {boolean} init
		 * @param {boolean} force
		 */
		
		_refresh: function(init, force){
			var self = this;
				
			self._execAction('_refresh', 0, arguments);

			self._$targets = self._$container.find(self.selectors.target);
			
			for(var i = 0; i < self._$targets.length; i++){
				var target = self._$targets[i];
					
				if(target.dataset === undf || force){
						
					target.dataset = {};
					
					for(var j = 0; j < target.attributes.length; j++){
						
						var attr = target.attributes[j],
							name = attr.name,
							val = attr.value;
							
						if(name.indexOf('data-') > -1){
							var dataName = self._helpers._camelCase(name.substring(5,name.length));
							target.dataset[dataName] = val;
						}
					}
				}
				
				if(target.mixParent === undf){
					target.mixParent = self._id;
				}
			}
			
			if(
				(self._$targets.length && init) ||
				(!self._origOrder.length && self._$targets.length)
			){
				self._origOrder = [];
				
				for(var i = 0; i < self._$targets.length; i++){
					var target = self._$targets[i];
					
					self._origOrder.push(target);
				}
			}
			
			self._execAction('_refresh', 1, arguments);
		},
		
		/**
		 * Bind Handlers
		 * @since 2.0.0
		 */
		
		_bindHandlers: function(){
			var self = this,
				filters = $.MixItUp.prototype._bound._filter,
				sorts = $.MixItUp.prototype._bound._sort;
			
			self._execAction('_bindHandlers', 0);
			
			if(self.controls.live){
				self._$body
					.on('click.mixItUp.'+self._id, self.selectors.sort, function(){
						self._processClick($(this), 'sort');
					})
					.on('click.mixItUp.'+self._id, self.selectors.filter, function(){
						self._processClick($(this), 'filter');
					});
			} else {
				self._$sortButtons = $(self.selectors.sort);
				self._$filterButtons = $(self.selectors.filter);
				
				self._$sortButtons.on('click.mixItUp.'+self._id, function(){
					self._processClick($(this), 'sort');
				});
				
				self._$filterButtons.on('click.mixItUp.'+self._id, function(){
					self._processClick($(this), 'filter');
				});
			}

			filters[self.selectors.filter] = (filters[self.selectors.filter] === undf) ? 1 : filters[self.selectors.filter] + 1;
			sorts[self.selectors.sort] = (sorts[self.selectors.sort] === undf) ? 1 : sorts[self.selectors.sort] + 1;
			
			self._execAction('_bindHandlers', 1);
		},
		
		/**
		 * Process Click
		 * @since 2.0.0
		 * @param {object} $button
		 * @param {string} type
		 */
		
		_processClick: function($button, type){
			var self = this,
				trackClick = function($button, type, off){
					var proto = $.MixItUp.prototype;
						
					proto._handled['_'+type][self.selectors[type]] = (proto._handled['_'+type][self.selectors[type]] === undf) ? 
						1 : 
						proto._handled['_'+type][self.selectors[type]] + 1;

					if(proto._handled['_'+type][self.selectors[type]] === proto._bound['_'+type][self.selectors[type]]){
						$button[(off ? 'remove' : 'add')+'Class'](self.controls.activeClass);
						delete proto._handled['_'+type][self.selectors[type]];
					}
				};
			
			self._execAction('_processClick', 0, arguments);
			
			if(!self._mixing || (self.animation.queue && self._queue.length < self.animation.queueLimit)){
				self._clicking = true;
				
				if(type === 'sort'){
					var sort = $button.attr('data-sort');
					
					if(!$button.hasClass(self.controls.activeClass) || sort.indexOf('random') > -1){
						$(self.selectors.sort).removeClass(self.controls.activeClass);
						trackClick($button, type);
						self.sort(sort);
					}
				}
				
				if(type === 'filter') {
					var filter = $button.attr('data-filter'),
						ndx,
						seperator = self.controls.toggleLogic === 'or' ? ',' : '';
					
					if(!self.controls.toggleFilterButtons){
						if(!$button.hasClass(self.controls.activeClass)){
							$(self.selectors.filter).removeClass(self.controls.activeClass);
							trackClick($button, type);
							self.filter(filter);
						}
					} else {
						self._buildToggleArray();
						
						if(!$button.hasClass(self.controls.activeClass)){
							trackClick($button, type);
							
							self._toggleArray.push(filter);
						} else {
							trackClick($button, type, true);
							ndx = self._toggleArray.indexOf(filter);
							self._toggleArray.splice(ndx, 1);
						}
						
						self._toggleArray = $.grep(self._toggleArray,function(n){return(n);});
						
						self._toggleString = self._toggleArray.join(seperator);

						self.filter(self._toggleString);
					}
				}
				
				self._execAction('_processClick', 1, arguments);
			} else {
				if(typeof self.callbacks.onMixBusy === 'function'){
					self.callbacks.onMixBusy.call(self._domNode, self._state, self);
				}
				self._execAction('_processClickBusy', 1, arguments);
			}
		},
		
		/**
		 * Build Toggle Array
		 * @since 2.0.0
		 */
		
		_buildToggleArray: function(){
			var self = this,
				activeFilter = self._activeFilter.replace(/\s/g, '');
			
			self._execAction('_buildToggleArray', 0, arguments);
			
			if(self.controls.toggleLogic === 'or'){
				self._toggleArray = activeFilter.split(',');
			} else {
				self._toggleArray = activeFilter.split('.');
				
				!self._toggleArray[0] && self._toggleArray.shift();
				
				for(var i = 0, filter; filter = self._toggleArray[i]; i++){
					self._toggleArray[i] = '.'+filter;
				}
			}
			
			self._execAction('_buildToggleArray', 1, arguments);
		},
		
		/**
		 * Update Controls
		 * @since 2.0.0
		 * @param {object} command
		 * @param {boolean} multi
		 */
		
		_updateControls: function(command, multi){
			var self = this,
				output = {
					filter: command.filter,
					sort: command.sort
				},
				update = function($el, filter){
					(multi && type === 'filter' && !(output.filter === 'none' || output.filter === '')) ?
						$el.filter(filter).addClass(self.controls.activeClass) :
						$el.removeClass(self.controls.activeClass).filter(filter).addClass(self.controls.activeClass);
				},
				type = 'filter',
				$el = null;
				
			self._execAction('_updateControls', 0, arguments);
				
			(command.filter === undf) && (output.filter = self._activeFilter);
			(command.sort === undf) && (output.sort = self._activeSort);
			(output.filter === self.selectors.target) && (output.filter = 'all');
			
			for(var i = 0; i < 2; i++){
				$el = self.controls.live ? $(self.selectors[type]) : self['_$'+type+'Buttons'];
				$el && update($el, '[data-'+type+'="'+output[type]+'"]');
				type = 'sort';
			}
			
			self._execAction('_updateControls', 1, arguments);
		},
		
		/**
		 * Filter (private)
		 * @since 2.0.0
		 */
		
		_filter: function(){
			var self = this;
			
			self._execAction('_filter', 0);
			
			for(var i = 0; i < self._$targets.length; i++){
				var $target = $(self._$targets[i]);
				
				if($target.is(self._activeFilter)){
					self._$show = self._$show.add($target);
				} else {
					self._$hide = self._$hide.add($target);
				}
			}
			
			self._execAction('_filter', 1);
		},
		
		/**
		 * Sort (private)
		 * @since 2.0.0
		 */
		
		_sort: function(){
			var self = this,
				arrayShuffle = function(oldArray){
					var newArray = oldArray.slice(),
						len = newArray.length,
						i = len;

					while(i--){
						var p = parseInt(Math.random()*len);
						var t = newArray[i];
						newArray[i] = newArray[p];
						newArray[p] = t;
					};
					return newArray; 
				};
				
			self._execAction('_sort', 0);
			
			self._startOrder = [];
			
			for(var i = 0; i < self._$targets.length; i++){
				var target = self._$targets[i];
				
				self._startOrder.push(target);
			}
			
			switch(self._newSort[0].sortBy){
				case 'default':
					self._newOrder = self._origOrder;
					break;
				case 'random':
					self._newOrder = arrayShuffle(self._startOrder);
					break;
				case 'custom':
					self._newOrder = self._newSort[0].order;
					break;
				default:
					self._newOrder = self._startOrder.concat().sort(function(a, b){
						return self._compare(a, b);
					});
			}
			
			self._execAction('_sort', 1);
		},
		
		/**
		 * Compare Algorithm
		 * @since 2.0.0
		 * @param {string|number} a
		 * @param {string|number} b
		 * @param {number} depth (recursion)
		 * @return {number}
		 */
		
		_compare: function(a, b, depth){
			depth = depth ? depth : 0;
		
			var self = this,
				order = self._newSort[depth].order,
				getData = function(el){
					return el.dataset[self._newSort[depth].sortBy] || 0;
				},
				attrA = isNaN(getData(a) * 1) ? getData(a).toLowerCase() : getData(a) * 1,
				attrB = isNaN(getData(b) * 1) ? getData(b).toLowerCase() : getData(b) * 1;
				
			if(attrA < attrB)
				return order === 'asc' ? -1 : 1;
			if(attrA > attrB)
				return order === 'asc' ? 1 : -1;
			if(attrA === attrB && self._newSort.length > depth+1)
				return self._compare(a, b, depth+1);

			return 0;
		},
		
		/**
		 * Print Sort
		 * @since 2.0.0
		 * @param {boolean} reset
		 */
		
		_printSort: function(reset){
			var self = this,
				order = reset ? self._startOrder : self._newOrder,
				targets = self._$parent[0].querySelectorAll(self.selectors.target),
				nextSibling = targets.length ? targets[targets.length -1].nextElementSibling : null,
				frag = document.createDocumentFragment();
				
			self._execAction('_printSort', 0, arguments);
			
			for(var i = 0; i < targets.length; i++){
				var target = targets[i],
					whiteSpace = target.nextSibling;

				if(target.style.position === 'absolute') continue;
			
				if(whiteSpace && whiteSpace.nodeName === '#text'){
					self._$parent[0].removeChild(whiteSpace);
				}
				
				self._$parent[0].removeChild(target);
			}
			
			for(var i = 0; i < order.length; i++){
				var el = order[i];

				if(self._newSort[0].sortBy === 'default' && self._newSort[0].order === 'desc' && !reset){
					var firstChild = frag.firstChild;
					frag.insertBefore(el, firstChild);
					frag.insertBefore(document.createTextNode(' '), el);
				} else {
					frag.appendChild(el);
					frag.appendChild(document.createTextNode(' '));
				}
			}
			
			nextSibling ? 
				self._$parent[0].insertBefore(frag, nextSibling) :
				self._$parent[0].appendChild(frag);
				
			self._execAction('_printSort', 1, arguments);
		},
		
		/**
		 * Parse Sort
		 * @since 2.0.0
		 * @param {string} sortString
		 * @return {array} newSort
		 */
		
		_parseSort: function(sortString){
			var self = this,
				rules = typeof sortString === 'string' ? sortString.split(' ') : [sortString],
				newSort = [];
				
			for(var i = 0; i < rules.length; i++){
				var rule = typeof sortString === 'string' ? rules[i].split(':') : ['custom', rules[i]],
					ruleObj = {
						sortBy: self._helpers._camelCase(rule[0]),
						order: rule[1] || 'asc'
					};
					
				newSort.push(ruleObj);
				
				if(ruleObj.sortBy === 'default' || ruleObj.sortBy === 'random') break;
			}
			
			return self._execFilter('_parseSort', newSort, arguments);
		},
		
		/**
		 * Parse Effects
		 * @since 2.0.0
		 * @return {object} effects
		 */
		
		_parseEffects: function(){
			var self = this,
				effects = {
					opacity: '',
					transformIn: '',
					transformOut: '',
					filter: ''
				},
				parse = function(effect, extract, reverse){
					if(self.animation.effects.indexOf(effect) > -1){
						if(extract){
							var propIndex = self.animation.effects.indexOf(effect+'(');
							if(propIndex > -1){
								var str = self.animation.effects.substring(propIndex),
									match = /\(([^)]+)\)/.exec(str),
									val = match[1];

									return {val: val};
							}
						}
						return true;
					} else {
						return false;
					}
				},
				negate = function(value, invert){
					if(invert){
						return value.charAt(0) === '-' ? value.substr(1, value.length) : '-'+value;
					} else {
						return value;
					}
				},
				buildTransform = function(key, invert){
					var transforms = [
						['scale', '.01'],
						['translateX', '20px'],
						['translateY', '20px'],
						['translateZ', '20px'],
						['rotateX', '90deg'],
						['rotateY', '90deg'],
						['rotateZ', '180deg'],
					];
					
					for(var i = 0; i < transforms.length; i++){
						var prop = transforms[i][0],
							def = transforms[i][1],
							inverted = invert && prop !== 'scale';
							
						effects[key] += parse(prop) ? prop+'('+negate(parse(prop, true).val || def, inverted)+') ' : '';
					}
				};
			
			effects.opacity = parse('fade') ? parse('fade',true).val || '0' : '1';
			
			buildTransform('transformIn');
			
			self.animation.reverseOut ? buildTransform('transformOut', true) : (effects.transformOut = effects.transformIn);

			effects.transition = {};
			
			effects.transition = self._getPrefixedCSS('transition','all '+self.animation.duration+'ms '+self.animation.easing+', opacity '+self.animation.duration+'ms linear');
		
			self.animation.stagger = parse('stagger') ? true : false;
			self.animation.staggerDuration = parseInt(parse('stagger') ? (parse('stagger',true).val ? parse('stagger',true).val : 100) : 100);

			return self._execFilter('_parseEffects', effects);
		},
		
		/**
		 * Build State
		 * @since 2.0.0
		 * @param {boolean} future
		 * @return {object} futureState
		 */
		
		_buildState: function(future){
			var self = this,
				state = {};
			
			self._execAction('_buildState', 0);
			
			state = {
				activeFilter: self._activeFilter === '' ? 'none' : self._activeFilter,
				activeSort: future && self._newSortString ? self._newSortString : self._activeSort,
				fail: !self._$show.length && self._activeFilter !== '',
				$targets: self._$targets,
				$show: self._$show,
				$hide: self._$hide,
				totalTargets: self._$targets.length,
				totalShow: self._$show.length,
				totalHide: self._$hide.length,
				display: future && self._newDisplay ? self._newDisplay : self.layout.display
			};
			
			if(future){
				return self._execFilter('_buildState', state);
			} else {
				self._state = state;
				
				self._execAction('_buildState', 1);
			}
		},
		
		/**
		 * Go Mix
		 * @since 2.0.0
		 * @param {boolean} animate
		 */
		
		_goMix: function(animate){
			var self = this,
				phase1 = function(){
					if(self._chrome && (self._chrome === 31)){
						chromeFix(self._$parent[0]);
					}
					
					self._setInter();
					
					phase2();
				},
				phase2 = function(){
					var scrollTop = window.pageYOffset,
						scrollLeft = window.pageXOffset,
						docHeight = document.documentElement.scrollHeight;

					self._getInterMixData();
					
					self._setFinal();

					self._getFinalMixData();

					(window.pageYOffset !== scrollTop) && window.scrollTo(scrollLeft, scrollTop);

					self._prepTargets();
					
					if(window.requestAnimationFrame){
						requestAnimationFrame(phase3);
					} else {
						setTimeout(function(){
							phase3();
						},20);
					}
				},
				phase3 = function(){
					self._animateTargets();

					if(self._targetsBound === 0){
						self._cleanUp();
					}
				},
				chromeFix = function(grid){
					var parent = grid.parentElement,
						placeholder = document.createElement('div'),
						frag = document.createDocumentFragment();

					parent.insertBefore(placeholder, grid);
					frag.appendChild(grid);
					parent.replaceChild(grid, placeholder);
				},
				futureState = self._buildState(true);
				
			self._execAction('_goMix', 0, arguments);
				
			!self.animation.duration && (animate = false);

			self._mixing = true;
			
			self._$container.removeClass(self.layout.containerClassFail);
			
			if(typeof self.callbacks.onMixStart === 'function'){
				self.callbacks.onMixStart.call(self._domNode, self._state, futureState, self);
			}
			
			self._$container.trigger('mixStart', [self._state, futureState, self]);
			
			self._getOrigMixData();
			
			if(animate && !self._suckMode){
			
				window.requestAnimationFrame ?
					requestAnimationFrame(phase1) :
					phase1();
			
			} else {
				self._cleanUp();
			}
			
			self._execAction('_goMix', 1, arguments);
		},
		
		/**
		 * Get Target Data
		 * @since 2.0.0
		 */
		
		_getTargetData: function(el, stage){
			var self = this,
				elStyle;
			
			el.dataset[stage+'PosX'] = el.offsetLeft;
			el.dataset[stage+'PosY'] = el.offsetTop;

			if(self.animation.animateResizeTargets){
				elStyle = window.getComputedStyle(el);
			
				el.dataset[stage+'MarginBottom'] = parseInt(elStyle.marginBottom);
				el.dataset[stage+'MarginRight'] = parseInt(elStyle.marginRight);
				el.dataset[stage+'Width'] = el.offsetWidth;
				el.dataset[stage+'Height'] = el.offsetHeight;
			}
		},
		
		/**
		 * Get Original Mix Data
		 * @since 2.0.0
		 */
		
		_getOrigMixData: function(){
			var self = this,
				parentStyle = !self._suckMode ? window.getComputedStyle(self._$parent[0]) : {boxSizing: ''},
				parentBS = parentStyle.boxSizing || parentStyle[self._vendor+'BoxSizing'];
	
			self._incPadding = (parentBS === 'border-box');
			
			self._execAction('_getOrigMixData', 0);
			
			!self._suckMode && (self.effects = self._parseEffects());
		
			self._$toHide = self._$hide.filter(':visible');
			self._$toShow = self._$show.filter(':hidden');
			self._$pre = self._$targets.filter(':visible');

			self._startHeight = self._incPadding ? 
				self._$parent.outerHeight() : 
				self._$parent.height();
				
			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i];
				
				self._getTargetData(el, 'orig');
			}
			
			self._execAction('_getOrigMixData', 1);
		},
		
		/**
		 * Set Intermediate Positions
		 * @since 2.0.0
		 */
		
		_setInter: function(){
			var self = this;
			
			self._execAction('_setInter', 0);
			
			if(self._changingLayout && self.animation.animateChangeLayout){
				self._$toShow.css('display',self._newDisplay);

				if(self._changingClass){
					self._$container
						.removeClass(self.layout.containerClass)
						.addClass(self._newClass);
				}
			} else {
				self._$toShow.css('display', self.layout.display);
			}
			
			self._execAction('_setInter', 1);
		},
		
		/**
		 * Get Intermediate Mix Data
		 * @since 2.0.0
		 */
		
		_getInterMixData: function(){
			var self = this;
			
			self._execAction('_getInterMixData', 0);
			
			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i];
					
				self._getTargetData(el, 'inter');
			}
			
			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i];
					
				self._getTargetData(el, 'inter');
			}
			
			self._execAction('_getInterMixData', 1);
		},
		
		/**
		 * Set Final Positions
		 * @since 2.0.0
		 */
		
		_setFinal: function(){
			var self = this;
			
			self._execAction('_setFinal', 0);
			
			self._sorting && self._printSort();

			self._$toHide.removeStyle('display');
			
			if(self._changingLayout && self.animation.animateChangeLayout){
				self._$pre.css('display',self._newDisplay);
			}
			
			self._execAction('_setFinal', 1);
		},
		
		/**
		 * Get Final Mix Data
		 * @since 2.0.0
		 */
		
		_getFinalMixData: function(){
			var self = this;
			
			self._execAction('_getFinalMixData', 0);
	
			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i];
					
				self._getTargetData(el, 'final');
			}
			
			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i];
					
				self._getTargetData(el, 'final');
			}
			
			self._newHeight = self._incPadding ? 
				self._$parent.outerHeight() : 
				self._$parent.height();

			self._sorting && self._printSort(true);
	
			self._$toShow.removeStyle('display');
			
			self._$pre.css('display',self.layout.display);
			
			if(self._changingClass && self.animation.animateChangeLayout){
				self._$container
					.removeClass(self._newClass)
					.addClass(self.layout.containerClass);
			}
			
			self._execAction('_getFinalMixData', 1);
		},
		
		/**
		 * Prepare Targets
		 * @since 2.0.0
		 */
		
		_prepTargets: function(){
			var self = this,
				transformCSS = {
					_in: self._getPrefixedCSS('transform', self.effects.transformIn),
					_out: self._getPrefixedCSS('transform', self.effects.transformOut)
				};

			self._execAction('_prepTargets', 0);
			
			if(self.animation.animateResizeContainer){
				self._$parent.css('height',self._startHeight+'px');
			}
			
			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i],
					$el = $(el);
				
				el.style.opacity = self.effects.opacity;
				el.style.display = (self._changingLayout && self.animation.animateChangeLayout) ?
					self._newDisplay :
					self.layout.display;
					
				$el.css(transformCSS._in);
				
				if(self.animation.animateResizeTargets){
					el.style.width = el.dataset.finalWidth+'px';
					el.style.height = el.dataset.finalHeight+'px';
					el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth) + (el.dataset.finalMarginRight * 1)+'px';
					el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight) + (el.dataset.finalMarginBottom * 1)+'px';
				}
			}

			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i],
					$el = $(el),
					translate = {
						x: el.dataset.origPosX - el.dataset.interPosX,
						y: el.dataset.origPosY - el.dataset.interPosY
					},
					transformCSS = self._getPrefixedCSS('transform','translate('+translate.x+'px,'+translate.y+'px)');

				$el.css(transformCSS);
				
				if(self.animation.animateResizeTargets){
					el.style.width = el.dataset.origWidth+'px';
					el.style.height = el.dataset.origHeight+'px';
					
					if(el.dataset.origWidth - el.dataset.finalWidth){
						el.style.marginRight = -(el.dataset.origWidth - el.dataset.interWidth) + (el.dataset.origMarginRight * 1)+'px';
					}
					
					if(el.dataset.origHeight - el.dataset.finalHeight){
						el.style.marginBottom = -(el.dataset.origHeight - el.dataset.interHeight) + (el.dataset.origMarginBottom * 1) +'px';
					}
				}
			}
			
			self._execAction('_prepTargets', 1);
		},
		
		/**
		 * Animate Targets
		 * @since 2.0.0
		 */
		
		_animateTargets: function(){
			var self = this;

			self._execAction('_animateTargets', 0);
			
			self._targetsDone = 0;
			self._targetsBound = 0;
			
			self._$parent
				.css(self._getPrefixedCSS('perspective', self.animation.perspectiveDistance+'px'))
				.css(self._getPrefixedCSS('perspective-origin', self.animation.perspectiveOrigin));
			
			if(self.animation.animateResizeContainer){
				self._$parent
					.css(self._getPrefixedCSS('transition','height '+self.animation.duration+'ms ease'))
					.css('height',self._newHeight+'px');
			}
			
			for(var i = 0; i < self._$toShow.length; i++){
				var el = self._$toShow[i],
					$el = $(el),
					translate = {
						x: el.dataset.finalPosX - el.dataset.interPosX,
						y: el.dataset.finalPosY - el.dataset.interPosY
					},
					delay = self._getDelay(i),
					toShowCSS = {};
				
				el.style.opacity = '';
				
				for(var j = 0; j < 2; j++){
					var a = j === 0 ? a = self._prefix : '';
					
					if(self._ff && self._ff <= 20){
						toShowCSS[a+'transition-property'] = 'all';
						toShowCSS[a+'transition-timing-function'] = self.animation.easing+'ms';
						toShowCSS[a+'transition-duration'] = self.animation.duration+'ms';
					}
					
					toShowCSS[a+'transition-delay'] = delay+'ms';
					toShowCSS[a+'transform'] = 'translate('+translate.x+'px,'+translate.y+'px)';
				}
				
				if(self.effects.transform || self.effects.opacity){
					self._bindTargetDone($el);
				}
				
				(self._ff && self._ff <= 20) ? 
					$el.css(toShowCSS) : 
					$el.css(self.effects.transition).css(toShowCSS);
			}
			
			for(var i = 0; i < self._$pre.length; i++){
				var el = self._$pre[i],
					$el = $(el),
					translate = {
						x: el.dataset.finalPosX - el.dataset.interPosX,
						y: el.dataset.finalPosY - el.dataset.interPosY
					},
					delay = self._getDelay(i);
					
				if(!(
					el.dataset.finalPosX === el.dataset.origPosX &&
					el.dataset.finalPosY === el.dataset.origPosY
				)){
					self._bindTargetDone($el);
				}
				
				$el.css(self._getPrefixedCSS('transition', 'all '+self.animation.duration+'ms '+self.animation.easing+' '+delay+'ms'));
				$el.css(self._getPrefixedCSS('transform', 'translate('+translate.x+'px,'+translate.y+'px)'));
				
				if(self.animation.animateResizeTargets){
					if(el.dataset.origWidth - el.dataset.finalWidth && el.dataset.finalWidth * 1){
						el.style.width = el.dataset.finalWidth+'px';
						el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth)+(el.dataset.finalMarginRight * 1)+'px';
					}
					
					if(el.dataset.origHeight - el.dataset.finalHeight && el.dataset.finalHeight * 1){
						el.style.height = el.dataset.finalHeight+'px';
						el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight)+(el.dataset.finalMarginBottom * 1) +'px';
					}
				}
			}
			
			if(self._changingClass){
				self._$container
					.removeClass(self.layout.containerClass)
					.addClass(self._newClass);
			}
			
			for(var i = 0; i < self._$toHide.length; i++){
				var el = self._$toHide[i],
					$el = $(el),
					delay = self._getDelay(i),
					toHideCSS = {};

				for(var j = 0; j<2; j++){
					var a = j === 0 ? a = self._prefix : '';

					toHideCSS[a+'transition-delay'] = delay+'ms';
					toHideCSS[a+'transform'] = self.effects.transformOut;
					toHideCSS.opacity = self.effects.opacity;
				}
				
				$el.css(self.effects.transition).css(toHideCSS);
			
				if(self.effects.transform || self.effects.opacity){
					self._bindTargetDone($el);
				};
			}
			
			self._execAction('_animateTargets', 1);

		},
		
		/**
		 * Bind Targets TransitionEnd
		 * @since 2.0.0
		 * @param {object} $el
		 */
		
		_bindTargetDone: function($el){
			var self = this,
				el = $el[0];
				
			self._execAction('_bindTargetDone', 0, arguments);
			
			if(!el.dataset.bound){
				
				el.dataset.bound = true;
				self._targetsBound++;
			
				$el.on('webkitTransitionEnd.mixItUp transitionend.mixItUp',function(e){
					if(
						(e.originalEvent.propertyName.indexOf('transform') > -1 || 
						e.originalEvent.propertyName.indexOf('opacity') > -1) &&
						$(e.originalEvent.target).is(self.selectors.target)
					){
						$el.off('.mixItUp');
						delete el.dataset.bound;
						self._targetDone();
					}
				});
			}
			
			self._execAction('_bindTargetDone', 1, arguments);
		},
		
		/**
		 * Target Done
		 * @since 2.0.0
		 */
		
		_targetDone: function(){
			var self = this;
			
			self._execAction('_targetDone', 0);
			
			self._targetsDone++;
			
			(self._targetsDone === self._targetsBound) && self._cleanUp();
			
			self._execAction('_targetDone', 1);
		},
		
		/**
		 * Clean Up
		 * @since 2.0.0
		 */
		
		_cleanUp: function(){
			var self = this,
				targetStyles = self.animation.animateResizeTargets ? 'transform opacity width height margin-bottom margin-right' : 'transform opacity';
				unBrake = function(){
					self._$targets.removeStyle('transition', self._prefix);
				};
				
			self._execAction('_cleanUp', 0);
			
			!self._changingLayout ?
				self._$show.css('display',self.layout.display) :
				self._$show.css('display',self._newDisplay);
			
			self._$targets.css(self._brake);
			
			self._$targets
				.removeStyle(targetStyles, self._prefix)
				.removeAttr('data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom');
				
			self._$hide.removeStyle('display');
			
			self._$parent.removeStyle('height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin', self._prefix);
			
			if(self._sorting){
				self._printSort();
				self._activeSort = self._newSortString;
				self._sorting = false;
			}
			
			if(self._changingLayout){
				if(self._changingDisplay){
					self.layout.display = self._newDisplay;
					self._changingDisplay = false;
				}
				
				if(self._changingClass){
					self._$parent.removeClass(self.layout.containerClass).addClass(self._newClass);
					self.layout.containerClass = self._newClass;
					self._changingClass = false;
				}
				
				self._changingLayout = false;
			}
			
			self._refresh();
			
			self._buildState();
			
			if(self._state.fail){
				self._$container.addClass(self.layout.containerClassFail);
			}
			
			self._$show = $();
			self._$hide = $();
			
			if(window.requestAnimationFrame){
				requestAnimationFrame(unBrake);
			}
			
			self._mixing = false;
			
			if(typeof self.callbacks._user === 'function'){
				self.callbacks._user.call(self._domNode, self._state, self);
			}
			
			if(typeof self.callbacks.onMixEnd === 'function'){
				self.callbacks.onMixEnd.call(self._domNode, self._state, self);
			}
			
			self._$container.trigger('mixEnd', [self._state, self]);
			
			if(self._state.fail){
				(typeof self.callbacks.onMixFail === 'function') && self.callbacks.onMixFail.call(self._domNode, self._state, self);
				self._$container.trigger('mixFail', [self._state, self]);
			}
			
			if(self._loading){
				(typeof self.callbacks.onMixLoad === 'function') && self.callbacks.onMixLoad.call(self._domNode, self._state, self);
				self._$container.trigger('mixLoad', [self._state, self]);
			}
			
			if(self._queue.length){
				self._execAction('_queue', 0);
				
				self.multiMix(self._queue[0][0],self._queue[0][1],self._queue[0][2]);
				self._queue.splice(0, 1);
			}
			
			self._execAction('_cleanUp', 1);
			
			self._loading = false;
		},
		
		/**
		 * Get Prefixed CSS
		 * @since 2.0.0
		 * @param {string} property
		 * @param {string} value
		 * @param {boolean} prefixValue
		 * @return {object} styles
		 */
		
		_getPrefixedCSS: function(property, value, prefixValue){
			var self = this,
				styles = {};
		
			for(i = 0; i < 2; i++){
				var prefix = i === 0 ? self._prefix : '';
				prefixValue ? styles[prefix+property] = prefix+value : styles[prefix+property] = value;
			}
			
			return self._execFilter('_getPrefixedCSS', styles, arguments);
		},
		
		/**
		 * Get Delay
		 * @since 2.0.0
		 * @param {number} i
		 * @return {number} delay
		 */
		
		_getDelay: function(i){
			var self = this,
				n = typeof self.animation.staggerSequence === 'function' ? self.animation.staggerSequence.call(self._domNode, i, self._state) : i,
				delay = self.animation.stagger ? n * self.animation.staggerDuration : 0;
				
			return self._execFilter('_getDelay', delay, arguments);
		},
		
		/**
		 * Parse MultiMix Arguments
		 * @since 2.0.0
		 * @param {array} args
		 * @return {object} output
		 */
		
		_parseMultiMixArgs: function(args){
			var self = this,
				output = {
					command: null,
					animate: self.animation.enable,
					callback: null
				};
				
			for(var i = 0; i < args.length; i++){
				var arg = args[i];

				if(arg !== null){
					if(typeof arg === 'object' || typeof arg === 'string'){
						output.command = arg;
					} else if(typeof arg === 'boolean'){
						output.animate = arg;
					} else if(typeof arg === 'function'){
						output.callback = arg;
					}
				}
			}
			
			return self._execFilter('_parseMultiMixArgs', output, arguments);
		},
		
		/**
		 * Parse Insert Arguments
		 * @since 2.0.0
		 * @param {array} args
		 * @return {object} output
		 */
		
		_parseInsertArgs: function(args){
			var self = this,
				output = {
					index: 0,
					$object: $(),
					multiMix: {filter: self._state.activeFilter},
					callback: null
				};
			
			for(var i = 0; i < args.length; i++){
				var arg = args[i];
				
				if(typeof arg === 'number'){
					output.index = arg;
				} else if(typeof arg === 'object' && arg instanceof $){
					output.$object = arg;
				} else if(typeof arg === 'object' && self._helpers._isElement(arg)){
					output.$object = $(arg);
				} else if(typeof arg === 'object' && arg !== null){
					output.multiMix = arg;
				} else if(typeof arg === 'boolean' && !arg){
					output.multiMix = false;
				} else if(typeof arg === 'function'){
					output.callback = arg;
				}
			}
			
			return self._execFilter('_parseInsertArgs', output, arguments);
		},
		
		/**
		 * Execute Action
		 * @since 2.0.0
		 * @param {string} methodName
		 * @param {boolean} isPost
		 * @param {array} args
		 */
		
		_execAction: function(methodName, isPost, args){
			var self = this,
				context = isPost ? 'post' : 'pre';

			if(!self._actions.isEmptyObject && self._actions.hasOwnProperty(methodName)){
				for(var key in self._actions[methodName][context]){
					self._actions[methodName][context][key].call(self, args);
				}
			}
		},
		
		/**
		 * Execute Filter
		 * @since 2.0.0
		 * @param {string} methodName
		 * @param {mixed} value
		 * @return {mixed} value
		 */
		
		_execFilter: function(methodName, value, args){
			var self = this;
			
			if(!self._filters.isEmptyObject && self._filters.hasOwnProperty(methodName)){
				for(var key in self._filters[methodName]){
					return self._filters[methodName][key].call(self, args);
				}
			} else {
				return value;
			}
		},
		
		/* Helpers
		---------------------------------------------------------------------- */

		_helpers: {
			
			/**
			 * CamelCase
			 * @since 2.0.0
			 * @param {string}
			 * @return {string}
			 */

			_camelCase: function(string){
				return string.replace(/-([a-z])/g, function(g){
						return g[1].toUpperCase();
				});
			},
			
			/**
			 * Is Element
			 * @since 2.1.3
			 * @param {object} element to test
			 * @return {boolean}
			 */
			
			_isElement: function(el){
				if(window.HTMLElement){
					return el instanceof HTMLElement;
				} else {
					return (
						el !== null && 
						el.nodeType === 1 &&
						el.nodeName === 'string'
					);
				}
			}
		},
		
		/* Public Methods
		---------------------------------------------------------------------- */
		
		/**
		 * Is Mixing
		 * @since 2.0.0
		 * @return {boolean}
		 */
		
		isMixing: function(){
			var self = this;
			
			return self._execFilter('isMixing', self._mixing);
		},
		
		/**
		 * Filter (public)
		 * @since 2.0.0
		 * @param {array} arguments
		 */
		
		filter: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self._clicking && (self._toggleString = '');
			
			self.multiMix({filter: args.command}, args.animate, args.callback);
		},
		
		/**
		 * Sort (public)
		 * @since 2.0.0
		 * @param {array} arguments
		 */
		
		sort: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self.multiMix({sort: args.command}, args.animate, args.callback);
		},

		/**
		 * Change Layout (public)
		 * @since 2.0.0
		 * @param {array} arguments
		 */
		
		changeLayout: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);
				
			self.multiMix({changeLayout: args.command}, args.animate, args.callback);
		},
		
		/**
		 * MultiMix
		 * @since 2.0.0
		 * @param {array} arguments
		 */
		
		multiMix: function(){
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self._execAction('multiMix', 0, arguments);

			if(!self._mixing){
				if(self.controls.enable && !self._clicking){
					self.controls.toggleFilterButtons && self._buildToggleArray();
					self._updateControls(args.command, self.controls.toggleFilterButtons);
				}
				
				(self._queue.length < 2) && (self._clicking = false);
			
				delete self.callbacks._user;
				if(args.callback) self.callbacks._user = args.callback;
			
				var sort = args.command.sort,
					filter = args.command.filter,
					changeLayout = args.command.changeLayout;

				self._refresh();

				if(sort){
					self._newSort = self._parseSort(sort);
					self._newSortString = sort;
					
					self._sorting = true;
					self._sort();
				}
				
				if(filter !== undf){
					filter = (filter === 'all') ? self.selectors.target : filter;
	
					self._activeFilter = filter;
				}
				
				self._filter();
				
				if(changeLayout){
					self._newDisplay = (typeof changeLayout === 'string') ? changeLayout : changeLayout.display || self.layout.display;
					self._newClass = changeLayout.containerClass || '';

					if(
						self._newDisplay !== self.layout.display ||
						self._newClass !== self.layout.containerClass
					){
						self._changingLayout = true;
						
						self._changingClass = (self._newClass !== self.layout.containerClass);
						self._changingDisplay = (self._newDisplay !== self.layout.display);
					}
				}
				
				self._$targets.css(self._brake);
				
				self._goMix(args.animate ^ self.animation.enable ? args.animate : self.animation.enable);
				
				self._execAction('multiMix', 1, arguments);
				
			} else {
				if(self.animation.queue && self._queue.length < self.animation.queueLimit){
					self._queue.push(arguments);
					
					(self.controls.enable && !self._clicking) && self._updateControls(args.command);
					
					self._execAction('multiMixQueue', 1, arguments);
					
				} else {
					if(typeof self.callbacks.onMixBusy === 'function'){
						self.callbacks.onMixBusy.call(self._domNode, self._state, self);
					}
					self._$container.trigger('mixBusy', [self._state, self]);
					
					self._execAction('multiMixBusy', 1, arguments);
				}
			}
		},
		
		/**
		 * Insert
		 * @since 2.0.0
		 * @param {array} arguments
		 */
		
		insert: function(){
			var self = this,
				args = self._parseInsertArgs(arguments),
				callback = (typeof args.callback === 'function') ? args.callback : null,
				frag = document.createDocumentFragment(),
				target = (function(){
					self._refresh();
					
					if(self._$targets.length){
						return (args.index < self._$targets.length || !self._$targets.length) ? 
							self._$targets[args.index] :
							self._$targets[self._$targets.length-1].nextElementSibling;
					} else {
						return self._$parent[0].children[0];
					}
				})();
						
			self._execAction('insert', 0, arguments);
				
			if(args.$object){
				for(var i = 0; i < args.$object.length; i++){
					var el = args.$object[i];
					
					frag.appendChild(el);
					frag.appendChild(document.createTextNode(' '));
				}

				self._$parent[0].insertBefore(frag, target);
			}
			
			self._execAction('insert', 1, arguments);
			
			if(typeof args.multiMix === 'object'){
				self.multiMix(args.multiMix, callback);
			}
		},

		/**
		 * Prepend
		 * @since 2.0.0
		 * @param {array} arguments
		 */
		
		prepend: function(){
			var self = this,
				args = self._parseInsertArgs(arguments);
				
			self.insert(0, args.$object, args.multiMix, args.callback);
		},
		
		/**
		 * Append
		 * @since 2.0.0
		 * @param {array} arguments
		 */
		
		append: function(){
			var self = this,
				args = self._parseInsertArgs(arguments);
		
			self.insert(self._state.totalTargets, args.$object, args.multiMix, args.callback);
		},
		
		/**
		 * Get Option
		 * @since 2.0.0
		 * @param {string} string
		 * @return {mixed} value
		 */
		
		getOption: function(string){
			var self = this,
				getProperty = function(obj, prop){
					var parts = prop.split('.'),
						last = parts.pop(),
						l = parts.length,
						i = 1,
						current = parts[0] || prop;

					while((obj = obj[current]) && i < l){
						current = parts[i];
						i++;
					}

					if(obj !== undf){
						return obj[last] !== undf ? obj[last] : obj;
					}
				};

			return string ? self._execFilter('getOption', getProperty(self, string), arguments) : self;
		},
		
		/**
		 * Set Options
		 * @since 2.0.0
		 * @param {object} config
		 */
		
		setOptions: function(config){
			var self = this;
			
			self._execAction('setOptions', 0, arguments);
			
			typeof config === 'object' && $.extend(true, self, config);
			
			self._execAction('setOptions', 1, arguments);
		},
		
		/**
		 * Get State
		 * @since 2.0.0
		 * @return {object} state
		 */
		
		getState: function(){
			var self = this;
			
			return self._execFilter('getState', self._state, self);
		},
		
		/**
		 * Force Refresh
		 * @since 2.1.2
		 */
		
		forceRefresh: function(){
			var self = this;
			
			self._refresh(false, true);
		},
		
		/**
		 * Destroy
		 * @since 2.0.0
		 * @param {boolean} hideAll
		 */
		
		destroy: function(hideAll){
			var self = this;
			
			self._execAction('destroy', 0, arguments);
		
			self._$body
				.add($(self.selectors.sort))
				.add($(self.selectors.filter))
				.off('.mixItUp');
			
			for(var i = 0; i < self._$targets.length; i++){
				var target = self._$targets[i];

				hideAll && (target.style.display = '');

				delete target.mixParent;
			}
			
			self._execAction('destroy', 1, arguments);
			
			delete $.MixItUp.prototype._instances[self._id];
		}
		
	};
	
	/* jQuery Methods
	---------------------------------------------------------------------- */
	
	/**
	 * jQuery .mixItUp() method
	 * @since 2.0.0
	 * @extends $.fn
	 */
	
	$.fn.mixItUp = function(){
		var args = arguments,
			dataReturn = [],
			eachReturn,
			_instantiate = function(domNode, settings){
				var instance = new $.MixItUp(),
					rand = function(){
						return ('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6).toUpperCase();
					};
					
				instance._execAction('_instantiate', 0, arguments);

				domNode.id = !domNode.id ? 'MixItUp'+rand() : domNode.id;
				
				if(!instance._instances[domNode.id]){
					instance._instances[domNode.id] = instance;
					instance._init(domNode, settings);
				}
				
				instance._execAction('_instantiate', 1, arguments);
			};
			
		eachReturn = this.each(function(){
			if(args && typeof args[0] === 'string'){
				var instance = $.MixItUp.prototype._instances[this.id];
				if(args[0] === 'isLoaded'){
					dataReturn.push(instance ? true : false);
				} else {
					var data = instance[args[0]](args[1], args[2], args[3]);
					if(data !== undf)dataReturn.push(data);
				}
			} else {
				_instantiate(this, args[0]);
			}
		});
		
		if(dataReturn.length){
			return dataReturn.length > 1 ? dataReturn : dataReturn[0];
		} else {
			return eachReturn;
		}
	};
	
	/**
	 * jQuery .removeStyle() method
	 * @since 2.0.0
	 * @extends $.fn
	 */
	
	$.fn.removeStyle = function(style, prefix){
		prefix = prefix ? prefix : '';
	
		return this.each(function(){
			var el = this,
				styles = style.split(' ');
				
			for(var i = 0; i < styles.length; i++){
				for(var j = 0; j < 4; j++){
					switch (j) {
						case 0:
							var prop = styles[i];
							break;
						case 1:
							var prop = $.MixItUp.prototype._helpers._camelCase(prop);
							break;
						case 2:
							var prop = prefix+styles[i];
							break;
						case 3:
							var prop = $.MixItUp.prototype._helpers._camelCase(prefix+styles[i]);
					}
					
					if(
						el.style[prop] !== undf && 
						typeof el.style[prop] !== 'unknown' &&
						el.style[prop].length > 0
					){
						el.style[prop] = '';
					}
					
					if(!prefix && j === 1)break;
				}
			}
			
			if(el.attributes && el.attributes.style && el.attributes.style !== undf && el.attributes.style.value === ''){
				el.attributes.removeNamedItem('style');
			}
		});
	};
	
})(jQuery);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*********************************************************************
*  #### Twitter Post Fetcher v18.0.2 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals.
    factory();
  }
}(this, function() {
  var domNode = '';
  var maxTweets = 20;
  var parseLinks = true;
  var queue = [];
  var inProgress = false;
  var printTime = true;
  var printUser = true;
  var formatterFunction = null;
  var supportsClassName = true;
  var showRts = true;
  var customCallbackFunction = null;
  var showInteractionLinks = true;
  var showImages = false;
  var useEmoji = false;
  var targetBlank = true;
  var lang = 'en';
  var permalinks = true;
  var dataOnly = false;
  var script = null;
  var scriptAdded = false;

  function handleTweets(tweets){
    if (customCallbackFunction === null) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById(domNode);
      var html = '<ul>';
      while(n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;
    } else {
      customCallbackFunction(tweets);
    }
  }

  function strip(data) {
    return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
        .replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
        '');
  }

  function targetLinksToNewWindow(el) {
    var links = el.getElementsByTagName('a');
    for (var i = links.length - 1; i >= 0; i--) {
      links[i].setAttribute('target', '_blank');
      links[i].setAttribute('rel', 'noopener');
    }
  }

  function getElementsByClassName (node, classname) {
    var a = [];
    var regex = new RegExp('(^| )' + classname + '( |$)');
    var elems = node.getElementsByTagName('*');
    for (var i = 0, j = elems.length; i < j; i++) {
        if(regex.test(elems[i].className)){
          a.push(elems[i]);
        }
    }
    return a;
  }

  function extractImageUrl(image_data) {
    if (image_data !== undefined && image_data.innerHTML.indexOf('data-image') >= 0) {
      var data_src = image_data.innerHTML.match(/data-image=\"([A-z0-9]+:\/\/[A-z0-9]+\.[A-z0-9]+\.[A-z0-9]+\/[A-z0-9]+\/[A-z0-9\-]+)/i)[1];
      return decodeURIComponent(data_src) + '.jpg';
    }
  }
 

  var twitterFetcher = {
    fetch: function(config) {
      if (config.maxTweets === undefined) {
        config.maxTweets = 20;
      }
      if (config.enableLinks === undefined) {
        config.enableLinks = true;
      }
      if (config.showUser === undefined) {
        config.showUser = true;
      }
      if (config.showTime === undefined) {
        config.showTime = true;
      }
      if (config.dateFunction === undefined) {
        config.dateFunction = 'default';
      }
      if (config.showRetweet === undefined) {
        config.showRetweet = true;
      }
      if (config.customCallback === undefined) {
        config.customCallback = null;
      }
      if (config.showInteraction === undefined) {
        config.showInteraction = true;
      }
      if (config.showImages === undefined) {
        config.showImages = false;
      }
      if (config.useEmoji === undefined) {
        config.useEmoji = false;
      }
      if (config.linksInNewWindow === undefined) {
        config.linksInNewWindow = true;
      }
      if (config.showPermalinks === undefined) {
        config.showPermalinks = true;
      }
      if (config.dataOnly === undefined) {
        config.dataOnly = false;
      }

      if (inProgress) {
        queue.push(config);
      } else {
        inProgress = true;

        domNode = config.domId;
        maxTweets = config.maxTweets;
        parseLinks = config.enableLinks;
        printUser = config.showUser;
        printTime = config.showTime;
        showRts = config.showRetweet;
        formatterFunction = config.dateFunction;
        customCallbackFunction = config.customCallback;
        showInteractionLinks = config.showInteraction;
        showImages = config.showImages;
	useEmoji = config.useEmoji;
        targetBlank = config.linksInNewWindow;
        permalinks = config.showPermalinks;
        dataOnly = config.dataOnly;

        var head = document.getElementsByTagName('head')[0];
        if (script !== null) {
          head.removeChild(script);
        }
        script = document.createElement('script');
        script.type = 'text/javascript';
        if (config.list !== undefined) {
          script.src = 'https://syndication.twitter.com/timeline/list?' +
              'callback=__twttrf.callback&dnt=false&list_slug=' +
              config.list.listSlug + '&screen_name=' + config.list.screenName +
              '&suppress_response_codes=true&lang=' + (config.lang || lang) +
              '&rnd=' + Math.random();
        } else if (config.profile !== undefined) {
          script.src = 'https://syndication.twitter.com/timeline/profile?' +
              'callback=__twttrf.callback&dnt=false' +
              '&screen_name=' + config.profile.screenName +
              '&suppress_response_codes=true&lang=' + (config.lang || lang) +
              '&rnd=' + Math.random();
        } else if (config.likes !== undefined) {
          script.src = 'https://syndication.twitter.com/timeline/likes?' +
              'callback=__twttrf.callback&dnt=false' +
              '&screen_name=' + config.likes.screenName +
              '&suppress_response_codes=true&lang=' + (config.lang || lang) +
              '&rnd=' + Math.random();
        } else {
          script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' +
              config.id + '?&lang=' + (config.lang || lang) +
              '&callback=__twttrf.callback&' +
              'suppress_response_codes=true&rnd=' + Math.random();
        }
        head.appendChild(script);
      }
    },
    callback: function(data) {
      if (data === undefined || data.body === undefined) {
        inProgress = false;

        if (queue.length > 0) {
          twitterFetcher.fetch(queue[0]);
          queue.splice(0,1);
        }
        return;
      }

      // Remove emoji and summary card images.
      if(!useEmoji){
        data.body = data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, '');
      }

      // Remove display images.
      if (!showImages) {
        data.body = data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, '');
      }
      // Remove avatar images.
      if (!printUser) {
        data.body = data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, '');
      }

      var div = document.createElement('div');
      div.innerHTML = data.body;
      if (typeof(div.getElementsByClassName) === 'undefined') {
         supportsClassName = false;
      }

      function swapDataSrc(element) {
        var avatarImg = element.getElementsByTagName('img')[0];
        if (avatarImg) {
          avatarImg.src = avatarImg.getAttribute('data-src-2x');
        } else {
          var screenName = element.getElementsByTagName('a')[0]
              .getAttribute('href').split('twitter.com/')[1];
          var img = document.createElement('img');
          img.setAttribute('src', 'https://twitter.com/' + screenName + 
              '/profile_image?size=bigger');
          element.prepend(img);
        }
        return element;
      }

      var tweets = [];
      var authors = [];
      var times = [];
      var images = [];
      var rts = [];
      var tids = [];
      var permalinksURL = [];
      var x = 0;

      if (supportsClassName) {
        var tmp = div.getElementsByClassName('timeline-Tweet');
        while (x < tmp.length) {
          if (tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || rts[x] && showRts) {
            tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            if (printUser) {
              authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]));
            }
            times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
            permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);
            if (tmp[x].getElementsByClassName('timeline-Tweet-media')[0] !==
                undefined) {
              images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]);
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      } else {
        var tmp = getElementsByClassName(div, 'timeline-Tweet');
        while (x < tmp.length) {
          if (getElementsByClassName(tmp[x], 'timeline-Tweet-retweetCredit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || rts[x] && showRts) {
            tweets.push(getElementsByClassName(tmp[x], 'timeline-Tweet-text')[0]);
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            if (printUser) {
              authors.push(swapDataSrc(getElementsByClassName(tmp[x],'timeline-Tweet-author')[0]));
            }
            times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
            permalinksURL.push(getElementsByClassName(tmp[x], 'timeline-Tweet-timestamp')[0]);
            if (getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0] !== undefined) {
              images.push(getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0]);
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      }

      if (tweets.length > maxTweets) {
        tweets.splice(maxTweets, (tweets.length - maxTweets));
        authors.splice(maxTweets, (authors.length - maxTweets));
        times.splice(maxTweets, (times.length - maxTweets));
        rts.splice(maxTweets, (rts.length - maxTweets));
        images.splice(maxTweets, (images.length - maxTweets));
        permalinksURL.splice(maxTweets, (permalinksURL.length - maxTweets));
      }

      var arrayTweets = [];
      var x = tweets.length;
      var n = 0;
      if (dataOnly) {
        while (n < x) {
          arrayTweets.push({
            tweet: tweets[n].innerHTML,
            author: authors[n] ? authors[n].innerHTML : 'Unknown Author',
            author_data: {
              profile_url: authors[n] ? authors[n].querySelector('[data-scribe="element:user_link"]').href : null,
              profile_image: authors[n] ? 
              'https://twitter.com/' + authors[n].querySelector('[data-scribe="element:screen_name"]').title.split('@')[1] + '/profile_image?size=bigger' : null,
              profile_image_2x: authors[n] ? 'https://twitter.com/' + authors[n].querySelector('[data-scribe="element:screen_name"]').title.split('@')[1] + '/profile_image?size=original' : null,
              screen_name: authors[n] ? authors[n].querySelector('[data-scribe="element:screen_name"]').title : null,
              name: authors[n] ? authors[n].querySelector('[data-scribe="element:name"]').title : null
            },
            time: times[n].textContent,
            timestamp: times[n].getAttribute('datetime').replace('+0000', 'Z').replace(/([\+\-])(\d\d)(\d\d)/, '$1$2:$3'),
            image: extractImageUrl(images[n]),
            rt: rts[n],
            tid: tids[n],
            permalinkURL: (permalinksURL[n] === undefined) ?
                '' : permalinksURL[n].href
          });
          n++;
        }
      } else {
        while (n < x) {
          if (typeof(formatterFunction) !== 'string') {
            var datetimeText = times[n].getAttribute('datetime');
            var newDate = new Date(times[n].getAttribute('datetime')
                .replace(/-/g,'/').replace('T', ' ').split('+')[0]);
            var dateString = formatterFunction(newDate, datetimeText);
            times[n].setAttribute('aria-label', dateString);

            if (tweets[n].textContent) {
              // IE hack.
              if (supportsClassName) {
                times[n].textContent = dateString;
              } else {
                var h = document.createElement('p');
                var t = document.createTextNode(dateString);
                h.appendChild(t);
                h.setAttribute('aria-label', dateString);
                times[n] = h;
              }
            } else {
              times[n].textContent = dateString;
            }
          }
          var op = '';
          if (parseLinks) {
            if (targetBlank) {
              targetLinksToNewWindow(tweets[n]);
              if (printUser) {
                targetLinksToNewWindow(authors[n]);
              }
            }
            if (printUser) {
              op += '<div class="user">' + strip(authors[n].innerHTML) +
                  '</div>';
            }
            op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
            if (printTime) {
              if (permalinks) {
                op += '<p class="timePosted"><a href="' + permalinksURL[n] +
                   '">' + times[n].getAttribute('aria-label') + '</a></p>';
              } else {
                op += '<p class="timePosted">' +
                    times[n].getAttribute('aria-label') + '</p>';
              }
            }
          } else {
            if (tweets[n].textContent) {
              if (printUser) {
                op += '<p class="user">' + authors[n].textContent + '</p>';
              }
              op += '<p class="tweet">' +  tweets[n].textContent + '</p>';
              if (printTime) {
                op += '<p class="timePosted">' + times[n].textContent + '</p>';
              }

            } else {
              if (printUser) {
                op += '<p class="user">' + authors[n].textContent + '</p>';
              }
              op += '<p class="tweet">' +  tweets[n].textContent + '</p>';
              if (printTime) {
                op += '<p class="timePosted">' + times[n].textContent + '</p>';
              }
            }
          }
          if (showInteractionLinks) {
            op += '<p class="interact"><a href="https://twitter.com/intent/' +
                'tweet?in_reply_to=' + tids[n] +
                '" class="twitter_reply_icon"' +
                (targetBlank ? ' target="_blank" rel="noopener">' : '>') +
                'Reply</a><a href="https://twitter.com/intent/retweet?' +
                'tweet_id=' + tids[n] + '" class="twitter_retweet_icon"' +
                (targetBlank ? ' target="_blank" rel="noopener">' : '>') + 'Retweet</a>' +
                '<a href="https://twitter.com/intent/favorite?tweet_id=' +
                tids[n] + '" class="twitter_fav_icon"' +
                (targetBlank ? ' target="_blank" rel="noopener">' : '>') + 'Favorite</a></p>';
          }
          if (showImages && images[n] !== undefined && extractImageUrl(images[n]) !== undefined) {
            op += '<div class="media">' +
                '<img src="' + extractImageUrl(images[n]) +
                '" alt="Image from tweet" />' + '</div>';
          }
          if (showImages) {
            arrayTweets.push(op);
          } else if (!showImages && tweets[n].textContent.length) {
            arrayTweets.push(op);
          }

          n++;
        }
      }

      handleTweets(arrayTweets);
      inProgress = false;

      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0]);
        queue.splice(0,1);
      }
    }
  };

  // It must be a global variable because it will be called by JSONP.
  window.__twttrf = twitterFetcher;
  window.twitterFetcher = twitterFetcher;
  return twitterFetcher;
}));


// Prepend polyfill for IE/Edge.
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);