import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from ts.torch_handler.base_handler import BaseHandler
import cv2
import base64
import numpy as np

class ObjectDetectionHandler(BaseHandler):
    def initialize(self, context):
        model = self._get_object_detection_model(3)
        model.load_state_dict(torch.load('/home/aaron/PushupCounter/PushUpShowDown/server/predictor/model', map_location=torch.device('cpu')))
        model.eval()
        self.model = model

    def _get_object_detection_model(self, num_classes):
        model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
        in_features = model.roi_heads.box_predictor.cls_score.in_features
        model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes) 
        return model

    def preprocess(self, data):
        image_buffer = data[0].get("data")  # Assuming the input data is a list with a single element containing the base64 image
        image_buffer = image_buffer.split(',')[1]
        image = self._base64_to_numpy(image_buffer)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (414, 414))
        image = image / 255.0
        image = torch.from_numpy(image).permute(2, 0, 1).type(torch.float32)
        return image

    def postprocess(self, data):
        predictions = data
        label = predictions[0]['labels'][0].item()
        return {"label": label}

    def _base64_to_numpy(self, base64data):
        image_buffer = base64.b64decode(base64data)
        image = np.frombuffer(image_buffer, dtype=np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        return image
