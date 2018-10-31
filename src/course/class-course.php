<?php

class Mayflower_Blocks_Course {
	private $link_base_url = 'https://www.bellevuecollege.edu/classes/All/';
	private $api_base_url = 'https://www.bellevuecollege.edu/data/api/v1/course/';
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
	 * Fetch Course JSON data from API
	 */
	private function fetch_json() {
		// Build request URL
		// Example: https://www.bellevuecollege.edu/data/api/v1/course/ACCT/101
		$api_url = $this->api_base_url . urlencode( $this->subject ) . '/'. urlencode( $this->number );
		
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
		if ( isset( $raw->course ) ) {
			// Build model
			$course = $raw->course;

			$this->data = Array(
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
	 * Load and Output Data
	 */
	public function output() {
		$this->load_course();

		$course_data = $this->data;
				
		if ( $course_data ) { //if there is course data, return course information
			$title = $course_data['subject'] . ' '
			. $course_data['number'] . ': ' 
			. $course_data['title'] . ' - ' 
			. ( $course_data['variable'] ? 'variable' : $course_data['credits'] ) . ' credits';

			$url = $this->link_base_url . $course_data['subject'] .
				( $course_data['common'] ? '%26' : '' ) . '/' .
				$course_data['number'];

			$description = $course_data['description'];

			$more = 'View details for ' . $course_data['subject'] . ' '
				. $course_data['number'];

			if ( $this->description ) {
				return "<h3><a href='$url'>$title</a></h3><p>$description</p><p><a href='$url'>$more</a></p>";
			} else {
				return "<h3><a href='$url'>$title</a></h3>";
			}

		} else {
			return '<!-- Notice: courses are available. -->';
		}
	}
}