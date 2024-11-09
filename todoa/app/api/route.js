import { NextResponse } from "next/server";
import { ConnectDB } from "../lin/config/db";
import TodoModel from "../lin/model/TodoModel";


const LoadDB = async () => {
    await ConnectDB();
}


LoadDB(); 

export async function GET(request) {
    
    const todos = await TodoModel.find({}); // Find all documents
    return NextResponse.json({ todos : todos });

}


export async function POST(request){
    const {title,description}  = await request.json();

    await TodoModel.create({
        title,
        description
    })



    return NextResponse.json({msg: " Todo Created "})
}

export async function DELETE(request){
    // console.log(request)
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    // console.log(mongoId)
    await TodoModel.findByIdAndDelete(mongoId);
    
    return NextResponse.json({mgf:"Todo Deleted"});
}

export async function PUT(request){
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set:{
            isCompleted:true
        }
    });
    return NextResponse.json({ msg: "Todo marked as completed"});
}

