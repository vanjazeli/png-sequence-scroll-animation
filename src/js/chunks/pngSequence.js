const pngSequence = {
	animationBlock: document.querySelector('.js-scrollbox-animation'),
	frames: document.querySelectorAll('.js-scrollbox-frame'),

	offset: 200,

	init: function () {
		this.initialSetup();
		this.detectScroll();
	},

	initialSetup: function () {
		this.frames[0].style.display = 'inline';
	},

	detectScroll: function () {
		window.addEventListener('scroll', () => {
			const rect = this.animationBlock.getBoundingClientRect();
			const rectTop = document.documentElement.scrollTop - window.innerHeight;
			const scrollTop = rect.top + rectTop + this.offset;

			const animationBlockHeight = this.animationBlock.offsetHeight;

			const scrollBottom = scrollTop + animationBlockHeight + window.innerHeight;
			const currentScroll = window.scrollY;

			const isInViewport = currentScroll >= scrollTop && currentScroll <= scrollBottom;

			if (isInViewport) {
				const rangePx = scrollBottom - scrollTop;
				const currPositionPercent = (currentScroll - scrollTop) / rangePx;

				const currentFrame = Math.round(currPositionPercent * 90);

				this.frames.forEach((frame) => {
					frame.style.display = 'none';
				});
				this.frames[currentFrame].style.display = 'inline';
			}
		});
	},
};

export default pngSequence;
