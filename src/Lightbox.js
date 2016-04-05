import React, { Component, PropTypes } from 'react';
import { create } from 'jss';
import reactJss from 'react-jss';
import camelCase from 'jss-camel-case';
import px from 'jss-px';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';
import ReactSwipe from 'react-swipe';

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
	constructor (props) {
		super(props);

		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrev = this.gotoPrev.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.updateImageIndex = this.updateImageIndex.bind(this);
		this.handleSwipeCallback = this.handleSwipeCallback.bind(this);
		this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);

		this.state = {};
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
		console.log('did update', this.props.currentImage);
	}

	// ------------------------------
	// MANIPULATE NEXT/PREV
	// ------------------------------

	gotoNext (event) {
		// if (this.props.currentImage === (this.props.images.length - 1)) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		// this.props.onClickNext();
		this.refs.ReactSwipe.swipe.next();
	}
	gotoPrev (event) {
		// if (this.props.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		// this.props.onClickPrev();
		this.refs.ReactSwipe.swipe.prev();
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
	handleSwipeCallback (index, element) {
		// console.log('did swipe with index', index, element);
	}
	updateImageIndex (index) {
		// this.setState({ currentImageIndex: index });
	}
	handleImageLoad (e, index) {
		// console.log(e.target.width);
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
	handleMouseMove (e) {
		// if (this.state.userIsActive) return;
		//
		// this.setState({ userIsActive: true });
		// setTimeout(() => {
		// 	this.setState({ userIsActive: false });
		// 	console.log('userIsActive');
		// }, 2000);
	}

	// ------------------------------
	// RENDERING
	// ------------------------------

	renderArrowNext () {
		// if (this.state.currentImageIndex === (this.props.images.length - 1)) return null;
		const { classes } = this.props.sheet;
		return (
			<button title="Next (Right arrow key)"
				type="button"
				className={`${classes.button} ${classes.buttonNext}`}
				onClick={this.gotoNext}
				onTouchEnd={this.gotoNext}
				>
				<span className={`${classes.arrow} ${classes.arrowNext}`}>
					<Icon type="arrowRight" />
				</span>
			</button>
		);
	}

	renderArrowPrev () {
		// if (this.state.currentImageIndex === 0) return null;
		const { classes } = this.props.sheet;

		return (
			<button title="Previous (Left arrow key)"
				type="button"
				className={`${classes.button} ${classes.buttonPrev}`}
				onClick={this.gotoPrev}
				onTouchEnd={this.gotoPrev}
				>
				<span className={`${classes.arrow} ${classes.arrowPrev}`}>
					<Icon type="arrowLeft" />
				</span>
			</button>
		);
	}

	renderHeaderRow () {
		const { currentImage, images, showCloseButton, showImageCount } = this.props;
		const { currentImageIndex } = this.state;
		const { classes } = this.props.sheet;

		if (this.refs.ReactSwipe) {
			console.log(this.refs.ReactSwipe.swipe.getPos());
		}

		const elClose = showCloseButton ? (
			<button title="Close (Esc)" className={classes.headerClose} onClick={this.props.onClose}>
				<Icon type="close" />
			</button>
		) : null;

		const elCount = showImageCount
			? <div className={classes.headerCount}>{currentImageIndex} of {images.length}</div>
			: null;

		return (
			<div className={`${classes.row} ${classes.headerRow}`}>
				{elCount}
				{elClose}
			</div>
		);
	}

	renderDialog () {
		if (!this.props.isOpen) return null;
		const { classes } = this.props.sheet;

		return (
			<Fade
				aria-hidden={!this.props.isOpen}
				className={classes.container}
				duration={250}
				id="react-images-container"
				key="dialog"
				onMouseMove={this.handleMouseMove}
				role="dialog"
				>
				{this.renderHeaderRow()}
				<div className={`${classes.row} ${classes.bodyRow}`}>
					{this.renderImages()}
					<div className={classes.arrows}>
						{this.renderArrowPrev()}
						{this.renderArrowNext()}
					</div>
				</div>
				{this.renderFooterRow('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis ultricies erat at feugiat.')}
			</Fade>
		);
	}
	renderFooterRow (caption) {
		const { images, showImageCount } = this.props;
		const { classes } = this.props.sheet;

		if (!caption && !showImageCount) return null;
		const elCaption = caption
			? <div className={classes.footerCaption}>{caption}</div>
			: null;

		return (
			<div className={`${classes.row} ${classes.footerRow}`}>
				{elCaption}
			</div>
		);
	}
	renderImages () {
		const { images, currentImage } = this.props;
		const { classes } = this.props.sheet;

		if (!images || !images.length) return null;

		const image = images[currentImage];

		const containerStyles = { height: '100%' };
		const wrapperStyles = { height: '100%' };

		return (
			<ReactSwipe
				callback={this.handleSwipeCallback}
				className={classes.swipeContainer}
				containerStyles={containerStyles}
				continuous={false}
				disableScroll
				key={images.length}
				ref="ReactSwipe"
				startSlide={currentImage}
				wrapperStyles={wrapperStyles}
				>
				{images.map((image, i) => {
					let srcset;
					let sizes;

					if (image.srcset) {
						srcset = image.srcset.join();
						sizes = '100vw';
					}

					return (
						<div
							className={classes.imageWrapper}
							key={i}
							>
							<img
								className={classes.image}
								onLoad={e => this.handleImageLoad(e, currentImage)}
								sizes={sizes}
								src={image.src}
								srcSet={srcset}
							/>
						</div>
					);
				})}
			</ReactSwipe>
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
	showCloseButton: true,
	showImageCount: true,
	width: 900,
};

export default useSheet(Lightbox, defaultStyles);
