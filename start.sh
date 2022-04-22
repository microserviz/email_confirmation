#!/bin/bash

# edit and uncomment if running using supervisor
# cd /your/path/to/microservices/email_confirmation

export PORT=3000
export EMAIL_HOST=smtp.some.email.provider
export EMAIL_PORT=465
export EMAIL_USERNAME=username
export EMAIL_PASSWORD=password
export EMAIL_FROM=noreply@your.domain
export BASE_URL=https://your.domain
export LETTER_CONFIRM_RELATIVE_URL=/auth/registration/confirmEmail
export CORS_ORIGIN=your.domain
export LOG=True

npm run serve