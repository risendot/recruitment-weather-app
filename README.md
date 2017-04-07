# Recruitment Weather App

This is repository that will hold all of your code that you create during the process of testing you. 

## Rules

* Use proper git flow - preferrably creating your own branch that will Pull Request (PR for short) to master (We'll be commenting on that PR when reviewing your code)
* The app should be possible to run with **only one command** (not counting dependencies installation) on any computer, with clear instructions on what can be accessed, and necessary details for proper usage (We won't be guessing)
* Language / tools that you will use here doesn't matter - we assume that you're willing to learn new things when you get hired.
* The more edge cases you handle - the better, we'll be testing the app not only by the happy path, but we'll also try to break it.
* Design doesn't matter that much - but it should be easily possible to determin what I should do in order to use the app, without us guessing (good UX, not so much UI)
* Code must be only in English, no Polish, no any other language.

# Application Requirements and informations

Application should allow user to find current weather in localization they're actually at / looking for. Application should allow:

* Authorization - there should be possibility to authorize user (registration, logging in) - be it working backend, or just fake frontend authorization (i.e. if password matches string). User shall provide: Username, Password, Email.
* Browse available locations - some popular ones like San francisco, Washington, London, Paris, Warsaw
* Search for given location by user input - be it name of city, country. 
* Save the location to favorite - individual user can add locations to favorite,
* List favorite locations - a button in menu to go to favorite locations
* Main Page - Should show one location selected by user (main location)

## Bonus Points
* Browser should automatically detect location of user [possibly you can replace it with user selected location] (tip: There is one service that everyone uses, that knows everything about us)
* Code is as DRY as possible.
* No mixing html and javascript (i.e. using frontend frameworks is okay, but `element.append("<select>" + value "</select>)"` is not).
* Clear usage of files for splitting components into smaller chunks.
* SASS/Less for styles, and proper usage of it
* BabelJS / Webpack / Gulp / Grunt
* Page's Background can change depending on current weather (grey for dark weather, yellow / white for good weather).
