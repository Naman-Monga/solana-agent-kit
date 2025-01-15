/**
 * Fetches a remote attestation from a Marlin TEE endpoint
 * @param attestationEndpoint Optional endpoint URL, defaults to localhost:1350
 * @returns The attestation string from the endpoint
 * @throws Error if the attestation request fails
 */
export async function getMarlinAttestation(
  attestationEndpoint: string = "http://127.0.0.1:1350",
): Promise<string> {
  try {
    const response = await fetch(`${attestationEndpoint}/attestation/hex`);

    if (!response.ok) {
      throw new Error(`Failed to fetch attestation: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Failed to fetch Marlin attestation:", error);
    throw error;
  }
}
