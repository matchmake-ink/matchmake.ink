import { getUid } from "@/lib/server/getUid";
import { noId } from "@/lib/server/errors";

export async function POST(request: Request) {
  const uid = await getUid(request);

  if (uid === "") {
    return noId;
  }

  return {};
}
