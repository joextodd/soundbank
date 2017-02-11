# Heroku Django Project - SoundBank

## Requirements

1. Python3 virtualenv
2. node.js installed

## How to Use

To use this project, follow these steps:

1. Create your working environment (Python3/virtualenv)
2. Install requirements `pip3 install -r requirements.txt` and `npm install`
3. Run migrations `python3 manage.py migrate`
3. Collect static files `python3 manage.py collectstatic`
4. Run local server with `python3 manage.py runserver`

## Compile SASS

	`npm run build`
	or
	`npm run watch`

## Further Reading

- [Gunicorn](https://warehouse.python.org/project/gunicorn/)
- [WhiteNoise](https://warehouse.python.org/project/whitenoise/)
- [dj-database-url](https://warehouse.python.org/project/dj-database-url/)
