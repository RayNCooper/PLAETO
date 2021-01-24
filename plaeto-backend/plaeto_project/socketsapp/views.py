import socketio
import os
import logging
import coloredlogs
import json

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


def relay_curve(curve: json, sid):
    """ Relays Curve to all clients (preferably web frontend) that listen for the relay_curve event """
    sio.emit('relay_curve', curve)
    logger.info('Relayed Curve received from ' +
                sid + ' to all listening Clients')


@sio.event
def send_curve(sid, data: json):
    logger.info('Received curve')
    logger.info('JSON: ' + data)
    relay_curve(data, sid)


@sio.event
def connect(sid, environ):
    logger.info('Connected to Client with ID ' + sid)


@sio.event
def disconnect(sid):
    logger.info('Disconnected from Client with ID ' + sid)
