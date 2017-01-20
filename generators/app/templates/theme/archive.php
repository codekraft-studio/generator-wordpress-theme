<?php get_header(); ?>

	<main>

		<!-- section -->
		<section>

			<h2 class="section-title">
				<?php the_archive_title(); ?>
			</h2>

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->

	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
