import { Task } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";
import axios from "axios";

const url = "http://backend:80/api/tasks";
// モックサーバー
// const url = "http://host.docker.internal:3658/m1/448579-0-default/api/tasks";

export async function GET() {
  try {
    const res = await axios.get(url);

    if (!res.data || Object.keys(res).length === 0) {
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const result = await request.json();

  const task = result.task as Task;

  try {
    const res = await axios.post(url, {
      title: task.title,
      content: task.content,
      status: task.status,
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const result = await request.json();
  const id = result.id;

  const res = await axios.delete(`${url}/${id}`);
  return NextResponse.json(res.data, { status: 200 });
}
export async function PATCH(request: NextRequest) {
  const result = await request.json();
  const task = result.task as Task;

  const res = await axios.patch(`${url}/${task.id}`, {
    id: task.id,
    title: task.title,
    content: task.content,
    status: task.status,
  });
  return NextResponse.json(res.data, { status: 200 });
}
