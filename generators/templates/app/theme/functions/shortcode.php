<?php

// Add Shortcode
function theme_shortcode_example( $atts ) {

	// Attributes
	$atts = shortcode_atts(array(
		'title' => 'Default title',
    'echo' => true
		), $atts, 'theme_title');

  $output = "<h2>{$atts['title']}</h2>";

  return $atts['echo'] ? print($output) : $output;

}

// Shortcodes
add_shortcode( 'shortcode_example', 'theme_shortcode_example' );
