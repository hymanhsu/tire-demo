import fs from 'fs'
import path from 'path'


export async function GET(
    request: Request
) {
    const ts = new Date();
    const tz = process.env.TZ as string;

    const dir = path.resolve('./src/app/api');
    const filenames = fs.readdirSync(dir, {recursive: true});
    const apis = filenames.filter((name) => name.lastIndexOf("route.ts") != -1);
    const apisWithPath = apis.map(name => {
        const p = path.join('/api/', name as string);
        const p1 = p.replaceAll(path.sep, "/");
        const p2 = p1.replaceAll("/route.ts","");
        return p2;
    });

    const data = {
        meta: {
            status: true,
            message: "ok",
            ts: ts.toString(),
            tz: tz,
        },
        env: process.env,
        data: apisWithPath,
    };

    return Response.json(data);
}
