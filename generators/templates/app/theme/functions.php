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
require_once( get_template_directory() . '/functions/enqueue-scripts.php' );

// This file hold the functions intended to be used in the frontend template
require_once( get_template_directory() . '/functions/template-functions.php' );

// Remove the comment to enable functionalities
// require_once( get_template_directory() . '/functions/shortcode.php' );
// require_once( get_template_directory() . '/functions/post-types.php' );
// require_once( get_template_directory() . '/functions/taxonomies.php' );

/*------------------------------------*\
  Custom functions
\*------------------------------------*/
