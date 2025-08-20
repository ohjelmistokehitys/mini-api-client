import { type ApiRequest } from 'shared/ApiRequest';
import { useState, type FormEvent } from 'react';

// Default values for fast experimentation
const defaultInputs = {
    url: import.meta.env.VITE_EXAMPLE_ENDPOINT_URL,
    method: "GET",
    headers: "Content-Type: application/json",
    body: undefined
};

// The form requires a callback
type FormProps = {
    done: (request: ApiRequest) => Promise<void>;
}

/**
 * Users of the application can specify the details, including the URL, method, headers and body,
 * with this form component.
 *
 * When the form is submitted, the specified details are passed to the `done` callback.
 */
export default function RequestForm({ done }: FormProps) {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const url = formData.get("url") as string;
        const method = formData.get("method") as string;
        const headers = parseHeaders(formData.get("headers") as string);

        // The body is only included for POST and PUT requests
        const body = ["POST", "PUT"].includes(method) ? formData.get("body") : undefined;
        const request = { url, method, body, headers } as ApiRequest;

        try {
            setLoading(true);
            await done(request);
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit}>
        <p>
            <label>
                URL *
                <input
                    name="url"
                    type="url"
                    placeholder="Enter API URL"
                    defaultValue={defaultInputs.url}
                    required
                />
            </label>
            <label>
                Method *
                <select
                    name="method"
                    defaultValue={defaultInputs.method}
                    required
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </label>
            <label>
                Headers <small>(one <code>key: value</code> pair per line)</small>
                <textarea
                    name="headers"
                    rows={5}
                    defaultValue={defaultInputs.headers}></textarea>
            </label>

            <label>
                Body <small>(for POST/PUT only)</small>
                <textarea
                    name="body"
                    rows={5}
                    defaultValue={defaultInputs.body}></textarea>
            </label>
        </p>
        <p>
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Make request!"}
            </button>
        </p>
    </form>
}



/**
 * Parses the headers from a string input, where each line is expected to be in the format "key: value".
 *
 * @param headerInput The string input containing headers.
 * @returns An object representing the headers as key-value pairs.
 */
function parseHeaders(headerInput: string): Record<string, string> {
    return Object.fromEntries(
        headerInput
            .split('\n')
            .filter(line => line.match(/\s*:\s*/))
            .map(line => {
                return line.split(/\s*:\s*/)
            })
    );
}