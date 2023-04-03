import os
import nets
import torch
from torchvision import transforms
from PIL import Image
from io import BytesIO

def check_image(img):
    with open('categories_16.txt') as categorylist:
        category_list = categorylist.readlines()
        category_list = [category.rstrip() for category in category_list]

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = nets.resnet34()
    model.to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    transform = transforms.Compose([transforms.Resize((28, 28)),
                                    transforms.Grayscale(),
                                    transforms.ToTensor(),
                                    transforms.Normalize(mean=[0.5], std=[0.5])])

    save_model = torch.load('./models/resnet34_29_256.pth', map_location=device)
    model.load_state_dict(save_model['model_state_dict'])
    optimizer.load_state_dict(save_model['optimizer_state_dict'])
    model.eval()

    image = transform(Image.open(BytesIO(img))).unsqueeze(0).to(device)

    correct_list = set()

    with torch.no_grad():
        outputs = model(image)
        # _, predicted_labels = torch.max(outputs[1], 1)
        # print('Predicted Label:', category_list[predicted_labels.item()])
        # print('Probability:', outputs[1][0] * 100)
        top_k_values, top_k_indices = torch.topk(outputs[1], 3)
        for i in range(top_k_indices.size(1)):
            correct_list.add(category_list[top_k_indices[0][i]])
            # print(f"Rank {i + 1}: Label: {category_list[top_k_indices[0][i]]}, Probability: {top_k_values[0][i] * 100}")
    # print(correct_list)

    return correct_list