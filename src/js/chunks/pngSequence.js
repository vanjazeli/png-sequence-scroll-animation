import gsap from 'gsap';

const pngSequence = {
	animationBlock: document.querySelector('.js-scrollbox-animation'),
	frames: document.querySelectorAll('.js-scrollbox-frame'),

	currentFrame: { value: 0 },

	offset: 0,

	init: function () {
		this.imagePreload();
		this.initialSetup();
		this.detectScroll();
	},

	initialSetup: function () {
		this.frames[0].style.display = 'inline';
	},

	imagePreload: function () {
		const preloadImages = [];

		console.dir(this.frames[0]);
		this.frames.forEach((frame) => {
			const image = new Image();
			image.src = frame.src;

			preloadImages.push(image);
		});
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
							frame.style.display = 'none';
						});
						this.frames[Math.round(this.currentFrame.value)].style.display = 'inline';
					},
				});
			}
		});
	},
};

export default pngSequence;
