import socketio
import os
import logging
import coloredlogs
import json
import requests

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
    """ Relays Curve to all clients (in this case: web frontend) that listen for the relay_curve event """
    sio.emit('relay_curve', curve)
    """ logger.info('Relayed Curve received from ' +
                sid + ' to all listening Clients') """


@sio.event
def send_curve(sid, data: json):
    """ Callback Event for SOCRAETES' sent curves """
    """ logger.info('Received curve') """
    relay_curve(data, sid)


@sio.event
def persist_curve(sid, data: json, project_id=None):
    """ This event is being called when a frontend wants to persist sent data."""
    if(project_id):
        d = json.loads(data)
        p = {'project_id': project_id}

        logger.warn(json.dumps(d))
        logger.warn(p)

        """ Update existing MongoDB document """
        r = requests.patch('http://localhost:8000/project',
                           data=json.dumps(d), params=p)
    else:
        """ Create new MongoDB document, send back ID of newly created document """
        d = {'traces': [json.loads(data)], 'title': 'title', 'metadata': {
            'country': 'Germany', 'city': 'Essen', 'weather': 'Sunny', 'lux': 550, 'environment': 'Urban'}}

        r = requests.post("http://localhost:8000/project",
                          data=json.dumps(d))
        l = json.loads(r.text)
        if(r.status_code == 200):
            set_persisted_project_id(sid, l['posted_project']['_id'])


def set_persisted_project_id(sid, project_id):
    sio.emit('set_persisted_id', project_id, to=sid)
    logger.warn("emitted!")


@ sio.event
def connect(sid, environ):
    logger.info('Connected to Client with ID ' + sid)


@ sio.event
def disconnect(sid):
    logger.info('Disconnected from Client with ID ' + sid)
