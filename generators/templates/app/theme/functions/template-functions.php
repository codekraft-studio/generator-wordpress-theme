<?php

// Print theme pagination
function theme_pagination() {

	the_posts_pagination( array(
		'mid_size' => 2,
	) );

}
