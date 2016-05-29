# import RPi.GPIO as GPIO
# import time
# 
# 
GPIO.setmode(GPIO.BCM)
GPIO.setup(11, GPIO.OUT)
GPIO.setup(9, GPIO.IN)

def lock():
    GPIO.output(11, GPIO.HIGH)
    return True

def unlock():
    GPIO.output(11, GPIO.LOW)
    GPIO.cleanup()
    return True
