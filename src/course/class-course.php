<?php


class Mayflower_Blocks_Course {

	function __construct() {
		
	}
}
/*
 * Ajax call to get courses
 * */
function get_course_callback() {
    $subject = $_POST['subject'];
    $json_subjects_url = "http://www.bellevuecollege.edu/classes/All/".$subject."?format=json";
    $json = wp_remote_get($json_subjects_url);

    if(!empty($json) && !empty($json['body']))
    {
        echo $json['body'];
    }
    die();
}

//function for rendering single course shortcode into HTML
function coursedescription_func($atts)
{
      $subject = $atts["subject"];
      $course = $atts["courseid"];// Attribute name should always read in lower case.
    $description = $atts["description"];
    if(!empty($course) && !empty($subject))
    {
        //error_log("course :".$course);
        $course_split = explode(" ",$course);
        $course_letter = $course_split[0];
        $course_id = $course_split[1];
        $subject = trim(html_entity_decode  ($subject));
        $url = "http://www.bellevuecollege.edu/classes/All/".$subject."?format=json";
        $json = wp_remote_get($url);
        if(!empty($json) && !empty($json['body']))
        {
		    $html = decodejsonClassInfo($json['body'],$course_id,$description);
            return $html;
        }
    }
    return null;
}

//process json returned by API call
function decodejsonClassInfo($jsonString,$number = NULL,$description = NULL)
{
    $decodeJson = json_decode($jsonString,true);
    $htmlString = "";
    $courses = $decodeJson["Courses"];
    $htmlString .= "<div class='classDescriptions'>";
    if(count($courses)>0)
    {
        foreach($courses as $sections)
        {
            if($number!=null)
            {
                if($sections["Number"] == $number)
                {
                    $htmlString .= getHtmlForCourse($sections,$description);
                }
            }
            else
            {
                $htmlString .= getHtmlForCourse($sections,$description);
            }
        }
    }
    $htmlString .= "</div>"; //classDescriptions

    return $htmlString;
}

//process individual course for display
function getHtmlForCourse($sections,$description = NULL)
{
    $htmlString = "";
    $htmlString .= "<div class='class-info'>";
    $htmlString .= "<h5 class='class-heading'>";
        $courseUrl = CLASSESURL.$sections["Subject"];
        if($sections["IsCommonCourse"])
        {
            $courseUrl .= "&";
        }
        $courseUrl .= "/".$sections["Number"];

        $htmlString .= "<a href='".$courseUrl."''>";
        $htmlString .= "<span class='course-id'>".$sections["Descriptions"][0]["CourseID"]."</span>";
        $htmlString .= " <span class='course-title'>".$sections["Title"]."</span>";
        $htmlString .= "<span class='course-credits'> &#8226; ";

        if($sections["IsVariableCredits"])
        {
            $htmlString .= "V1-".$sections["Credits"]." <abbr title='variable credit'>Cr.</abbr>";
        }
        else
        {
            $htmlString .= $sections["Credits"]." <abbr title='credit(s)'>Cr.</abbr>";
        }
        $htmlString .= "</span>";
        $htmlString .= "</a>";
        $htmlString .= "</h5>";//classHeading
    if($description=="true" && !empty($sections["Descriptions"]))
    {
        //error_log("Not here");
        $htmlString .= "<p class='class-description'>" . $sections["Descriptions"][0]["Description"] . "</p>";
        $htmlString .= "<p class='class-details-link'>";
        $htmlString .= "<a href='".$courseUrl."'>View details for ".$sections["Descriptions"][0]["CourseID"]."</a>";
        $htmlString .= "</p>";
    }
        $htmlString .= "</div>"; //classInfo
        return $htmlString;
}