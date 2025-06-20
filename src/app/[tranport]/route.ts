import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "courseRecommended",
      "Give a course recommandation based on experience level",
      {
        experienceLevel: z.enum(["beginner", "intermediate"]),
      },
      ({ experienceLevel }) => ({
        content: [
          {
            type: "text",
            text: `I recommend you take the ${
              experienceLevel === "beginner"
                ? "Professionnal Javascript"
                : "Professional React & Nextjs"
            } course`,
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        courseRecommended: {
          description: "Give a course recommandation based on experience level",
        },
      },
    },
  },
  {
    redisUrl:
      "redis://default:y5eWSARYhqIJh5NbEr0Oj7r2iuMMLNLW9ptY7muY16hQkADbgfWZA8FSnyTmFU1C@ncwwoc04s0ssg8o408gcos0c:6379/0",
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
