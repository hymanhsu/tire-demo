
export const generateHeaders = (request: Request): Headers => {
    const auth = request.headers.get("Authorization");
    const userAgent = request.headers.get("User-Agent");
    if (auth == null) {
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
            "Authorization": auth as string,
        });
    }
}

