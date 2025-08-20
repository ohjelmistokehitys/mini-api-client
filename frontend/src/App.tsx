import { useState } from "react";
import { type ApiResponse } from "shared/ApiResponse";
import { type ApiRequest } from "shared/ApiRequest";
import ResponseView from "./ResponseView";
import RequestForm from "./RequestForm";

const apiEndpoint = import.meta.env.VITE_FETCH_API_URL;
console.log(import.meta.env)

function App() {
    const [response, setResponse] = useState<ApiResponse | null>(null);

    const makeRequest = async (request: ApiRequest) => {
        console.log("Making request", request);
        setResponse(null);

        try {

            const apiResponse = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request)
            });

            console.log("Received response", apiResponse);
            const result = await apiResponse.json() as ApiResponse;

            if (apiResponse.ok) {
                setResponse(result);
            } else {
                alert("Request failed. See logs for more details.");
            }

        } catch (error) {
            alert("Failed to make the request! See console for details.");
            console.error("Error making request:", error);
        }
    }

    return (
        <main className="container">
            <h1>Mini api client</h1>
            <div className="grid">
                <article>
                    <h2>Request</h2>
                    <RequestForm done={makeRequest} />
                </article>
                <article>
                    <h2>Response</h2>
                    <ResponseView response={response} />
                </article>
            </div>
        </main>
    )
}

export default App;
