import type { MetadataRoute } from "next";
import { allReports } from "@/lib/reports";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://botlitmus.vercel.app";
  const staticPages = ["", "/scan", "/method", "/pricing", "/about"].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: new Date(),
  }));
  const reports = allReports().map((r) => ({
    url: `${base}/report/${r.slug}`,
    lastModified: new Date(r.scannedAt),
  }));
  return [...staticPages, ...reports];
}
