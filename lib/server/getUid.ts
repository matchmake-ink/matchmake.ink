import { getAuth } from "firebase-admin/auth";
import initApp from "@/lib/server/admin";
initApp();

const auth = getAuth();

export async function getUid(request: Request): Promise<string> {
  const body = await request.json();
  let uid = "";

  try {
    const token: string = body.token;

    await auth.verifyIdToken(token).then((decodedToken) => {
      uid = decodedToken.uid;
    });
  } catch (e) {
    console.log("no token");
    return Promise.reject();
  }

  return Promise.resolve(uid);
}
