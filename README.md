# React, Flask, TensorFlow

Small client server for image classification (React, Flask, TensorFlow)


## How to run

Define an '.env' file with the environment variables HTTP_PROXY and HTTPS_PROXY 


    docker-compose build --build-arg proxy_username=<proxy-username> --build-arg proxy_password=<proxy-password> --build-arg proxy_host=<proxy-host> --build-arg proxy_port=<proxy-port> 

and then

    docker-compose up
    

Enjoy on: 

    http://localhost:3000/ 
    
