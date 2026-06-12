import { stuff } from "@/stuff";

// PDF upload/remove. These go through a plain fetch rather than `my_fetch`
// because the body is binary and the routes are not in the generated typed
// client until `just gen-types` is re-run against a live server.

const MAX_PDF_BYTES = 5 * 1024 * 1024;

const base = () => import.meta.env.VITE_API_URL as string;

const auth_header = (): Record<string, string> => {
  const access_token = stuff.get_bearers()?.access_token;
  if (!access_token) throw new Error("login is required");
  return { authorization: `Bearer ${access_token}` };
};

export const upload_pdf_query = async (mdcv_id: number, file: File) => {
  if (file.size > MAX_PDF_BYTES) {
    throw new Error("PDF too large (max 5MB)");
  }
  // header values must be ascii; the server re-sanitizes the name anyway
  const safe_name = file.name.replace(/[^\x20-\x7E]/g, "_");
  const res = await fetch(`${base()}/v1/mdcv/${mdcv_id}/pdf`, {
    method: "PUT",
    headers: {
      ...auth_header(),
      "content-type": "application/pdf",
      "x-filename": safe_name,
    },
    body: file,
  });
  if (!res.ok) {
    throw new Error((await res.text()) || `upload failed (${res.status})`);
  }
};

export const remove_pdf_query = async (mdcv_id: number) => {
  const res = await fetch(`${base()}/v1/mdcv/${mdcv_id}/pdf`, {
    method: "DELETE",
    headers: auth_header(),
  });
  if (!res.ok) {
    throw new Error((await res.text()) || `remove failed (${res.status})`);
  }
};
