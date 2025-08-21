const API_URL = "http://localhost:8080";

export const initialiseWorkflow = async () => {
    const res = await fetch(API_URL + "/initalise");
    if (!res.ok) {
        throw new Error("Failed to initialise workflow");
    }
    return res.json();
};

export const advanceWorkflow = async () => {
    const res = await fetch(API_URL + "/advance");
    if (!res.ok) {
        throw new Error("Failed to advance workflow");
    }
    return res.json();
};