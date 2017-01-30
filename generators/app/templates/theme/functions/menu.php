<?php

// Register Navigation Menus
function theme_navigation_menus() {

	$locations = array(
		'header-menu' => __( 'The main theme menu', '<%= projectName %>' ),
	);

	register_nav_menus( $locations );

}

add_action( 'init', 'theme_navigation_menus' ); // Register theme navigation menu(s)
