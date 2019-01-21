<?php

/*------------------------------------*\
  Theme Support
\*------------------------------------*/

function theme_support()  {

	// Add theme support for Automatic Feed Links
	add_theme_support( 'automatic-feed-links' );

	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails' );

	// Add theme support for HTML5 Semantic Markup
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );

	// Add theme support for document Title tag
	add_theme_support( 'title-tag' );

	// Add theme support for Custom Logo
	// @see: https://developer.wordpress.org/themes/functionality/custom-logo/
	add_theme_support( 'custom-logo' );

	// Add theme support for custom CSS in the TinyMCE visual editor
	add_editor_style( 'editor.css' );

	// Adding post format support
  add_theme_support( 'post-formats', array(
		'image',
		'video',
		'audio'
	));

	// Add theme support for Translation
	load_theme_textdomain( '<%= projectName %>', get_template_directory() . '/language' );

}

add_action( 'after_setup_theme', 'theme_support' ); // Add Theme features support
