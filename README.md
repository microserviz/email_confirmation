# MicroServiz :: EmailConfirmation

A *Koa*-based email confirmation microservice.
Part of gbezyuk's `microserviz` project.

## Use Case

Usually it happens during user registration.
You want to make sure the user does really own the email entered.
So we generate a random token and send it there.
Then when the user presents that token, we consider email ownership proven.

And this REST microservice handles exactly this issue:
* it sets up an in-memory database with a single table, which contains:
    * emails,
    * tokens, and
    * confirmation status flag
* it sends and resends emails,
* and it provides the endpoint for email confirmation

It is supposed to be used by the frontend / universal app in course of registration scenario.
But maybe you'll find some other use case when you want email ownership checked.


## Production Run

Modify `./start.sh`, exporting proper env variables, and run it (or better setup a supervisor).
Alternatively, run `npm run serve` manually.


## Dev Run

`npm run dev` will start a nodemon which will watch source code changes.


## URLs
* `/api/emailConfirmation/register/:email` - registers email for confirmation and sends the letter
* `/api/emailConfirmation/resend/:email` - resends the confirmation letter
* `/api/emailConfirmation/confirm/:email/:token` - attempts actual confirmation
* `/api/emailConfirmation/pending` - list of pending unconfirmed emails
* `/api/emailConfirmation/confirmed` - list of confirmed emails
* `/api/emailConfirmation/isConfirmed/:email` - check if the particular email is confirmed


## Environment Variables

Set these env vars when running the script:
* `PORT` - port to run this service on
* `EMAIL_HOST` - your email server's host
* `EMAIL_PORT` - your email server's post
* `EMAIL_USERNAME` - your email server's username
* `EMAIL_PASSWORD` - your email server's password
* `EMAIL_FROM` - the email you're sending confirmation letters from
* `BASE_URL` - base URL for confirmation links, like `https://your-site.com/`
* `LETTER_CONFIRM_RELATIVE_URL` - relative URL for confirmation links, like `/auth/confirmEmail`
* `CORS_ORIGIN` - see protection/cors below
* `LOG` - see logging below

## Templates
See `./src/confirmationLetters.mjs` and edit whatever you need.


## PROTECTION

### CORS

You may want to set `CORS_ORIGIN` environment variable in order to restrict access to this microservice.


## LOGGING

Set `LOG` environment variable in case you want some logging.
