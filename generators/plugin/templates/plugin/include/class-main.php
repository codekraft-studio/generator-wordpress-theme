<?php

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );

class WordPress_Plugin_Starter {

  private $settings;

  public function __construct() {

    // Plugin uninstall hook
    register_uninstall_hook( WPS_FILE, array(__CLASS__, 'plugin_uninstall') );

    // Plugin activation/deactivation hooks
    register_activation_hook( WPS_FILE, array($this, 'plugin_activate') );
    register_deactivation_hook( WPS_FILE, array($this, 'plugin_deactivate') );

    // Plugin Actions
    add_action( 'plugins_loaded', array($this, 'plugin_init') );
    add_action( 'wp_enqueue_scripts', array($this, 'plugin_enqueue_scripts') );

    // Admin
    add_action( 'admin_enqueue_scripts', array($this, 'plugin_enqueue_admin_scripts') );
    add_action( 'admin_init', array($this, 'plugin_register_settings') );
    add_action( 'admin_menu', array($this, 'plugin_add_settings_pages') );

  }

  /**
   * Plugin uninstall function
   * called when the plugin is uninstalled
   * @method plugin_uninstall
   */
  public static function plugin_uninstall() { }

  /**
  * Plugin activation function
  * called when the plugin is activated
  * @method plugin_activate
  */
  public function plugin_activate() { }

  /**
  * Plugin deactivate function
  * is called during plugin deactivation
  * @method plugin_deactivate
  */
  public function plugin_deactivate() { }

  /**
  * Plugin init function
  * init the polugin textDomain
  * @method plugin_init
  */
  function plugin_init() {
    load_plugin_textDomain( '<%= projectName %>', false, dirname(WPS_DIR_BASENAME) . '/languages' );
  }

  /**
   * Add the plugin menu page(s)
   * @method plugin_add_settings_pages
   */
  function plugin_add_settings_pages() {
    add_menu_page( __('WordPress Plugin Starter', '<%= projectName %>'), __('Plugin Starter', '<%= projectName %>'), 'administrator', '<%= projectName %>-settings', array($this, 'plugin_settings_page'), 'none', null );
  }

  /**
  * Register the main Plugin Settings
  * @method plugin_register_settings
  */
  function plugin_register_settings() {

    register_setting( '<%= projectName %>-settings-group', 'main_options', array($this, 'plugin_sanitize_settings') );

    add_settings_section( 'main', __('Main Settings', '<%= projectName %>'), array( $this, 'main_section_callback' ), '<%= projectName %>-settings' );

    add_settings_field( 'first_option', 'First Option', array( $this, 'first_option_callback' ), '<%= projectName %>-settings', 'main' );

  }

  /**
   * The text to display as description for the main section
   * @method main_section_callback
   */
  function main_section_callback() {
    return _e( 'Start adding from here you plugin settings.', '<%= projectName %>' );
  }

  /**
   * Create the option html input
   * @return html
   */
  function first_option_callback() {
    return printf(
      '<input type="text" id="first_option" name="main_options[first_option]" value="%s" />',
      isset( $this->settings['first_option'] ) ? esc_attr( $this->settings['first_option']) : ''
    );
  }

  /**
   * Sanitize the settings values before saving it
   * @param  mixed $input The settings value
   * @return mixed        The sanitized value
   */
  function plugin_sanitize_settings($input) {
    return $input;
  }

  /**
  * Enqueue the main Plugin admin scripts and styles
  * @method plugin_enqueue_scripts
  */
  function plugin_enqueue_admin_scripts() {
    wp_register_style( '<%= projectName %>_admin_style', WPS_DIR_URL . '/assets/dist/css/admin.css', array(), null );
    wp_register_script( '<%= projectName %>_admin_script', WPS_DIR_URL . '/assets/dist/js/admin.min.js', array(), null, true );
    wp_enqueue_script('jquery');
    wp_enqueue_style('<%= projectName %>_admin_style');
    wp_enqueue_script('<%= projectName %>_admin_script');
  }

  /**
  * Enqueue the main Plugin user scripts and styles
  * @method plugin_enqueue_scripts
  */
  function plugin_enqueue_scripts() {
    wp_register_style( '<%= projectName %>_user_style', WPS_DIR_URL . '/assets/dist/css/user.css', array(), null );
    wp_register_script( '<%= projectName %>_user_script', WPS_DIR_URL . '/assets/dist/js/user.min.js', array(), null, true );
    wp_enqueue_script('jquery');
    wp_enqueue_style('<%= projectName %>_user_style');
    wp_enqueue_script('<%= projectName %>_user_script');
  }

  /**
  * Plugin main settings page
  * @method plugin_settings_page
  */
  function plugin_settings_page() {

    ob_start(); ?>

    <div class="wrap">

      <div class="card">

        <h1><?php _e( 'WordPress Plugin Starter', '<%= projectName %>' ); ?></h1>

        <p><?php _e( 'Start from here to build you awesome plugin, using this basic setup.', '<%= projectName %>' ); ?></p>

      </div>

      <div class="card">

        <?php $this->settings = get_option( 'main_options' ); ?>

        <form method="post" action="options.php">

          <?php settings_fields( '<%= projectName %>-settings-group' ); ?>
          <?php do_settings_sections( '<%= projectName %>-settings' ); ?>

          <?php submit_button(); ?>

        </form>

      </div>

    </div><?php

    return print( ob_get_clean() );

  }

}

new WordPress_Plugin_Starter;