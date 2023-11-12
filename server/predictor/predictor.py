import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
import cv2
import sys
import numpy as np

def get_object_detection_model(num_classes):

    # load a model pre-trained pre-trained on COCO
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
    
    # get number of input features for the classifier
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    # replace the pre-trained head with a new one
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes) 

    return model

imageBuffer = sys.argv[1]
img = cv2.imdecode(np.frombuffer(imageBuffer, np.uint8), -1)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img = cv2.resize(img, (414, 414))
img = img/255.0
img = torch.from_numpy(img).permute(2, 0, 1).type(torch.float32)

model = get_object_detection_model(3)
model.load_state_dict(torch.load('model', map_location=torch.device('cpu')))
model.eval()

predictions = model([img])

print(predictions)
