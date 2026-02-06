const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://my.staging.pajak.io",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: false,
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.family === "chromium") {
          const downloadsDir = path.join(
            config.projectRoot,
            config.downloadsFolder
          );
          launchOptions.preferences = launchOptions.preferences || {};
          launchOptions.preferences.default =
            launchOptions.preferences.default || {};
          launchOptions.preferences.default.download = {
            default_directory: downloadsDir,
            prompt_for_download: false,
            directory_upgrade: true,
          };
          launchOptions.args.push("--disable-features=PasswordLeakDetection");
          launchOptions.args.push("--disable-save-password-bubble");
        }
        return launchOptions;
      });
      on("task", {
        clearDownloads() {
          const dir = path.isAbsolute(config.downloadsFolder)
            ? config.downloadsFolder
            : path.join(config.projectRoot, config.downloadsFolder);
          if (!fs.existsSync(dir)) {
            return null;
          }
          fs.readdirSync(dir).forEach((name) => {
            const filePath = path.join(dir, name);
            if (fs.statSync(filePath).isFile()) {
              fs.unlinkSync(filePath);
            }
          });
          return null;
        },
      });
      return config;
    },
  },
  downloadsFolder: "cypress/downloads",
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
  },
});
