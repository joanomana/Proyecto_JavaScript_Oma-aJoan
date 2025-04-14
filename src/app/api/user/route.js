import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 

const SECRET_KEY = "asdasdasd"; 

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        
        const response = await fetch("https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/users");
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const users = await response.json();

        
        const user = users.find(user => user.email === email);
        if (!user) {
            return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 401 });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), { status: 401 });
        }

        
        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return new Response(JSON.stringify({ success: true, token }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}