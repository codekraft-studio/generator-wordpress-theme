<?php

// Load theme admin styles
function theme_admin_styles() {

	wp_register_style( 'admin-style', get_template_directory_uri() . '/assets/dist/css/admin-style.css', array(), null );
	wp_enqueue_style( 'admin-style' );

}

// Load admin scripts
function theme_admin_scripts() {

	if( SCRIPT_DEBUG ) {
		wp_register_script( 'admin-script', get_template_directory_uri() . '/assets/dist/js/<%= projectName %>-admin.js', array('jquery'), null, true );
	} else {
		wp_register_script( 'admin-script', get_template_directory_uri() . '/assets/dist/js/<%= projectName %>-admin.min.js', array('jquery'), null, true );
	}

	wp_enqueue_script( 'jquery' );
  wp_enqueue_script( 'admin-script' );

}

// Load admin theme conditional scripts
function theme_admin_conditional_scripts() { }

// Load admin theme conditional styles
function theme_admin_conditional_styles() { }

// Remove the admin bar
function theme_remove_admin_bar() {
  return false;
}

add_action( 'admin_enqueue_scripts', 'theme_admin_styles' ); // Add Theme admin styles
add_action( 'admin_enqueue_scripts', 'theme_admin_scripts' ); // Add Theme admin scripts
add_action( 'admin_enqueue_scripts', 'theme_admin_conditional_styles' ); // Add Theme Conditionals admin scripts
add_action( 'admin_enqueue_scripts', 'theme_admin_conditional_scripts' ); // Add Theme Conditionals admin scripts
add_filter( 'show_admin_bar', 'theme_remove_admin_bar' ); // Remove Admin bar
