#!/bin/bash

DATA_DIR="./data/imagenet-10"
CATEGORY="classification"
DEVICE_NAME="rpi-4b"
TDP=5.1
BATCH_SIZE=1
NUM_IMAGES=100

NUM_RUNS=5  # Number of runs per model

# Choose models based on device
if [ "$DEVICE_NAME" == "rpi-4b" ]; then
    MODELS=(
        "squeezenet1_0"
        "shufflenet_v2_x1_0"
        "mobilenet_v2"
        "mobilenet_v3_large"
        "mobilenet_v3_small"
        "resnet18"
        "googlenet"
        "mnasnet1_0"
    )
else
    MODELS=(
        "resnet18"
        "alexnet"
        "vgg16"
        "squeezenet1_0"
        "densenet161"
        "inception_v3"
        "googlenet"
        "shufflenet_v2_x1_0"
        "mobilenet_v2"
        "mobilenet_v3_large"
        "mobilenet_v3_small"
        "resnext50_32x4d"
        "wide_resnet50_2"
        "mnasnet1_0"
        "efficientnet_b0"
    )
fi

for MODEL_NAME in "${MODELS[@]}"
do
    echo "=============================================="
    echo "Running benchmark for model: $MODEL_NAME"
    echo "=============================================="

    for (( run=1; run<=NUM_RUNS; run++ ))
    do
        echo "--- Run #$run ---"
        python benchmark.py \
            --data-dir "$DATA_DIR" \
            --category "$CATEGORY" \
            --device-name "$DEVICE_NAME" \
            --model-name "$MODEL_NAME" \
            --tdp "$TDP" \
            --batch-size "$BATCH_SIZE" \
            --num-images "$NUM_IMAGES"
        echo ""
    done

    echo ""
done

echo "All benchmarks completed!"

