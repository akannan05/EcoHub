# Data for Compute Analysis Testing

Classification
- CIFAR-10 
- ImageNet-10
- ImageNet-1k

Detection

Segmentation

Instance Segmentation

Keypoint Detection

Depth Estimation

Image Captioning

## Why so many Datasets

Due to the varying input image size that computer vision models are made for, it doesn't make sense to use a standardized dataset to analyze the compute vs. accuracy tradeoff of these models.

Instead, what we will do, is use the dataset that best matches the expected size of the model. For this, we have curated batches that contain a good mix of the classes. For example:
- MobileNetV2 -- expects 224x224 sized images &rarr; we use ImageNet-10, a 10 class subset of the famous ImageNet dataset, which also is in 224x224 size.
- LeNet-5 -- expects 32x32 sized images &rarr; we use CIFAR-10, which is in 32x32 size.
- you see the point...

## What this means for the project

One of the main goals of this project is to help computer vision engineers choose the right model for the job! One aspect of that is knowing what models fit your projects size requirement.

To help with this, along with the efficiency/environmental usage of the docker image/model, EcoHub will also provide a range of input image sizes the model is ideal for:
- Small (< 200x200)
- Medium (200x200 - 600x600)
- Large (> 600x600) 

## Credits

Appropriate credis for datasets used in this project:
