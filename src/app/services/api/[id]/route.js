import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const GET = async (request, {params}) => {
    try {
        const filePath = join(process.cwd(), "public", "services.json");
        const fileContents = readFileSync(filePath, "utf8");
        const services = JSON.parse(fileContents);
        const service = services.find(s => s._id === params.id);
        return NextResponse.json({service})
    } catch (error) {
        return NextResponse.json({message : "No Data Found"})
    }
}