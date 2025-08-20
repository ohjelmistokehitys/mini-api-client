import { type ApiResponse } from 'shared/ApiResponse';

/**
 * This component renders the API response in a user-friendly format.
 */
export default function ResponseView({ response }: { response: ApiResponse | null }) {
    if (!response) {
        return null;
    }

    return <>
        <dl>
            <dt>Status</dt>
            <dd>{response.status} {response.statusText}</dd>
            <dt>Headers</dt>
            <dd>
                <pre>{JSON.stringify(response.headers, null, 2)}</pre>
            </dd>
            <dt>Body</dt>
            <dd>
                <pre>
                    <ResponseBody response={response} />
                </pre>
            </dd>
        </dl>
    </>
}

/**
 * This component renders the body of the API response, and possibly formats
 * it based on the Content-Type header.
 */
function ResponseBody({ response }: { response: ApiResponse }) {
    let text = response.body;
    if (!text) {
        return "[ empty ]";
    }

    if (response.body && response.headers['Content-Type'] === 'application/json') {
        try {
            const json = JSON.parse(response.body);
            text = JSON.stringify(json, null, 2);
        } catch (e) {
            // If parsing fails, keep the original text
            console.warn('Failed to parse response body as JSON:', e);
        }
    }

    return <pre>{text}</pre>;
}
