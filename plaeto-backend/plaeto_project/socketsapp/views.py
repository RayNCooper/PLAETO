async_mode = None

import os
import socketio

sio = socketio.Server(async_mode="eventlet", cors_allowed_origins='*')

@sio.event
def transmit(sid, data):
    print('transmitted data: ', data)

@sio.event
def connect(sid, environ):
    print('connect', sid)

@sio.event
def disconnect(sid):
    print('disconnect', sid)
