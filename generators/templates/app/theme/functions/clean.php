<?php

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'rel_canonical' );
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action('wp_head', 'wp_generator'); // Remove WP version
remove_action('wp_head', 'wlwmanifest_link'); // Remove Windows live writer
remove_action('wp_head', 'rsd_link'); // Remove EditURI link

// Remove Filters
remove_filter('the_excerpt', 'wpautop'); // Remove <p> tags from Excerpt altogether

// Custom View Article link to Post
function theme_custom_post_more($more) {
  global $post;
  return '... <a class="article-more" href="' . get_permalink($post->ID) . '">' . __('Read More', '<%= projectName %>') . '</a>';
}

// Optionally Filter the except length.
function theme_custom_excerpt_length($length) {
	return 55;
}

// Removes the type attribute from style and scripts
// to avoid HTML linting errors applied by new WEC rules
function theme_remove_type_attr($tag, $handle) {
  return preg_replace( "/type=['\"]text\/(javascript|css)['\"]/", '', $tag );
}

add_filter('excerpt_more', 'theme_custom_post_more');
add_filter('excerpt_length', 'theme_custom_excerpt_length', 999 );
add_filter('style_loader_tag', 'theme_remove_type_attr', 10, 2);
add_filter('script_loader_tag', 'theme_remove_type_attr', 10, 2);
