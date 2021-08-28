# NewMailGenerator
A project aiming to create a new weekly mail generator for helping me as a publicist.

ToDo: A lot of, for example:
- Application itself:
    - GUI:
        - Layout
    - Testing
    - Switching amount of possible registrations to a global variable (controllers/registration.js)
    - Redo SQL-structure
    - Cleaning code

- Mails:
    - Exporting Finnish specialMail (the one uploaded to website)
        - Also the layout
    - Exporting English specialMail (the one uploaded to website)
        - Also the layout
    - Exporting English standardMail
    - Update the date structure

- Bulletins:
    - Ordering bulletins by month --> day (in /bulletins)
    - Implement a better system to check dates
    - Add possibility to change date/signup start/end of a bulletin
    - Categories are not hardcoded (bulletins.js & bulletindata.eta) (create a list of valid categories and check if the item is not included in)
    - Organizing or filtering bulletins for given category
    - Languages (Finnish and English) wouldn't be that hardcoded