
import { cookies, headers } from 'next/headers';

export const generateHeaders = (): Headers => {
    const cookieStore = cookies();
    const auth = cookieStore.get("token")?.value;
    const headersList = headers();
    // const userAgent = request.headers.get("User-Agent");
    const userAgent: string | null = headersList.get("User-Agent");
    if (auth == undefined) {
        return new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": userAgent as string,
        });
    } else {
        return new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": userAgent as string,
            "Authorization": "Bearer "+(auth as string),
        });
    }
}

