<?php

function <%= functionPrefix %>_filter_title_length($title) {
  return mb_strimwidth( $title, 0, 66, '...' );
}

function <%= functionPrefix %>_filter_description_length($desc) {
  return mb_strimwidth( $desc, 0, 155, '...' );
}

function <%= functionPrefix %>_filter_theme_plugins() {

  add_filter( 'wpseo_title', '<%= functionPrefix %>_filter_title_length' );
  add_filter( 'wpseo_metadesc', '<%= functionPrefix %>_filter_description_length' );

}

add_action( 'init', '<%= functionPrefix %>_filter_theme_plugins' );
