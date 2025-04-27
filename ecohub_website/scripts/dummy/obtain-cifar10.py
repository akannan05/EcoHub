from torchvision.datasets import CIFAR10
from torchvision.utils import save_image

import torchvision.transforms as T
import os

out_dir = '../cifar_10_images'
os.makedirs(out_dir, exist_ok=True)

transform = T.Compose([
    T.Resize((224, 244)),
    T.ToTensor()
])

dataset = CIFAR10(root='./data', train=False, download=True, transform=transform)

for i in range(100):
    img, label = dataset[i]
    save_image(img, f"{out_dir}/img_{i}_label{label}.png")

