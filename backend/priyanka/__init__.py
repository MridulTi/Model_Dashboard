from flask import Blueprint
from utils.ApiResponse import ApiResponse
from constants.https_status_codes import *

priyanka=Blueprint("priyanka",__name__,url_prefix="/api/v1/priyanka")

@priyanka.route("/",methods=['GET'])
def load_html():
    return ApiResponse("Route Working",HTTP_200_OK)