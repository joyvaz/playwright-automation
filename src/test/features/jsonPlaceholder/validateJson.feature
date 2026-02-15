@smoke @jsonPlaceholder
Feature: Validate json placeholder application

    Scenario: Validate JSON response is displayed in output section
        Given User navigates on JSON Placeholder home page
        When user click on Run script button
        Then user validates the JSON response is displayed in output section

    Scenario: Validate API return mocked JSON response
        Given User navigates on JSON Placeholder home page
        Then API return mocked JSON response
        When user click on Run script button
        Then user validates the mocked JSON response is displayed in output section