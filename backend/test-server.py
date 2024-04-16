import requests

print( 
    requests.post(
        "http://localhost:8000/recognise",
        json={"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXZ8eN2k83CKJlZL-jV9fX_1udkxf70MA9aHHmRV8YA&s"}).json()
    )