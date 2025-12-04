document.addEventListener('ed11yPanelOpened', e => {
	// get elements inside a <ed11y-element-result> tag
	let elements = document.querySelectorAll('ed11y-element-result');

	// Loop through elements and find the closest `.accordion-collapse` element
	elements.forEach((element) => {
		let collapse = element.closest('.accordion-collapse');

		// fallback for Bootstrap 4
		if ( ! collapse ) {
			collapse = element.closest('.collapse');
		}

		if ( collapse ) {
			// Add 'show' class to the collapse element
			collapse.classList.add('show');

			// Set aria expanded to true on the header and remove collapsed class
			let headerId = collapse.getAttribute('aria-labelledby');
			let header = document.getElementById( headerId ).firstChild;
			header.setAttribute('aria-expanded', 'true' );
			header.classList.remove('collapsed');
		}
	});
});
