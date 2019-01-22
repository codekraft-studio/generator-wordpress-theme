<?php

// Register Custom Taxonomy
function <%= functionPrefix %>_add_product_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Product Tags', 'Taxonomy General Name', '<%= projectName %>' ),
		'singular_name'              => _x( 'Product Tag', 'Taxonomy Singular Name', '<%= projectName %>' ),
		'menu_name'                  => __( 'Product Tag', '<%= projectName %>' ),
		'all_items'                  => __( 'All Tags', '<%= projectName %>' ),
		'parent_item'                => __( 'Parent Tag', '<%= projectName %>' ),
		'parent_item_colon'          => __( 'Parent Tag:', '<%= projectName %>' ),
		'new_item_name'              => __( 'New Tag Name', '<%= projectName %>' ),
		'add_new_item'               => __( 'Add New Tag', '<%= projectName %>' ),
		'edit_item'                  => __( 'Edit Tag', '<%= projectName %>' ),
		'update_item'                => __( 'Update Tag', '<%= projectName %>' ),
		'view_item'                  => __( 'View Tag', '<%= projectName %>' ),
		'separate_items_with_commas' => __( 'Separate items with commas', '<%= projectName %>' ),
		'add_or_remove_items'        => __( 'Add or remove items', '<%= projectName %>' ),
		'choose_from_most_used'      => __( 'Choose from the most used', '<%= projectName %>' ),
		'popular_items'              => __( 'Popular Tags', '<%= projectName %>' ),
		'search_items'               => __( 'Search Tags', '<%= projectName %>' ),
		'not_found'                  => __( 'Not Found', '<%= projectName %>' ),
		'no_terms'                   => __( 'No items', '<%= projectName %>' ),
		'items_list'                 => __( 'Tags list', '<%= projectName %>' ),
		'items_list_navigation'      => __( 'Tags list navigation', '<%= projectName %>' ),
	);

	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => false,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
	);

	register_taxonomy( 'product_tag', array( 'product' ), $args );

}

add_action( 'init', '<%= functionPrefix %>_add_product_taxonomy', 0 );
