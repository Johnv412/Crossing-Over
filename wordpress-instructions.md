# Deployment Instructions for "Crossing Over with Dez" WordPress Theme

To use this as a direct upload template:

1. **Zip the Files**: Create a ZIP archive containing all the files in this directory (including `style.css`, `index.php`, `functions.php`, `index.tsx`, etc.).
2. **Upload to WordPress**:
   - Go to your WordPress Dashboard.
   - Navigate to **Appearance > Themes**.
   - Click **Add New** > **Upload Theme**.
   - Choose your ZIP file and click **Install Now**.
3. **Activate**: Once uploaded, click **Activate**.
4. **Environment Variables**: 
   - Note that `process.env.API_KEY` for the Gemini AI needs to be accessible. In a typical WordPress hosting environment, you can define this in your `wp-config.php` file as `define('GEMINI_API_KEY', 'your-key-here');` or use a plugin like "WP Enviroment Variables". 
   - You may need to update `services/geminiService.ts` to fetch the key from a global WordPress variable if you aren't using a build tool that injects env vars.

## Requirements
- WordPress 5.0+
- A modern browser that supports ES Modules and Import Maps (for the React portion).