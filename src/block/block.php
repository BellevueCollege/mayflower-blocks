<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mayflower_blocks_render_block_child_pages( $attributes, $content ) {
	$attributes['pageID'] = empty($attributes['pageID']) ? get_the_ID() : $attributes['pageID'];
	ob_start(); ?>
	<section class="content-padding nav-page nav-page-list">
		<?php if ( ! empty( $attributes['pageID'] ) ) : 
			$args = array(
				'post_type' => 'page',
				'posts_per_page' => -1,
				'order' => 'ASC',
				'orderby' => 'menu_order title',
				'post_status' => 'publish',
				'post_parent' => $attributes['pageID']
			);
			$loop = new WP_Query( $args );

			while ( $loop->have_posts() ) : $loop->the_post(); ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<h2 <?php post_class() ?>>
						<a href="<?php the_permalink(); ?>"><?php the_title();?></a>
					</h2>

						<div class="media">
							<?php if ( has_post_thumbnail() ) { ?>
								<div class="pull-left wp-caption">
									<a href="<?php the_permalink(); ?>">
										<?php the_post_thumbnail('thumbnail', array('class' => 'media-object')); ?>
									</a>
								</div><!-- wp-caption -->
							<?php } ?>

							<div class="media-body">
								<div class="media-content content-padding">
									<?php the_excerpt(); ?>
									<?php edit_post_link( 'edit', '<small>', '</small>' ); ?>
								</div><!-- media-content -->

								<?php if ( ! is_single( the_post() ) ) { ?>
									<p>
										<!--<a class="btn btn-default btn-sm primary-read-more" href="<?php the_permalink(); ?>">
									Read More <i class="icon-chevron-right"></i>
										</a>-->
									</p>
								<?php } ?>
							</div><!-- media-body -->
						</div><!-- media -->
					</article>
				<?php endwhile;?>
				<?php wp_reset_postdata();
				else: 
					echo '<div class="loading-msg"><img src="/wp-admin/images/loading.gif" alt="Loading Icon" /> Loading preview...</div>';
				endif;
				?>

	</section><!-- content-padding .nav-page -->

	<?php
	return ob_get_clean();
}

register_block_type( 'mayflower-blocks/child-pages', array(
	'attributes'      => array(
		'pageID'    => array(
			'type'    => 'string'
		),
	),
	'render_callback' => 'mayflower_blocks_render_block_child_pages',
) );