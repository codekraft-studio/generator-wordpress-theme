<?php

// Load theme scripts
function theme_scripts() {

  $min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
  $path = get_template_directory_uri() . "/assets/dist/js/main{$min}.js";

  // Register and Enqueue
  wp_register_script( '<%= projectName %>-main', $path, array('jquery'), null, true );
	wp_enqueue_script( '<%= projectName %>-main' );

}

// Load theme conditional scripts
function theme_conditional_scripts() { }

// Load theme conditional styles
function theme_conditional_styles() { }

add_action( 'wp_enqueue_scripts', 'theme_scripts' ); // Add Theme Scripts
add_action( 'wp_enqueue_scripts', 'theme_conditional_scripts' ); // Add Theme Conditionals Scripts
add_action( 'wp_enqueue_scripts', 'theme_conditional_styles' ); // Add Theme Conditionals Scripts
