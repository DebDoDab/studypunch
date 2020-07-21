# Import all settings from base.py
from .base import *

# Don't leave DEBUG = True in production
DEBUG = False

# Generate your secret key
SECRET_KEY = 'yadayadayada'

# Rewrite ALLOWED_HOSTS to access django from your production server
ALLOWED_HOSTS = ['vadi.tel', 'api.vadi.tel', 'localhost', '0.0.0.0']

# Allow requests from browser from this domains
CORS_ORIGIN_WHITELIST = (
    'http://google.com',
    'http://www.google.com',
    'http://localhost:8000',
    'http://localhost:4200',
    'http://vadi.tel',
    'http://www.vadi.tel',
    'https://google.com',
    'https://www.google.com',
    'https://localhost:8000',
    'https://localhost:4200',
    'https://vadi.tel',
    'https://www.vadi.tel',
)

# Logging to a console
# To see logs run `docker-compose -f prod.yml logs python`
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '[DJANGO] %(levelname)s %(asctime)s %(module)s '
                      '%(name)s.%(funcName)s:%(lineno)s: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'default'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
