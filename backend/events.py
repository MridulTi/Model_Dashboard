from config import socket

@socket.on("connect")
def handle_connect():
    print("Client Connected!")
    
@socket.on("user_connected")
def handle_user_join(username):
    print("User {username} joined")

@socket.on("status")
def status(mssg="Idle"):
    socket.emit("progress",{"data":mssg})