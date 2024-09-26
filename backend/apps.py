from flask import Flask,request,make_response,redirect,url_for
from config import app,db,socket
from mridul import mridul
from utils.ApiResponse import ApiResponse
from auth import auth
from priyanka import priyanka
from constants.https_status_codes import *

app.register_blueprint(priyanka)
app.register_blueprint(mridul)
app.register_blueprint(auth)

@app.route("/",methods=['GET'])
def register_login():
    accessToken = request.cookies.get('accessToken')
    registration = 0 if accessToken else 1
    if request.args.get('login'):
        registration = 0
    if request.args.get('register'):
        registration=1
    return ApiResponse("App Working",HTTP_200_OK,registration)

if __name__=="__main__":
    with app.app_context():
        db.create_all()
    # app.run(debug=True)
    socket.run(app,debug=True)