source ../PythonVEnv/bin/activate
# export DJANGO_SETTINGS_MODULE=plaeto_project.dev_settings
python ../plaeto_project/manage.py makemigrations \
    && python ../plaeto_project/manage.py migrate --run-syncdb