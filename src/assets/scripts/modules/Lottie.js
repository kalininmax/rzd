import lottie from 'lottie-web';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class Lottie {
	constructor() {
		this.init();
	}

	init() {
		document.querySelectorAll('[data-lottie]').forEach((el) => {
			el.lottieAnim = lottie.loadAnimation({
				container: el,
				renderer: 'svg',
				autoplay: false,
				path: el.getAttribute('data-lottie'),
			});

			el.scrollTrigger = ScrollTrigger.create({
				trigger: el,
				start: 'top 80%',
				end: 'bottom top',
				onEnter: () => {
					el.lottieAnim.play();
				},
				onEnterBack: () => {
					el.lottieAnim.play();
				},
				onLeave: () => {
					el.lottieAnim.stop();
				},
				onLeaveBack: () => {
					el.lottieAnim.stop();
				},
			});
		});
	}
}

export default new Lottie();
