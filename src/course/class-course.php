<?php

class Mayflower_Blocks_Course {
	private $link_base_url        = 'https://www.bellevuecollege.edu/classes/All/';
	private $dataapi_base_url     = 'https://www2.bellevuecollege.edu/data/api/v1/course/';
	private $catalog_base_url     = false;
	private $catalog_base_api_url = false;
	private $catalog_api_key      = false;
	private $subject;
	private $number;
	private $description;
	private $headingTag;

	function __construct( $subject, $number, $description, $headingTag ) {
		$this->subject = $subject;
		$this->number = $number;
		$this->description = $description;
		$this->headingTag = $headingTag;

		$this->catalog_base_url     = defined( 'ACALOG_BASE_URL' )     ? ACALOG_BASE_URL     : false;
		$this->catalog_base_api_url = defined( 'ACALOG_BASE_API_URL' ) ? ACALOG_BASE_API_URL : false;
		$this->catalog_api_key      = defined( 'ACALOG_API_KEY' )      ? ACALOG_API_KEY      : false;
	}

	/**
	 * Fetch Course Data from Data API in JSON format
	 */
	private function dataapi_fetch_json() {

		$key = esc_attr( 'mfblocks-course-' . $this->subject . $this->number );
		$raw_data = get_site_transient( $key );

		if ( ! $raw_data ) {
			// Build request URL
			// Example: https://www.bellevuecollege.edu/data/api/v1/course/ACCT/101
			$api_url = $this->dataapi_base_url . urlencode( $this->subject ) . '/'. urlencode( $this->number );

			// Get raw data from API
			$raw_data = wp_remote_get( $api_url );

			if ( is_array( $raw_data ) ) {
				set_site_transient( $key, $raw_data, 15 * 60 ); // 15 mins
			}

		}

		// Return JSON if successful, otherwise return false
		return is_array( $raw_data ) ? json_decode( $raw_data['body'] ) : false;
	}

	/**
	 * Load Course Information from Data API
	 */
	private function dataapi_load_course() {

		// Fetch JSON
		$raw = $this->dataapi_fetch_json();

		// Make sure that data has been returned
		if ( isset( $raw->course ) ) {
			// Build model
			$course = $raw->course;

			return Array(
				'title' => $course->title,
				'subject' => $course->subject,
				'number' => $course->courseNumber,
				'credits' => $course->credits,
				'variable' => $course->isVariableCredits,
				'common' => $course->isCommonCourse,
				'description' => $course->description,
			);
		}
	}

	/**
	 * Determine Current Catalog ID
	 */
	private function catalog_current_id( $base_url, $key ) {

		$catalog_id = get_site_transient( 'mfblocks-catalog-id' );

		if ( $catalog_id ) {
			return $catalog_id;
		}

		$url      = $base_url . '/content?key=' . urlencode( $key ) . '&format=xml&method=getCatalogs';
		$response = wp_safe_remote_get( $url );

		if ( is_wp_error( $response ) ) {
			error_log( 'mfblocks: catalog API error — ' . $response->get_error_message() );
			return false;
		}

		$status = wp_remote_retrieve_response_code( $response );
		if ( $status < 200 || $status >= 300 ) {
			error_log( "mfblocks: catalog API returned HTTP $status" );
			return false;
		}

		libxml_use_internal_errors( true );
		$xml = simplexml_load_string( wp_remote_retrieve_body( $response ) );
		libxml_clear_errors();

		if ( $xml === false ) {
			error_log( 'mfblocks: catalog XML parse failed' );
			return false;
		}

		$catalog_id = false;
		foreach ( $xml[0]->catalog as $catalog ) {
			if ( $catalog->state->published == 'Yes' && $catalog->state->archived == 'No' ) {
				$catalog_id = str_replace( 'acalog-catalog-', '', (string) $catalog->attributes()->id );
			}
		}

		if ( $catalog_id ) {
			set_site_transient( 'mfblocks-catalog-id', $catalog_id, ( 4 * HOUR_IN_SECONDS ) + rand( 0, 1 * HOUR_IN_SECONDS ) );
		}

		return $catalog_id;
	}

	/**
	 * Fetch Course Data from Acalog API in SOAP format
	 */

