// generateIndex.js
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb+srv://aravpant17:S6Nugrirezpxg5qx@cluster0.ae6fy27.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'benchmarks';
const collectionName = 'model_metrics';

async function processBenchmarks() {
    const benchmarkDir = path.join(__dirname, 'benchmarks');
    const indexFile = path.join(benchmarkDir, 'index.json');
    
    // Read the index file
    const files = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
    
    // Group files by model name
    const modelGroups = {};
    
    // Read and group all benchmark files
    files.forEach(file => {
        const filePath = path.join(benchmarkDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Extract model name from filename (e.g., "alexnet_run1.json" -> "alexnet")
        const modelName = file.split('_run')[0];
        
        if (!modelGroups[modelName]) {
            modelGroups[modelName] = [];
        }
        modelGroups[modelName].push(data);
    });

    // Calculate averages for each model
    const averagedResults = Object.entries(modelGroups).map(([model, runs]) => {
        const avgEfficiency = runs.reduce((acc, run) => {
            return [
                acc[0] + run['efficiency-info'][0],
                acc[1] + run['efficiency-info'][1],
                acc[2] + run['efficiency-info'][2]
            ];
        }, [0, 0, 0]).map(val => val / runs.length);

        const avgEcometrics = runs.reduce((acc, run) => {
            return [
                acc[0] + run.ecometrics[0],
                acc[1] + run.ecometrics[1],
                acc[2] + run.ecometrics[2]
            ];
        }, [0, 0, 0]).map(val => val / runs.length);

        return {
            model,
            device: runs[0].device,
            'model-category': runs[0]['model-category'],
            'dataset-info': runs[0]['dataset-info'],
            'efficiency-info': avgEfficiency,
            ecometrics: avgEcometrics,
            timestamp: new Date().toISOString(),
            runCount: runs.length
        };
    });

    // Connect to MongoDB and insert results
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert each averaged result
        for (const result of averagedResults) {
            await collection.insertOne(result);
            console.log(`Inserted averaged metrics for ${result.model}`);
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}

// Run the script
processBenchmarks().catch(console.error);
