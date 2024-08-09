import { spawn } from "child_process";
import { NextRequest, NextResponse } from "next/server";

const script = `echo 'starting script' 
git pull origin production
npm i
npm run build
echo 'ended script'`.replaceAll("\n", "&&");

export async function GET(req: NextRequest) {
  const child = spawn("bash", ["-c", script]);

  const prom = new Promise<boolean>((resolve, reject) => {
    child.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });

    child.on("close", (code: any) => {
      console.log(`child process exited with code ${code}`);
      if (code == 0) resolve(true);
      else resolve(false);
    });
  });

  if (await prom) return NextResponse.json({ success: true }, { status: 200 });

  return NextResponse.json({ success: false }, { status: 500 });
}
