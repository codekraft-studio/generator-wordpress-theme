<?php

// Print theme navigation
function <%= functionPrefix %>_navigation() {

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

// Register Navigation Menus
function <%= functionPrefix %>_navigation_menus() {

	$locations = array(
		'header-menu' => __( 'The main theme menu', '<%= projectName %>' ),
	);

	register_nav_menus( $locations );

}

add_action( 'init', 'theme_navigation_menus' ); // Register theme navigation menu(s)
