// Configuration Constants
const APIKEY = 'hLvQSz1tqj';
const baseURL = 'https://comp2140.uqcloud.net/api/';

// Fetch utility for making API calls
async function fetchAPI(url, options = {}) {
    console.log("inside fetch");
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
    }

    console.log("fetch finshed");
    return await response.json();
}

// Fetch all samples
export async function getSamples() {
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    return await fetchAPI(url);
}

// Fetch a specific sample by ID
export async function getSample(id) {
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    return await fetchAPI(url);
}

// Create a new sample
export async function createNewSample(sampleData) {
    console.log("Inside createNewSample function, sending request...");

    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const { name, instrument, noteSequences } = sampleData;
    const data = {
        'type': instrument,
        'name': name,
        'recording_data': JSON.stringify(noteSequences)
    };

    console.log("finished");

    return await fetchAPI(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// Update a sample by its ID
export async function updateSample(sampleId, updatedSampleData) {
    const url = `${baseURL}sample/${sampleId}/?api_key=${APIKEY}`;
    return await fetchAPI(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSampleData)
    });
}

// Update the shared status of a sample
export async function updateSampleSharedStatus(id, status) {
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const data = { shared: status, api_key: APIKEY };
    return await fetchAPI(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

/*
// Testing functions
async function main() {
    try {
        console.log("Results from Calling getSamples()", all_samples);
        console.log("Result from Calling getSample()", single_sample);
        console.log("Result from Calling CreateSample()", created_sample);
    } catch (error) {
        console.error("Error during testing:", error.message);
    }
}

main();
*/
