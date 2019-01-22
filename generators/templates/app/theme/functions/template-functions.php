<?php

// Print theme pagination
function <%= functionPrefix %>_pagination() {

	the_posts_pagination( array(
		'mid_size' => 2,
	) );

}
