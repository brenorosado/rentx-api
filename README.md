# rentx-api

## How to run
This project is currently running in node v18.12.1

1. First, clone this repo and install the project dependencies by running `yarn` or `npm install`

2. Next, create .env file at the project root with the following info:<br>
    `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"`<br>
    `JWT_SECRET_KEY="randomstring"`

    The DATABASE_URL is the database info that you intend to use.

    If you are not going to use postgresql, it will be necessary to change the configuration at prisma/schema.prisma file. 
    Check supported dbs by prisma at: https://www.prisma.io/docs/reference/database-reference/supported-databases.

3. Then, run `npx prisma migrate dev` to create db structure

4. Finally, run `yarn dev` to run the project :)


API documentation available at http://localhost:8080/api-docs
