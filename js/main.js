// global variables for mouse position
var mouseX, mouseY;

// global variable for scroll position
var tempScrollTop = $(window).scrollTop();

// setting up barba views
var Homepage = Barba.BaseView.extend({
	namespace: 'home',
	onEnter: function() {
		var contentSections = $('.cd-section'),
			navigationItems = $('#cd-vertical-nav a');

		updateNavigation();
		$(window).on('scroll', function() {
			updateNavigation();
		});

		//smooth scroll to the section
		navigationItems.on('click', function(event) {
			event.preventDefault();
			smoothScroll($(this.hash));
		});
		//smooth scroll to second section
		$('.cd-scroll-down').on('click', function(event) {
			event.preventDefault();
			smoothScroll($(this.hash));
		});

		//open-close navigation on touch devices
		$('.touch .cd-nav-trigger').on('click', function() {
			$('.touch #cd-vertical-nav').toggleClass('open');

		});
		//close navigation on touch devices when selectin an elemnt from the list
		$('.touch #cd-vertical-nav a').on('click', function() {
			$('.touch #cd-vertical-nav').removeClass('open');
		});

		function updateNavigation() {
			contentSections.each(function() {
				$this = $(this);
				var activeSection = $('#cd-vertical-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
				if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
					navigationItems.eq(activeSection).addClass('is-selected');
				} else {
					navigationItems.eq(activeSection).removeClass('is-selected');
				}
			});
		}

		function smoothScroll(target) {
			$('body,html').animate({
					'scrollTop': target.offset().top
				},
				600
			);
		}

		// saving mouse and scroll position when section link clicked
		$('.section-link').on('click', function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			tempScrollTop = $(window).scrollTop();
		});
	}
});

var Workpage = Barba.BaseView.extend({
	namespace: 'work',
	onEnter: function() {
		var hash = window.location.hash.substring(1);

		// set dropdown to current item from url
		function setDropdown() {
			$(".dropdown-el input").each(function() {
				if ($(this).attr('id') === hash) {
					$("#all").prop('checked', false);
					$(this).prop('checked', true);
				}
			});

			var selector = $('#' + hash).next("label").attr("filter");
			$('.grid').isotope({
				transitionDuration: 0,
				filter: selector
			});
		}

		// Fancybox
		$('[data-fancybox]').fancybox({
			buttons : [ 
				'fullScreen',
				'close'
			]
		});

		$(function() {
			// Masonry Grid
			$('.grid').isotope({
				filter: '*',
				itemSelector: '.grid-item',
				masonry: {
					columnWidth: 180,
					fitWidth: true, // When enabled, you can center the container with CSS.
					gutter: 10
				}
				// layoutMode: 'fitRows'
			});

			setDropdown();

			$('.dropdown-el').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (e.target.tagName === "LABEL") {
					$('#' + $(e.target).attr('for')).prop('checked', true);
					var selector = $(e.target.getAttribute("filter"));
					$('.grid').isotope({
						transitionDuration: '0.5s',
						filter: selector
					});
				}
				$(this).toggleClass('expanded');
				return false;
			});

			$(document).click(function() {
				$('.dropdown-el').removeClass('expanded');
			});
		});
	}
});

Homepage.init();
Workpage.init();

/*
// barba ignore rules
Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
Barba.Pjax.preventCheck = function(evt, element) {
	if (!Barba.Pjax.originalPreventCheck(evt, element)) {
		return false;
	}

	// additional (besides .no-barba) ignore links with these classes
	var ignoreClasses = ['section-link', 'nav-link'];
	for (var i = 0; i < ignoreClasses.length; i++) {
		if (element.classList.contains(ignoreClasses[i])) {
			return false;
		}
	}

	return true;
};
*/

// barba transition
var ripple_wrap = $('.ripple-wrap'),
	rippler = $('.ripple'),
	reverse_ripple_wrap = $('.reverse-ripple-wrap'),
	reverse_rippler = $('.reverse-ripple'),
	load_finished = false,
	$new_elem,
	_this,
	RippleTransition = Barba.BaseTransition.extend({
		start: function() {
			_this = this;
			var monitor = function(el) {
					var computed = window.getComputedStyle(el, null),
						borderwidth = parseFloat(computed.getPropertyValue('border-left-width'));
					if (!load_finished && borderwidth >= 1500) {
						el.style.WebkitAnimationPlayState = "paused";
						el.style.animationPlayState = "paused";
					}
					if (load_finished) {
						el.style.WebkitAnimationPlayState = "running";
						el.style.animationPlayState = "running";
						setTimeout(_this.animFinish, 130); // wait for transition to finish
						return;
					} else {
						window.requestAnimationFrame(function() {monitor(el)});
					}
				};

			rippler.bind("webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationend", function(e) {
				ripple_wrap.removeClass('goripple');
			});

			rippler.css('left', mouseX + 'px');
			rippler.css('top', mouseY + 'px');
			ripple_wrap.addClass('goripple');
			window.requestAnimationFrame(function() {monitor(rippler[0])});

			this.newContainerLoading.then(this.loadFinish.bind(this));
		},

		loadFinish: function() {
			$new_elem = $(this.newContainer);
			$new_elem.css({visibility: 'visible', opacity: 0});
			load_finished = true;
		},

		animFinish: function() {
			$new_elem.css({visibility: 'visible', opacity: 1});
			document.body.scrollTop = 0;
			_this.done();	
		}
	}),
	ReverseRippleTransition = Barba.BaseTransition.extend({
		start: function() {
			_this = this;
			var monitor = function(el) {
					var computed = window.getComputedStyle(el, null),
						borderwidth = parseFloat(computed.getPropertyValue('border-left-width'));
					if (!load_finished && borderwidth <= 0) {
						el.style.WebkitAnimationPlayState = "paused";
						el.style.animationPlayState = "paused";
					}
					if (load_finished) {
						el.style.WebkitAnimationPlayState = "running";
						el.style.animationPlayState = "running";
						setTimeout(_this.animFinish, 600); // wait for transition to finish
						return;
					} else {
						window.requestAnimationFrame(function() {monitor(el)});
					}
				};

			reverse_rippler.bind("webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationend", function(e) {
				reverse_ripple_wrap.removeClass('goripple');
			});

			reverse_rippler.css('left', mouseX + 'px');
			reverse_rippler.css('top', mouseY + 'px');
			reverse_ripple_wrap.addClass('goripple');
			window.requestAnimationFrame(function() {monitor(reverse_rippler[0])});

			this.newContainerLoading.then(this.loadFinish.bind(this));
		},

		loadFinish: function() {
			$new_elem = $(this.newContainer);
			$new_elem.css({visibility: 'visible', opacity: 0});
			load_finished = true;
		},

		animFinish: function() {
			$(window).scrollTop(tempScrollTop);
			$new_elem.css({visibility: 'visible', opacity: 1});
			_this.done();
		}
	});

Barba.Pjax.getTransition = function() {
	if (Barba.HistoryManager.prevStatus().namespace === 'home')
		return RippleTransition;
	else
		return ReverseRippleTransition;
};

// fix for barba ignoring links with # 
Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;

Barba.Pjax.preventCheck = function(evt, element) {
	// ignore case where href is only #link
	if ($(element).attr('href') && $(element).attr('href').indexOf('#') === 0)
		return false;
	if ($(element).attr('href') && $(element).attr('href').indexOf('#') > -1)
		return true;
	else
		return Barba.Pjax.originalPreventCheck(evt, element)
};

Barba.Pjax.start();