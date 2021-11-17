from flask import Blueprint, jsonify, request, flash
from app.models import User
import boto3
from app import S3_BUCKET
import f

photo_routes = Blueprint('photo', __name__)

@photo_routes.route("/upload", methods=['POST'])
def upload():
    file = request.files['file']

    s3_resource = boto3.resource('s3')
    my_bucket = s3_resource.Bucket(S3_BUCKET)
    my_bucket.Object(file.filename).put(Body=file)

    flash('File uploaded successfully')
    return "Uploaded"
