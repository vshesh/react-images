const CLOSE_SIZE = 20;
const ARROW_HEIGHT = 120;
const GAP_BOTTOM = 50;
const GAP_TOP = 40;

const styles = {
	// SCENE
	container: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		boxSizing: 'border-box',
		height: '100%',
		left: 0,
		position: 'fixed',
		textAlign: 'center',
		top: 0,
		width: '100%',
		zIndex: 1001,
	},
	content: {
		display: 'inline-block',
		margin: '0 auto',
		position: 'relative',
		verticalAlign: 'middle',
		width: '100%',
	},
	contentHeightShim: {
		display: 'inline-block',
		height: '100%',
		lineHeight: 0,
		verticalAlign: 'middle',
	},

	// IMAGES
	image: {
		boxSizing: 'border-box',
		display: 'block',
		lineHeight: 0,
		margin: '0 auto',
		maxHeight: '100%',
		maxWidth: '100%',
		paddingBottom: 50,
		paddingTop: 40,

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',

	},
	figure: {
		alignItems: 'center',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		justifyContent: 'center',
		lineHeight: 1,
		margin: 0,
		minHeight: 200,
		minWidth: 300,
		padding: '0 10px',
		textAlign: 'center',
	},
	footer: {
		color: 'white',
		cursor: 'auto',
		height: GAP_BOTTOM,
		lineHeight: 1.3,
		marginTop: -GAP_BOTTOM,
		paddingTop: 5,
		textAlign: 'left',
		width: '100%',
	},
	footerCount: {
		float: 'right',
		fontSize: '.85em',
		opacity: 0.75,
	},
	footerCaption: {
		paddingRight: 80,
	},

	// BUTTONS
	arrow: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		marginTop: ARROW_HEIGHT / -2,
		maxWidth: 80,
		opacity: 0.66,
		padding: 20,
		position: 'absolute',
		top: '50%',
		transition: 'opacity 150ms',
		height: ARROW_HEIGHT,
		width: '16%',
		zIndex: 1001,

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none',

		'&:hover': {
			opacity: 1,
		},

	},
	'@media (max-width: 1025px)': {
		arrow: {
			display: 'none',
		},
	},
	arrowNext: {
		right: 0,
	},
	arrowPrev: {
		left: 0,
	},
	closeBar: {
		boxSizing: 'border-box',
		height: GAP_TOP,
		left: 0,
		padding: '0 10px',
		position: 'absolute',
		textAlign: 'right',
		top: 0,
		width: '100%',
		zIndex: 1,
	},
	closeButton: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		height: CLOSE_SIZE + 20,
		opacity: 0.66,
		outline: 'none',
		padding: 10,
		position: 'relative',
		right: -10,
		top: 0,
		transition: 'opacity 150ms',
		width: CLOSE_SIZE + 20,

		'&:hover': {
			opacity: 1,
		},
	},
};

export default styles;