	function catalog_course_id( $base_url, $key, $course_subject, $course_number, $catalog ) {
		$course_subject = urlencode( '"' . $course_subject . '"' );
		$course_number  = urlencode( '"' . $course_number . '"' );
		if ( ! $course_subject || ! $course_number || ! $catalog ) {
			error_log( 'mfblocks: missing course subject, number, or catalog — ' . urldecode( $course_subject ) . ' ' . urldecode( $course_number ) . ' ' . $catalog );
			return false;
		}
		$transient_name = sanitize_key( 'mfblocks-catalog-course-id-' . base64_encode( $catalog . $course_subject . $course_number ) );
		$course_id      = get_site_transient( $transient_name );

		if ( $course_id ) {
			return $course_id;
		}

		$url      = $base_url . '/search/courses?key=' . urlencode( $key ) . '&format=xml&method=search&catalog=' . $catalog . '&query=' . $course_subject . '%20' . $course_number . '&options[sort]=rank&options[limit]=1';
		$response = wp_safe_remote_get( $url );

		if ( is_wp_error( $response ) ) {
			error_log( 'mfblocks: course API transport error — ' . $response->get_error_message() );
			return false;
		}

		$status = wp_remote_retrieve_response_code( $response );
		if ( $status < 200 || $status >= 300 ) {
			error_log( "mfblocks: course API returned HTTP $status" );
			return false;
		}

		libxml_use_internal_errors( true );
		$xml = simplexml_load_string( wp_remote_retrieve_body( $response ) );
		libxml_clear_errors();

		if ( $xml === false ) {
			error_log( 'mfblocks: course XML parse failed' );
			return false;
		}

		if ( ! $xml->search->results->result->id ) {
			error_log( 'mfblocks: no results for ' . urldecode( $course_subject ) . ' ' . urldecode( $course_number ) . ' (catalog: ' . $catalog . ')' );
			return false;
		}
		$course_id = (string) $xml->search->results->result->id;
		set_site_transient( $transient_name, $course_id, ( 4 * HOUR_IN_SECONDS ) + rand( 0, 1 * HOUR_IN_SECONDS ) );

		return $course_id;
	}
	/**
	 * Load and Output Data
	 */
	public function output() {

		if ( $this->catalog_base_api_url && $this->catalog_api_key ) {
			$catalog_id        = $this->catalog_current_id( $this->catalog_base_api_url, $this->catalog_api_key );
			$catalog_course_id = $this->catalog_course_id( $this->catalog_base_api_url, $this->catalog_api_key, $this->subject, $this->number, $catalog_id );
		}

		if ( $this->catalog_base_url && $catalog_id && $catalog_course_id ) {
			$catalog_url = esc_url( $this->catalog_base_url . "/preview_course_nopop.php?catoid=$catalog_id&coid=$catalog_course_id" );
		} else {
			$catalog_url = false;
		}

		$hcx_url = esc_url( "https://csprd.ctclink.us/psc/csprd/EMPLOYEE/SA/s/WEBLIB_HCX_CM.H_COURSE_CATALOG.FieldFormula.IScript_Main/subjects/{$this->subject}/" . '?institution=WA080');

		$course_data = $this->dataapi_load_course();

		if ( $course_data ) { //if there is course data, return course information
			$title = "<strong>{$course_data['subject']} {$course_data['number']}:</strong> {$course_data['title']} <span class='badge text-bg-secondary badge-secondary'>" .
				( $course_data['variable'] ? 'variable' : $course_data['credits'] ) . ' <abbr title="'. __( 'credits', 'mayflower-blocks' ) .'">cr</abbr>.</span>';

			$url = $this->link_base_url . str_replace( '&', '', $course_data['subject'] ) .
				( $course_data['common'] ? '%26' : '' ) . '/' .
				$course_data['number'];

			$description = $course_data['description'];

			$catalog_text = 'View ' . $course_data['subject'] . ' '
				. $course_data['number'] . ' in the Academic Catalog';

			$catalog_btn_class = "ms-1 ml-1 mb-1";
			$hcx_btn_class = "ms-1 ml-1 mb-1";

			if ( $this->headingTag !== 'p' ) {
				$catalog_btn_class .= " btn btn-primary btn-sm";
				$hcx_btn_class .= " btn btn-outline-dark btn-sm";
			}

			$catalog_link = $catalog_url ? "<a class='$catalog_btn_class' href='$catalog_url'>$catalog_text</a>" : '';

			$hcx_text = 'Explore ' . $course_data['subject'] . ' courses in ctcLink';

			$hcx_link = $hcx_url ? "<a class='$hcx_btn_class' href='$hcx_url'>$hcx_text</a>" : '';

			return "<$this->headingTag>$title</$this->headingTag><p>$description</p><ul class='list-inline'><li class='list-inline-item'>$catalog_link</li><li class='list-inline-item'>$hcx_link</li></ul><hr>";


		} else {
			return '<!-- Notice: courses are available. -->';
		}
	}
}
