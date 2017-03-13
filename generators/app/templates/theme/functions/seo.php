<?php

function filter_title_length($title) {
  return mb_strimwidth( $title, 0, 66, '...' );
}

function filter_description_length($desc) {
  return mb_strimwidth( $desc, 0, 155, '...' );
}

function filter_theme_plugins() {

  add_filter( 'wpseo_title', 'filter_title_length' );
  add_filter( 'wpseo_metadesc', 'filter_description_length' );

}

add_action( 'init', 'filter_theme_plugins' );
