import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  articles: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    category: v.string(),
    published: v.boolean(),
  }),
  metadata: defineTable({
    key: v.string(),
    value: v.any(),
  }),
});
