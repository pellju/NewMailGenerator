# NewMailGenerator

A project aiming to create a new weekly mail generator for helping me as a publicist.


## About the project:

I wanted to create a simple generator for weekly mails which I'll send weekly for the members of our guild.
The result is this project, written in Javascript (Deno) + PostgreSQL. These were chosen because they're used
in [the current Web Software Development -course](https://wsd.cs.aalto.fi/) setup, so perhaps making improvements won't
be that hard for future publicists.

There can be one user account (this can be changed in controllers/registration.js), who has access to weekly mails and bulletins.

This was my first *even somewhat real* web-related project, so code isn't beautiful. But hey, it works.

### Few things:

#### Bulletins:

Bulletins include their Finnish and English name (subject), date and description in Finnish and English. 
They can also include the day signup starts and ends.
If the bulletin is only Finnish or English, just write "-" to the textarea. The bulletin won't be added to the
weekly mail with the given language.

#### Mails:

The date for mail is the date mail will be sent. After creation, a Finnish and an English version will be created.
One can add bulletins to mail by adding them by ID which is shown in the bulletin info (or at /bulletins).


## Installation:

0.) Get a PostgreSQL database with user details.

1.) Install deno. If using Windows, WSL is recommended. *Type the following command to install deno (in Bash):*

    curl -fsSL https://deno.land/x/install/install.sh | sudo DENO_INSTALL=/usr/local sh

2.) Clone the project into the wanted directory.

3.) Edit the database credentials found in **database/communication.js**.

4.) Open a terminal session and go to the directory of the project. Launch the application with following command:

    deno run --allow-net --allow-read --unstable.js app.js

5.) The application can found at http://<your-ip>:7777


## Usage:

- Registration can be found at http://<your-ip>:7777/register
- Weekly mails can be found at http://<your-ip>:7777/dashboard
- Bulletins can be found at http://<your-ip>:7777/bulletins

    

### ToDo: Still a lot, for example:

- Application itself:
    - GUI:
        - Layout
    - Testing
    - Cleaning and imporving the code

- Mails:
    - Improve functions used for mail exportation
    - Create links for subjects found in the version which will be uploaded to web site

- Bulletins:
    - Ordering bulletins by month --> day (in /bulletins)
    - Add possibility to change date/signup start/end of a bulletin
    - Categories are not hardcoded (bulletins.js & bulletindata.eta) (create a list of valid categories and check if the item is not included in)
    - Organizing or filtering bulletins for given category
    - Languages (Finnish and English) wouldn't be that hardcoded