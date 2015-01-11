/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icomo-download' : '&#xe000;',
			'icomo-IcoMoon' : '&#xe001;',
			'icomo-safari' : '&#xe002;',
			'icomo-opera' : '&#xe003;',
			'icomo-IE' : '&#xe004;',
			'icomo-firefox' : '&#xe005;',
			'icomo-chrome' : '&#xe006;',
			'icomo-css3' : '&#xe007;',
			'icomo-html5' : '&#xe008;',
			'icomo-html5-2' : '&#xe009;',
			'icomo-file-css' : '&#xe00a;',
			'icomo-file-xml' : '&#xe00b;',
			'icomo-file-powerpoint' : '&#xe00c;',
			'icomo-file-zip' : '&#xe00d;',
			'icomo-file-excel' : '&#xe00e;',
			'icomo-delicious' : '&#xe00f;',
			'icomo-stumbleupon' : '&#xe010;',
			'icomo-stumbleupon-2' : '&#xe011;',
			'icomo-stackoverflow' : '&#xe012;',
			'icomo-pinterest' : '&#xe013;',
			'icomo-pinterest-2' : '&#xe014;',
			'icomo-xing' : '&#xe015;',
			'icomo-xing-2' : '&#xe016;',
			'icomo-flattr' : '&#xe017;',
			'icomo-foursquare' : '&#xe018;',
			'icomo-foursquare-2' : '&#xe019;',
			'icomo-paypal' : '&#xe01a;',
			'icomo-paypal-2' : '&#xe01b;',
			'icomo-paypal-3' : '&#xe01c;',
			'icomo-yelp' : '&#xe01d;',
			'icomo-libreoffice' : '&#xe01e;',
			'icomo-file-pdf' : '&#xe01f;',
			'icomo-file-openoffice' : '&#xe020;',
			'icomo-file-word' : '&#xe021;',
			'icomo-lastfm' : '&#xe022;',
			'icomo-lastfm-2' : '&#xe023;',
			'icomo-linkedin' : '&#xe024;',
			'icomo-reddit' : '&#xe025;',
			'icomo-skype' : '&#xe026;',
			'icomo-soundcloud' : '&#xe027;',
			'icomo-soundcloud-2' : '&#xe028;',
			'icomo-windows8' : '&#xe029;',
			'icomo-windows' : '&#xe02a;',
			'icomo-android' : '&#xe02b;',
			'icomo-finder' : '&#xe02c;',
			'icomo-apple' : '&#xe02d;',
			'icomo-yahoo' : '&#xe02e;',
			'icomo-tux' : '&#xe02f;',
			'icomo-tumblr' : '&#xe030;',
			'icomo-tumblr-2' : '&#xe031;',
			'icomo-blogger' : '&#xe032;',
			'icomo-blogger-2' : '&#xe033;',
			'icomo-joomla' : '&#xe034;',
			'icomo-flickr' : '&#xe035;',
			'icomo-picassa' : '&#xe036;',
			'icomo-picassa-2' : '&#xe037;',
			'icomo-dribbble' : '&#xe038;',
			'icomo-dribbble-2' : '&#xe039;',
			'icomo-dribbble-3' : '&#xe03a;',
			'icomo-forrst' : '&#xe03b;',
			'icomo-forrst-2' : '&#xe03c;',
			'icomo-deviantart' : '&#xe03d;',
			'icomo-deviantart-2' : '&#xe03e;',
			'icomo-steam' : '&#xe03f;',
			'icomo-steam-2' : '&#xe040;',
			'icomo-github' : '&#xe041;',
			'icomo-github-2' : '&#xe042;',
			'icomo-github-3' : '&#xe043;',
			'icomo-github-4' : '&#xe044;',
			'icomo-github-5' : '&#xe045;',
			'icomo-wordpress' : '&#xe046;',
			'icomo-wordpress-2' : '&#xe047;',
			'icomo-flickr-2' : '&#xe048;',
			'icomo-flickr-3' : '&#xe049;',
			'icomo-flickr-4' : '&#xe04a;',
			'icomo-lanyrd' : '&#xe04b;',
			'icomo-vimeo' : '&#xe04c;',
			'icomo-vimeo2' : '&#xe04d;',
			'icomo-vimeo-2' : '&#xe04e;',
			'icomo-youtube' : '&#xe04f;',
			'icomo-youtube-2' : '&#xe050;',
			'icomo-feed' : '&#xe051;',
			'icomo-feed-2' : '&#xe052;',
			'icomo-feed-3' : '&#xe053;',
			'icomo-twitter' : '&#xe054;',
			'icomo-twitter-2' : '&#xe055;',
			'icomo-twitter-3' : '&#xe056;',
			'icomo-instagram' : '&#xe057;',
			'icomo-facebook' : '&#xe058;',
			'icomo-facebook-2' : '&#xe059;',
			'icomo-facebook-3' : '&#xe05a;',
			'icomo-paragraph-right' : '&#xe05b;',
			'icomo-paragraph-justify' : '&#xe05c;',
			'icomo-indent-increase' : '&#xe05d;',
			'icomo-indent-decrease' : '&#xe05e;',
			'icomo-new-tab' : '&#xe05f;',
			'icomo-embed' : '&#xe060;',
			'icomo-code' : '&#xe061;',
			'icomo-console' : '&#xe062;',
			'icomo-share' : '&#xe063;',
			'icomo-mail' : '&#xe064;',
			'icomo-mail-2' : '&#xe065;',
			'icomo-mail-3' : '&#xe066;',
			'icomo-mail-4' : '&#xe067;',
			'icomo-google' : '&#xe068;',
			'icomo-google-plus' : '&#xe069;',
			'icomo-google-plus-2' : '&#xe06a;',
			'icomo-google-plus-3' : '&#xe06b;',
			'icomo-google-plus-4' : '&#xe06c;',
			'icomo-google-drive' : '&#xe06d;',
			'icomo-paragraph-center' : '&#xe06e;',
			'icomo-paragraph-left' : '&#xe06f;',
			'icomo-paragraph-right-2' : '&#xe070;',
			'icomo-paragraph-center-2' : '&#xe071;',
			'icomo-paragraph-left-2' : '&#xe072;',
			'icomo-right-to-left' : '&#xe073;',
			'icomo-left-to-right' : '&#xe074;',
			'icomo-pilcrow' : '&#xe075;',
			'icomo-insert-template' : '&#xe076;',
			'icomo-table' : '&#xe077;',
			'icomo-table-2' : '&#xe078;',
			'icomo-sigma' : '&#xe079;',
			'icomo-omega' : '&#xe07a;',
			'icomo-strikethrough' : '&#xe07b;',
			'icomo-italic' : '&#xe07c;',
			'icomo-underline' : '&#xe07d;',
			'icomo-bold' : '&#xe07e;',
			'icomo-text-width' : '&#xe07f;',
			'icomo-arrow-up' : '&#xe080;',
			'icomo-arrow-up-right' : '&#xe081;',
			'icomo-arrow-right' : '&#xe082;',
			'icomo-arrow-down-right' : '&#xe083;',
			'icomo-arrow-left' : '&#xe084;',
			'icomo-arrow-down-left' : '&#xe085;',
			'icomo-arrow-down' : '&#xe086;',
			'icomo-tab' : '&#xe087;',
			'icomo-checkbox-checked' : '&#xe088;',
			'icomo-checkbox-unchecked' : '&#xe089;',
			'icomo-checkbox-partial' : '&#xe08a;',
			'icomo-radio-checked' : '&#xe08b;',
			'icomo-radio-unchecked' : '&#xe08c;',
			'icomo-crop' : '&#xe08d;',
			'icomo-scissors' : '&#xe08e;',
			'icomo-filter' : '&#xe08f;',
			'icomo-filter-2' : '&#xe090;',
			'icomo-font' : '&#xe091;',
			'icomo-text-height' : '&#xe092;',
			'icomo-arrow-up-left' : '&#xe093;',
			'icomo-arrow-left-2' : '&#xe094;',
			'icomo-arrow-down-left-2' : '&#xe095;',
			'icomo-paragraph-justify-2' : '&#xe096;',
			'icomo-arrow-down-2' : '&#xe097;',
			'icomo-arrow-up-right-2' : '&#xe098;',
			'icomo-arrow-up-2' : '&#xe099;',
			'icomo-arrow-up-left-2' : '&#xe09a;',
			'icomo-arrow-left-3' : '&#xe09b;',
			'icomo-arrow-down-left-3' : '&#xe09c;',
			'icomo-arrow-down-right-2' : '&#xe09d;',
			'icomo-arrow-right-2' : '&#xe09e;',
			'icomo-arrow-up-right-3' : '&#xe09f;',
			'icomo-shuffle' : '&#xe0a0;',
			'icomo-loop' : '&#xe0a1;',
			'icomo-play' : '&#xe0a2;',
			'icomo-pause' : '&#xe0a3;',
			'icomo-arrow-up-left-3' : '&#xe0a4;',
			'icomo-arrow-up-3' : '&#xe0a5;',
			'icomo-stop' : '&#xe0a6;',
			'icomo-backward' : '&#xe0a7;',
			'icomo-forward' : '&#xe0a8;',
			'icomo-first' : '&#xe0a9;',
			'icomo-last' : '&#xe0aa;',
			'icomo-previous' : '&#xe0ab;',
			'icomo-next' : '&#xe0ac;',
			'icomo-arrow-down-3' : '&#xe0ad;',
			'icomo-eject' : '&#xe0ae;',
			'icomo-volume-high' : '&#xe0af;',
			'icomo-volume-medium' : '&#xe0b0;',
			'icomo-volume-low' : '&#xe0b1;',
			'icomo-volume-mute' : '&#xe0b2;',
			'icomo-volume-mute-2' : '&#xe0b3;',
			'icomo-arrow-down-right-3' : '&#xe0b4;',
			'icomo-arrow-right-3' : '&#xe0b5;',
			'icomo-volume-increase' : '&#xe0b6;',
			'icomo-volume-decrease' : '&#xe0b7;',
			'icomo-loop-2' : '&#xe0b8;',
			'icomo-loop-3' : '&#xe0b9;',
			'icomo-forward-2' : '&#xe0ba;',
			'icomo-backward-2' : '&#xe0bb;',
			'icomo-stop-2' : '&#xe0bc;',
			'icomo-pause-2' : '&#xe0bd;',
			'icomo-exit' : '&#xe0be;',
			'icomo-enter' : '&#xe0bf;',
			'icomo-plus' : '&#xe0c0;',
			'icomo-play-2' : '&#xe0c1;',
			'icomo-minus' : '&#xe0c2;',
			'icomo-spell-check' : '&#xe0c3;',
			'icomo-checkmark' : '&#xe0c4;',
			'icomo-checkmark-2' : '&#xe0c5;',
			'icomo-close' : '&#xe0c6;',
			'icomo-spam' : '&#xe0c7;',
			'icomo-checkmark-circle' : '&#xe0c8;',
			'icomo-cancel-circle' : '&#xe0c9;',
			'icomo-blocked' : '&#xe0ca;',
			'icomo-info' : '&#xe0cb;',
			'icomo-info-2' : '&#xe0cc;',
			'icomo-angry' : '&#xe0cd;',
			'icomo-angry-2' : '&#xe0ce;',
			'icomo-evil' : '&#xe0cf;',
			'icomo-evil-2' : '&#xe0d0;',
			'icomo-shocked' : '&#xe0d1;',
			'icomo-shocked-2' : '&#xe0d2;',
			'icomo-confused' : '&#xe0d3;',
			'icomo-confused-2' : '&#xe0d4;',
			'icomo-neutral' : '&#xe0d5;',
			'icomo-neutral-2' : '&#xe0d6;',
			'icomo-wondering' : '&#xe0d7;',
			'icomo-wondering-2' : '&#xe0d8;',
			'icomo-point-up' : '&#xe0d9;',
			'icomo-point-right' : '&#xe0da;',
			'icomo-point-down' : '&#xe0db;',
			'icomo-point-left' : '&#xe0dc;',
			'icomo-warning' : '&#xe0dd;',
			'icomo-notification' : '&#xe0de;',
			'icomo-question' : '&#xe0df;',
			'icomo-cool' : '&#xe0e0;',
			'icomo-cool-2' : '&#xe0e1;',
			'icomo-grin' : '&#xe0e2;',
			'icomo-grin-2' : '&#xe0e3;',
			'icomo-wink' : '&#xe0e4;',
			'icomo-wink-2' : '&#xe0e5;',
			'icomo-sad' : '&#xe0e6;',
			'icomo-sad-2' : '&#xe0e7;',
			'icomo-tongue' : '&#xe0e8;',
			'icomo-tongue-2' : '&#xe0e9;',
			'icomo-smiley' : '&#xe0ea;',
			'icomo-smiley-2' : '&#xe0eb;',
			'icomo-happy' : '&#xe0ec;',
			'icomo-happy-2' : '&#xe0ed;',
			'icomo-thumbs-up' : '&#xe0ee;',
			'icomo-thumbs-up-2' : '&#xe0ef;',
			'icomo-heart-broken' : '&#xe0f0;',
			'icomo-heart' : '&#xe0f1;',
			'icomo-heart-2' : '&#xe0f2;',
			'icomo-upload' : '&#xe0f3;',
			'icomo-download-2' : '&#xe0f4;',
			'icomo-upload-2' : '&#xe0f5;',
			'icomo-globe' : '&#xe0f6;',
			'icomo-earth' : '&#xe0f7;',
			'icomo-link' : '&#xe0f8;',
			'icomo-flag' : '&#xe0f9;',
			'icomo-attachment' : '&#xe0fa;',
			'icomo-eye' : '&#xe0fb;',
			'icomo-eye-blocked' : '&#xe0fc;',
			'icomo-eye-2' : '&#xe0fd;',
			'icomo-brightness-medium' : '&#xe0fe;',
			'icomo-bookmarks' : '&#xe0ff;',
			'icomo-bookmark' : '&#xe100;',
			'icomo-brightness-contrast' : '&#xe101;',
			'icomo-contrast' : '&#xe102;',
			'icomo-star' : '&#xe103;',
			'icomo-star-2' : '&#xe104;',
			'icomo-star-3' : '&#xe105;',
			'icomo-download-3' : '&#xe106;',
			'icomo-cloud-upload' : '&#xe107;',
			'icomo-cloud-download' : '&#xe108;',
			'icomo-cloud' : '&#xe109;',
			'icomo-tree' : '&#xe10a;',
			'icomo-menu' : '&#xe10b;',
			'icomo-menu-2' : '&#xe10c;',
			'icomo-numbered-list' : '&#xe10d;',
			'icomo-list' : '&#xe10e;',
			'icomo-list-2' : '&#xe10f;',
			'icomo-signup' : '&#xe110;',
			'icomo-power-cord' : '&#xe111;',
			'icomo-switch' : '&#xe112;',
			'icomo-lightning' : '&#xe113;',
			'icomo-shield' : '&#xe114;',
			'icomo-target' : '&#xe115;',
			'icomo-accessibility' : '&#xe116;',
			'icomo-road' : '&#xe117;',
			'icomo-truck' : '&#xe118;',
			'icomo-bars' : '&#xe119;',
			'icomo-gift' : '&#xe11a;',
			'icomo-trophy' : '&#xe11b;',
			'icomo-glass' : '&#xe11c;',
			'icomo-mug' : '&#xe11d;',
			'icomo-leaf' : '&#xe11e;',
			'icomo-rocket' : '&#xe11f;',
			'icomo-food' : '&#xe120;',
			'icomo-meter' : '&#xe121;',
			'icomo-meter2' : '&#xe122;',
			'icomo-dashboard' : '&#xe123;',
			'icomo-hammer' : '&#xe124;',
			'icomo-fire' : '&#xe125;',
			'icomo-lab' : '&#xe126;',
			'icomo-remove' : '&#xe127;',
			'icomo-remove-2' : '&#xe128;',
			'icomo-magnet' : '&#xe129;',
			'icomo-briefcase' : '&#xe12a;',
			'icomo-airplane' : '&#xe12b;',
			'icomo-bars-2' : '&#xe12c;',
			'icomo-stats' : '&#xe12d;',
			'icomo-pie' : '&#xe12e;',
			'icomo-bug' : '&#xe12f;',
			'icomo-aid' : '&#xe130;',
			'icomo-wand' : '&#xe131;',
			'icomo-hammer-2' : '&#xe132;',
			'icomo-cog' : '&#xe133;',
			'icomo-equalizer' : '&#xe134;',
			'icomo-wrench' : '&#xe135;',
			'icomo-unlocked' : '&#xe136;',
			'icomo-lock' : '&#xe137;',
			'icomo-lock-2' : '&#xe138;',
			'icomo-key' : '&#xe139;',
			'icomo-key-2' : '&#xe13a;',
			'icomo-contract' : '&#xe13b;',
			'icomo-settings' : '&#xe13c;',
			'icomo-cog-2' : '&#xe13d;',
			'icomo-spinner' : '&#xe13e;',
			'icomo-spinner-2' : '&#xe140;',
			'icomo-cogs' : '&#xe13f;',
			'icomo-binoculars' : '&#xe141;',
			'icomo-search' : '&#xe142;',
			'icomo-zoom-in' : '&#xe143;',
			'icomo-zoom-out' : '&#xe144;',
			'icomo-expand' : '&#xe145;',
			'icomo-contract-2' : '&#xe146;',
			'icomo-expand-2' : '&#xe147;',
			'icomo-spinner-3' : '&#xe148;',
			'icomo-spinner-4' : '&#xe149;',
			'icomo-spinner-5' : '&#xe14a;',
			'icomo-spinner-6' : '&#xe14b;',
			'icomo-quotes-left' : '&#xe14c;',
			'icomo-user' : '&#xe14d;',
			'icomo-user-2' : '&#xe14e;',
			'icomo-users' : '&#xe14f;',
			'icomo-user-3' : '&#xe150;',
			'icomo-upload-3' : '&#xe151;',
			'icomo-disk' : '&#xe152;',
			'icomo-storage' : '&#xe153;',
			'icomo-undo' : '&#xe154;',
			'icomo-redo' : '&#xe155;',
			'icomo-flip' : '&#xe156;',
			'icomo-flip-2' : '&#xe157;',
			'icomo-busy' : '&#xe158;',
			'icomo-undo-2' : '&#xe159;',
			'icomo-redo-2' : '&#xe15a;',
			'icomo-forward-3' : '&#xe15b;',
			'icomo-bubble' : '&#xe15c;',
			'icomo-bubbles' : '&#xe15d;',
			'icomo-reply' : '&#xe15e;',
			'icomo-bubbles-2' : '&#xe15f;',
			'icomo-bubble-2' : '&#xe160;',
			'icomo-bubbles-3' : '&#xe161;',
			'icomo-bubbles-4' : '&#xe162;',
			'icomo-user-4' : '&#xe163;',
			'icomo-users-2' : '&#xe164;',
			'icomo-download-4' : '&#xe165;',
			'icomo-box-remove' : '&#xe166;',
			'icomo-box-add' : '&#xe167;',
			'icomo-drawer' : '&#xe168;',
			'icomo-drawer-2' : '&#xe169;',
			'icomo-drawer-3' : '&#xe16a;',
			'icomo-cabinet' : '&#xe16b;',
			'icomo-tv' : '&#xe16c;',
			'icomo-tablet' : '&#xe16d;',
			'icomo-mobile' : '&#xe16e;',
			'icomo-mobile-2' : '&#xe16f;',
			'icomo-laptop' : '&#xe170;',
			'icomo-screen' : '&#xe171;',
			'icomo-keyboard' : '&#xe172;',
			'icomo-print' : '&#xe173;',
			'icomo-calendar' : '&#xe174;',
			'icomo-stopwatch' : '&#xe175;',
			'icomo-bell' : '&#xe176;',
			'icomo-calendar-2' : '&#xe177;',
			'icomo-credit' : '&#xe178;',
			'icomo-calculate' : '&#xe179;',
			'icomo-support' : '&#xe17a;',
			'icomo-phone' : '&#xe17b;',
			'icomo-phone-hang-up' : '&#xe17c;',
			'icomo-address-book' : '&#xe17d;',
			'icomo-notebook' : '&#xe17e;',
			'icomo-envelop' : '&#xe17f;',
			'icomo-pushpin' : '&#xe180;',
			'icomo-location' : '&#xe181;',
			'icomo-location-2' : '&#xe182;',
			'icomo-compass' : '&#xe183;',
			'icomo-map' : '&#xe184;',
			'icomo-map-2' : '&#xe185;',
			'icomo-history' : '&#xe186;',
			'icomo-clock' : '&#xe187;',
			'icomo-clock-2' : '&#xe188;',
			'icomo-alarm' : '&#xe189;',
			'icomo-alarm-2' : '&#xe18a;',
			'icomo-coin' : '&#xe18b;',
			'icomo-cart' : '&#xe18c;',
			'icomo-cart-2' : '&#xe18d;',
			'icomo-cart-3' : '&#xe18e;',
			'icomo-ticket' : '&#xe18f;',
			'icomo-qrcode' : '&#xe190;',
			'icomo-barcode' : '&#xe191;',
			'icomo-tags' : '&#xe192;',
			'icomo-tag' : '&#xe193;',
			'icomo-folder-open' : '&#xe194;',
			'icomo-folder' : '&#xe195;',
			'icomo-stack' : '&#xe196;',
			'icomo-paste' : '&#xe197;',
			'icomo-paste-2' : '&#xe198;',
			'icomo-paste-3' : '&#xe199;',
			'icomo-copy' : '&#xe19a;',
			'icomo-copy-2' : '&#xe19b;',
			'icomo-copy-3' : '&#xe19c;',
			'icomo-file' : '&#xe19d;',
			'icomo-film' : '&#xe19e;',
			'icomo-camera' : '&#xe19f;',
			'icomo-dice' : '&#xe1a0;',
			'icomo-spades' : '&#xe1a1;',
			'icomo-pacman' : '&#xe1a2;',
			'icomo-clubs' : '&#xe1a3;',
			'icomo-diamonds' : '&#xe1a4;',
			'icomo-pawn' : '&#xe1a5;',
			'icomo-bullhorn' : '&#xe1a6;',
			'icomo-connection' : '&#xe1a7;',
			'icomo-podcast' : '&#xe1a8;',
			'icomo-book' : '&#xe1a9;',
			'icomo-feed-4' : '&#xe1aa;',
			'icomo-library' : '&#xe1ab;',
			'icomo-books' : '&#xe1ac;',
			'icomo-file-2' : '&#xe1ad;',
			'icomo-profile' : '&#xe1ae;',
			'icomo-file-3' : '&#xe1af;',
			'icomo-file-4' : '&#xe1b0;',
			'icomo-play-3' : '&#xe1b1;',
			'icomo-headphones' : '&#xe1b2;',
			'icomo-music' : '&#xe1b3;',
			'icomo-camera-2' : '&#xe1b4;',
			'icomo-images' : '&#xe1b5;',
			'icomo-image' : '&#xe1b6;',
			'icomo-image-2' : '&#xe1b7;',
			'icomo-paint-format' : '&#xe1b8;',
			'icomo-droplet' : '&#xe1b9;',
			'icomo-blog' : '&#xe1ba;',
			'icomo-pen' : '&#xe1bb;',
			'icomo-quill' : '&#xe1bc;',
			'icomo-pencil' : '&#xe1bd;',
			'icomo-pencil-2' : '&#xe1be;',
			'icomo-newspaper' : '&#xe1bf;',
			'icomo-office' : '&#xe1c0;',
			'icomo-home' : '&#xe1c1;',
			'icomo-home-2' : '&#xe1c2;',
			'icomo-home-3' : '&#xe1c3;',
			'icomo-chat' : '&#xe1c4;',
			'icomo-archive' : '&#xe1c5;',
			'icomo-user-5' : '&#xe1c6;',
			'icomo-users-3' : '&#xe1c7;',
			'icomo-archive-2' : '&#xe1c8;',
			'icomo-earth-2' : '&#xe1c9;',
			'icomo-location-3' : '&#xe1ca;',
			'icomo-contract-3' : '&#xe1cb;',
			'icomo-mobile-3' : '&#xe1cc;',
			'icomo-screen-2' : '&#xe1cd;',
			'icomo-mail-5' : '&#xe1ce;',
			'icomo-support-2' : '&#xe1cf;',
			'icomo-help' : '&#xe1d0;',
			'icomo-videos' : '&#xe1d1;',
			'icomo-pictures' : '&#xe1d2;',
			'icomo-link-2' : '&#xe1d3;',
			'icomo-search-2' : '&#xe1d4;',
			'icomo-cog-3' : '&#xe1d5;',
			'icomo-images-2' : '&#xe1d6;',
			'icomo-archive-3' : '&#xe1d7;',
			'icomo-share-2' : '&#xe1d8;',
			'icomo-list-3' : '&#xe1d9;',
			'icomo-refresh' : '&#xe1da;',
			'icomo-unlocked-2' : '&#xe1db;',
			'icomo-locked' : '&#xe1dc;',
			'icomo-feed-5' : '&#xe1dd;',
			'icomo-file-5' : '&#xe1de;',
			'icomo-bookmark-2' : '&#xe1df;',
			'icomo-heart-3' : '&#xe1e0;',
			'icomo-star-4' : '&#xe1e1;',
			'icomo-illustrator' : '&#xe1e2;',
			'icomo-photoshop' : '&#xe1e3;',
			'icomo-clock-3' : '&#xe1e4;',
			'icomo-article' : '&#xe1e5;',
			'icomo-info-3' : '&#xe1e6;',
			'icomo-pencil-3' : '&#xe1e7;',
			'icomo-trashcan' : '&#xe1e8;',
			'icomo-images-3' : '&#xe1e9;',
			'icomo-pencil-4' : '&#xe1ea;',
			'icomo-calendar-3' : '&#xe1eb;',
			'icomo-warning-2' : '&#xe1ec;',
			'icomo-atom' : '&#xe1ed;',
			'icomo-database' : '&#xe1ee;',
			'icomo-volume' : '&#xe1ef;',
			'icomo-volume-2' : '&#xe1f0;',
			'icomo-headphones-2' : '&#xe1f1;',
			'icomo-sunrise' : '&#xe1f2;',
			'icomo-sun' : '&#xe1f3;',
			'icomo-moon' : '&#xe1f4;',
			'icomo-sun-2' : '&#xe1f5;',
			'icomo-windy' : '&#xe1f6;',
			'icomo-wind' : '&#xe1f7;',
			'icomo-snowflake' : '&#xe1f8;',
			'icomo-cloudy' : '&#xe1f9;',
			'icomo-cloud-2' : '&#xe1fa;',
			'icomo-weather' : '&#xe1fb;',
			'icomo-weather-2' : '&#xe1fc;',
			'icomo-weather-3' : '&#xe1fd;',
			'icomo-lines' : '&#xe1fe;',
			'icomo-cloud-3' : '&#xe1ff;',
			'icomo-lightning-2' : '&#xe200;',
			'icomo-rainy' : '&#xe201;',
			'icomo-lightning-3' : '&#xe202;',
			'icomo-rainy-2' : '&#xe203;',
			'icomo-windy-2' : '&#xe204;',
			'icomo-snowy' : '&#xe205;',
			'icomo-windy-3' : '&#xe206;',
			'icomo-windy-4' : '&#xe207;',
			'icomo-rainy-3' : '&#xe208;',
			'icomo-rainy-4' : '&#xe209;',
			'icomo-lightning-4' : '&#xe20a;',
			'icomo-cloud-4' : '&#xe20b;',
			'icomo-cloud-5' : '&#xe20c;',
			'icomo-cloudy-2' : '&#xe20d;',
			'icomo-moon-2' : '&#xe20e;',
			'icomo-sun-3' : '&#xe20f;',
			'icomo-lightning-5' : '&#xe210;',
			'icomo-cloud-6' : '&#xe211;',
			'icomo-cloudy-3' : '&#xe212;',
			'icomo-weather-4' : '&#xe213;',
			'icomo-snowy-2' : '&#xe214;',
			'icomo-snowy-3' : '&#xe215;',
			'icomo-snowy-4' : '&#xe216;',
			'icomo-windy-5' : '&#xe217;',
			'icomo-snowy-5' : '&#xe218;',
			'icomo-weather-5' : '&#xe219;',
			'icomo-cloudy-4' : '&#xe21a;',
			'icomo-lightning-6' : '&#xe21b;',
			'icomo-thermometer' : '&#xe21c;',
			'icomo-compass-2' : '&#xe21d;',
			'icomo-Celsius' : '&#xe21e;',
			'icomo-none' : '&#xe21f;',
			'icomo-Fahrenheit' : '&#xe220;',
			'icomo-share-3' : '&#xe221;',
			'icomo-paperclip' : '&#xe222;',
			'icomo-layers' : '&#xe223;',
			'icomo-layers-alt' : '&#xe224;',
			'icomo-box' : '&#xe225;',
			'icomo-new-window' : '&#xe226;',
			'icomo-equalizer-2' : '&#xe227;',
			'icomo-fullscreen-alt' : '&#xe228;',
			'icomo-fullscreen' : '&#xe229;',
			'icomo-fullscreen-exit-alt' : '&#xe22a;',
			'icomo-fullscreen-exit' : '&#xe22b;',
			'icomo-plus-2' : '&#xe22c;',
			'icomo-minus-2' : '&#xe22d;',
			'icomo-cancel' : '&#xe22e;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icomo-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};