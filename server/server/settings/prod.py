from .base import *
import dj_database_url
import os

DEBUG = False

ALLOWED_HOSTS = ['hvac-erecords-server.herokuapp.com']

INSTALLED_APPS += 'whitenoise.runserver_nostatic'

MIDDLEWARE += 'whitenoise.middleware.WhiteNoiseMiddleware'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)