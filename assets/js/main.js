document.addEventListener('DOMContentLoaded', function () {
	// lyuboy js kodlarni if ni ichida yozamiz. jquery ham ishlatamiz.
	const swiperEl = document.querySelector('.custom-swiper')

	if (swiperEl) {
	}

	// tab function
	function tabFunction(tabContainer) {
		let tabs = tabContainer.find('.control_tab')
		let contents = tabContainer
			.siblings('.control_contents')
			.find('.control_content')

		tabs.on('click', function () {
			let index = $(this).index()

			tabs.removeClass('active')
			contents.removeClass('active')

			$(this).addClass('active')
			contents.eq(index).addClass('active')
		})
	}

	$('.control_tabs').each(function () {
		tabFunction($(this))
	})

	function tabPerformFunction(tabContainer) {
		let tabs = tabContainer.find('.perform_tab')
		let contents = tabContainer
			.siblings('.perform_contents')
			.find('.perform_content')

		tabs.on('click', function () {
			let index = $(this).index()

			tabs.removeClass('active')
			contents.removeClass('active')

			$(this).addClass('active')
			contents.eq(index).addClass('active')
		})
	}
	$('.perform_tabs').each(function () {
		tabPerformFunction($(this))
	})

	function tabSolveFunction(tabContainer) {
		let tabs = tabContainer.find('.perform_tab-wishes')
		let contents = tabContainer
			.closest('.container')
			.find('.perform_contents-wishes .perform_content-wishes')

		tabs.on('click', function () {
			let index = $(this).index()

			tabs.removeClass('active')
			contents.removeClass('active').hide()

			$(this).addClass('active')
			contents.eq(index).addClass('active').fadeIn(300)
		})
	}

	$('.perform_tabs-wishes').each(function () {
		tabSolveFunction($(this))
	})

	// const performTab = $('.perform_tab');
	// const performContent = $('.perform_content');
	// if (performTab.length > 0) {
	//     tabFunction(performTab, performContent)
	// }

	const showExperienceButton = $('.experience .show-more')
	const experienceBlock = $('.experience_block')

	showExperienceButton.click(function () {
		experienceBlock.addClass('all')
		$(this).remove()
	})

	// accordion
	function initAccordion(selector) {
		let accordion = $(selector)

		// Open the first item by default
		accordion
			.find('.accordion_item:first-child .accordion_content')
			.addClass('show')
		accordion
			.find('.accordion_item:first-child .accordion_header')
			.addClass('active')

		accordion.on('click', '.accordion_header', function () {
			let content = $(this).next('.accordion_content')
			content.toggleClass('show')
			$(this).toggleClass('active')
		})
	}

	initAccordion('.control_accordion')
	initAccordion('.materials_accordion')

	if ($('.materialSwiperMobile').length > 0) {
		var materialSwiperMobile = new Swiper('.materialSwiperMobile', {
			spaceBetween: 43,
			loop: true,
			slidesPerView: 1.2,
			centeredSlides: false,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.material-next',
				prevEl: '.material-prev',
			},
		})
	}

	// shahboz

	// header menus
	if ($('.menu').length) {
		if ($(window).width() > 768) {
			$('.menu_item:has(.menu_content) .menu_title').on(
				'mouseenter',
				function () {
					$('.menu_item').removeClass('is_open')
					$(this).closest('.menu_item').addClass('is_open')
				}
			)
			$('.links_item:has(.menu)').on('mouseleave', function () {
				$('.menu *').removeClass('is_open')
				// $('.menu').removeClass('is_open');
			})

			$('.header_left .hamburger').click(function () {
				$('.menu').toggleClass('is_active')
			})
			// $('.links_item:has(.menu)').on('mouseenter', function () {
			//     $(this).children('.menu').addClass('is_open');
			// });
			// $('.links_item:has(.menu)').hover(function() {
			//     $('.menu').removeClass('is_open');
			//     $(this).children('.menu').addClass('is_open');
			// });
		}

		if ($(window).width() < 768) {
			$('.links_item:has(.menu) .link_title')
				.off('click')
				.on('click', function (e) {
					e.preventDefault()

					let $menu = $(this).siblings('.menu')

					if ($menu.hasClass('is_open')) {
						$menu.removeClass('is_open').css('height', '0px')
					} else {
						$('.menu').removeClass('is_open').css('height', '0px')

						$menu
							.addClass('is_open')
							.css('height', $menu[0].scrollHeight + 'px')
					}
				})
			$('.menu_item:has(.menu_content) .menu_title')
				.off('click')
				.on('click', function (e) {
					e.preventDefault()

					let $menu_content = $(this).siblings('.menu_content')

					$('.menu_content').removeClass('is_open')
					$menu_content.addClass('is_open')
				})

			$('.to_back')
				.off('click')
				.on('click', function (e) {
					e.preventDefault()
					$('.menu_content').removeClass('is_open')
				})

			$('.menu_top .close_icon').click(function (e) {
				e.preventDefault()
				$('.menu_top').removeClass('is_open')
				$('.header_links').removeClass('is_open')
				$('.menu_content ').removeClass('is_open')
			})
			$('.hamburger').click(function (e) {
				e.preventDefault()
				$('.menu_top').addClass('is_open')
				$('.header_links').addClass('is_open')
			})
		}
	}

	// service item mobile
	if ($('.service_title').length) {
		$('.service_title').click(function () {
			$(this).siblings('ul').addClass('is_open')
		})
		$('.service_item .close_icon').click(function () {
			$('.service_item ul').removeClass('is_open')
		})
	}

	// advantage_item
	if ($('.advantage_item').length) {
		if ($(window).width() < 992) {
			$('.advantage_title').on('click', function () {
				let $this = $(this)
				let $image = $this.siblings('.advantage_image')
				let $desc = $this.siblings('.desc')

				if ($this.hasClass('active')) {
					$this.removeClass('active')
					$image.css('height', '0px')
					$desc.css('height', '0px')
				} else {
					$('.advantage_title').removeClass('active')
					$('.advantage_image, .advantage_item .desc').css('height', '0px')

					$this.addClass('active')
					$image.css('height', '100%')
					$desc.css('height', $desc[0].scrollHeight + 'px')
				}
			})
		}
	}

	// input tel all.
	const telInput = document.querySelectorAll('input[type="tel"]')

	if (telInput.length) {
		telInput.forEach(input => {
			new IMask(input, {
				mask: '+{7} (000) 000-00-00',
			})
		})
	}

	if ($('.litei_item').length && $(window).width() < 992) {
		$('.litei_item').on('click', function () {
			$(this).toggleClass('is_open')
			let $litei_top = $(this).children('.litei_top')
			let $litei_bottom = $(this).children('.litei_bottom')

			if ($litei_top.height() > 0 || $litei_bottom.height() > 0) {
				$litei_top.css('height', '0px')
				$litei_bottom.css('height', '0px')
			} else {
				$('.litei_item .litei_top').css('height', '0px')
				$('.litei_item .litei_bottom').css('height', '0px')

				$litei_top.css('height', $litei_top[0].scrollHeight + 142 + 'px')
				$litei_bottom.css('height', $litei_bottom[0].scrollHeight + 'px')
			}
		})
	}

	// portofilo_swiper
	if (document.querySelector('.portofilo_swiper')) {
		new Swiper('.portofilo_swiper', {
			spaceBetween: 32,
			slidesPerView: 1,
			loop: false,
			centeredSlides: true,
			navigation: {
				nextEl: '.navigation .next_btn',
				prevEl: '.navigation .prev_btn',
			},
			breakpoints: {
				768: {
					slidesPerView: 'auto',
				},
			},
		})
	}

	if ($('.quality_item').length && $(window).width() < 768) {
		$('.quality_item').on('mouseenter', function () {
			let $desc = $(this).children('.desc')
			$('.quality_item .desc').css('height', '0px')
			$desc.css('height', $desc[0].scrollHeight + 'px')
		})

		$('.quality_item').on('mouseleave', function () {
			$(this).children('.desc').css('height', '0px')
		})
	}
	if ($('.news_item').length && $(window).width() < 992) {
		$('.news_item').on('mouseenter', function () {
			let $desc = $(this).children('.news_top')
			$('.news_item .news_top').css('height', '0px')
			$desc.css('height', $desc[0].scrollHeight + 'px')
		})

		$('.news_item').on('mouseleave', function () {
			$(this).children('.news_top').css('height', '0px')
		})
	}

	if ($('.fancybox').length !== 0) {
		Fancybox.bind('[data-fancybox]', {
			// Your custom options
		})
	}

	if (document.querySelector('.review_slider')) {
		var reviewSlider = new Swiper('.review_slider', {
			loop: true,
			spaceBetween: 16,
			navigation: {
				nextEl: '.review_slider .next_btn',
				prevEl: '.review_slider .prev_btn',
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
					grid: {
						rows: 2,
						fill: 'row',
					},
				},
				768: {
					slidesPerView: 2,
					grid: {
						rows: 1,
						fill: 'row',
					},
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 50,
				},
				1400: {
					slidesPerView: 4,
					spaceBetween: 50,
				},
				1640: {
					slidesPerView: 4,
					spaceBetween: 170,
				},
			},
		})
	}
	if (document.querySelector('.company_swiper')) {
		var companySwiper = new Swiper('.company_swiper', {
			loop: true,
			spaceBetween: 22,
			navigation: {
				nextEl: '.company_swiper .next_btn',
				prevEl: '.company_swiper .prev_btn',
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
					grid: {
						rows: 2,
						fill: 'row',
					},
					direction: 'horizontal',
				},
				992: {
					slidesPerView: 'auto',
					direction: 'vertical',
				},
			},
		})
	}
	if (document.querySelectorAll('.printer_slider').length > 0) {
		var printer_slider = new Swiper('.printer_slider', {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: '.printer_slider .next_btn',
				prevEl: '.printer_slider .prev_btn',
			},
		})
	}

	if (document.querySelector('.team_slider')) {
		var teamSlider = new Swiper('.team_slider', {
			slidesPerView: 3.7,
			spaceBetween: 80,
			loop: true,
			navigation: {
				nextEl: '.navigation .next_btn',
				prevEl: '.navigation .prev_btn',
			},
			watchSlidesProgress: true,
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				1640: {
					slidesPerView: 3.7,
					spaceBetween: 80,
				},
			},
		})
	}

	if ($('.calculator').length) {
		$('.calculator__category').on('click', function () {
			let $this = $(this)
			if ($this.hasClass('active')) return

			$this.addClass('active').siblings().removeClass('active')

			let $parentBlock = $this.closest('.calc_block')
			let index = $this.index()
			let $contents = $parentBlock.find(
				'.calculator_content_wrap .calculator_content'
			)

			$contents.filter('.active').fadeOut(200, function () {
				$(this).removeClass('active')
				$contents
					.eq(index)
					.addClass('active')
					.css('display', 'flex')
					.fadeIn(200)
			})

			if ($(window).width() < 992) {
				$('.calculator__sidebar').hide()
				$('.calculator_content_wrap').show()
			}
		})

		$('.calculator__subcategory').on('click', function () {
			let $this = $(this)
			if ($this.hasClass('active')) return

			let $parentBlock = $this.closest('.calculator_content')
			let index = $this.index()
			let $contents = $parentBlock.find('.table_item')

			$this.addClass('active').siblings().removeClass('active')

			$contents.filter('.active').fadeOut(200, function () {
				$(this).removeClass('active')
				$contents.eq(index).fadeIn(200).addClass('active')
			})
		})
	}

	if ($('.accordion_items').length) {
		$('.accordion_title').on('click', function () {
			let $parent = $(this).parent()
			let $accordionBody = $(this).siblings('.accordion_body')
			let $accordionContainer = $(this).closest('.accordion_items')

			if ($parent.hasClass('active')) {
				$parent.removeClass('active')
				$accordionBody.css('height', '0px')
				console.log(11)
			} else {
				$accordionContainer.find('.accordion').removeClass('active')
				$accordionContainer.find('.accordion_body').css('height', '0px')

				$parent.addClass('active')
				$accordionBody.css('height', $accordionBody[0].scrollHeight + 'px')
			}
		})
	}
	if ($('.filter').length) {
		$('.filter_top').on('click', function () {
			let $parent = $(this).parent()
			let $accordionBody = $(this).siblings('.filter_body')
			let $accordionContainer = $(this).closest('.filter')

			if ($parent.hasClass('active')) {
				$parent.removeClass('active')
				$accordionBody.css('height', '0px')
			} else {
				$accordionContainer.find('.filter_item').removeClass('active')
				$accordionContainer.find('.filter_body').css('height', '0px')

				$parent.addClass('active')
				$accordionBody.css('height', $accordionBody[0].scrollHeight + 'px')
			}
		})
		$('.show_more').click(function (e) {
			e.preventDefault()
			$(this).siblings().removeClass('d-none')
			$(this).addClass('d-none')
		})
		$('.filter_btn').click(function (e) {
			e.preventDefault()
			$('.filter').addClass('is_open')
		})
		$('.filter .close_icon').click(function (e) {
			e.preventDefault()
			$('.filter').removeClass('is_open')
		})
	}

	if ($('.vacancies_adv').length) {
		$('.vacancies_adv .btn_').click(function () {
			$('.adv_item').css('display', 'flex')
			$(this).css('display', 'none')
		})
	}

	if ($('.review_tabs').length) {
		const $tabs = $('.review_tab')
		const $contents = $('.review_right .review_content')

		$tabs.first().addClass('active')
		$contents.first().addClass('active').css('display', 'block')

		$tabs.on('click', function (e) {
			e.preventDefault()

			const $this = $(this)
			const index = $this.index()

			if ($this.hasClass('active')) {
				return
			}

			$tabs.removeClass('active')
			$this.addClass('active')

			$contents.filter(':visible').fadeOut(200, function () {
				$contents.eq(index).fadeIn(200).addClass('active')
			})
			$contents
				.not(':eq(' + index + ')')
				.removeClass('active')
				.css('display', 'none')
		})
	}

	if (document.querySelector('.blog_swiper')) {
		let blogSwiper = new Swiper('.blog_swiper', {
			slidesPerView: 3,
			spaceBetween: 50,
			grid: {
				rows: 2,
				fill: 'row',
			},
			spaceBetween: 20,
			navigation: {
				nextEl: '.blog_swiper .next_btn',
				prevEl: '.blog_swiper .prev_btn',
			},
			pagination: {
				el: '.blog_swiper .blog_pagination',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					let paginationHTML = ''

					for (let i = 1; i <= total; i++) {
						paginationHTML += `<a href="#" class="${
							i === current ? 'active' : ''
						}" data-index="${i - 1}">${i < 10 ? '0' + i : i}</a>`
					}

					document.querySelector('.blog_pagination').innerHTML = paginationHTML

					document.querySelectorAll('.blog_pagination a').forEach(link => {
						link.addEventListener('click', function (e) {
							e.preventDefault()
							blogSwiper.slideTo(parseInt(this.getAttribute('data-index')))
						})
					})

					return paginationHTML
				},
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					grid: { rows: 3 },
				},
				768: {
					slidesPerView: 2,
					grid: { rows: 2 },
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 3,
					grid: { rows: 2 },
					spaceBetween: 15,
				},
				1640: {
					spaceBetween: 50,
				},
			},
		})
		document
			.querySelector('.blog_pagination')
			.addEventListener('click', function (e) {
				if (e.target.tagName === 'A') {
					e.preventDefault()
					let index = parseInt(e.target.getAttribute('data-index'))
					blogSwiper.slideTo(index)
				}
			})
	}
	if ($('.blog_navigation').length) {
		$('.blog_pagination a').click(function (e) {
			e.preventDefault()
			$(this).addClass('active')
			$(this).siblings().removeClass('active')
		})
	}

	if ($('.modal_').length) {
		function showModal() {
			$('.modal_back').addClass('active')
			$('.modal_').addClass('show')
		}

		let $buttons = $('.from_to .btn_, .works .btn_')
		$buttons.click(function (event) {
			event.preventDefault()
			showModal()
		})

		$('.modal_back').click(function () {
			$(this).removeClass('active')
			if ($('.modal_').hasClass('show')) {
				$('.modal_').removeClass('show')
			}
		})
	}
})
