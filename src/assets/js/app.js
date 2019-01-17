import 'lightgallery';

import 'jplayer/dist/jplayer/jquery.jplayer';
import 'jplayer/dist/add-on/jplayer.playlist';

import 'twitter-fetcher/js/twitterFetcher';

import 'mixitup/src/jquery.mixitup';

import './lib/bootstrap';
import './lib/countdown';
import './lib/instafeed.min';
import './lib/jquery.fitvids';
import './lib/jquery.validate.min';
import './lib/jquery.zoom.min';
import './lib/js';
import './lib/jssor.slider.min';
import './lib/lg-zoom';
import './lib/main';
import './lib/mc.validate';
import './lib/playlist';
import './lib/twitter.config';

import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import { Foundation } from 'foundation-sites/js/foundation.core';
import { Motion, Move } from 'foundation-sites/js/foundation.util.motion';

Foundation.addToJquery($);

Foundation.Motion = Motion;

module.exports = Foundation;

import './lib/photoswipe';
import './lib/product-archive-animations';
import './lib/media-animations';
import './lib/iframe-resize';