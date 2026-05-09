import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPublishedArticles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("articles")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

export const getSiteMetadata = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("metadata")
      .filter((q) => q.eq(q.field("key"), args.key))
      .unique();
  },
});
