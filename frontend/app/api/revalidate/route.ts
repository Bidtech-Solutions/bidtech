import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Endpoint on-demand revalidation untuk membuang cache ISR ketika artikel di-publish/edit
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATE_SECRET || "bidtech-revalidate-secret";

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
  } else {
    revalidatePath("/blog", "page");
    revalidatePath("/sitemap.xml");
  }

  return NextResponse.json({
    revalidated: true,
    path: path || "/blog",
    timestamp: Date.now(),
  });
}
