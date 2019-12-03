/*********************************************************************************/
/* Settings                                                                      */
/*********************************************************************************/

	var _settings = {

		// Dropdowns
			dropotron: {
				offsetY: -13,
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center'
			},

		// Slider
			slidertron: {
				mode: 'fade',
				viewerSelector: '.viewer',
				reelSelector: '.viewer .reel',
				slidesSelector: '.viewer .reel .slide',
				advanceDelay: 4000,
				speed: 800,
				navPreviousSelector: '.previous-button',
				navNextSelector: '.next-button',
				slideLinkSelector: '.link',
				seamlessWrap: false,
				autoFit: true,
				autoFitAspectRatio: (593 / 359),
			},

		// skelJS
			skelJS: {
				preset: 'standard',
				prefix: 'css/style',
				resetCSS: true,
				boxModel: 'border',
				breakpoints: {
					'desktop': {
						grid: {
							gutters: 50
						}
					}
				}
			}, 

		// skelJS Plugins
			skelJSPlugins: {
				panels: {
					preset: 'standard'
				}
			}

	};

/*********************************************************************************/
/* jQuery Plugins                                                                */
/*********************************************************************************/

	// formerize
		jQuery.fn.n33_formerize=function(){var _fakes=new Array(),_form = jQuery(this);_form.find('input[type=text],textarea').each(function() { var e = jQuery(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = jQuery(this); var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = jQuery(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = jQuery(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); jQuery(this).find('select').val(jQuery('option:first').val()); jQuery(this).find('input,textarea').each(function() { var e = jQuery(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };

	// scrolly
		jQuery.fn.n33_scrolly=function(){var bh=jQuery('body,html'),t=jQuery(this);t.click(function(e){var h=jQuery(this).attr('href'),target;if(h.charAt(0)=='#'&&h.length>1&&(target=jQuery(h)).length>0){var pos=Math.max(target.offset().top,0);e.preventDefault();bh.stop(true,true).animate({scrollTop:pos},'slow','swing');}});return t;};

/*********************************************************************************/
/* Initialize                                                                    */
/*********************************************************************************/

	// skelJS
		skel.init(_settings.skelJS, _settings.skelJSPlugins);

	// jQuery
		jQuery(function() {

			var $window = $(window),
				_IEVersion = (navigator.userAgent.match(/MSIE ([0-9]+)\./) ? parseInt(RegExp.$1) : 99);

			// Forms
				if (_IEVersion < 10)
					$('form').n33_formerize();

			// Dropdowns
				jQuery('#nav > ul').dropotron(_settings.dropotron);

			// Slider
				var x = $('#slider');
				
				if (x.length > 0)
				{
					if (_IEVersion < 9)
						_settings.slidertron.mode = 'slide';
				
					x.slidertron(_settings.slidertron);
					
					skel.onStateChange(function() {
						x.trigger('slidertron_reFit');
					});
				}

			// Scrolly
				$('.bubble-top').n33_scrolly();

		});