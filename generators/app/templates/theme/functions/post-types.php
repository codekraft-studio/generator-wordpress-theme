<?php

// Register Custom Post Type
function theme_custom_post_types() {

  // the post types to add
  $post_types = array(

    'product' => array(
      'label'                 => __( 'Product', '<%= projectName %>' ),
      'description'           => __( 'Product information pages.', '<%= projectName %>' ),
      'labels'                => array(
        'name'                  => _x( 'Products', 'Post Type General Name', '<%= projectName %>' ),
        'singular_name'         => _x( 'Product', 'Post Type Singular Name', '<%= projectName %>' ),
        'menu_name'             => __( 'Products', '<%= projectName %>' ),
        'name_admin_bar'        => __( 'Product', '<%= projectName %>' ),
        'archives'              => __( 'Item Archives', '<%= projectName %>' ),
        'parent_item_colon'     => __( 'Parent Product:', '<%= projectName %>' ),
        'all_items'             => __( 'All Products', '<%= projectName %>' ),
        'add_new_item'          => __( 'Add New Product', '<%= projectName %>' ),
        'add_new'               => __( 'New Product', '<%= projectName %>' ),
        'new_item'              => __( 'New Item', '<%= projectName %>' ),
        'edit_item'             => __( 'Edit Product', '<%= projectName %>' ),
        'update_item'           => __( 'Update Product', '<%= projectName %>' ),
        'view_item'             => __( 'View Product', '<%= projectName %>' ),
        'search_items'          => __( 'Search products', '<%= projectName %>' ),
        'not_found'             => __( 'No products found', '<%= projectName %>' ),
        'not_found_in_trash'    => __( 'No products found in Trash', '<%= projectName %>' ),
        'featured_image'        => __( 'Featured Image', '<%= projectName %>' ),
        'set_featured_image'    => __( 'Set featured image', '<%= projectName %>' ),
        'remove_featured_image' => __( 'Remove featured image', '<%= projectName %>' ),
        'use_featured_image'    => __( 'Use as featured image', '<%= projectName %>' ),
        'insert_into_item'      => __( 'Insert into item', '<%= projectName %>' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', '<%= projectName %>' ),
        'items_list'            => __( 'Items list', '<%= projectName %>' ),
        'items_list_navigation' => __( 'Items list navigation', '<%= projectName %>' ),
        'filter_items_list'     => __( 'Filter items list', '<%= projectName %>' ),
      ),
      'supports'              => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'custom-fields', ),
      'taxonomies'            => array( 'category', 'product_tag' ),
      'hierarchical'          => false,
      'public'                => true,
      'show_ui'               => true,
      'show_in_menu'          => true,
      'menu_position'         => 5,
      'show_in_admin_bar'     => true,
      'show_in_nav_menus'     => true,
      'can_export'            => true,
      'has_archive'           => true,
      'exclude_from_search'   => false,
      'publicly_queryable'    => true,
      'capability_type'       => 'page',
    )

  );

  // register each post type
  foreach ($post_types as $type_name => $type_args) {
    register_post_type( $type_name, $type_args );
  }

}

add_action( 'init', 'theme_custom_post_types', 0 ); // Add theme custom post types (one as example)
