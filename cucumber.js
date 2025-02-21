module.exports = {
    default: {
      requireModule: ["ts-node/register"],
      require: ["steps/**/*.ts", "support/**/*.ts"], // Load steps & hooks
      format: [
        "json:reports/cucumber_report.json", // Cucumber JSON report
        "html:reports/cucumber_report.html", // HTML report
        
      ],
      parallel: 4, // Run 4 scenarios in parallel
    },
  };
  

