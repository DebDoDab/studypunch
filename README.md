# Studypunch

Studypunch is a project for students to help them solve their deadlines.

## Installation
* Download it
    ```
    git clone https://github.com/DebDoDab/studypunch.git
    ```
* Go into that directory
    ```
    cd studypunch
    ```
* _(Optional)_ write app/studypunch/settings/prod.py
    * copy file from exaple and edit it _(especially SECRET_KEY and ALLOWED_HOSTS)_
        ```
        cp app/studypunch/settings/prod_example.py app/studypunch/settings/prod.py
        vim app/studypunch/settings/prod.py
        ```
* Run docker-container
    * in development 
        ```
        docker-container build
        docker-container run
        ```
    * or in production
        ```
        docker-container -f prod.yml build
        docker-container -f prod.yml run
        ```
* Make migrations
    ```
    docker-compose run python bash
    python3 manage.py makemigrations
    python3 manage.py migrate 
    ```
  
## Plans
* Serve statics
* Put frontend in this docker compose
* Put nginx in this docker compose to serve statics and frontend
* Write unit and integration tests
* Add celery with RabbitMQ
