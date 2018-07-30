<!-- article -->
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

  <header class="article-header">

    <h2 class="article-date">
      <a href="<?php echo get_day_link( get_the_time('Y'), get_the_time('m'), get_the_time('d') ); ?>">
        <time datetime="<?php the_time('Y-m-d'); ?> <?php the_time('H:i'); ?>">
          <?php echo get_the_date(); ?>
        </time>
      </a>
    </h2>

    <h2 class="article-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
      <?php the_title(); ?></a>
    </h2>

  </header>

  <?php if ( has_post_thumbnail()) : // Check if thumbnail exists ?>
    <a class="article-image" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
      <figure>
        <?php the_post_thumbnail(); // Declare pixel size you need inside the array ?>
      </figure>
    </a>
  <?php endif; ?>

  <div class="article-content">
    <p><?php the_excerpt(); // Build your custom callback length in functions.php ?></p>
  </div>

</article>
<!-- /article -->
