source ../PythonVEnv/bin/activate
cd ../plaeto_project
gunicorn -k eventlet -w 1 socketsapp.wsgi:app --bind 127.0.0.1:5000