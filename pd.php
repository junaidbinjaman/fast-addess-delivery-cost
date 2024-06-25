<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://junaidbinjaman.com
 * @since             1.0.0
 * @package           Pd
 *
 * @wordpress-plugin
 * Plugin Name:       Pull Up Deliveries Custom Plugin
 * Plugin URI:        https://https://pullupdeliveries.net/plugin
 * Description:       This is a custom plugin developed explicitly for pull up deliveries.
 * Version:           1.0.0
 * Author:            Junaid Bin Jaman
 * Author URI:        https://junaidbinjaman.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       pd
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PD_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-pd-activator.php
 */
function activate_pd() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-pd-activator.php';
	Pd_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-pd-deactivator.php
 */
function deactivate_pd() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-pd-deactivator.php';
	Pd_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_pd' );
register_deactivation_hook( __FILE__, 'deactivate_pd' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-pd.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_pd() {
	$plugin = new Pd();
	$plugin->run();
}
run_pd();

//phpcs:disabled

function foobar() {
	echo '<button class="pd-auto-location-detector">Auto Detect Location</button>';
	echo '<button class="pd-manual-location-detector">Type Out Location</button>';

	echo '<div class="pd-manual-location-detector-wrapper">';
	echo '<label>Type the delivery address</label> <br />';
	echo '<input placeholder="Type your address" id="pac-input"  /> <br />';
	echo '<small>Please Note: This input box is powered by google map. So your delivery address must be listing on google</small>';
	echo '</div>';

	echo '<div id="map" style="height: 500px; width: 100%;"></div>';
}

add_action( 'woocommerce_before_checkout_billing_form', 'foobar' );
