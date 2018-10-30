// global variables for mouse position
var mouseX, mouseY;

// global variable for scroll position
var tempScrollIndex = 0;

var scrollifyInitialised= 0;

var rippleColor = '#009688';

// setting up barba views
var Homepage = Barba.BaseView.extend({
	namespace: 'home',
	onEnter: function() {
		//disable barba on contact links
		$("#section6 a").addClass("no-barba");

		if (!scrollifyInitialised) {
			$.scrollify({
				section : ".cd-section",
				interstitialSection : "",
				easing: "easeOutExpo",
				scrollSpeed: 1100,
				offset : 0,
				scrollbars: true,
				standardScrollElements: "",
				setHeights: true,
				overflowScroll: false,
				updateHash: false,
				touchScroll: true,
				before:function() {},
				after:function() {},
				afterResize:function() {},
				afterRender:function() {}
			});
			scrollMonitor.update();
			$.scrollify.update();
			scrollifyInitialised = 1;
		} else {
			$.scrollify.enable();
		}

		function hideTooltip(text) {
			$('.tooltip').css('opacity', '0');
			$('.tooltip').css('left', '0px');
		}

		function showTooltip(text) {
			hideTooltip();
			setTimeout( function(){
				$('.tooltip').css('opacity', '1');
				$('.tooltip').css('left', '20px');
				$('.tooltip').text(text);
			}, 150);
		}

		$('.display-image').on('click', function(event) {
			var strings = [
				'Ouch.',
				'Naatil evideya?',
				'Ow, my pixels!',
				'No touching!',
				'Blistering barnacles!',
				'Are you still there?',
				'Zzz'
			]
			showTooltip(strings[Math.floor(Math.random()*strings.length)]);
		});

		$('.email-link').on('click', function(event) {
			event.preventDefault();
			var emailLink = document.querySelector('.email-link');  
			var range = document.createRange();  
			range.selectNode(emailLink);  
			window.getSelection().addRange(range);  

			try {   
				if (document.execCommand('copy'))  
					showTooltip("E-mail copied to clipboard!");
				else
					showTooltip("Unable to copy e-mail :("); 
			} catch(err) {  
				showTooltip("Unable to copy e-mail :(");  
			}

			window.getSelection().removeAllRanges();
		});

		$('.resume-link').on('click', function(event) {
			showTooltip("Download started!"); 
		});

		var contentSections = $('.cd-section'),
			navigationItems = $('#cd-vertical-nav a');

		updateNavigation();
		$(window).on('scroll', function() {
			updateNavigation();
			hideTooltip();
		});

		//smooth scroll to the section
		navigationItems.on('click', function(event) {
			event.preventDefault();
			$.scrollify.move(($(this).attr('data-number'))-1);
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

		// saving mouse and scroll position when section link clicked
		$('.section-link').on('click', function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			rippleColor = $(this).css("color");
			tempScrollIndex = $.scrollify.currentIndex();
		});

		//morphing js begins
		{
			const DOM = {};
			DOM.svg = [document.querySelector('.morph1'), document.querySelector('.morph2'), document.querySelector('.morph3')];
			DOM.shapeEl = [DOM.svg[0].querySelector('path'), DOM.svg[1].querySelector('path'), DOM.svg[2].querySelector('path')];
			DOM.contentElems = Array.from(document.querySelectorAll('.cd-section'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.section-link'));
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				[	// first svg (behind)
					{
						path: 'M 959.29 385 L 959.29 385 C 959.29 528.2 843.2 644.29 700 644.29 C 556.8 644.29 440.71 528.2 440.71 385 C 440.71 241.8 556.8 125.71 700 125.71 C 843.2 125.71 959.29 241.8 959.29 385',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#f7931e',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 1008 385 L 1008 385 C 905.333 487.213 802.667 589.427 700 691.64 C 597.333 589.427 494.667 487.213 392 385 C 494.667 282.787 597.333 180.573 700 78.36 C 802.667 180.573 905.333 282.787 1008 385',
						scaleX: 1,
						scaleY: 1,
						rotate: 90,
						tx: 0,
						ty: 100,
						fill: {
							color: '#55D6BE',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 758.3 497.93 L 758.3 497.93 C 667.76 497.93 577.22 497.93 486.68 497.93 C 486.68 372.643 486.68 247.357 486.68 122.07 C 577.22 122.07 667.76 122.07 758.3 122.07 C 758.3 247.357 758.3 372.643 758.3 497.93',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#00A6ED',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 901.65 472.47 L 901.65 472.47 C 810.007 472.47 718.363 472.47 626.72 472.47 C 626.72 380.827 626.72 289.183 626.72 197.54 C 718.363 197.54 810.007 197.54 901.65 197.54 C 901.65 289.183 901.65 380.827 901.65 472.47',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#2E9185',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 744.11 333.08 L 744.11 333.08 C 744.11 416.82 676.05 484.7 592.11 484.7 C 508.17 484.7 440.11 416.82 440.11 333.08 C 440.11 249.34 508.11 181.47 592.11 181.47 C 676.11 181.47 744.11 249.35 744.11 333.08',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#C84445',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 1012.9 592.81 L 1012.9 592.81 C 804.3 592.81 595.7 592.81 387.1 592.81 C 387.1 454.27 387.1 315.73 387.1 177.19 C 595.7 177.19 804.3 177.19 1012.9 177.19 C 1012.9 315.73 1012.9 454.27 1012.9 592.81',
						scaleX: 0.9,
						scaleY: 0.9,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#757AFF',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					}
				], 
				[	// second svg (middle)
					{
						path: 'M 875.6 385 C 875.6 431.554 857.087 476.249 824.168 509.168 C 791.249 542.087 746.554 560.6 700 560.6 C 653.446 560.6 608.751 542.087 575.832 509.168 C 542.913 476.249 524.4 431.554 524.4 385 C 524.4 338.446 542.913 293.751 575.832 260.832 C 608.751 227.913 653.446 209.4 700 209.4 C 730.822 209.4 761.107 217.515 787.8 232.926 C 814.493 248.337 836.663 270.507 852.074 297.2 C 867.485 323.893 875.6 354.178 875.6 385 L 875.6 385',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#f8b118',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 884.89 417.45 C 852.318 440.154 819.746 462.858 787.175 485.562 C 747.25 513.391 707.325 541.221 667.4 569.05 C 642.313 533.385 617.225 497.72 592.138 462.055 C 566.462 425.554 540.786 389.052 515.11 352.55 C 549.007 328.93 582.904 305.31 616.801 281.69 C 655.401 254.793 694 227.897 732.6 201 C 758.113 237.261 783.625 273.522 809.138 309.783 C 834.389 345.672 859.639 381.561 884.89 417.45 C 884.89 417.45 884.89 417.45 884.89 417.45 L 884.89 417.45',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#B0E3C9',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 824.37 573.36 C 779.024 573.36 733.679 573.36 688.333 573.36 C 643.139 573.36 597.944 573.36 552.75 573.36 C 552.75 511.87 552.75 450.379 552.75 388.889 C 552.75 325.093 552.75 261.296 552.75 197.5 C 599.241 197.5 645.731 197.5 692.222 197.5 C 736.271 197.5 780.321 197.5 824.37 197.5 C 824.37 261.296 824.37 325.093 824.37 388.889 C 824.37 450.379 824.37 511.87 824.37 573.36 C 824.37 573.36 824.37 573.36 824.37 573.36 L 824.37 573.36',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#5CBDFF',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 901.65 587.65 C 901.65 587.65 901.65 587.65 901.65 587.65 C 784.067 587.65 666.483 587.65 548.9 587.65 C 577.786 537.62 606.671 487.59 635.557 437.56 C 665.465 385.76 695.372 333.96 725.28 282.16 C 754.561 332.878 783.842 383.596 813.124 434.314 C 842.632 485.426 872.141 536.538 901.65 587.65 C 901.65 587.65 901.65 587.65 901.65 587.65 C 901.65 587.65 901.65 587.65 901.65 587.65 C 901.65 587.65 901.65 587.65 901.65 587.65 L 901.65 587.65',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#8BB174',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 959.9 333.08 C 959.9 375.119 942.762 413.161 915.066 440.625 C 887.593 467.867 849.73 484.7 807.9 484.7 C 758.009 484.7 713.762 460.754 686.055 423.762 C 667.112 398.472 655.9 367.084 655.9 333.08 C 655.9 289.349 674.472 249.946 704.167 222.277 C 731.336 196.963 767.814 181.47 807.9 181.47 C 834.511 181.47 859.532 188.299 881.295 200.296 C 904.444 213.057 923.907 231.666 937.675 254.125 C 951.773 277.122 959.9 304.155 959.9 333.08 L 959.9 333.08',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#B03B3C',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 1012.9 592.81 C 976.007 592.81 939.115 592.81 902.222 592.81 C 838.704 592.81 775.185 592.81 711.667 592.81 C 652.037 592.81 592.407 592.81 532.778 592.81 C 484.219 592.81 435.659 592.81 387.1 592.81 C 424.925 560.486 462.749 528.161 500.574 495.837 C 567.049 439.028 633.525 382.219 700 325.41 C 753.44 371.079 806.879 416.748 860.319 462.416 C 865.127 466.525 869.936 470.635 874.744 474.744 C 902.436 498.409 930.129 522.075 957.821 545.74 L 1012.9 592.81',
						scaleX: 0.9,
						scaleY: 0.9,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#7692FF',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					}
				],
				[	// third svg (front)
					{
						path: 'M 785.94 385 C 785.99 404.476 779.418 423.402 767.308 438.655 C 755.199 453.909 738.257 464.602 719.277 468.97 C 700.297 473.339 680.385 471.128 662.826 462.704 C 645.266 454.279 631.082 440.131 622.612 422.593 C 614.143 405.055 611.881 385.149 616.201 366.158 C 620.521 347.167 631.17 330.198 646.393 318.049 C 661.615 305.901 680.524 299.28 700 299.28 C 715.065 299.261 729.873 303.208 742.93 310.724 C 755.986 318.24 766.837 329.063 774.386 342.1 C 781.935 355.137 785.921 369.935 785.94 385 L 785.94 385',
						scaleX: 1,
						scaleY: 1,
						rotate: 90,
						tx: 0,
						ty: 100,
						fill: {
							color: '#ffca5b',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 775.23 412.26 C 763.288 417.803 751.347 423.346 739.405 428.889 C 728.969 433.734 718.533 438.578 708.097 443.422 C 696.272 448.911 684.446 454.401 672.62 459.89 C 664.893 443.394 657.166 426.899 649.439 410.403 C 641.216 392.849 632.993 375.294 624.77 357.74 C 634.084 353.417 643.397 349.093 652.711 344.77 C 667.413 337.946 682.115 331.122 696.816 324.297 C 707.004 319.568 717.192 314.839 727.38 310.11 C 737.736 332.217 748.091 354.325 758.447 376.432 C 764.041 388.375 769.636 400.317 775.23 412.26 L 775.23 412.26',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#D3F8E2',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 894.11 647.93 C 865.703 647.93 837.296 647.93 808.889 647.93 C 779.074 647.93 749.259 647.93 719.444 647.93 C 687.126 647.93 654.808 647.93 622.49 647.93 C 622.49 590.101 622.49 532.273 622.49 474.444 C 622.49 406.986 622.49 339.528 622.49 272.07 C 653.512 272.07 684.534 272.07 715.556 272.07 C 742.778 272.07 770 272.07 797.222 272.07 C 829.518 272.07 861.814 272.07 894.11 272.07 C 894.11 343.417 894.11 414.764 894.11 486.111 C 894.11 540.051 894.11 593.99 894.11 647.93 L 894.11 647.93',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#7DCDFF',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 691 385 C 691 415.993 680.47 446.085 661.145 470.315 C 641.821 494.546 614.825 511.507 584.609 518.401 C 554.393 525.296 522.712 521.724 494.79 508.274 C 466.868 494.824 444.327 472.278 430.883 444.353 C 417.439 416.428 413.874 384.746 420.775 354.532 C 427.677 324.317 444.643 297.325 468.878 278.006 C 493.113 258.687 523.207 248.163 554.2 248.17 C 590.47 248.178 625.29 262.607 650.934 288.257 C 673.988 311.316 687.972 341.788 690.562 374.061 C 690.853 377.687 691 381.336 691 385 L 691 385',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#B5CA8D',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					},
					{
						path: 'M 915.79 441 C 891.102 465.686 866.414 490.371 841.726 515.057 C 822.929 533.853 804.131 552.649 785.334 571.444 C 756.889 599.886 728.445 628.328 700 656.77 C 665.073 621.847 630.147 586.923 595.22 552 C 558.217 515 521.213 478 484.21 441 C 521.081 404.126 557.952 367.251 594.823 330.377 C 629.882 295.315 664.941 260.252 700 225.19 C 735.707 260.9 771.414 296.611 807.121 332.321 C 843.344 368.548 879.567 404.774 915.79 441 C 915.79 441 915.79 441 915.79 441 L 915.79 441',
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#D64848',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1500,
								easing: 'easeOutQuad'
							},
							svg: {
								duration: 1500,
								easing: 'easeOutQuad'
							}
						}
					},
					{
						path: 'M 907.671 261.538 C 888.874 276.605 870.077 291.672 851.28 306.739 C 829.639 324.086 807.998 341.432 786.358 358.779 C 757.572 381.852 728.786 404.926 700 428 C 663.479 398.726 626.957 369.451 590.436 340.177 C 522.657 285.848 454.879 231.519 387.1 177.19 C 440.844 177.19 494.589 177.19 548.333 177.19 C 601.481 177.19 654.63 177.19 707.778 177.19 C 753.148 177.19 798.519 177.19 843.889 177.19 C 900.226 177.19 956.563 177.19 1012.9 177.19 C 1012.9 177.19 1012.9 177.19 1012.9 177.19 L 907.671 261.538',
						scaleX: 0.9,
						scaleY: 0.9,
						rotate: 0,
						tx: 0,
						ty: 100,
						fill: {
							color: '#9A9EFF',
							duration: 500,
							easing: 'linear'
						},
						animation: {
							path: {
								duration: 1000,
								easing: 'easeInOutQuad'
							},
							svg: {
								duration: 1000,
								easing: 'easeInOutQuad'
							}
						}
					}
				]
			];
			let step;

			const initShapeEl = function(i) {
				var shapeEl = DOM.shapeEl[i];
				var svg = DOM.svg[i];
				anime.remove(svg);
				anime({
					targets: svg,
					duration: 1,
					easing: 'linear',
					scaleX: shapes[i][0].scaleX,
					scaleY: shapes[i][0].scaleY,
					translateX: shapes[i][0].tx+'px',
					translateY: shapes[i][0].ty+'px',
					rotate: shapes[i][0].rotate+'deg'
				});
			};

			const createScrollWatchers = function(i) {
				var shapeEl = DOM.shapeEl[i];
				var svg = DOM.svg[i];
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = DOM.contentElems[pos];
					const watcher = scrollMonitor.create(scrollElemToWatch,-350);
					
					watcher.enterViewport(function() {
						step = pos;
						anime.remove(shapeEl);
						anime({
							targets: shapeEl,
							duration: shapes[i][pos].animation.path.duration,
							easing: shapes[i][pos].animation.path.easing,
							elasticity: shapes[i][pos].animation.path.elasticity || 0,
							d: shapes[i][pos].path,
							fill: {
								value: shapes[i][pos].fill.color,
								duration: shapes[i][pos].fill.duration,
								easing: shapes[i][pos].fill.easing
							}
						});

						anime.remove(svg);
						anime({
							targets: svg,
							duration: shapes[i][pos].animation.svg.duration,
							easing: shapes[i][pos].animation.svg.easing,
							elasticity: shapes[i][pos].animation.svg.elasticity || 0,
							scaleX: shapes[i][pos].scaleX,
							scaleY: shapes[i][pos].scaleY,
							translateX: shapes[i][pos].tx+'px',
							translateY: shapes[i][pos].ty+'px',
							rotate: shapes[i][pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx >= 0 && idx <= contentElemsTotal && step !== idx ) {
							step = idx+1;
							anime.remove(shapeEl);
							anime({
								targets: shapeEl,
								duration: shapes[i][idx].animation.path.duration,
								easing: shapes[i][idx].animation.path.easing,
								elasticity: shapes[i][idx].animation.path.elasticity || 0,
								d: shapes[i][idx].path,
								fill: {
									value: shapes[i][idx].fill.color,
									duration: shapes[i][idx].fill.duration,
									easing: shapes[i][idx].fill.easing
								}
							});

							anime.remove(svg);
							anime({
								targets: svg,
								duration: shapes[i][idx].animation.svg.duration,
								easing: shapes[i][idx].animation.svg.easing,
								elasticity: shapes[i][idx].animation.svg.elasticity || 0,
								scaleX: shapes[i][idx].scaleX,
								scaleY: shapes[i][idx].scaleY,
								translateX: shapes[i][idx].tx+'px',
								translateY: shapes[i][idx].ty+'px',
								rotate: shapes[i][idx].rotate+'deg'
							});
						}
					});
				});
			};

			const init = function() {
					initShapeEl(2);
					initShapeEl(1);
					initShapeEl(0);
					createScrollWatchers(2);
					createScrollWatchers(1);
					createScrollWatchers(0);
			};

			init();
		};
	},
	onEnterCompleted: function() {
		$.scrollify.update();
		$.scrollify.instantMove(tempScrollIndex?tempScrollIndex-1:tempScrollIndex);
		$.scrollify.move(tempScrollIndex);

		if ($.scrollify.currentIndex() != tempScrollIndex) //hacky fix for scrollify not moving after resize in work page
			setTimeout( function(){
				$.scrollify.instantMove(tempScrollIndex?tempScrollIndex-1:tempScrollIndex);
				$.scrollify.move(tempScrollIndex);
				console.log("myrr");
			}, 400);
	},
	onLeave: function() {
		$.scrollify.disable();
	}
});

var Workpage = Barba.BaseView.extend({
	namespace: 'work',
	onEnter: function() {
		var hash = window.location.hash.substring(1);

		/*
		$('#scrollup').fadeOut(0);
		$('.wrapper').scroll(function(){
            if ($(this).scrollTop() > 250) {
                $('#scrollup').fadeIn(300);
            } else {
                $('#scrollup').fadeOut(300);
            }
        });
		$('#scrollup').click(function(){
            $(".wrapper").animate({ scrollTop: 0 }, 500);
            return false;
        });
		*/

		// set barba to ignore fancybox links
		$(".fancybox").addClass("no-barba");

		// set navigation to current item from url and filter
		function setNavigation() {
			$(".dropdown-el input").each(function() {
				if ($(this).data('hash') === hash) {
					$('input[data-hash="all"]').prop('checked', false);
					$(this).prop('checked', true);
				}
			});

			$('.cd-filter .current').removeClass('current');
			$('a[data-hash="' + hash + '"]').addClass('current');

			$('.' + ((hash==='all')?'grid-item':hash) + ' a').attr('data-fancybox', hash + '-gallery');

			var selector = $('label[for="' + hash + '"]').attr('filter');
			$('.grid').isotope({
				transitionDuration: 0,
				filter: selector
			});
		}

		function navigationChanged(f) {
			var section = $('label[filter="' + f + '"]').attr('for');
			$('.cd-filter .current').removeClass('current');
			$('a[data-hash="' + section + '"]').addClass('current');
			
			$('input[data-hash="' + section + '"]').prop('checked', true);

			$('.' + ((section==='all')?'grid-item':section) + ' a').attr('data-fancybox', section + '-gallery');
			console.log('.' + ((section==='all')?'grid-item':section) + ' a');

			$('.grid').isotope({
				transitionDuration: '0.5s',
				filter: f
			});
		}

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

			// Fancybox
			$('[data-fancybox]').fancybox({
				buttons : ['close'],
				infobar: false,
				arrows: false,
				autoFocus: false
			});

			if (hash) {
				setNavigation();
			}

			$('.cd-filter a').click(function(e){
				var filter = $(this).data('filter');
				navigationChanged(filter);
				return false;
			});

			$('.dropdown-el').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (e.target.tagName === "LABEL") {
					var filter = e.target.getAttribute("filter");
					navigationChanged(filter);
				}
				$(this).toggleClass('expanded');
				return false;
			});

			$(document).click(function() {
				$('.dropdown-el').removeClass('expanded');
			});
		});
	},
	onEnterCompleted: function() {
		window.scrollTo(0,0);
	}
});

Homepage.init();
Workpage.init();

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
						setTimeout(_this.animFinish, 200); // wait for transition to finish
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
			rippler.css('border-color', rippleColor);
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

			reverse_rippler.css('border-color', rippleColor);
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