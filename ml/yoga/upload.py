# load csv to database

import requests

import os
import pandas as pd
import firebase_admin
from pytube import YouTube

RAW_PATH = './data/raw.csv'
OUTPUT_PATH = './data/output.csv'

df = pd.read_csv('./data/raw.csv')

import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

cred = credentials.Certificate('./private.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'carex-b31f9.appspot.com'
})

def DownloadImage(url, name):
  import requests
  r = requests.get(url, allow_redirects=True)
  open(name, 'wb').write(r.content)

def Download(link):
    youtubeObject = YouTube(link)
    youtubeObject = youtubeObject.streams.get_highest_resolution()
    try:
        return youtubeObject.download()
    except:
        return None
    

bucket = storage.bucket()


# check if temp folder exists
if not os.path.exists('./temp'):
    os.makedirs('./temp')
else:
    # remove all files in temp folder
    for file in os.listdir('./temp'):
        os.remove(f'./temp/{file}')

def upload(bucket):
    # loop through each row
  for i in range(len(df)):
    id = df.loc[i, 'id']
    # check if id is nan
    if pd.isnull(id):
      continue
    # get the link
    id = int(id)
    videoUrl = df.loc[i, 'videoUrl']
    print(videoUrl)
    imageUrl = df.loc[i, 'imageUrl']
    # download video
    videoPath = Download(videoUrl)
    DownloadImage(imageUrl, f'./temp/{id}.jpg')

    # move file to temp folder
    os.rename(videoPath, f'./temp/{id}.mp4')
    
    # upload to firebase
    video_blob = bucket.blob(f'videos/{id}.mp4')

    

    video_blob.upload_from_filename(f'./temp/{id}.mp4') 
    # upload video and get public ủl
    videoRef = video_blob.public_url
    # get url
    
    image_blob = bucket.blob(f'images/{id}.jpg')
    image_blob.upload_from_filename(f'./temp/{id}.jpg')
    imageRef = image_blob.public_url
    
    # update the row
    df.loc[i, 'videoUrl'] = f'videos/{id}.mp4'
    df.loc[i, 'imageUrl'] = f'images/{id}.jpg'
    
  # save to output
  df.to_csv(OUTPUT_PATH, index=False)
  
# upload(bucket)
  
  
def csv2json():
  import csv
  import json

  csvFilePath = OUTPUT_PATH
  jsonFilePath = './data/output.json'

  data = {}
  with open(csvFilePath) as csvFile:
      csvReader = csv.DictReader(csvFile)
      for rows in csvReader:
          id = rows['id']
          data[id] = rows

  with open(jsonFilePath, 'w') as jsonFile:
      jsonFile.write(json.dumps(data, indent=4))
  
csv2json()
  
# move file to temp folder