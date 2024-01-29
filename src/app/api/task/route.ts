import { Task } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";

export async function GET() {
  try {
    const res = await fetch(`http://backend:80/api/tasks`).then((res) =>
      res.json()
    );
    if (!res || Object.keys(res).length === 0) {
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const result = await request.json();

  const task = result.task as Task;

  const res = await fetch(`http://backend:80/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: task.title,
      content: task.content,
      status: task.status,
    }),
  }).then((res) => res.json());

  console.log("res", res);
  return NextResponse.json(res, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const result = await request.json();
  const id = result.id;

  const res = await fetch(`http://backend:80/api/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return NextResponse.json(res, { status: 200 });
}
export async function PATCH(request: NextRequest) {
  const result = await request.json();
  const task = result.task as Task;

  const res = await fetch(`http://backend:80/api/tasks/${task.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: task.id,
      title: task.title,
      content: task.content,
      status: task.status,
    }),
  });
  return NextResponse.json(res, { status: 200 });
}
