<?php

class Mayflower_Blocks_Course {
	private $base_url = 'http://www.bellevuecollege.edu/classes/All/';
	private $subject;
	private $number;
	private $description;
	private $data;

	function __construct( $subject, $number, $description ) {
		$this->subject = $subject;
		$this->number = $number;
		$this->description = $description;
	}

	/**
	 * Fetch JSON data from API
	 */
	private function fetch_json() {

		// Build request URL
		$api_url = $this->base_url . $this->subject . '/' . $this->number . "?format=json";

		// Get raw data from API
		$raw_data = wp_remote_get( $api_url );

		// Return JSON if successful, otherwise return false
		return is_array( $raw_data ) ? json_decode( $raw_data['body'] ) : false;
	}

	/**
	 * Load Course Information and Save to $data
	 */
	private function load_course() {

		// Fetch JSON
		$raw = $this->fetch_json();

		// Make sure that data has been returned
		if ( $raw && isset( $raw->Courses[0] ) ) {

			$course = $raw->Courses[0];

			// Verify course number (API will return random course at times)
			if ( $course->Number === $this->number ) {

				// Build model
				$this->data = Array(
					'title' => $course->Title,
					'subject' => $course->Subject,
					'number' => $course->Number,
					'credits' => $course->Credits,
					'variable' => $course->IsVariableCredits,
					'common' => $course->IsCommonCourse,
					'description' => $course->Descriptions[0]->Description,
				);
			}
		}
	}

	/**
	 * Load and Output Data
	 */
	public function output() {
		$this->load_course();
		$course_data = $this->data;

		if ( $course_data ) {

			$title = $course_data['subject'] . 
				( $course_data['common'] ? '&amp;' : '' ) . ' '
				. $course_data['number'] . ': ' 
				. $course_data['title'] . ' - ' 
				. ( $course_data['variable'] ? 'variable' : $course_data['credits'] ) . ' credits';

			$url = $this->base_url . $course_data['subject'] .
				( $course_data['common'] ? '%26' : '' ) . '/' .
				$course_data['number'];

			$description = $course_data['description'];

			$more = 'View details for ' . $course_data['subject'] . 
				( $course_data['common'] ? '&amp;' : '' ) . ' '
				. $course_data['number'];

			if ( $this->description ) {
				return "<h3><a href='$url'>$title</a></h3><p>$description</p><p><a href='$url'>$more</a></p>";
			} else {
				return "<h3><a href='$url'>$title</a></h3>";
			}

			
		} else {
			return '<p class="editor-only">Please select a valid course</p>';
		}

	}
}