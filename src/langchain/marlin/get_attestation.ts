import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";
import { getMarlinAttestation } from "../../tools/marlin/get_attestation";

export class MarlinGetAttestationTool extends Tool {
  name = "marlin_get_attestation";
  description = "Fetches a remote attestation from a Marlin TEE endpoint";

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const attestation = await getMarlinAttestation(input || undefined);
      return JSON.stringify({
        status: "success",
        message: "Attestation fetched successfully",
        data: attestation,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}
