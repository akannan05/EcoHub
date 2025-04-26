# sudo docker run --rm -v $(pwd)/scripts/benchmark-wrappers:/scripts -v $(pwd)/data/imagenet-10:/app/images aiintegrate/mobilenet:arm64 bash -c "pip install psutil && python3 /scripts/mobilenet-arm64.py --cmd "python3 /app/run_mobilenet.py --data /app/images""

import time
import psutil
import subprocess
import platform
import threading
import os

def monitor_usage(interval=0.5, duration=10):
    cpu_data=[]
    mem_data=[]
    proc = psutil.Process()

    def collect():
        for _ in range(int(duration / interval)):
            cpu_data.append(psutil.cpu_percent(interval=interval))
            mem_data.append(proc.memory_info().rss / (1024 ** 2))

    t = threading.Thread(target=collect)
    t.start()
    return cpu_data, mem_data, t

def estimate_environmental_impact(duration_sec):
    # we make an assumption on rpi's power draw during inference:
    avg_power_w = 5.1
    carbon_intensity = 0.4

    energy_joules = avg_power_w * duration_sec
    energy_kwh = energy_joules / 3_600_000
    emissions_kg = energy_kwh * carbon_intensity

    return energy_kwh, emissions_kg

def run_benchmark():
    print(">> Running MobileNetV2 Inference Benchmark for ARM64")
    cpu_log, mem_log, thread = monitor_usage(duration=15)

    start_time = time.time()
    subprocess.run(["python3", "run_mobilenet.py", "--data", "images"])
    total_time = time.time() - start_time

    thread.join()

    avg_cpu = sum(cpu_log) / len(cpu_log) if cpu_log else 0

    peak_mem = max(mem_log) if mem_log else 0

    energy_kwh, emissions = estimate_environmental_impact(total_time)

    # prints

    print("\n=== Benchmark Summary ===")
    print(f"Inference time: {total_time:.2f} seconds")
    print(f"Avg CPU usage: {avg_cpu:.2f}%")
    print(f"Peak Memory Usage: {peak_mem:.2f} MB")
    print(f"Estimated Energy: {energy_kwh:.6f} kWh")
    print(f"Estimated CO2 emissions: {emissions:.6f} kg")

if __name__ == "__main__":
    run_benchmark()
