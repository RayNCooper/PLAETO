import socketio
import os
import logging
import coloredlogs

""" Initialize Logger

    Available Logging Levels:
    - debug (higher level needed for display, see 'level' attribute in coloredlogs.install)
    - info
    - warning
    - error
    - critical
"""
logger = logging.getLogger(__name__)

""" Set Logger config such as format or color """
coloredlogs.install(level='INFO', logger=logger,
                    fmt='%(asctime)s %(levelname)s \033[32mSERVER:\x1b[0m %(message)s', datefmt='%H:%M:%S')

sio = socketio.Server(async_mode="eventlet", cors_allowed_origins='*')


@sio.event
def transmit(sid, data):
    logger.info('Transmitted data ' + data + ' to Client with ID ' + sio.id)


@sio.event
def connect(sid, environ):
    logger.critical('Connected to Client with ID ' + sid)


@sio.event
def disconnect(sid):
    logger.info('Server: Disconnected from Client with ID ' + id)
