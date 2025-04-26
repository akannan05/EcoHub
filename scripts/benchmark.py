import time
import torch
import torchvision.models as models
import torchvision.transforms as transforms
import torchvision.datasets as datasets
from PIL import Image
import os
import psutil
import platform
import json
import argparse
import numpy as np
from datetime import datetime
from torch.utils.data import DataLoader

def main():
    parser = argparse.ArgumentParser(description="Benchmark a PyTorch model on a dataset.")
    parser.add_argument('--data-dir', type=str, required=True, help='Path to the dataset directory.')
    parser.add_argument('--category', type=str, required=True, help='Model category (e.g., classification, detection, etc.)')
    parser.add_argument('--device-name', type=str, required=True, help='Name of the device (e.g., rpi-4b)')
    parser.add_argument('--model-name', type=str, required=True, help='Exact torchvision model name (e.g., squeezenet1_0)')
    parser.add_argument('--tdp', type=float, required=True, help='Estimated TDP of the device in Watts')
    parser.add_argument('--batch-size', type=int, default=1, help='Batch size for inference (default=1)')
    parser.add_argument('--num-images', type=int, default=100, help='Number of images to run inference on (default=100)')

    args = parser.parse_args()

    device = torch.device("cpu")

    try:
        model = getattr(models, args.model_name)(pretrained=True).to(device)
    except AttributeError:
        print(f"Error: Model '{args.model_name}' not found in torchvision.models.")
        return

    model.eval()

    transform = transforms.Compose([
        transforms.Resize(224),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    dataset = datasets.ImageFolder(args.data_dir, transform=transform)
    dataloader = DataLoader(dataset, batch_size=args.batch_size, shuffle=False)

    num_classes = len(dataset.classes)
    total_images = len(dataset)

    total_inference_time = 0
    cpu_usages = []
    peak_memory_usage = 0

    start_time = time.time()

    for i, (inputs, labels) in enumerate(dataloader):
        if i * args.batch_size >= args.num_images:
            break

        inputs, labels = inputs.to(device), labels.to(device)

        cpu_before = psutil.cpu_percent(interval=None)
        mem_before = psutil.virtual_memory().used / (1024 * 1024)  # MB

        inference_start_time = time.time()
        with torch.no_grad():
            outputs = model(inputs)
        inference_time = time.time() - inference_start_time
        total_inference_time += inference_time

        cpu_after = psutil.cpu_percent(interval=None)
        mem_after = psutil.virtual_memory().used / (1024 * 1024)

        cpu_usages.append((cpu_before + cpu_after) / 2.0)

        peak_memory_usage = max(peak_memory_usage, mem_after)

    end_benchmark_time = time.time()

    avg_inference_time = total_inference_time / args.num_images
    avg_cpu_usage = np.mean(cpu_usages)

    total_time_hours = (end_benchmark_time - start_time) / 3600.0
    energy_wh = args.tdp * total_time_hours
    energy_kwh = energy_wh / 1000.0

    co2_per_kwh = 0.475  # CO2 emission factor
    co2_emissions = energy_kwh * co2_per_kwh

    tree_days = co2_emissions / 0.0575  # 1 day of 1 tree absorbing CO2

    results = {
        'timestamp': datetime.now().isoformat(),
        'model': args.model_name,
        'device': args.device_name,
        'model-category': args.category,
        'dataset-info': [args.num_images, num_classes],
        'efficiency-info': [avg_inference_time, avg_cpu_usage, peak_memory_usage],
        'ecometrics': [energy_wh, co2_emissions, tree_days]
    }

    os.makedirs('benchmarks', exist_ok=True)

    existing_files = [f for f in os.listdir('benchmarks') if f.startswith(args.model_name)]
    run_number = len(existing_files) + 1

    output_file = os.path.join('benchmarks', f"{args.model_name}_run{run_number}.json")
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=4)

    print(f"Benchmark results saved to {output_file}")

if __name__ == '__main__':
    main()




