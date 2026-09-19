from pymongo import MongoClient
import certifi
import os

ca = certifi.where()
MONGO_PASS = os.getenv("MONGO_PASS")

client = MongoClient(MONGO_PASS, tlsCAFile=ca, tlsAllowInvalidCertificates=True)
db = client.Intruert
users = db.users
cameras = db.cameras
