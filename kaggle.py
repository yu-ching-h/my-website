import kagglehub

# Download latest version
path = kagglehub.dataset_download("boltzmannbrain/nab")

print("Path to dataset files:", path)