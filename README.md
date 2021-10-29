# Goal 

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

# Technical Specs

* Backend
  * Node Js (Express)
  * Postgres
  * Redis
* Frontend
  * ejs
  * datatable

# Database Schema

We have only one table as "video". 
Lets start with creating the blank db schema

Column | Type
------------ | -------------
id | int4
title | text
description | text
thumbnail | text
published_at | timestamptz
created_at | timestamptz
updated_at | timestamptz
channel_id | text
video_id | text

* Create the sequence for video table
```
CREATE SEQUENCE video_id_seq INCREMENT 1 START 1;
```

* Create the video table
```
CREATE TABLE "public"."video" ("id" int4 NOT NULL DEFAULT nextval('video_id_seq'::regclass),"title" text NOT NULL,"description" text,"thumbnail" text,"published_at" timestamptz NOT NULL,"created_at" timestamptz NOT NULL DEFAULT now(),"updated_at" timestamptz NOT NULL DEFAULT now(),"channel_id" text NOT NULL,"video_id" text NOT NULL, UNIQUE(video_id));CREATE TABLE "public"."video" ("id" int4 NOT NULL DEFAULT nextval('video_id_seq'::regclass),"title" text NOT NULL,"description" text,"thumbnail" text,"published_at" timestamptz NOT NULL,"created_at" timestamptz NOT NULL DEFAULT now(),"updated_at" timestamptz NOT NULL DEFAULT now(),"channel_id" text NOT NULL,"video_id" text NOT NULL, UNIQUE(video_id));
```

# Start the Application
There are 2 way you can run the application 

### 1> Using node
Please add the below mentioned env. variables
 ```
 {
    "APP_ENV" : "",
    "DB_HOST" : "",
    "DB_NAME" : "",
    "DB_PWD" : "",
    "DB_USER" : "",
    "GOOGLE_API_KEYS" : "key1, key2 ..",
    "YOUTUBE_SEARCH_PARAM" : "", // cricket, football
    "REDIS_HOST" : ""
 }
 ```
You can start the application with below mentioned conmand

```
npm run start
```
 
 ### 2> Using docker
  Build the docker image
  ```
  docker build -t metube:latest .
  ```
  
  Run the docker container 
  > Please add the appropriate env. variables
  ```
  docker run -it -e DB_HOST= -e DB_NAME= -e DB_PWD= -e DB_USER= -e GOOGLE_API_KEYS=key1,key2,key3 -e YOUTUBE_SEARCH_PARAM= -e REDIS_HOST= -p 3000:3000 metube:latest
  ```

#### Wola! your application is running on port 3000

> Dashboard UI : http://localhost:3000/

> Backend API : http://localhost:3000/api/v1/videos?limit=10&page=1&sort=desc&find=

# Demo
![](demo.gif)
