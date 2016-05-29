#!/usr/bin/python
import websocket
import thread
import time
import lock
import json

# in seconds
ALIVE_INTERVAL = 5
SERVER_IP = '185.14.184.35'
# SERVER_IP = '0.0.0.0'
DEVICE_ID = '491d8a72-24ea-11e6-b67b-9e71128cae77'


def on_message(ws, data):
    print data
    message = json.loads(data)
    if message['type'] and message['device_id'] and message['device_id'] == DEVICE_ID:
        if message['type'] == 'lock':
            if lock.lock():
                print 'device is lock'
                ws.send(json.dumps({
                    'type': 'lock',
                    'status': 'success',
                    'device_id': DEVICE_ID
                }))
            else:
                ws.send(json.dumps({
                    'type': 'lock',
                    'status': 'fail',
                    'device_id': DEVICE_ID
                }))
                print 'fail to lock device'
        elif message['type'] == 'unlock':
            if lock.unlock():
                print 'device in unlocked'
                ws.send(json.dumps({
                    'type': 'unlock',
                    'status': 'success',
                    'device_id': DEVICE_ID
                }))
            else:
                ws.send(json.dumps({
                    'type': 'unlock',
                    'status': 'fail',
                    'device_id': DEVICE_ID
                }))
                print 'fail to unlock device'
        else:
            print 'Unknown command ' + message
    else:
        print 'Invalid message' + message


def on_error(ws, error):
    ALIVE = False
    print error


def on_close(ws):
    ALIVE = False
    print "### closed ###"


def on_open(ws):
    ALIVE = True
    ws.send(json.dumps({
        'type': 'auth',
        'device_id': DEVICE_ID
    }))
    def heart_beat(*args):
        alive_message = json.dumps({
            'type': 'alive',
            'device_id': DEVICE_ID
        })
        while ALIVE:
            ws.send(alive_message)
            time.sleep(ALIVE_INTERVAL)
        ws.close()
        print "stopping device..."

    thread.start_new_thread(heart_beat, ())


if __name__ == "__main__":
    ws = websocket.WebSocketApp("ws://" + SERVER_IP + ":8888",
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
