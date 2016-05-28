import RPi.GPIO as GPIO
import time


GPIO.setmode(GPIO.BCM)

GPIO.setup(11, GPIO.OUT)
GPIO.setup(9, GPIO.IN)

GPIO.output(11, GPIO.LOW)

while True:
	if GPIO.input(9) == True:
		print("BEIBE BEIBE")
		
		GPIO.output(11, GPIO.HIGH)
		time.sleep(5)

		GPIO.cleanup()

		break

