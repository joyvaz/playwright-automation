@smoke @accessibility
Feature: Validate Swag Labs Accessibility Compliance

    Ensure the Swag Labs login process and dashboard meet accessibility standards for all user types, including checks for compliance with accessibility guidelines.

    Scenario Outline: Verify Swag labs login for <userType>
        Given User is on Swag Labs login page
        When user login to swag labs as "standard_user"
        Then user should see the products dashboard page
        And user perform the accessibility check
        And user perform the accessibility check wit specific tags

        Examples:
            | userType      |
            | standard_user |