/**
 * 문의 접수 API (/salpyeo/inquiries).
 * 로그인 없이 누구나 보낼 수 있고, 첨부 사진은 접수 요청에 함께 실어 보낸다.
 */
import { browserRequest } from "@/lib/api/browser-client";

/** 서버와 같은 제한 — 넘기면 서버가 거절한다 */
export const INQUIRY_MAX_FILES = 3;
export const INQUIRY_MAX_FILE_SIZE = 5 * 1024 * 1024;
export const INQUIRY_TITLE_MAX = 100;
export const INQUIRY_CONTENT_MAX = 2000;

export interface Inquiry {
  id: number;
  title: string;
  content: string;
  email: string;
  images: string[];
  isResolved: boolean;
  createdAt: string;
}

export function createInquiry(input: {
  title: string;
  content: string;
  email: string;
  files: File[];
}): Promise<Inquiry> {
  const form = new FormData();
  form.append("title", input.title);
  form.append("content", input.content);
  form.append("email", input.email);
  for (const file of input.files) form.append("imageFiles", file);

  return browserRequest<Inquiry>("/salpyeo/inquiries", { method: "POST", body: form });
}

export async function fetchAdminInquiries(): Promise<Inquiry[]> {
  const { inquiries } = await browserRequest<{ inquiries: Inquiry[] }>("/salpyeo/admin/inquiries");
  return inquiries;
}

export function setInquiryResolved(id: number, isResolved: boolean): Promise<Inquiry> {
  return browserRequest<Inquiry>(`/salpyeo/admin/inquiries/${id}/resolved`, {
    method: "PUT",
    body: JSON.stringify({ isResolved }),
  });
}
