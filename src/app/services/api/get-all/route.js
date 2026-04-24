import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const GET = async () => {
    try {
        const filePath = join(process.cwd(), "public", "services.json");
        const fileContents = readFileSync(filePath, "utf8");
        const services = JSON.parse(fileContents);
        return NextResponse.json({services})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "No Data Found", error})
    }
}