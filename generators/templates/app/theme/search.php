<?php get_header(); ?>

<!-- main -->
<main>

	<h2 class="section-title">
		<?php echo sprintf( __( '%s Search Results for ', '<%= projectName %>' ), $wp_query->found_posts ); echo get_search_query(); ?>
	</h2>

	<?php get_template_part('loop'); ?>

	<?php get_template_part('pagination'); ?>

</main>
<!-- /main -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
