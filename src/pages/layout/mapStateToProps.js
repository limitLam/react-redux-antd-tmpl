const mapStateToProps = ({
	layout
}) => {
	return {
		collapsed: layout.collapsed,
		mode: layout.mode,
	}
};

export default mapStateToProps;