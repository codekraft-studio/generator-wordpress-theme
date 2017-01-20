<?php

/*------------------------------------*\
  External Modules/Files
\*------------------------------------*/

// Load any external files you have here

/*------------------------------------*\
  Theme Support
\*------------------------------------*/

function theme_features()  {

	// Add theme support for Automatic Feed Links
	add_theme_support( 'automatic-feed-links' );

	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails' );

	// Add theme support for HTML5 Semantic Markup
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );

	// Add theme support for document Title tag
	add_theme_support( 'title-tag' );

	// Add theme support for Custom Logo.
	add_theme_support( 'custom-logo' );

	// Add theme support for custom CSS in the TinyMCE visual editor
	add_editor_style( 'editor-style.css' );

	// Adding post format support
  add_theme_support( 'post-formats', array(
		'image',
		'video',
		'audio'
	));

	// Add theme support for Translation
	load_theme_textdomain( '<%= projectName %>', get_template_directory() . '/language' );

}

/*------------------------------------*\
  Functions
\*------------------------------------*/

// Register Sidebars
function theme_register_sidebar() {

	$args = array(
		'id'            => 'main-sidebar',
		'name'          => __( 'Main Sidebar', '<%= projectName %>' ),
		'description'   => __( 'The main theme sidebar', '<%= projectName %>' ),
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
	);

	register_sidebar( $args );

}

// Print theme navigation
function theme_navigation() {

  wp_nav_menu(
    array(
      'theme_location'  => 'header-menu',
      'menu'            => '',
      'container'       => 'div',
      'container_class' => 'menu-{menu slug}-container',
      'container_id'    => '',
      'menu_class'      => 'menu',
      'menu_id'         => '',
      'echo'            => true,
      'fallback_cb'     => 'wp_page_menu',
      'before'          => '',
      'after'           => '',
      'link_before'     => '',
      'link_after'      => '',
      'items_wrap'      => '<ul>%3$s</ul>',
      'depth'           => 0,
      'walker'          => ''
    )
  );

}

// Print theme pagination
function theme_pagination() {

	the_posts_pagination( array(
		'mid_size' => 2,
	) );

}

// Load theme styles
function theme_additional_styles() {
  // wp_register_style( 'example', get_template_directory_uri() . '/assets/dist/css/example.css', array(), null );
  // wp_enqueue_style( 'example' );
}

// Load theme scripts
function theme_scripts() {

	if( SCRIPT_DEBUG ) {
		wp_register_script( 'user-script', get_template_directory_uri() . '/assets/dist/js/user.js', array('jquery'), null, true );
	} else {
		wp_register_script( 'user-script', get_template_directory_uri() . '/assets/dist/js/user.min.js', array('jquery'), null, true );
	}

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'user-script' );

}

// Load theme admin styles
function theme_admin_styles() {

	wp_register_style( 'admin-style', get_template_directory_uri() . '/assets/dist/css/admin-style.css', array(), null );
	wp_enqueue_style( 'admin-style' );

}

// Load admin scripts
function theme_admin_scripts() {

	if( SCRIPT_DEBUG ) {
		wp_register_script( 'admin-script', get_template_directory_uri() . '/assets/dist/js/admin.js', array('jquery'), null, true );
	} else {
		wp_register_script( 'admin-script', get_template_directory_uri() . '/assets/dist/js/admin.min.js', array('jquery'), null, true );
	}

	wp_enqueue_script( 'jquery' );
  wp_enqueue_script( 'admin-script' );

}

// Load theme conditional scripts
function theme_conditional_scripts() { }

// Load theme conditional styles
function theme_conditional_styles() { }

// Load admin theme conditional scripts
function theme_admin_conditional_scripts() { }

// Load admin theme conditional styles
function theme_admin_conditional_styles() { }

// Remove the admin bar
function theme_remove_admin_bar() {
  return false;
}

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
      'taxonomies'            => array( 'category', 'post_tag' ),
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

// Add Shortcode
function theme_shortcode_example( $atts ) {

	// Attributes
	$atts = shortcode_atts(array(
		'title' => 'Default title',
    'echo' => true
		), $atts, 'theme_title');

  $output = "<h2>{$atts['title']}</h2>";

  return $atts['echo'] ? print($output) : $output;

}

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

// Register Navigation Menus
function theme_navigation_menus() {

	$locations = array(
		'header-menu' => __( 'The main theme menu', '<%= projectName %>' ),
	);

	register_nav_menus( $locations );

}

// Custom View Article link to Post
function theme_custom_post_more($more) {
  global $post;
  return '... <a class="article-more" href="' . get_permalink($post->ID) . '">' . __('View Article', '<%= projectName %>') . '</a>';
}

// Optionally Filter the except length.
function theme_custom_excerpt_length($length) {
	return 55;
}

/*------------------------------------*\
    Hooks
\*------------------------------------*/

// Remove Actions
remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action( 'wp_head', 'rel_canonical' );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );

// Add Actions
add_action( 'init', 'theme_custom_post_types', 0 ); // Add theme custom post types (one as example)
add_action( 'init', 'theme_navigation_menus' ); // Register theme navigation menu(s)
add_action( 'after_setup_theme', 'theme_features' ); // Add Theme features support

add_action( 'wp_enqueue_scripts', 'theme_scripts' ); // Add Theme Scripts
add_action( 'wp_enqueue_scripts', 'theme_additional_styles' ); // Add Theme Stylesheet
add_action( 'wp_enqueue_scripts', 'theme_conditional_scripts' ); // Add Theme Conditionals Scripts
add_action( 'wp_enqueue_scripts', 'theme_conditional_styles' ); // Add Theme Conditionals Scripts

add_action( 'admin_enqueue_scripts', 'theme_admin_styles' ); // Add Theme admin styles
add_action( 'admin_enqueue_scripts', 'theme_admin_scripts' ); // Add Theme admin scripts
add_action( 'admin_enqueue_scripts', 'theme_admin_conditional_styles' ); // Add Theme Conditionals admin scripts
add_action( 'admin_enqueue_scripts', 'theme_admin_conditional_scripts' ); // Add Theme Conditionals admin scripts

add_action( 'pre_get_posts', 'theme_search_filter' ); // In search page add all public custom post types

// Widgets
add_action( 'widgets_init', 'theme_register_sidebar' );

// Add Filters
add_filter( 'show_admin_bar', 'theme_remove_admin_bar' ); // Remove Admin bar
add_filter( 'excerpt_more', 'theme_custom_post_more' ); // Add 'View Article' button
add_filter( 'excerpt_length', 'theme_custom_excerpt_length', 999 );

// Remove Filters
remove_filter( 'the_excerpt', 'wpautop' ); // Remove <p> tags from Excerpt altogether

// Shortcodes
add_shortcode( 'shortcode_example', 'theme_shortcode_example' );
