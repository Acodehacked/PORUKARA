import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

export async function POST(req:Request,res:Response) {
    const data = await req.formData();
    var file:File = data.get('file') as File;
    data.forEach((item,index)=>{
        file = item as File;
    })

    console.log(file)
    if(!file){
        return NextResponse.json({
            success:false,
            url:''
        })
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes);
    const filename =  file.name.replaceAll(" ", "_");
    const Datestring = Date.now().toString()+'.webp'
    try {
        const path = join(process.cwd(),'/public/assets/uploads/',Datestring)
        await writeFile(path,buffer);
        console.log(path)
      return NextResponse.json({ Message: "Success", path: '/assets/uploads/'+Datestring});
    } catch (error) {
      console.log("Error occured ", error);
      return NextResponse.json({ Message: "Failed", path: '' });
    }
    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes)

    // const path = join('/uploads/','tmp',file.name)
    // await writeFile(path,buffer);
    
    return NextResponse.json({
        success:true,
        url:path
    })
}