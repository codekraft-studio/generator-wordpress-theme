<?php

// Load theme admin styles
function theme_admin_styles() {

	wp_register_style( 'admin-style', get_template_directory_uri() . '/assets/dist/css/admin-style.css', array(), null );
	wp_enqueue_style( 'admin-style' );

}

// Load admin scripts
function theme_admin_scripts() {

  $min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';

  // Main script path
  $path = get_template_directory_uri() . "/assets/dist/js/<%= projectName %>-admin{$min}.js";

  // Register and Enqueue
  wp_register_script( '<%= projectName %>-admin', $path, array('jquery'), null, true );
  wp_enqueue_script( '<%= projectName %>-admin' );

}

// Load admin theme conditional scripts
function theme_admin_conditional_scripts() { }

// Load admin theme conditional styles
function theme_admin_conditional_styles() { }

// Remove the admin bar
function theme_remove_admin_bar() {
  return false;
}

add_filter( 'show_admin_bar', 'theme_remove_admin_bar' ); // Remove Admin bar
add_action( 'admin_enqueue_scripts', 'theme_admin_styles' ); // Add Theme admin styles
add_action( 'admin_enqueue_scripts', 'theme_admin_scripts' ); // Add Theme admin scripts
add_action( 'admin_enqueue_scripts', 'theme_admin_conditional_styles' ); // Add Theme Conditionals admin scripts
add_action( 'admin_enqueue_scripts', 'theme_admin_conditional_scripts' ); // Add Theme Conditionals admin scripts
