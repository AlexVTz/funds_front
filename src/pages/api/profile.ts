import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await fetch("http://13.52.251.75:4000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch user data" });
    }

    const userData = await response.json();
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
