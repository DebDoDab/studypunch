# Import all settings from base.py
from .base import *

# Don't leave DEBUG = True in production
DEBUG = False

# Generate your secret key
SECRET_KEY = 'yadayadayada'

# Rewrite ALLOWED_HOSTS to access django from your production server
ALLOWED_HOSTS = ['vadi.tel', 'api.vadi.tel', 'localhost', '0.0.0.0']

