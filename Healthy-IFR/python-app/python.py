from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import sys
from PIL import Image
from io import BytesIO
import os
import base64
import torch
from torchvision import transforms
from torchvision import models
import torch.nn as nn

hostName = "0.0.0.0"
serverPort = 8000
global dir_path
global model

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
            self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
            self.wfile.write(bytes("<body>", "utf-8"))
            self.wfile.write(bytes("<p>This is GET</p>", "utf-8"))
            self.wfile.write(bytes("</body></html>", "utf-8"))
            sys.stderr.write("Mirroring: ")
            self.log_message("Mirroring: ")

    def do_POST(self):
        if self.path == '/RecogniseImage':
            content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
            post_data = self.rfile.read(content_length) # <--- Gets the data itself
            sys.stderr.write("vwaEFWEFWFr: ")
            self.log_message("post_data is " + str(post_data[0:100]))
            self.log_message(post_data.decode("utf-8")[0:100])
            post_data = post_data.decode("utf-8")
            self.log_message(dir_path)
 
            
            
            # img_base64 = post_data[0:100].split(",")
            # print(img_base64)


            img_base64 = post_data.split(",")
            img = Image.open(BytesIO(base64.b64decode(img_base64[1])))
            # im = im.save(dir_path + "/TEST.jpg")
            # self.log_message("saved")

            # imPath = dir_path + "/geeks.jpg"
            # # inferrence(model, im)
            threeBest = inferrence(model, img)
            # sys.stderr.write(str(threeBest))
            # self.log_message(str(threeBest))

            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            # self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
            self.wfile.write(bytes(str(threeBest), "utf-8"))
            # self.wfile.write(bytes("<body>", "utf-8"))
            # self.wfile.write(bytes("<p>This is POST.</p>", "utf-8"))
            # self.wfile.write(bytes("</body></html>", "utf-8"))
            # self.wfile.write(bytes("<p>test: %s<p>" % str(threeBest), "utf-8"))



def set_parameter_requires_grad(model, feature_extracting):
    if feature_extracting:
        for param in model.parameters():
            param.requires_grad = False


def inferrence(model, img):
    transform = transforms.Compose([            #[1]
    transforms.Resize(256),                    #[2]
    transforms.CenterCrop(224),                #[3]
    transforms.ToTensor(),                     #[4]
    transforms.Normalize(                      #[5]
    mean=[0.485, 0.456, 0.406],                #[6]
    std=[0.229, 0.224, 0.225]                  #[7]
    )])

    # img = Image.open(img)

    img_t = transform(img)
    batch_t = torch.unsqueeze(img_t, 0)

    # Second, put the network in eval mode
    model.eval()
    
    # Third, carry out model inference
    out = model(batch_t)	
    # alexnet.eval()
    # out = alexnet(batch_t)
    # print(out.shape)

    # with open(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\imagenet_classes.txt") as f:
    #     classes = [line.strip() for line in f.readlines()]
    # classes = ["appel", "banaan", "wortel", "komkommer"]
    classes = []

    for i in range(0, 76):
        classes.append(str(i))

    # _, index = torch.max(out, 1)
    
    # percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    
    # print(classes[index[0]], percentage[index[0]].item())

    # _, indices = torch.sort(out, descending=True)
    # print([(classes[idx], percentage[idx].item()) for idx in indices[0][:5]])


    
    # Forth, print the top 5 classes predicted by the model
    _, indices = torch.sort(out, descending=True)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    # print([(classes[idx], percentage[idx].item()) for idx in indices[0][:3]])


    return [[classes[idx], percentage[idx].item()] for idx in indices[0][:5]]
    # return [[classes[indices[0][0]], percentage[indices[0][0]].item()], [classes[indices[0][1]], percentage[indices[0][1]].item()], [classes[indices[0][2]], percentage[indices[0][2]].item()]]
    # return [[5,5], [3, 3]]


def prepareModel(dir_path):

    nmb_classes = 76
    model = models.resnet50()
    set_parameter_requires_grad(model, True)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, nmb_classes)

    # model = models.resnet50()
    # model.load_state_dict(torch.load(r"C:\Users\woutv\OneDrive\Bureaublad\Thesis\ImageRecognition\model.pth"))
    model.load_state_dict(torch.load(dir_path + "/model.pth"))

    model.eval()
    return model


if __name__ == "__main__":     
    print("here")   
    dir_path = os.path.dirname(os.path.realpath(__file__))
    model = prepareModel(dir_path)
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))
    time.sleep(10)
    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
