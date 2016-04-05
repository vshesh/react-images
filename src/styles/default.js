/* eslint quote-props: ["error", "as-needed"] */

const BAR_PAD_HORIZONTAL = 10;
const BAR_PAD_VERTICAL = 5;
const BAR_HEIGHT = 40;

const CLOSE_SIZE = 20;
const ARROW_HEIGHT = 120;
const GAP_BOTTOM = 50;
const GAP_TOP = 40;

const styles = {
	// LAYOUT
	row: {
		boxSizing: 'border-box',
		left: 0,
		position: 'fixed',
		right: 0,
	},

	headerRow: {
		height: BAR_HEIGHT,
		textAlign: 'right',
		top: 0,
		zIndex: 1,
	},
	bodyRow: {
		bottom: BAR_HEIGHT,
		top: BAR_HEIGHT,
	},
	footerRow: {
		bottom: 0,
		color: 'white',
		lineHeight: 1.3,
		minHeight: BAR_HEIGHT,
		maxWidth: 800,
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: `${BAR_PAD_VERTICAL}px ${BAR_PAD_HORIZONTAL}px`,
		textAlign: 'center',
		zIndex: 1,
	},

	// HEADER
	headerCount: {
		color: 'white',
		float: 'left',
		padding: 10,
		opacity: 0.66,
	},
	headerClose: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		height: BAR_HEIGHT,
		opacity: 0.66,
		outline: 'none',
		float: 'right',
		padding: 10,
		transition: 'opacity 150ms',
		width: BAR_HEIGHT,

		'&:hover': {
			opacity: 1,
		},
	},

	// SCENE
	container: {
		backgroundColor: 'rgba(0,0,0,0.88)',
		boxSizing: 'border-box',
		display: 'table',
		height: '100%',
		left: 0,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: 1001,
	},
	contentHeightShim: {
		display: 'inline-block',
		height: '100%',
		lineHeight: 0,
		verticalAlign: 'middle',
	},

	// IMAGES
	imageWrapper: {
		alignItems: 'center',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'center',
		lineHeight: 1,
		margin: 0,
		textAlign: 'center',
	},
	image: {
		lineHeight: 0,
		maxHeight: '100%',
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',

	},

	// BUTTONS
	button: {
		background: 'none',
		border: 'none',
		bottom: 0,
		opacity: 0.66,
		outline: 'none',
		padding: 0,
		position: 'absolute',
		top: 0,
		transition: 'opacity 150ms',
		width: '50%',

		'&:hover, &:focus': {
			opacity: 1,
		},
	},
	buttonPrev: {
		left: 0,
	},
	buttonNext: {
		right: 0,
	},

	// ARROWS
	arrows: {},
	arrow: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		marginTop: ARROW_HEIGHT / -2,
		padding: 20,
		position: 'absolute',
		top: '50%',
		height: ARROW_HEIGHT,
		width: 40,
		zIndex: 1001,

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none',

	},
	arrowNext: {
		right: 0,
	},
	arrowPrev: {
		left: 0,
	},

	// Responsive Stuff

	// hide arrows on tablet and below
	'@media (max-width: 1025px)': {
		arrows: {
			display: 'none',
		},
	},

	// shade the footer on tablet and below
	'@media (max-width: 1025px) and (orientation: landscape)': {
		bodyRow: {
			bottom: 0,
			top: 0,
		},
		footerRow: {
			backgroundColor: 'rgba(0, 0, 0, 0.66)',
		},
		// image: {
		// 	height: '100%',
		// },
	},
};

export default styles;
