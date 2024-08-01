interface Handler<Request = string, Result = string | null> {
    setNext(handler: Handler<Request, Result>): Handler<Request, Result>;
    handle(request: Request): Result;
}

abstract class AbstractHandler implements Handler<string, string | null> {
    private nextHandler: Handler<string, string | null> | null = null;

    public setNext(handler: Handler<string, string | null>): Handler<string, string | null> {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

class GetHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'GET') {
            return `the HTTP ${request} method is called`;
        }
        return super.handle(request);
    }
}

class PostHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'POST') {
            return `the HTTP ${request} method is called`;
        }
        return super.handle(request);
    }
}

class PutHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'PUT') {
            return `the HTTP ${request} method is called`;
        }
        return super.handle(request);
    }
}