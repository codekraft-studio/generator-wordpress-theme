<?php get_header(); ?>

<!-- post thumbnail -->
<?php if ( has_post_thumbnail()) : // Check if Thumbnail exists ?>
	<div class="article-image">
		<figure>
			<?php the_post_thumbnail(); // Fullsize image for the single post ?>
		</figure>
	</div>
<?php endif; ?>
<!-- /post thumbnail -->

<main>

	<?php if ( have_posts() ): while (have_posts()) : the_post(); ?>

		<!-- article -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

			<header class="article-header">

				<h2 class="article-date">
					<a href="<?php echo get_day_link( get_the_time('Y'), get_the_time('m'), get_the_time('d') ); ?>">
						<time datetime="<?php the_time('Y-m-d'); ?> <?php the_time('H:i'); ?>">
							<?php the_date(); ?> <?php the_time(); ?>
						</time>
					</a>
				</h2>

				<h1 class="article-title">
					<?php the_title(); ?>
				</h1>

			</header>

			<div class="article-content">
				<?php the_content(); // Dynamic Content ?>
			</div>

			<footer class="article-footer">

				<div class="article-metas">

					<div class="article-categories">
						<?php the_category(', '); // Separated by commas ?>
					</div>

					<?php if( has_tag() ): ?>
						<div class="article-tags">
							<?php the_tags( '', ', ', ''); // Separated by commas ?>
						</div>
					<?php endif; ?>

				</div>

				<div class="article-modify">
					<?php edit_post_link(); // Display the edit link ?>
				</div>

				<div class="article-author">
					<div class="author-image">
						<?php echo get_avatar( get_the_author_meta( 'ID' ) ); ?>
					</div>
					<div class="author-details">
						<div class="author-name">
							<?php _e( 'Published by', 'wordpress-theme-starter' ); ?> <?php the_author_posts_link(); ?>
						</div>
						<div class="author-description">
							<p><?php the_author_meta( 'description' ); ?></p>
						</div>
					</div>
				</div>

			</footer>

			<?php
			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) {
				comments_template();
			} ?>

		</article>
		<!-- /article -->

	<?php endwhile; ?>

	<?php else: ?>

		<?php get_template_part( 'templates/content', 'none' ); ?>

	<?php endif; ?>

</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
