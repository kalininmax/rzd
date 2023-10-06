/* eslint-disable no-undef */
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const TABLET_BREAKPOINT = 1024;
const LOW_HEIGHT = 720;

class Hero {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-hero]');

		if (!this.container) {
			return;
		}

		this.train = this.container.querySelector('[data-hero-train]');

		const setPath = () => {
			this.path =
				window.innerWidth <= TABLET_BREAKPOINT
					? this.container.querySelector(
							'[data-hero-bg-tablet] [data-hero-path]'
					  )
					: this.container.querySelector('[data-hero-bg] [data-hero-path]');

			this.initialProgress =
				window.innerWidth <= TABLET_BREAKPOINT ||
				window.innerHeight < LOW_HEIGHT
					? 0.088
					: 0.138;
		};

		setPath();
		this.scrollHeight = (window.innerHeight * 1.75).toFixed();

		window.addEventListener('load', () => {
			this.initAnim();

			gsap.from('.history__train-wrapper', {
				x: '-150vw',
				duration: 1.5,
				ease: 'power4.out',
				scrollTrigger: {
					trigger: '.history__train-wrapper',
					start: 'top bottom',
				},
			});

			gsap.to('.history', {
				backgroundColor: '#EBEDEE',
				scrollTrigger: {
					trigger: '.history',
					start: 'top center',
					end: 'bottom bottom',
					scrub: 1,
				},
			});
		});

		window.addEventListener('resize', () => {
			setPath();
			this.scrollHeight = (window.innerHeight * 1.75).toFixed();
			this.destroy();

			this.TO && clearTimeout(this.TO);
			this.TO = setTimeout(() => {
				this.initAnim();
			}, 1000);
		});
	}

	initAnim() {
		gsap.set(this.train, { autoAlpha: 1 });

		this.TL = gsap.timeline({ paused: true }).to(this.train, {
			duration: 100,
			motionPath: {
				path: this.path,
				align: this.path,
				alignOrigin: [0.5, 0],
				autoRotate: 90,
			},
		});

		if (window.scrollY === 0) {
			this.anim = gsap.fromTo(
				this.TL,
				{
					progress: 0,
				},
				{
					progress: this.initialProgress,
					duration: 1.5,
					immediateRender: false,
					ease: 'Power2.out',
				}
			);
		}

		this.animTrigger = gsap.fromTo(
			this.TL,
			{
				progress: this.initialProgress,
			},
			{
				progress: 1,
				scrollTrigger: {
					trigger: this.container,
					start: 'top top',
					end: `+=${this.scrollHeight}px`,
					scrub: 1,
				},
			}
		);

		ScrollTrigger.refresh();
	}
	destroy() {
		this.TL && this.TL.progress(0).kill();
		this.anim && this.anim.kill();
		this.animTrigger && this.animTrigger.kill();
	}
}

export default new Hero();
