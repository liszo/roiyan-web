import "server-only";
import createClient from "openapi-fetch";
import type { Pillar, Service } from "@/lib/api/types";

// Temporary route typing until lib/api/schema.d.ts is generated from the API.
type Paths = {
  "/pillars": {
    get: { responses: { 200: { content: { "application/json": Pillar[] } } } };
  };
  "/services": {
    get: { responses: { 200: { content: { "application/json": Service[] } } } };
  };
};

function apiClient() {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) {
    throw new Error("API_URL is not set (or set USE_MOCK_API=true for sample data).");
  }
  const headers: Record<string, string> = {};
  if (process.env.API_INTERNAL_KEY) {
    headers["x-internal-key"] = process.env.API_INTERNAL_KEY;
  }
  return createClient<Paths>({ baseUrl, headers });
}

const isMockApi = () => process.env.USE_MOCK_API === "true";

export async function getPillars(): Promise<Pillar[]> {
  if (isMockApi()) {
    return (await import("@/lib/api/mock")).mockPillars;
  }
  const { data, error } = await apiClient().GET("/pillars");
  if (error || !data) throw new Error("Could not load pillars from the API.");
  return data;
}

export async function getServices(): Promise<Service[]> {
  if (isMockApi()) {
    return (await import("@/lib/api/mock")).mockServices;
  }
  const { data, error } = await apiClient().GET("/services");
  if (error || !data) throw new Error("Could not load services from the API.");
  return data;
}
