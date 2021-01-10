from socketsapp.views import sio
import socketio

app = socketio.WSGIApp(sio)