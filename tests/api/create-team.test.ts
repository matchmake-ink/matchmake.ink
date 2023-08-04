import { POST } from "@/app/api/team/create/route";
import { vi } from "vitest";

vi.mock("@/lib/server/getUid", () => ({
  getUid: () => Promise.resolve("uid"),
}));

describe("POST /api/create-team", () => {});
