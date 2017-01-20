<?php if( !is_active_sidebar( 'main-sidebar' ) ) {
	return;
} ?>

<!-- sidebar -->
<aside class="sidebar">
	<?php dynamic_sidebar( 'main-sidebar' ); ?>
</aside>
<!-- /sidebar -->
