import type { LoaderFunction } from "remix";
import fs from "fs";

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params;

  if (!((id?.length ?? 0) > 0)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    return new Response(
      // @ts-expect-error
      fs.createReadStream(`./public/songs/${id}.mp3`),
      {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
        },
      }
    );
  } catch (e) {
    console.error(e);
    throw new Response("Not Found", { status: 404 });
  }
};
