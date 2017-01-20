<?php

if (have_posts()):

	while (have_posts()) : the_post();

		get_template_part( 'templates/content', get_post_format() );

	endwhile;

else:

	get_template_part( 'templates/content', 'none' );

endif;
