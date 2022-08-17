<?php

function mbg4_child_pages_callback( $attributes ) {
	return 'I ran! ' . print_r( $attributes, true );
}
