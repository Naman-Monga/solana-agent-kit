import { Action } from "../../types";
import { z } from "zod";
import { getMarlinAttestation } from "../../tools/marlin";

const getAttestationAction: Action = {
  name: "GET_MARLIN_ATTESTATION",
  similes: [
    "get marlin attestation",
    "fetch marlin attestation",
    "get oyster attestation",
  ],
  description: "Fetches a remote attestation from a Marlin TEE endpoint",
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          message: "Attestation fetched successfully",
          data: "0x1234...abcd", // Example attestation hex
        },
        explanation:
          "Fetches attestation from default endpoint (localhost:1350)",
      },
      {
        input: { endpoint: "http://custom-endpoint:1350" },
        output: {
          status: "success",
          message: "Attestation fetched successfully",
          data: "0x5678...efgh", // Example attestation hex
        },
        explanation: "Fetches attestation from custom endpoint",
      },
    ],
  ],
  schema: z.object({
    endpoint: z
      .string()
      .optional()
      .describe("Optional custom endpoint URL for attestation"),
  }),
  handler: async (_, input) => {
    const attestation = await getMarlinAttestation(input.endpoint);
    return {
      status: "success",
      message: "Attestation fetched successfully",
      data: attestation,
    };
  },
};

export default getAttestationAction;
