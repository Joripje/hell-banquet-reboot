import os
import nets
import torch
from torchvision import transforms
from PIL import Image

with open('categories_21.txt') as categorylist:
    category_list = categorylist.readlines()
    category_list = [category.rstrip() for category in category_list]

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = nets.resnet34()
model.to("cuda")
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

transform = transforms.Compose([transforms.ToTensor(),
                                transforms.Grayscale(num_output_channels=1),
                                transforms.Resize((28, 28)),
                                transforms.Normalize(mean=[0.5], std=[0.5])])

save_model = torch.load('./models/resnet34_30.pth', map_location=device)
model.load_state_dict(save_model['model_state_dict'])
optimizer.load_state_dict(save_model['optimizer_state_dict'])
model.eval()
print(model.state_dict())

# img = 'flower.png'
# image = transform(Image.open(img)).unsqueeze(0).to(device)
# with torch.no_grad():
#     outputs = model(image)
#     print(outputs)
#     _, predicted_labels = torch.max(outputs[1], 1)
#     print('Predicted Label:', category_list[predicted_labels.item()])