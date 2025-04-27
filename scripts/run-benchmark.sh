#!/bin/bash

DATA_DIR="./data/imagenet-10"
CATEGORY="classification"
DEVICE_NAME="rpi-4b"
TDP=5.1
BATCH_SIZE=1
NUM_IMAGES=100

MODELS=("squeezenet1_0" "shufflenet_v2_x1_0" "mobilenet_v2" "mobilenet_v3_small", "mobilenet_v3_large", "mnasnet1_0")

NUM_RUNS=5  # <-- NEW: number of runs per model

for MODEL_NAME in "${MODELS[@]}"
do
    echo "=============================================="
    echo "Running benchmark for model: $MODEL_NAME"
    echo "=============================================="

    for (( run=1; run<=NUM_RUNS; run++ ))
    do
        echo "--- Run #$run ---"
        python3 benchmark.py \
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

