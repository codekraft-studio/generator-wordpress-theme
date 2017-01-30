<?php

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

// Widgets
add_action( 'widgets_init', 'theme_register_sidebar' );
