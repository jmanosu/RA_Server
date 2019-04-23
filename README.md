# RA_Server

Hand Image Segmentation Neural Network and Mobile appplication for individuals with RA.

## Tools Used

* [NodeJS](https://nodejs.org/en/about/) - Server framework used
* [MongoDB](https://www.mongodb.com/) - No SQL database

## Installation Guide

run installScript in bash on Debian, Ubuntu, Linux Mint to install dependencies for server. To run server run *node server.js*.

## Connection Tool

To send files from Database to Docker image run

python conn.py localhost 8485 \[SENDING IMAGE\] \[STORING LOCATION\]

example:

python conn.py localhost 8485 testPhoto.jpg file_recieved.jpg
