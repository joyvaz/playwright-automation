const { format } = require("path");

module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            './src/test/steps/**/*.ts',
            './src/main/**/*.ts',
            './src/main/fixture/*.ts'
        ],
        path: ['./src/test/features/'],
        format: [
            // 'progress-bar',
            // 'line',
            'html:./test-results/cucumber-report.html',
            'json:./test-results/cucumber-report.json'
        ],
        tsNodeOptions: {
            project: './tsconfig.json'
        },
        publishQuiet: true,
        timeout: 100 * 1000 //100 seconds
    }
};
