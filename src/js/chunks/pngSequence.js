const pngSequence = {
	module: document.querySelector('.js-scrollbox'),
	frames: document.querySelectorAll('.js-scrollbox-frame'),

	init: function () {
		this.initialSetup();
		this.detectScroll();
	},

	initialSetup: function () {
		this.frames[0].style.display = 'inline';
	},

	detectScroll: function () {
		window.addEventListener('scroll', (e) => {
			const rect = this.module.getBoundingClientRect();
			const scrollTop = document.documentElement.scrollTop - window.innerHeight;
			const elementTop = rect.top + scrollTop;

			const moduleHeight = this.module.offsetHeight;

			const scrollBottom = elementTop + moduleHeight + window.innerHeight;
			const currentScroll = window.scrollY;

			if (currentScroll >= elementTop && currentScroll <= scrollBottom) {
				console.log(true);
			} else {
				console.log(false);
			}
		});
	},
};

export default pngSequence;
