@smoke
Feature: Validate Swag Labs login

    Validate user login functionality of Swag Labs application with different credentials.

    Scenario Outline: Verify Swag labs login for <userType>
        Given User is on Swag Labs login page
        When user login to swag labs as "standard_user"
        Then user should see the products dashboard page

        Examples:
            | userType      |
            | standard_user |
            # | standard_user |nn