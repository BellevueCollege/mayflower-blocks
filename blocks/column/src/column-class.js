export default function BuildColumnClass( props, inEditMode ) {
	const { attributes: {
		enableXs,
		enableSm,
		enableMd,
		enableLg,
		autoXs,
		autoSm,
		autoMd,
		autoLg,
		columnsXs,
		columnsSm,
		columnsMd,
		columnsLg,
	} } = props;

	// Build array of column classes
	const columnClass = [];
	if ( inEditMode ) {
		columnClass.push( 'shadow' );
		columnClass.push( 'p-3' );
		columnClass.push( 'col' );
	} else {
		if ( enableXs ) {
			if ( autoXs ) {
				columnClass.push( 'col' );
			} else {
				columnClass.push( 'col-' + columnsXs );
			}
		}
		if ( enableSm ) {
			if ( autoSm ) {
				columnClass.push( 'col-sm' );
			} else {
				columnClass.push( 'col-sm-' + columnsSm );
			}
		}
		if ( enableMd ) {
			if ( autoMd ) {
				columnClass.push( 'col-md' );
			} else {
				columnClass.push( 'col-md-' + columnsMd );
			}
		}
		if ( enableLg ) {
			if ( autoLg ) {
				columnClass.push( 'col-lg' );
			} else {
				columnClass.push( 'col-lg-' + columnsLg );
			}
		}
	}
	return columnClass.join( ' ' )
}
