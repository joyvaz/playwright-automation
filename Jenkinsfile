pipeline {
    agent any

    tools {
        nodejs 'nodeJs-25'
    }

    parameters {
        string(
            name: 'CUCUMBER_TAGS',
            defaultValue: '@smoke',
            description: 'Enter Cucumber tags (availabe Tags: @smoke ; @jsonPlaceholder ; @accessibility)'
        )
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh '''
                echo "Running npm install..."
                npm install
                echo "Running npx playwright install..."
                npx playwright install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh """
                echo "******* Running tests with tags: ${CUCUMBER_TAGS} *******"
                echo "Running npm run smoke-test..."
                npm run smoke-test
                """
            }
        }
    }

    post {
        always {
            cucumber buildStatus: 'UNSTABLE',
                    failedFeaturesNumber: 1,
                    failedScenariosNumber: 1,
                    skippedStepsNumber: 1,
                    failedStepsNumber: 1,
                    classifications: [
                            [key: 'Commit', value: '<a href="${GERRIT_CHANGE_URL}">${GERRIT_PATCHSET_REVISION}</a>'],
                            [key: 'Submitter', value: '${GERRIT_PATCHSET_UPLOADER_NAME}']
                    ],
                    reportTitle: 'cucumber-html-reports',
                    fileIncludePattern: '**/test-results/*.json',
                    sortingMethod: 'ALPHABETICAL',
                    trendsLimit: 100
        }
    }
}