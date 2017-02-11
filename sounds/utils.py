"""
utils.py

Contains utility functions for signing S3 requests,
and removing objects from S3.
"""
from django.conf import settings

import boto3


def s3_sign_request(key, filetype):
    """ Sign request to post file to S3 """
    s3 = boto3.client('s3')

    return s3.generate_presigned_url(
        ClientMethod='put_object',
        Params={
            'Bucket': settings.AWS_S3_BUCKET_NAME,
            'Key': key,
            'ContentType': filetype
        },
        ExpiresIn=300,
        HttpMethod='PUT'
    )

def s3_delete_object(key):
    """ Delete an object from S3 """
    s3 = boto3.client('s3')

    return s3.delete_object(
        Bucket=settings.AWS_S3_BUCKET_NAME,
        Key=key
    )