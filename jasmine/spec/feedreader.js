/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        // checks whether all feeds are defined and are not empty
        it('are defined and are not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         // checks whether the URL is defined and is not empty
         it('have URL defined and the URL is not empty', function() {
            allFeeds.forEach(function(feedItem) {
              expect(feedItem.url).toBeDefined();
              expect(feedItem.url.length).not.toBe(0);
            });
         });

        /*  Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         // checks whether the name is defined and is not empty
          it('have name defined and the name is not empty', function() {
            allFeeds.forEach(function(feedItem) {
              expect(feedItem.name).toBeDefined();
              expect(feedItem.name.length).not.toBe(0);
            });
          });
    });


    /*  Write a new test suite named "The menu" */
    describe('The menu', function() {
        /*  Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         // checks whether the menu is hidden or showing
         it('is hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });

         /*  Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          // checks whether it does the menu display when clicked and hides itself when clicked again.
          it('toggles its visibility on clicking', function() {
            // this action displays the menu
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            // this action hides the menu again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
          });
     });

    /*  Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /*  Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         // to wait for asynchronous calls to finish
         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         // checks whether it has atleast one feed entry addee
         it('has atleast one feed entry added', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });
    /*  Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /*  Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         var previousFeed;
         var newFeed;
         var initialStorageValue = 0;
         var newStorageValue = 1;

         // to wait for asynchronous calls to finish
         beforeEach(function(done) {
            loadFeed(initialStorageValue, function() {
              previousFeed = $('.feed').html();
              loadFeed(newStorageValue, function() {
                done();
              });
            });
         });

         //checks whether it has changed from its previous feed
         it('has changed from its previous feed', function() {
           expect(previousFeed).toBeDefined();
           newFeed = $('.feed').html();
           expect(newFeed).toBeDefined();
           expect(newFeed).not.toBe(previousFeed);
         });
    });
}());
