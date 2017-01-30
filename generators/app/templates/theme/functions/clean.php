<?php

// Remove Actions
remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action( 'wp_head', 'rel_canonical' );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action( 'wp_head', 'wp_generator' ); // Remove WP version
remove_action( 'wp_head', 'wlwmanifest_link' ); // Remove Windows live writer
remove_action( 'wp_head', 'rsd_link' ); // Remove EditURI link

// Remove Filters
remove_filter( 'the_excerpt', 'wpautop' ); // Remove <p> tags from Excerpt altogether

// Custom View Article link to Post
function theme_custom_post_more($more) {
  global $post;
  return '... <a class="article-more" href="' . get_permalink($post->ID) . '">' . __('View Article', '<%= projectName %>') . '</a>';
}

// Optionally Filter the except length.
function theme_custom_excerpt_length($length) {
	return 55;
}

add_filter( 'excerpt_more', 'theme_custom_post_more' ); // Add 'View Article' button
add_filter( 'excerpt_length', 'theme_custom_excerpt_length', 999 );
