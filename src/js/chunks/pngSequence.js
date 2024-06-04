import gsap from 'gsap';

const pngSequence = {
	animationBlock: document.querySelector('.js-scrollbox-animation'),
	frames: document.querySelectorAll('.js-scrollbox-frame'),

	currentFrame: { value: 0 },

	offset: 0,

	init: function () {
		this.initialSetup();
		this.detectScroll();
	},

	initialSetup: function () {
		this.frames.forEach((frame) => {
			frame.style.visibility = 'hidden';
		});
		this.frames[0].style.visibility = 'visible';
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

				const nextFrame = Math.round(currPositionPercent * 90);

				gsap.to(this.currentFrame, {
					value: nextFrame,
					onUpdate: () => {
						this.frames.forEach((frame) => {
							frame.style.visibility = 'hidden';
						});
						this.frames[Math.round(this.currentFrame.value)].style.visibility = 'visible';
					},
				});
			}
		});
	},
};

export default pngSequence;
