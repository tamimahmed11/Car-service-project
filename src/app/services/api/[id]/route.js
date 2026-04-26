import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const GET = async (request, {params}) => {
    try {
        const filePath = join(process.cwd(), "public", "services.json");
        const fileContents = readFileSync(filePath, "utf8");
        const services = JSON.parse(fileContents);
        const service = services.find(s => s._id === params.id);
        
        if (!service) {
            return NextResponse.json({service: null, message: "Service not found"}, {status: 404})
        }
        
        return NextResponse.json({service})
    } catch (error) {
        return NextResponse.json({service: null, message : "No Data Found", error: error.message}, {status: 500})
    }
}