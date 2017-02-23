<?php

// Add all public post types in search page query
function theme_search_filter($query) {

	if ( !is_admin() && $query->is_main_query() && $query->is_search ) {

		$post_types = get_post_types(array(
			'public' => true,
			'exclude_from_search' => false
		), 'objects');

		$search_array = array();

		if( $post_types ) {
			foreach ($post_types as $type) {
				$search_array[] = $type->name;
			}
		}

		$query->set('post_type', $search_array);
	}

}

add_action( 'pre_get_posts', 'theme_search_filter' ); // In search page add all public custom post types
