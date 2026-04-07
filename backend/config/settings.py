from pathlib import Path
from decouple import config


def env_flag(name: str, default: bool) -> bool: # ищет .env и возвращает значение переменной окружения, преобразованное в булев тип. Если переменная не найдена, используется значение по умолчанию.
    value = str(config(name, default=str(default))).strip().lower()
    return value in {'1', 'true', 't', 'yes', 'y', 'on'}
#strip убирает пробелы в начале и в конце строки, lower приводит строку к нижнему регистру, а затем проверяет, входит ли она в множество значений, которые считаются истинными (например, '1', 'true', 'yes' и т.д.). Если значение переменной окружения соответствует одному из этих значений, функция возвращает True, иначе - False. Это позволяет легко использовать переменные окружения для настройки флагов в приложении.
#очень удобно для быстрой смены конфигурации
BASE_DIR = Path(__file__).resolve().parent.parent # basedir нужен 
SECRET_KEY = config('SECRET_KEY', default='django-insecure-dev-only-change-me')
DEBUG = env_flag('DEBUG', True)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost').split(',')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # libraries 
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders', # нужен для CORS: чтобы браузер разрешал фронтенду с другого домена или порта обращаться к моему
    'django_summernote',  
    #our apps 
    'apps.users',
    'apps.courses',
    'apps.evaluation',
    'apps.hints',
    'apps.progress',

]
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',   # React frontend
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # должен быть первым в списке, чтобы обрабатывать CORS-запросы до других middleware
    #которое добавляет CORS-заголовки в HTTP-ответы Django и позволяет фронтенду с другого домена или порта обращаться к моему API без проблем с CORS. Если бы он был ниже других middleware, то CORS-заголовки могли бы не добавляться к ответам, что вызвало бы ошибки на стороне фронтенда при попытке доступа к API.
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls' # главные url маршруты для проекта 

TEMPLATES = [ # мне не нужно для drf но для кастомной админки может пригодится
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application' # wsgi - это интерфейс между веб-сервером и моим приложением. Он позволяет серверу обрабатывать запросы и передавать их в мое приложение, а затем возвращать ответы обратно клиенту. Это важно для развертывания моего приложения на продакшн-сервере, так как большинство серверов поддерживают WSGI для взаимодействия с Python-приложениями.
# а так это точка входа для моего приложения, которая позволяет серверу запускать мое приложение и обрабатывать запросы. Когда сервер получает HTTP-запрос, он передает его в WSGI-приложение, которое затем обрабатывает запрос и возвращает HTTP-ответ обратно серверу, который отправляет его клиенту. Это обеспечивает взаимодействие между сервером и моим приложением, позволяя ему работать в продакшн-среде.
DATABASES = { 
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / config('SQLITE_NAME', default='db.sqlite3'),
    }
}

AUTH_PASSWORD_VALIDATORS = [ # это список валидаторов паролей, которые Django использует для проверки надежности паролей при их установке или изменении. Каждый валидатор проверяет определенные аспекты пароля, такие как его длина, сложность и уникальность. Например, UserAttributeSimilarityValidator проверяет, что пароль не слишком похож на другие атрибуты пользователя (например, имя или email), MinimumLengthValidator требует, чтобы пароль был не короче определенного количества символов, CommonPasswordValidator проверяет, что пароль не является распространенным или легко угадываемым, а NumericPasswordValidator запрещает использование паролей, состоящих только из цифр. Эти валидаторы помогают обеспечить безопасность учетных записей пользователей, требуя от них создавать более надежные пароли.
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

##
REST_FRAMEWORK = { # это словарь настроек для Django REST Framework, который определяет, как мое API будет обрабатывать аутентификацию и разрешения. В данном случае, я использую JWT-аутентификацию (JSON Web Tokens) для обеспечения безопасности моего API, что позволяет клиентам получать токены доступа после успешной аутентификации и использовать их для доступа к защищенным ресурсам. Кроме того, я устанавливаю разрешение по умолчанию на IsAuthenticated, что означает, что только аутентифицированные пользователи смогут получать доступ к моему API. Это помогает защитить мои данные и ресурсы от несанкционированного доступа.
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}


MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
