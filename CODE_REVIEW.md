# 2 (Code Review)

1. Looks like you are not UNsubscribing from your observable in 'book-search.components.ts'. You can add an ngOnDestroy() at the bottom of your file and use the unsubscribe() function. This will help you prevent memory leaks.

2. I would add a description header to the Book Cards, there are ones for Author/Publisher/Published, but not one for the descriptions of the book itself

3. I see you mock actions in the effects test files but there are no unit tests for all the actions themselves.

4. In reading-list.component.html, line 4, there is no [alt] for the image, it's always nice to have a backup in case plan a doesn't work.

5. I noticed if you toggle the device option in the dev tools, the UI gets pretty squished, which if this is strictly a web application, no worries, but if it's going to be a PWA (Progressive Web App), might want to switch up some of the px for percents or rems, so it handles screen size changes better.

6. In your http requests, I notioced you don't have any versioning in the 'effects' api routes - ".get<ReadingListItem[]>('/api/reading-list')". I would create a "v1" folder in the backend. You can put an updated version of a specific api in a "v2...n" folder, that way if the updated api fails, you have version that works that can be used until the v2...n version is fixed. It also serves as an audit for all your APIs

# 3 (Lighthouse)

Accessibility: 82

Issues
1. Buttons do not have an accessible name
2. Background and foreground colors do not have a sufficient contrast ratio

Recommended manual check
1. The page has a logical tab order
2. Interactive controls are keyboard focusable
3. Interactive elements indicate their purpose and state
4. The user's focus is directed to new content added to the page
5. User focus is not accidentally trapped in a region
6. Custom controls have associated labels
7. Custom controls have ARIA roles
8. Visual order on the page follows DOM order
9. Offscreen content is hidden from assistive technology
10. Headings don't skip levels
11. HTML5 landmark elements are used to improve navigation

# 4 (Fix 1 issue in #2 & ALL in #3)

1. #2 Issue - 1-Unsubscribe()

2. #3 Issues
    1. Added aria-label="search" to the mat-icon-button
    2. Changed the <p> color to an acceptable contrast ratio
    Accessibility: 100
    
    Recommended manual check (just did a few of these, not sure if I was supposed to do them all since they were NOT issues listed from Lighthouse, the issues that were listed, I fixed, and now have a 100 Accessibility)
    4. Added tabindex="0" to the book-item element
    7. Made the reading list panel larger with 'width: 34rem;' and 'mat-drawer { max-width: 90%; }' to the app.component.scss so the    Reading List panel does not exceed the width of the web page


# 5 Run & Fix lint/unit tests/e2e

Lint - All files pass linting.

Unit Tests

