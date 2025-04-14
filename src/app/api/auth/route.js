import jwt from "jsonwebtoken";

const SECRET_KEY = "asdasdasd"; 

export function authenticateToken(req) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Access denied. Token required." }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded; 
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 403 });
    }
}