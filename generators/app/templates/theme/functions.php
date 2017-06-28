<?php

/*------------------------------------*\
  External Modules/Files
\*------------------------------------*/


// Load any external files you have here


/*------------------------------------*\
  Theme Functions
\*------------------------------------*/

require_once( get_template_directory() . '/functions/clean.php' );
require_once( get_template_directory() . '/functions/admin.php' );
require_once( get_template_directory() . '/functions/theme-support.php' );
require_once( get_template_directory() . '/functions/menu.php' );
require_once( get_template_directory() . '/functions/seo.php' );
require_once( get_template_directory() . '/functions/filters.php' );
require_once( get_template_directory() . '/functions/sidebar.php' );
require_once( get_template_directory() . '/functions/shortcode.php' );
require_once( get_template_directory() . '/functions/post-types.php' );
require_once( get_template_directory() . '/functions/taxonomies.php' );
require_once( get_template_directory() . '/functions/enqueue-scripts.php' );

/*------------------------------------*\
  Custom functions
\*------------------------------------*/

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
