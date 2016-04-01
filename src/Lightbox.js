import React, { Component, PropTypes } from 'react';
import { create } from 'jss';
import reactJss from 'react-jss';
import camelCase from 'jss-camel-case';
import px from 'jss-px';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';
import Swipe from 'react-swipe';

export let jss = create();
export let useSheet = reactJss(jss);
jss.use(camelCase());
jss.use(nested());
jss.use(px());
jss.use(vendorPrefixer());

import utils from './utils';
import Fade from './Fade';
import Icon from './Icon';
import Portal from './Portal';

import defaultStyles from './styles/default';

class Lightbox extends Component {
	static theme (themeStyles) {
		const extStyles = Object.assign({}, defaultStyles);
		for (const key in extStyles) {
			if (key in themeStyles) {
				extStyles[key] = Object.assign({}, defaultStyles[key], themeStyles[key]);
			}
		}
		return extStyles;
	}
	constructor () {
		super();

		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrev = this.gotoPrev.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleImageClick = this.handleImageClick.bind(this);
		this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
	}
	componentWillReceiveProps (nextProps) {
		if (nextProps.isOpen && nextProps.enableKeyboardInput) {
			if (utils.canUseDOM) window.addEventListener('keydown', this.handleKeyboardInput);
		} else {
			if (utils.canUseDOM) window.removeEventListener('keydown', this.handleKeyboardInput);
		}

		if (nextProps.isOpen) {
			if (utils.canUseDOM) document.body.style.overflow = 'hidden';
		} else {
			if (utils.canUseDOM) document.body.style.overflow = null;
		}
	}
	componentDidUpdate () {
		console.log('did update');
	}

	// ------------------------------
	// MANIPULATE NEXT/PREV
	// ------------------------------

	gotoNext (event) {
		if (this.props.currentImage === (this.props.images.length - 1)) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		// console.log(this.refs.ReactSwipe);
		// console.log(this.refs.ReactSwipe.swipe);
		console.log(this.refs.ReactSwipe.swipe.getPos());
		this.refs.ReactSwipe.next();
		// this.props.onClickNext();
	}
	gotoPrev (event) {
		if (this.props.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.refs.ReactSwipe.prev();
		// this.props.onClickPrev();
	}

	// ------------------------------
	// EVENT HANDLING
	// ------------------------------

	handleClose (e) {
		if (e.target.id !== 'react-images-container') return;

		if (this.props.backdropClosesModal && this.props.onClose) {
			this.props.onClose();
		}
	}
	handleImageClick (e) {
		if (!this.props.onClickShowNextImage) return;

		this.gotoNext(e);
	}
	handleImageLoad (e, index) {
		// console.log('image', index, 'loaded', e);
	}
	handleKeyboardInput (event) {
		if (event.keyCode === 37) {
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) {
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) {
			this.props.onClose();
			return true;
		}
		return false;
	}

	// ------------------------------
	// RENDERING
	// ------------------------------

	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return null;
		const { classes } = this.props.sheet;
		return (
			<button title="Next (Right arrow key)"
				type="button"
				className={`${classes.arrow} ${classes.arrowNext}`}
				onClick={this.gotoNext}
				onTouchEnd={this.gotoNext}
			>
				<Icon type="arrowRight" />
			</button>
		);
	}

	renderArrowPrev () {
		if (this.props.currentImage === 0) return null;
		const { classes } = this.props.sheet;

		return (
			<button title="Previous (Left arrow key)"
				type="button"
				className={`${classes.arrow} ${classes.arrowPrev}`}
				onClick={this.gotoPrev}
				onTouchEnd={this.gotoPrev}
			>
				<Icon type="arrowLeft" />
			</button>
		);
	}

	renderCloseButton () {
		if (!this.props.showCloseButton) return null;
		const { classes } = this.props.sheet;

		return (
			<div className={classes.closeBar}>
				<button title="Close (Esc)" className={classes.closeButton} onClick={this.props.onClose}>
					<Icon type="close" />
				</button>
			</div>
		);
	}

	renderDialog () {
		if (!this.props.isOpen) return null;
		const { classes } = this.props.sheet;

		return (
			<Fade
				className={classes.container}
				duration={250}
				id="react-images-container"
				key="dialog"
				onClick={this.handleClose}
				onTouchEnd={this.handleClose}
				>
				<div className={classes.content} style={{ maxWidth: this.props.width }}>
					{this.renderCloseButton()}
					{this.renderImages()}
				</div>
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
			</Fade>
		);
	}
	renderFooter (caption, count) {
		const { images, showImageCount } = this.props;
		const { classes } = this.props.sheet;

		if (!caption && !showImageCount) return null;

		const imageCount = showImageCount
			? <div className={classes.footerCount}>{count} of {images.length}</div>
			: null;
		const figcaption = caption
			? <figcaption className={classes.footerCaption}>{caption}</figcaption>
			: null;

		return (
			<div className={classes.footer}>
				{imageCount}
				{figcaption}
			</div>
		);
	}
	renderImages () {
		const { images, currentImage } = this.props;
		const { classes } = this.props.sheet;

		if (!images || !images.length) return null;

		const image = images[currentImage];

		let srcset;
		let sizes;

		return (
			<Swipe
				className={classes.swipeContainer}
				continuous={false}
				disableScroll
				key={images.length}
				ref="ReactSwipe"
				slideToIndex={currentImage}
				startSlide={currentImage}
				stopPropagation>
				{images.map((image, i) => {
					if (image.srcset) {
						srcset = image.srcset.join();
						sizes = '100vw';
					}

					return (
						<figure
							className={classes.figure}
							key={i}
							>
							<img
								className={classes.image}
								onClick={this.handleImageClick}
								onLoad={e => this.handleImageLoad(e, currentImage)}
								sizes={sizes}
								src={image.src}
								srcSet={srcset}
								style={{
									cursor: this.props.onClickShowNextImage ? 'pointer' : 'auto',
								}}
							/>
							{this.renderFooter(image.caption, i + 1)}
						</figure>
					);
				})}
			</Swipe>
		);
	}
	render () {
		return (
			<Portal>
				{this.renderDialog()}
			</Portal>
		);
	}
}

Lightbox.displayName = 'Lightbox';

Lightbox.propTypes = {
	backdropClosesModal: PropTypes.bool,
	currentImage: PropTypes.number,
	enableKeyboardInput: PropTypes.bool,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.string,
		})
	).isRequired,
	isOpen: PropTypes.bool,
	onClickNext: PropTypes.func.isRequired,
	onClickPrev: PropTypes.func.isRequired,
	onClickShowNextImage: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	sheet: PropTypes.object,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	width: PropTypes.number,
};


// auto                : React.PropTypes.number,
// callback            : React.PropTypes.func,
// containerStyles     : React.PropTypes.object,
// continuous          : React.PropTypes.bool,
// disableScroll       : React.PropTypes.bool,
// reinitSwipeOnUpdate : React.PropTypes.bool
// shouldUpdate        : React.PropTypes.func,
// slideToIndex        : React.PropTypes.number,
// speed               : React.PropTypes.number,
// startSlide          : React.PropTypes.number,
// stopPropagation     : React.PropTypes.bool,
// transitionEnd       : React.PropTypes.func,
// wrapperStyles       : React.PropTypes.object,

Lightbox.defaultProps = {
	enableKeyboardInput: true,
	currentImage: 0,
	onClickShowNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	width: 900,
};

export default useSheet(Lightbox, defaultStyles);
