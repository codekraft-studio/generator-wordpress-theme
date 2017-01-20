<?php get_header(); ?>

	<main>

		<!-- section -->
		<section>

			<!-- article -->
			<article id="post-404">

				<h2 class="section-title"><?php _e( 'Page not found', 'wordpress-theme-starter' ); ?></h2>

				<h3>
					<a href="<?php echo home_url(); ?>"><?php _e( 'Return home?', 'wordpress-theme-starter' ); ?></a>
				</h3>

			</article>
			<!-- /article -->

		</section>
		<!-- /section -->

	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
