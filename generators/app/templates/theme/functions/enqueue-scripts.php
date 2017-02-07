<?php

// Load theme styles
function theme_additional_styles() {
  // wp_register_style( 'example', get_template_directory_uri() . '/assets/dist/css/example.css', array(), null );
  // wp_enqueue_style( 'example' );
}

// Load theme scripts
function theme_scripts() {

	if( SCRIPT_DEBUG ) {
		wp_register_script( '<%= projectName %>-user-script', get_template_directory_uri() . '/assets/dist/js/<%= projectName %>-user.js', array('jquery'), null, true );
	} else {
		wp_register_script( '<%= projectName %>-user-script', get_template_directory_uri() . '/assets/dist/js/<%= projectName %>-user.min.js', array('jquery'), null, true );
	}

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( '<%= projectName %>-user-script' );

}

// Load theme conditional scripts
function theme_conditional_scripts() { }

// Load theme conditional styles
function theme_conditional_styles() { }

add_action( 'wp_enqueue_scripts', 'theme_scripts' ); // Add Theme Scripts
add_action( 'wp_enqueue_scripts', 'theme_additional_styles' ); // Add Theme Stylesheet
add_action( 'wp_enqueue_scripts', 'theme_conditional_scripts' ); // Add Theme Conditionals Scripts
add_action( 'wp_enqueue_scripts', 'theme_conditional_styles' ); // Add Theme Conditionals Scripts
