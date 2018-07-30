<?php get_header(); ?>

<main>

	<!-- section -->
	<section>

		<?php if ( have_posts() ): the_post(); ?>

			<h2 class="section-title">
				<?php the_archive_title(); ?>
			</h2>

			<?php if ( get_the_author_meta('description')) : ?>

				<div class="author-details">

					<div class="author-image">
						<?php echo get_avatar(get_the_author_meta('user_email')); ?>
					</div>

					<div class="author-description">
						<?php echo wpautop( get_the_author_meta('description') ); ?>
					</div>

				</div>

			<?php endif; ?>

			<?php rewind_posts(); while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'templates/content', get_post_format() ); ?>

			<?php endwhile; ?>

		<?php else: ?>

			<?php get_template_part( 'templates/content', 'none' ); ?>

		<?php endif; ?>

		<?php get_template_part('pagination'); ?>

	</section>
	<!-- /section -->

</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
